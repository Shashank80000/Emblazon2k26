import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

/* ─── Individual card wrapper ─────────────────────────────── */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card ${itemClassName}`.trim()}
        style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
    >
        {children}
    </div>
);

/* ─── helper: document-relative offsetTop (stable, no BoundingRect jitter) ── */
function getDocumentOffset(el) {
    let top = 0;
    while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return top;
}

/* ─── Main ScrollStack component ──────────────────────────── */
const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete,
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);
    // store card document offsets once (stable, no per-frame layout reads)
    const cardOffsetsRef = useRef([]);
    const endOffsetRef = useRef(0);
    const scrollTopRef = useRef(0); // smoothed scroll from Lenis

    const calculateProgress = useCallback((scroll, start, end) => {
        if (scroll < start) return 0;
        if (scroll > end) return 1;
        return (scroll - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%'))
            return (parseFloat(value) / 100) * containerHeight;
        return parseFloat(value);
    }, []);

    /* ── caches element offsets (called once after mount & on resize) ── */
    const cacheOffsets = useCallback(() => {
        if (!cardsRef.current.length) return;
        cardOffsetsRef.current = cardsRef.current.map(c => (c ? getDocumentOffset(c) : 0));
        const endEl = useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : scrollerRef.current?.querySelector('.scroll-stack-end');
        endOffsetRef.current = endEl ? getDocumentOffset(endEl) : 0;
    }, [useWindowScroll]);

    /* ── core animation loop — uses cached offsets, no layout reads ── */
    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;
        isUpdatingRef.current = true;

        const scrollTop = scrollTopRef.current;
        const containerHeight = useWindowScroll ? window.innerHeight : (scrollerRef.current?.clientHeight ?? window.innerHeight);
        const stackPosPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPosPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElTop = endOffsetRef.current;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = cardOffsetsRef.current[i] ?? 0;
            const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPosPx;
            const pinStart = triggerStart;
            const pinEnd = endElTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topIdx = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    if (scrollTop >= (cardOffsetsRef.current[j] ?? 0) - stackPosPx - itemStackDistance * j)
                        topIdx = j;
                }
                if (i < topIdx) blur = Math.max(0, (topIdx - i) * blurAmount);
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
            if (isPinned) {
                translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
            }

            // round to avoid sub-pixel jitter
            const nT = {
                translateY: Math.round(translateY),
                scale: Math.round(scale * 10000) / 10000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100,
            };

            const last = lastTransformsRef.current.get(i);
            const changed = !last ||
                last.translateY !== nT.translateY ||
                Math.abs(last.scale - nT.scale) > 0.0001 ||
                last.rotation !== nT.rotation ||
                last.blur !== nT.blur;

            if (changed) {
                card.style.transform = `translate3d(0,${nT.translateY}px,0) scale(${nT.scale}) rotate(${nT.rotation}deg)`;
                card.style.filter = nT.blur > 0 ? `blur(${nT.blur}px)` : '';
                lastTransformsRef.current.set(i, nT);
            }

            if (i === cardsRef.current.length - 1) {
                const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (inView && !stackCompletedRef.current) { stackCompletedRef.current = true; onStackComplete?.(); }
                if (!inView && stackCompletedRef.current) { stackCompletedRef.current = false; }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale, itemStackDistance, stackPosition, scaleEndPosition,
        baseScale, rotationAmount, blurAmount, useWindowScroll, onStackComplete,
        calculateProgress, parsePercentage,
    ]);

    /* ── Lenis scroll handler — receives accurate smoothed value ── */
    const handleScroll = useCallback(({ scroll }) => {
        scrollTopRef.current = scroll;
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        const lenisOpts = {
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075,
        };

        let lenis;
        if (useWindowScroll) {
            lenis = new Lenis(lenisOpts);
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;
            lenis = new Lenis({
                ...lenisOpts,
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner'),
            });
        }

        lenis.on('scroll', handleScroll);

        const raf = time => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);
        lenisRef.current = lenis;
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card'),
        );

        cardsRef.current = cards;
        const cache = lastTransformsRef.current;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            // prime the GPU layer without locking to translateZ(0) — use translate3d instead
            card.style.transform = 'translate3d(0,0,0)';
        });

        // cache stable document offsets after DOM settles
        // small delay so images / layout is complete
        const offsetTimer = setTimeout(() => {
            cacheOffsets();
            // set initial scrollTop from current position
            scrollTopRef.current = useWindowScroll ? window.scrollY : scroller.scrollTop;
            updateCardTransforms();
        }, 100);

        setupLenis();

        // re-cache on resize (layout shifts)
        const onResize = () => cacheOffsets();
        window.addEventListener('resize', onResize);

        return () => {
            clearTimeout(offsetTimer);
            window.removeEventListener('resize', onResize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (lenisRef.current) lenisRef.current.destroy();
            stackCompletedRef.current = false;
            cardsRef.current = [];
            cache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition,
        baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll,
        onStackComplete, setupLenis, updateCardTransforms, cacheOffsets,
    ]);

    const containerStyles = useWindowScroll
        ? { overscrollBehavior: 'contain' }
        : {
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            willChange: 'scroll-position',
        };

    const wrapperClass = useWindowScroll
        ? `scroll-stack-wrapper ${className}`.trim()
        : `scroll-stack-wrapper scroll-stack-container ${className}`.trim();

    return (
        <div className={wrapperClass} ref={scrollerRef} style={containerStyles}>
            <div className="scroll-stack-inner">
                {children}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;

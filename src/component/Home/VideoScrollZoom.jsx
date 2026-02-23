import { useRef, useEffect, useCallback } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'motion/react';
import './VideoScrollZoom.css';

/* ─────────────────────────────────────────────
   Canvas hook: video plays through letter cutouts
   ───────────────────────────────────────────── */
function useCanvasTextMask(canvasRef, videoRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d');
        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');
        let raf;

        const fit = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = maskCanvas.width = w;
            canvas.height = maskCanvas.height = h;
        };
        fit();
        window.addEventListener('resize', fit);

        /* font-size so "EMBLAZON" spans ~105% of canvas width */
        const calcFontSize = (w) => {
            let size = 120;
            maskCtx.font = `900 ${size}px Inter, "Helvetica Neue", Arial, sans-serif`;
            const tw = maskCtx.measureText('EMBLAZON').width;
            return size * (w * 1.05) / tw;
        };

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            if (video.readyState >= 2) {
                /* 1. Video fills canvas */
                ctx.drawImage(video, 0, 0, w, h);

                /* 2. Black mask with text punched out */
                maskCtx.clearRect(0, 0, w, h);
                maskCtx.fillStyle = '#030308';
                maskCtx.fillRect(0, 0, w, h);

                const fs = calcFontSize(w);
                maskCtx.font = `900 ${fs}px Inter, "Helvetica Neue", Arial, sans-serif`;
                maskCtx.textAlign = 'center';
                maskCtx.textBaseline = 'middle';
                maskCtx.globalCompositeOperation = 'destination-out';
                maskCtx.fillStyle = '#ffffff';
                maskCtx.fillText('EMBLAZON', w / 2, h / 2);
                maskCtx.globalCompositeOperation = 'source-over';

                /* 3. Overlay mask */
                ctx.drawImage(maskCanvas, 0, 0);
            } else {
                ctx.fillStyle = '#030308';
                ctx.fillRect(0, 0, w, h);
            }

            raf = requestAnimationFrame(draw);
        };

        draw();
        video.play().catch(() => { });

        return () => {
            window.removeEventListener('resize', fit);
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function VideoScrollZoom({ video: videoSrc }) {
    const outerRef = useRef(null);
    const canvasRef = useRef(null);
    const hiddenVideoRef = useRef(null);
    const fullVideoRef = useRef(null);

    useCanvasTextMask(canvasRef, hiddenVideoRef);

    /* Sync full-video timestamp to hidden-video so transition is seamless */
    const syncVideos = useCallback(() => {
        const src = hiddenVideoRef.current;
        const dst = fullVideoRef.current;
        if (src && dst && Math.abs(src.currentTime - dst.currentTime) > 0.3) {
            dst.currentTime = src.currentTime;
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ['start start', 'end end'],
    });

    const smooth = useSpring(scrollYProgress, {
        stiffness: 75,
        damping: 20,
        restDelta: 0.001,
    });

    /* Sync videos every time scroll progresses into crossfade zone */
    useMotionValueEvent(smooth, 'change', (v) => {
        if (v > 0.38 && v < 0.65) syncVideos();
    });

    /* ── Phase 1: Canvas zoom ── */
    const scale = useTransform(smooth, [0, 0.50], [1, 8]);
    const canvasOp = useTransform(smooth, [0.38, 0.54], [1, 0]);

    /* ── Phase 2: Full video crossfade ── */
    const fullVideoOp = useTransform(smooth, [0.46, 0.60], [0, 1]);

    /* ── Letterbox bars (cinematic effect during transition) ── */
    const barH = useTransform(smooth, [0.44, 0.62, 0.80, 0.92], ['8vh', '0vh', '0vh', '8vh']);

    /* ── Phase 3: Section exit ── */
    const sectionOp = useTransform(smooth, [0.84, 0.97], [1, 0]);

    /* ── Scroll progress bar ── */
    const progressScaleX = useTransform(smooth, [0, 1], [0, 1]);

    /* ── Scroll hint ── */
    const hintOp = useTransform(smooth, [0, 0.08], [1, 0]);

    /* ── "Scroll to continue" label at full-video phase ── */
    const continueOp = useTransform(smooth, [0.65, 0.76, 0.82, 0.90], [0, 1, 1, 0]);

    return (
        <div className="vsz-outer" ref={outerRef}>
            <motion.div className="vsz-sticky" style={{ opacity: sectionOp }}>

                {/* ── Progress bar ── */}
                <motion.div
                    className="vsz-progress-bar"
                    style={{ scaleX: progressScaleX }}
                />

                {/* ── PHASE 1: Canvas text-mask + zoom ── */}
                <motion.div
                    className="vsz-canvas-wrapper"
                    style={{ scale, opacity: canvasOp }}
                >
                    <video
                        ref={hiddenVideoRef}
                        src={videoSrc}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{ display: 'none' }}
                    />
                    <canvas ref={canvasRef} className="vsz-canvas" />
                </motion.div>

                {/* ── PHASE 2: Full-quality video ── */}
                <motion.div
                    className="vsz-fullvideo-wrapper"
                    style={{ opacity: fullVideoOp }}
                >
                    <video
                        ref={fullVideoRef}
                        src={videoSrc}
                        className="vsz-fullvideo"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    />

                    {/* Cinematic letterbox bars */}
                    <motion.div className="vsz-bar vsz-bar-top" style={{ height: barH }} />
                    <motion.div className="vsz-bar vsz-bar-bottom" style={{ height: barH }} />

                    {/* "Scroll to continue" hint over full video */}
                    <motion.div className="vsz-continue-hint" style={{ opacity: continueOp }}>
                        <span className="vsz-continue-badge">↓ Scroll to continue</span>
                    </motion.div>
                </motion.div>

                {/* ── Initial scroll hint chevrons ── */}
                <motion.div className="vsz-scroll-hint" style={{ opacity: hintOp }}>
                    <div className="vsz-chevrons">
                        <span /><span /><span />
                    </div>
                    <p>Scroll to experience</p>
                </motion.div>

            </motion.div>
        </div>
    );
}

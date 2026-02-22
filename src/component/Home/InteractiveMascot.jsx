import { useState, useEffect, useRef } from 'react';
import './InteractiveMascot.css';

export default function InteractiveMascot() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isSmiling, setIsSmiling] = useState(false);
    const [isStarEyed, setIsStarEyed] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            const angle = Math.atan2(dy, dx);
            const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 15, 8);

            setMousePos({
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const checkAndAttach = () => {
            const btns = document.querySelectorAll('.register-btn');
            const onEnter = () => setIsSmiling(true);
            const onLeave = () => setIsSmiling(false);

            btns.forEach(btn => {
                btn.removeEventListener('mouseenter', onEnter);
                btn.removeEventListener('mouseleave', onLeave);
                btn.addEventListener('mouseenter', onEnter);
                btn.addEventListener('mouseleave', onLeave);
            });

            const loopTracks = document.querySelectorAll('.logoloop');
            const onEnterLoop = () => setIsStarEyed(true);
            const onLeaveLoop = () => setIsStarEyed(false);

            loopTracks.forEach(track => {
                track.removeEventListener('mouseenter', onEnterLoop);
                track.removeEventListener('mouseleave', onLeaveLoop);
                track.addEventListener('mouseenter', onEnterLoop);
                track.addEventListener('mouseleave', onLeaveLoop);
            });
        };

        checkAndAttach();
        const interval = setInterval(checkAndAttach, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mascot-container" ref={containerRef}>
            <svg viewBox="0 0 200 200" className={`mascot-svg ${isSmiling ? 'excited' : 'happy'}`}>

                {/* Base Body - Cute Blob Shape */}
                <path
                    d="M 40 140 C 40 40, 160 40, 160 140 C 180 180, 20 180, 40 140"
                    fill="#f8fafc"
                    stroke="#0f172a"
                    strokeWidth="6"
                    strokeLinejoin="round"
                />

                {/* Blush */}
                <ellipse cx="55" cy="115" rx="14" ry="8" fill="#ffb4a2" opacity={isSmiling ? "0.9" : "0.5"} />
                <ellipse cx="145" cy="115" rx="14" ry="8" fill="#ffb4a2" opacity={isSmiling ? "0.9" : "0.5"} />

                {/* Eye Whites */}
                <circle cx="70" cy="90" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                <circle cx="130" cy="90" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />

                {/* Pupils */}
                {isStarEyed ? (
                    <g fill="#ffd700" stroke="#b8860b" strokeWidth="1">
                        {/* Star Path definition */}
                        <path
                            d="M 0 -10 L 2 -3 L 9 -3 L 4 1 L 6 8 L 0 4 L -6 8 L -4 1 L -9 -3 L -2 -3 Z"
                            transform={`translate(${70 + mousePos.x}, ${90 + mousePos.y}) scale(1.3)`}
                        />
                        <path
                            d="M 0 -10 L 2 -3 L 9 -3 L 4 1 L 6 8 L 0 4 L -6 8 L -4 1 L -9 -3 L -2 -3 Z"
                            transform={`translate(${130 + mousePos.x}, ${90 + mousePos.y}) scale(1.3)`}
                        />
                    </g>
                ) : (
                    <>
                        <circle
                            cx={70 + mousePos.x}
                            cy={90 + mousePos.y}
                            r="9"
                            fill="#0f172a"
                        />
                        <circle
                            cx={130 + mousePos.x}
                            cy={90 + mousePos.y}
                            r="9"
                            fill="#0f172a"
                        />
                        {/* Cute Catchlights (the little white dots inside pupils) */}
                        <circle cx={67 + mousePos.x} cy={87 + mousePos.y} r="3" fill="#ffffff" />
                        <circle cx={127 + mousePos.x} cy={87 + mousePos.y} r="3" fill="#ffffff" />
                    </>
                )}

                {/* Mouth */}
                {!isSmiling ? (
                    // Happy rest mouth
                    <path d="M 85 125 Q 100 135 115 125" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
                ) : (
                    // Excited open mouth with tongue
                    <g>
                        <path d="M 85 125 Q 100 120 115 125 Q 120 155 100 155 Q 80 155 85 125" fill="#0f172a" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M 90 145 Q 100 140 110 145 Q 105 155 95 155" fill="#ff8a80" />
                    </g>
                )}

                {/* Little arms */}
                {!isSmiling ? (
                    // Resting arms
                    <g>
                        <path d="M 35 130 C 20 130, 20 150, 35 150" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
                        <path d="M 165 130 C 180 130, 180 150, 165 150" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
                    </g>
                ) : (
                    // Arms up excited
                    <g>
                        <path d="M 35 130 C 15 110, 15 100, 25 90" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
                        <path d="M 165 130 C 185 110, 185 100, 175 90" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
                    </g>
                )}

                {/* Excitement Sparkles */}
                {isSmiling && (
                    <g stroke="#ffd700" strokeWidth="4" strokeLinecap="round">
                        <path d="M 30 50 L 30 30 M 20 40 L 40 40" />
                        <path d="M 170 60 L 170 40 M 160 50 L 180 50" />
                        <path d="M 140 30 L 140 15 M 132.5 22.5 L 147.5 22.5" strokeWidth="3" />
                    </g>
                )}
            </svg>
        </div>
    );
}

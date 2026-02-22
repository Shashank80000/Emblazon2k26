import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './TextCursor.css';

const festElements = ['🎤', '💃', '🕺', '🎸', '🎵', '🎭', '🎨', '✨'];

const TextCursor = ({
    spacing = 60,
    followMouseDirection = true,
    randomFloat = true,
    exitDuration = 0.5,
    removalInterval = 25,
    maxPoints = 6
}) => {
    const [trail, setTrail] = useState([]);
    const containerRef = useRef(null);
    const lastMoveTimeRef = useRef(Date.now());
    const idCounter = useRef(0);

    const handleMouseMove = e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const createRandomData = () =>
            randomFloat
                ? {
                    randomX: Math.random() * 20 - 10,
                    randomY: Math.random() * 20 - 10,
                    randomRotate: Math.random() * 30 - 15
                }
                : {};

        setTrail(prev => {
            const newTrail = [...prev];

            if (newTrail.length === 0) {
                newTrail.push({
                    id: idCounter.current++,
                    x: mouseX,
                    y: mouseY,
                    angle: 0,
                    emoji: festElements[Math.floor(Math.random() * festElements.length)],
                    ...createRandomData()
                });
            } else {
                const last = newTrail[newTrail.length - 1];
                const dx = mouseX - last.x;
                const dy = mouseY - last.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance >= spacing) {
                    let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                    const computedAngle = followMouseDirection ? rawAngle : 0;
                    const steps = Math.floor(distance / spacing);

                    for (let i = 1; i <= steps; i++) {
                        const t = (spacing * i) / distance;
                        const newX = last.x + dx * t;
                        const newY = last.y + dy * t;

                        newTrail.push({
                            id: idCounter.current++,
                            x: newX,
                            y: newY,
                            angle: computedAngle,
                            emoji: festElements[Math.floor(Math.random() * festElements.length)],
                            ...createRandomData()
                        });
                    }
                }
            }

            return newTrail.length > maxPoints ? newTrail.slice(newTrail.length - maxPoints) : newTrail;
        });

        lastMoveTimeRef.current = Date.now();
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastMoveTimeRef.current > 100) {
                setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));
            }
        }, removalInterval);
        return () => clearInterval(interval);
    }, [removalInterval]);

    return (
        <div ref={containerRef} className="text-cursor-container">
            <div className="text-cursor-inner">
                <AnimatePresence>
                    {trail.map(item => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.5, rotate: item.angle }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                                y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                opacity: { duration: exitDuration, ease: 'easeOut' },
                                ...(randomFloat && {
                                    x: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                                    y: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                                    rotate: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
                                })
                            }}
                            className="text-cursor-item"
                            style={{ left: item.x, top: item.y }}
                        >
                            {item.emoji}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TextCursor;

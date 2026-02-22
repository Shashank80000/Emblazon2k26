import { useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'motion/react'

import './CircularText.css'

const getRotationTransition = (duration, from, loop = true) => ({
    from,
    to: from + 360,
    ease: 'linear',
    duration,
    type: 'tween',
    repeat: loop ? Infinity : 0,
})

const getTransition = (duration, from, loop) => ({
    rotate: getRotationTransition(duration, from, loop),
    scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
    },
})

const CircularText = ({
    text,
    spinDuration = 20,
    onHover = 'speedUp',
    loop = true,
    className = '',
}) => {
    const letters = Array.from(text)
    const controls = useAnimation()
    const rotation = useMotionValue(0)

    useEffect(() => {
        const start = rotation.get()
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start, loop),
        })
    }, [spinDuration, text, onHover, loop, controls, rotation])

    const handleHoverStart = () => {
        const start = rotation.get()
        if (!onHover) return

        let transitionConfig
        let scaleVal = 1

        switch (onHover) {
            case 'slowDown':
                transitionConfig = getTransition(spinDuration * 2, start, true)
                break
            case 'speedUp':
                transitionConfig = getTransition(spinDuration / 4, start, true)
                break
            case 'pause':
                transitionConfig = {
                    rotate: { type: 'spring', damping: 20, stiffness: 300 },
                    scale: { type: 'spring', damping: 20, stiffness: 300 },
                }
                scaleVal = 1
                break
            case 'goBonkers':
                transitionConfig = getTransition(spinDuration / 20, start, true)
                scaleVal = 0.8
                break
            default:
                transitionConfig = getTransition(spinDuration, start, true)
        }

        controls.start({
            rotate: start + 360,
            scale: scaleVal,
            transition: transitionConfig,
        })
    }

    const handleHoverEnd = () => {
        const start = rotation.get()
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start, loop),
        })
    }

    return (
        <motion.div
            className={`circular-text ${className}`}
            style={{ rotate: rotation }}
            initial={{ rotate: 0 }}
            animate={controls}
            onMouseEnter={onHover ? handleHoverStart : undefined}
            onMouseLeave={onHover ? handleHoverEnd : undefined}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i
                const transform = `translateX(-50%) rotateZ(${rotationDeg}deg)`

                return (
                    <span key={i} style={{ transform, WebkitTransform: transform }}>
                        {letter}
                    </span>
                )
            })}
        </motion.div>
    )
}

export default CircularText

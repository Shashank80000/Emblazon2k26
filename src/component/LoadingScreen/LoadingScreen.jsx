import { useState, useEffect } from 'react'
import CircularText from './CircularText'
import logo from '../../assets/fest/logo.svg'
import './LoadingScreen.css'

function LoadingScreen({ onLoadComplete }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Hide loading screen after 2.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
                if (onLoadComplete) onLoadComplete()
            }, 600) // Wait for fade out animation
        }, 2500)

        return () => clearTimeout(timer)
    }, [onLoadComplete])

    if (!isVisible) return null

    return (
        <div className={`loading-screen ${!isVisible ? 'fade-out' : ''}`}>
            <div className="loading-content">
                {/* Outer Circle */}
                <div className="loading-circle-outer">
                    <CircularText
                        text={"EMBLAZON 2K26  •  ".repeat(4)}
                        spinDuration={20}
                        loop={true}
                    />
                </div>

                {/* Inner Circle - HMRITM */}
                <div className="loading-circle-inner">
                    <CircularText
                        text={"HMRITM  •  ".repeat(5)}
                        spinDuration={15}
                        loop={true}
                    />
                </div>

                {/* Center Logo */}
                <div className="loading-center">
                    <img src={logo} alt="Emblazon Logo" className="loading-logo" />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen

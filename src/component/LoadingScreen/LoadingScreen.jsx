import { useEffect } from 'react';
import { motion } from 'motion/react';
import CircularText from './CircularText';
import logo from '../../assets/fest/logo.svg';
import './LoadingScreen.css';

function LoadingScreen({ appState, setAppState }) {

    useEffect(() => {
        if (appState === 'loading') {
            const timer = setTimeout(() => {
                setAppState('ready');
            }, 2200);

            return () => clearTimeout(timer);
        }
    }, [appState, setAppState]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
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
                    <div className="loading-logo-wrapper">
                        {appState === 'loading' && (
                            <motion.img
                                key="loading-logo"
                                layoutId="flight-logo"
                                src={logo}
                                alt="Emblazon Logo"
                                className="loading-logo"
                                transition={{ layout: { type: "spring", stiffness: 60, damping: 14, mass: 0.8 } }}
                            />
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

export default LoadingScreen;

"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
    initialTimeMs: number;
    onComplete?: () => void;
    className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
    initialTimeMs,
    onComplete,
    className = "",
}) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTimeMs);

    useEffect(() => {
        // Reset the timer when initialTimeMs changes
        setTimeRemaining(initialTimeMs);

        // Don't start the timer if initialTimeMs is 0 or negative
        if (initialTimeMs <= 0) return;

        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                // Decrease by 1000ms (1 second)
                const newTime = prevTime - 1000;

                // If timer is complete
                if (newTime <= 0) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    // Format the time remaining
    const formatTime = () => {
        if (timeRemaining <= 0) return "0s";

        const seconds = Math.ceil(timeRemaining / 1000);
        if (seconds < 60) return `${seconds}s`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            {/* <Clock className="h-3.5 w-3.5" /> */}
            {formatTime()}
        </span>
    );
};

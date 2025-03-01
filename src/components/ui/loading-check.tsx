"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "./progress";

export const LoadingCheck = ({ onAnimationCompleted, saveFn }: { onAnimationCompleted?: () => void, saveFn?: () => void }) => {
    const [isSaving, setIsSaving] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setProgress((old) => old + 1), 20);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSaving(false);
            setProgress(0);
            saveFn?.();
            setTimeout(() => onAnimationCompleted?.(), 2000);
        }, 2000);
        return () => clearTimeout(timer);
    }, [saveFn]);

    return (
        <div className="flex items-center space-x-2">
            {isSaving ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="text-xs text-center mb-1">Saving</div>
                    <Progress value={progress} className="w-10" />
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                    <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Animated Circle */}
                        <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="green"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        {/* Animated Check Mark */}
                        <motion.path
                            d="M8 12l3 3 5-5"
                            stroke="green"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
                        />
                    </motion.svg>
                </motion.div>
            )}
        </div>
    );
};



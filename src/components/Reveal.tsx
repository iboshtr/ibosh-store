"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export const Reveal = ({ children, width = "100%", delay = 0, className = "" }: RevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ width }}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                style={{
                    transform: isVisible ? "translateY(0)" : "translateY(75px)",
                    opacity: isVisible ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) " + delay + "s"
                }}
            >
                {children}
            </div>
        </div>
    );
};

"use client";

import React, { useEffect, useState } from 'react';

interface HeroLogoProps {
    title: string;
}

export default function HeroLogo({ title }: HeroLogoProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate offset from center of screen
            const x = (e.clientX - window.innerWidth / 2) / 40; // Divide to control sensitivity
            const y = (e.clientY - window.innerHeight / 2) / 40;
            setOffset({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative flex justify-center items-center mb-4 md:mb-8 py-4 md:py-10 perspective-1000">

            {/* 1. Atmospheric Glow & Smoke Base */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] pointer-events-none transition-transform duration-300 ease-out"
                style={{ transform: `translate(-50%, -50%) translate(${offset.x * -0.5}px, ${offset.y * -0.5}px)` }}
            >
                {/* Rotating Smoke Layer 1 */}
                <div className="absolute inset-0 bg-gradient-radial from-[#C5A059]/20 to-transparent rounded-full blur-[80px] animate-smoke-rotate" />

                {/* Drifting Smoke Layer 2 */}
                <div className="absolute inset-0 bg-gradient-radial from-[#C5A059]/10 to-transparent rounded-full blur-[60px] animate-smoke-drift" style={{ animationDelay: '-4s' }} />

                {/* Counter-Rotating Layer 3 */}
                <div className="absolute inset-10 bg-gradient-radial from-[#C5A059]/15 to-transparent rounded-full blur-[70px] animate-smoke-rotate" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            </div>

            {/* 2. Texture Overlay (Subtle Grain) */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-noise opacity-30 pointer-events-none mix-blend-overlay" />

            {/* 3. The Logo with Parallax & 3D Tilt Illusion */}
            <div
                className="relative z-10 animate-fade-in-up transition-transform duration-100 ease-out will-change-transform"
                style={{
                    transform: `perspective(1000px) rotateX(${offset.y * 0.5}deg) rotateY(${offset.x * -0.5}deg) translateZ(0)`
                }}
            >
                <div className="relative group p-6 md:p-10 rounded-2xl md:rounded-3xl transition-all duration-700">
                    {/* Glassmorphism Background Card */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-full sm:rounded-[3rem] border border-white/10 shadow-[0_8px_32px_0_rgba(197,160,89,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Subtle Animation Behind Text */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-[sheen_2s_infinite] pointer-events-none" />

                    <img
                        src="/ibosh-logo-full.png"
                        alt={title}
                        className="relative z-10 h-20 md:h-52 lg:h-52 w-auto object-contain drop-shadow-2xl dark:bg-white/90 dark:p-4 dark:rounded-3xl transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}

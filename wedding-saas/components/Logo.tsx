import React from 'react';

export const BrandLogo = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
    <div className={`brand-logo-container relative ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path d="M50 40 C60 30 75 30 80 40 C85 50 75 65 50 80 C25 65 15 50 20 40 C25 30 40 30 50 40 Z" fill="#be185d" className="scc-heart" />
            <g className="scc-envelope">
                <rect x="10" y="30" width="80" height="50" rx="5" fill="#be185d" />
                <path d="M10 30 L50 60 L90 30" fill="#9d174d" />
                <path d="M10 80 L50 55 L90 80" fill="#db2777" opacity="0.5" />
                <text x="50" y="65" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="Nunito Sans">SCC</text>
                <path d="M10 30 L50 60 L90 30 L90 25 L10 25 Z" fill="#fbcfe8" className="scc-flap" />
            </g>
        </svg>
    </div>
);

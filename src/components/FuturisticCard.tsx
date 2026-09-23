'use client';

import React, { useRef, useState, useCallback } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string;
  withTilt?: boolean;
  withCorners?: boolean;
  withBorderBeam?: boolean;
}

export default function FuturisticCard({
  children,
  className = '',
  contentClassName = '',
  glowColor = 'rgba(255, 45, 85, 0.16)',
  withTilt = true,
  withCorners = true,
  withBorderBeam = false,
  ...rest
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (withTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle, elegant tilt (max 4.5 degrees)
        const tiltX = -((y - centerY) / centerY) * 4.5;
        const tiltY = ((x - centerX) / centerX) * 4.5;
        setTilt({ x: tiltX, y: tiltY });
      }
    },
    [withTilt]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: withTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative group rounded-3xl overflow-hidden border border-white/[0.08] bg-black/60 backdrop-blur-2xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] ${className}`}
      {...rest}
    >
      {/* 1. Animated Continuous Border Beam (Optional for featured cards) */}
      {withBorderBeam && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] opacity-40 group-hover:opacity-75 transition-opacity bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_280deg,rgba(255,45,85,0.7)_320deg,rgba(139,92,246,0.8)_350deg,transparent_360deg)]" />
          <div className="absolute inset-[1px] rounded-3xl bg-[#0a0a0e]/95 backdrop-blur-2xl" />
        </div>
      )}

      {/* 2. Interactive Spotlight Glow (Follows cursor inside the card) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, rgba(139, 92, 246, 0.05) 45%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle Cybernetic Corner Reticles / HUD Brackets */}
      {withCorners && (
        <>
          <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-appleRed-500/70 transition-colors pointer-events-none rounded-tl-sm" />
          <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-appleRed-500/70 transition-colors pointer-events-none rounded-tr-sm" />
          <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-appleRed-500/70 transition-colors pointer-events-none rounded-bl-sm" />
          <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-appleRed-500/70 transition-colors pointer-events-none rounded-br-sm" />
        </>
      )}

      {/* 4. Foreground Content */}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
}

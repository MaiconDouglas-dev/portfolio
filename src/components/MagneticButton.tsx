'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.08, // Very subtle, elegant magnetic pull (never jumps or bugs)
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Clamp maximum translation to ±6px so buttons never aggressively shift over the cursor
    const rawX = (clientX - centerX) * strength;
    const rawY = (clientY - centerY) * strength;
    const deltaX = Math.max(-6, Math.min(6, rawX));
    const deltaY = Math.max(-5, Math.min(5, rawY));

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.15s ease-out'
          : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      className={`inline-block will-change-transform cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

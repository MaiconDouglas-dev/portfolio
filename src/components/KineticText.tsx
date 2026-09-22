'use client';

import React, { useState } from 'react';

interface KineticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerDelayMs?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function KineticText({
  text,
  className = '',
  as: Component = 'h1',
  staggerDelayMs = 28,
  highlightWords = [],
  highlightClass = 'text-white',
}: KineticTextProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <Component className={`select-none ${className}`}>
      {words.map((word, wordIdx) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/gi, '')
        );

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
            {word.split('').map((char, cIdx) => {
              const currentIdx = charCounter++;
              const isCharHovered = hoveredIdx === currentIdx;

              return (
                <span
                  key={cIdx}
                  className="inline-block overflow-hidden align-top"
                  onMouseEnter={() => setHoveredIdx(currentIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span
                    className={`inline-block will-change-transform transition-all duration-300 ${
                      isHighlighted ? highlightClass : ''
                    } ${
                      isCharHovered
                        ? '-translate-y-2 scale-110 text-appleRed-500'
                        : 'translate-y-0 scale-100'
                    }`}
                    style={{
                      animation: `kineticReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                      animationDelay: `${currentIdx * staggerDelayMs}ms`,
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}

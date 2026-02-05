import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface WaveformIndicatorProps {
  activeIndex: number;
  totalItems: number;
}

// Calculate height based on distance from active (mirrors card scaling)
const getLineHeight = (distFromActive: number): number => {
  if (distFromActive === 0) return 52;
  if (distFromActive === 1) return 36;
  if (distFromActive === 2) return 24;
  if (distFromActive === 3) return 16;
  if (distFromActive === 4) return 10;
  if (distFromActive === 5) return 7;
  return 4; // Minimum height for distant items
};

const WaveformIndicator = ({ activeIndex, totalItems }: WaveformIndicatorProps) => {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animate line heights based on distance from active index
  useEffect(() => {
    linesRef.current.forEach((line, index) => {
      if (!line) return;

      const distFromActive = Math.abs(index - activeIndex);
      const height = getLineHeight(distFromActive);

      gsap.to(line, {
        height: `${height}px`,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, [activeIndex]);

  return (
    <div 
      className="flex items-center justify-center" 
      style={{ 
        width: '186px', 
        height: '52px',
        gap: '9px',
      }}
    >
      {Array.from({ length: totalItems }).map((_, index) => {
        const distFromActive = Math.abs(index - activeIndex);
        const initialHeight = getLineHeight(distFromActive);
        
        return (
          <div
            key={index}
            ref={(el) => { linesRef.current[index] = el; }}
            style={{
              width: '1px',
              height: `${initialHeight}px`,
              backgroundColor: '#000',
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveformIndicator;

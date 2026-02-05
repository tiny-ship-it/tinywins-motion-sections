import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface WaveformIndicatorProps {
  activeIndex: number;
  totalItems: number;
}

const WaveformIndicator = ({ activeIndex, totalItems }: WaveformIndicatorProps) => {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animate line heights based on distance from active index
  useEffect(() => {
    linesRef.current.forEach((line, index) => {
      if (!line) return;

      const distFromActive = Math.abs(index - activeIndex);
      let height = 4; // Base height

      // Height based on distance (mirroring card widths)
      if (distFromActive === 0) height = 52; // Max height for active
      else if (distFromActive === 1) height = 32;
      else if (distFromActive === 2) height = 20;
      else if (distFromActive === 3) height = 12;

      gsap.to(line, {
        height: `${height}px`,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  }, [activeIndex]);

  return (
    <div 
      className="flex items-end justify-center gap-2 border-t border-gray-200" 
      style={{ height: '80px', padding: '20px' }}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          ref={(el) => { linesRef.current[index] = el; }}
          className="bg-black rounded-full"
          style={{
            width: '4px',
            height: '12px',
          }}
        />
      ))}
    </div>
  );
};

export default WaveformIndicator;

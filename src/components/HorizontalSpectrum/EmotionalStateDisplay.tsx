import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface EmotionalStateProps {
  emotionalState: string;
}

const EmotionalStateDisplay = ({ emotionalState }: EmotionalStateProps) => {
  const stateRef = useRef<HTMLSpanElement>(null);
  const prevStateRef = useRef<string>(emotionalState);

  useEffect(() => {
    if (!stateRef.current) return;

    if (prevStateRef.current !== emotionalState) {
      gsap.to(stateRef.current, {
        scale: 0.9,
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (stateRef.current) {
            stateRef.current.textContent = emotionalState;
            gsap.fromTo(
              stateRef.current,
              { scale: 0.9, opacity: 0, x: -20 },
              { scale: 1, opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.4)' }
            );
          }
        },
      });
    }

    prevStateRef.current = emotionalState;
  }, [emotionalState]);

  return (
    <div className="relative flex items-center justify-center" style={{ height: '72px' }}>
      {/* Static part - anchored to the right of center */}
      <span
        className="text-right"
        style={{ 
          fontSize: '72px',
          letterSpacing: '-3.6px',
          fontFamily: "'Suisse Intl', sans-serif",
          fontWeight: 600,
          lineHeight: 1,
          opacity: 0.2,
          marginRight: '0.25em'
        }}
      >
        Brands that make us feel
      </span>
      
      {/* Dynamic word - anchored to the left of center */}
      <span
        ref={stateRef}
        style={{ 
          fontSize: '72px',
          letterSpacing: '-3.6px',
          fontFamily: "'Suisse Intl', sans-serif",
          fontWeight: 600,
          lineHeight: 1,
          willChange: 'transform, opacity',
          display: 'inline-block'
        }}
      >
        {emotionalState}
      </span>
    </div>
  );
};

export default EmotionalStateDisplay;

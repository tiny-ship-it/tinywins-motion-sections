import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface EmotionalStateProps {
  emotionalState: string;
  isVisible: boolean;
}

const EmotionalStateDisplay = ({ emotionalState, isVisible }: EmotionalStateProps) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const prevStateRef = useRef<string>(emotionalState);

  useEffect(() => {
    if (!textRef.current || !stateRef.current) return;

    if (prevStateRef.current !== emotionalState) {
      // Fade out previous state word
      gsap.to(stateRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          // Update state and fade in
          if (stateRef.current) {
            stateRef.current.textContent = emotionalState;
            gsap.fromTo(
              stateRef.current,
              {
                scale: 0,
                opacity: 0,
                y: 20,
              },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
              }
            );
          }
        },
      });
    } else if (isVisible) {
      // Initial entrance
      gsap.fromTo(
        textRef.current,
        {
          scale: 0,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'back.out(1.7)',
        }
      );
    }

    prevStateRef.current = emotionalState;
  }, [emotionalState, isVisible]);

  return (
    <h2
      ref={textRef}
      className="absolute top-16 left-1/2 transform -translate-x-1/2 text-5xl md:text-6xl lg:text-7xl font-bold text-black text-center px-4"
      style={{ letterSpacing: '0.02em', maxWidth: '90vw' }}
    >
      Brands that make us feel{' '}
      <span
        ref={stateRef}
        className="inline-block gpu-accelerated"
        style={{ willChange: 'transform, opacity' }}
      >
        {emotionalState}
      </span>
    </h2>
  );
};

export default EmotionalStateDisplay;

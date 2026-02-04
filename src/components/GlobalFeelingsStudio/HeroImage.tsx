import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EmotionalPortrait } from '../../types/globalFeelings';

interface HeroImageProps {
  portrait: EmotionalPortrait;
  onTransitionComplete: () => void;
}

const HeroImage = ({ portrait, onTransitionComplete }: HeroImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !captionRef.current) return;

    // Entry animation
    gsap.fromTo(
      imageRef.current,
      {
        scale: 0.8,
        opacity: 0,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      captionRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out',
      }
    );

    // Trigger transition after 2 seconds
    setTimeout(() => {
      onTransitionComplete();
    }, 2000);
  }, [onTransitionComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        ref={imageRef}
        className="hero-portrait relative gpu-accelerated rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width: '60vw',
          height: '75vh',
          maxWidth: '800px',
          maxHeight: '1000px',
        }}
      >
        <img
          src={portrait.url}
          alt={portrait.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div
          ref={captionRef}
          className="hero-caption absolute bottom-8 left-8 text-white"
        >
          <p className="text-xl font-semibold mb-2">{portrait.location}</p>
          <p className="text-sm uppercase tracking-wider opacity-80">{portrait.emotion}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;

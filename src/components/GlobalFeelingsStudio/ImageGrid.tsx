import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EmotionalPortrait } from '../../types/globalFeelings';
import GridImage from './GridImage';

interface ImageGridProps {
  images: EmotionalPortrait[];
  onImageClick: (portrait: EmotionalPortrait) => void;
  phase: 'multiplication' | 'grid';
}

const ImageGrid = ({ images, onImageClick, phase }: ImageGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const imageElements = gridRef.current.querySelectorAll('.grid-image');

    // Animate images from center to grid positions
    imageElements.forEach((element, index) => {
      const row = Math.floor(index / 10);
      const col = index % 10;
      const delay = (row + col) * 0.03;

      gsap.fromTo(
        element,
        {
          x: '50vw',
          y: '50vh',
          width: '60vw',
          height: '75vh',
          borderRadius: '24px',
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          opacity: 1,
          duration: 1.2,
          delay: delay,
          ease: 'power2.inOut',
        }
      );
    });

    // Animate title
    titleRef.current = document.querySelector('.section-title');
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: -50,
          opacity: 0,
          letterSpacing: '0.2em',
        },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.05em',
          duration: 1.0,
          delay: 1.5,
          ease: 'power3.out',
        }
      );
    }

    // Animate tagline when grid phase is reached
    if (phase === 'grid') {
      setTimeout(() => {
        taglineRef.current = document.querySelector('.section-tagline');
        if (taglineRef.current) {
          gsap.fromTo(
            taglineRef.current,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }
          );
        }
      }, 500);
    }
  }, [phase]);

  return (
    <div
      ref={gridRef}
      className="image-grid-container grid grid-cols-10 grid-rows-5 gap-2 mx-auto mt-24"
      style={{
        width: '90vw',
        height: '70vh',
        maxWidth: '1800px',
      }}
      role="list"
      aria-labelledby="gallery-title"
      aria-describedby="gallery-description"
    >
      {images.map((portrait, index) => (
        <GridImage
          key={portrait.id}
          portrait={portrait}
          index={index}
          onClick={() => onImageClick(portrait)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;

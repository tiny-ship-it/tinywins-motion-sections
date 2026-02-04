import { useState, useRef } from 'react';
import gsap from 'gsap';
import { EmotionalPortrait } from '../../types/globalFeelings';

interface GridImageProps {
  portrait: EmotionalPortrait;
  index: number;
  onClick: () => void;
}

const GridImage = ({ portrait, index, onClick }: GridImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      scale: 1.15,
      zIndex: 100,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      duration: 0.3,
      ease: 'power2.out',
    });

    // Dim other images
    const allImages = document.querySelectorAll('.grid-image');
    allImages.forEach((img) => {
      if (img !== imageRef.current) {
        gsap.to(img, {
          opacity: 0.6,
          duration: 0.3,
        });
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      scale: 1,
      zIndex: 1,
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.in',
    });

    // Restore opacity
    const allImages = document.querySelectorAll('.grid-image');
    gsap.to(allImages, {
      opacity: 1,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={imageRef}
      className="grid-image relative gpu-accelerated cursor-pointer overflow-hidden"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
      tabIndex={0}
      style={{ opacity: 0 }}
    >
      <img
        src={portrait.url}
        alt={portrait.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Caption overlay */}
      <div
        className="image-caption absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <p className="caption-location text-xs font-semibold mb-1">
          {portrait.location}
        </p>
        <p className="caption-emotion text-[10px] uppercase tracking-wider opacity-80">
          {portrait.emotion}
        </p>
      </div>
    </div>
  );
};

export default GridImage;

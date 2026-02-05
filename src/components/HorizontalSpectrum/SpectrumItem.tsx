import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import type { BrandCard } from '../../data/brands';

interface SpectrumItemProps {
  brand: BrandCard;
  index: number;
  isHovered: boolean;
  distFromHover: number;
  onHover: (index: number | null) => void;
  onMouseMove?: (cardIndex: number, mouseXRelativeToCard: number) => void;
}

const SpectrumItem = ({ brand, index, distFromHover, onHover, onMouseMove }: SpectrumItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prevShowsImageRef = useRef<boolean>(false);

  // Track mouse movement within this card
  const handleLocalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !onMouseMove) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const mouseX = e.clientX;
    
    // Calculate position relative to card center (-1 to 1)
    const relativePosition = (mouseX - cardCenterX) / (rect.width / 2);
    
    onMouseMove(index, relativePosition);
  };

  // Determine if this card shows an image (distance 0-4)
  const showsImage = distFromHover <= 4;
  const isHovered = distFromHover === 0;
  
  // Get dimensions based on distance (maintaining aspect ratio 0.75)
  const getDimensions = () => {
    if (distFromHover === 0) return { width: 435, height: 580 };
    if (distFromHover === 1) return { width: 295, height: 395 };
    if (distFromHover === 2) return { width: 182, height: 243 };
    if (distFromHover === 3) return { width: 100, height: 133 };
    if (distFromHover === 4) return { width: 43, height: 57 };
    return { width: 80, height: 24 }; // Word only - small height
  };

  const { width, height } = getDimensions();

  // Track if this is the first render
  const isFirstRenderRef = useRef(true);

  // Animate ALL dimension and position changes smoothly
  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any ongoing tweens to prevent conflicts
    gsap.killTweensOf(containerRef.current);

    if (isFirstRenderRef.current) {
      // First render: set immediately without animation
      gsap.set(containerRef.current, { width, height });
      isFirstRenderRef.current = false;
    } else {
      // Subsequent changes: animate smoothly
      gsap.to(containerRef.current, {
        width: width,
        height: height,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    prevShowsImageRef.current = showsImage;
  }, [width, height, showsImage]); // Triggers on ANY dimension change

  // Animate image scale
  useEffect(() => {
    if (!imageRef.current || !showsImage) return;

    if (isHovered) {
      gsap.fromTo(imageRef.current,
        { scale: 1.03 },
        { scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isHovered, showsImage]);


  return (
    <div
      ref={containerRef}
      className="relative bg-white overflow-visible cursor-pointer flex-shrink-0 flex flex-col"
      style={{
        borderRadius: '0px',
        willChange: 'width, height, transform',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleLocalMouseMove}
      role="button"
      tabIndex={0}
      aria-label={`View ${brand.emotionalState}`}
    >
      {/* Word (visible when no image shows) - opacity fades with distance */}
      {!showsImage && (
        <div className="h-full flex items-center justify-center px-4">
          <span 
            className="font-normal text-black text-center whitespace-nowrap"
            style={{ 
              fontSize: '16px',
              letterSpacing: '-0.32px',
              fontFamily: "'Suisse Intl', sans-serif",
              lineHeight: 1,
              opacity: distFromHover === 5 ? 0.7 : 
                       distFromHover === 6 ? 0.5 : 
                       distFromHover === 7 ? 0.28 : 
                       distFromHover === 8 ? 0.2 : 0.1
            }}
          >
            {brand.emotionalState}
          </span>
        </div>
      )}

      {/* Image (shows for nearby cards) */}
      {showsImage && (
        <>
          <div 
            className="relative w-full flex-1 overflow-hidden" 
            style={{ borderRadius: '0px' }}
          >
            <img 
              ref={imageRef}
              src={brand.imageUrl} 
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Below Image (only on hovered card) - positioned absolutely to prevent layout shift */}
          {isHovered && (
          <div 
            className="absolute left-0 right-0 bg-white px-3"
            style={{ 
              top: '100%',
              paddingTop: '18px',
              paddingBottom: '8px'
            }}
          >
            <p 
              className="uppercase text-black"
              style={{
                fontSize: '10.395px',
                letterSpacing: '-0.4158px',
                fontFamily: "'Suisse Intl Mono', monospace",
                lineHeight: 1.4
              }}
            >
              <span>{brand.name} </span>
              <span style={{ opacity: 0.3 }}>{brand.description}</span>
            </p>
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default SpectrumItem;

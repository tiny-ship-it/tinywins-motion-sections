import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { BRANDS } from '../../data/brands';
import SpectrumItem from './SpectrumItem';
import EmotionalStateDisplay from './EmotionalStateDisplay';
import WaveformIndicator from './WaveformIndicator';

const HorizontalSpectrum = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default to FIRST item (index 0) when nothing is hovered
  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;
  const currentBrand = BRANDS[activeIndex] || BRANDS[0];

  // Track previous hovered index to detect card changes
  const prevHoveredIndexRef = useRef<number | null>(null);

  // Reset mouseOffset when hovering a new card to prevent layout shift
  useEffect(() => {
    if (hoveredIndex !== prevHoveredIndexRef.current) {
      setMouseOffset(0);
      prevHoveredIndexRef.current = hoveredIndex;
    }
  }, [hoveredIndex]);

  // Handle mouse position from hovered card
  const handleCardMouseMove = (cardIndex: number, mouseXRelativeToCard: number) => {
    if (cardIndex !== hoveredIndex) return;
    
    // mouseXRelativeToCard is -1 (left edge) to 1 (right edge) of the card
    // Shift carousel opposite direction: mouse right → carousel left
    const maxShift = 25; // Subtle parallax effect
    const shift = -mouseXRelativeToCard * maxShift;
    
    setMouseOffset(shift);
  };

  // Pan carousel to ensure last card ends at 87px from right + mouse parallax
  useEffect(() => {
    if (!carouselRef.current) return;

    const viewportWidth = window.innerWidth;
    const estimatedCarouselWidth = 2590;
    const maxPan = -(estimatedCarouselWidth - viewportWidth + 87);
    
    // Base pan based on activeIndex
    const progress = activeIndex / (BRANDS.length - 1);
    const basePan = maxPan * progress;
    
    // Combine with mouse parallax offset
    const totalOffset = basePan + mouseOffset;
    
    // Use consistent animation duration for smooth transitions
    // Slightly faster for mouse movement, but not abrupt
    const duration = mouseOffset !== 0 ? 0.25 : 0.4;

    gsap.to(carouselRef.current, {
      x: totalOffset,
      duration: duration,
      ease: 'power2.out', // Smoother easing
    });
  }, [activeIndex, mouseOffset]);

  return (
    <section 
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Header Section */}
      <div className="flex-none pt-16 pb-12 px-4 z-20 bg-white">
         <EmotionalStateDisplay 
            emotionalState={currentBrand.emotionalState}
         />
      </div>

      {/* Main Carousel Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative flex items-center w-full overflow-hidden bg-white px-12 py-16"
        onMouseLeave={() => setMouseOffset(0)}
      >
        {/* Left gradient fade */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
          }}
        />
        
        {/* Carousel container that pans */}
        <div 
          ref={carouselRef}
          className="flex items-center" 
          style={{ gap: '24px', willChange: 'transform', paddingLeft: '87px' }}
        >
          {BRANDS.map((brand, index) => (
            <SpectrumItem
              key={`${brand.emotionalState}-${index}`}
              brand={brand}
              index={index}
              isHovered={index === activeIndex}
              distFromHover={Math.abs(index - activeIndex)}
              onHover={() => setHoveredIndex(index)}
              onMouseMove={handleCardMouseMove}
            />
          ))}
        </div>
        
        {/* Right gradient fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
          }}
        />
      </div>

      {/* Bottom Indicator Section - 56px from bottom */}
      <div 
        className="absolute left-0 right-0 w-full z-20"
        style={{ bottom: '56px' }}
      >
        <div className="flex justify-center w-full">
          <WaveformIndicator activeIndex={activeIndex} totalItems={BRANDS.length} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalSpectrum;

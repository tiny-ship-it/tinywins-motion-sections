import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRANDS } from '../../data/brands';
import BrandCardComponent from './BrandCard';
import EmotionalStateDisplay from './EmotionalStateDisplay';
import CascadingRectangles from './CascadingRectangles';
import EmotionWordsStream from './EmotionWordsStream';
import NavigationControls from './NavigationControls';

gsap.registerPlugin(ScrollTrigger);

type AnimationPhase = 'brand-transition' | 'rectangle-cascade' | 'morphing' | 'word-separation' | 'streaming';

const HorizontalSpectrum = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(1); // Start with Tiny Wins (center)
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const currentBrand = BRANDS[currentBrandIndex];

  // Get responsive card dimensions
  const getCardDimensions = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      // Desktop: 280x360, 120px gap
      return { cardWidth: 280, cardHeight: 360, gap: 120 };
    } else if (width >= 768) {
      // Tablet: 240x308, 100px gap
      return { cardWidth: 240, cardHeight: 308, gap: 100 };
    } else {
      // Mobile: stack vertically (handled differently)
      return { cardWidth: 280, cardHeight: 360, gap: 0 };
    }
  };

  // Phase 1: Brand Card Transition (0s - 1.2s)
  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll('.brand-card');
    const { cardWidth, gap } = getCardDimensions();
    const isMobile = window.innerWidth < 768;

    cards.forEach((card, index) => {
      const isFocused = index === currentBrandIndex;

      if (isMobile) {
        // Mobile: only show current card
        gsap.to(card, {
          opacity: isFocused ? 1.0 : 0,
          scale: isFocused ? 1.0 : 0.8,
          duration: 1.2,
          ease: 'power3.inOut',
        });
      } else {
        // Desktop/Tablet: horizontal scroll
        const offset = (index - currentBrandIndex) * (cardWidth + gap);
        gsap.to(card, {
          x: offset,
          scale: isFocused ? 1.0 : 0.85,
          opacity: isFocused ? 1.0 : 0.4,
          filter: isFocused ? 'blur(0px)' : 'blur(4px)',
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }
    });
  }, [currentBrandIndex]);

  // Initialize ScrollTrigger and start sequence
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (animationPhase === null) {
          startAnimationSequence();
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [animationPhase]);

  const startAnimationSequence = () => {
    if (isPaused) return;

    // Phase 2: Rectangle Cascade (1.2s - 2.8s) - 1.6s total
    setTimeout(() => {
      setAnimationPhase('rectangle-cascade');
    }, 1200);

    // Phase 3: Rectangle Morphing (2.8s - 4.2s) - 1.4s total
    setTimeout(() => {
      setAnimationPhase('morphing');
    }, 2800);

    // Phase 4: Word Separation (4.2s - 5.0s) - 0.8s total
    setTimeout(() => {
      setAnimationPhase('word-separation');
    }, 4200);

    // Phase 5: Horizontal Streaming (5.0s - continuous)
    setTimeout(() => {
      setAnimationPhase('streaming');
    }, 5000);
  };

  const transitionToBrand = (brandIndex: number) => {
    if (brandIndex === currentBrandIndex || isPaused) return;

    // Reset animation phases
    setAnimationPhase('brand-transition');
    setCurrentBrandIndex(brandIndex);

    // Restart sequence after brand transition completes
    setTimeout(() => {
      startAnimationSequence();
    }, 1200);
  };

  const handleNextBrand = () => {
    const nextIndex = (currentBrandIndex + 1) % BRANDS.length;
    transitionToBrand(nextIndex);
  };

  const handlePrevBrand = () => {
    const prevIndex = (currentBrandIndex - 1 + BRANDS.length) % BRANDS.length;
    transitionToBrand(prevIndex);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextBrand();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevBrand();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBrandIndex, isPaused]);

  return (
    <section
      ref={sectionRef}
      className="horizontal-spectrum-section relative w-full h-screen bg-gray-50 overflow-hidden"
      aria-label="Brand showcase with animated emotional states"
      role="region"
    >
      {/* Emotional State Display */}
      <EmotionalStateDisplay
        emotionalState={currentBrand.emotionalState}
        isVisible={true}
      />

      {/* Brand Cards Container */}
      <div
        ref={cardsContainerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center"
      >
        {BRANDS.map((brand, index) => (
          <BrandCardComponent
            key={brand.name}
            brand={brand}
            isFocused={index === currentBrandIndex}
            onFocus={() => transitionToBrand(index)}
          />
        ))}
      </div>

      {/* Cascading Rectangles - Phases 2 & 3 */}
      {(animationPhase === 'rectangle-cascade' || animationPhase === 'morphing') && (
        <CascadingRectangles
          accentColor={currentBrand.accentColor}
          emotionWords={currentBrand.emotionWords}
          phase={animationPhase}
          onMorphComplete={() => setAnimationPhase('word-separation')}
        />
      )}

      {/* Emotion Words Stream - Phases 4 & 5 */}
      {(animationPhase === 'word-separation' || animationPhase === 'streaming') && (
        <EmotionWordsStream
          words={currentBrand.emotionWords}
          accentColor={currentBrand.accentColor}
          phase={animationPhase}
          onSeparationComplete={() => setAnimationPhase('streaming')}
        />
      )}

      {/* Navigation Controls */}
      <NavigationControls
        onPrevious={handlePrevBrand}
        onNext={handleNextBrand}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        currentBrand={currentBrand.name}
        totalBrands={BRANDS.length}
      />

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" role="status">
        Now showing: {currentBrand.name} - {currentBrand.emotionalState}
      </div>
    </section>
  );
};

export default HorizontalSpectrum;

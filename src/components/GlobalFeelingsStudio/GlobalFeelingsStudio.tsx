import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTRAITS } from '../../data/portraits';
import type { EmotionalPortrait } from '../../types/globalFeelings';
import ImageGrid from './ImageGrid';
import HeroImage from './HeroImage';
import ImageModal from './ImageModal';

gsap.registerPlugin(ScrollTrigger);

type Phase = 'hero' | 'multiplication' | 'grid';

const GlobalFeelingsStudio = () => {
  const [phase, setPhase] = useState<Phase>('hero');
  const [selectedPortrait, setSelectedPortrait] = useState<EmotionalPortrait | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        startSequence();
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const startSequence = () => {
    // Phase 1: Hero image display (0s - 2.0s)
    setPhase('hero');

    // Phase 2: Image multiplication (2.0s - 3.5s)
    setTimeout(() => {
      setPhase('multiplication');
    }, 2000);

    // Phase 3: Grid complete (3.5s+)
    setTimeout(() => {
      setPhase('grid');
    }, 3500);
  };

  const handleImageClick = (portrait: EmotionalPortrait) => {
    setSelectedPortrait(portrait);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPortrait(null);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      className="global-feelings-section relative w-full min-h-screen bg-gray-50 overflow-hidden py-20"
      aria-label="Global Feelings Studio - Portrait Gallery"
      role="region"
    >
      <h1 id="gallery-title" className="sr-only">
        Global Feelings Studio
      </h1>
      <p id="gallery-description" className="sr-only">
        A collection of 50 emotional portraits from around the world
      </p>

      {/* Hero Phase */}
      {phase === 'hero' && (
        <HeroImage
          portrait={PORTRAITS[0]}
          onTransitionComplete={() => setPhase('multiplication')}
        />
      )}

      {/* Multiplication and Grid Phases */}
      {(phase === 'multiplication' || phase === 'grid') && (
        <>
          {/* Title */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <h2
              className="section-title text-5xl font-bold text-[#1A1A1A] tracking-wider opacity-0"
              style={{ letterSpacing: '0.05em' }}
            >
              GLOBAL FEELINGS STUDIO
            </h2>
          </div>

          {/* Image Grid */}
          <ImageGrid
            images={PORTRAITS}
            onImageClick={handleImageClick}
            phase={phase}
          />

          {/* Tagline */}
          {phase === 'grid' && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
              <p className="section-tagline text-xl text-[#666666] text-center opacity-0">
                Capturing authentic emotions from every corner of the world
              </p>
            </div>
          )}
        </>
      )}

      {/* Image Modal */}
      {selectedPortrait && (
        <ImageModal
          portrait={selectedPortrait}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default GlobalFeelingsStudio;

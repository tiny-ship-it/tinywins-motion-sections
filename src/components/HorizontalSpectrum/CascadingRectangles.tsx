import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Rectangle } from '../../types/horizontalSpectrum';

interface CascadingRectanglesProps {
  accentColor: string;
  emotionWords: string[];
  phase: 'rectangle-cascade' | 'morphing';
  onMorphComplete: () => void;
}

interface RectangleData extends Rectangle {
  finalX: number;
  finalY: number;
  word: string;
}

const CascadingRectangles = ({ accentColor, emotionWords, phase, onMorphComplete }: CascadingRectanglesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const [rectangles, setRectangles] = useState<RectangleData[]>([]);

  // Generate rectangle positions for top-right to bottom-left cascade
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const RECTANGLE_POSITIONS = [
      { x: 70, y: 10, rotation: -5 },
      { x: 65, y: 20, rotation: 3 },
      { x: 60, y: 30, rotation: -2 },
      { x: 55, y: 40, rotation: 4 },
      { x: 45, y: 50, rotation: -3 },
      { x: 40, y: 60, rotation: 2 },
      { x: 35, y: 70, rotation: -4 },
      { x: 30, y: 80, rotation: 1 },
    ];

    // Mobile: 5 rectangles, Desktop: 8 rectangles
    const numRectangles = isMobile ? 5 : 8;
    const rects: RectangleData[] = RECTANGLE_POSITIONS.slice(0, numRectangles).map((pos, index) => ({
      id: index,
      width: 120 + Math.random() * 80, // 120-200px
      height: 40 + Math.random() * 40, // 40-80px
      x: pos.x,
      y: pos.y,
      finalX: pos.x,
      finalY: pos.y,
      rotation: pos.rotation,
      delay: 0.2 * index,
      color: accentColor,
      opacity: 0.6 + Math.random() * 0.3, // 0.6-0.9
      word: emotionWords[index] || '',
    }));

    setRectangles(rects);
  }, [accentColor, emotionWords]);

  // Phase 2: Rectangle Cascade (starts at 1.2s in main timeline, runs for 1.6s)
  useEffect(() => {
    if (!containerRef.current || rectangles.length === 0 || phase !== 'rectangle-cascade') return;

    const rectElements = containerRef.current.querySelectorAll('.rectangle');

    rectElements.forEach((rect, index) => {
      const rectData = rectangles[index];
      const finalX = window.innerWidth * (rectData.finalX / 100);
      const finalY = window.innerHeight * (rectData.finalY / 100);

      // Cascade entry animation - start from top-right, cascade to position
      gsap.fromTo(
        rect,
        {
          x: finalX + 200,
          y: finalY - 100,
          scale: 0,
          rotation: rectData.rotation + 45,
          opacity: 0,
        },
        {
          x: finalX,
          y: finalY,
          scale: 1,
          rotation: rectData.rotation,
          opacity: rectData.opacity,
          duration: 0.8,
          delay: rectData.delay, // Stagger: 0.2s per rectangle
          ease: 'back.out(1.2)',
        }
      );
    });
  }, [rectangles, phase]);

  // Phase 3: Rectangle Morphing (starts at 2.8s, runs for 1.4s)
  useEffect(() => {
    if (!containerRef.current || !wordsContainerRef.current || rectangles.length === 0 || phase !== 'morphing') return;

    const rectElements = containerRef.current.querySelectorAll('.rectangle');
    const wordElements = wordsContainerRef.current.querySelectorAll('.morph-word');

    const tl = gsap.timeline({
      onComplete: () => {
        onMorphComplete();
      },
    });

    // Step 1: Scale down (1.0 → 0.2), 0.4s, power2.in
    tl.to(rectElements, {
      scale: 0.2,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.05,
    });

    // Step 2: Shape distortion to text proportions, 0.3s
    rectangles.forEach((rectData, index) => {
      const rect = rectElements[index];
      if (rect && rectData.word) {
        const textWidth = rectData.word.length * 12;
        tl.to(
          rect,
          {
            width: textWidth,
            height: 32,
            borderRadius: 4,
            duration: 0.3,
            ease: 'power1.inOut',
          },
          '-=0.25' // Overlap slightly with previous step
        );
      }
    });

    // Step 3: Cross-fade (rectangle opacity → 0, word opacity → 0.8), 0.5s
    // CRITICAL: Words appear at EXACT same position as rectangles
    tl.to(
      rectElements,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.inOut',
      },
      '-=0.2'
    );

    tl.fromTo(
      wordElements,
      {
        opacity: 0,
        scale: 0.2,
      },
      {
        opacity: 0.8,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      },
      '-=0.3' // Cross-fade overlap
    );

    return () => {
      tl.kill();
    };
  }, [rectangles, phase, onMorphComplete]);

  return (
    <>
      {/* Rectangles */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {rectangles.map((rect) => (
          <div
            key={`rect-${rect.id}`}
            className="rectangle absolute top-0 left-0 gpu-accelerated"
            style={{
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              backgroundColor: rect.color,
              borderRadius: '8px',
              opacity: 0,
              willChange: 'transform, opacity, width, height, border-radius',
            }}
          />
        ))}
      </div>

      {/* Words (appear at exact rectangle positions during morph) */}
      <div
        ref={wordsContainerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {rectangles.map((rect) => {
          const finalX = window.innerWidth * (rect.finalX / 100);
          const finalY = window.innerHeight * (rect.finalY / 100);

          return (
            <div
              key={`word-${rect.id}`}
              className="morph-word absolute top-0 left-0 gpu-accelerated font-medium"
              style={{
                transform: `translate(${finalX}px, ${finalY}px)`,
                fontSize: '28px',
                color: accentColor,
                opacity: 0,
                willChange: 'transform, opacity',
                whiteSpace: 'nowrap',
              }}
            >
              {rect.word}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CascadingRectangles;

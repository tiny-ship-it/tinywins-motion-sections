import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { EmotionWord } from '../../types/horizontalSpectrum';

interface EmotionWordsStreamProps {
  words: string[];
  accentColor: string;
  phase: 'word-separation' | 'streaming';
  onSeparationComplete: () => void;
}

interface WordData extends EmotionWord {
  streamingX: number;
  streamingY: number;
}

const EmotionWordsStream = ({ words, accentColor, phase, onSeparationComplete }: EmotionWordsStreamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const [emotionWords, setEmotionWords] = useState<WordData[]>([]);

  // Initialize word data with rectangle positions
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const numWords = isMobile ? 5 : 8;

    // Rectangle positions (must match CascadingRectangles)
    const RECTANGLE_POSITIONS = [
      { x: 70, y: 10 },
      { x: 65, y: 20 },
      { x: 60, y: 30 },
      { x: 55, y: 40 },
      { x: 45, y: 50 },
      { x: 40, y: 60 },
      { x: 35, y: 70 },
      { x: 30, y: 80 },
    ];

    const wordData: WordData[] = words.slice(0, numWords).map((word, index) => {
      const rectPos = RECTANGLE_POSITIONS[index];
      // Start from EXACT rectangle positions (Phase 3 morph positions)
      const startX = window.innerWidth * (rectPos.x / 100);
      const startY = window.innerHeight * (rectPos.y / 100);

      // Random Y position for streaming (35%-65% of viewport height)
      const streamingY = window.innerHeight * (0.35 + Math.random() * 0.3);

      return {
        text: word,
        // Start from rectangle positions (CRITICAL - words appear at exact morphed positions)
        x: startX,
        y: startY,
        // Streaming positions
        streamingX: window.innerWidth + index * 150, // 150px horizontal spacing
        streamingY: streamingY,
        fontSize: 24 + Math.random() * 24, // 24-48px
        opacity: 0.8,
        velocity: 0.5 + Math.random() * 1.0, // 0.5-1.5 px/frame
        id: `stream-word-${index}`,
      };
    });

    setEmotionWords(wordData);
  }, [words]);

  // Phase 4: Word Separation (4.2s - 5.0s, duration: 0.8s)
  useEffect(() => {
    if (!containerRef.current || emotionWords.length === 0 || phase !== 'word-separation') return;

    const wordElements = containerRef.current.querySelectorAll('.stream-word');

    // Move words from morphed positions to streaming positions
    wordElements.forEach((element, index) => {
      const word = emotionWords[index];

      gsap.fromTo(
        element,
        {
          x: word.x,
          y: word.y,
        },
        {
          x: word.streamingX,
          y: word.streamingY,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.05, // Slight stagger
        }
      );
    });

    // Signal completion after separation animation
    setTimeout(() => {
      onSeparationComplete();
    }, 800);

    return () => {
      gsap.killTweensOf(wordElements);
    };
  }, [emotionWords, phase, onSeparationComplete]);

  // Phase 5: Horizontal Streaming (5.0s - continuous)
  useEffect(() => {
    if (!containerRef.current || emotionWords.length === 0 || phase !== 'streaming') return;

    const wordElements = containerRef.current.querySelectorAll('.stream-word');

    // Clear previous animations
    animationsRef.current.forEach((anim) => anim.kill());
    animationsRef.current = [];

    // Start continuous streaming animation
    wordElements.forEach((element, index) => {
      const word = emotionWords[index];

      // Calculate duration based on velocity (px/frame at 60fps)
      const distance = window.innerWidth + 400; // Full width + buffer
      const pixelsPerSecond = word.velocity * 60; // Convert to px/second
      const duration = distance / pixelsPerSecond;

      const animation = gsap.to(element, {
        x: -200, // Move off-screen to the left
        duration: duration,
        ease: 'none', // Linear motion
        repeat: -1, // Infinite loop
        onRepeat: () => {
          // Reset to right side with new random Y position
          gsap.set(element, {
            x: window.innerWidth + 100,
            y: window.innerHeight * (0.35 + Math.random() * 0.3),
          });
        },
      });

      animationsRef.current.push(animation);
    });

    return () => {
      animationsRef.current.forEach((anim) => anim.kill());
      animationsRef.current = [];
    };
  }, [emotionWords, phase]);

  if (emotionWords.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {emotionWords.map((word) => (
        <div
          key={word.id}
          className="stream-word absolute top-0 left-0 gpu-accelerated font-medium"
          style={{
            fontSize: `${word.fontSize}px`,
            color: accentColor,
            opacity: 0.8,
            willChange: 'transform, opacity',
            whiteSpace: 'nowrap',
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default EmotionWordsStream;

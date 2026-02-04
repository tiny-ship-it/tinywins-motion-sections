import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TinyWinInstance, AnimationPhase } from '../../types/tinyWin';
import { generateInstances, FIRST_WAVE_POSITIONS } from './instanceGenerator';

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA15E'
];

const TinyWinSection = () => {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [instances, setInstances] = useState<TinyWinInstance[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    // Phase 1: Initial state
    setPhase('initial');

    // Phase 2: First multiplication (after 1.8s)
    setTimeout(() => {
      setPhase('first-wave');
      animateFirstWave();
    }, 1800);

    // Phase 3: Exponential multiplication (after 3.0s)
    setTimeout(() => {
      setPhase('multiplication');
      const generatedInstances = generateInstances(200);
      setInstances(generatedInstances);
      animateMultiplication(generatedInstances);
    }, 3000);

    // Phase 4: Start pulsing (after 6.0s)
    setTimeout(() => {
      setPhase('active');
      startPulseEffect();
    }, 6000);

    // Phase 5: Color wave (after 8.0s)
    setTimeout(() => {
      createColorWave();
    }, 8000);
  };

  const animateFirstWave = () => {
    if (!containerRef.current) return;

    const firstWaveElements = containerRef.current.querySelectorAll('.first-wave-instance');
    firstWaveElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          x: '50%',
          y: '50%',
          scale: 0,
          opacity: 0,
        },
        {
          x: FIRST_WAVE_POSITIONS[index].x + '%',
          y: FIRST_WAVE_POSITIONS[index].y + '%',
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.1 * index,
          ease: 'back.out(1.2)',
        }
      );
    });
  };

  const animateMultiplication = (generatedInstances: TinyWinInstance[]) => {
    if (!containerRef.current) return;

    setTimeout(() => {
      const multiplyElements = containerRef.current?.querySelectorAll('.multiply-instance');
      multiplyElements?.forEach((element, index) => {
        const instance = generatedInstances[index];
        const sourceIndex = index % 8;
        const sourcePos = FIRST_WAVE_POSITIONS[sourceIndex];

        gsap.fromTo(
          element,
          {
            x: sourcePos.x + '%',
            y: sourcePos.y + '%',
            scale: 0,
            opacity: 0,
          },
          {
            x: instance.x + '%',
            y: instance.y + '%',
            scale: 1,
            opacity: instance.opacity,
            rotation: instance.rotation,
            duration: instance.duration,
            delay: instance.delay,
            ease: 'power2.out',
          }
        );
      });
    }, 100);
  };

  const startPulseEffect = () => {
    if (!containerRef.current) return;

    const pulseInterval = setInterval(() => {
      const allElements = containerRef.current?.querySelectorAll('.multiply-instance');
      if (!allElements || allElements.length === 0) {
        clearInterval(pulseInterval);
        return;
      }

      const pulseCount = 5 + Math.floor(Math.random() * 5);
      const selectedIndices = new Set<number>();

      while (selectedIndices.size < pulseCount) {
        selectedIndices.add(Math.floor(Math.random() * allElements.length));
      }

      selectedIndices.forEach((index) => {
        gsap.to(allElements[index], {
          scale: 1.3,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        });
      });
    }, 1500);

    // Store interval for cleanup
    return () => clearInterval(pulseInterval);
  };

  const createColorWave = () => {
    if (!containerRef.current) return;

    const allElements = containerRef.current.querySelectorAll('.multiply-instance');
    allElements.forEach((element, index) => {
      const colorIndex = Math.floor(index / 30) % COLORS.length;
      const delay = index * 0.01;

      gsap.to(element, {
        color: COLORS[colorIndex],
        duration: 0.6,
        delay: delay,
        ease: 'power1.inOut',
      });
    });

    setTimeout(() => {
      gsap.to(allElements, {
        color: '#2C3E50',
        duration: 1.0,
        ease: 'power1.inOut',
      });
    }, 5000);
  };

  const handleInstanceClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('multiply-instance')) return;

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const distance = 200;
      const targetX = centerX + Math.cos(angle) * distance;
      const targetY = centerY + Math.sin(angle) * distance;

      const clone = document.createElement('div');
      clone.textContent = target.textContent;
      clone.className = 'absolute gpu-accelerated font-bold';
      clone.style.fontSize = target.style.fontSize;
      clone.style.left = `${centerX}px`;
      clone.style.top = `${centerY}px`;
      containerRef.current?.appendChild(clone);

      gsap.fromTo(
        clone,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        },
        {
          x: targetX - centerX,
          y: targetY - centerY,
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => clone.remove(),
        }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="tiny-win-section relative w-full h-screen bg-white overflow-hidden"
      aria-label="Tiny Win visualization showing multiplication effect"
      role="region"
    >
      <h2 className="sr-only">The Power of Tiny Wins</h2>

      <div
        ref={containerRef}
        className="absolute inset-0"
        onClick={handleInstanceClick}
      >
        {/* Initial State */}
        {phase === 'initial' && (
          <div
            className="initial-tiny-win absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] font-bold text-[#2C3E50] gpu-accelerated"
          >
            tiny win
          </div>
        )}

        {/* First Wave */}
        {(phase === 'first-wave' || phase === 'multiplication' || phase === 'active') && (
          <>
            {FIRST_WAVE_POSITIONS.map((pos, index) => (
              <div
                key={`first-wave-${index}`}
                className="first-wave-instance absolute text-[32px] font-bold text-[#2C3E50] gpu-accelerated"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: phase === 'multiplication' || phase === 'active' ? 0 : 1,
                }}
              >
                tiny win
              </div>
            ))}
          </>
        )}

        {/* Multiplication Phase */}
        {(phase === 'multiplication' || phase === 'active') && instances.map((instance) => (
          <div
            key={instance.id}
            className="multiply-instance absolute gpu-accelerated cursor-pointer"
            style={{
              left: `${instance.x}%`,
              top: `${instance.y}%`,
              fontSize: `${instance.fontSize}px`,
              fontWeight: instance.text === 'TINY WIN' ? 700 : 400,
              color: '#2C3E50',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          >
            {instance.text}
          </div>
        ))}
      </div>

      <div className="sr-only" aria-live="polite" role="status">
        {phase === 'initial' && 'Starting with a single tiny win'}
        {phase === 'first-wave' && 'One win multiplies into many'}
        {phase === 'multiplication' && 'Hundreds of tiny wins fill the screen'}
        {phase === 'active' && 'Tiny wins create momentum and transformation'}
      </div>
    </section>
  );
};

export default TinyWinSection;

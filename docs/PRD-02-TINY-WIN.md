# PRD-02: Tiny Win Section

## Overview
A full-screen animated section that showcases the "Tiny Win" concept through word multiplication and kinetic typography. A single phrase starts centered and small, then multiplies into hundreds of instances that fill the screen with varying scales, creating a dynamic, overwhelming visual that embodies the power of small victories.

## Visual Concept
The animation represents how one tiny win multiplies into momentum, confidence, and transformation. The visual metaphor is literal: "tiny win" starts as one small phrase and exponentially multiplies across the screen.

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    FULL SCREEN SECTION                   │
│                                                          │
│                                                          │
│                      tiny win                            │
│                    (initial state)                       │
│                                                          │
│                                                          │
│                         ↓                                │
│                                                          │
│  tiny win    TINY WIN                                   │
│       tiny win              tiny win                     │
│  TINY WIN        tiny win                               │
│        TINY WIN                 tiny win                 │
│                  tiny win                                │
│              TINY WIN      tiny win                      │
│    tiny win                        TINY WIN              │
│         tiny win        TINY WIN                         │
│  (final state - 200+ instances)                         │
└─────────────────────────────────────────────────────────┘
```

## Animation Sequence

### Phase 1: Initial State (0s - 1.0s)

**Starting Position**:
- **Text**: "tiny win"
- **Font**: Inter Bold, 32px
- **Position**: Absolute center (50% x, 50% y)
- **Opacity**: 0
- **Scale**: 0.5
- **Color**: #2C3E50

**Entry Animation**:
```typescript
gsap.fromTo('.initial-tiny-win',
  {
    scale: 0.5,
    opacity: 0,
    y: -20
  },
  {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'back.out(1.7)'
  }
);
```

**Hold Duration**: 0.8s (pause to establish the concept)

### Phase 2: First Multiplication (1.8s - 3.0s)

**Action**: Original phrase splits into 8 instances

**Duplication Pattern**:
```typescript
const FIRST_WAVE_POSITIONS = [
  { x: 50%, y: 50% },  // original
  { x: 35%, y: 35% },  // top-left
  { x: 65%, y: 35% },  // top-right
  { x: 35%, y: 65% },  // bottom-left
  { x: 65%, y: 65% },  // bottom-right
  { x: 50%, y: 25% },  // top
  { x: 50%, y: 75% },  // bottom
  { x: 20%, y: 50% },  // left
  { x: 80%, y: 50% }   // right
];
```

**Animation**:
```typescript
FIRST_WAVE_POSITIONS.forEach((pos, index) => {
  const clone = createTinyWinElement({
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50'
  });

  gsap.fromTo(clone,
    {
      x: '50%',
      y: '50%',
      scale: 0,
      opacity: 0
    },
    {
      x: pos.x,
      y: pos.y,
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay: 0.1 * index,
      ease: 'back.out(1.2)'
    }
  );
});
```

**Original Behavior**: Fades out as clones appear

### Phase 3: Exponential Multiplication (3.0s - 6.0s)

**Action**: 8 instances multiply to 200+ instances

**Grid Generation**:
```typescript
interface TinyWinInstance {
  text: 'tiny win' | 'TINY WIN';
  x: number;        // percentage (0-100)
  y: number;        // percentage (0-100)
  fontSize: number; // 14-72px
  opacity: number;  // 0.3-1.0
  rotation: number; // -5 to 5 degrees
  delay: number;    // stagger delay
  duration: number; // animation duration
}

function generateInstances(count: number): TinyWinInstance[] {
  const instances: TinyWinInstance[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    // Add randomization to break grid rigidity
    const xJitter = (Math.random() - 0.5) * 15;
    const yJitter = (Math.random() - 0.5) * 15;

    instances.push({
      text: Math.random() > 0.5 ? 'tiny win' : 'TINY WIN',
      x: (col / gridSize) * 100 + xJitter,
      y: (row / gridSize) * 100 + yJitter,
      fontSize: 14 + Math.random() * 58, // 14-72px range
      opacity: 0.3 + Math.random() * 0.7,
      rotation: (Math.random() - 0.5) * 10,
      delay: Math.random() * 2, // random stagger
      duration: 0.8 + Math.random() * 0.4
    });
  }

  return instances;
}
```

**Multiplication Animation**:
```typescript
const instances = generateInstances(200);

instances.forEach((instance, index) => {
  const element = createTinyWinElement({
    text: instance.text,
    fontSize: instance.fontSize,
    opacity: instance.opacity,
    rotation: instance.rotation
  });

  // Start from one of the 8 first-wave positions
  const sourceIndex = index % 8;
  const sourcePos = FIRST_WAVE_POSITIONS[sourceIndex];

  gsap.fromTo(element,
    {
      x: sourcePos.x,
      y: sourcePos.y,
      scale: 0,
      opacity: 0
    },
    {
      x: instance.x + '%',
      y: instance.y + '%',
      scale: 1,
      opacity: instance.opacity,
      rotation: instance.rotation,
      duration: instance.duration,
      delay: instance.delay,
      ease: 'power2.out'
    }
  );
});
```

### Phase 4: Pulsing & Emphasis (6.0s - continuous)

**Action**: Random instances scale up/down to create visual interest

**Pulse Effect**:
```typescript
function createPulseEffect() {
  const allElements = document.querySelectorAll('.tiny-win-instance');

  setInterval(() => {
    // Select 5-10 random elements
    const pulseCount = 5 + Math.floor(Math.random() * 5);
    const selectedElements = getRandomElements(allElements, pulseCount);

    selectedElements.forEach((element) => {
      gsap.to(element, {
        scale: 1.3,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    });
  }, 1500); // pulse every 1.5 seconds
}
```

### Phase 5: Color Wave (8.0s - 10.0s)

**Action**: Wave of color sweeps through instances

**Color Scheme**:
```typescript
const COLORS = [
  '#FF6B6B', // coral
  '#4ECDC4', // turquoise
  '#45B7D1', // sky blue
  '#96CEB4', // sage
  '#FFEAA7', // soft yellow
  '#DDA15E'  // bronze
];
```

**Wave Animation**:
```typescript
function createColorWave() {
  const allElements = document.querySelectorAll('.tiny-win-instance');

  allElements.forEach((element, index) => {
    const colorIndex = Math.floor(index / 30) % COLORS.length;
    const delay = index * 0.01; // ripple effect

    gsap.to(element, {
      color: COLORS[colorIndex],
      duration: 0.6,
      delay: delay,
      ease: 'power1.inOut'
    });
  });

  // Reset to original color after wave completes
  setTimeout(() => {
    gsap.to(allElements, {
      color: '#2C3E50',
      duration: 1.0,
      ease: 'power1.inOut'
    });
  }, 5000);
}
```

## Typography Specifications

### Font Variations
```typescript
const FONT_CONFIGS = [
  {
    text: 'tiny win',
    fontFamily: 'Inter',
    fontWeight: 400,
    textTransform: 'lowercase'
  },
  {
    text: 'TINY WIN',
    fontFamily: 'Inter',
    fontWeight: 700,
    textTransform: 'uppercase'
  }
];
```

### Size Distribution
```typescript
const SIZE_DISTRIBUTION = {
  small: {
    range: [14, 24],
    percentage: 0.4 // 40% of instances
  },
  medium: {
    range: [24, 48],
    percentage: 0.4 // 40% of instances
  },
  large: {
    range: [48, 72],
    percentage: 0.2 // 20% of instances
  }
};
```

## Component Architecture

```typescript
// TinyWinSection.tsx
interface TinyWinSectionProps {
  instanceCount?: number;
  autoAnimate?: boolean;
  colorWaveEnabled?: boolean;
  pulseEnabled?: boolean;
}

// TinyWinInstance.tsx
interface TinyWinInstanceProps {
  text: string;
  fontSize: number;
  position: { x: number; y: number };
  opacity: number;
  rotation: number;
  delay: number;
  onAnimationComplete?: () => void;
}

// TinyWinController.tsx
interface ControllerState {
  phase: 'initial' | 'first-wave' | 'multiplication' | 'active';
  instanceCount: number;
  animationsComplete: number;
}
```

## Scroll Trigger Configuration

```typescript
ScrollTrigger.create({
  trigger: '.tiny-win-section',
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => {
    startTinyWinSequence();
  },
  onEnterBack: () => {
    // Resume from current state
    resumeTinyWinSequence();
  },
  onLeave: () => {
    pauseTinyWinSequence();
  },
  onLeaveBack: () => {
    pauseTinyWinSequence();
  }
});

// Pin section during multiplication phase
ScrollTrigger.create({
  trigger: '.tiny-win-section',
  start: 'top top',
  end: '+=2000', // 2000px scroll distance
  pin: true,
  scrub: 0.5,
  onUpdate: (self) => {
    const progress = self.progress;

    if (progress < 0.3) {
      // Show initial state
      showPhase('initial');
    } else if (progress < 0.6) {
      // Show first wave
      showPhase('first-wave');
    } else {
      // Show full multiplication
      showPhase('multiplication');
    }
  }
});
```

## Performance Optimizations

### 1. Instance Pooling
```typescript
class TinyWinPool {
  private pool: HTMLElement[] = [];
  private active: Set<HTMLElement> = new Set();

  constructor(private maxSize: number = 250) {
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.maxSize; i++) {
      const element = this.createInstance();
      this.pool.push(element);
    }
  }

  acquire(): HTMLElement {
    const element = this.pool.pop();
    if (element) {
      this.active.add(element);
      return element;
    }
    throw new Error('Pool exhausted');
  }

  release(element: HTMLElement) {
    this.active.delete(element);
    element.style.display = 'none';
    this.pool.push(element);
  }

  private createInstance(): HTMLElement {
    const div = document.createElement('div');
    div.className = 'tiny-win-instance';
    div.style.position = 'absolute';
    div.style.whiteSpace = 'nowrap';
    return div;
  }
}
```

### 2. GPU Acceleration
```css
.tiny-win-instance {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 3. Batch DOM Updates
```typescript
function batchUpdateInstances(updates: Array<{
  element: HTMLElement;
  properties: CSSProperties;
}>) {
  requestAnimationFrame(() => {
    updates.forEach(({ element, properties }) => {
      Object.assign(element.style, properties);
    });
  });
}
```

### 4. Intersection Observer for Visibility
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is visible, enable animations
      entry.target.classList.add('animate');
    } else {
      // Element not visible, pause animations
      entry.target.classList.remove('animate');
    }
  });
}, {
  threshold: 0.1
});
```

## Interaction Features

### 1. Click to Explode
```typescript
function handleInstanceClick(element: HTMLElement) {
  // Create explosion effect from clicked instance
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Generate 20 new instances radiating outward
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const distance = 200;
    const targetX = centerX + Math.cos(angle) * distance;
    const targetY = centerY + Math.sin(angle) * distance;

    const clone = pool.acquire();
    clone.textContent = element.textContent;

    gsap.fromTo(clone,
      {
        x: centerX,
        y: centerY,
        scale: 0,
        opacity: 1
      },
      {
        x: targetX,
        y: targetY,
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => pool.release(clone)
      }
    );
  }
}
```

### 2. Hover Effects
```typescript
document.addEventListener('mousemove', (e) => {
  const instances = document.querySelectorAll('.tiny-win-instance');

  instances.forEach((instance) => {
    const rect = instance.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
      e.clientX - centerX,
      e.clientY - centerY
    );

    // Repel instances near cursor
    if (distance < 100) {
      const angle = Math.atan2(
        centerY - e.clientY,
        centerX - e.clientX
      );
      const force = (100 - distance) / 100;

      gsap.to(instance, {
        x: '+=' + Math.cos(angle) * force * 20,
        y: '+=' + Math.sin(angle) * force * 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
});
```

## Accessibility Considerations

### 1. Reduced Motion Support
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Show final state immediately without animation
  showFinalState();

  // Disable pulse and color wave effects
  disableContinuousAnimations();
}
```

### 2. Semantic HTML
```html
<section
  aria-label="Tiny Win visualization showing multiplication effect"
  role="region"
  aria-live="polite"
>
  <h2 class="sr-only">The Power of Tiny Wins</h2>
  <div class="tiny-win-container">
    <!-- Instances -->
  </div>
</section>
```

### 3. Screen Reader Announcements
```typescript
function announcePhase(phase: string) {
  const announcer = document.getElementById('sr-announcer');
  const messages = {
    initial: 'Starting with a single tiny win',
    firstWave: 'One win multiplies into many',
    multiplication: 'Hundreds of tiny wins fill the screen',
    active: 'Tiny wins create momentum and transformation'
  };

  announcer.textContent = messages[phase];
}
```

## Testing Requirements

### 1. Performance Benchmarks
- **Target FPS**: 60fps during multiplication phase
- **Memory Usage**: < 100MB total
- **Instance Creation**: < 50ms for 200 instances
- **Animation Smoothness**: No dropped frames during transitions

### 2. Visual Tests
```typescript
describe('TinyWinSection', () => {
  it('should show single instance initially', () => {
    expect(getVisibleInstances()).toHaveLength(1);
  });

  it('should multiply to 8 instances in first wave', async () => {
    await waitForAnimation(3000);
    expect(getVisibleInstances()).toHaveLength(8);
  });

  it('should reach 200+ instances in final state', async () => {
    await waitForAnimation(6000);
    expect(getVisibleInstances().length).toBeGreaterThan(200);
  });

  it('should apply random sizes within range', () => {
    const instances = getVisibleInstances();
    instances.forEach((instance) => {
      const fontSize = parseInt(getComputedStyle(instance).fontSize);
      expect(fontSize).toBeGreaterThanOrEqual(14);
      expect(fontSize).toBeLessThanOrEqual(72);
    });
  });
});
```

### 3. Cross-Browser Testing
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari (iOS 16+)
- Chrome Mobile (Android 12+)

## Success Metrics

1. Smooth, stutter-free multiplication animation
2. Visual impact creates "wow" moment
3. Performance maintains 60fps on desktop
4. No memory leaks during extended viewing
5. Accessibility features don't compromise visual experience
6. Color wave creates satisfying visual rhythm
7. Interactive features feel responsive and natural

## Implementation Files

```
src/
├── components/
│   ├── TinyWinSection/
│   │   ├── TinyWinSection.tsx
│   │   ├── TinyWinInstance.tsx
│   │   ├── TinyWinController.tsx
│   │   ├── TinyWinPool.ts
│   │   └── index.ts
├── hooks/
│   ├── useTinyWinAnimation.ts
│   ├── useInstancePool.ts
│   └── useColorWave.ts
├── types/
│   └── tinyWin.ts
└── utils/
    ├── instanceGenerator.ts
    └── animationHelpers.ts
```

# PRD-01: Horizontal Spectrum Section

## Overview
A full-screen animated section featuring three brand cards (Gaping Void, Tiny Wins, Local Feelings) that horizontally scroll into focus. Each brand card drives its own unique emotional state with cascading rectangles that morph into emotion words, which then flow across the screen as a horizontal scrolling stream.

## Critical Design Principle
**Each brand card is linked to its own emotional state.** The emotional states are NOT arbitrary - they are directly tied to whichever brand card is currently in focus:
- **Gaping Void** → "Irresistible"
- **Tiny Wins** → "Unstoppable"
- **Local Feelings** → "Untouchable"

## Visual Structure

### Layout
```
┌─────────────────────────────────────────────────────────┐
│                    FULL SCREEN SECTION                   │
│                                                          │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│  │  Gaping  │ ──> │   Tiny   │ ──> │  Local   │       │
│  │   Void   │     │   Wins   │     │ Feelings │       │
│  └──────────┘     └──────────┘     └──────────┘       │
│                                                          │
│  [Cascading Rectangles]                                 │
│  ↓ (morph into)                                         │
│  [Emotion Words: "bold" "creative" "brave" →→→]        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Components

#### 1. Brand Cards Container
- **Position**: Horizontal row, centered vertically
- **Spacing**: 120px gap between cards
- **Scroll Behavior**: Horizontal snap scroll
- **Initial State**: Gaping Void centered

#### 2. Brand Card
```typescript
interface BrandCard {
  name: 'Gaping Void' | 'Tiny Wins' | 'Local Feelings';
  emotionalState: 'Irresistible' | 'Unstoppable' | 'Untouchable';
  logoUrl: string;
  emotionWords: string[];
  accentColor: string;
  position: {
    x: number; // horizontal offset
    scale: number; // scale when in focus
  };
}
```

**Dimensions**:
- Width: 280px
- Height: 360px
- Border Radius: 16px
- Background: White with subtle shadow

**States**:
- **Out of Focus**: `opacity: 0.4`, `scale: 0.85`, `blur: 4px`
- **In Focus**: `opacity: 1.0`, `scale: 1.0`, `blur: 0px`

#### 3. Emotional State Display
- **Position**: Top center, 80px from top
- **Font**: Inter Bold, 72px
- **Color**: Black (#000000)
- **Transform Origin**: Center
- **Initial**: Scale 0, Opacity 0

#### 4. Cascading Rectangles
```typescript
interface Rectangle {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
}
```

**Configuration**:
- **Count**: 8 rectangles per brand
- **Size Range**:
  - Width: 120px - 200px
  - Height: 40px - 80px
- **Position**: Cascade from top-right to bottom-left
- **Spacing**: Vertical 60px, Horizontal 80px stagger
- **Colors**: Brand accent with varying opacity (0.6 - 0.9)

**Starting Positions** (when brand comes into focus):
```
Rectangle 1: (x: 60%,  y: 15%, rotation: -5deg)
Rectangle 2: (x: 55%,  y: 25%, rotation: 3deg)
Rectangle 3: (x: 50%,  y: 35%, rotation: -2deg)
Rectangle 4: (x: 45%,  y: 45%, rotation: 4deg)
Rectangle 5: (x: 40%,  y: 55%, rotation: -3deg)
Rectangle 6: (x: 35%,  y: 65%, rotation: 2deg)
Rectangle 7: (x: 30%,  y: 75%, rotation: -4deg)
Rectangle 8: (x: 25%,  y: 85%, rotation: 1deg)
```

#### 5. Emotion Words Stream
```typescript
interface EmotionWord {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  opacity: number;
  velocity: number;
}
```

**Word Sets by Brand**:
```typescript
const EMOTION_WORDS = {
  'Gaping Void': [
    'bold', 'creative', 'brave', 'daring', 'innovative',
    'fearless', 'artistic', 'visionary', 'original', 'authentic'
  ],
  'Tiny Wins': [
    'persistent', 'determined', 'resilient', 'focused', 'driven',
    'consistent', 'dedicated', 'committed', 'steadfast', 'tenacious'
  ],
  'Local Feelings': [
    'confident', 'powerful', 'strong', 'assured', 'invincible',
    'secure', 'protected', 'empowered', 'unshakeable', 'solid'
  ]
};
```

**Visual Properties**:
- **Font**: Inter Medium
- **Size Range**: 24px - 48px
- **Vertical Position**: Random between 35% - 65% of viewport height
- **Horizontal Flow**: Right to left, continuous loop
- **Speed**: 0.5 - 1.5 pixels per frame (varies per word)
- **Opacity**: Fade in from 0 to 0.8
- **Color**: Brand accent color

## Animation Sequence

### Phase 1: Brand Card Scroll & Focus (0s - 1.2s)

**Trigger**: User scrolls to section OR auto-advances

**Brand Card Animation**:
```typescript
gsap.to(currentCard, {
  x: -cardWidth - gap, // scroll previous card out
  scale: 0.85,
  opacity: 0.4,
  filter: 'blur(4px)',
  duration: 1.2,
  ease: 'power3.inOut'
});

gsap.to(nextCard, {
  x: 0, // center next card
  scale: 1.0,
  opacity: 1.0,
  filter: 'blur(0px)',
  duration: 1.2,
  ease: 'power3.inOut'
});
```

**Emotional State Transition**:
```typescript
// Fade out previous emotional state
gsap.to(prevEmotionalState, {
  scale: 0.8,
  opacity: 0,
  y: -20,
  duration: 0.6,
  ease: 'power2.in'
});

// Fade in new emotional state (brand-linked)
gsap.fromTo(newEmotionalState,
  {
    scale: 0,
    opacity: 0,
    y: 20
  },
  {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'back.out(1.7)'
  }
);
```

### Phase 2: Rectangle Cascade (1.2s - 2.8s)

**Entry Animation** (Sequential cascade with stagger):
```typescript
rectangles.forEach((rect, index) => {
  gsap.fromTo(rect,
    {
      x: rect.startX + 200, // start off-screen right
      y: rect.startY - 100, // start above
      scale: 0,
      rotation: rect.rotation + 45,
      opacity: 0
    },
    {
      x: rect.startX,
      y: rect.startY,
      scale: 1,
      rotation: rect.rotation,
      opacity: rect.opacity,
      duration: 0.8,
      delay: 0.2 * index, // stagger delay
      ease: 'back.out(1.2)'
    }
  );
});
```

**Hold Duration**: 0.6s (all rectangles visible)

### Phase 3: Rectangle Morphing (2.8s - 4.2s)

This is the critical morphing sequence where rectangles transform into text.

**Step 1: Scale Down** (0.4s)
```typescript
gsap.to(rectangles, {
  scale: 0.2,
  duration: 0.4,
  ease: 'power2.in',
  stagger: 0.05
});
```

**Step 2: Shape Distortion** (0.3s)
```typescript
rectangles.forEach((rect, index) => {
  gsap.to(rect, {
    width: emotionWords[index].length * 12, // text-like width
    height: 32, // text-like height
    borderRadius: 4,
    duration: 0.3,
    ease: 'power1.inOut'
  });
});
```

**Step 3: Cross-fade to Text** (0.5s)
```typescript
// Rectangles fade out
gsap.to(rectangles, {
  opacity: 0,
  duration: 0.5,
  ease: 'power2.out'
});

// Emotion words fade in at same position
emotionWords.forEach((word, index) => {
  gsap.fromTo(word,
    {
      x: rectangles[index].x,
      y: rectangles[index].y,
      scale: 0.2,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 0.8,
      duration: 0.5,
      delay: 0.05 * index,
      ease: 'power2.out'
    }
  );
});
```

### Phase 4: Word Separation & Flow (4.2s - 5.0s)

**Separate Words**:
```typescript
emotionWords.forEach((word, index) => {
  const targetY = viewport.height * (0.35 + Math.random() * 0.3);
  const targetX = viewport.width + (index * 150);

  gsap.to(word, {
    x: targetX,
    y: targetY,
    fontSize: 24 + Math.random() * 24, // randomize size
    duration: 0.8,
    ease: 'power2.out'
  });
});
```

### Phase 5: Horizontal Streaming (5.0s - continuous)

**Continuous Loop**:
```typescript
function animateWordStream() {
  emotionWords.forEach((word) => {
    gsap.to(word, {
      x: -word.width - 100, // move off-screen left
      duration: (viewport.width + word.x) / word.velocity,
      ease: 'none',
      onComplete: () => {
        // Reset to right side
        word.x = viewport.width + 100;
        word.y = viewport.height * (0.35 + Math.random() * 0.3);
        animateWordStream(); // loop
      }
    });
  });
}
```

## Scroll Trigger Configuration

```typescript
ScrollTrigger.create({
  trigger: '.horizontal-spectrum-section',
  start: 'top top',
  end: 'bottom top',
  pin: true,
  scrub: 1,
  onEnter: () => {
    // Initialize with first brand (Gaping Void)
    transitionToBrand('Gaping Void');
  },
  onUpdate: (self) => {
    const progress = self.progress;

    // Determine which brand should be in focus
    if (progress < 0.33) {
      transitionToBrand('Gaping Void');
    } else if (progress < 0.66) {
      transitionToBrand('Tiny Wins');
    } else {
      transitionToBrand('Local Feelings');
    }
  }
});
```

## Brand Data Configuration

```typescript
const BRANDS: BrandCard[] = [
  {
    name: 'Gaping Void',
    emotionalState: 'Irresistible',
    logoUrl: '/assets/logos/gaping-void.svg',
    accentColor: '#FF6B6B',
    emotionWords: [
      'bold', 'creative', 'brave', 'daring', 'innovative',
      'fearless', 'artistic', 'visionary', 'original', 'authentic'
    ],
    position: { x: -400, scale: 0.85 }
  },
  {
    name: 'Tiny Wins',
    emotionalState: 'Unstoppable',
    logoUrl: '/assets/logos/tiny-wins.svg',
    accentColor: '#4ECDC4',
    emotionWords: [
      'persistent', 'determined', 'resilient', 'focused', 'driven',
      'consistent', 'dedicated', 'committed', 'steadfast', 'tenacious'
    ],
    position: { x: 0, scale: 1.0 }
  },
  {
    name: 'Local Feelings',
    emotionalState: 'Untouchable',
    logoUrl: '/assets/logos/local-feelings.svg',
    accentColor: '#95E1D3',
    emotionWords: [
      'confident', 'powerful', 'strong', 'assured', 'invincible',
      'secure', 'protected', 'empowered', 'unshakeable', 'solid'
    ],
    position: { x: 400, scale: 0.85 }
  }
];
```

## Component Architecture

```typescript
// HorizontalSpectrum.tsx
interface HorizontalSpectrumProps {
  brands: BrandCard[];
  autoAdvance?: boolean;
  advanceInterval?: number;
}

// BrandCard.tsx
interface BrandCardProps {
  brand: BrandCard;
  isFocused: boolean;
  onFocus: () => void;
}

// EmotionalStateDisplay.tsx
interface EmotionalStateProps {
  text: string;
  isVisible: boolean;
}

// CascadingRectangles.tsx
interface CascadingRectanglesProps {
  rectangles: Rectangle[];
  accentColor: string;
  isAnimating: boolean;
}

// EmotionWordsStream.tsx
interface EmotionWordsStreamProps {
  words: EmotionWord[];
  accentColor: string;
  isFlowing: boolean;
}
```

## Performance Optimizations

1. **GPU Acceleration**:
   ```css
   .brand-card {
     will-change: transform, opacity, filter;
     transform: translateZ(0);
   }
   ```

2. **Lazy Rectangle Creation**:
   - Only create rectangles for the currently focused brand
   - Destroy rectangles when brand loses focus

3. **Word Pool Management**:
   - Maintain a pool of 20 word elements
   - Reuse and reposition instead of creating new elements

4. **RequestAnimationFrame**:
   ```typescript
   function updateWordPositions() {
     emotionWords.forEach(word => {
       word.x -= word.velocity;
       if (word.x < -word.width) {
         word.x = viewport.width + 100;
       }
     });
     requestAnimationFrame(updateWordPositions);
   }
   ```

## Interaction Behaviors

### Manual Brand Selection
```typescript
function handleBrandClick(brandIndex: number) {
  // Pause auto-advance if active
  clearInterval(autoAdvanceTimer);

  // Transition to selected brand
  transitionToBrand(BRANDS[brandIndex].name);

  // Resume auto-advance after 5s
  setTimeout(() => {
    startAutoAdvance();
  }, 5000);
}
```

### Keyboard Navigation
```typescript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    advanceToNextBrand();
  } else if (e.key === 'ArrowLeft') {
    advanceToPreviousBrand();
  }
});
```

## Accessibility Considerations

1. **ARIA Labels**:
   ```html
   <section
     aria-label="Brand showcase with animated emotional states"
     role="region"
   >
   ```

2. **Reduced Motion**:
   ```typescript
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;

   if (prefersReducedMotion) {
     // Disable morphing animations
     // Show static emotional states
     // Disable word streaming
   }
   ```

3. **Focus Management**:
   ```typescript
   // Ensure focused brand card is keyboard accessible
   focusedCard.setAttribute('tabindex', '0');
   unfocusedCards.forEach(card => {
     card.setAttribute('tabindex', '-1');
   });
   ```

## Testing Requirements

1. **Visual Regression Tests**:
   - Verify brand card transitions
   - Confirm emotional state changes match brand
   - Validate rectangle morphing sequence

2. **Animation Timing Tests**:
   - Ensure phase durations are accurate
   - Verify stagger delays are consistent
   - Confirm word streaming maintains constant velocity

3. **Cross-Browser Testing**:
   - Chrome, Firefox, Safari, Edge
   - Mobile Safari (iOS)
   - Chrome Mobile (Android)

4. **Performance Benchmarks**:
   - Target: 60fps during all animations
   - Memory: < 50MB for entire section
   - Load time: < 2s for all assets

## Files to Create

```
src/
├── components/
│   ├── HorizontalSpectrum/
│   │   ├── HorizontalSpectrum.tsx
│   │   ├── BrandCard.tsx
│   │   ├── EmotionalStateDisplay.tsx
│   │   ├── CascadingRectangles.tsx
│   │   ├── EmotionWordsStream.tsx
│   │   └── index.ts
│   └── ...
├── hooks/
│   ├── useGSAPAnimations.ts
│   ├── useBrandTransition.ts
│   └── useWordStream.ts
├── types/
│   └── horizontalSpectrum.ts
└── data/
    └── brands.ts
```

## Success Metrics

1. Each brand card correctly triggers its linked emotional state
2. Rectangle morphing sequence is smooth and visually coherent
3. Word streaming maintains constant, smooth motion
4. Transitions between brands feel natural and polished
5. Performance remains at 60fps on desktop and 30fps on mobile

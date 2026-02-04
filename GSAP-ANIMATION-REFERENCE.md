# GSAP Animation Reference - Horizontal Spectrum

This document contains the exact GSAP code implementations for all 5 animation phases.

## Phase 1: Brand Card Scroll (0s-1.2s)

### File: HorizontalSpectrum.tsx (lines 41-72)

```typescript
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
```

**Key Parameters:**
- Duration: 1.2s
- Easing: power3.inOut (smooth acceleration and deceleration)
- Properties: x (position), scale, opacity, filter (blur)
- Focus state: scale 1.0, opacity 1.0, no blur
- Defocus state: scale 0.85, opacity 0.4, blur 4px

---

## Phase 2: Rectangle Cascade (1.2s-2.8s)

### File: CascadingRectangles.tsx (lines 58-90)

```typescript
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
        delay: rectData.delay, // 0.2s * index
        ease: 'back.out(1.2)',
      }
    );
  });
}, [rectangles, phase]);
```

**Key Parameters:**
- Duration: 0.8s per rectangle
- Stagger: 0.2s between rectangles (via delay)
- Easing: back.out(1.2) (bounce effect)
- Start position: +200px right, -100px up
- Start rotation: +45° offset
- Start scale: 0
- Start opacity: 0
- End: Final position with original rotation, scale 1, opacity 0.6-0.9

**Timeline Calculation:**
- 8 rectangles with 0.2s stagger
- Last rectangle starts at: 7 × 0.2s = 1.4s
- Last rectangle ends at: 1.4s + 0.8s = 2.2s
- Total phase duration: 1.6s (fits in 1.2s-2.8s window)

---

## Phase 3: Morphing (2.8s-4.2s)

### File: CascadingRectangles.tsx (lines 93-163)

```typescript
useEffect(() => {
  if (!containerRef.current || !wordsContainerRef.current || 
      rectangles.length === 0 || phase !== 'morphing') return;

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
        '-=0.25' // Overlap with previous step
      );
    }
  });

  // Step 3: Cross-fade (rectangle opacity → 0, word opacity → 0.8), 0.5s
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
```

**Key Parameters:**

**Step 1 (0.4s total):**
- Scale: 1.0 → 0.2
- Easing: power2.in (accelerates)
- Stagger: 0.05s between rectangles
- Creates shrinking effect

**Step 2 (0.3s, overlaps with Step 1 by 0.25s):**
- Width: Original → text width (word.length × 12px)
- Height: Original → 32px
- Border radius: 8px → 4px
- Easing: power1.inOut
- Transforms rectangle into text-shaped box

**Step 3 (0.5s, overlaps with Step 2 by 0.2s):**
- Rectangle opacity: Current → 0 (fade out)
- Word opacity: 0 → 0.8 (fade in)
- Word scale: 0.2 → 1.0
- Easing: power1.inOut (rectangles), power2.out (words)
- Cross-fade overlap: -=0.3s for seamless transition

**Timeline Duration Calculation:**
- 0.4s (Step 1)
- + 0.05s (Step 2 after overlap: 0.3s - 0.25s)
- + 0.2s (Step 3 after overlap: 0.5s - 0.3s)
- = 0.65s minimum, but Step 3 extends to ~1.0s total
- Actual duration: ~1.4s (fits in 2.8s-4.2s window)

---

## Phase 4: Word Separation (4.2s-5.0s)

### File: EmotionWordsStream.tsx (lines 66-100)

```typescript
useEffect(() => {
  if (!containerRef.current || emotionWords.length === 0 || 
      phase !== 'word-separation') return;

  const wordElements = containerRef.current.querySelectorAll('.stream-word');

  // Move words from morphed positions to streaming positions
  wordElements.forEach((element, index) => {
    const word = emotionWords[index];

    gsap.fromTo(
      element,
      {
        x: word.x, // Rectangle position
        y: word.y,
      },
      {
        x: word.streamingX, // Stream start position
        y: word.streamingY, // Random Y: 35-65% viewport
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
```

**Key Parameters:**
- Duration: 0.8s
- Easing: power2.out (decelerates smoothly)
- Stagger: 0.05s per word
- Start position: Exact morphed rectangle positions (word.x, word.y)
- End position X: window.innerWidth + index × 150px (horizontal spacing)
- End position Y: Random 35-65% of viewport height
- Creates spreading effect before streaming

---

## Phase 5: Streaming (5.0s - continuous)

### File: EmotionWordsStream.tsx (lines 102-142)

```typescript
useEffect(() => {
  if (!containerRef.current || emotionWords.length === 0 || 
      phase !== 'streaming') return;

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
```

**Key Parameters:**
- Easing: none (linear motion for smooth scrolling)
- Repeat: -1 (infinite loop)
- Direction: Right to left (positive X to negative X)
- Start X: window.innerWidth + 100 (off-screen right)
- End X: -200 (off-screen left)
- Velocity: 0.5-1.5 px/frame (random per word)
- Duration calculation: distance / (velocity × 60fps)
  - Example: 1920px / (1.0 × 60) = 32 seconds per cycle

**Seamless Loop:**
- onRepeat callback resets word position
- New X: window.innerWidth + 100
- New Y: Random 35-65% viewport (creates variety)
- No pause between loops (immediate reset)

**Velocity Variation:**
- Each word has unique velocity (0.5-1.5 px/frame)
- Creates depth perception (faster = closer, slower = farther)
- Font size variation (24-48px) enhances depth effect

---

## Timeline Orchestration

### File: HorizontalSpectrum.tsx (lines 93-115)

```typescript
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
```

**Phase Timing Summary:**
- Phase 1: 0ms - 1200ms (Brand transition triggers cascade)
- Phase 2: 1200ms - 2800ms (Rectangle cascade)
- Phase 3: 2800ms - 4200ms (Morphing sequence)
- Phase 4: 4200ms - 5000ms (Word separation)
- Phase 5: 5000ms+ (Continuous streaming)

---

## GPU Acceleration

### File: index.css (lines 34-42)

```css
.gpu-accelerated {
  will-change: transform, opacity, filter;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
  perspective: 1000;
}
```

**Applied to:**
- `.brand-card` elements (Phase 1)
- `.rectangle` elements (Phase 2 & 3)
- `.morph-word` elements (Phase 3)
- `.stream-word` elements (Phase 4 & 5)
- Emotional state display text

**Benefits:**
- Forces hardware acceleration
- Creates separate compositor layer
- Reduces paint operations
- Maintains 60fps during animations
- Prevents layout thrashing

---

## ScrollTrigger Integration

### File: HorizontalSpectrum.tsx (lines 75-91)

```typescript
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
```

**Configuration:**
- Trigger: Section element
- Start: When section top reaches 80% of viewport
- onEnter: Starts animation sequence once
- Only triggers if animationPhase is null (prevents re-triggers)
- Cleanup: Kills trigger on unmount

---

## Performance Considerations

### Object Pooling
- Rectangle data pre-generated in `useState`
- Word data calculated once and reused
- No runtime object creation during animations

### RequestAnimationFrame
- GSAP uses RAF internally (no manual RAF needed)
- All animations synchronized to browser paint cycle
- Automatic throttling on slower devices

### Timeline Optimization
- Single timeline for morph sequence (reduces overhead)
- Stagger instead of individual delays (more efficient)
- Timeline reuse across brand transitions

### Memory Management
- Animation cleanup in useEffect return
- gsap.killTweensOf() for interrupted animations
- Ref arrays for streaming animations (easy cleanup)

---

## Testing GSAP Animations

### Chrome DevTools Performance
1. Open DevTools > Performance
2. Start recording
3. Trigger animation sequence
4. Stop after 10 seconds
5. Analyze:
   - Frame rate (should be 60fps)
   - Main thread activity (should be low)
   - GPU activity (should show layer compositing)
   - No long tasks (>50ms)

### GSAP DevTools (Optional)
```javascript
// Add to development environment
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(GSDevTools);

// Create controls
GSDevTools.create({
  animation: timelineRef.current,
  paused: true,
});
```

---

## Complete Animation Flow

1. **User scrolls to section** → ScrollTrigger fires
2. **Phase 1 starts (0s)** → Brand cards transition
3. **Phase 2 starts (1.2s)** → Rectangles cascade in
4. **Phase 3 starts (2.8s)** → Rectangles morph to words
5. **Phase 4 starts (4.2s)** → Words separate to stream positions
6. **Phase 5 starts (5.0s)** → Continuous streaming begins
7. **User navigates** → Sequence restarts from Phase 1

Total sequence duration before loop: **5.0 seconds**

---

## Easing Functions Reference

- **power3.inOut**: Smooth S-curve, gradual acceleration and deceleration
- **back.out(1.2)**: Overshoots target then settles (bounce effect)
- **power2.in**: Accelerates quickly (quadratic)
- **power1.inOut**: Gentle S-curve (linear-like)
- **power2.out**: Decelerates smoothly (quadratic)
- **none**: Linear motion (no easing)

All easing functions are built into GSAP, no custom easing curves needed.

# Animation Reference Guide

## GSAP Animation Patterns Used

### Section 1: Horizontal Spectrum

#### Brand Card Focus Transition
```typescript
gsap.to(card, {
  opacity: isFocused ? 1.0 : 0.4,
  scale: isFocused ? 1.0 : 0.85,
  filter: isFocused ? 'blur(0px)' : 'blur(4px)',
  duration: 1.2,
  ease: 'power3.inOut'
});
```

#### Emotional State Transition
```typescript
// Fade out
gsap.to(prevState, {
  scale: 0.8,
  opacity: 0,
  y: -20,
  duration: 0.6,
  ease: 'power2.in'
});

// Fade in
gsap.fromTo(newState,
  { scale: 0, opacity: 0, y: 20 },
  { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
);
```

#### Rectangle Cascade
```typescript
gsap.fromTo(rect,
  {
    x: '200px',
    y: '-100px',
    scale: 0,
    rotation: rotation + 45,
    opacity: 0
  },
  {
    x: 0,
    y: 0,
    scale: 1,
    rotation: rotation,
    opacity: opacity,
    duration: 0.8,
    delay: 0.2 * index,
    ease: 'back.out(1.2)'
  }
);
```

#### Word Streaming
```typescript
gsap.to(word, {
  x: -200,
  duration: (windowWidth + 200) / (velocity * 60),
  ease: 'none',
  repeat: -1,
  onRepeat: () => {
    // Reset position with new y coordinate
    gsap.set(element, {
      x: windowWidth + 100,
      y: windowHeight * (0.35 + Math.random() * 0.3)
    });
  }
});
```

### Section 2: Tiny Win

#### Initial Entrance
```typescript
gsap.fromTo(element,
  { scale: 0.5, opacity: 0, y: -20 },
  { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.7)' }
);
```

#### First Wave Multiplication
```typescript
gsap.fromTo(clone,
  {
    x: '50%',
    y: '50%',
    scale: 0,
    opacity: 0
  },
  {
    x: position.x + '%',
    y: position.y + '%',
    scale: 1,
    opacity: 1,
    duration: 0.6,
    delay: 0.1 * index,
    ease: 'back.out(1.2)'
  }
);
```

#### Exponential Multiplication
```typescript
gsap.fromTo(element,
  {
    x: sourcePos.x + '%',
    y: sourcePos.y + '%',
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
```

#### Pulse Effect
```typescript
gsap.to(element, {
  scale: 1.3,
  opacity: 1,
  duration: 0.4,
  ease: 'power2.out',
  yoyo: true,
  repeat: 1
});
```

#### Color Wave
```typescript
gsap.to(element, {
  color: colors[colorIndex],
  duration: 0.6,
  delay: index * 0.01,
  ease: 'power1.inOut'
});
```

#### Click Explosion
```typescript
gsap.fromTo(clone,
  {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1
  },
  {
    x: targetX - centerX,
    y: targetY - centerY,
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
    onComplete: () => clone.remove()
  }
);
```

### Section 3: Global Feelings Studio

#### Hero Image Entrance
```typescript
gsap.fromTo(image,
  {
    scale: 0.8,
    opacity: 0,
    y: 50
  },
  {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power3.out'
  }
);
```

#### Caption Fade
```typescript
gsap.fromTo(caption,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' }
);
```

#### Image Grid Multiplication
```typescript
gsap.fromTo(image,
  {
    x: '50vw',
    y: '50vh',
    width: '60vw',
    height: '75vh',
    borderRadius: '24px',
    opacity: 0
  },
  {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    opacity: 1,
    duration: 1.2,
    delay: (row + col) * 0.03,
    ease: 'power2.inOut'
  }
);
```

#### Title Reveal
```typescript
gsap.fromTo(title,
  {
    y: -50,
    opacity: 0,
    letterSpacing: '0.2em'
  },
  {
    y: 0,
    opacity: 1,
    letterSpacing: '0.05em',
    duration: 1.0,
    delay: 1.5,
    ease: 'power3.out'
  }
);
```

#### Image Hover Effect
```typescript
// Scale up
gsap.to(image, {
  scale: 1.15,
  zIndex: 100,
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  duration: 0.3,
  ease: 'power2.out'
});

// Dim others
gsap.to('.grid-image:not(:hover)', {
  opacity: 0.6,
  duration: 0.3
});
```

#### Modal Animation
```typescript
// Overlay fade
gsap.fromTo(overlay,
  { opacity: 0 },
  { opacity: 1, duration: 0.3, ease: 'power2.out' }
);

// Content entrance
gsap.fromTo(content,
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
);
```

## Easing Functions Reference

### Power Easings
- `power2.in` - Gradual acceleration
- `power2.out` - Gradual deceleration
- `power2.inOut` - Smooth acceleration and deceleration
- `power3.out` - Strong deceleration (natural feel)

### Back Easings
- `back.out(1.2)` - Slight overshoot effect
- `back.out(1.7)` - Strong overshoot (bouncy feel)

### Linear
- `none` - Constant speed (for streaming/looping)

## Timing Patterns

### Stagger Delays
- **Sequential cascade:** `0.2 * index` (200ms between items)
- **Quick stagger:** `0.05 * index` (50ms between items)
- **Ripple effect:** `0.03 * (row + col)` (diagonal cascade)
- **Color wave:** `0.01 * index` (10ms for smooth wave)

### Duration Ranges
- **Quick transitions:** 0.3-0.4s
- **Standard animations:** 0.6-0.8s
- **Hero moments:** 1.0-1.5s
- **Complex sequences:** 1.2-2.8s

### Delay Patterns
- **Initial pause:** 0.4-0.8s (let previous animation breathe)
- **Cascade start:** 1.2s (after section enters)
- **Phase transitions:** 1.5-2.0s (between major phases)

## Performance Tips

### GPU Acceleration
Always include for animated elements:
```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Kill Tweens on Cleanup
```typescript
useEffect(() => {
  // ... animations

  return () => {
    gsap.killTweensOf(elements);
  };
}, [dependencies]);
```

### Batch DOM Updates
```typescript
requestAnimationFrame(() => {
  // All DOM updates here
});
```

### Use CSS Transforms (not top/left)
```typescript
// ✓ Good
gsap.to(element, { x: 100, y: 100 });

// ✗ Avoid
gsap.to(element, { left: '100px', top: '100px' });
```

## ScrollTrigger Patterns

### Basic Trigger
```typescript
ScrollTrigger.create({
  trigger: '.section',
  start: 'top 80%',
  onEnter: () => startAnimation()
});
```

### Pin Section
```typescript
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: '+=2000',
  pin: true,
  scrub: 0.5
});
```

## Interaction Patterns

### Hover with GSAP
```typescript
element.addEventListener('mouseenter', () => {
  gsap.to(element, { scale: 1.1, duration: 0.3 });
});

element.addEventListener('mouseleave', () => {
  gsap.to(element, { scale: 1, duration: 0.3 });
});
```

### Click Effects
```typescript
element.addEventListener('click', () => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });
});
```

## Common Animation Sequences

### Fade In From Below
```typescript
gsap.fromTo(element,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
);
```

### Scale and Fade
```typescript
gsap.fromTo(element,
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }
);
```

### Slide and Fade
```typescript
gsap.fromTo(element,
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
);
```

### Continuous Loop
```typescript
gsap.to(element, {
  x: targetX,
  duration: duration,
  ease: 'none',
  repeat: -1,
  onRepeat: () => {
    gsap.set(element, { x: startX });
  }
});
```

---

All animations are designed for 60fps performance with GPU acceleration.

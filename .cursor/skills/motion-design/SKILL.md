---
name: motion-design
description: Expert knowledge in web animation and motion design using GSAP, ScrollTrigger, and React. Provides guidance on animation timing, easing functions, GPU acceleration, performance optimization, and accessibility. Use when creating animations, implementing GSAP tweens/timelines, optimizing animation performance, or working with scroll-based animations.
---

# Motion Design Expert

Expert knowledge in web animation and motion design, specializing in GSAP, performance optimization, and creating buttery-smooth 60fps animations.

## Core Principles

### 1. Animation Timing & Easing

**Easing Functions** - Use appropriate easing for different motion types:
- `power2.out` - Natural deceleration (most common)
- `power2.in` - Acceleration into action
- `power2.inOut` - Smooth start and end
- `back.out(1.2)` - Overshoot effect for playful entrances
- `elastic.out` - Bouncy, spring-like motion
- `none` - Linear motion for continuous scrolling

**Duration Guidelines**:
- Micro-interactions: 0.1-0.3s
- UI transitions: 0.3-0.5s
- Page transitions: 0.5-0.8s
- Emphasized animations: 0.8-1.2s

**Stagger Timing**: 0.05-0.1s between elements for cascading effects

### 2. Performance Optimization

#### GPU Acceleration

Always use transform properties for animations:

```css
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

#### Avoid These Properties

NEVER animate these (causes reflow/repaint):
- `width`, `height`, `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- Use `transform: scale()` and `transform: translate()` instead

#### Best Practices

- Use `will-change` sparingly (only during animation)
- Kill animations on unmount: `gsap.killTweensOf(element)`
- Use ScrollTrigger for scroll-based animations
- Object pooling for repeated animations
- RequestAnimationFrame for custom loops

### 3. GSAP Best Practices

#### Timeline Management

```typescript
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: 'power2.out' },
  onComplete: () => callback(),
});

// Overlap animations using position parameter
tl.to('.element1', { x: 100 })
  .to('.element2', { opacity: 1 }, '-=0.3'); // Start 0.3s before previous ends
```

#### Responsive Animations

```typescript
const mm = gsap.matchMedia();

mm.add({
  isMobile: '(max-width: 767px)',
  isTablet: '(min-width: 768px) and (max-width: 1023px)',
  isDesktop: '(min-width: 1024px)',
}, (context) => {
  const { isMobile, isTablet, isDesktop } = context.conditions;

  gsap.to('.element', {
    x: isMobile ? 50 : isDesktop ? 200 : 100,
  });
});
```

#### ScrollTrigger Patterns

```typescript
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '.section',
  start: 'top 80%',      // When section top hits 80% of viewport
  end: 'bottom 20%',     // When section bottom hits 20% of viewport
  scrub: true,           // Tie animation to scroll position
  markers: true,         // Debug markers (remove in production)
  onEnter: () => {},
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {},
});
```

### 4. Animation Patterns

#### Cascade Entry

```typescript
gsap.fromTo('.items',
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  }
);
```

#### Morphing Sequence

```typescript
const tl = gsap.timeline();

tl.to('.shape', { scale: 0.2, duration: 0.4, ease: 'power2.in' });
tl.to('.shape', {
  width: 'auto',
  height: 'auto',
  borderRadius: 4,
  duration: 0.3,
  ease: 'power1.inOut',
}, '-=0.2');
tl.to('.shape', { opacity: 0, duration: 0.5 }, '-=0.2');
tl.fromTo('.text',
  { opacity: 0, scale: 0.2 },
  { opacity: 1, scale: 1, duration: 0.5 },
  '-=0.3'
);
```

#### Continuous Loop

```typescript
gsap.to('.stream', {
  x: -200,
  duration: 10,
  ease: 'none',
  repeat: -1,
  onRepeat: () => {
    gsap.set('.stream', { x: window.innerWidth + 100 });
  },
});
```

#### Hover Effects

```typescript
const handleMouseEnter = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.15,
    zIndex: 100,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

const handleMouseLeave = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    zIndex: 1,
    boxShadow: 'none',
    duration: 0.3,
    ease: 'power2.in',
  });
};
```

### 5. React + GSAP Integration

#### Component Pattern

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    timelineRef.current = gsap.timeline();
    timelineRef.current.to(elementRef.current, {
      x: 100,
      duration: 1,
    });

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return <div ref={elementRef}>Animate me</div>;
};
```

#### Phase-Based Animation

```typescript
type Phase = 'initial' | 'animating' | 'complete';
const [phase, setPhase] = useState<Phase>('initial');

useEffect(() => {
  if (phase === 'animating') {
    const tl = gsap.timeline({
      onComplete: () => setPhase('complete'),
    });

    tl.to('.element', { x: 100, duration: 1 });

    return () => tl.kill();
  }
}, [phase]);
```

### 6. Accessibility

Always provide alternatives for motion:

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  gsap.set('.element', { x: 100 });
} else {
  gsap.to('.element', { x: 100, duration: 1 });
}
```

Screen reader announcements:

```tsx
<div aria-live="polite" role="status" className="sr-only">
  {phase === 'animating' && 'Animation in progress'}
  {phase === 'complete' && 'Animation complete'}
</div>
```

### 7. Common Animation Sequences

#### Hero Section Entry

```typescript
const heroEntrance = () => {
  const tl = gsap.timeline();

  tl.fromTo('.hero-title',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  )
  .fromTo('.hero-subtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  )
  .fromTo('.hero-cta',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' },
    '-=0.3'
  );
};
```

#### Modal Open/Close

```typescript
// Open
gsap.timeline()
  .to('.modal-overlay', { opacity: 1, duration: 0.3 })
  .fromTo('.modal-content',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' },
    '-=0.2'
  );

// Close
gsap.timeline()
  .to('.modal-content', {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
  .to('.modal-overlay', { opacity: 0, duration: 0.3 }, '-=0.2');
```

#### Image Grid Formation

```typescript
imageElements.forEach((element, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const delay = (row + col) * 0.03;

  gsap.fromTo(element,
    { x: '50vw', y: '50vh', scale: 0, opacity: 0 },
    {
      x: 0, y: 0, scale: 1, opacity: 1,
      duration: 1.2,
      delay: delay,
      ease: 'power2.inOut',
    }
  );
});
```

### 8. Debugging

```typescript
// Add markers to see trigger points
ScrollTrigger.create({
  trigger: '.section',
  markers: true,
  id: 'section-1',
});

// Log timeline progress
const tl = gsap.timeline({
  onUpdate: function() {
    console.log('Progress:', this.progress());
  },
});

// Slow motion for debugging
gsap.globalTimeline.timeScale(0.5);
```

### 9. Mobile Considerations

- Reduce particle counts on mobile (use `window.innerWidth < 768`)
- Simplify animations (fewer steps, shorter durations)
- Avoid `position: fixed` animations (causes jank on mobile)
- Test on actual devices (not just desktop DevTools)
- Use touch events: `touchstart`, `touchmove`, `touchend`

### 10. Common Pitfalls to Avoid

1. **Animating non-transform properties** - Causes layout thrashing
2. **Not killing animations on unmount** - Memory leaks
3. **Overusing will-change** - Can hurt performance
4. **Too many simultaneous animations** - Keep under 30 active tweens
5. **Not considering reduced motion preferences** - Accessibility issue
6. **Forgetting to cleanup ScrollTriggers** - Call `.kill()` in cleanup
7. **Using setState during animation loop** - Use refs instead
8. **Not testing on real mobile devices** - Desktop sim isn't accurate

## Quick Reference

```typescript
// Basic tween
gsap.to('.element', { x: 100, duration: 1, ease: 'power2.out' });

// Timeline
const tl = gsap.timeline();
tl.to('.el1', { x: 100 })
  .to('.el2', { y: 50 }, '-=0.5');

// ScrollTrigger
ScrollTrigger.create({
  trigger: '.section',
  start: 'top center',
  onEnter: () => {},
});

// Stagger
gsap.to('.items', { x: 100, stagger: 0.1 });

// Kill animations
gsap.killTweensOf('.element');

// Set without animation
gsap.set('.element', { x: 100 });

// Responsive
gsap.matchMedia().add('(max-width: 768px)', () => {
  gsap.to('.el', { x: 50 });
});
```

---

Use this skill to create professional, performant, and accessible web animations that enhance user experience without compromising performance.

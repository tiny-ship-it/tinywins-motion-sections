# PRD-03: Global Feelings Studio Section

## Overview
A full-screen animated section showcasing a collection of emotional photography from around the world. Large portrait images dramatically shrink and arrange themselves into a grid mosaic while revealing the "Global Feelings Studio" branding. This section emphasizes the universal nature of human emotion through powerful imagery.

## Visual Concept
The animation represents the transformation from individual emotional portraits to a collective tapestry of global feelings. Images start large and intimate, then compress into a cohesive grid that reveals both unity and diversity.

## Layout Structure

### Initial State
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ┌────────────────────┐                                │
│   │                    │                                │
│   │  Large Portrait    │                                │
│   │  Image (centered)  │                                │
│   │                    │                                │
│   └────────────────────┘                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Final State
```
┌─────────────────────────────────────────────────────────┐
│        GLOBAL FEELINGS STUDIO                           │
│                                                          │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐                      │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤                      │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤                      │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤                      │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤                      │
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘                      │
│                                                          │
│  Capturing authentic emotions from every corner         │
│  of the world                                           │
└─────────────────────────────────────────────────────────┘
```

## Image Specifications

### Image Requirements
```typescript
interface EmotionalPortrait {
  id: string;
  url: string;
  alt: string;
  location: string;
  emotion: string;
  photographer: string;
  gridPosition: {
    row: number;
    col: number;
  };
}
```

### Image Properties
- **Format**: WebP with JPEG fallback
- **Aspect Ratio**: 4:5 (portrait orientation)
- **Resolution**:
  - Large (initial): 1200x1500px
  - Grid (final): 300x375px
- **File Size**: < 150KB per image (optimized)
- **Total Images**: 50 portraits

### Emotional Categories
```typescript
const EMOTION_CATEGORIES = [
  'Joy',
  'Contemplation',
  'Determination',
  'Serenity',
  'Courage',
  'Wonder',
  'Connection',
  'Resilience',
  'Peace',
  'Hope'
];
```

## Animation Sequence

### Phase 1: Hero Image Display (0s - 2.0s)

**Initial Image**:
- **Size**: 60vw x 75vh (large, centered)
- **Position**: Center of viewport
- **Border Radius**: 24px
- **Shadow**: `0 20px 60px rgba(0,0,0,0.3)`
- **Overlay**: Dark gradient for text readability

**Entry Animation**:
```typescript
gsap.fromTo('.hero-portrait',
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

**Caption Display**:
```typescript
gsap.fromTo('.hero-caption',
  {
    opacity: 0,
    y: 20
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.8,
    ease: 'power2.out'
  }
);
```

**Caption Content**:
```html
<div class="hero-caption">
  <p class="location">Mumbai, India</p>
  <p class="emotion">Joy</p>
</div>
```

### Phase 2: Image Multiplication (2.0s - 3.5s)

**Action**: Single image clones into 49 additional images (50 total)

**Clone Generation**:
```typescript
function generateImageClones() {
  const gridConfig = {
    rows: 5,
    cols: 10,
    gap: 8, // pixels
    containerWidth: 90, // vw
    containerHeight: 70 // vh
  };

  const imageWidth = (gridConfig.containerWidth / gridConfig.cols);
  const imageHeight = (gridConfig.containerHeight / gridConfig.rows);

  const clones: ImageClone[] = [];

  for (let row = 0; row < gridConfig.rows; row++) {
    for (let col = 0; col < gridConfig.cols; col++) {
      const index = row * gridConfig.cols + col;

      clones.push({
        id: `clone-${index}`,
        image: PORTRAITS[index],
        sourcePosition: { x: 50, y: 50 }, // center
        targetPosition: {
          x: (col * imageWidth) + (imageWidth / 2),
          y: (row * imageHeight) + (imageHeight / 2) + 15 // offset for header
        },
        delay: (row + col) * 0.03 // diagonal cascade
      });
    }
  }

  return clones;
}
```

**Clone Animation**:
```typescript
const clones = generateImageClones();

clones.forEach((clone) => {
  const element = createImageElement(clone.image);

  gsap.fromTo(element,
    {
      x: clone.sourcePosition.x + '%',
      y: clone.sourcePosition.y + '%',
      width: '60vw',
      height: '75vh',
      borderRadius: 24,
      opacity: 0,
      zIndex: 1
    },
    {
      x: clone.targetPosition.x + '%',
      y: clone.targetPosition.y + '%',
      width: '8.5vw',
      height: '13vh',
      borderRadius: 4,
      opacity: 1,
      duration: 1.2,
      delay: clone.delay,
      ease: 'power2.inOut'
    }
  );
});
```

**Hero Image Behavior**:
```typescript
// Hero image transitions to its grid position
gsap.to('.hero-portrait', {
  x: clones[0].targetPosition.x + '%',
  y: clones[0].targetPosition.y + '%',
  width: '8.5vw',
  height: '13vh',
  borderRadius: 4,
  duration: 1.2,
  ease: 'power2.inOut',
  onComplete: () => {
    // Remove hero, show grid version
    document.querySelector('.hero-portrait').style.display = 'none';
  }
});
```

### Phase 3: Header Reveal (3.5s - 4.5s)

**Title Animation**:
```typescript
gsap.fromTo('.section-title',
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
    ease: 'power3.out'
  }
);
```

**Title Properties**:
- **Text**: "GLOBAL FEELINGS STUDIO"
- **Font**: Inter Bold, 48px
- **Letter Spacing**: 0.05em
- **Color**: #1A1A1A
- **Position**: Top center, 40px from top

### Phase 4: Tagline Reveal (4.5s - 5.5s)

**Tagline Animation**:
```typescript
gsap.fromTo('.section-tagline',
  {
    y: 20,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }
);
```

**Tagline Properties**:
- **Text**: "Capturing authentic emotions from every corner of the world"
- **Font**: Inter Regular, 20px
- **Color**: #666666
- **Position**: Below grid, centered, 32px gap

### Phase 5: Hover Interaction (continuous)

**Image Hover Effect**:
```typescript
function setupImageHoverEffects() {
  const images = document.querySelectorAll('.grid-image');

  images.forEach((image) => {
    image.addEventListener('mouseenter', () => {
      // Scale up hovered image
      gsap.to(image, {
        scale: 1.15,
        zIndex: 100,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Show image caption
      const caption = image.querySelector('.image-caption');
      gsap.to(caption, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Dim surrounding images
      gsap.to('.grid-image:not(:hover)', {
        opacity: 0.6,
        duration: 0.3
      });
    });

    image.addEventListener('mouseleave', () => {
      // Reset scale
      gsap.to(image, {
        scale: 1,
        zIndex: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.in'
      });

      // Hide caption
      const caption = image.querySelector('.image-caption');
      gsap.to(caption, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in'
      });

      // Restore opacity to all images
      gsap.to('.grid-image', {
        opacity: 1,
        duration: 0.3
      });
    });
  });
}
```

### Phase 6: Ripple Effect on Click (interactive)

**Click Interaction**:
```typescript
function handleImageClick(clickedImage: HTMLElement, index: number) {
  const gridImages = document.querySelectorAll('.grid-image');

  gridImages.forEach((image, imgIndex) => {
    const rowClicked = Math.floor(index / 10);
    const colClicked = index % 10;
    const rowImg = Math.floor(imgIndex / 10);
    const colImg = imgIndex % 10;

    // Calculate Manhattan distance
    const distance = Math.abs(rowImg - rowClicked) + Math.abs(colImg - colClicked);

    // Create ripple effect
    gsap.fromTo(image,
      {
        scale: 1,
        opacity: 1
      },
      {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        delay: distance * 0.05,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      }
    );
  });

  // Show modal with full image
  showImageModal(clickedImage);
}
```

## Grid Layout System

### Responsive Grid
```typescript
const GRID_BREAKPOINTS = {
  desktop: {
    cols: 10,
    rows: 5,
    gap: 8,
    imageWidth: '8.5vw',
    imageHeight: '13vh'
  },
  tablet: {
    cols: 6,
    rows: 8,
    gap: 6,
    imageWidth: '14vw',
    imageHeight: '12vh'
  },
  mobile: {
    cols: 3,
    rows: 16,
    gap: 4,
    imageWidth: '30vw',
    imageHeight: '20vh'
  }
};
```

### Grid Container
```css
.image-grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  width: 90vw;
  height: 70vh;
  margin: 0 auto;
  padding-top: 100px; /* space for header */
}
```

## Image Caption Overlay

```html
<div class="grid-image">
  <img src="portrait.jpg" alt="Joy - Mumbai, India" />
  <div class="image-caption">
    <p class="caption-location">Mumbai, India</p>
    <p class="caption-emotion">Joy</p>
  </div>
</div>
```

```css
.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8) 0%,
    rgba(0,0,0,0) 100%
  );
  color: white;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.caption-location {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}

.caption-emotion {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}
```

## Image Modal

```typescript
interface ModalConfig {
  image: EmotionalPortrait;
  showDetails: boolean;
  onClose: () => void;
}

function showImageModal(image: EmotionalPortrait) {
  const modal = createModal({
    image,
    showDetails: true,
    onClose: closeModal
  });

  // Animate modal entrance
  gsap.fromTo(modal,
    {
      scale: 0.8,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.2)'
    }
  );
}
```

```html
<div class="image-modal">
  <div class="modal-overlay" onclick="closeModal()"></div>
  <div class="modal-content">
    <button class="modal-close">×</button>
    <img src="portrait-large.jpg" alt="Joy - Mumbai, India" />
    <div class="modal-details">
      <h3>Joy</h3>
      <p class="location">Mumbai, India</p>
      <p class="photographer">Photo by: Priya Sharma</p>
      <p class="description">
        A moment of pure joy captured in the bustling streets of Mumbai.
        This portrait embodies the spirit of resilience and optimism.
      </p>
    </div>
  </div>
</div>
```

## Component Architecture

```typescript
// GlobalFeelingsStudio.tsx
interface GlobalFeelingsStudioProps {
  portraits: EmotionalPortrait[];
  autoPlay?: boolean;
  enableInteractions?: boolean;
}

// ImageGrid.tsx
interface ImageGridProps {
  images: EmotionalPortrait[];
  layout: GridLayout;
  onImageClick: (image: EmotionalPortrait, index: number) => void;
  onImageHover: (image: EmotionalPortrait, index: number) => void;
}

// HeroImage.tsx
interface HeroImageProps {
  portrait: EmotionalPortrait;
  onTransitionComplete: () => void;
}

// ImageModal.tsx
interface ImageModalProps {
  portrait: EmotionalPortrait;
  isOpen: boolean;
  onClose: () => void;
}
```

## Scroll Trigger Configuration

```typescript
ScrollTrigger.create({
  trigger: '.global-feelings-section',
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => {
    startGlobalFeelingsSequence();
  },
  onEnterBack: () => {
    // Show grid state immediately
    showGridState();
  },
  onLeave: () => {
    pauseAnimations();
  }
});

// Pin section during transformation
ScrollTrigger.create({
  trigger: '.global-feelings-section',
  start: 'top top',
  end: '+=1500',
  pin: true,
  scrub: 0.5,
  onUpdate: (self) => {
    const progress = self.progress;

    if (progress < 0.4) {
      // Show hero image
      setAnimationPhase('hero');
    } else if (progress < 0.7) {
      // Show multiplication
      setAnimationPhase('multiplication');
    } else {
      // Show final grid
      setAnimationPhase('grid');
    }
  }
});
```

## Performance Optimizations

### 1. Progressive Image Loading
```typescript
class ImageLoader {
  private loaded: Set<string> = new Set();
  private loading: Map<string, Promise<void>> = new Map();

  async loadImage(url: string): Promise<HTMLImageElement> {
    if (this.loaded.has(url)) {
      return this.getCachedImage(url);
    }

    if (this.loading.has(url)) {
      await this.loading.get(url);
      return this.getCachedImage(url);
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loaded.add(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });

    this.loading.set(url, promise);
    await promise;
    this.loading.delete(url);

    return this.getCachedImage(url);
  }

  private getCachedImage(url: string): HTMLImageElement {
    const img = new Image();
    img.src = url;
    return img;
  }
}
```

### 2. Lazy Load Grid Images
```typescript
function setupLazyLoading() {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');

        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px'
  });

  document.querySelectorAll('.grid-image img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}
```

### 3. GPU Acceleration
```css
.grid-image {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.hero-portrait {
  will-change: transform, opacity, width, height;
  transform: translateZ(0);
}
```

### 4. Image Optimization
```typescript
function getOptimizedImageUrl(
  baseUrl: string,
  width: number,
  quality: number = 80
): string {
  // Use image CDN for automatic optimization
  return `${baseUrl}?w=${width}&q=${quality}&fm=webp`;
}

// Usage
const gridImageUrl = getOptimizedImageUrl(portrait.url, 300, 80);
const modalImageUrl = getOptimizedImageUrl(portrait.url, 1200, 90);
```

## Accessibility Considerations

### 1. Keyboard Navigation
```typescript
function setupKeyboardNavigation() {
  const images = document.querySelectorAll('.grid-image');
  let focusedIndex = 0;

  document.addEventListener('keydown', (e) => {
    const cols = 10;

    switch (e.key) {
      case 'ArrowRight':
        focusedIndex = Math.min(focusedIndex + 1, images.length - 1);
        break;
      case 'ArrowLeft':
        focusedIndex = Math.max(focusedIndex - 1, 0);
        break;
      case 'ArrowDown':
        focusedIndex = Math.min(focusedIndex + cols, images.length - 1);
        break;
      case 'ArrowUp':
        focusedIndex = Math.max(focusedIndex - cols, 0);
        break;
      case 'Enter':
        handleImageClick(images[focusedIndex], focusedIndex);
        return;
      default:
        return;
    }

    e.preventDefault();
    (images[focusedIndex] as HTMLElement).focus();
  });
}
```

### 2. Screen Reader Support
```html
<section
  aria-label="Global Feelings Studio - Portrait Gallery"
  role="region"
>
  <h1 id="gallery-title">Global Feelings Studio</h1>
  <p id="gallery-description">
    A collection of 50 emotional portraits from around the world
  </p>

  <div
    class="image-grid"
    role="list"
    aria-labelledby="gallery-title"
    aria-describedby="gallery-description"
  >
    <div class="grid-image" role="listitem" tabindex="0">
      <img
        src="portrait.jpg"
        alt="Portrait of joy from Mumbai, India, photographed by Priya Sharma"
      />
    </div>
  </div>
</section>
```

### 3. Reduced Motion
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Skip shrinking animation
  // Show grid immediately
  showGridState();

  // Disable hover scale effects
  disableHoverEffects();
}
```

### 4. Focus Indicators
```css
.grid-image:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
  z-index: 100;
}

.grid-image:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}
```

## Data Management

```typescript
// portraits.ts
export const PORTRAITS: EmotionalPortrait[] = [
  {
    id: 'portrait-001',
    url: '/images/portraits/mumbai-joy.jpg',
    alt: 'Portrait of joy from Mumbai, India',
    location: 'Mumbai, India',
    emotion: 'Joy',
    photographer: 'Priya Sharma',
    gridPosition: { row: 0, col: 0 }
  },
  {
    id: 'portrait-002',
    url: '/images/portraits/tokyo-contemplation.jpg',
    alt: 'Portrait of contemplation from Tokyo, Japan',
    location: 'Tokyo, Japan',
    emotion: 'Contemplation',
    photographer: 'Yuki Tanaka',
    gridPosition: { row: 0, col: 1 }
  },
  // ... 48 more portraits
];
```

## Testing Requirements

### 1. Visual Regression Tests
```typescript
describe('GlobalFeelingsStudio', () => {
  it('should display hero image correctly', async () => {
    const screenshot = await takeScreenshot('.hero-portrait');
    expect(screenshot).toMatchSnapshot();
  });

  it('should create proper grid layout', async () => {
    await waitForAnimation(5000);
    const screenshot = await takeScreenshot('.image-grid');
    expect(screenshot).toMatchSnapshot();
  });

  it('should handle hover states', async () => {
    await hoverImage(0);
    const screenshot = await takeScreenshot('.image-grid');
    expect(screenshot).toMatchSnapshot();
  });
});
```

### 2. Performance Tests
```typescript
describe('Performance', () => {
  it('should load all images within 3 seconds', async () => {
    const startTime = performance.now();
    await waitForAllImagesLoaded();
    const loadTime = performance.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
  });

  it('should maintain 60fps during animation', async () => {
    const fps = await measureFPS(5000);
    expect(fps).toBeGreaterThanOrEqual(55);
  });

  it('should use less than 150MB memory', () => {
    const memory = performance.memory.usedJSHeapSize / 1024 / 1024;
    expect(memory).toBeLessThan(150);
  });
});
```

### 3. Accessibility Tests
```typescript
describe('Accessibility', () => {
  it('should have proper ARIA labels', () => {
    expect(document.querySelector('[role="region"]')).toBeTruthy();
    expect(document.querySelector('[aria-label]')).toBeTruthy();
  });

  it('should be keyboard navigable', async () => {
    await pressKey('Tab');
    expect(document.activeElement).toHaveClass('grid-image');
  });

  it('should announce changes to screen readers', () => {
    const announcer = document.querySelector('[aria-live]');
    expect(announcer.textContent).not.toBe('');
  });
});
```

## Success Metrics

1. Hero image creates strong emotional impact
2. Shrinking animation is smooth and dramatic
3. Grid layout is visually balanced and organized
4. Hover interactions feel responsive and delightful
5. Modal provides detailed information without breaking flow
6. Images load progressively without layout shift
7. Performance remains optimal with 50 high-quality images
8. Accessibility features are comprehensive and seamless

## Implementation Files

```
src/
├── components/
│   ├── GlobalFeelingsStudio/
│   │   ├── GlobalFeelingsStudio.tsx
│   │   ├── HeroImage.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── GridImage.tsx
│   │   ├── ImageModal.tsx
│   │   └── index.ts
├── hooks/
│   ├── useImageLoader.ts
│   ├── useGridLayout.ts
│   ├── useImageModal.ts
│   └── useKeyboardNavigation.ts
├── types/
│   └── globalFeelings.ts
├── data/
│   └── portraits.ts
└── utils/
    ├── imageOptimization.ts
    └── gridCalculations.ts
```

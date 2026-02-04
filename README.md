# Tinywins Motion Sections

Three full-screen animated sections showcasing advanced motion design with GSAP, React, and TypeScript. Built to demonstrate sophisticated scroll-triggered animations, kinetic typography, and interactive visual storytelling.

## Project Overview

This project implements three distinct animated sections, each with unique visual treatments and interaction patterns:

1. **Horizontal Spectrum** - Brand cards with morphing rectangles and emotion word streams
2. **Tiny Win** - Word multiplication effect showing exponential growth
3. **Global Feelings Studio** - Image mosaic with dramatic shrinking transitions

## Tech Stack

- **Framework**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7.2.4](https://vite.dev/)
- **Animation**: [GSAP 3.14.2](https://greensock.com/gsap/) with ScrollTrigger
- **Styling**: CSS Modules + Modern CSS
- **Linting**: ESLint 9 with TypeScript support

## Documentation

Detailed technical specifications for each section:

- [PRD-01: Horizontal Spectrum Section](./docs/PRD-01-HORIZONTAL-SPECTRUM.md)
- [PRD-02: Tiny Win Section](./docs/PRD-02-TINY-WIN.md)
- [PRD-03: Global Feelings Studio Section](./docs/PRD-03-GLOBAL-FEELINGS-STUDIO.md)

Each PRD includes:
- Visual specifications and layouts
- Complete animation sequences with timing
- GSAP configuration and code examples
- Component architecture
- Performance optimizations
- Accessibility considerations
- Testing requirements

## Features

### Section 1: Horizontal Spectrum
- Brand cards with horizontal scroll interaction
- Each brand drives its own unique emotional state
- Cascading rectangles that morph into emotion words
- Continuous horizontal word streaming animation
- Brand-linked emotional states (Gaping Void → Irresistible, Tiny Wins → Unstoppable, Local Feelings → Untouchable)

### Section 2: Tiny Win
- Single phrase multiplication effect
- Exponential growth from 1 to 200+ instances
- Random size, position, and opacity distribution
- Color wave animations
- Pulse effects for visual interest
- Interactive click-to-explode features

### Section 3: Global Feelings Studio
- Hero image with dramatic entrance
- Image shrinking and grid formation
- 50 emotional portraits from around the world
- Hover effects with caption reveals
- Click-to-expand modal interactions
- Ripple effects on interaction

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tinywins-motion-sections.git
cd tinywins-motion-sections

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

The development server includes:
- Hot Module Replacement (HMR)
- Fast Refresh for React components
- TypeScript type checking
- ESLint integration

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

### Asset Extraction

Extract visual assets from the Figma design file:

```bash
# Extract brand cards and hero images from Figma
npm run extract-figma
```

**Prerequisites:**
1. Install and open Figma Desktop App
2. Open the [TW Website Redesign 2026](https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026?node-id=319-167) file
3. Enable "Dev Mode MCP Server" in Figma Preferences
4. The extraction script will automatically pull screenshots of:
   - 6 brand cards for the Horizontal Spectrum section
   - 1 hero image for the Global Feelings Studio section

For detailed instructions, see [FIGMA-ASSET-EXTRACTION.md](./docs/FIGMA-ASSET-EXTRACTION.md)

## Project Structure

```
tinywins-motion-sections/
├── docs/                          # Technical PRDs
│   ├── PRD-01-HORIZONTAL-SPECTRUM.md
│   ├── PRD-02-TINY-WIN.md
│   ├── PRD-03-GLOBAL-FEELINGS-STUDIO.md
│   └── FIGMA-ASSET-EXTRACTION.md # Figma asset extraction guide
├── public/                        # Static assets
│   └── assets/
│       ├── brands/               # Brand card images
│       ├── images/               # Hero and feature images
│       ├── manifest.json         # Asset metadata (auto-generated)
│       └── manifest.example.json # Example manifest structure
├── src/
│   ├── components/               # React components
│   │   ├── HorizontalSpectrum/
│   │   │   ├── HorizontalSpectrum.tsx
│   │   │   ├── BrandCard.tsx
│   │   │   ├── EmotionalStateDisplay.tsx
│   │   │   ├── CascadingRectangles.tsx
│   │   │   └── EmotionWordsStream.tsx
│   │   ├── TinyWinSection/
│   │   │   ├── TinyWinSection.tsx
│   │   │   ├── TinyWinInstance.tsx
│   │   │   ├── TinyWinController.tsx
│   │   │   └── TinyWinPool.ts
│   │   └── GlobalFeelingsStudio/
│   │       ├── GlobalFeelingsStudio.tsx
│   │       ├── HeroImage.tsx
│   │       ├── ImageGrid.tsx
│   │       ├── GridImage.tsx
│   │       └── ImageModal.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useGSAPAnimations.ts
│   │   ├── useBrandTransition.ts
│   │   ├── useWordStream.ts
│   │   ├── useTinyWinAnimation.ts
│   │   ├── useInstancePool.ts
│   │   ├── useImageLoader.ts
│   │   ├── useGridLayout.ts
│   │   └── useImageModal.ts
│   ├── types/                    # TypeScript type definitions
│   │   ├── horizontalSpectrum.ts
│   │   ├── tinyWin.ts
│   │   └── globalFeelings.ts
│   ├── data/                     # Static data
│   │   ├── brands.ts
│   │   └── portraits.ts
│   ├── utils/                    # Utility functions
│   │   ├── animationHelpers.ts
│   │   ├── instanceGenerator.ts
│   │   ├── imageOptimization.ts
│   │   └── gridCalculations.ts
│   ├── App.tsx                   # Main app component
│   ├── App.css                   # Global styles
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts            # Vite type definitions
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node-specific TS config
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

## Animation Architecture

### GSAP Timeline Structure

Each section uses GSAP timelines for complex animation sequences:

```typescript
// Example: Horizontal Spectrum timeline
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.horizontal-spectrum-section',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1
  }
});

timeline
  .add(brandCardTransition())
  .add(rectangleCascade(), '-=0.2')
  .add(rectangleMorphing())
  .add(wordSeparation())
  .add(horizontalStreaming());
```

### Performance Optimizations

- **GPU Acceleration**: All animated elements use `transform` and `opacity` for 60fps
- **will-change**: Strategic use for transform-heavy animations
- **Instance Pooling**: Reusable element pools for word multiplication
- **Lazy Loading**: Progressive image loading for portrait grid
- **requestAnimationFrame**: Custom animation loops for continuous effects

### Scroll Trigger Integration

```typescript
ScrollTrigger.create({
  trigger: '.section',
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => startAnimation(),
  onEnterBack: () => resumeAnimation(),
  onLeave: () => pauseAnimation(),
  scrub: 1,
  pin: true
});
```

## Accessibility

All sections include comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard control for interactive elements
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Management**: Visible focus indicators and logical tab order
- **Semantic HTML**: Proper use of landmarks and headings

## Browser Support

- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari (iOS 16+)
- Chrome Mobile (Android 12+)

## Performance Targets

- **Desktop**: 60fps during all animations
- **Mobile**: 30fps minimum
- **Load Time**: < 3 seconds for initial render
- **Memory**: < 150MB for entire application
- **Time to Interactive**: < 2 seconds

## Development Guidelines

### Code Style

- Follow TypeScript strict mode
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components single-responsibility
- Write self-documenting code with clear names

### Animation Principles

- Respect user motion preferences
- Use appropriate easing functions for context
- Maintain consistent timing across sections
- Ensure animations enhance rather than distract
- Provide clear visual feedback for interactions

### Component Patterns

```typescript
// Preferred pattern for animated components
interface ComponentProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export const AnimatedComponent: React.FC<ComponentProps> = ({
  isVisible,
  onAnimationComplete
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAPAnimation(elementRef, isVisible, onAnimationComplete);

  return <div ref={elementRef}>Content</div>;
};
```

## Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

### Test Coverage Requirements

- Unit tests for all utility functions
- Integration tests for animation sequences
- Visual regression tests for each section
- Performance benchmarks for animation smoothness
- Accessibility audits with automated tools

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-animation`)
3. Commit your changes (`git commit -m 'Add amazing animation'`)
4. Push to the branch (`git push origin feature/amazing-animation`)
5. Open a Pull Request

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## License

This project is private and proprietary.

## Credits

- **Animation Library**: [GSAP](https://greensock.com/) by GreenSock
- **Framework**: [React](https://react.dev/) by Meta
- **Build Tool**: [Vite](https://vite.dev/) by Evan You and team
- **Design Inspiration**: Tinywins brand guidelines

## Contact

For questions or support, please contact the development team.

---

Built with precision and attention to detail for Tinywins.

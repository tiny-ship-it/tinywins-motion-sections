# Horizontal Spectrum - Quick Reference Card

## Access URLs
- **Network**: http://192.168.12.208:5174/
- **Local**: http://localhost:5174/

## Project Location
`/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections`

## Animation Timeline
```
0s ────────── 1.2s ────────── 2.8s ────────── 4.2s ──── 5.0s ───────→ ∞
│             │               │               │          │
Phase 1       Phase 2         Phase 3         Phase 4    Phase 5
Brand Card    Rectangle       Morphing        Word       Streaming
Scroll        Cascade                         Separation (Loop)
```

## Brand States
| Brand | State | Color | Hex |
|-------|-------|-------|-----|
| Gaping Void | Irresistible | Coral | #FF6B6B |
| Tiny Wins | Unstoppable | Turquoise | #4ECDC4 |
| Local Feelings | Untouchable | Sage | #95E1D3 |

## Keyboard Controls
- **←** Previous brand
- **→** Next brand  
- **Space** Pause/Resume

## Components (6)
```
HorizontalSpectrum/
├── HorizontalSpectrum.tsx       Main orchestrator
├── BrandCard.tsx                280x360px cards
├── EmotionalStateDisplay.tsx    Header text
├── CascadingRectangles.tsx      Phases 2 & 3
├── EmotionWordsStream.tsx       Phases 4 & 5
└── NavigationControls.tsx       UI controls
```

## Animation Specs

### Phase 1: Brand Card (1.2s)
- Duration: 1.2s
- Easing: power3.inOut
- Props: x, scale, opacity, blur

### Phase 2: Cascade (1.6s)
- Count: 8 rects (5 mobile)
- Stagger: 0.2s
- Duration: 0.8s each
- Easing: back.out(1.2)

### Phase 3: Morph (1.4s)
- Step 1: Scale 1→0.2, 0.4s, power2.in
- Step 2: Shape distort, 0.3s
- Step 3: Cross-fade, 0.5s

### Phase 4: Separate (0.8s)
- Duration: 0.8s
- Easing: power2.out
- Spacing: 150px horizontal

### Phase 5: Stream (∞)
- Easing: none (linear)
- Velocity: 0.5-1.5 px/frame
- Loop: Infinite

## File Paths
- Components: `src/components/HorizontalSpectrum/`
- Data: `src/data/brands.ts`
- Types: `src/types/horizontalSpectrum.ts`
- Styles: `src/index.css`

## Responsive Breakpoints
- Desktop: ≥1024px (280x360px cards, 8 rects)
- Tablet: 768-1023px (240x308px cards, 8 rects)
- Mobile: ≤767px (single card, 5 rects)

## Performance
- Target: 60fps
- GPU: All animated elements
- Classes: `.gpu-accelerated`
- Props: `will-change`, `translateZ(0)`

## Testing Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Common Issues
| Issue | Fix |
|-------|-----|
| Rects appear together | Check 0.2s stagger |
| Words wrong position | Match rect positions |
| Streaming stutters | Verify GPU acceleration |
| Keyboard not working | Check focus, no inputs |

## Documentation
1. **DEPLOYMENT-SUMMARY.md** - Complete status
2. **IMPLEMENTATION-VERIFICATION.md** - Technical specs
3. **ANIMATION-TESTING-GUIDE.md** - Testing steps
4. **GSAP-ANIMATION-REFERENCE.md** - Code examples

## Tech Stack
- React 19.2.0
- TypeScript 5.9.3
- GSAP 3.14.2
- Tailwind 4.1.18
- Vite 7.3.1

## Status: ✅ PRODUCTION READY

All PRD-01 requirements implemented and tested.

# Animation Testing Guide - Horizontal Spectrum

## Quick Access
- **Network URL**: http://192.168.12.208:5174/
- **Local URL**: http://localhost:5174/

## Animation Sequence Timeline

### Phase 1: Brand Card Scroll (0s - 1.2s)
**What to Watch:**
- Three brand cards (Gaping Void, Tiny Wins, Local Feelings)
- Center card is in focus (scale: 1.0, opacity: 1.0, no blur)
- Side cards are defocused (scale: 0.85, opacity: 0.4, blur: 4px)
- Smooth power3.inOut easing
- Header shows: "Brands that make us feel [Unstoppable/Irresistible/Untouchable]"

**Test Actions:**
- Press Right Arrow (→) to switch to next brand
- Press Left Arrow (←) to switch to previous brand
- Verify smooth 1.2s transition between brands

### Phase 2: Rectangle Cascade (1.2s - 2.8s)
**What to Watch:**
- 8 colored rectangles appear (5 on mobile)
- Cascade from top-right to bottom-left
- Each rectangle animates in with:
  - Start position: +200px right, -100px up
  - Rotation from +45° to final rotation
  - Scale from 0 to 1
  - Opacity from 0 to 0.6-0.9
- Stagger: 0.2s between each rectangle
- Duration: 0.8s per rectangle
- Easing: back.out(1.2) - creates a bounce effect

**Test Actions:**
- Wait for cascade to complete (1.6s total)
- Verify all rectangles appear sequentially
- Check diagonal pattern from top-right to bottom-left

### Phase 3: Morphing (2.8s - 4.2s)
**What to Watch:**
- **Step 1 (0.4s)**: Rectangles scale down from 1.0 to 0.2
  - power2.in easing (accelerates)
  - 0.05s stagger between rectangles
  
- **Step 2 (0.3s)**: Shape distortion
  - Width changes to match text width
  - Height shrinks to 32px
  - Border radius reduces to 4px
  
- **Step 3 (0.5s)**: Cross-fade
  - Rectangles fade out (opacity → 0)
  - Words fade in at EXACT same positions (opacity → 0.8)
  - Words scale from 0.2 to 1.0

**Test Actions:**
- Watch for smooth morph sequence
- Verify words appear exactly where rectangles were
- Check timing overlaps create smooth transitions

### Phase 4: Word Separation (4.2s - 5.0s)
**What to Watch:**
- Words move from morphed positions to streaming positions
- Horizontal spacing: 150px apart
- Vertical position: Random 35-65% of viewport height
- Duration: 0.8s
- Easing: power2.out (decelerates)
- Slight stagger: 0.05s per word

**Test Actions:**
- Verify words spread out horizontally
- Check random Y positions create visual variety
- Ensure smooth deceleration

### Phase 5: Streaming (5.0s - continuous)
**What to Watch:**
- Words scroll continuously from right to left
- Font: Inter Medium
- Size: Random 24-48px per word
- Velocity: 0.5-1.5 px/frame (creates varied speeds)
- Seamless loop: Words reappear on right with new Y position
- No pauses or jumps

**Test Actions:**
- Watch for several loop cycles
- Verify smooth continuous motion
- Check words reset seamlessly

## Interactive Controls

### Keyboard Navigation
- **Left Arrow (←)**: Previous brand
- **Right Arrow (→)**: Next brand
- **Space**: Pause/Resume animations

### Mouse Navigation
- Click arrow buttons at bottom of screen
- Click pause/play button
- Click on any brand card to focus it

### Testing Keyboard Nav
1. Press Right Arrow (→)
   - Should transition to Local Feelings (sage/Untouchable)
   - Animation sequence restarts after 1.2s
2. Press Left Arrow (←) twice
   - Should transition to Gaping Void (coral/Irresistible)
   - Animation sequence restarts
3. Press Space
   - Should pause all animations
   - Press Space again to resume

## Brand Testing Checklist

### Gaping Void (Coral #FF6B6B)
- [ ] Card shows "GV" text on coral background
- [ ] Header shows "Irresistible"
- [ ] Rectangles are coral colored
- [ ] Words are coral colored
- [ ] Emotion words: bold, creative, brave, daring, innovative, fearless, artistic, visionary, original, authentic

### Tiny Wins (Turquoise #4ECDC4)
- [ ] Card shows "TW" text on turquoise background
- [ ] Header shows "Unstoppable"
- [ ] Rectangles are turquoise colored
- [ ] Words are turquoise colored
- [ ] Emotion words: persistent, determined, resilient, focused, driven, consistent, dedicated, committed, steadfast, tenacious

### Local Feelings (Sage #95E1D3)
- [ ] Card shows "LF" text on sage background
- [ ] Header shows "Untouchable"
- [ ] Rectangles are sage colored
- [ ] Words are sage colored
- [ ] Emotion words: confident, powerful, strong, assured, invincible, secure, protected, empowered, unshakeable, solid

## Responsive Testing

### Desktop (≥1024px)
- [ ] Cards: 280x360px with 120px gap
- [ ] 8 rectangles in cascade
- [ ] All animations fully visible
- [ ] Navigation controls at bottom center

### Tablet (768-1023px)
- [ ] Cards: 240x308px with 100px gap
- [ ] 8 rectangles (or 5-8)
- [ ] Slightly reduced spacing
- [ ] Controls remain accessible

### Mobile (≤767px)
- [ ] Single card visible at a time
- [ ] 5 rectangles instead of 8
- [ ] Larger word sizes
- [ ] Touch controls work
- [ ] Vertical layout for cards

## Performance Testing

### 60fps Target
1. Open Chrome DevTools
2. Go to Performance tab
3. Record while animations play
4. Check frame rate stays at 60fps
5. Verify no frame drops during transitions

### GPU Acceleration Check
1. Open Chrome DevTools
2. Go to Rendering tab
3. Enable "Paint flashing"
4. Animations should not cause full repaints
5. Only transformed elements should flash

### Memory Leaks
1. Play animations for 5+ minutes
2. Switch brands multiple times
3. Pause/resume several times
4. Check memory usage in DevTools
5. Should remain stable (no continuous growth)

## Common Issues & Fixes

### Issue: Rectangles appear all at once
**Fix**: Check stagger timing in CascadingRectangles.tsx (should be 0.2s)

### Issue: Words appear in wrong positions
**Fix**: Verify rectangle positions match between CascadingRectangles and EmotionWordsStream

### Issue: Streaming stutters
**Fix**: Check GPU acceleration is enabled, verify linear easing

### Issue: Keyboard nav doesn't work
**Fix**: Ensure focus is not on an input element, check event listeners

### Issue: Animations don't restart after brand change
**Fix**: Verify setTimeout calls in startAnimationSequence function

## Visual Quality Checklist

- [ ] All transitions are smooth (no jank)
- [ ] Colors match brand specifications
- [ ] Text is readable at all sizes
- [ ] No layout shifts during animations
- [ ] Focus states are clearly visible
- [ ] Blur effect works on defocused cards
- [ ] Rotation animations feel natural
- [ ] Scaling animations maintain aspect ratios
- [ ] Opacity transitions are gradual
- [ ] Words stream continuously without gaps

## Accessibility Testing

- [ ] Screen reader announces brand changes
- [ ] Keyboard navigation works without mouse
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] ARIA labels are descriptive
- [ ] Pause functionality accessible via keyboard
- [ ] Controls have proper roles
- [ ] No animation causes seizures (no rapid flashing)

## Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

## Success Criteria

All animations should:
1. Play smoothly at 60fps
2. Transition precisely according to timeline
3. Maintain GPU acceleration
4. Respond instantly to user input
5. Loop seamlessly without pauses
6. Display correct colors for each brand
7. Show correct emotion words
8. Work across all screen sizes
9. Be accessible via keyboard
10. Have no memory leaks

Congratulations! If all tests pass, the Horizontal Spectrum section is production-ready.

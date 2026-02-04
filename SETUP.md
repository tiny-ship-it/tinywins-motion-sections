# Setup Instructions

## After Pulling the Repo

1. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs `@tailwindcss/postcss` and all other dependencies.

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Access the Site**:
   - Local: http://localhost:5173/
   - Network: http://[your-local-ip]:5173/

## Branch

All code is on the `main` branch.

## If You See the PostCSS Error

The error about `tailwindcss` PostCSS plugin means `node_modules` is missing or outdated. Run:

```bash
npm install
```

This installs the correct `@tailwindcss/postcss` package that Tailwind CSS v4 requires.

## Clean Install (if needed)

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## What You'll See

- Horizontal Spectrum section with 3 brand cards
- GSAP animations with rectangle morphing
- Horizontal scrolling emotion words
- Keyboard controls (← → Space)

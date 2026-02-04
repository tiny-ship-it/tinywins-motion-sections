# TinyWins Motion Sections - Visual Assets

This directory contains visual assets extracted from the Figma design file for the TinyWins Motion Sections project.

## Overview

All assets originate from the **Gapingvoid x TinyWins** Figma file and are organized by section and purpose.

### Key Files

- **`assets.json`** - Complete manifest of all assets with metadata, Figma node IDs, and extraction status
- **`ASSET_EXTRACTION.md`** - Detailed instructions for extracting assets from Figma (manual and automated methods)

### Directory Structure

```
assets/
├── README.md                # This file
├── assets.json             # Asset manifest
├── ASSET_EXTRACTION.md     # Extraction guide
├── brands/                 # Brand card screenshots (horizontal spectrum section)
└── images/                 # Hero images, bios, service cards, etc.
```

## Asset Categories

### 1. Global Feelings Studio Section (Hero)
Hero images for the main "We're a global feelings studio" section:
- Main hero tagline
- Emotional connection hero
- Studio badge component

**Location:** `images/`

### 2. Horizontal Spectrum (Brand Cards)
Brand showcase cards for the horizontal scrolling portfolio section:
- Salesforce x Ferrari demo
- Gucci AI retail experience
- Harmony Labs brand identity
- Work showcase header

**Location:** `brands/` and `images/`

### 3. Team Bios
Profile images and bio sections for team members:
- Alwyn (CEO and Partner)
- Matty (Chief Creative Officer)
- Lillian (Founder and Managing Principal)

**Location:** `images/`

### 4. Service Sections
Visual cards for service offerings:
- Brand Strategy
- Messaging & Positioning
- Visual Identity

**Location:** `images/`

## Figma File Information

- **File Name:** Gapingvoid x TinyWins
- **File ID:** `m3JyS2WYCIXNEGt8o2NDda`
- **File URL:** https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda

## Export Specifications

All assets should be exported with these settings:
- **Format:** PNG
- **Scale:** 2x (retina)
- **Quality:** High
- **Background:** Transparent (where applicable)

## Extraction Status

Currently, all assets are in **"pending"** status and need to be extracted. See `ASSET_EXTRACTION.md` for detailed instructions on how to extract them.

### Extraction Methods

1. **Manual Extraction** - Export directly from Figma Desktop (see ASSET_EXTRACTION.md)
2. **Automated Extraction** - Use figma-desktop MCP server with `get_screenshot` tool (requires local setup)

## Quick Start

### Manual Extraction (Recommended)

1. Open the Figma file: https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda
2. Use the node links in `assets.json` to navigate to each asset
3. Export each frame/component as PNG at 2x scale
4. Save to the appropriate directory (`brands/` or `images/`)
5. Update the status in `assets.json` to "completed"

### Using MCP Server (Advanced)

If you have the figma-desktop MCP server running:

```bash
# The server should be running at http://127.0.0.1:3845/mcp
# Use Claude Code with MCP tools to automate extraction
```

See `ASSET_EXTRACTION.md` for detailed MCP usage instructions.

## Asset Usage in Code

Once extracted, assets can be referenced in React components:

```tsx
// Hero images
import heroImage from '/assets/images/hero-global-feelings-studio.png';

// Brand cards
import salesforceCard from '/assets/brands/brand-card-salesforce.png';

// Usage
<img src={heroImage} alt="Global Feelings Studio" />
```

Or with dynamic imports:
```tsx
<img src="/assets/images/hero-global-feelings-studio.png" alt="Global Feelings Studio" />
```

## Next Steps

1. Extract all assets following the instructions in `ASSET_EXTRACTION.md`
2. Update `assets.json` with actual dimensions and mark as "completed"
3. Optimize images if needed (consider using imagemin)
4. Update React components to use the extracted assets
5. Test all images load correctly in the dev environment

## Troubleshooting

### Assets Not Loading
- Verify file paths match the structure in `assets.json`
- Check that files are in the correct directories
- Ensure Vite's public directory configuration is correct

### Export Quality Issues
- Use 2x scale for retina displays
- Select "High" quality in Figma export settings
- Use PNG format for transparency support

### Node IDs Not Working
- Ensure you're accessing the correct Figma file
- Try using the direct Figma URLs provided in `assets.json`
- Verify your Figma access permissions

## Documentation

- **Extraction Guide:** [ASSET_EXTRACTION.md](./ASSET_EXTRACTION.md)
- **Asset Manifest:** [assets.json](./assets.json)
- **Project README:** [../../README.md](../../README.md)

## Questions or Issues?

Refer to `ASSET_EXTRACTION.md` for detailed troubleshooting steps and additional resources.

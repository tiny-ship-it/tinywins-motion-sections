# Figma Asset Extraction Guide

## Overview

This guide explains how to extract visual assets from the Figma design file for the TinyWins Motion Sections project.

**Figma File:** [TW Website Redesign 2026](https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026?node-id=319-167)

## Prerequisites

To extract assets using the automated script, you need to enable the Figma Dev Mode MCP Server:

1. **Update Figma Desktop App** - Make sure you have the latest version of the Figma desktop app installed
2. **Open the Design File** - Open the TW Website Redesign 2026 file in Figma Desktop
3. **Enable Dev Mode MCP Server:**
   - In the upper-left corner, open the Figma menu
   - Go to Preferences
   - Enable "Dev Mode MCP Server"
   - The server will start on `http://127.0.0.1:3845/mcp`
4. **Restart Claude Desktop** - If using Claude Desktop, restart it to ensure the MCP connection is established

For more information: [Figma Dev Mode MCP Server Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server)

## Assets to Extract

### 1. Brand Cards (for Horizontal Spectrum section)

Extract the following brand card nodes from the design:

| Node ID | Name | Description | Output Path |
|---------|------|-------------|-------------|
| 319:636 | gaping-void-card | Gaping Void brand card | `public/assets/brands/gaping-void-card.png` |
| 319:678 | tiny-wins-card | Tiny Wins brand card | `public/assets/brands/tiny-wins-card.png` |
| 319:718 | local-feelings-card | Local Feelings brand card | `public/assets/brands/local-feelings-card.png` |
| 319:759 | brand-card-4 | Additional project card | `public/assets/brands/brand-card-4.png` |
| 319:785 | brand-card-5 | Additional project card | `public/assets/brands/brand-card-5.png` |
| 319:830 | brand-card-6 | Additional project card | `public/assets/brands/brand-card-6.png` |

**Purpose:** These cards will be used in the Horizontal Spectrum component to showcase different TinyWins brands and projects.

### 2. Hero Images (for Global Feelings Studio section)

| Node ID | Name | Description | Output Path |
|---------|------|-------------|-------------|
| 319:909 | hero-image | Large full-frame hero image | `public/assets/images/hero-image.png` |

**Purpose:** The hero image will be displayed prominently in the Global Feelings Studio section.

### 3. Design Context

In addition to screenshots, you should also extract:

- **Emotion word examples** - Text elements showing design intent for emotion-based interactions
- **Color variables** - Design tokens used in the layouts
- **Spacing/layout information** - Grid systems and spacing patterns

## Automated Extraction

### Using the Extraction Script

Once the Figma Dev Mode MCP Server is enabled, run:

```bash
node extract-figma-assets-mcp.js
```

This script will:

1. Connect to the Figma Dev Mode MCP Server on port 3845
2. Extract screenshots for all specified node IDs
3. Save images to the appropriate directories:
   - Brand cards → `public/assets/brands/`
   - Hero images → `public/assets/images/`
4. Generate an asset manifest at `public/assets/manifest.json`

### Manifest File Structure

The extraction script creates a JSON manifest documenting all extracted assets:

```json
{
  "extractedAt": "2026-02-04T...",
  "fileKey": "4debq7ehmp1F7ELO8RZ6yK",
  "assets": [
    {
      "type": "brand-card",
      "nodeId": "319:636",
      "name": "gaping-void-card",
      "path": "/absolute/path/to/file.png",
      "relativePath": "public/assets/brands/gaping-void-card.png"
    }
  ]
}
```

## Manual Extraction (Alternative)

If you prefer to extract assets manually or the MCP server isn't available:

1. **Open the Figma File** in Figma Desktop
2. **Navigate to each node:**
   - Use the URL format: `https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026?node-id=319-636`
   - Replace `319-636` with each node ID (using `-` instead of `:`)
3. **Export each frame:**
   - Select the frame
   - Right-click → Export
   - Choose PNG format
   - Set scale to 2x for high resolution
   - Save to the appropriate directory
4. **Name files according to the table above**

## Design Specifications

### Brand Cards
- **Format:** PNG with transparency
- **Resolution:** 2x (Retina)
- **Aspect Ratio:** Maintain as designed
- **Max Width:** 400px (display size, actual file will be 800px at 2x)

### Hero Image
- **Format:** PNG or JPEG (depending on transparency needs)
- **Resolution:** 2x (Retina)
- **Max Width:** 1920px (display size, actual file will be 3840px at 2x)
- **Optimization:** Compress for web delivery

## Post-Extraction Steps

After extracting assets:

1. **Optimize images:**
   ```bash
   npm run optimize-images  # If script is available
   # Or use tools like imagemin, squoosh, etc.
   ```

2. **Update component imports** in React components:
   ```tsx
   import gapingVoidCard from '@/assets/brands/gaping-void-card.png';
   ```

3. **Test image loading** in development:
   ```bash
   npm run dev
   ```

4. **Commit assets** to the repository (if appropriate)

## Troubleshooting

### MCP Server Not Responding

If you get connection errors:

1. Check that Figma Desktop is running
2. Verify Dev Mode MCP Server is enabled in Figma Preferences
3. Check that port 3845 is not blocked:
   ```bash
   curl http://127.0.0.1:3845/mcp
   ```
4. Restart Figma Desktop
5. Restart Claude Desktop (if applicable)

### Missing Node IDs

If a node ID doesn't exist or returns an error:

1. Open the Figma file and verify the node still exists
2. Check if the node ID format is correct (use `:` not `-` in scripts)
3. Ensure you have view access to the file

### Image Quality Issues

If extracted images are blurry or pixelated:

1. Ensure 2x resolution is set (scale: 2)
2. Check that source designs are at appropriate resolution
3. Verify PNG format is being used for images with transparency

## Additional Resources

- [Figma Dev Mode MCP Server Documentation](https://help.figma.com/hc/en-us/articles/32132100833559)
- [MCP Protocol Documentation](https://spec.modelcontextprotocol.io/)
- [TinyWins Motion Sections README](/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/README.md)
- [PRD: Horizontal Spectrum](/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/docs/PRD-01-HORIZONTAL-SPECTRUM.md)
- [PRD: Global Feelings Studio](/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/docs/PRD-03-GLOBAL-FEELINGS-STUDIO.md)

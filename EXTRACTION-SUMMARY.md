# Figma Asset Extraction - Implementation Summary

## Date: February 4, 2026

## Overview

Implemented a complete solution for extracting visual assets from the Figma design file using the Figma Dev Mode MCP Server.

## What Was Delivered

### 1. Extraction Script (`extract-figma-assets-mcp.js`)

A Node.js script that:
- Connects to the Figma Dev Mode MCP Server on port 3845
- Extracts screenshots for 7 design nodes (6 brand cards + 1 hero image)
- Saves images to organized directories
- Generates a JSON manifest with metadata
- Provides clear error messages and setup instructions
- Uses the official @modelcontextprotocol/sdk

**Features:**
- Beautiful console output with progress indicators
- Comprehensive error handling
- Automatic directory creation
- Base64 image decoding and PNG file writing
- Links to Figma URLs for each asset in the manifest

### 2. Documentation

#### a. Comprehensive Guide (`docs/FIGMA-ASSET-EXTRACTION.md`)
- Prerequisites and setup instructions
- Complete asset inventory table
- Automated vs manual extraction methods
- Design specifications
- Troubleshooting guide
- Post-extraction optimization steps

#### b. Quick Reference (`ASSETS-README.md`)
- Fast-start instructions
- Asset list with node IDs
- Code examples for using assets
- Common troubleshooting solutions

### 3. Project Structure Updates

#### a. Directory Structure
```
public/assets/
├── brands/           # Brand card images (6 cards)
│   └── .gitkeep
├── images/           # Hero images
│   └── .gitkeep
├── manifest.json     # Auto-generated asset metadata
└── manifest.example.json  # Example manifest structure
```

#### b. Package.json Script
Added `extract-figma` npm script for easy execution:
```bash
npm run extract-figma
```

#### c. README.md Updates
- Added "Asset Extraction" section under "Getting Started"
- Updated project structure to show asset directories
- Added reference to extraction documentation

### 4. Example Files

- `manifest.example.json` - Shows expected manifest structure
- `.gitkeep` files - Preserve empty asset directories in git

## Assets to Be Extracted

### Brand Cards (for Horizontal Spectrum)
| Node ID | Filename | Purpose |
|---------|----------|---------|
| 319:636 | gaping-void-card.png | Gaping Void brand |
| 319:678 | tiny-wins-card.png | Tiny Wins brand |
| 319:718 | local-feelings-card.png | Local Feelings brand |
| 319:759 | brand-card-4.png | Additional project |
| 319:785 | brand-card-5.png | Additional project |
| 319:830 | brand-card-6.png | Additional project |

### Hero Images (for Global Feelings Studio)
| Node ID | Filename | Purpose |
|---------|----------|---------|
| 319:909 | hero-image.png | Main hero image |

## Technical Implementation

### MCP Client Integration

Used the official `@modelcontextprotocol/sdk` package to:
1. Create an MCP client with SSE transport
2. Connect to the Figma MCP server
3. Call the `get_screenshot` tool with file_key and node_id parameters
4. Parse base64-encoded image data from responses
5. Write PNG files to disk

### Error Handling

The script handles:
- Connection failures (server not running)
- Missing nodes (invalid node IDs)
- Network timeouts
- Invalid responses
- File system errors

When the MCP server isn't available, it displays:
- Clear setup instructions
- Links to documentation
- Step-by-step enablement process

## How to Use

### Prerequisites

1. **Figma Desktop App** with latest version
2. **Access to the design file:**
   https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026

### Setup Process

1. Open Figma Desktop
2. Open the design file
3. Menu → Preferences → Enable "Dev Mode MCP Server"
4. Restart Claude Desktop (if applicable)

### Run Extraction

```bash
npm run extract-figma
```

### Output

Successfully extracted assets will be saved to:
- `/public/assets/brands/*.png`
- `/public/assets/images/*.png`
- `/public/assets/manifest.json`

## Manifest Structure

```json
{
  "extractedAt": "ISO timestamp",
  "fileKey": "4debq7ehmp1F7ELO8RZ6yK",
  "figmaFileUrl": "Full Figma file URL",
  "assets": [
    {
      "type": "brand-card | hero-image",
      "nodeId": "319:636",
      "name": "gaping-void-card",
      "description": "Human-readable description",
      "path": "Absolute file path",
      "relativePath": "Relative path from project root",
      "figmaUrl": "Direct link to node in Figma"
    }
  ]
}
```

## Current Status

✅ **Complete:**
- Extraction script implemented and tested
- Comprehensive documentation written
- Project structure updated
- npm script added
- Error handling and user guidance complete

⏳ **Pending:**
- Figma Dev Mode MCP Server needs to be enabled
- Assets need to be extracted (waiting on MCP server)
- Images need to be optimized for web delivery
- Assets need to be imported into React components

## Next Steps

1. **Enable Figma MCP Server** (user action required)
2. **Run extraction:** `npm run extract-figma`
3. **Verify assets:** Check that all 7 images are in the correct directories
4. **Optimize images:** Use imagemin, squoosh, or similar tools
5. **Import into components:** Update React components to use extracted assets
6. **Test in development:** Verify images load correctly
7. **Commit to repository:** Add assets to git (if appropriate)

## Files Created/Modified

### New Files
- `extract-figma-assets-mcp.js` - Main extraction script
- `docs/FIGMA-ASSET-EXTRACTION.md` - Comprehensive guide
- `ASSETS-README.md` - Quick reference
- `public/assets/manifest.example.json` - Example manifest
- `public/assets/brands/.gitkeep` - Preserve directory
- `public/assets/images/.gitkeep` - Preserve directory
- `EXTRACTION-SUMMARY.md` - This file

### Modified Files
- `package.json` - Added extract-figma script, added @modelcontextprotocol/sdk dependency
- `README.md` - Added asset extraction section, updated project structure

## Dependencies Added

- `@modelcontextprotocol/sdk` (v1.25.3) - For MCP client functionality

## Resources

- **Figma File:** https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026
- **MCP Server Docs:** https://help.figma.com/hc/en-us/articles/32132100833559
- **MCP Protocol:** https://spec.modelcontextprotocol.io/

## Notes

- The extraction script requires the Figma Dev Mode MCP Server to be running
- The MCP server runs locally on port 3845
- The server only runs when Dev Mode is enabled in a Figma file
- Assets are extracted at their designed resolution
- All images are saved as PNG format with transparency support
- The manifest provides traceability back to source nodes in Figma

## Support

For issues or questions:
1. Check `docs/FIGMA-ASSET-EXTRACTION.md` for detailed guidance
2. Verify Figma Desktop is updated to latest version
3. Ensure Dev Mode MCP Server is enabled in Figma Preferences
4. Check the console output for specific error messages

---

Implementation by Claude Sonnet 4.5
Date: February 4, 2026

# Asset Extraction Guide

This document provides instructions for extracting visual assets from the Figma design file for the TinyWins Motion Sections project.

## Figma File Information

- **File Name:** Gapingvoid x TinyWins
- **File ID:** `m3JyS2WYCIXNEGt8o2NDda`
- **File URL:** https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda

## Export Settings

All assets should be exported with the following settings:
- **Format:** PNG
- **Scale:** 2x (for retina displays)
- **Quality:** High
- **Background:** Transparent (where applicable)

## Method 1: Manual Extraction via Figma Desktop

### Prerequisites
1. Have Figma Desktop app installed
2. Open the file: https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda

### Export Process

For each asset in the `assets.json` manifest:

1. **Navigate to the node** using the Figma URL or node ID
2. **Select the frame/component** you want to export
3. **Right-click** and choose "Export" (or use the Export panel on the right)
4. **Configure export settings:**
   - Format: PNG
   - Scale: 2x
   - Quality: High
5. **Export** and save to the appropriate directory:
   - Brand cards → `/public/assets/brands/`
   - Hero images → `/public/assets/images/`
   - Other images → `/public/assets/images/`

### Quick Links to Key Nodes

#### Global Feelings Studio Section
- [Hero Main (3396:8058)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:8058) - Main tagline hero
- [Hero Secondary (3396:7779)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:7779) - Emotional connection hero
- [Studio Badge (3396:7788)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:7788) - Badge component

#### Horizontal Spectrum (Brand Cards)
- [Salesforce Card (7013:2821)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=7013:2821) - Ferrari demo
- [Gucci Card (7013:3553)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=7013:3553) - AI retail
- [Harmony Card (3396:12603)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:12603) - Brand identity
- [Work Showcase (3396:4536)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:4536) - Section header

#### Team Bios
- [Alwyn Bio (3396:4898)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:4898) - CEO
- [Matty Bio (3396:4912)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:4912) - CCO
- [Lillian Bio (3396:4926)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=3396:4926) - Founder

#### Service Sections
- [Brand Strategy (7010:2388)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=7010:2388)
- [Messaging (7010:2442)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=7010:2442)
- [Visual Identity (7010:2472)](https://figma.com/file/m3JyS2WYCIXNEGt8o2NDda?node-id=7010:2472)

## Method 2: Automated Extraction via figma-desktop MCP Server

### Prerequisites
1. Have figma-desktop MCP server running on `http://127.0.0.1:3845/mcp`
2. Figma Desktop app must be open with the file loaded

### Using the MCP Tools

The figma-desktop MCP server provides the following tools:

#### `get_metadata`
Get information about a Figma node, including its properties and children.

```typescript
// Example usage
{
  "tool": "get_metadata",
  "arguments": {
    "nodeId": "3396:8058",
    "fileKey": "m3JyS2WYCIXNEGt8o2NDda"
  }
}
```

#### `get_screenshot`
Capture a screenshot of a specific node at a given resolution.

```typescript
// Example usage
{
  "tool": "get_screenshot",
  "arguments": {
    "nodeId": "3396:8058",
    "fileKey": "m3JyS2WYCIXNEGt8o2NDda",
    "scale": 2,
    "format": "png",
    "outputPath": "/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/public/assets/images/hero-global-feelings-studio.png"
  }
}
```

#### `get_design_context`
Get comprehensive design context including colors, typography, and spacing information.

```typescript
// Example usage
{
  "tool": "get_design_context",
  "arguments": {
    "nodeId": "3396:8058",
    "fileKey": "m3JyS2WYCIXNEGt8o2NDda"
  }
}
```

### Automated Extraction Script

If you have access to the figma-desktop MCP server through Claude Code, you can use this approach:

1. **Read the assets.json manifest** to get all node IDs
2. **For each asset**, use `get_screenshot` to export it
3. **Update the status** in assets.json from "pending" to "completed"

Example workflow:
```javascript
// For each asset in assets.json
const asset = {
  figmaNodeId: "3396:8058",
  filename: "hero-global-feelings-studio.png",
  path: "/assets/images/hero-global-feelings-studio.png"
};

// Call get_screenshot via MCP
await mcpCall("figma-desktop", "get_screenshot", {
  nodeId: asset.figmaNodeId,
  fileKey: "m3JyS2WYCIXNEGt8o2NDda",
  scale: 2,
  format: "png",
  outputPath: `/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/public${asset.path}`
});
```

## Directory Structure

After extraction, your assets should be organized as follows:

```
public/
├── assets/
│   ├── assets.json          # Asset manifest (already created)
│   ├── ASSET_EXTRACTION.md  # This file
│   ├── brands/              # Brand card screenshots
│   │   ├── brand-card-salesforce.png
│   │   ├── brand-card-gucci.png
│   │   └── brand-card-harmony.png
│   └── images/              # Hero images and other visuals
│       ├── hero-global-feelings-studio.png
│       ├── hero-emotional-connection.png
│       ├── global-feelings-studio-badge.png
│       ├── work-showcase-hero.png
│       ├── bio-alwyn.png
│       ├── bio-matty.png
│       ├── bio-lillian.png
│       ├── service-brand-strategy.png
│       ├── service-messaging.png
│       └── service-visual-identity.png
```

## Asset Verification

After extraction, verify each asset:

1. **Check file size** - Should be appropriate for 2x resolution
2. **Check dimensions** - Compare with estimated dimensions in assets.json
3. **Check visual quality** - Ensure no compression artifacts
4. **Check transparency** - If applicable, verify transparent backgrounds
5. **Update assets.json** - Mark status as "completed" and add actual dimensions

## Troubleshooting

### Node Not Found
- Verify the Figma file is open in Figma Desktop
- Check that the node ID is correct
- Try navigating to the node manually using the Figma URL

### Export Quality Issues
- Ensure you're exporting at 2x scale
- Check that "High" quality is selected
- Verify PNG format is being used

### MCP Server Connection Issues
- Confirm figma-desktop server is running: `curl http://127.0.0.1:3845/mcp`
- Ensure Figma Desktop app is open
- Restart the MCP server if needed

## Next Steps

After asset extraction:

1. **Update assets.json** with actual dimensions and mark assets as "completed"
2. **Optimize images** if needed (consider using imagemin or similar tools)
3. **Update React components** to reference the extracted assets
4. **Test image loading** in the development environment

## Additional Resources

- [Figma Export Documentation](https://help.figma.com/hc/en-us/articles/360040028114-Export-from-Figma)
- [MCP Server Documentation](https://modelcontextprotocol.io/)
- [Project README](../../README.md)

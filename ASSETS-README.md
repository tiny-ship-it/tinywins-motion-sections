# Assets Quick Reference

## Extracting Assets from Figma

### Quick Start

1. **Enable Figma MCP Server:**
   - Open Figma Desktop
   - Open: https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026
   - Menu → Preferences → Enable "Dev Mode MCP Server"

2. **Run extraction:**
   ```bash
   npm run extract-figma
   ```

3. **Assets will be saved to:**
   - Brand cards: `public/assets/brands/`
   - Hero images: `public/assets/images/`
   - Manifest: `public/assets/manifest.json`

### What Gets Extracted

#### Brand Cards (6 cards)
- `gaping-void-card.png` - Node 319:636
- `tiny-wins-card.png` - Node 319:678
- `local-feelings-card.png` - Node 319:718
- `brand-card-4.png` - Node 319:759
- `brand-card-5.png` - Node 319:785
- `brand-card-6.png` - Node 319:830

#### Hero Images (1 image)
- `hero-image.png` - Node 319:909

### Manual Export (Alternative)

If the MCP server isn't available:

1. Open Figma file: https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026
2. For each asset:
   - Navigate to node (e.g., ?node-id=319-636)
   - Select the frame
   - Right-click → Export
   - Format: PNG, Scale: 2x
   - Save to appropriate directory

### Using Assets in Code

```tsx
// Import brand cards
import gapingVoidCard from '@/assets/brands/gaping-void-card.png';
import tinyWinsCard from '@/assets/brands/tiny-wins-card.png';
import localFeelingsCard from '@/assets/brands/local-feelings-card.png';

// Import hero image
import heroImage from '@/assets/images/hero-image.png';

// Use in component
<img src={gapingVoidCard} alt="Gaping Void" />
```

### Asset Manifest

After extraction, check `public/assets/manifest.json` for:
- Asset metadata
- Node IDs
- File paths
- Figma URLs for each asset

### Troubleshooting

**MCP Server not responding?**
1. Verify Figma Desktop is running
2. Check Dev Mode is enabled in Preferences
3. Restart Figma and try again
4. Check port 3845 isn't blocked

**Missing assets?**
- Verify you have access to the Figma file
- Check node IDs are correct
- Look for errors in the extraction output

### More Information

See detailed guide: [docs/FIGMA-ASSET-EXTRACTION.md](./docs/FIGMA-ASSET-EXTRACTION.md)

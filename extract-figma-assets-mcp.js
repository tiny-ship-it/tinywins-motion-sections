#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = '4debq7ehmp1F7ELO8RZ6yK';
const FIGMA_FILE_URL = 'https://www.figma.com/design/4debq7ehmp1F7ELO8RZ6yK/TW-Website-Redesign-2026';

// Node IDs to extract
const BRAND_CARD_NODES = [
  { id: '319:636', name: 'gaping-void-card', description: 'Gaping Void brand card' },
  { id: '319:678', name: 'tiny-wins-card', description: 'Tiny Wins brand card' },
  { id: '319:718', name: 'local-feelings-card', description: 'Local Feelings brand card' },
  { id: '319:759', name: 'brand-card-4', description: 'Additional project card' },
  { id: '319:785', name: 'brand-card-5', description: 'Additional project card' },
  { id: '319:830', name: 'brand-card-6', description: 'Additional project card' }
];

const HERO_NODES = [
  { id: '319:909', name: 'hero-image', description: 'Large full-frame hero image' }
];

async function saveBase64Image(base64Data, filePath) {
  // Remove data URI prefix if present
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');
  await fs.writeFile(filePath, buffer);
  console.log(`✓ Saved: ${path.basename(filePath)}`);
}

function printSetupInstructions() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════╗');
  console.log('║  Figma Dev Mode MCP Server Setup Required                             ║');
  console.log('╚════════════════════════════════════════════════════════════════════════╝\n');
  console.log('To extract assets from Figma, you need to enable the Dev Mode MCP Server:\n');
  console.log('1. Open Figma Desktop App (ensure you have the latest version)');
  console.log('2. Open this Figma file:');
  console.log(`   ${FIGMA_FILE_URL}`);
  console.log('3. In the upper-left corner, open the Figma menu');
  console.log('4. Go to Preferences → Enable "Dev Mode MCP Server"');
  console.log('5. The server will start on: http://127.0.0.1:3845/mcp');
  console.log('6. Restart Claude Desktop (if using Claude Desktop)');
  console.log('7. Run this script again\n');
  console.log('For more info:');
  console.log('https://help.figma.com/hc/en-us/articles/32132100833559\n');
  console.log('Or see: docs/FIGMA-ASSET-EXTRACTION.md\n');
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════╗');
  console.log('║  Figma Asset Extractor for TinyWins Motion Sections                   ║');
  console.log('╚════════════════════════════════════════════════════════════════════════╝\n');

  const manifest = {
    extractedAt: new Date().toISOString(),
    fileKey: FILE_KEY,
    figmaFileUrl: FIGMA_FILE_URL,
    assets: []
  };

  // Create directories
  const brandsDir = path.join(__dirname, 'public/assets/brands');
  const imagesDir = path.join(__dirname, 'public/assets/images');

  await fs.mkdir(brandsDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });
  console.log('✓ Created output directories\n');

  // Create MCP client
  const transport = new SSEClientTransport(new URL(MCP_URL));
  const client = new Client({
    name: 'figma-asset-extractor',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    console.log('Connecting to Figma Dev Mode MCP Server...');
    console.log(`URL: ${MCP_URL}\n`);

    await client.connect(transport);
    console.log('✓ Connected successfully!\n');

    // List available tools
    const tools = await client.listTools();
    console.log('Available tools:', tools.tools.map(t => t.name).join(', '));
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Extracting Brand Cards');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let successCount = 0;
    let errorCount = 0;

    for (const node of BRAND_CARD_NODES) {
      console.log(`Fetching: ${node.description} (${node.id})`);

      try {
        const result = await client.callTool({
          name: 'get_screenshot',
          arguments: {
            file_key: FILE_KEY,
            node_id: node.id
          }
        });

        if (result && result.content && result.content[0]) {
          const content = result.content[0];
          if (content.type === 'image' && content.data) {
            const fileName = `${node.name}.png`;
            const filePath = path.join(brandsDir, fileName);
            await saveBase64Image(content.data, filePath);

            manifest.assets.push({
              type: 'brand-card',
              nodeId: node.id,
              name: node.name,
              description: node.description,
              path: filePath,
              relativePath: `public/assets/brands/${fileName}`,
              figmaUrl: `${FIGMA_FILE_URL}?node-id=${node.id.replace(':', '-')}`
            });
            successCount++;
          }
        }
      } catch (error) {
        console.error(`✗ Error: ${error.message}`);
        errorCount++;
      }
      console.log('');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Extracting Hero Images');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (const node of HERO_NODES) {
      console.log(`Fetching: ${node.description} (${node.id})`);

      try {
        const result = await client.callTool({
          name: 'get_screenshot',
          arguments: {
            file_key: FILE_KEY,
            node_id: node.id
          }
        });

        if (result && result.content && result.content[0]) {
          const content = result.content[0];
          if (content.type === 'image' && content.data) {
            const fileName = `${node.name}.png`;
            const filePath = path.join(imagesDir, fileName);
            await saveBase64Image(content.data, filePath);

            manifest.assets.push({
              type: 'hero-image',
              nodeId: node.id,
              name: node.name,
              description: node.description,
              path: filePath,
              relativePath: `public/assets/images/${fileName}`,
              figmaUrl: `${FIGMA_FILE_URL}?node-id=${node.id.replace(':', '-')}`
            });
            successCount++;
          }
        }
      } catch (error) {
        console.error(`✗ Error: ${error.message}`);
        errorCount++;
      }
      console.log('');
    }

    // Save manifest
    const manifestPath = path.join(__dirname, 'public/assets/manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Extraction Complete');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`✓ Manifest saved: ${path.relative(__dirname, manifestPath)}`);
    console.log(`✓ Successfully extracted: ${successCount} assets`);
    if (errorCount > 0) {
      console.log(`✗ Failed: ${errorCount} assets`);
    }
    console.log('');

    await client.close();
  } catch (error) {
    console.error('\n✗ Connection Error:', error.message);

    if (error.message.includes('Non-200 status code') || error.message.includes('ECONNREFUSED')) {
      printSetupInstructions();
      process.exit(1);
    } else {
      console.error('\nFull error:', error);
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error('\n✗ Fatal Error:', error.message);
  process.exit(1);
});

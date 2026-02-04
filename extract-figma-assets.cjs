#!/usr/bin/env node

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = '4debq7ehmp1F7ELO8RZ6yK';

// Node IDs to extract
const BRAND_CARD_NODES = [
  { id: '319:636', name: 'brand-card-1' },
  { id: '319:678', name: 'brand-card-2' },
  { id: '319:718', name: 'brand-card-3' },
  { id: '319:759', name: 'brand-card-4' },
  { id: '319:785', name: 'brand-card-5' },
  { id: '319:830', name: 'brand-card-6' }
];

const HERO_NODES = [
  { id: '319:909', name: 'hero-image' }
];

async function callMCP(method, params = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    });

    const options = {
      hostname: '127.0.0.1',
      port: 3845,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.error) {
            reject(new Error(result.error.message));
          } else {
            resolve(result.result);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function getScreenshot(nodeId) {
  try {
    const result = await callMCP('tools/call', {
      name: 'get_screenshot',
      arguments: {
        file_key: FILE_KEY,
        node_id: nodeId
      }
    });
    return result;
  } catch (error) {
    console.error(`Error getting screenshot for node ${nodeId}:`, error.message);
    return null;
  }
}

async function saveBase64Image(base64Data, filePath) {
  // Remove data URI prefix if present
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');
  await fs.writeFile(filePath, buffer);
  console.log(`Saved: ${filePath}`);
}

async function main() {
  const manifest = {
    extractedAt: new Date().toISOString(),
    fileKey: FILE_KEY,
    assets: []
  };

  // Create directories
  const brandsDir = '/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/public/assets/brands';
  const imagesDir = '/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/public/assets/images';

  await fs.mkdir(brandsDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  console.log('Extracting brand cards...');
  for (const node of BRAND_CARD_NODES) {
    console.log(`\nFetching ${node.name} (${node.id})...`);
    const result = await getScreenshot(node.id);

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
          path: filePath,
          relativePath: `public/assets/brands/${fileName}`
        });
      }
    }
  }

  console.log('\n\nExtracting hero images...');
  for (const node of HERO_NODES) {
    console.log(`\nFetching ${node.name} (${node.id})...`);
    const result = await getScreenshot(node.id);

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
          path: filePath,
          relativePath: `public/assets/images/${fileName}`
        });
      }
    }
  }

  // Save manifest
  const manifestPath = '/Users/patrickcraig/clawd/outgoing/tinywins-motion-sections/public/assets/manifest.json';
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n\nManifest saved: ${manifestPath}`);
  console.log(`\nTotal assets extracted: ${manifest.assets.length}`);
}

main().catch(console.error);

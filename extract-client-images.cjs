#!/usr/bin/env node

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = '4debq7ehmp1F7ELO8RZ6yK';
const OUTPUT_DIR = '/Users/patrickcraig/Repos/tinywins-motion-sections/public/assets/clients';

// All client image nodes extracted from Figma design
const CLIENTS = {
  cottonball: [
    { id: '319:938', name: 'cb-01', width: 142 },
    { id: '319:939', name: 'cb-02', width: 70 },
    { id: '319:940', name: 'cb-03', width: 70 },
    { id: '319:941', name: 'cb-04', width: 142 },
    { id: '319:942', name: 'cb-05', width: 142 },
    { id: '319:943', name: 'cb-06', width: 142 },
    { id: '319:944', name: 'cb-07', width: 142 },
    { id: '319:945', name: 'cb-08', width: 70 },
    { id: '319:946', name: 'cb-09', width: 70 },
    { id: '319:947', name: 'cb-10', width: 142 },
    { id: '319:948', name: 'cb-11', width: 70 },
    { id: '319:949', name: 'cb-12', width: 142 },
    { id: '319:950', name: 'cb-13', width: 70 },
    { id: '319:951', name: 'cb-14', width: 142 },
    { id: '319:952', name: 'cb-15', width: 70 },
    { id: '319:953', name: 'cb-16', width: 142 },
    { id: '319:954', name: 'cb-17', width: 70 },
    { id: '319:955', name: 'cb-18', width: 70 },
    { id: '319:956', name: 'cb-19', width: 142 },
    { id: '319:957', name: 'cb-20', width: 70 },
    { id: '319:958', name: 'cb-21', width: 142 },
  ],
  amesa: [
    { id: '319:965', name: 'am-01', width: 142 },
    { id: '319:966', name: 'am-02', width: 142 },
    { id: '319:967', name: 'am-03', width: 70 },
    { id: '319:968', name: 'am-04', width: 70 },
    { id: '319:969', name: 'am-05', width: 142 },
    { id: '319:970', name: 'am-06', width: 142 },
    { id: '319:971', name: 'am-07', width: 142 },
    { id: '319:972', name: 'am-08', width: 142 },
    { id: '319:973', name: 'am-09', width: 142 },
    { id: '319:974', name: 'am-10', width: 70 },
    { id: '319:975', name: 'am-11', width: 70 },
    { id: '319:976', name: 'am-12', width: 142 },
    { id: '319:977', name: 'am-13', width: 142 },
    { id: '319:978', name: 'am-14', width: 142 },
    { id: '319:979', name: 'am-15', width: 70 },
    { id: '319:980', name: 'am-16', width: 70 },
    { id: '319:981', name: 'am-17', width: 142 },
    { id: '319:982', name: 'am-18', width: 142 },
    { id: '319:983', name: 'am-19', width: 142 },
    { id: '319:984', name: 'am-20', width: 70 },
  ],
  luxnomads: [
    { id: '319:1004', name: 'lx-01', width: 174 },
    { id: '319:1005', name: 'lx-02', width: 174 },
    { id: '319:1006', name: 'lx-03', width: 174 },
    { id: '319:1007', name: 'lx-04', width: 87 },
    { id: '319:1008', name: 'lx-05', width: 87 },
    { id: '319:1009', name: 'lx-06', width: 174 },
    { id: '319:1010', name: 'lx-07', width: 87 },
    { id: '319:1011', name: 'lx-08', width: 87 },
    { id: '319:1012', name: 'lx-09', width: 174 },
    { id: '319:1013', name: 'lx-10', width: 87 },
    { id: '319:1014', name: 'lx-11', width: 87 },
    { id: '319:1015', name: 'lx-12', width: 174 },
    { id: '319:1016', name: 'lx-13', width: 87 },
    { id: '319:1017', name: 'lx-14', width: 87 },
    { id: '319:1018', name: 'lx-15', width: 174 },
  ],
  axum: [
    { id: '319:1025', name: 'ax-01', width: 142 },
    { id: '319:1026', name: 'ax-02', width: 142 },
    { id: '319:1027', name: 'ax-03', width: 70 },
    { id: '319:1028', name: 'ax-04', width: 70 },
    { id: '319:1029', name: 'ax-05', width: 142 },
    { id: '319:1030', name: 'ax-06', width: 70 },
    { id: '319:1031', name: 'ax-07', width: 70 },
    { id: '319:1032', name: 'ax-08', width: 142 },
    { id: '319:1033', name: 'ax-09', width: 70 },
    { id: '319:1034', name: 'ax-10', width: 70 },
    { id: '319:1035', name: 'ax-11', width: 142 },
    { id: '319:1036', name: 'ax-12', width: 142 },
    { id: '319:1037', name: 'ax-13', width: 142 },
    { id: '319:1038', name: 'ax-14', width: 142 },
    { id: '319:1039', name: 'ax-15', width: 70 },
    { id: '319:1040', name: 'ax-16', width: 70 },
    { id: '319:1041', name: 'ax-17', width: 142 },
    { id: '319:1042', name: 'ax-18', width: 142 },
    { id: '319:1043', name: 'ax-19', width: 142 },
    { id: '319:1044', name: 'ax-20', width: 142 },
    { id: '319:1045', name: 'ax-21', width: 142 },
  ],
  'shield-ai': [
    { id: '319:1052', name: 'sh-01', width: 142 },
    { id: '319:1053', name: 'sh-02', width: 142 },
    { id: '319:1054', name: 'sh-03', width: 71 },
    { id: '319:1055', name: 'sh-04', width: 71 },
    { id: '319:1056', name: 'sh-05', width: 142 },
    { id: '319:1057', name: 'sh-06', width: 142 },
    { id: '319:1058', name: 'sh-07', width: 71 },
    { id: '319:1059', name: 'sh-08', width: 71 },
    { id: '319:1060', name: 'sh-09', width: 142 },
    { id: '319:1061', name: 'sh-10', width: 142 },
    { id: '319:1062', name: 'sh-11', width: 142 },
    { id: '319:1063', name: 'sh-12', width: 142 },
    { id: '319:1064', name: 'sh-13', width: 142 },
    { id: '319:1065', name: 'sh-14', width: 142 },
    { id: '319:1066', name: 'sh-15', width: 71 },
    { id: '319:1067', name: 'sh-16', width: 71 },
    { id: '319:1068', name: 'sh-17', width: 142 },
    { id: '319:1069', name: 'sh-18', width: 71 },
    { id: '319:1070', name: 'sh-19', width: 71 },
    { id: '319:1071', name: 'sh-20', width: 142 },
  ],
  mienne: [
    { id: '319:1101', name: 'mi-01', width: 146 },
    { id: '319:1102', name: 'mi-02', width: 142 },
    { id: '319:1103', name: 'mi-03', width: 135 },
    { id: '319:1104', name: 'mi-04', width: 135 },
    { id: '319:1105', name: 'mi-05', width: 142 },
    { id: '319:1106', name: 'mi-06', width: 136 },
    { id: '319:1107', name: 'mi-07', width: 135 },
    { id: '319:1108', name: 'mi-08', width: 136 },
    { id: '319:1109', name: 'mi-09', width: 136 },
    { id: '319:1110', name: 'mi-10', width: 67 },
    { id: '319:1111', name: 'mi-11', width: 67 },
    { id: '319:1112', name: 'mi-12', width: 142 },
    { id: '319:1113', name: 'mi-13', width: 71 },
    { id: '319:1114', name: 'mi-14', width: 67 },
    { id: '319:1115', name: 'mi-15', width: 136 },
    { id: '319:1116', name: 'mi-16', width: 67 },
    { id: '319:1117', name: 'mi-17', width: 67 },
  ],
  freegame: [
    { id: '319:1124', name: 'fg-01', width: 142 },
    { id: '319:1125', name: 'fg-02', width: 135 },
    { id: '319:1126', name: 'fg-03', width: 67 },
    { id: '319:1127', name: 'fg-04', width: 67 },
    { id: '319:1128', name: 'fg-05', width: 142 },
    { id: '319:1129', name: 'fg-06', width: 142 },
    { id: '319:1130', name: 'fg-07', width: 135 },
    { id: '319:1131', name: 'fg-08', width: 136 },
    { id: '319:1132', name: 'fg-09', width: 67 },
    { id: '319:1133', name: 'fg-10', width: 71 },
    { id: '319:1134', name: 'fg-11', width: 135 },
    { id: '319:1135', name: 'fg-12', width: 67 },
    { id: '319:1136', name: 'fg-13', width: 67 },
    { id: '319:1137', name: 'fg-14', width: 142 },
    { id: '319:1138', name: 'fg-15', width: 67 },
    { id: '319:1139', name: 'fg-16', width: 67 },
  ],
};

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
        fileKey: FILE_KEY,
        nodeId: nodeId
      }
    });
    return result;
  } catch (error) {
    console.error(`Error getting screenshot for node ${nodeId}:`, error.message);
    return null;
  }
}

async function saveBase64Image(base64Data, filePath) {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');
  await fs.writeFile(filePath, buffer);
  console.log(`  Saved: ${path.basename(filePath)}`);
}

async function extractClientImages(clientName, images) {
  const clientDir = path.join(OUTPUT_DIR, clientName);
  await fs.mkdir(clientDir, { recursive: true });

  console.log(`\nExtracting ${clientName} (${images.length} images)...`);
  
  for (const image of images) {
    console.log(`  Fetching ${image.name} (node ${image.id})...`);
    const result = await getScreenshot(image.id);

    if (result && result.content && result.content[0]) {
      const content = result.content[0];
      if (content.type === 'image' && content.data) {
        const fileName = `${image.name}.png`;
        const filePath = path.join(clientDir, fileName);
        await saveBase64Image(content.data, filePath);
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function main() {
  console.log('Starting client image extraction...');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  
  const manifest = {
    extractedAt: new Date().toISOString(),
    fileKey: FILE_KEY,
    clients: {}
  };

  for (const [clientName, images] of Object.entries(CLIENTS)) {
    await extractClientImages(clientName, images);
    manifest.clients[clientName] = images.map(img => ({
      id: img.name,
      nodeId: img.id,
      width: img.width,
      path: `/assets/clients/${clientName}/${img.name}.png`
    }));
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest saved: ${manifestPath}`);
  
  const totalImages = Object.values(CLIENTS).reduce((acc, imgs) => acc + imgs.length, 0);
  console.log(`\nTotal images extracted: ${totalImages}`);
}

main().catch(console.error);

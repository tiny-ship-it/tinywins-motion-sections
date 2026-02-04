import { TinyWinInstance } from '../../types/tinyWin';

export const FIRST_WAVE_POSITIONS = [
  { x: 50, y: 50 },  // original
  { x: 35, y: 35 },  // top-left
  { x: 65, y: 35 },  // top-right
  { x: 35, y: 65 },  // bottom-left
  { x: 65, y: 65 },  // bottom-right
  { x: 50, y: 25 },  // top
  { x: 50, y: 75 },  // bottom
  { x: 20, y: 50 },  // left
];

export function generateInstances(count: number): TinyWinInstance[] {
  const instances: TinyWinInstance[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));

  // Size distribution
  const sizeRanges = [
    { range: [14, 24], percentage: 0.4 },
    { range: [24, 48], percentage: 0.4 },
    { range: [48, 72], percentage: 0.2 },
  ];

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    // Add randomization to break grid rigidity
    const xJitter = (Math.random() - 0.5) * 15;
    const yJitter = (Math.random() - 0.5) * 15;

    // Determine size based on distribution
    let fontSize: number;
    const rand = Math.random();
    if (rand < 0.4) {
      fontSize = sizeRanges[0].range[0] + Math.random() * (sizeRanges[0].range[1] - sizeRanges[0].range[0]);
    } else if (rand < 0.8) {
      fontSize = sizeRanges[1].range[0] + Math.random() * (sizeRanges[1].range[1] - sizeRanges[1].range[0]);
    } else {
      fontSize = sizeRanges[2].range[0] + Math.random() * (sizeRanges[2].range[1] - sizeRanges[2].range[0]);
    }

    instances.push({
      text: Math.random() > 0.5 ? 'tiny win' : 'TINY WIN',
      x: (col / gridSize) * 100 + xJitter,
      y: (row / gridSize) * 100 + yJitter,
      fontSize: fontSize,
      opacity: 0.3 + Math.random() * 0.7,
      rotation: (Math.random() - 0.5) * 10,
      delay: Math.random() * 2,
      duration: 0.8 + Math.random() * 0.4,
      id: `instance-${i}`,
    });
  }

  return instances;
}

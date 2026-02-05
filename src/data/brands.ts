export interface BrandCard {
  name: string;
  emotionalState: string;
  logoUrl: string;
  imageUrl: string;
  accentColor: string;
  description: string;
}

// Generate all 18 brands based on Figma design
const EMOTIONS = [
  'Unstoppable', 'Irresistible', 'Untouchable', 'Visionary', 'Balanced', 'Powerful',
  'Innovative', 'Resonant', 'Structured', 'Radiant', 'Grounded', 'Fast',
  'Light', 'Reliable', 'Alive', 'Driven', 'Adaptive', 'Essential'
];

const ACCENT_COLORS = [
  '#4ECDC4', '#FF6B6B', '#95E1D3', '#5D9CEC', '#AC92EC', '#DA4453',
  '#F6BB42', '#37BC9B', '#4A89DC', '#FFCE54', '#8CC152', '#E9573F',
  '#3BAFDA', '#656D78', '#D770AD', '#967ADC', '#48CFAD', '#AAB2BD'
];

export const BRANDS: BrandCard[] = EMOTIONS.map((emotion, i) => {
  const imgNum = (i % 16) + 1;
  return {
    name: 'Project Name',
    emotionalState: emotion,
    logoUrl: '',
    imageUrl: `/assets/images/img-${imgNum.toString().padStart(2, '0')}.jpg`,
    accentColor: ACCENT_COLORS[i],
    description: 'the big feeling',
  };
});

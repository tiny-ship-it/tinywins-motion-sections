import { EmotionalPortrait } from '../types/globalFeelings';

const EMOTION_CATEGORIES = [
  'Joy', 'Contemplation', 'Determination', 'Serenity', 'Courage',
  'Wonder', 'Connection', 'Resilience', 'Peace', 'Hope'
];

const LOCATIONS = [
  'Mumbai, India', 'Tokyo, Japan', 'New York, USA', 'Paris, France', 'Rio de Janeiro, Brazil',
  'Sydney, Australia', 'Cairo, Egypt', 'London, UK', 'Seoul, South Korea', 'Mexico City, Mexico'
];

// Generate 50 placeholder portraits
export const PORTRAITS: EmotionalPortrait[] = Array.from({ length: 50 }, (_, index) => {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const emotion = EMOTION_CATEGORIES[index % EMOTION_CATEGORIES.length];
  const location = LOCATIONS[index % LOCATIONS.length];

  // Use placeholder images with different colors for variety
  const colors = ['FF6B6B', '4ECDC4', '95E1D3', '45B7D1', '96CEB4', 'FFEAA7', 'DDA15E', 'A8DADC', 'E63946', '457B9D'];
  const color = colors[index % colors.length];

  return {
    id: `portrait-${String(index + 1).padStart(3, '0')}`,
    url: `https://via.placeholder.com/300x375/${color}/FFFFFF?text=${emotion}`,
    alt: `Portrait of ${emotion.toLowerCase()} from ${location}`,
    location,
    emotion,
    photographer: `Photographer ${index + 1}`,
    gridPosition: { row, col }
  };
});

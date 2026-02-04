import type { BrandCard } from '../types/horizontalSpectrum';

export const BRANDS: BrandCard[] = [
  {
    name: 'Gaping Void',
    emotionalState: 'Irresistible',
    logoUrl: 'https://via.placeholder.com/280x360/FF6B6B/FFFFFF?text=Gaping+Void',
    accentColor: '#FF6B6B',
    emotionWords: [
      'bold', 'creative', 'brave', 'daring', 'innovative',
      'fearless', 'artistic', 'visionary', 'original', 'authentic'
    ],
    position: { x: -400, scale: 0.85 }
  },
  {
    name: 'Tiny Wins',
    emotionalState: 'Unstoppable',
    logoUrl: 'https://via.placeholder.com/280x360/4ECDC4/FFFFFF?text=Tiny+Wins',
    accentColor: '#4ECDC4',
    emotionWords: [
      'persistent', 'determined', 'resilient', 'focused', 'driven',
      'consistent', 'dedicated', 'committed', 'steadfast', 'tenacious'
    ],
    position: { x: 0, scale: 1.0 }
  },
  {
    name: 'Local Feelings',
    emotionalState: 'Untouchable',
    logoUrl: 'https://via.placeholder.com/280x360/95E1D3/FFFFFF?text=Local+Feelings',
    accentColor: '#95E1D3',
    emotionWords: [
      'confident', 'powerful', 'strong', 'assured', 'invincible',
      'secure', 'protected', 'empowered', 'unshakeable', 'solid'
    ],
    position: { x: 400, scale: 0.85 }
  }
];

export interface BrandCard {
  name: 'Gaping Void' | 'Tiny Wins' | 'Local Feelings';
  emotionalState: 'Irresistible' | 'Unstoppable' | 'Untouchable';
  logoUrl: string;
  emotionWords: string[];
  accentColor: string;
  position: {
    x: number;
    scale: number;
  };
}

export interface Rectangle {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
  opacity: number;
}

export interface EmotionWord {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  opacity: number;
  velocity: number;
  id: string;
}

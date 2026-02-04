export interface EmotionalPortrait {
  id: string;
  url: string;
  alt: string;
  location: string;
  emotion: string;
  photographer: string;
  gridPosition: {
    row: number;
    col: number;
  };
}

export interface GridLayout {
  rows: number;
  cols: number;
  gap: number;
  containerWidth: number;
  containerHeight: number;
}

export interface ImageClone {
  id: string;
  image: EmotionalPortrait;
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  delay: number;
}

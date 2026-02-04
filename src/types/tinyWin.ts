export interface TinyWinInstance {
  text: 'tiny win' | 'TINY WIN';
  x: number;
  y: number;
  fontSize: number;
  opacity: number;
  rotation: number;
  delay: number;
  duration: number;
  id: string;
}

export type AnimationPhase = 'initial' | 'first-wave' | 'multiplication' | 'active';

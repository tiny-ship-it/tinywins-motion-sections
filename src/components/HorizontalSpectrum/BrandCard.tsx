import { useRef } from 'react';
import { BrandCard as BrandCardType } from '../../types/horizontalSpectrum';

interface BrandCardProps {
  brand: BrandCardType;
  isFocused: boolean;
  onFocus: () => void;
}

const BrandCard = ({ brand, isFocused, onFocus }: BrandCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={onFocus}
      className="brand-card gpu-accelerated w-[280px] h-[360px] md:w-[240px] md:h-[308px] lg:w-[280px] lg:h-[360px] bg-white rounded-2xl shadow-2xl cursor-pointer overflow-hidden flex items-center justify-center"
      style={{
        willChange: 'transform, opacity, filter',
        transformStyle: 'preserve-3d',
        minWidth: '240px',
      }}
      tabIndex={isFocused ? 0 : -1}
      role="button"
      aria-label={`${brand.name} - ${brand.emotionalState}`}
      aria-pressed={isFocused}
    >
      {/* Placeholder brand logo using colored rectangle with text */}
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ backgroundColor: brand.accentColor }}
      >
        <div className="text-white font-bold text-5xl md:text-6xl mb-3 md:mb-4">
          {brand.name === 'Gaping Void' ? 'GV' : brand.name === 'Tiny Wins' ? 'TW' : 'LF'}
        </div>
        <div className="text-white text-base md:text-lg font-medium px-6 md:px-8 text-center">
          {brand.name}
        </div>
      </div>
    </div>
  );
};

export default BrandCard;

import { useRef, useEffect } from 'react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  currentBrand: string;
  totalBrands: number;
}

const NavigationControls = ({
  onPrevious,
  onNext,
  isPaused,
  onTogglePause,
  currentBrand,
}: NavigationControlsProps) => {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management for keyboard navigation
  useEffect(() => {
    const handleTabFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target === prevButtonRef.current ||
        target === nextButtonRef.current ||
        target === pauseButtonRef.current
      ) {
        target.style.outline = '2px solid #4ECDC4';
        target.style.outlineOffset = '2px';
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target === prevButtonRef.current ||
        target === nextButtonRef.current ||
        target === pauseButtonRef.current
      ) {
        target.style.outline = 'none';
      }
    };

    const prevBtn = prevButtonRef.current;
    const nextBtn = nextButtonRef.current;
    const pauseBtn = pauseButtonRef.current;

    [prevBtn, nextBtn, pauseBtn].forEach((btn) => {
      btn?.addEventListener('focus', handleTabFocus);
      btn?.addEventListener('blur', handleBlur);
    });

    return () => {
      [prevBtn, nextBtn, pauseBtn].forEach((btn) => {
        btn?.removeEventListener('focus', handleTabFocus);
        btn?.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  return (
    <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-4 z-10 px-4">
      {/* Previous Button */}
      <button
        ref={prevButtonRef}
        onClick={onPrevious}
        className="group relative px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:scale-105"
        aria-label="Previous brand (Left Arrow)"
        tabIndex={0}
      >
        <span className="flex items-center gap-1 md:gap-2 text-gray-800 font-medium text-sm md:text-base">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </span>
      </button>

      {/* Pause/Resume Button */}
      <button
        ref={pauseButtonRef}
        onClick={onTogglePause}
        className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:scale-105"
        aria-label={isPaused ? 'Resume animation (Space)' : 'Pause animation (Space)'}
        aria-pressed={isPaused}
        tabIndex={0}
      >
        <span className="flex items-center gap-1 md:gap-2 text-gray-800 font-medium text-sm md:text-base">
          {isPaused ? (
            <>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="hidden sm:inline">Resume</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              <span className="hidden sm:inline">Pause</span>
            </>
          )}
        </span>
      </button>

      {/* Next Button */}
      <button
        ref={nextButtonRef}
        onClick={onNext}
        className="group relative px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:scale-105"
        aria-label="Next brand (Right Arrow)"
        tabIndex={0}
      >
        <span className="flex items-center gap-1 md:gap-2 text-gray-800 font-medium text-sm md:text-base">
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </button>

      {/* Brand Indicator */}
      <div className="absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2 px-3 md:px-4 py-1 md:py-2 bg-white/90 rounded-full shadow-md">
        <span className="text-xs md:text-sm text-gray-600 font-medium">{currentBrand}</span>
      </div>
    </div>
  );
};

export default NavigationControls;

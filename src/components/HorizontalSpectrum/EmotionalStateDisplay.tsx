interface EmotionalStateProps {
  emotionalState: string;
}

const EmotionalStateDisplay = ({ emotionalState }: EmotionalStateProps) => {

  return (
    <div className="relative w-full flex justify-center" style={{ height: '72px' }}>
      {/* Centered container with fixed widths to prevent layout shift */}
      <div className="flex items-center">
        {/* Static part - fixed content, never changes */}
        <span
          style={{ 
            fontSize: '72px',
            letterSpacing: '-3.6px',
            fontFamily: "'Suisse Intl', sans-serif",
            fontWeight: 600,
            lineHeight: 1,
            opacity: 0.2,
            marginRight: '0.25em',
            whiteSpace: 'nowrap'
          }}
        >
          Brands that make us feel
        </span>
        
        {/* Dynamic word - fixed-width container to prevent layout shift */}
        <div 
          style={{ 
            width: '450px', // Wide enough for longest word (e.g., "Unstoppable")
            overflow: 'visible'
          }}
        >
          <span
            style={{ 
              fontSize: '72px',
              letterSpacing: '-3.6px',
              fontFamily: "'Suisse Intl', sans-serif",
              fontWeight: 600,
              lineHeight: 1,
              whiteSpace: 'nowrap'
            }}
          >
            {emotionalState}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmotionalStateDisplay;

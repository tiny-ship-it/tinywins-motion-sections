import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CLIENTS, type ClientImage } from '../../data/clients';
import ClientRow from './ClientRow';

const DesigningFeelings = () => {
  const [activeClientIndex, setActiveClientIndex] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<ClientImage | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);

  const rowHeight = 80;

  // Preload all images on mount
  useEffect(() => {
    const imageUrls: string[] = [];
    
    // Collect all image URLs from all clients
    CLIENTS.forEach(client => {
      client.images.forEach(image => {
        imageUrls.push(image.url);
      });
    });

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    // Preload each image
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.src = url;
    });

    // If no images, mark as preloaded
    if (totalImages === 0) {
      setImagesPreloaded(true);
    }
  }, []);

  // Handle mouse movement to track cursor position
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Handle image hover from child row
  const handleImageHover = (clientIndex: number, image: ClientImage | null) => {
    if (image) {
      setActiveClientIndex(clientIndex);
      setHoveredImage(image);
    } else {
      setActiveClientIndex(null);
      setHoveredImage(null);
    }
  };

  // Animate featured image position to follow mouse
  useEffect(() => {
    if (!featuredImageRef.current) return;

    gsap.to(featuredImageRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.15,
      ease: 'power2.out',
    });
  }, [mousePosition]);


  const activeClient = activeClientIndex !== null ? CLIENTS[activeClientIndex] : null;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#1A1A1A] overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-label="Designing Feelings - Client Portfolio"
    >
      {/* Loading indicator */}
      {!imagesPreloaded && (
        <div 
          className="fixed top-4 right-4 z-[200] flex items-center gap-2 bg-black/80 px-3 py-2 rounded"
          style={{ fontFamily: "'Suisse Intl', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.7)' }}
        >
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
          Loading images...
        </div>
      )}

      {/* Header */}
      <div className="relative z-20 pt-12 pb-16 px-20">
        <h1
          className="font-semibold uppercase"
          style={{
            fontSize: 48,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: '#FFFFFF',
          }}
        >
          Designing brands people
          <br />
          fall for irrationally
        </h1>
      </div>

      {/* Dark overlay - appears when hovering on any film strip */}
      <div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          opacity: hoveredImage ? 1 : 0,
          transition: 'opacity 300ms ease',
          zIndex: 30,
        }}
      />

      {/* Client Rows */}
      <div className="relative" style={{ marginTop: 356 }}>
        {CLIENTS.map((client, index) => (
          <ClientRow
            key={client.id}
            client={client}
            rowHeight={rowHeight}
            onImageHover={(image) => handleImageHover(index, image)}
            isActiveRow={index === activeClientIndex}
          />
        ))}
      </div>

      {/* Floating Featured Image - pointer-events: none so mouse passes through */}
      {hoveredImage && (() => {
        // Calculate enlarged dimensions based on thumbnail aspect ratio
        // Thumbnail width is relative to 80px height, so aspect ratio = width/80
        const aspectRatio = hoveredImage.width / 80;
        const enlargedHeight = 347; // Fixed height for enlarged image
        const enlargedWidth = enlargedHeight * aspectRatio;
        
        return (
          <div
            ref={featuredImageRef}
            className="fixed pointer-events-none"
            style={{
              top: 0,
              left: 0,
              transform: 'translate(-50%, -50%)',
              width: enlargedWidth,
              height: enlargedHeight,
              zIndex: 100,
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={hoveredImage.url}
              alt=""
              className="w-full h-full object-cover"
              style={{
                borderRadius: 0,
              }}
            />
            
            {/* Client name badge on image */}
            {activeClient && (
              <div
                className="absolute top-4 left-4 bg-white/90 px-3 py-1.5"
                style={{
                  fontFamily: "'Suisse Intl', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '-0.3px',
                }}
              >
                {activeClient.name}
              </div>
            )}
          </div>
        );
      })()}

      {/* Right Side Navigation */}
      <div
        className="fixed right-0 top-0 h-full flex flex-col justify-center px-6 bg-[#1A1A1A] z-50 border-l border-white/10"
        style={{ width: 180 }}
      >
        <h2
          className="text-white font-semibold uppercase mb-8"
          style={{
            fontSize: 14,
            fontFamily: "'Suisse Intl', sans-serif",
            letterSpacing: '-0.3px',
            lineHeight: 1.2,
          }}
        >
          Designing
          <br />
          Feelings
        </h2>

        <div className="flex flex-col gap-3">
          {CLIENTS.map((client, index) => (
            <div
              key={client.id}
              className="flex items-center gap-3"
            >
              {/* Thumbnail */}
              <div
                className="overflow-hidden"
                style={{
                  width: 40,
                  height: 28,
                  opacity: index === activeClientIndex ? 1 : 0.4,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <img
                  src={client.images[0]?.url || ''}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <span
                className="text-white"
                style={{
                  fontSize: 10,
                  fontFamily: "'Suisse Intl', sans-serif",
                  opacity: index === activeClientIndex ? 1 : 0.4,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {client.name}
              </span>

              {/* Active indicator */}
              {index === activeClientIndex && (
                <div
                  className="w-2 h-2 rounded-full bg-white ml-auto"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesigningFeelings;

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import type { Client, ClientImage } from '../../data/clients';

interface ClientRowProps {
  client: Client;
  rowHeight: number;
  onImageHover: (image: ClientImage | null) => void;
  isActiveRow: boolean;
}

const ClientRow = ({ client, rowHeight, onImageHover, isActiveRow }: ClientRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [panProgress, setPanProgress] = useState(0);

  // Calculate image width based on the width value from data (scaled to row height)
  const getImageWidth = (width: number) => {
    // The widths in data are based on 80px height, scale proportionally
    return (width / 80) * rowHeight;
  };

  // Calculate total width of all images
  const totalImagesWidth = client.images.reduce((acc, img) => {
    return acc + getImageWidth(img.width);
  }, 0);

  // Handle mouse movement within this row
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;

    const rect = rowRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, mouseX / rect.width));
    
    setPanProgress(progress);
  };

  // Animate panning based on panProgress
  useEffect(() => {
    if (!imagesContainerRef.current) return;

    // Calculate max pan: first image at x=0, last image ends at container width
    const containerWidth = window.innerWidth;
    const maxPan = Math.max(0, totalImagesWidth - containerWidth);
    
    // Pan amount based on progress (0 = first image at left edge, 1 = last image at right edge)
    const panX = -maxPan * panProgress;

    gsap.to(imagesContainerRef.current, {
      x: panX,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [panProgress, totalImagesWidth]);

  // Handle mouse leave - clear hovered image
  const handleMouseLeave = () => {
    onImageHover(null);
  };

  return (
    <article
      ref={rowRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Client Info - Positioned above images, z-index above overlay only for active row */}
      <div 
        className="relative flex items-center pointer-events-none"
        style={{ 
          paddingLeft: 100,
          paddingBottom: 12,
          zIndex: isActiveRow ? 40 : 1,
          gap: 270,
        }}
      >
        <span
          className="font-medium whitespace-nowrap"
          style={{
            fontSize: 15,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            letterSpacing: '-0.3px',
            color: '#FFFFFF',
          }}
        >
          {client.name}
        </span>
        <span
          className="whitespace-nowrap"
          style={{
            fontSize: 15,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            letterSpacing: '-0.3px',
            opacity: 0.5,
            color: '#FFFFFF',
          }}
        >
          {client.tagline}
        </span>
      </div>

      {/* Images Container - Full width, pannable */}
      <div className="w-full overflow-hidden" style={{ height: rowHeight }}>
        <div
          ref={imagesContainerRef}
          className="flex items-center h-full"
          style={{
            gap: 0,
            willChange: 'transform',
          }}
        >
          {client.images.map((image) => (
            <figure
              key={image.id}
              className="flex-shrink-0 overflow-hidden cursor-pointer m-0"
              style={{
                width: getImageWidth(image.width),
                height: rowHeight,
              }}
              onMouseEnter={() => onImageHover(image)}
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Bottom spacing - creates ~230px between image strips (198 + ~32px text area of next row) */}
      <div style={{ height: 198 }} />
    </article>
  );
};

export default ClientRow;

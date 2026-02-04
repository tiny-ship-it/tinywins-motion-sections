import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EmotionalPortrait } from '../../types/globalFeelings';

interface ImageModalProps {
  portrait: EmotionalPortrait;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ portrait, isOpen, onClose }: ImageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Entrance animation
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        contentRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.2)',
        }
      );
    } else {
      // Exit animation
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen && !modalRef.current) return null;

  return (
    <div
      ref={modalRef}
      className="image-modal fixed inset-0 z-50 flex items-center justify-center"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="modal-overlay absolute inset-0 bg-black/80 cursor-pointer"
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="modal-content relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-4xl max-h-[90vh] flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="modal-close absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full text-2xl font-bold hover:bg-white transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={portrait.url}
            alt={portrait.alt}
            className="w-full h-full object-cover"
            style={{ maxWidth: '600px', maxHeight: '90vh' }}
          />
        </div>

        {/* Details */}
        <div className="modal-details p-8 flex flex-col justify-center max-w-md">
          <h3 className="text-3xl font-bold mb-4 text-[#1A1A1A]">
            {portrait.emotion}
          </h3>
          <p className="text-lg text-[#666] mb-2">
            <strong>Location:</strong> {portrait.location}
          </p>
          <p className="text-sm text-[#999] mb-6">
            <strong>Photographer:</strong> {portrait.photographer}
          </p>
          <p className="text-base text-[#444] leading-relaxed">
            A moment of {portrait.emotion.toLowerCase()} captured in {portrait.location}.
            This portrait embodies the universal nature of human emotion,
            connecting us across cultures and continents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

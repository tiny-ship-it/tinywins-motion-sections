import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Image path
const heroImage = '/assets/images/make-them-feel/hero-image.png';

// TW Logo component (inline SVG for better control)
const TWLogo = () => (
  <svg
    width="57"
    height="46"
    viewBox="0 0 125.169 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="tw-logo"
    aria-label="TinyWins Logo"
    role="img"
  >
    <path
      d="M125.169 39.7172L119.076 70.4042L90.0304 79.8597V32.814L80.0483 83.1082L52.5928 92.0417V29.2561L35.0427 24.2093V97.3012L20.539 102V20.0326L0 14.1156V0L66.9432 21.0381V77.0173L77.3851 24.3833L104.381 33.0461V72.4152L111.719 35.4051L125.169 39.7172Z"
      fill="currentColor"
    />
  </svg>
);

const MakeThemFeel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textSection2Ref = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroSectionRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Three lockups: 1) Fullscreen, 2) Centered scaled, 3) Scrolled up with text
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=300%', // 3 beats worth of scroll
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Lockup 1 → 2: Fade out hero text and scale image down (stays centered)
      heroTl.to(
        '.hero-text',
        {
          opacity: 0,
          duration: 0.15,
          ease: 'none',
        },
        0
      );

      heroTl.to(
        imageContainerRef.current,
        {
          scale: 0.65,
          borderRadius: '16px',
          duration: 0.33,
          ease: 'power2.inOut',
        },
        0
      );

      // Hold at Lockup 2 (centered, scaled image)
      heroTl.to({}, { duration: 0.17 });

      // Lockup 2 → 3: Image scrolls up to get cut off at top (mostly hidden)
      heroTl.to(
        imageContainerRef.current,
        {
          top: '-15%', // Move up significantly so only bottom portion is visible
          duration: 0.25,
          ease: 'power2.inOut',
        },
        0.5
      );

      // Text fades in AFTER image has finished scrolling
      heroTl.fromTo(
        '.frame2-text',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.75 // Start after image scroll completes
      );

      // Hold at Lockup 3
      heroTl.to({}, { duration: 0.1 });

      // Frame 3: Second text section - pin it for its own beat
      if (textSection2Ref.current) {
        // Fade in animation
        gsap.fromTo(
          textSection2Ref.current.querySelector('.animate-in'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textSection2Ref.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Pin the section
        ScrollTrigger.create({
          trigger: textSection2Ref.current,
          start: 'top top',
          end: '+=50%',
          pin: true,
          pinSpacing: true,
        });
      }

      // Frame 4: CTA section - intro text moves to top, then main CTA animates in
      if (ctaSectionRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // Intro text is already at top, just ensure it's visible
        // Main CTA animates in from below
        ctaTl.fromTo(
          '.cta-main',
          {
            opacity: 0,
            y: '50vh',
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        // Hold at end for the "beat"
        ctaTl.to({}, { duration: 0.4 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="make-them-feel" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Frame 1: Hero Section - Single image that transitions */}
      <section
        ref={heroSectionRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Image Container - Centered, scales down on scroll */}
        <div
          ref={imageContainerRef}
          className="absolute overflow-hidden gpu-accelerated"
          style={{
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            willChange: 'transform, border-radius',
          }}
        >
          <img
            src={heroImage}
            alt="Global Feelings Studio hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
        </div>

        {/* Logo - Top Left */}
        <div
          className="hero-text absolute top-[26px] left-[29px] text-[#FCFAF8]"
          style={{ zIndex: 10 }}
        >
          <TWLogo />
        </div>

        {/* GLOBAL - Top Right */}
        <p
          className="hero-text absolute top-[26px] right-[27px] font-semibold uppercase text-[#FCFAF8]"
          style={{
            zIndex: 10,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            fontSize: 'clamp(48px, 7vw, 136px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
          }}
        >
          GLOBAL
        </p>

        {/* FEELINGS - Bottom Left */}
        <p
          className="hero-text absolute bottom-[29px] left-[29px] font-semibold uppercase text-[#FCFAF8]"
          style={{
            zIndex: 10,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            fontSize: 'clamp(48px, 7vw, 136px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
          }}
        >
          FEELINGS
        </p>

        {/* STUDIO - Bottom Right */}
        <p
          className="hero-text absolute bottom-[29px] right-[27px] font-semibold uppercase text-[#FCFAF8]"
          style={{
            zIndex: 10,
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            fontSize: 'clamp(48px, 7vw, 136px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
          }}
        >
          STUDIO
        </p>

        {/* Lockup 3 Text - Centered in viewport */}
        <div
          className="frame2-text absolute w-full flex flex-col items-center justify-center px-8"
          style={{
            top: 0,
            bottom: 0,
            opacity: 0,
            zIndex: 10,
          }}
        >
          <div
            className="text-center max-w-[987px]"
            style={{
              fontFamily: "'ABC Gramercy', Georgia, serif",
              fontSize: 'clamp(24px, 2.2vw, 42px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.2,
              color: '#000',
            }}
          >
            <p className="mb-0">The rational brain is slow.</p>
            <p className="mb-6">
              Feelings tell us what to do{' '}
              <span
                style={{
                  fontFamily: "'Quick Writers', 'Brush Script MT', cursive",
                  fontSize: '1.1em',
                  letterSpacing: '-0.03em',
                }}
              >
                instantly
              </span>
              .
            </p>
            <p className="mt-8">
              What to buy. Who to follow. Who to unfollow. What to reject, what to
              embrace. Who to be, who not to be.
            </p>
          </div>
        </div>
      </section>

      {/* Frame 3: "Branding is an emotional sport" */}
      <section
        ref={textSection2Ref}
        className="relative w-full h-screen bg-white flex items-center justify-center px-8 overflow-hidden"
      >
        <div
          className="animate-in text-center"
          style={{
            fontFamily: "'ABC Gramercy', Georgia, serif",
            fontSize: 'clamp(24px, 2.2vw, 42px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.2,
            color: '#000',
          }}
        >
          <p className="mb-0">Branding is an emotional sport.</p>
          <p>
            Facts change, but{' '}
            <span
              style={{
                fontFamily: "'Quick Writers', 'Brush Script MT', cursive",
                fontSize: '1.1em',
                letterSpacing: '-0.03em',
              }}
            >
              feelings
            </span>{' '}
            linger.
          </p>
        </div>
      </section>

      {/* Frame 4: CTA - "Make Them Feel Something" */}
      <section
        ref={ctaSectionRef}
        className="relative w-full h-screen bg-white flex flex-col items-center px-8 overflow-hidden"
      >
        {/* Intro text - positioned at top */}
        <p
          className="cta-intro text-center"
          style={{
            fontFamily: "'ABC Gramercy', Georgia, serif",
            fontSize: 'clamp(24px, 2.2vw, 42px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.14,
            color: '#000',
            paddingTop: '60px',
          }}
        >
          If you want your brand to move people,
        </p>

        {/* Main CTA - animates in from bottom */}
        <h2
          className="cta-main text-center font-semibold uppercase absolute"
          style={{
            fontFamily: "'Suisse Intl', system-ui, sans-serif",
            fontSize: 'clamp(48px, 12vw, 226px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
            color: '#000',
            bottom: '10%',
            opacity: 0,
          }}
        >
          MAKE THEM
          <br />
          FEEL SOMETHING
        </h2>
      </section>
    </div>
  );
};

export default MakeThemFeel;

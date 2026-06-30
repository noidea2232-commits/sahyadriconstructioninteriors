import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '@assets/sahyadri-logo-new.png';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const group = logoGroupRef.current;
    const brandName = brandNameRef.current;
    const tagline = taglineRef.current;
    const line = lineRef.current;
    const sheen = sheenRef.current;

    if (!container || !overlay || !group || !brandName || !tagline || !line || !sheen) return;

    document.body.style.overflow = 'hidden';

    gsap.set(container, { opacity: 1 });
    gsap.set(overlay, { opacity: 1 });
    gsap.set(group, { opacity: 0, scale: 0.9, y: 18, filter: 'blur(10px)' });
    gsap.set(brandName, { opacity: 0, y: 18, letterSpacing: '0.34em' });
    gsap.set(tagline, { opacity: 0, y: 10 });
    gsap.set(line, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(sheen, { x: '-150%' });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      },
    });

    tl.to(group, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power3.out',
    }, 0);

    tl.to(sheen, {
      x: '150%',
      duration: 0.65,
      ease: 'power2.inOut',
    }, 0.55);

    tl.to(brandName, {
      opacity: 1,
      y: 0,
      letterSpacing: '0.18em',
      duration: 0.75,
      ease: 'power3.out',
    }, 0.9);

    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    }, 1.15);

    tl.to(line, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.inOut',
    }, 1.25);

    tl.to(group, {
      y: -48,
      opacity: 0,
      filter: 'blur(4px)',
      duration: 0.45,
      ease: 'power2.inOut',
    }, 2.65);

    tl.to(brandName, {
      opacity: 0,
      y: -22,
      duration: 0.35,
      ease: 'power2.in',
    }, 2.65);

    tl.to(tagline, {
      opacity: 0,
      y: -12,
      duration: 0.3,
      ease: 'power2.in',
    }, 2.72);

    tl.to(line, {
      scaleX: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 2.75);

    tl.to(overlay, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
    }, 2.82);

    tl.add(() => {
      document.dispatchEvent(new CustomEvent('start-hero-animation'));
    }, 2.9);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-auto"
        style={{
          background: '#070707',
          willChange: 'opacity',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(24px)',
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center select-none pointer-events-none">
        <div
          ref={logoGroupRef}
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: 'clamp(220px, 38vw, 520px)',
            height: 'clamp(150px, 28vw, 360px)',
            willChange: 'transform, opacity, filter',
          }}
        >
          <img
            src={logo}
            alt="Sahyadri Construction & Interiors"
            className="w-full h-full object-contain object-center"
            draggable={false}
            style={{
              filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.18)) drop-shadow(0 18px 36px rgba(0,0,0,0.75))',
            }}
          />
          <div
            ref={sheenRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 28%, rgba(184,146,74,0.08) 40%, rgba(255,244,200,0.55) 49%, rgba(255,255,255,0.85) 50%, rgba(255,244,200,0.55) 51%, rgba(184,146,74,0.08) 62%, transparent 74%)',
              transform: 'skewX(-12deg)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        <div
          ref={brandNameRef}
          style={{
            fontFamily: '"Cormorant Garamond", "Didot", "Playfair Display", Georgia, serif',
            fontSize: 'clamp(13px, 1.5vw, 20px)',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: '#E8D9B5',
            textTransform: 'uppercase',
            marginTop: '10px',
            willChange: 'transform, opacity, letter-spacing',
          }}
        >
          SAHYADRI
        </div>

        <div
          ref={taglineRef}
          style={{
            fontFamily: '"Cormorant Garamond", "Didot", Georgia, serif',
            fontSize: 'clamp(9px, 0.95vw, 11px)',
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'rgba(220, 205, 165, 0.72)',
            textTransform: 'uppercase',
            marginTop: '4px',
            willChange: 'transform, opacity',
          }}
        >
          Construction &amp; Interiors
        </div>

        <div style={{ width: 'clamp(120px, 18vw, 190px)', marginTop: '14px' }}>
          <div
            ref={lineRef}
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.45) 20%, #D4AF37 50%, rgba(212,175,55,0.45) 80%, transparent 100%)',
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      </div>
    </div>
  );
}

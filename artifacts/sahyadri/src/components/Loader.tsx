import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '@assets/sahyadri-logo-checker.jpg';

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
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  // 1. Process logo to remove checkerboard background
  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { setProcessedLogo(logo); return; }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
        const isWhite = r > 240 && g > 240 && b > 240;
        const isGrey = r > 185 && r < 235 && g > 185 && g < 235 && b > 185 && b < 235 && maxDiff < 10;
        if (isWhite || isGrey) data[i + 3] = 0;
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedLogo(canvas.toDataURL());
    };
    img.onerror = () => setProcessedLogo(logo);
  }, []);

  // 2. Full 4-second cinematic brand reveal
  useEffect(() => {
    if (!processedLogo) return;

    const container = containerRef.current;
    const overlay = overlayRef.current;
    const group = logoGroupRef.current;
    const brandName = brandNameRef.current;
    const tagline = taglineRef.current;
    const line = lineRef.current;
    const sheen = sheenRef.current;

    if (!container || !overlay || !group || !brandName || !tagline || !line || !sheen) return;

    document.body.style.overflow = 'hidden';

    // ── Initial states ──
    gsap.set(group, { opacity: 0, scale: 0.88, y: 20, filter: 'blur(16px)' });
    gsap.set(brandName, { opacity: 0, y: 24, letterSpacing: '0.4em' });
    gsap.set(tagline, { opacity: 0, y: 12 });
    gsap.set(line, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(sheen, { x: '-160%' });
    gsap.set(overlay, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // ── 0.0s → 0.6s: Dark curtain fades in (hero blurs behind) ──
    tl.to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);

    // ── 0.6s → 1.8s: Logo emerges — blur dissolves, scales in, opacity rises ──
    tl.to(group, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
    }, 0.6);

    // ── 1.4s → 2.1s: Metallic gold sheen sweeps across logo ──
    tl.to(sheen, {
      x: '160%',
      duration: 0.7,
      ease: 'power2.inOut',
    }, 1.4);

    // ── 2.0s → 2.8s: Brand name rises with letter-spacing collapse ──
    tl.to(brandName, {
      opacity: 1,
      y: 0,
      letterSpacing: '0.22em',
      duration: 0.8,
      ease: 'power3.out',
    }, 2.0);

    // ── 2.4s → 3.0s: Tagline fades in ──
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 2.4);

    // ── 2.7s → 3.4s: Gold line expands from center outward ──
    tl.to(line, {
      scaleX: 1,
      duration: 0.7,
      ease: 'power2.inOut',
    }, 2.7);

    // ── 3.4s → 4.2s: Everything held at peak — let user absorb brand ──
    // (This pause is intentional — it IS the premium feel)

    // ── 4.2s → 4.7s: Logo group ascends and dissolves ──
    tl.to(group, {
      y: -60,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.5,
      ease: 'power2.inOut',
    }, 4.2);
    tl.to(brandName, {
      opacity: 0,
      y: -30,
      duration: 0.45,
      ease: 'power2.in',
    }, 4.2);
    tl.to(tagline, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    }, 4.25);
    tl.to(line, {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, 4.3);

    // ── 4.5s → 5.1s: Overlay fades away — hero sharpens into view ──
    tl.to(overlay, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      duration: 0.6,
      ease: 'power2.out',
    }, 4.5);

    // ── Fire hero content animations at 4.55s ──
    tl.add(() => {
      document.dispatchEvent(new CustomEvent('start-hero-animation'));
    }, 4.55);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [processedLogo, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
    >
      {/* ── Blurred darkened overlay — sits behind logo group ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-auto"
        style={{
          background: 'rgba(8, 8, 10, 0.68)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          willChange: 'opacity, backdrop-filter',
        }}
      />

      {/* ── Ambient gold glow orb — purely aesthetic ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ── Main brand group: logo + text lockup ── */}
      {processedLogo && (
        <div
          className="relative flex flex-col items-center gap-0 select-none pointer-events-none"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {/* Logo image with metallic sheen */}
          <div
            ref={logoGroupRef}
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              width: 'clamp(160px, 18vw, 260px)',
              height: 'clamp(160px, 18vw, 260px)',
              willChange: 'transform, opacity, filter',
            }}
          >
            <img
              src={processedLogo}
              alt="Sahyadri Construction & Interiors"
              className="w-full h-full object-contain object-center"
              draggable={false}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.25)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
              }}
            />
            {/* Gold metallic sheen sweep */}
            <div
              ref={sheenRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  'linear-gradient(',
                  '  105deg,',
                  '  transparent 25%,',
                  '  rgba(184,146,74,0.08) 38%,',
                  '  rgba(255,244,200,0.60) 48%,',
                  '  rgba(255,255,255,0.90) 50%,',
                  '  rgba(255,244,200,0.60) 52%,',
                  '  rgba(184,146,74,0.08) 62%,',
                  '  transparent 75%',
                  ')',
                ].join(''),
                transform: 'skewX(-12deg)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* Brand name — spaced luxury typography */}
          <div
            ref={brandNameRef}
            style={{
              fontFamily: '"Cormorant Garamond", "Didot", "Playfair Display", Georgia, serif',
              fontSize: 'clamp(13px, 1.6vw, 20px)',
              fontWeight: 300,
              letterSpacing: '0.4em',
              color: '#E8D9B5',
              textTransform: 'uppercase',
              marginTop: '20px',
              willChange: 'transform, opacity, letter-spacing',
            }}
          >
            SAHYADRI
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            style={{
              fontFamily: '"Cormorant Garamond", "Didot", Georgia, serif',
              fontSize: 'clamp(9px, 1vw, 11.5px)',
              fontWeight: 400,
              letterSpacing: '0.28em',
              color: 'rgba(200, 185, 145, 0.65)',
              textTransform: 'uppercase',
              marginTop: '6px',
              willChange: 'transform, opacity',
            }}
          >
            Construction &amp; Interiors
          </div>

          {/* Ultra-thin gold divider line */}
          <div
            style={{
              width: 'clamp(100px, 14vw, 180px)',
              marginTop: '18px',
            }}
          >
            <div
              ref={lineRef}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 20%, #D4AF37 50%, rgba(212,175,55,0.5) 80%, transparent 100%)',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

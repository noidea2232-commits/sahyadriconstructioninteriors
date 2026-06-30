import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '@assets/hero-bg.png';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_DIR = 'WhatsApp-Video-2026-06-26-at-401';

function frameSrc(index: number) {
  const frame = String(index + 1).padStart(4, '0');
  return `${import.meta.env.BASE_URL}${FRAME_DIR}/${frame}.jpg`;
}

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const fallbackRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const w = useRef(0);
  const h = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!canvas || !container || !pinTarget) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setupCanvas = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
      w.current = window.innerWidth;
      h.current = window.innerHeight;
      canvas.width = Math.round(w.current * dpr);
      canvas.height = Math.round(h.current * dpr);
      canvas.style.width = `${w.current}px`;
      canvas.style.height = `${h.current}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const drawImageCover = (img: HTMLImageElement) => {
      const cw = w.current;
      const ch = h.current;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const drawW = iw * scale;
      const drawH = ih * scale;
      const dx = (cw - drawW) / 2;
      const dy = (ch - drawH) / 2;

      ctx.fillStyle = '#1a1510';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawW, drawH);

      const vg = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.2, cw / 2, ch / 2, ch * 0.78);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.22)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, cw, ch);
    };

    const drawFrame = (idx: number) => {
      const frames = framesRef.current;
      const clamped = Math.min(Math.max(0, idx), TOTAL_FRAMES - 1);

      let img: HTMLImageElement | null = null;
      for (let k = clamped; k >= 0; k--) {
        if (frames[k]?.complete && frames[k].naturalWidth > 0) {
          img = frames[k];
          break;
        }
      }
      if (!img) {
        for (let k = clamped + 1; k < TOTAL_FRAMES; k++) {
          if (frames[k]?.complete && frames[k].naturalWidth > 0) {
            img = frames[k];
            break;
          }
        }
      }

      if (img) {
        drawImageCover(img);
        return;
      }

      if (fallbackRef.current?.complete && fallbackRef.current.naturalWidth > 0) {
        drawImageCover(fallbackRef.current);
      }
    };

    const fallback = new Image();
    fallback.src = heroBg;
    fallback.onload = () => {
      fallbackRef.current = fallback;
      drawFrame(currentFrameRef.current);
    };
    fallbackRef.current = fallback;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinTarget,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        currentFrameRef.current = Math.round(self.progress * (TOTAL_FRAMES - 1));
      },
    });

    let lastDrawnFrame = -1;
    let isVisible = true;

    const loop = () => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const f = currentFrameRef.current;
      if (f !== lastDrawnFrame) {
        drawFrame(f);
        lastDrawnFrame = f;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawFrame(currentFrameRef.current);
      },
      { rootMargin: '120px 0px', threshold: 0 },
    );
    visibilityObserver.observe(container);

    const imgs: HTMLImageElement[] = [];
    const requestRedraw = () => drawFrame(currentFrameRef.current);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      if (i < 30) img.loading = 'eager';
      img.onload = requestRedraw;
      img.onerror = () => {
        if (i === 0) console.warn(`Image sequence frame failed to load: ${frameSrc(i)}`);
      };
      img.src = frameSrc(i);
      imgs.push(img);
    }
    framesRef.current = imgs;

    drawFrame(0);

    return () => {
      trigger.kill();
      visibilityObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setupCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '350vh', background: '#1a1510' }}
      id="image-sequence-section"
      aria-label="Sahyadri project scroll experience"
    >
      <div
        ref={pinTargetRef}
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26,21,16,0.45) 0%, transparent 10%, transparent 90%, rgba(26,21,16,0.45) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

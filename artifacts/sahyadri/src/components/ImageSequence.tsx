import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_BASE = '/WhatsApp-Video-2026-06-26-at-401/';

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
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

    // ─── 1. Canvas setup ────────────────────────────────────────────────────
    const setupCanvas = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
      w.current = window.innerWidth;
      h.current = window.innerHeight;
      canvas.width = Math.round(w.current * dpr);
      canvas.height = Math.round(h.current * dpr);
      canvas.style.width = `${w.current}px`;
      canvas.style.height = `${h.current}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset — never compounds
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // ─── 2. Draw a single frame ──────────────────────────────────────────────
    const drawFrame = (idx: number) => {
      const frames = framesRef.current;
      const clamped = Math.min(Math.max(0, idx), TOTAL_FRAMES - 1);

      // Find the nearest loaded frame (scan backward, then forward)
      let img: HTMLImageElement | null = null;
      for (let k = clamped; k >= 0; k--) {
        if (frames[k]?.complete && frames[k].naturalWidth > 0) { img = frames[k]; break; }
      }
      if (!img) {
        for (let k = clamped + 1; k < TOTAL_FRAMES; k++) {
          if (frames[k]?.complete && frames[k].naturalWidth > 0) { img = frames[k]; break; }
        }
      }
      if (!img) return; // nothing loaded yet — keep canvas black

      const cw = w.current;
      const ch = h.current;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // object-fit: cover — fill entire screen, no black bars
      const scale = Math.max(cw / iw, ch / ih);
      const drawW = iw * scale;
      const drawH = ih * scale;
      const dx = (cw - drawW) / 2;
      const dy = (ch - drawH) / 2;

      // Clear and draw
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawW, drawH);

      // Very subtle vignette — just enough for cinematic depth
      const vg = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.2, cw / 2, ch / 2, ch * 0.78);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.28)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, cw, ch);
    };

    // ─── 3. GSAP ScrollTrigger Pinning and Scrubbing ────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinTarget,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        currentFrameRef.current = Math.round(self.progress * (TOTAL_FRAMES - 1));
      },
    });

    // ─── 4. Render loop with loading update detection ───────────────────────
    let lastDrawnFrame = -1;
    let lastDrawnComplete = false;
    let isVisible = true;

    const loop = () => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const f = currentFrameRef.current;
      const frames = framesRef.current;
      const currentImg = frames[f];
      const isComplete = currentImg?.complete && currentImg.naturalWidth > 0;

      // Redraw if index changed OR if it's now complete (was drawn as fallback earlier)
      if (f !== lastDrawnFrame || (isComplete && !lastDrawnComplete)) {
        drawFrame(f);
        lastDrawnFrame = f;
        lastDrawnComplete = isComplete;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '100px 0px', threshold: 0 },
    );
    visibilityObserver.observe(container);

    // ─── 5. Preload — high priority on first 40 frames ─────────────────────
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_BASE}${String(i).padStart(4, '0')}.jpg`;
      if (i <= 40) (img as any).fetchPriority = 'high';
      imgs.push(img);
    }
    framesRef.current = imgs;

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
      style={{ position: 'relative', width: '100%', height: '350vh', background: '#0A0A0A' }}
      id="image-sequence-section"
      aria-label="Sahyadri project scroll experience"
    >
      {/* Target pinned by GSAP ScrollTrigger */}
      <div
        ref={pinTargetRef}
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Full-screen canvas — renders image sequence at 60fps */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
        />

        {/* Minimal top/bottom edge blend only — does NOT darken the center */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 8%, transparent 92%, rgba(10,10,10,0.5) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

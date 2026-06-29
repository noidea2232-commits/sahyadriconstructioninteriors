import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type HoverState = 'default' | 'interactive' | 'project';

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], .project-item';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const text = textRef.current;
    if (!cursor || !dot || !text) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let rafId = 0;
    let isMoving = false;
    let hoverState: HoverState = 'default';
    let idleTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      if (!rafId) rafId = requestAnimationFrame(render);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 120);
    };

    const render = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      const stillLerping =
        Math.abs(mouseX - cursorX) > 0.5 || Math.abs(mouseY - cursorY) > 0.5;

      if (isMoving || stillLerping) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
    };

    const applyHover = (state: HoverState) => {
      if (hoverState === state) return;
      hoverState = state;

      if (state === 'project') {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(184, 131, 46, 0.9)',
          borderColor: '#B8832E',
          duration: 0.25,
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 0, duration: 0.2, overwrite: 'auto' });
        gsap.to(text, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      } else if (state === 'interactive') {
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(184, 131, 46, 0.2)',
          borderColor: '#B8832E',
          duration: 0.25,
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 0, duration: 0.2, overwrite: 'auto' });
        gsap.to(text, { opacity: 0, duration: 0.15, overwrite: 'auto' });
      } else {
        gsap.to(cursor, {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: '#B8832E',
          duration: 0.25,
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 1, duration: 0.2, overwrite: 'auto' });
        gsap.to(text, { opacity: 0, duration: 0.15, overwrite: 'auto' });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!interactive) return;

      const from = e.relatedTarget as Node | null;
      if (from && interactive.contains(from)) return;

      applyHover(
        interactive.classList.contains('project-item') ? 'project' : 'interactive'
      );
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!interactive) return;

      const to = e.relatedTarget as Node | null;
      if (to && interactive.contains(to)) return;

      applyHover('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(idleTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center pointer-events-none z-[100] hidden md:flex"
        style={{ transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform' }}
      >
        <span
          ref={textRef}
          className="text-[10px] text-white font-bold tracking-widest opacity-0 select-none"
        >
          VIEW
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary pointer-events-none z-[100] hidden md:block"
        style={{ transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform' }}
      />
    </>
  );
}

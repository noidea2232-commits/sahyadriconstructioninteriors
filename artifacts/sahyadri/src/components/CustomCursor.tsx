import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly move dot
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    const ticker = gsap.ticker.add(() => {
      // Smoothly move outer circle
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    const onHover = () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: 'rgba(200, 169, 106, 0.2)', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    
    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
    </>
  );
}

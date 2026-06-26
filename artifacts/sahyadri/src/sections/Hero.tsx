import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '@assets/hero-bg.png';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle effect on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number, y: number, radius: number, vx: number, vy: number, alpha: number}> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let rafId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 106, ${p.alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Delay animation to wait for loader
      const tl = gsap.timeline({ delay: 2.6 });

      // Split text animation effect manually (basic words)
      if (textRef.current) {
        const text = textRef.current.innerText;
        textRef.current.innerHTML = '';
        text.split(' ').forEach(word => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          const innerSpan = document.createElement('span');
          innerSpan.innerText = word;
          innerSpan.style.display = 'inline-block';
          span.innerHTML = '';
          span.appendChild(innerSpan);
          textRef.current?.appendChild(span);
          
          // spacing
          textRef.current?.appendChild(document.createTextNode(' '));
        });

        const wordSpans = textRef.current.querySelectorAll('span > span');
        gsap.set(wordSpans, { yPercent: 100, opacity: 0 });
        
        tl.to(wordSpans, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out"
        });
      }

      if (ctaRef.current) {
        tl.fromTo(
          Array.from(ctaRef.current.children),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Parallax effect
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden noise-bg bg-[#080808]">
      {/* Background Image with Parallax container */}
      <div ref={heroRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Dark cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808] pointer-events-none" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto mt-10">
        <h1 
          ref={textRef} 
          className="text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] font-display font-extrabold text-white uppercase tracking-tighter mb-6 max-w-5xl"
        >
          Build Your Dream Space
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mb-12 opacity-0" 
           style={{ animation: "fadeIn 1s ease-out 3.5s forwards" }}>
          Shivamogga's premier high-end construction and interior design firm. We create luxury residential and commercial spaces with uncompromising precision.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => scrollTo('#projects')}
            className="px-8 py-4 bg-primary text-background font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group"
          >
            Explore Projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          <button 
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 border border-white/30 text-white font-bold tracking-widest uppercase hover:border-primary hover:text-primary backdrop-blur-sm transition-colors duration-300"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
           style={{ animation: "fadeIn 1s ease-out 4s forwards" }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-down" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-down {
          animation: scroll-down 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}

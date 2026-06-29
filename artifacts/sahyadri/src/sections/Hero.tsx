import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '@assets/hero-bg.png';
import { COMPANY_STATS } from '@/lib/company-stats';

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

    canvas.width = window.innerWidth / 2; // only cover right half ideally, or just full width but dense on right
    canvas.height = window.innerHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Resize actual canvas drawing area to full
    canvas.width = canvas.offsetWidth;

    const particles: Array<{x: number, y: number, radius: number, vx: number, vy: number, alpha: number}> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: (canvas.width / 2) + Math.random() * (canvas.width / 2), // mostly on right side
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.15 + 0.05, // very subtle gold
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
        ctx.fillStyle = `rgba(184, 146, 74, ${p.alpha})`; // primary color
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
    const isLoaderActive = !sessionStorage.getItem('loader-played');

    // Prevent flash of content: hide all hero elements initially if the loader is active
    if (isLoaderActive) {
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(".hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".hero-desc-text", { opacity: 0, y: 15 });
      gsap.set(".hero-stats > div", { opacity: 0, y: 15 });
      gsap.set(".hero-scroll", { opacity: 0, y: 15 });
      if (ctaRef.current) {
        gsap.set(Array.from(ctaRef.current.children), { opacity: 0, y: 20 });
      }
      gsap.set(".hero-img-inner-bg", { scale: 1.02 });
    }

    const startAnimations = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // 1. Hero Image Zoom Out (1.02 -> 1) over 2.0s
        tl.fromTo(".hero-img-inner-bg", 
          { scale: 1.02 },
          { scale: 1, duration: 2.0, ease: "power2.out" },
          0
        );

        // 2. Eyebrow Reveal (starts at 0.1s)
        tl.fromTo(".hero-eyebrow",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.1
        );

        // 3. Title Word-by-Word Reveal (starts at 0.25s)
        if (textRef.current) {
          // Ensure container is visible before we split it
          gsap.set(textRef.current, { opacity: 1 });
          
          const text = textRef.current.innerText;
          textRef.current.innerHTML = '';
          text.split(' ').forEach(word => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.overflow = 'hidden';
            span.style.verticalAlign = 'top';
            span.style.marginRight = '0.3em';
            
            const innerSpan = document.createElement('span');
            innerSpan.innerText = word;
            innerSpan.style.display = 'inline-block';
            span.appendChild(innerSpan);
            textRef.current?.appendChild(span);
          });

          const wordSpans = textRef.current.querySelectorAll('span > span');
          gsap.set(wordSpans, { yPercent: 100, opacity: 0 });
          
          tl.to(wordSpans, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out"
          }, 0.25);
        }

        // 4. Description Paragraph Reveal (starts at 0.55s)
        tl.fromTo(".hero-desc-text",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.55
        );

        // 5. Buttons Reveal (starts at 0.75s)
        if (ctaRef.current) {
          tl.fromTo(
            Array.from(ctaRef.current.children),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
            0.75
          );
        }

        // 6. Stats Reveal (starts at 0.95s)
        tl.fromTo(".hero-stats > div",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          0.95
        );

        // 7. Scroll Indicator Reveal (starts at 1.15s)
        tl.fromTo(".hero-scroll",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          1.15
        );
      });

      return ctx;
    };

    let animationContext: any;

    if (isLoaderActive) {
      const handleStart = () => {
        animationContext = startAnimations();
      };
      document.addEventListener('start-hero-animation', handleStart);
      return () => {
        document.removeEventListener('start-hero-animation', handleStart);
        if (animationContext) animationContext.revert();
      };
    } else {
      animationContext = startAnimations();
      return () => {
        if (animationContext) animationContext.revert();
      };
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(".hero-img-inner", {
        yPercent: 20,
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
    <section id="home" className="relative h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden pt-20 md:pt-0" ref={heroRef}>
      
      {/* Left Column - Text */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10">
        <div className="hero-eyebrow flex items-center gap-4 mb-6 opacity-0">
          <div className="w-8 h-[2px] bg-primary"></div>
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Shivamogga's Finest</span>
        </div>

        <h1 
          ref={textRef} 
          className="text-5xl md:text-[5.5vw] leading-[0.95] font-display font-extrabold text-foreground uppercase tracking-tighter mb-8"
        >
          Build Your Dream Space
        </h1>
        
        <p className="hero-desc-text text-lg text-muted-foreground font-light max-w-lg mb-12 leading-relaxed opacity-0">
          Shivamogga's premier high-end construction and interior design firm. We create luxury residential and commercial spaces with uncompromising precision.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 mb-16">
          <button 
            onClick={() => scrollTo('#projects')}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase hover:bg-foreground transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Explore Projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          <button 
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 border border-foreground text-foreground font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-300 cursor-pointer"
          >
            Book Consultation
          </button>
        </div>

        {/* Mini stats */}
        <div className="hero-stats flex gap-8 md:gap-12 opacity-0">
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-foreground">{COMPANY_STATS.yearsExperience}+</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Years</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-foreground">{COMPANY_STATS.projectsCompleted}+</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-foreground">{COMPANY_STATS.googleRating.toFixed(1)}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Rating</span>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-1/2 h-full z-0 opacity-20 md:opacity-100 overflow-hidden border-l border-primary/20">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] hero-img-inner">
          <div 
            className="hero-img-inner-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-6 md:left-24 flex items-center gap-4 opacity-0 z-20">
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-[1px] h-16 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-down" />
        </div>
      </div>

      <style>{`
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

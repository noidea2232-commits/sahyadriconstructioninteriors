import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, PaintBucket, Hammer, Compass, Key } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Home size={32} strokeWidth={1.5} />,
    title: "Residential Construction",
    desc: "Bespoke luxury homes built with precision engineering and premium materials for a lifetime of elegance."
  },
  {
    icon: <Building2 size={32} strokeWidth={1.5} />,
    title: "Commercial Construction",
    desc: "State-of-the-art commercial spaces designed for impact, functionality, and professional prestige."
  },
  {
    icon: <PaintBucket size={32} strokeWidth={1.5} />,
    title: "Interior Design",
    desc: "Curated interior environments that blend sophisticated aesthetics with everyday comfort and luxury."
  },
  {
    icon: <Hammer size={32} strokeWidth={1.5} />,
    title: "Renovation",
    desc: "Transformative property upgrades that breathe new life into existing structures while preserving character."
  },
  {
    icon: <Compass size={32} strokeWidth={1.5} />,
    title: "Architecture & Planning",
    desc: "Visionary architectural blueprints and meticulous planning to ensure flawless execution from ground up."
  },
  {
    icon: <Key size={32} strokeWidth={1.5} />,
    title: "Turnkey Projects",
    desc: "End-to-end luxury solutions from concept to handover, requiring zero oversight from our elite clientele."
  }
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current!.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 relative bg-[#0a0a0a]" ref={sectionRef}>
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100%' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-primary"></div>
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Our Expertise</span>
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
            Premium Services
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-panel group relative p-10 flex flex-col items-start hover:bg-[#151515] transition-colors duration-500 overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 group-hover:animate-pulse"></div>
              
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 relative z-10">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-display font-bold text-white mb-4 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground font-light leading-relaxed relative z-10">
                {service.desc}
              </p>
              
              {/* Gold line expand on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

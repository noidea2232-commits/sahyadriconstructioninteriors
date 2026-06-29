import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, PaintBucket, Hammer, Compass, Key, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "residential",
    icon: <Home size={30} strokeWidth={1.5} />,
    title: "Residential Build",
    subtitle: "Bespoke Luxury Villas & Estates",
    desc: "Bespoke luxury homes built with precision engineering and premium materials for a lifetime of elegance and structural safety.",
    details: ["Custom architectural layout", "Structural engineering compliance", "Eco-friendly construction", "Premium material sourcing"]
  },
  {
    id: "commercial",
    icon: <Building2 size={30} strokeWidth={1.5} />,
    title: "Commercial Space",
    subtitle: "High-Impact Corporate Facilities",
    desc: "State-of-the-art commercial complexes designed for corporate impact, maximum ergonomic functionality, and professional prestige.",
    details: ["Corporate office parks", "Retail & showroom spaces", "High-durability flooring", "Acoustic & lighting integration"]
  },
  {
    id: "interiors",
    icon: <PaintBucket size={30} strokeWidth={1.5} />,
    title: "Interior Design",
    subtitle: "Curated Opulent Living Environments",
    desc: "Curated interior environments that blend sophisticated aesthetics with everyday comfort, custom cabinetry, and Italian finishes.",
    details: ["Custom joinery & woodwork", "Smart lighting automation", "Modular kitchen concepts", "Curated furniture sourcing"]
  },
  {
    id: "renovation",
    icon: <Hammer size={30} strokeWidth={1.5} />,
    title: "Renovation & Upgrades",
    subtitle: "Structural Restoration & Expansion",
    desc: "Transformative property upgrades that breathe vibrant new life into existing structures while preserving timeless architectural character.",
    details: ["Facade modernization", "Structural reinforcement", "Space optimization", "Energy-efficiency retrofitting"]
  },
  {
    id: "architecture",
    icon: <Compass size={30} strokeWidth={1.5} />,
    title: "Architectural Planning",
    subtitle: "Visionary Blueprints & 3D Visualization",
    desc: "Visionary architectural blueprints and meticulous structural planning to ensure flawless execution and municipal approvals.",
    details: ["3D photorealistic walkthroughs", "Municipal plan clearance", "Elevation & landscape design", "Structural stress analysis"]
  },
  {
    id: "turnkey",
    icon: <Key size={30} strokeWidth={1.5} />,
    title: "Turnkey Solutions",
    subtitle: "End-to-End Hassle-Free Execution",
    desc: "Comprehensive solutions from concept to key handover, guaranteeing zero hassle and strict timeline adherence for elite clients.",
    details: ["Single point of contact", "Transparent budget tracking", "Rigorous quality control", "On-time delivery guarantee"]
  },
  {
    id: "vastu",
    icon: <Sparkles size={30} strokeWidth={1.5} />,
    title: "Vastu Consultant",
    subtitle: "Harmonic Energy & Sacred Spatial Alignment",
    desc: "Expert Vastu Shastra consultation ensuring scientific spatial alignment, positive cosmic energy flow, and lasting prosperity for occupants.",
    details: ["Directional energy mapping", "Five-element balancing (Panchabhuta)", "Architectural Vastu integration", "Remedial non-demolition solutions"]
  }
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const lastPosRef = useRef({ x: 0, y: 0 });
  const finePointerRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointerRef.current) return;

    const card = e.currentTarget;
    const dx = Math.abs(e.clientX - lastPosRef.current.x);
    const dy = Math.abs(e.clientY - lastPosRef.current.y);
    if (dx < 4 && dy < 4) return;

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { rotateX: 12, opacity: 0, y: 40 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-28 md:py-40 relative bg-background noise-bg section-gpu" ref={sectionRef} style={{ perspective: "1000px" }}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FAEBD7] rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-border/60 pb-12">
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">Our 7 Pillars of Excellence</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-foreground leading-[1.1]">
              Expert Services & <span className="font-serif italic font-normal text-primary">Vastu Solutions</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-light max-w-md text-base leading-relaxed">
            From visionary architectural blueprints to sacred Vastu spatial balancing, we deliver end-to-end luxury execution tailored for elite living.
          </p>
        </div>

        {/* Interactive 7 Sub-Sections Quick Nav Pill bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 no-scrollbar">
          {services.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveTab(idx);
                const el = document.getElementById(`service-card-${idx}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-card-antique text-foreground/80 hover:bg-primary/10 border border-card-border'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              {service.title}
            </button>
          ))}
        </div>

        {/* 7 Sub-sections Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isVastu = service.id === 'vastu';
            const isActive = activeTab === index;

            return (
              <div 
                id={`service-card-${index}`}
                key={service.id}
                onMouseEnter={() => setActiveTab(index)}
                onMouseMove={handleMouseMove}
                className={`bg-card-antique border group relative p-8 md:p-10 rounded-2xl flex flex-col justify-between transition-[border-color,box-shadow,transform] duration-500 overflow-hidden transform-gpu hover:-translate-y-2 ${
                  isVastu 
                    ? 'border-primary shadow-[0_10px_40px_rgba(184,131,46,0.15)] bg-gradient-to-br from-[#FAEBD7] via-[#FAF4EB] to-[#F5E3CE]' 
                    : isActive
                      ? 'border-primary/80 shadow-xl ring-2 ring-primary/20'
                      : 'border-card-border shadow-md hover:border-primary/50'
                }`}
              >
                {/* Mouse spotlight tracker glow — fine pointer only */}
                <div 
                  className="absolute inset-0 opacity-0 [@media(pointer:fine)]:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184, 131, 46, 0.12), transparent 80%)'
                  }}
                />

                <div>
                  {/* Number watermark */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-md ${
                      isVastu 
                        ? 'bg-primary text-white scale-110 shadow-primary/30' 
                        : 'bg-white/80 border border-card-border text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110'
                    }`}>
                      {service.icon}
                    </div>
                    <span className="font-display font-black text-4xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  {isVastu && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-extrabold tracking-widest uppercase mb-3 border border-primary/30">
                      ★ Newly Featured Specialty
                    </span>
                  )}

                  <h3 className="text-2xl font-display font-bold text-foreground mb-1 relative z-10">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 relative z-10">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground font-light text-sm leading-relaxed relative z-10 mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Sub-section Highlights List */}
                <div className="relative z-10 pt-6 border-t border-border/60">
                  <div className="space-y-2.5 mb-6">
                    {service.details.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-foreground/80">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:text-foreground transition-colors group/link"
                  >
                    <span>Consult on {service.title}</span>
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
                
                {/* Gold bottom border accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

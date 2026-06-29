import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Zap, Diamond, Clock, ThumbsUp } from 'lucide-react';
import { COMPANY_STATS } from '@/lib/company-stats';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Award size={32} />, title: "Certified Team", desc: "Expert engineers and designers with elite industry certifications and decades of combined experience." },
  { icon: <ShieldCheck size={32} />, title: "Transparent Pricing", desc: "No hidden costs. Complete financial clarity from day one with our detailed Bill of Quantities." },
  { icon: <Zap size={32} />, title: "Modern Designs", desc: "Cutting-edge architectural trends tailored to classic elegance, creating timeless spaces." },
  { icon: <Diamond size={32} />, title: "Quality Materials", desc: "Sourcing only premium grade ISI-certified materials for lasting durability and finish." },
  { icon: <Clock size={32} />, title: "Timely Delivery", desc: "Meticulous project management ensuring strict adherence to timelines without compromising quality." },
  { icon: <ThumbsUp size={32} />, title: "Customer Satisfaction", desc: `Our ${COMPANY_STATS.googleRating.toFixed(1)} Google rating reflects our unwavering commitment to our discerning clientele.` },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = listRef.current?.querySelectorAll('.feature-row');
      
      if (rows) {
        rows.forEach((row) => {
          const line = row.querySelector('.row-line');
          const content = row.querySelector('.row-content');
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            }
          });
          
          tl.fromTo(line, 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 1, ease: "power4.inOut" }
          ).fromTo(content,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 md:py-40 bg-[#0A0A0A] relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">The Difference</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-white leading-[1.1]">
              Why Choose Sahyadri
            </h2>
          </div>
          <p className="text-[#8A837A] font-light max-w-md">
            We operate at the intersection of structural integrity and artistic vision, delivering excellence without compromise.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col">
          {/* Top border for the first row */}
          <div className="w-full h-[1px] bg-white/10 origin-left"></div>

          {features.map((feat, i) => (
            <div key={i} className="feature-row relative group">
              <div className="row-content flex flex-col md:flex-row md:items-center py-12 gap-8 md:gap-16 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8">
                
                {/* Number */}
                <div className="text-primary/40 font-display font-black text-5xl md:text-6xl w-24 flex-shrink-0 group-hover:text-primary transition-colors duration-500">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                
                {/* Icon */}
                <div className="text-primary bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  {feat.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                  <h4 className="text-white font-display font-bold text-2xl md:w-1/3 text-left">
                    {feat.title}
                  </h4>
                  <p className="text-[#8A837A] text-lg font-light leading-relaxed md:w-2/3">
                    {feat.desc}
                  </p>
                </div>
              </div>
              
              {/* Bottom Line */}
              <div className="row-line absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-left"></div>
              {/* Active gold line on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

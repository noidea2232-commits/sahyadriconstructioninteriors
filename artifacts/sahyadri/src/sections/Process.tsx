import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Consultation", desc: "Understanding your vision, requirements, and lifestyle needs." },
  { num: "02", title: "Planning", desc: "Site analysis, feasibility studies, and conceptual budgeting." },
  { num: "03", title: "Design", desc: "Architectural blueprints, 3D renderings, and material selection." },
  { num: "04", title: "Construction", desc: "Foundation to finish, executed by our master craftsmen." },
  { num: "05", title: "Interior", desc: "Custom woodwork, premium finishes, and lighting installation." },
  { num: "06", title: "Delivery", desc: "Rigorous quality inspection and formal property handover." },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the line drawing down
      gsap.fromTo(lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );

      // Animate each step revealing
      const stepElements = stepsRef.current?.querySelectorAll('.process-step');
      if (stepElements) {
        stepElements.forEach((step, i) => {
          gsap.fromTo(step,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-24 md:py-32 bg-background relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-primary"></div>
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Methodology</span>
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
            The Building Process
          </h2>
        </div>

        <div className="relative" ref={stepsRef}>
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <div ref={lineRef} className="w-full bg-primary origin-top"></div>
          </div>

          <div className="flex flex-col gap-12 md:gap-0">
            {steps.map((step, i) => (
              <div key={i} className={`process-step relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} md:h-48 pl-16 md:pl-0`}>
                
                {/* Center Node */}
                <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_15px_rgba(200,169,106,0.5)]"></div>
                
                {/* Content Box */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <span className="text-primary/20 font-display text-5xl md:text-6xl font-black absolute -top-4 md:-top-8 -z-10 tracking-tighter select-none">
                    {step.num}
                  </span>
                  <h4 className="text-2xl font-display font-bold text-white mb-3 mt-1 md:mt-0">{step.title}</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

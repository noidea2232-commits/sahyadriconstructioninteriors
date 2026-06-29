import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "Do you handle both design and construction?", a: "Yes, we are a full-service firm. We offer turnkey solutions covering architecture, structural engineering, construction, and interior design to ensure a cohesive end result." },
  { q: "What is the typical timeline for a residential project?", a: "A luxury villa typically takes 12 to 18 months from design approval to final handover, depending on scale and intricacy of interior details." },
  { q: "How are project costs estimated and managed?", a: "We provide a highly detailed Bill of Quantities (BOQ) before construction begins. Our transparent pricing model means no hidden surprises, and any client-requested variations are formally approved before implementation." },
  { q: "Do you work with clients outside Shivamogga?", a: "While we are based in Shivamogga and undertake most projects locally, we do accept select premium projects across Karnataka." },
  { q: "What materials do you use?", a: "We source only premium, ISI-certified materials. From high-grade steel and cement to imported Italian marble and custom hardwoods, quality is never compromised." },
  { q: "Is there a warranty on your construction?", a: "Yes, we provide a structural warranty and post-handover maintenance support. We stand by the enduring quality of our craftsmanship." }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(items,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 md:py-40 bg-card" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Clarity</span>
            <div className="w-12 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="w-full flex flex-col gap-4" ref={listRef}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="faq-item bg-background border border-border relative overflow-hidden group cursor-pointer"
                onClick={() => toggle(i)}
              >
                {/* Animated Gold Left Border */}
                <motion.div 
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary origin-top"
                />

                <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                  <h3 className={`text-lg md:text-xl font-display font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-primary text-primary' : 'border-border text-foreground group-hover:border-primary group-hover:text-primary'}`}
                  >
                    <Plus size={16} />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-muted-foreground text-lg font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

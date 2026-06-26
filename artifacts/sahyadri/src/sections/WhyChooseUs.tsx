import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Zap, Diamond, Clock, ThumbsUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Award size={28} />, title: "Certified Team", desc: "Expert engineers and designers with elite industry certifications." },
  { icon: <ShieldCheck size={28} />, title: "Transparent Pricing", desc: "No hidden costs. Complete financial clarity from day one." },
  { icon: <Zap size={28} />, title: "Modern Designs", desc: "Cutting-edge architectural trends tailored to classic elegance." },
  { icon: <Diamond size={28} />, title: "Quality Materials", desc: "Sourcing only premium grade materials for lasting durability." },
  { icon: <Clock size={28} />, title: "Timely Delivery", desc: "Meticulous project management ensuring strict adherence to timelines." },
  { icon: <ThumbsUp size={28} />, title: "Customer Satisfaction", desc: "Our 4.99 Google rating reflects our unwavering commitment to clients." },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current!.children,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#080808] border-y border-white/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Why Sahyadri?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            We operate at the intersection of structural integrity and artistic vision.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 p-8 flex items-start gap-6 group hover:border-primary/30 transition-colors">
              <div className="text-primary mt-1 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-white font-display font-semibold text-lg mb-2">{feat.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

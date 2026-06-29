import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import { COMPANY_STATS } from '@/lib/company-stats';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: COMPANY_STATS.yearsExperience, suffix: "+", label: "Years of Excellence" },
  { value: COMPANY_STATS.projectsCompleted, suffix: "+", label: "Projects Completed" },
  { value: COMPANY_STATS.sqFtDeveloped, suffix: "k+", label: "Sq.Ft Developed" },
  { value: COMPANY_STATS.clientSatisfaction, suffix: "%", label: "Client Satisfaction" },
];

export function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section className="py-32 md:py-48 bg-[#0A0A0A] relative overflow-hidden" ref={sectionRef}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0zM29.627 0l.83.83-29.627 29.627-.83-.83L29.627 0zM59.17 29.627l.83.83-29.627 29.627-.83-.83L59.17 29.627z' fill='%23B8924A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 divide-x-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-4">
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-primary mb-4 flex items-center justify-center tabular-nums">
                <CountUp 
                  end={stat.value} 
                  duration={4} 
                  enableScrollSpy 
                  scrollSpyOnce 
                  formattingFn={(val) => {
                    // Gives it a slight slot-machine feel by making the numbers bounce before settling
                    return val.toString();
                  }}
                />
                <span className="text-3xl md:text-5xl ml-1 font-bold">{stat.suffix}</span>
              </div>
              <p className="text-white/70 uppercase tracking-widest text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

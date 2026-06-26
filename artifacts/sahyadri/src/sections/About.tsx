import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import aboutImg from '@assets/about-img.png';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current!.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(imgRef.current,
        { scale: 1.1, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
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
    <section id="about" className="py-24 md:py-32 relative bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <div ref={textRef} className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 text-white">
              Crafting Luxury Spaces Since 2010
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 font-light leading-relaxed">
              Based in Shivamogga, Sahyadri Construction & Interiors represents the pinnacle of architectural elegance and masterful execution. We don't just build structures; we curate environments that inspire.
            </p>
            
            <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
              Our uncompromising commitment to quality materials, innovative design, and transparent processes has made us the trusted choice for luxury residential and commercial projects across Karnataka.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2 flex items-baseline">
                  <CountUp end={10} duration={3} enableScrollSpy scrollSpyOnce />
                  <span className="text-xl ml-1">+</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2 flex items-baseline">
                  <CountUp end={250} duration={3} enableScrollSpy scrollSpyOnce />
                  <span className="text-xl ml-1">+</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2 flex items-baseline">
                  <CountUp end={500} duration={3} enableScrollSpy scrollSpyOnce />
                  <span className="text-xl ml-1">+</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          <div ref={imgRef} className="relative h-[500px] md:h-[700px] w-full group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
            <img 
              src={aboutImg} 
              alt="Luxury Interior Design" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary z-20 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary z-20 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

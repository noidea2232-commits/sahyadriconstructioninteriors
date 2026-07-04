import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import { ShieldCheck, Award, Building, UserCheck, Phone, MessageCircle } from 'lucide-react';
import aboutImg from '@assets/about-img.png';
import foundersPhoto from '@assets/founders-photo.png';
import { COMPANY_STATS } from '@/lib/company-stats';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const FOUNDER_DESCRIPTION =
  "Co-founding and jointly leading Sahyadri Construction & Interiors with shared vision and equal commitment — delivering engineering excellence, architectural innovation, and client-focused turnkey solutions across Karnataka's premier developments.";

const founders = [
  {
    name: "Sanjeeth S",
    role: "Founder & Managing Director",
    phone: "86608 00057",
    phoneClean: "+918660800057",
    whatsapp: "918660800057",
  },
  {
    name: "Arun G",
    role: "Founder & Managing Director",
    phone: "86600 17139",
    phoneClean: "+918660017139",
    whatsapp: "918660017139",
  }
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text from right
      gsap.fromTo(textRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          }
        }
      );

      // Clip-path horizontal wipe for image
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          }
        }
      );

      // Badge pop and rotate
      gsap.fromTo(badgeRef.current,
        { scale: 0, rotate: -45 },
        {
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          }
        }
      );

      // Founders card entrance
      if (foundersRef.current) {
        gsap.fromTo(foundersRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundersRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Corner gold lines outward animation
      const corners = sectionRef.current?.querySelectorAll('.corner-decor');
      if (corners) {
        gsap.fromTo(corners,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-28 md:py-40 relative bg-antique-gradient noise-bg overflow-hidden section-gpu" ref={sectionRef}>
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FAEBD7] rounded-full blur-3xl opacity-60 pointer-events-none will-change-auto" aria-hidden="true" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#F5DDBE] rounded-full blur-3xl opacity-40 pointer-events-none will-change-auto" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
          
          {/* Left Column: Image with Frame & Badge */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="relative h-[550px] md:h-[680px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/60">
              <div ref={imgRef} className="w-full h-full overflow-hidden relative">
                <img 
                  src={aboutImg} 
                  alt="Sahyadri Construction & Interiors Architecture" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              </div>
            </div>
            
            {/* Badge - EST. 2020 */}
            <div ref={badgeRef} className="absolute -bottom-8 -right-4 md:-right-8 w-36 h-36 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-2xl z-20 border-4 border-[#FDFBF7]">
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-[0.25em] opacity-90 font-semibold">COMPANY SINCE</span>
                <span className="block font-display font-black text-2xl tracking-tight text-white mt-0.5">{COMPANY_STATS.establishedYear}</span>
                <span className="block text-[9px] uppercase tracking-wider text-white/80 font-light mt-0.5">ESTABLISHED</span>
              </div>
            </div>

            {/* Corner Decorative Lines */}
            <div className="corner-decor absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary -translate-x-3 -translate-y-3"></div>
            <div className="corner-decor absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary -translate-x-3 translate-y-3"></div>
            <div className="corner-decor absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary translate-x-3 -translate-y-3"></div>
          </div>
          
          {/* Right Column: Copywriting & Editorial Content */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">About Sahyadri</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.12] font-display font-black mb-8 text-foreground">
              Mastering the Art of <span className="font-serif italic font-normal text-primary">Luxury Construction</span> & Bespoke Interiors
            </h2>
            
            <p className="text-foreground/90 text-lg md:text-xl mb-6 font-serif italic leading-relaxed border-l-2 border-primary/40 pl-6 py-1">
              "We synthesize architectural ambition with uncompromising engineering, redefining skyline standards across residential, commercial, and industrial domains."
            </p>
            
            <p className="text-muted-foreground text-base md:text-lg mb-10 font-light leading-relaxed">
              Established in <strong className="text-foreground font-semibold">{COMPANY_STATS.establishedYear}</strong>, <strong className="text-foreground font-semibold">Sahyadri Construction & Interiors</strong> brings <strong className="text-primary font-semibold">{COMPANY_STATS.yearsExperience}+ years of industry experience</strong> and <strong className="text-primary font-semibold">{COMPANY_STATS.projectsCompleted}+ completed projects</strong> across Karnataka's premier developments. We specialize in delivering end-to-end expert construction services—seamlessly blending visionary structural planning, meticulous project execution, and harmonious spatial design tailored for elite clientele.
            </p>

            {/* Key Service Domains */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-6 bg-card-antique rounded-xl border border-card-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground">Residential</h4>
                  <p className="text-xs text-muted-foreground">Luxury Homes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground">Commercial</h4>
                  <p className="text-xs text-muted-foreground">High-Impact Spaces</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-foreground">Industrial</h4>
                  <p className="text-xs text-muted-foreground">Robust Infrastructure</p>
                </div>
              </div>
            </div>

            {/* Statistics Counters */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-16 pt-8 border-t border-border/70">
              <div className="relative">
                <div className="text-5xl lg:text-6xl font-display font-black text-primary mb-2 flex items-baseline tracking-tight">
                  <CountUp end={COMPANY_STATS.yearsExperience} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span className="text-3xl ml-0.5 text-primary">+</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-foreground/80 font-bold">Years Experience</div>
              </div>
              
              <div className="hidden sm:block w-[1px] h-14 bg-border/80"></div>
              
              <div className="relative">
                <div className="text-5xl lg:text-6xl font-display font-black text-primary mb-2 flex items-baseline tracking-tight">
                  <CountUp end={COMPANY_STATS.projectsCompleted} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span className="text-3xl ml-0.5 text-primary">+</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-foreground/80 font-bold">Projects Completed</div>
              </div>

              <div className="hidden sm:block w-[1px] h-14 bg-border/80"></div>
              
              <div className="relative">
                <div className="text-5xl lg:text-6xl font-display font-black text-primary mb-2 flex items-baseline tracking-tight">
                  <span>{COMPANY_STATS.establishedYear}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-foreground/80 font-bold">Established Year</div>
              </div>
            </div>

          </div>

        </div>

        {/* Founders & Leadership Section */}
        <div className="pt-16 border-t border-border/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
              <UserCheck size={14} />
              Visionary Leadership
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Meet Our Founders & Managing Directors
            </h3>
            <p className="text-muted-foreground mt-3 font-light text-sm md:text-base">
              Equal partners in vision and leadership. Connect directly with either founder via Call or Business WhatsApp.
            </p>
          </div>

          {/* Founders layout: mobile = photo on top; desktop = cards left, photo right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Founder cards — left on desktop, below photo on mobile */}
            <div ref={foundersRef} className="order-2 lg:order-1 flex flex-col gap-8">
              {founders.map((founder, index) => (
                <div 
                  key={index}
                  className="bg-card-antique p-8 md:p-10 rounded-2xl border border-card-border shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-extrabold text-2xl mb-6 shadow-md">
                      {founder.name.charAt(0)}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-1">
                      {founder.name}
                    </h4>
                    <p className="text-xs uppercase tracking-widest font-extrabold text-primary mb-4">
                      {founder.role}
                    </p>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
                      {FOUNDER_DESCRIPTION}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                      Business Contact ({founder.phone}):
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={`tel:${founder.phoneClean}`}
                        className="px-4 py-2.5 bg-white/80 hover:bg-foreground hover:text-white text-foreground border border-card-border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 shadow-sm"
                      >
                        <Phone size={14} className="text-primary group-hover:text-white" />
                        <span>Call Now</span>
                      </a>
                      <a 
                        href={buildWhatsAppUrl(
                          whatsappMessages.founder(founder.name, founder.role),
                          founder.whatsapp,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 shadow-md"
                      >
                        <MessageCircle size={15} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Founders photo — right on desktop, first on mobile */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/60">
                <img
                  src={foundersPhoto}
                  alt="Sanjeeth S and Arun G — Founders & Managing Directors of Sahyadri Construction & Interiors"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div>
                  <p className="text-lg md:text-xl font-display font-extrabold text-foreground">Sanjeeth S</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary mt-1">Founder & Managing Director</p>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-display font-extrabold text-foreground">Arun G</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary mt-1">Founder & Managing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

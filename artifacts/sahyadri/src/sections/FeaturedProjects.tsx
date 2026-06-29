import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, IndianRupee, Tag, ArrowUpRight } from 'lucide-react';

import p1 from '@assets/project-1.png';
import p2 from '@assets/project-2.png';
import p3 from '@assets/project-3.png';
import p4 from '@assets/project-4.png';
import p5 from '@assets/project-5.png';
import p6 from '@assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: "Sahyadri Construction And Interiors: Premium Residential Construction Built to Last", 
    shortTitle: "Premium Residential Construction",
    category: "Residential Construction", 
    location: "Shimoga",
    budget: "₹1.5 Cr Budget",
    image: p1,
    desc: "Bespoke architectural villa built for generational durability with luxury marble finishes, custom acoustics, and automated climate systems."
  },
  { 
    id: 2, 
    title: "Sahyadri Construction And Interiors: Commercial Project Built at Shimoga", 
    shortTitle: "Commercial Hub Shimoga",
    category: "Commercial Project", 
    location: "Shimoga",
    budget: "₹1.0 Cr Budget",
    image: p2,
    desc: "State-of-the-art commercial business center engineered with high-durability curtain walls, modern elevators, and efficient workspace layouts."
  },
  { 
    id: 3, 
    title: "Sahyadri Construction And Interiors: Industrial Structures Built for Heavy-Duty Performance", 
    shortTitle: "Heavy-Duty Industrial Structure",
    category: "Industrial Construction", 
    location: "Shimoga, Thirthahalli Road",
    budget: "₹80 Lakh Budget",
    image: p5,
    desc: "Heavy-duty reinforced industrial warehouse and manufacturing plant built for structural strength, high-load capacities, and safety clearance."
  },
  { 
    id: 4, 
    title: "Sahyadri Construction And Interiors: Luxury Interior Project", 
    shortTitle: "Luxury Residence Interiors",
    category: "Interior Design", 
    location: "Shimoga",
    budget: "₹30 Lakh Budget",
    image: p3,
    desc: "Curated opulent interior environments featuring Italian marble highlights, custom joinery, teak woodwork, and ambient smart lighting."
  },
  { 
    id: 5, 
    title: "Sahyadri Construction And Interiors: Culinary & Living Architecture", 
    shortTitle: "Bespoke Kitchen & Living Space",
    category: "Turnkey Interiors", 
    location: "Shimoga",
    budget: "₹45 Lakh Budget",
    image: p4,
    desc: "Contemporary culinary haven and living room space designed with seamless ergonomics, quartz countertops, and concealed storage."
  },
  { 
    id: 6, 
    title: "Sahyadri Construction And Interiors: Executive Corporate Boardroom", 
    shortTitle: "Executive Suite Renovation",
    category: "Commercial Interior", 
    location: "Shimoga",
    budget: "₹25 Lakh Budget",
    image: p6,
    desc: "Executive boardroom and corporate suite featuring acoustic panelling, teak conference desks, and integrated audiovisual infrastructure."
  }
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = galleryRef.current?.querySelectorAll('.project-item');
      
      if (items) {
        gsap.fromTo(items,
          { clipPath: "inset(100% 0 0 0)", y: 50 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-28 md:py-40 bg-background noise-bg relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6 border-b border-border/60 pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">Landmark Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-foreground leading-[1.1]">
              Featured <span className="font-serif italic font-normal text-primary">Projects</span>
            </h2>
          </div>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b-2 border-primary text-foreground hover:text-primary transition-colors pb-1"
          >
            <span>Discuss Your Project Budget</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <button
              key={project.id}
              className={`project-item group cursor-pointer overflow-hidden bg-card-antique border border-card-border rounded-2xl text-left block w-full shadow-lg hover:shadow-2xl hover:border-primary/60 transition-all duration-500 transform hover:-translate-y-2 ${i === 1 || i === 4 ? 'md:mt-8' : ''}`}
              onClick={() => setActiveImage(project)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveImage(project); } }}
              aria-label={`View ${project.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Budget Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <IndianRupee size={12} />
                  <span>{project.budget.replace('Budget', '')}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {project.category}
                </div>
              </div>
              
              <div className="p-7">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
                  <MapPin size={14} className="shrink-0" />
                  <span>{project.location}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 font-light">
                  {project.desc}
                </p>

                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                  <span>View Full Specification</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 bg-[#FAEBD7] rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors shadow-2xl z-30"
              onClick={() => setActiveImage(null)}
              aria-label="Close project details"
            >
              <X size={22} strokeWidth={2} />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full sm:max-w-5xl h-[92dvh] sm:h-auto sm:max-h-[90dvh] flex flex-col md:flex-row bg-card-antique rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-card-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="w-full md:w-3/5 h-[38vh] sm:h-[42vh] md:h-auto md:min-h-[420px] shrink-0 relative bg-black/20">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Details — scrollable on mobile so CTA stays reachable */}
              <div className="flex flex-col flex-1 min-h-0 md:w-2/5">
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8 md:p-10">
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-2">
                    {activeImage.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-foreground mb-4 leading-tight">
                    {activeImage.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                      <MapPin size={14} />
                      {activeImage.location}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-extrabold shadow-md">
                      <Tag size={14} />
                      {activeImage.budget}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {activeImage.desc}
                  </p>

                  <p className="text-xs text-muted-foreground mt-6 sm:mt-8">
                    Interested in a similar construction or interior project in Shimoga?
                  </p>
                </div>

                {/* Sticky CTA — always visible on phone */}
                <div className="shrink-0 p-5 sm:p-8 md:p-10 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-border/60 bg-card-antique">
                  <a
                    href="https://wa.me/918660017139"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 sm:py-3.5 bg-primary text-white font-bold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-foreground transition-colors shadow-lg"
                  >
                    <span>Request Quotation via WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

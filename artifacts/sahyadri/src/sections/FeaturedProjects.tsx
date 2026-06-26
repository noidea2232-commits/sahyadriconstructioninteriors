import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

import p1 from '@assets/project-1.png';
import p2 from '@assets/project-2.png';
import p3 from '@assets/project-3.png';
import p4 from '@assets/project-4.png';
import p5 from '@assets/project-5.png';
import p6 from '@assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "The Onyx Villa", category: "Residential", image: p1 },
  { id: 2, title: "Nexus Corporate", category: "Commercial", image: p2 },
  { id: 3, title: "Aurora Master Suite", category: "Interior", image: p3 },
  { id: 4, title: "Culinary Haven", category: "Interior", image: p4 },
  { id: 5, title: "Cascade Estate", category: "Turnkey", image: p5 },
  { id: 6, title: "Zenith Boardroom", category: "Commercial", image: p6 },
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = galleryRef.current?.querySelectorAll('.project-item');
      
      if (items) {
        gsap.fromTo(items,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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

  return (
    <section id="projects" className="py-24 md:py-32 bg-background relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Featured Projects
            </h2>
          </div>
          <button className="text-sm font-medium tracking-widest uppercase border-b border-primary text-white hover:text-primary transition-colors pb-1">
            View All Work
          </button>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <button
              key={project.id}
              className={`project-item relative group cursor-pointer overflow-hidden bg-muted aspect-[4/5] text-left ${i === 1 || i === 4 ? 'md:mt-12' : ''}`}
              onClick={() => setActiveImage(project.image)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveImage(project.image); } }}
              aria-label={`View ${project.title} – ${project.category}`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </span>
                <h3 className="text-2xl font-display font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 flex justify-between items-center">
                  {project.title}
                  <ZoomIn className="text-white/50" />
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setActiveImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={activeImage}
              alt="Project full view"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

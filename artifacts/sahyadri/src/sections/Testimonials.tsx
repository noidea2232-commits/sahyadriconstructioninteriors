import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, MapPin, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rahul Deshpande",
    role: "Villa Owner",
    location: "Shivamogga",
    text: "Sahyadri Construction transformed our vision into reality. The attention to detail in the structural framework, teak woodwork, and Italian marble finishing is simply world-class. Every room reflects pure craftsmanship.",
    project: "Premium Villa Project",
    budget: "₹1.5 Cr",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Corporate Director",
    location: "Shimoga",
    text: "Delivered our flagship commercial business space exactly on schedule with zero compromises on structural integrity. Highly professional leadership, transparent billing, and extraordinary execution.",
    project: "Commercial Hub",
    budget: "₹1.0 Cr",
    rating: 5,
  },
  {
    name: "Anand Gowda",
    role: "Industrial Developer",
    location: "Thirthahalli Road, Shimoga",
    text: "From ground excavation to heavy-duty structural steel deployment, Sanjeeth & Arun's engineering team executed our industrial project with perfection. Reliable and built to last.",
    project: "Heavy-Duty Structure",
    budget: "₹80 Lakh",
    rating: 5,
  },
  {
    name: "Sneha Patil",
    role: "Homeowner",
    location: "Shivamogga",
    text: "We wanted a breathtaking luxury feel for our interior renovation. Sahyadri delivered beyond our expectations — custom cabinetry, ambient lighting, and bespoke spatial planning brought our home to life.",
    project: "Luxury Residence Interior",
    budget: "₹30 Lakh",
    rating: 5,
  },
  {
    name: "Karthik Reddy",
    role: "Turnkey Client",
    location: "Shivamogga",
    text: "Trust is rare in construction, but Sahyadri proved to be completely dependable. Their turnkey service was seamless. I didn't have to worry about a single material or site hassle — truly priceless peace of mind.",
    project: "Turnkey Residence",
    budget: "₹65 Lakh",
    rating: 5,
  },
];


export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 7000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 md:py-40 bg-antique-gradient noise-bg relative overflow-hidden section-gpu"
      aria-label="Client reviews and testimonials"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FAEBD7] rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5E3CE] rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-border/60 pb-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-primary" />
                <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">
                  Client Endorsements
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-foreground leading-[1.1]">
                Voices of <span className="font-serif italic font-normal text-primary">Satisfaction</span>
              </h2>
            </div>

            {/* Aggregate rating badge */}
            <div className="flex items-center gap-5 bg-card-antique border border-card-border rounded-2xl px-6 py-4 shadow-md">
              <div className="text-center">
                <div className="text-4xl font-display font-black text-primary leading-none">5.0</div>
                <div className="flex items-center gap-0.5 mt-1.5 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <div className="w-px h-12 bg-border/80" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                  {reviews.length} Verified Reviews
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 font-light">
                  Shivamogga &amp; Karnataka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] min-w-0 px-1"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review ${idx + 1} of ${reviews.length}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    {/* Main quote card */}
                    <article className="lg:col-span-7 bg-card-antique rounded-3xl border border-card-border shadow-xl relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                      <div className="p-8 md:p-12 lg:p-14 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-8 gap-4">
                          <Quote size={48} className="text-primary/20 shrink-0" aria-hidden="true" />
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                            <CheckCircle size={12} />
                            Verified Client
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-6">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={16} className="fill-primary text-primary" />
                          ))}
                        </div>

                        <blockquote className="font-serif italic text-xl md:text-2xl lg:text-[1.75rem] text-foreground/95 leading-relaxed flex-1 mb-10">
                          &ldquo;{review.text}&rdquo;
                        </blockquote>

                        <footer className="flex items-center gap-4 pt-6 border-t border-border/60">
                          <div
                            className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-black text-xl shadow-md shrink-0"
                            aria-hidden="true"
                          >
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <cite className="not-italic text-lg md:text-xl font-display font-extrabold text-foreground leading-snug block">
                              {review.name}
                            </cite>
                            <p className="text-xs uppercase tracking-wider font-bold text-primary mt-0.5">
                              {review.role} &bull; {review.location}
                            </p>
                          </div>
                        </footer>
                      </div>
                    </article>

                    {/* Project details sidebar */}
                    <aside className="lg:col-span-5 bg-gradient-to-br from-[#FAF4EB] via-[#FAEBD7] to-[#F5E3CE] rounded-3xl border border-primary/25 shadow-lg p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full pointer-events-none" aria-hidden="true" />

                      <div>
                        <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-4">
                          <Briefcase size={12} />
                          Featured Case Study
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-5 leading-tight">
                          {review.project}
                        </h3>
                        <div className="w-14 h-1 bg-primary mb-8 rounded-full" />

                        <dl className="space-y-4 text-sm">
                          <div className="flex justify-between items-center py-3 border-b border-border/50">
                            <dt className="text-muted-foreground flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              Location
                            </dt>
                            <dd className="font-bold text-foreground text-right">{review.location}</dd>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-border/50">
                            <dt className="text-muted-foreground">Investment</dt>
                            <dd className="font-bold text-primary">{review.budget}</dd>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-border/50">
                            <dt className="text-muted-foreground">Client Status</dt>
                            <dd className="font-bold text-foreground">100% Satisfied</dd>
                          </div>
                        </dl>
                      </div>

                      <a
                        href="#contact"
                        className="mt-8 w-full py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-foreground transition-colors duration-300 shadow-md block"
                      >
                        Start Your Own Project
                      </a>
                    </aside>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
            <div className="flex items-center gap-3">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === idx ? 'w-10 bg-primary' : 'w-2 bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                  aria-current={selectedIndex === idx ? 'true' : undefined}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-card-border bg-card-antique flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-card-border bg-card-antique flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Review preview strip — desktop */}
        <div className="hidden md:grid grid-cols-5 gap-3 mt-14">
          {reviews.map((review, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                selectedIndex === idx
                  ? 'bg-primary/10 border-primary shadow-md scale-[1.02]'
                  : 'bg-card-antique border-card-border hover:border-primary/40'
              }`}
              aria-label={`View review from ${review.name}`}
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={10} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-[11px] font-display font-bold text-foreground truncate">{review.name}</p>
              <p className="text-[10px] text-muted-foreground truncate mt-0.5">{review.project}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

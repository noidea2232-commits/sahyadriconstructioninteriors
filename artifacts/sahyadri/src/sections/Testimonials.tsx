import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: "Rahul Deshpande", role: "Villa Owner", text: "Sahyadri Construction transformed our vision into reality. The attention to detail in the woodwork and marble finishing is simply world-class." },
  { name: "Priya Sharma", role: "Corporate Client", text: "Delivered our 10,000 sq ft office space exactly on schedule. Highly professional team, transparent billing, and zero compromises on quality." },
  { name: "Anand Gowda", role: "Homeowner", text: "From the first 3D render to the final handover, the process was seamless. The aesthetic they brought to our interior design is breathtaking." },
  { name: "Sneha Patil", role: "Boutique Owner", text: "We wanted a luxurious feel for our new store in Shivamogga. Sahyadri delivered beyond our expectations with their premium lighting and glasswork." },
  { name: "Karthik Reddy", role: "Residential Client", text: "Trust is hard to find in construction, but Sahyadri proved to be completely reliable. Their turnkey solution meant I didn't have to stress about a single detail." }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
            Client <br/><span className="text-white/40 italic font-serif">Perspectives</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-md">
            Don't just take our word for it. Hear what our esteemed clients have to say about the Sahyadri experience.
          </p>
        </div>

        <div className="relative">
          {/* Decorative quote mark */}
          <div className="absolute -top-10 -left-10 text-9xl text-white/5 font-serif leading-none select-none z-0">"</div>
          
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full glass-panel p-10 relative z-10"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-primary fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 italic">
                    "{review.text}"
                  </p>
                  <div className="mt-auto border-t border-white/10 pt-6">
                    <h4 className="text-white font-display font-bold uppercase tracking-wider">{review.name}</h4>
                    <span className="text-primary text-sm">{review.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

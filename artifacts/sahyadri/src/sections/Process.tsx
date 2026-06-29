import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, FileText, Compass, HardHat, Palette, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Consultation", desc: "Understanding your vision, requirements, and lifestyle needs in deep detail.", icon: <MessageSquare size={24} /> },
  { num: "02", title: "Planning", desc: "Rigorous site analysis, feasibility studies, and conceptual budgeting.", icon: <FileText size={24} /> },
  { num: "03", title: "Design", desc: "Masterful architectural blueprints, 3D renderings, and material curation.", icon: <Compass size={24} /> },
  { num: "04", title: "Construction", desc: "Foundation to finish, executed flawlessly by our elite craftsmen.", icon: <HardHat size={24} /> },
  { num: "05", title: "Interior", desc: "Bespoke custom woodwork, premium finishes, and luxury lighting.", icon: <Palette size={24} /> },
  { num: "06", title: "Handover", desc: "Rigorous quality inspection and formal white-glove property delivery.", icon: <CheckCircle2 size={24} /> },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const setStepState = useCallback((index: number) => {
    setActiveStep(index);
    const stepEls = stepsRef.current?.querySelectorAll('.process-step');
    stepEls?.forEach((step, i) => {
      step.classList.toggle('is-complete', i < index);
      step.classList.toggle('is-active', i === index);
      step.classList.toggle('is-lit', i <= index);
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray<HTMLElement>('.process-step', stepsRef.current);
      const progress = progressRef.current;
      const rail = railRef.current;

      if (!stepEls.length || !progress || !rail || !stepsRef.current) return;

      const syncProgressLine = () => {
        const height = rail.offsetHeight;
        const scale = progress.dataset.scale ? Number(progress.dataset.scale) : 0;
        gsap.set(progress, { height, scaleY: scale });
      };

      syncProgressLine();

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.dataset.scale = String(self.progress);
          gsap.set(progress, { scaleY: self.progress });
        },
      });

      stepEls.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 72%',
          end: 'bottom 28%',
          onEnter: () => setStepState(index),
          onEnterBack: () => setStepState(index),
        });
      });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 85%',
        onEnter: () => setStepState(0),
        once: true,
      });

      const onResize = () => {
        syncProgressLine();
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      return () => window.removeEventListener('resize', onResize);
    }, sectionRef);

    return () => ctx.revert();
  }, [setStepState]);

  return (
    <section
      id="process"
      className="bg-antique-gradient noise-bg relative overflow-hidden section-gpu py-20 sm:py-24 md:py-32 lg:py-40"
      ref={sectionRef}
    >
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#FAEBD7] rounded-full blur-3xl opacity-40 pointer-events-none max-lg:hidden" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#F5E3CE] rounded-full blur-3xl opacity-30 pointer-events-none max-lg:hidden" aria-hidden="true" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #B8832E 0, #B8832E 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.5rem] font-display font-black text-foreground leading-[1.08] mb-5 sm:mb-6">
              Our Blueprint <br className="hidden sm:block" />
              For <span className="font-serif italic font-normal text-primary">Excellence</span>
            </h2>
            <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              A meticulous six-step journey from initial concept to the final white-glove handover of your luxury space.
            </p>

            <div className="hidden lg:flex flex-col gap-2">
              {steps.map((step, i) => (
                <span
                  key={step.num}
                  className={`process-pill inline-flex items-center gap-2 px-3 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
                    activeStep === i
                      ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(184,131,46,0.45)] scale-[1.02]'
                      : activeStep > i
                        ? 'bg-primary/15 text-primary border-primary/40'
                        : 'bg-primary/5 text-primary/50 border-primary/15'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] transition-colors duration-500 ${
                      activeStep >= i ? 'bg-primary/25 text-primary' : 'bg-primary/10 text-primary/40'
                    } ${activeStep === i ? '!bg-white/25 !text-white' : ''}`}
                  >
                    {step.num}
                  </span>
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-8 relative">
            <div ref={stepsRef} className="relative flex flex-col gap-0">
              {/* Background progress rail */}
              <div
                ref={railRef}
                className="absolute left-[22px] sm:left-[26px] md:left-[30px] top-7 bottom-7 w-[2px] pointer-events-none"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-border/80 rounded-full" />
                <div
                  ref={progressRef}
                  className="process-progress-line absolute inset-0 bg-primary rounded-full origin-top scale-y-0"
                />
              </div>

              {steps.map((step, i) => {
                const stepIndex = i;
                const isLit = activeStep >= stepIndex;
                const isActive = activeStep === stepIndex;

                return (
                  <article
                    key={step.num}
                    className={`process-step group relative flex gap-4 sm:gap-6 md:gap-8 ${i < steps.length - 1 ? 'pb-6 sm:pb-8 md:pb-10' : ''}`}
                  >
                    {/* Node + connector */}
                    <div className="relative z-10 shrink-0 flex flex-col items-center w-11 sm:w-12 md:w-14">
                      <div
                        className={`process-node relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-display font-black text-xs sm:text-sm border-2 transition-all duration-500 ${
                          isLit
                            ? 'bg-primary border-primary text-white shadow-[0_0_24px_rgba(184,131,46,0.55)]'
                            : 'bg-[#FAF4EB] border-card-border text-muted-foreground'
                        } ${isActive ? 'scale-110 ring-4 ring-primary/25' : ''}`}
                      >
                        {step.num}
                        {isActive && (
                          <span className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping pointer-events-none" aria-hidden="true" />
                        )}
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`process-connector w-[2px] flex-1 min-h-[24px] sm:min-h-[32px] mt-2 rounded-full transition-all duration-700 ${
                            activeStep > i
                              ? 'bg-primary shadow-[0_0_10px_rgba(184,131,46,0.5)]'
                              : 'bg-border/70'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div
                        className={`bg-card-antique p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border shadow-lg transition-all duration-500 relative overflow-hidden ${
                          isLit
                            ? 'border-primary/40 shadow-[0_12px_40px_rgba(184,131,46,0.12)]'
                            : 'border-card-border'
                        } ${isActive ? 'border-primary shadow-[0_16px_50px_rgba(184,131,46,0.2)]' : ''}`}
                      >
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : isLit ? 'opacity-50' : 'opacity-0'
                          }`}
                        />

                        <span
                          className="absolute -bottom-2 -right-1 font-display font-black text-[4rem] sm:text-[5rem] text-primary/[0.04] select-none pointer-events-none leading-none"
                          aria-hidden="true"
                        >
                          {step.num}
                        </span>

                        <div className="flex items-start justify-between gap-4 mb-4 sm:mb-5 relative z-10">
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shadow-sm transition-all duration-500 ${
                              isLit ? 'bg-primary text-white border-primary' : 'bg-white/80 border-card-border text-primary'
                            }`}
                          >
                            {step.icon}
                          </div>
                          <span
                            className={`font-display text-4xl sm:text-5xl font-black select-none leading-none transition-colors duration-500 ${
                              isLit ? 'text-primary/50' : 'text-primary/20'
                            }`}
                          >
                            {step.num}
                          </span>
                        </div>

                        <h4
                          className={`text-xl sm:text-2xl md:text-3xl font-display font-extrabold mb-2 sm:mb-3 relative z-10 transition-colors duration-500 ${
                            isLit ? 'text-foreground' : 'text-foreground/70'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed relative z-10">
                          {step.desc}
                        </p>

                        <div className="mt-5 sm:mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-primary">
                          <span>Step {step.num} of 06</span>
                          <span className="uppercase tracking-wider">Sahyadri Standard</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

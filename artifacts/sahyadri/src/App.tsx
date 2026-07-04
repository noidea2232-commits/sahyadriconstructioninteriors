import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll } from 'framer-motion';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { FloatingButtons } from './components/FloatingButtons';
import { ImageSequence } from './components/ImageSequence';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { Process } from './sections/Process';
import { Statistics } from './sections/Statistics';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { scrollYProgress } = useScroll();
  const [isLoaderActive, setIsLoaderActive] = useState(() => {
    return !sessionStorage.getItem('loader-played');
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;
    const useLenis = !prefersReducedMotion && prefersFinePointer && window.innerWidth >= 1024;

    if (!useLenis) {
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener('scroll', onScroll, { passive: true });
      ScrollTrigger.refresh();

      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        <CustomCursor />
        {isLoaderActive && (
          <Loader 
            onComplete={() => {
              setIsLoaderActive(false);
              sessionStorage.setItem('loader-played', 'true');
              requestAnimationFrame(() => ScrollTrigger.refresh(true));
            }} 
          />
        )}
        <Navbar />
        
        <main>
          <Hero />
          <ImageSequence />
          <About />
          <Services />
          <FeaturedProjects />
          <WhyChooseUs />
          <Process />
          <Statistics />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        
        <Footer />
        <FloatingButtons />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import logo from '@assets/WhatsApp_Image_2026-06-20_at_9.58.59_PM_(1)_1782412603975.jpeg';

import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { FloatingButtons } from './components/FloatingButtons';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { Process } from './sections/Process';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Store reference so we can remove the exact same function on cleanup
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen text-foreground font-sans overflow-x-hidden">
        <CustomCursor />
        <Loader />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Services />
          <FeaturedProjects />
          <WhyChooseUs />
          <Process />
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

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@assets/sahyadri-logo-new.png';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Process', href: '#process' },
  { name: 'Testimonials', href: '#testimonials' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('loader-played')) {
      setShouldAnimate(true);
      return () => {};
    } else {
      const handleStart = () => {
        setShouldAnimate(true);
      };
      document.addEventListener('start-hero-animation', handleStart);
      return () => {
        document.removeEventListener('start-hero-animation', handleStart);
      };
    }
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_rgba(184,146,74,0.05)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary transition-colors duration-300">
              <img src={logo} alt="Sahyadri Logo" className="w-full h-full object-contain bg-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">SAHYADRI</span>
              <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase hidden md:block">Construction & Interiors</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-foreground hover:text-primary uppercase tracking-tight relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => scrollTo(e, '#contact')}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-center md:hidden border-l border-primary/20 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="font-display text-2xl font-bold tracking-widest text-foreground hover:text-primary uppercase w-full text-center py-2 border-b border-border"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + links.length * 0.1, duration: 0.4 }}
                className="mt-8 w-full text-center px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

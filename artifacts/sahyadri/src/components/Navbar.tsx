import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@assets/WhatsApp_Image_2026-06-20_at_9.58.59_PM_(1)_1782412603975.jpeg';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Process', href: '#process' },
  { name: 'Testimonials', href: '#testimonials' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 ${
          isScrolled 
            ? 'py-4 bg-[#080808]/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
              <img src={logo} alt="Sahyadri Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-wide text-white group-hover:text-primary transition-colors duration-300 leading-tight">SAHYADRI</span>
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
                className="text-sm font-medium text-white/80 hover:text-white uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => scrollTo(e, '#contact')}
              className="px-6 py-2.5 border border-primary text-primary font-medium text-sm tracking-widest uppercase hover:bg-primary hover:text-background transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-primary transition-colors"
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#080808]/95 flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="font-display text-2xl font-bold tracking-widest text-white hover:text-primary uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1, duration: 0.4 }}
                className="mt-4 px-8 py-3 border border-primary text-primary font-medium text-sm tracking-widest uppercase"
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

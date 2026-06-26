import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/WhatsApp_Image_2026-06-20_at_9.58.59_PM_(1)_1782412603975.jpeg';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background noise-bg"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-8 border border-white/10"
            >
              <img src={logo} alt="Sahyadri Logo" className="w-full h-full object-cover" />
              
              {/* Gold light sweep effect */}
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent skew-x-12"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-primary tracking-[0.2em] font-display text-sm md:text-base uppercase"
            >
              CRAFTING LUXURY
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

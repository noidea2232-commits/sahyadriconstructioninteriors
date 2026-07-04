import logo from '@assets/sahyadri-logo-new.png';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-10 relative overflow-hidden text-white">
      {/* Decorative large logo watermark */}
      <div className="absolute -bottom-40 -right-20 text-[20rem] font-display font-black text-white/[0.02] tracking-tighter pointer-events-none select-none">
        SAHYADRI
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-primary/30 mb-8">
            <img src={logo} alt="Sahyadri Logo" className="w-full h-full object-contain bg-black" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-widest mb-3 text-center uppercase">Sahyadri</h2>
          <p className="text-primary text-xs tracking-[0.4em] uppercase font-bold">Construction & Interiors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16 pb-16 border-b border-white/10">
          
          <div>
            <h4 className="text-white font-display font-bold mb-8 tracking-widest uppercase text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">About Firm</a></li>
              <li><a href="#projects" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Portfolio</a></li>
              <li><a href="#process" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Methodology</a></li>
              <li><a href="#contact" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-8 tracking-widest uppercase text-sm">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Residential Build</a></li>
              <li><a href="#services" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Commercial Space</a></li>
              <li><a href="#services" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Interior Design</a></li>
              <li><a href="#services" className="text-[#8A837A] hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Turnkey Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-8 tracking-widest uppercase text-sm">Connect</h4>
            <ul className="space-y-4">
              <li className="text-[#8A837A] uppercase tracking-widest text-xs font-bold">+91 86600 17139</li>
              <li className="text-[#8A837A] uppercase tracking-widest text-xs font-bold">sahyadriconstructioninterior.in@gmail.com</li>
              <li className="text-[#8A837A] uppercase tracking-widest text-xs font-bold">Shivamogga, Karnataka</li>
            </ul>
            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a href="https://www.instagram.com/sahyadri_construction_interior/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:bg-primary hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/918660017139" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:bg-primary hover:text-black transition-all">
                <MessageCircle size={20} />
              </a>
              <a href="mailto:sahyadriconstructioninterior.in@gmail.com" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:bg-primary hover:text-black transition-all">

                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 tracking-widest uppercase font-bold">
          <p>&copy; {new Date().getFullYear()} Sahyadri Construction & Interiors. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
        
        {/* Final Gold Line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"></div>
      </div>
    </footer>
  );
}

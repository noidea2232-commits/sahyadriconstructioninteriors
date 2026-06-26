import logo from '@assets/WhatsApp_Image_2026-06-20_at_9.58.59_PM_(1)_1782412603975.jpeg';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative large logo watermark */}
      <div className="absolute -bottom-40 -right-20 text-[20rem] font-display font-black text-white/[0.02] tracking-tighter pointer-events-none select-none">
        SAHYADRI
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary mb-6">
            <img src={logo} alt="Sahyadri Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest mb-2 text-center uppercase">Sahyadri</h2>
          <p className="text-primary text-sm tracking-[0.3em] uppercase">Construction & Interiors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16 pb-16 border-b border-white/10">
          
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-widest uppercase text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Firm</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Methodology</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-widest uppercase text-sm">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Residential Build</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Commercial Space</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Interior Design</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Turnkey Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-widest uppercase text-sm">Connect</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground">+91 8660017139</li>
              <li className="text-muted-foreground">Shivamogga, Karnataka</li>
            </ul>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/60 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Sahyadri Construction & Interiors. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

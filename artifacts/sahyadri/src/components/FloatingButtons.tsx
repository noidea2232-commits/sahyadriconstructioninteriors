import { MessageCircle, Phone, Instagram } from 'lucide-react';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
      {/* Instagram Button */}
      <a 
        href="https://www.instagram.com/sahyadri_construction_interior/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-[#FAEBD7] border-2 border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl group relative transform hover:scale-110"
        aria-label="Instagram"
      >
        <Instagram size={24} className="group-hover:rotate-6 transition-transform" />
        <span className="absolute right-full mr-4 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wider uppercase shadow-md">
          Follow Instagram
        </span>
      </a>

      {/* WhatsApp Button */}
      <a 
        href={buildWhatsAppUrl(whatsappMessages.floating())} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-[#FAEBD7] border-2 border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl group relative transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-4 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wider uppercase shadow-md">
          WhatsApp: 086600 17139
        </span>
      </a>

      {/* Call Button */}
      <a 
        href="tel:+918660017139" 
        className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white border-2 border-white rounded-full flex items-center justify-center hover:bg-foreground transition-all duration-300 shadow-2xl group relative transform hover:scale-110 animate-bounce"
        aria-label="Call Us"
      >
        <Phone size={24} className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-4 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wider uppercase shadow-md">
          Call: 086600 17139
        </span>
      </a>
    </div>
  );
}

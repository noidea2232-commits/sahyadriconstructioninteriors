import { MessageCircle, Phone } from 'lucide-react';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Call Button */}
      <a 
        href="tel:+918660017139" 
        className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg group relative"
        aria-label="Call Us"
      >
        <Phone size={24} className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          Call Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/918660017139" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.4)] group relative"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}

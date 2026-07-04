import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Instagram, Clock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppUrl, whatsappMessages, WHATSAPP_NUMBER } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.8456!2d75.5386454!3d13.9394432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba902c6cccb99%3A0xbf47b03b786d4f47!2sSahyadri%20Construction%20And%20Interiors!5e0!3m2!1sen!2sin!4v1719667200000!5m2!1sen!2sin";

const MAPS_LINK =
  "https://www.google.com/maps/place/Sahyadri+Construction+And+Interiors/@13.9395003,75.5365397,17.18z/data=!4m6!3m5!1s0x3bbba902c6cccb99:0xbf47b03b786d4f47!8m2!3d13.9394432!4d75.5412375!16s%2Fg%2F11vjmnc6vr";

const SERVICE_OPTIONS = [
  { value: "residential", label: "Residential Build" },
  { value: "commercial", label: "Commercial Space" },
  { value: "interior", label: "Interior Design" },
  { value: "renovation", label: "Renovation & Upgrades" },
  { value: "architecture", label: "Architectural Planning" },
  { value: "turnkey", label: "Turnkey Solutions" },
  { value: "vastu", label: "Vastu Consultant" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { toast } = useToast();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const serviceLabel =
      SERVICE_OPTIONS.find((opt) => opt.value === values.service)?.label ?? values.service;

    const whatsappUrl = buildWhatsAppUrl(
      whatsappMessages.contactInquiry({
        name: values.name,
        phone: values.phone,
        email: values.email,
        serviceLabel,
        message: values.message,
      }),
      WHATSAPP_NUMBER,
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Opening WhatsApp",
      description: "Your inquiry details are ready to send.",
      className: "bg-primary text-primary-foreground border-none",
    });
    form.reset();
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const text = headingRef.current.innerText;
        headingRef.current.innerHTML = '';
        
        text.split(' ').forEach((word) => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          span.style.verticalAlign = 'top';
          span.style.marginRight = '0.3em';
          
          const innerSpan = document.createElement('span');
          innerSpan.innerText = word;
          innerSpan.style.display = 'inline-block';
          
          if (word === "GREAT") {
            innerSpan.classList.add('text-primary');
          }
          
          span.appendChild(innerSpan);
          headingRef.current?.appendChild(span);
        });

        const wordSpans = headingRef.current.querySelectorAll('span > span');
        gsap.set(wordSpans, { yPercent: 100 });
        
        gsap.to(wordSpans, {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        });
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-28 md:py-40 bg-background noise-bg relative border-t border-border section-gpu" aria-label="Contact us">
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#FAEBD7] rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5E3CE] rounded-full blur-3xl opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-primary" />
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">Get in Touch</span>
            <div className="w-12 h-[2px] bg-primary" />
          </div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl md:text-[6vw] font-display font-extrabold text-foreground leading-[0.95] tracking-tighter uppercase">
            Let's Build Something GREAT
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Share your project vision — we'll connect with you on WhatsApp for luxury construction, bespoke interiors, and Vastu consultation across Shivamogga and Karnataka.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Form Side */}
          <div className="bg-card-antique border border-card-border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Inquire</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              Start Your Project
            </h3>
            <p className="text-muted-foreground text-sm font-light mb-8">
              Tell us about your vision — residential, commercial, interior, renovation, or Vastu.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            autoComplete="name"
                            {...field} 
                            className="bg-transparent border-0 border-b border-border text-foreground focus-visible:border-primary focus-visible:ring-0 rounded-none px-0 h-10 text-base md:text-lg shadow-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+91 XXXXX XXXXX" 
                            type="tel"
                            autoComplete="tel"
                            {...field} 
                            className="bg-transparent border-0 border-b border-border text-foreground focus-visible:border-primary focus-visible:ring-0 rounded-none px-0 h-10 text-base md:text-lg shadow-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            type="email"
                            autoComplete="email"
                            {...field} 
                            className="bg-transparent border-0 border-b border-border text-foreground focus-visible:border-primary focus-visible:ring-0 rounded-none px-0 h-10 text-base md:text-lg shadow-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Service</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-0 border-b border-border text-foreground focus:ring-0 focus:ring-offset-0 focus:border-primary rounded-none px-0 h-10 text-base md:text-lg shadow-none w-full">
                              <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border text-foreground rounded-none max-h-60">
                            {SERVICE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your vision, location, and timeline..." 
                          className="bg-transparent border-0 border-b border-border text-foreground focus-visible:border-primary focus-visible:ring-0 rounded-none px-0 min-h-[100px] resize-none text-base md:text-lg shadow-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="submit" className="w-full py-4 md:py-5 bg-primary text-primary-foreground font-bold tracking-widest uppercase hover:bg-foreground transition-colors duration-300 mt-2 rounded-xl shadow-md">
                  Send Inquiry via WhatsApp
                </button>
              </form>
            </Form>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-6">
            <div className="bg-card-antique border border-card-border rounded-2xl p-8 md:p-10 shadow-lg flex-1">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Contact Details</h3>
              
              <div className="space-y-7">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-2">Head Office</h4>
                    <address className="not-italic text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                      Vismaya Complex, Good Luck Circle,<br/>
                      Lagan Mandir Road, Gadikoppa,<br/>
                      Shivamogga, Karnataka 577205
                    </address>
                    <a
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-foreground transition-colors mt-3 uppercase tracking-wider"
                    >
                      <ExternalLink size={12} />
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-2">Business Hours</h4>
                    <p className="text-muted-foreground font-light text-sm">
                      Mon – Sat: 9:00 AM – 7:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md"
                    style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                  >
                    <Instagram size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-2">Follow Us</h4>
                    <a
                      href="https://www.instagram.com/sahyadri_construction_interior/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground font-light hover:text-primary transition-colors text-sm"
                    >
                      @sahyadri_construction_interior
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/70">
                <div className="flex items-center gap-3 mb-1">
                  <Star className="text-primary fill-primary" size={22} />
                  <span className="text-foreground text-2xl md:text-3xl font-display font-bold">5.0</span>
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold ml-1">Google Rating</span>
                </div>
                <p className="text-xs text-muted-foreground font-light">Based on verified client reviews across Shivamogga</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="h-52 sm:h-56 md:h-64 w-full bg-muted relative overflow-hidden rounded-2xl border border-card-border shadow-lg group">
              <iframe 
                title="Sahyadri Construction And Interiors — Shivamogga location on Google Maps"
                src={MAPS_EMBED_URL}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg shadow-lg hover:bg-foreground transition-colors flex items-center gap-1.5 z-10"
              >
                <MapPin size={12} />
                View on Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

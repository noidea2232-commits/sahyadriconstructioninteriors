import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { toast } = useToast();
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
    console.log(values);
    toast({
      title: "Request Received",
      description: "We will contact you shortly to discuss your project.",
      className: "bg-primary text-primary-foreground border-none",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form Side */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Inquire</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-8">
              Start Your Project
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-transparent border-white/10 text-white focus-visible:border-primary rounded-none h-12" />
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
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-transparent border-white/10 text-white focus-visible:border-primary rounded-none h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-transparent border-white/10 text-white focus-visible:border-primary rounded-none h-12" />
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
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs">Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-white/10 text-white focus:ring-0 focus:ring-offset-0 focus:border-primary rounded-none h-12">
                              <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#111111] border-white/10 text-white rounded-none">
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="interior">Interior Design</SelectItem>
                            <SelectItem value="turnkey">Turnkey Project</SelectItem>
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
                      <FormLabel className="text-white/70 uppercase tracking-widest text-xs">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your vision..." 
                          className="bg-transparent border-white/10 text-white focus-visible:border-primary rounded-none min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="submit" className="w-full py-4 bg-primary text-background font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300">
                  Submit Inquiry
                </button>
              </form>
            </Form>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-between h-full bg-[#111111] p-10 border border-white/5">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-medium mb-1">Head Office</h5>
                    <p className="text-muted-foreground font-light">
                      Vismaya Complex, Good Luck Circle,<br/>
                      Lagan Mandir Road, Gadikoppa,<br/>
                      Shivamogga, Karnataka 577205
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-medium mb-1">Direct Line</h5>
                    <a href="tel:+918660017139" className="text-muted-foreground font-light hover:text-primary transition-colors">
                      +91 8660017139
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-primary fill-primary" size={20} />
                <span className="text-white text-xl font-bold">4.99</span>
                <span className="text-muted-foreground ml-2">Google Rating</span>
              </div>
              <p className="text-sm text-muted-foreground">Based on verified client reviews</p>
            </div>
            
            {/* Map Placeholder/Iframe could go here */}
            <div className="mt-8 h-48 w-full bg-white/5 relative overflow-hidden group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.606346296715!2d75.5487771!3d13.9352932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba9b7b9f8b441%3A0x6b44ab5305141ef1!2sGadikoppa%2C%20Shivamogga%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(100%) opacity(0.8)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 group-hover:filter-none transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

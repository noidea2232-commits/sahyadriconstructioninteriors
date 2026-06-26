import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you handle both design and construction?", a: "Yes, we are a full-service firm. We offer turnkey solutions covering architecture, structural engineering, construction, and interior design to ensure a cohesive end result." },
  { q: "What is the typical timeline for a residential project?", a: "A luxury villa typically takes 12 to 18 months from design approval to final handover, depending on scale and intricacy of interior details." },
  { q: "How are project costs estimated and managed?", a: "We provide a highly detailed Bill of Quantities (BOQ) before construction begins. Our transparent pricing model means no hidden surprises, and any client-requested variations are formally approved before implementation." },
  { q: "Do you work with clients outside Shivamogga?", a: "While we are based in Shivamogga and undertake most projects locally, we do accept select premium projects across Karnataka." },
  { q: "What materials do you use?", a: "We source only premium, ISI-certified materials. From high-grade steel and cement to imported Italian marble and custom hardwoods, quality is never compromised." },
  { q: "Is there a warranty on your construction?", a: "Yes, we provide a structural warranty and post-handover maintenance support. We stand by the enduring quality of our craftsmanship." }
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors data-[state=open]:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

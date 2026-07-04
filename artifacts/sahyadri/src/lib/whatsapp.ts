export const WHATSAPP_NUMBER = "918660800057";

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: () =>
    [
      "Hello Sahyadri Construction & Interiors,",
      "",
      "I visited your website and would like to discuss a construction or interior project in Shivamogga.",
      "",
      "Please share the next steps.",
    ].join("\n"),

  floating: () =>
    [
      "Hello Sahyadri Construction & Interiors,",
      "",
      "I am browsing your website and would like to speak with your team about:",
      "• Residential / Commercial construction",
      "• Interior design",
      "• Renovation or Vastu consultation",
      "",
      "Please let me know how we can proceed.",
    ].join("\n"),

  project: (title: string, category: string, location: string, budget: string) =>
    [
      "Hello Sahyadri Construction & Interiors,",
      "",
      "I am interested in a project from your portfolio:",
      "",
      `*Project:* ${title}`,
      `*Category:* ${category}`,
      `*Location:* ${location}`,
      `*Budget:* ${budget}`,
      "",
      "Please share a quotation and estimated timeline.",
    ].join("\n"),

  founder: (name: string, role: string) =>
    [
      `Hello ${name},`,
      "",
      `I would like to connect regarding Sahyadri Construction & Interiors (${role}).`,
      "",
      "I have a project inquiry and would appreciate your guidance.",
      "",
      "Please let me know a convenient time to speak.",
    ].join("\n"),

  contactInquiry: (values: {
    name: string;
    phone: string;
    email: string;
    serviceLabel: string;
    message: string;
  }) =>
    [
      "Hello Sahyadri Construction & Interiors,",
      "",
      "I would like to inquire about a project:",
      "",
      `*Name:* ${values.name}`,
      `*Phone:* ${values.phone}`,
      `*Email:* ${values.email}`,
      `*Service:* ${values.serviceLabel}`,
      "",
      "*Project Details:*",
      values.message,
    ].join("\n"),
};

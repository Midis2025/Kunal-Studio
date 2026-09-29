// Brand facts migrated verbatim (or near-verbatim) from studiokunalphotography.com.
// Nothing here is invented — update this file when details change.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiokunalphotography.com";

export const studio = {
  name: "Studio Kunal Photography",
  shortName: "Studio Kunal",
  founder: "Kunal",
  email: "kkunalphotoarts@gmail.com",
  whatsapp: "https://wa.me/19057822743",
  phoneDisplay: "+1 905 782 2743",
  phoneE164: "+19057822743",
  regions: ["North America", "India", "Worldwide"],
  bookings: "2026 — 2027",
  deliveryWeeks: "10–12 weeks",
  social: {
    instagram: "https://www.instagram.com/studiokunal_photography/",
    youtube: "https://www.youtube.com/@StudioKunalPhotographyCanada",
  },
  description:
    "Studio Kunal Photography is an international wedding photography and cinematography studio working across North America and India — documentary and editorial storytelling, genuine emotion and cinematic imagery for couples worldwide.",
  // From the current homepage
  about:
    "An international photography company dedicated to capturing timeless stories with authenticity and emotion. With a cinematic approach and an eye for genuine moments, we transform real emotions into lasting memories. We are proudly based across North America and India, offering seamless photography and cinematography services for couples worldwide. With a deep understanding of diverse cultures, traditions, and wedding celebrations, we bring a global perspective while preserving the authenticity of every moment.",
  pricing:
    "We believe every celebration is unique, and so is our approach to pricing. Rather than offering fixed packages, we provide customised pricing tailored to your needs, vision, and event details. Each quote is thoughtfully curated based on your requirements, location, and the story you want us to capture — ensuring you receive a personalised experience that truly reflects your moments.",
} as const;

export const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

// FAQ — migrated from /get-in-touch
export const faq = [
  {
    q: "What is the delivery timeline for photos and videos?",
    a: "Our standard delivery timeline for the final gallery is 10–12 weeks after your event. This allows us to carefully review, select, and professionally edit each image to ensure the highest quality and storytelling experience.",
  },
  {
    q: "What photography style do you follow?",
    a: "Our approach is centred around understanding your vision first. We believe every couple and every celebration is unique, so we take the time to learn about your inspiration, preferences, and story. By combining your vision with our artistic approach, we carefully curate memories that feel natural, timeless, and truly personal.",
  },
  {
    q: "Do you offer customised packages?",
    a: "Yes. Every event is different, which is why we provide customised packages tailored to your needs, vision, and celebration. Once we understand your event details, we create a proposal that best fits your requirements.",
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Yes, absolutely. We love capturing weddings in different locations and cultures. Studio Kunal Photography operates across North America and India, and we are always excited to travel for destination weddings and special events.",
  },
  {
    q: "How can we book you for our event?",
    a: "Simply fill out the enquiry form with your event details. Once we receive your enquiry, we will connect with you to discuss your requirements and guide you through the booking process.",
  },
] as const;

export type ProductCategory =
  | "Todos"
  | "Notebooks & PC Gamer"
  | "Componentes & Peças"
  | "Redes"
  | "Segurança & CFTV";

export interface ProductItem {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "Todos">;
  description: string;
  priceLabel: string;
  imageUrl?: string;
  badge?: string;
  inStock: boolean;
  specs: string[];
  whatsappQuery: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  badge: string;
  highlight?: boolean;
  iconName: "Laptop" | "Cpu" | "Smartphone" | "Wifi" | "Camera" | "ShieldAlert";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  region: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  hours: string;
  legalNotice: string;
  enableStore?: boolean;
}

export interface HeroContent {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  bullets: string[];
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  disclaimer: string;
}

export interface CMSData {
  settings: SiteSettings;
  hero: HeroContent;
  services: ServiceItem[];
  products: ProductItem[];
  testimonials: TestimonialItem[];
}

export type TicketStatus = "Novo" | "Em Atendimento" | "Concluído";

export interface ContactTicket {
  id: string;
  protocol: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  message?: string;
  status: TicketStatus;
  createdAt: string;
}

export interface ContactFormPayload {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  message?: string;
}

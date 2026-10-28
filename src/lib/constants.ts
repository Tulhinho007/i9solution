export const SITE_CONFIG = {
  name: "i9 Solution",
  tagline: "Segurança Eletrônica e Soluções em Tecnologia",
  region: "Recife e Região Metropolitana",
  whatsappNumber: "5581999447735",
  whatsappDisplay: "(81) 99944-7735",
  instagramHandle: "@i9solutionpe",
  instagramUrl: "https://www.instagram.com/i9solutionpe/",
  email: "contato@i9solutionpe.com.br",
  hours: "Seg a Sex: 09h às 19h | Sáb: 09h às 15h | Dom: Fechado",
};

// Scanner de conformidade Google Ads (alerta sobre palavras proibidas)
export const RESTRICTED_GOOGLE_ADS_TERMS = [
  "assistência técnica",
  "assistencia tecnica",
  "conserto",
  "manutenção",
  "manutencao",
  "reparo",
];

export function getWhatsAppUrl(customMessage?: string): string {
  const baseMessage =
    customMessage ||
    "Olá! Vim pelo site da i9 Solution e gostaria de solicitar um atendimento especializado.";
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(baseMessage)}`;
}


import fs from "fs/promises";
import path from "path";
import { CMSData, ContactTicket, TicketStatus } from "@/types";
import { DEFAULT_CMS_DATA } from "@/lib/mock-data";
import { siteConfig } from "@/config/site";

const CMS_FILE_PATH = path.join(process.cwd(), "src", "data", "cms-content.json");
const TICKETS_FILE_PATH = path.join(process.cwd(), "src", "data", "tickets.json");

export async function getCMSData(): Promise<CMSData> {
  try {
    const raw = await fs.readFile(CMS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CMSData>;
    const mergedSettings = {
      ...DEFAULT_CMS_DATA.settings,
      ...(parsed.settings || {}),
    };
    if (typeof parsed.settings?.enableStore !== "boolean") {
      mergedSettings.enableStore = siteConfig.enableStore;
    }
    return {
      settings: mergedSettings,
      hero: { ...DEFAULT_CMS_DATA.hero, ...(parsed.hero || {}) },
      services: parsed.services && parsed.services.length > 0 ? parsed.services : DEFAULT_CMS_DATA.services,
      products: parsed.products && parsed.products.length > 0 ? parsed.products : DEFAULT_CMS_DATA.products,
      testimonials:
        parsed.testimonials && parsed.testimonials.length > 0
          ? parsed.testimonials
          : DEFAULT_CMS_DATA.testimonials,
    };
  } catch {
    // Se o arquivo ainda não existir, cria com os dados padrão e retorna
    try {
      await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
      await fs.writeFile(CMS_FILE_PATH, JSON.stringify(DEFAULT_CMS_DATA, null, 2), "utf-8");
    } catch {
      // Em ambientes serverless read-only sem DB, usa fallback em memória
    }
    return DEFAULT_CMS_DATA;
  }
}

export async function saveCMSData(data: CMSData): Promise<void> {
  await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
  await fs.writeFile(CMS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getTickets(): Promise<ContactTicket[]> {
  try {
    const raw = await fs.readFile(TICKETS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addTicket(
  payload: Omit<ContactTicket, "id" | "protocol" | "status" | "createdAt">
): Promise<ContactTicket> {
  const tickets = await getTickets();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const newTicket: ContactTicket = {
    id: `tkt-${Date.now()}`,
    protocol: `#I9-${randomDigits}`,
    name: payload.name,
    phone: payload.phone,
    email: payload.email || "",
    serviceType: payload.serviceType,
    message: payload.message || "",
    status: "Novo",
    createdAt: new Date().toISOString(),
  };

  const updated = [newTicket, ...tickets];
  await fs.mkdir(path.dirname(TICKETS_FILE_PATH), { recursive: true });
  await fs.writeFile(TICKETS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return newTicket;
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus
): Promise<ContactTicket[]> {
  const tickets = await getTickets();
  const updated = tickets.map((t) => (t.id === id ? { ...t, status } : t));
  await fs.mkdir(path.dirname(TICKETS_FILE_PATH), { recursive: true });
  await fs.writeFile(TICKETS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

export async function deleteTicket(id: string): Promise<ContactTicket[]> {
  const tickets = await getTickets();
  const updated = tickets.filter((t) => t.id !== id);
  await fs.mkdir(path.dirname(TICKETS_FILE_PATH), { recursive: true });
  await fs.writeFile(TICKETS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

// Scanner de conformidade Google Ads (alerta sobre palavras proibidas)
export const RESTRICTED_GOOGLE_ADS_TERMS = [
  "assistência técnica",
  "assistencia tecnica",
  "conserto",
  "manutenção",
  "manutencao",
  "reparo",
];

export function findRestrictedTerms(text: string): string[] {
  const lower = text.toLowerCase();
  return RESTRICTED_GOOGLE_ADS_TERMS.filter((term) => lower.includes(term));
}


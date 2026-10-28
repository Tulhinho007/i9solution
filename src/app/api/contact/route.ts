import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addTicket, getCMSData } from "@/lib/cms";

// Sanitização básica contra XSS/HTML injection em strings de entrada
function sanitizeInput(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim();
}

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome completo.")
    .max(100, "Nome muito longo.")
    .transform(sanitizeInput),
  phone: z
    .string()
    .min(8, "Informe um telefone ou WhatsApp válido.")
    .max(25, "Telefone inválido.")
    .transform(sanitizeInput),
  email: z
    .string()
    .email("E-mail inválido.")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitizeInput(v) : "")),
  serviceType: z
    .string()
    .min(2, "Selecione o tipo de solução desejada.")
    .max(80)
    .transform(sanitizeInput),
  message: z
    .string()
    .max(1000, "A mensagem deve ter no máximo 1000 caracteres.")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitizeInput(v) : "")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Verifique os dados informados no formulário.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, phone, email, serviceType, message } = parsed.data;

    // 1. Grava o chamado (Ticket) automaticamente para aparecer no Painel Administrativo (/admin)
    const ticket = await addTicket({
      name,
      phone,
      email,
      serviceType,
      message,
    });

    // 2. Busca o número de WhatsApp configurado no painel para montar o atalho opcional
    const cms = await getCMSData();

    const whatsappMessage = [
      `Olá, equipe *${cms.settings.name}*!`,
      `Abri o chamado *${ticket.protocol}* pelo site:`,
      ``,
      `*Nome:* ${name}`,
      `*WhatsApp:* ${phone}`,
      email ? `*E-mail:* ${email}` : null,
      `*Interesse:* ${serviceType}`,
      message ? `*Detalhes:* ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappRedirectUrl = `https://wa.me/${cms.settings.whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    return NextResponse.json(
      {
        success: true,
        protocol: ticket.protocol,
        message: `Chamado ${ticket.protocol} registrado com sucesso no nosso sistema! Nossa equipe entrará em contato pelo WhatsApp informado.`,
        whatsappRedirectUrl,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível processar sua solicitação no momento. Tente via WhatsApp.",
      },
      { status: 500 }
    );
  }
}

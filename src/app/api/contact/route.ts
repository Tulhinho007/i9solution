import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addTicket, getCMSData } from "@/lib/cms";
import { checkRateLimit, getClientIp } from "@/lib/auth";

// Sanitização rigorosa contra XSS, tags HTML e payloads maliciosos
function sanitizeInput(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
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
  // Campo Honeypot anti-bot (deve vir vazio)
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // Limite de 6 envios a cada 10 minutos por IP para evitar spam / flood de chamados
    const rate = checkRateLimit(`contact-submit:${ip}`, 6, 1000 * 60 * 10);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Muitas solicitações enviadas em sequência. Aguarde alguns minutos ou chame direto no WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Verifique os dados informados no formulário.",
        },
        { status: 400 }
      );
    }

    const { name, phone, email, serviceType, message } = parsed.data;

    // 1. Grava o chamado SOMENTE no servidor (nunca fica no localStorage do navegador do visitante)
    const ticket = await addTicket({
      name,
      phone,
      email,
      serviceType,
      message,
    });

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

    // Retorna apenas o número do protocolo público e o link de redirecionamento
    return NextResponse.json(
      {
        success: true,
        protocol: ticket.protocol,
        message: `Chamado ${ticket.protocol} registrado com segurança! Nossa equipe entrará em contato pelo WhatsApp informado.`,
        whatsappRedirectUrl,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
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

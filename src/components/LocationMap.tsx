"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, Send, MessageCircle, Building2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const COVERAGE_AREAS = [
  "Recife (Boa Viagem, Pina, Imbiribeira, Centro)",
  "Zona Norte (Casa Forte, Espinheiro, Graças, Boa Vista)",
  "Zona Oeste (Madalena, Caxangá, Várzea, Afogados)",
  "Olinda e Paulista",
  "Jaboatão dos Guararapes (Piedade, Candeias)",
  "Camaragibe e São Lourenço da Mata",
];

export default function LocationMap() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("Diagnóstico e Upgrade para Notebooks");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot invisível contra bots
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
    whatsappUrl?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, serviceType, message, website }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setFeedback({
          type: "error",
          text: data.error || "Verifique os campos preenchidos.",
        });
      } else {
        setFeedback({
          type: "success",
          text: data.message,
          whatsappUrl: data.whatsappRedirectUrl,
        });
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Erro de conexão. Você pode falar diretamente pelo botão do WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="localizacao" className="py-20 lg:py-24 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Coluna Cobertura Regional */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-800 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-cyan-600" />
              Atendimento Local em Pernambuco
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Cobertura Ágil em Recife e Região Metropolitana
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Contamos com atendimento rápido para diagnóstico de Notebooks e PCs Gamers, entrega de componentes e execução de projetos de Redes e Segurança Eletrônica em toda a Região Metropolitana do Recife.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-slate-900">
                <Building2 className="w-5 h-5 text-cyan-600" />
                <span>Principais Regiões Atendidas:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COVERAGE_AREAS.map((area) => (
                  <div key={area} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs sm:text-sm font-medium text-slate-600">
                  📍 <strong className="text-slate-900">Para outras regiões:</strong> entre em contato com nossa equipe para verificar disponibilidade de atendimento.
                </p>
              </div>
            </div>

            {/* Card Direto WhatsApp */}
            <div className="rounded-2xl bg-[#0F172A] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  Canal Direto i9 Solution
                </p>
                <p className="text-lg font-bold mt-0.5">
                  Prefere resposta imediata no WhatsApp?
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Nosso time responde rapidamente em horário comercial.
                </p>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                Chamar Agora
              </a>
            </div>
          </div>

          {/* Coluna Formulário Conectado à API Route `/api/contact` */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-lg">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Solicite um Diagnóstico ou Orçamento
              </h3>
              <p className="text-sm text-slate-600 mt-1 mb-6">
                Preencha os dados abaixo para receber atendimento personalizado da nossa equipe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                {/* Campo Honeypot anti-bot invisível para usuários reais */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Seu Nome Completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(81) 99999-9999"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      E-mail (Opcional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Solução de Interesse *
                  </label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Diagnóstico e Upgrade para Notebooks">Diagnóstico e Upgrade para Notebooks</option>
                    <option value="Diagnóstico e Performance para PC Gamer">Diagnóstico e Performance para PC Gamer</option>
                    <option value="Diagnóstico em Placas de Vídeo (GPU)">Diagnóstico em Placas de Vídeo (GPU)</option>
                    <option value="Atendimento Especializado para Celulares">Atendimento Especializado para Celulares</option>
                    <option value="Diagnóstico e Soluções para Servidores">Diagnóstico e Soluções para Servidores</option>
                    <option value="CFTV e Segurança Eletrônica">CFTV e Segurança Eletrônica</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Como podemos ajudar?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Informe o modelo do seu Notebook/PC Gamer, upgrade desejado ou necessidade..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0F172A] text-white hover:bg-cyan-600 disabled:opacity-60 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Enviando solicitação..." : "Solicitar Diagnóstico / Orçamento"}
                </button>

                {feedback && (
                  <div
                    className={`p-4 rounded-xl text-sm ${
                      feedback.type === "success"
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    <p className="font-semibold">{feedback.text}</p>
                    {feedback.whatsappUrl && (
                      <a
                        href={feedback.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 underline"
                      >
                        Se preferir agilizar agora, clique aqui para enviar também pelo WhatsApp &rarr;
                      </a>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

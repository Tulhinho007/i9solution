"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lock,
  Type,
  Package,
  Layers,
  Phone,
  Inbox,
  MessageCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { CMSData, ContactTicket, ProductItem, ServiceItem, TicketStatus } from "@/types";
import { RESTRICTED_GOOGLE_ADS_TERMS } from "@/lib/constants";

type AdminTab = "tickets" | "hero" | "services" | "products" | "settings";

function checkRestrictedWords(text: string): string[] {
  const lower = text.toLowerCase();
  return RESTRICTED_GOOGLE_ADS_TERMS.filter((term) => lower.includes(term));
}

export default function AdminDashboardPage() {
  const [cms, setCms] = useState<CMSData | null>(null);
  const [tickets, setTickets] = useState<ContactTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("tickets");
  const [password, setPassword] = useState("i9admin2026");
  const [unlocked, setUnlocked] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function loadTickets() {
    try {
      const res = await fetch("/api/tickets");
      const json = await res.json();
      if (json.success && Array.isArray(json.tickets)) {
        setTickets(json.tickets);
      }
    } catch {
      // ignora erro de rede temporário
    }
  }

  useEffect(() => {
    Promise.all([
      fetch("/api/cms").then((res) => res.json()),
      fetch("/api/tickets").then((res) => res.json()),
    ])
      .then(([cmsJson, ticketsJson]) => {
        if (cmsJson.success && cmsJson.data) {
          setCms(cmsJson.data);
        }
        if (ticketsJson.success && Array.isArray(ticketsJson.tickets)) {
          setTickets(ticketsJson.tickets);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !cms) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-300">Carregando Painel Administrativo (CMS)...</p>
        </div>
      </div>
    );
  }

  // Scanner global em tempo real para avisar se o cliente digitar termos restritos do Google Ads
  const entireTextDump = JSON.stringify({
    hero: cms.hero,
    services: cms.services,
    products: cms.products,
  });
  const detectedRestrictedWords = checkRestrictedWords(entireTextDump);

  async function handleSave() {
    if (!cms) return;
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: cms }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStatusMsg({ type: "error", text: json.error || "Erro ao salvar." });
      } else {
        setStatusMsg({ type: "success", text: json.message });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Falha de comunicação com o servidor." });
    } finally {
      setSaving(false);
    }
  }

  async function handleResetDefault() {
    if (!confirm("Deseja restaurar todos os textos e produtos para o padrão original da i9 Solution?")) {
      return;
    }
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, resetToDefault: true }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCms(json.data);
        setStatusMsg({ type: "success", text: json.message });
      } else {
        setStatusMsg({ type: "error", text: json.error || "Erro ao restaurar." });
      }
    } finally {
      setSaving(false);
    }
  }

  function handleAddProduct() {
    if (!cms) return;
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      name: "Novo Equipamento ou Peça",
      category: "Notebooks & PC Gamer",
      description: "Descrição detalhada do equipamento ou componente.",
      priceLabel: "Pronta Entrega",
      badge: "Destaque",
      imageUrl: "",
      inStock: true,
      specs: ["Garantia Oficial", "Pronta Entrega Recife"],
      whatsappQuery: "Olá! Tenho interesse no item anunciado na vitrine da i9 Solution.",
    };
    setCms({
      ...cms,
      products: [newProduct, ...cms.products],
    });
  }

  function handleRemoveProduct(id: string) {
    if (!cms) return;
    setCms({
      ...cms,
      products: cms.products.filter((p) => p.id !== id),
    });
  }

  function updateProduct(index: number, partial: Partial<ProductItem>) {
    if (!cms) return;
    const next = [...cms.products];
    next[index] = { ...next[index], ...partial };
    setCms({ ...cms, products: next });
  }

  function updateService(index: number, partial: Partial<ServiceItem>) {
    if (!cms) return;
    const next = [...cms.services];
    next[index] = { ...next[index], ...partial };
    setCms({ ...cms, services: next });
  }

  async function handleUpdateTicketStatus(id: string, status: TicketStatus) {
    try {
      const res = await fetch("/api/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id, status }),
      });
      const json = await res.json();
      if (json.success) {
        setTickets(json.tickets);
      }
    } catch {
      // erro silencioso
    }
  }

  async function handleDeleteTicket(id: string) {
    if (!confirm("Deseja excluir este chamado do histórico?")) return;
    try {
      const res = await fetch("/api/tickets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id }),
      });
      const json = await res.json();
      if (json.success) {
        setTickets(json.tickets);
      }
    } catch {
      // erro silencioso
    }
  }

  const newTicketsCount = tickets.filter((t) => t.status === "Novo").length;

  // Tela de Login Simples do Painel
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold">Painel CMS &bull; i9 Solution</h1>
              <p className="text-xs text-slate-400">Gerenciador de Textos, Produtos e Contatos</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-300">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                placeholder="Digite a senha do painel"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Senha padrão de demonstração já preenchida: <code className="text-cyan-400">i9admin2026</code>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 transition-all"
          >
            Entrar no Painel Administrativo
          </button>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">
              &larr; Voltar para a Landing Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Barra Superior Fixa */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black">
              i9
            </div>
            <div>
              <h1 className="text-lg font-extrabold">
                Painel Administrativo (CMS) &mdash; i9 Solution
              </h1>
              <p className="text-xs text-slate-400">
                Edite títulos, serviços, vitrine de peças e contatos sem mexer no código
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Ver Site ao Vivo
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            <button
              type="button"
              onClick={handleResetDefault}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Padrão
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              {saving ? "Salvando..." : "Publicar Alterações"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Validador em Tempo Real de Conformidade Google Ads */}
        {detectedRestrictedWords.length > 0 ? (
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/40 p-4 flex items-start gap-3 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-bold text-amber-300">
                Alerta de Segurança Google Ads: Palavra restrita detectada!
              </p>
              <p className="mt-1">
                Você digitou um ou mais termos que podem causar reprovação de anúncios no Google Ads:{" "}
                <strong className="underline">{detectedRestrictedWords.join(", ")}</strong>. Recomendamos substituir por{" "}
                <em>&ldquo;Diagnóstico Ágil&rdquo;</em>, <em>&ldquo;Soluções&rdquo;</em>,{" "}
                <em>&ldquo;Atendimento Especializado&rdquo;</em> ou <em>&ldquo;Upgrade&rdquo;</em>.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-center justify-between gap-3 text-emerald-200">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Escudo Google Ads Ativo:</strong> Todos os textos atuais estão 100% livres de termos restritos.
              </span>
            </div>
          </div>
        )}

        {/* Mensagem de Feedback ao Salvar */}
        {statusMsg && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold border ${
              statusMsg.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border-red-500/40 text-red-300"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Navegação de Abas do CMS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("tickets")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "tickets"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Chamados &amp; Orçamentos ({tickets.length})
            {newTicketsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-slate-950 text-emerald-400">
                {newTicketsCount} novo(s)
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "hero"
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Type className="w-4 h-4" />
            1. Textos (Hero)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "services"
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            2. Cards de Serviços ({cms.services.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "products"
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            3. Vitrine em Standby ({cms.products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "settings"
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Phone className="w-4 h-4" />
            4. WhatsApp, Links e Horários
          </button>
        </div>

        {/* ABA 0: CENTRAL DE CHAMADOS / ORÇAMENTOS */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Central de Chamados e Solicitações de Diagnóstico
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Todos os formulários preenchidos no site caem diretamente aqui com número de protocolo e botão para responder o cliente no WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={loadTickets}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                Atualizar Lista
              </button>
            </div>

            {tickets.length === 0 ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <Inbox className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-200">
                  Nenhum chamado recebido ainda
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Preencha o formulário &ldquo;Solicite um Diagnóstico ou Orçamento&rdquo; na página inicial para testar: o chamado aparecerá aqui imediatamente!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {tickets.map((ticket) => {
                  const cleanClientPhone = ticket.phone.replace(/\D/g, "");
                  const whatsappClientDigits = cleanClientPhone.startsWith("55")
                    ? cleanClientPhone
                    : `55${cleanClientPhone}`;
                  const replyMessage = `Olá, *${ticket.name}*! Aqui é da equipe *i9 Solution*. Recebemos seu chamado *${ticket.protocol}* referente a *${ticket.serviceType}* e já estamos à disposição para te atender!`;
                  const whatsappClientUrl = `https://wa.me/${whatsappClientDigits}?text=${encodeURIComponent(
                    replyMessage
                  )}`;

                  return (
                    <div
                      key={ticket.id}
                      className={`rounded-2xl p-6 border transition-all ${
                        ticket.status === "Novo"
                          ? "bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20"
                          : "bg-slate-900/70 border-slate-800"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                            {ticket.protocol}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                              ticket.status === "Novo"
                                ? "bg-emerald-500 text-slate-950"
                                : ticket.status === "Em Atendimento"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {ticket.status}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(ticket.createdAt).toLocaleString("pt-BR")}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={ticket.status}
                            onChange={(e) =>
                              handleUpdateTicketStatus(
                                ticket.id,
                                e.target.value as TicketStatus
                              )
                            }
                            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            <option value="Novo">Status: Novo</option>
                            <option value="Em Atendimento">Status: Em Atendimento</option>
                            <option value="Concluído">Status: Concluído</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                            title="Excluir chamado"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-8 space-y-2">
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                            <p className="text-base font-extrabold text-white">
                              {ticket.name}
                            </p>
                            <p className="text-sm font-semibold text-emerald-400">
                              WhatsApp: {ticket.phone}
                            </p>
                            {ticket.email && (
                              <p className="text-xs text-slate-400">
                                E-mail: {ticket.email}
                              </p>
                            )}
                          </div>

                          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 pt-1">
                            Solução Solicitada: {ticket.serviceType}
                          </p>

                          {ticket.message ? (
                            <div className="mt-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                              {ticket.message}
                            </div>
                          ) : (
                            <p className="text-xs italic text-slate-500">
                              Nenhuma mensagem adicional informada.
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-end gap-2.5">
                          <a
                            href={whatsappClientUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (ticket.status === "Novo") {
                                handleUpdateTicketStatus(ticket.id, "Em Atendimento");
                              }
                            }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/15"
                          >
                            <MessageCircle className="w-4 h-4 fill-slate-950" />
                            Chamar Cliente no WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ABA 1: HERO / COPYWRITING */}
        {activeTab === "hero" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-white">
              Chamada Principal (Topo da Landing Page)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Selo Superior (Badge)
                </label>
                <input
                  type="text"
                  value={cms.hero.badgeText}
                  onChange={(e) =>
                    setCms({ ...cms, hero: { ...cms.hero, badgeText: e.target.value } })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Texto do Botão Principal (WhatsApp)
                </label>
                <input
                  type="text"
                  value={cms.hero.ctaPrimaryText}
                  onChange={(e) =>
                    setCms({ ...cms, hero: { ...cms.hero, ctaPrimaryText: e.target.value } })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Título Principal (Parte 1 - Branca)
                </label>
                <input
                  type="text"
                  value={cms.hero.titlePrefix}
                  onChange={(e) =>
                    setCms({ ...cms, hero: { ...cms.hero, titlePrefix: e.target.value } })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-cyan-400 mb-1.5">
                  Título em Destaque (Parte 2 - Gradiente Ciano/Verde)
                </label>
                <input
                  type="text"
                  value={cms.hero.titleHighlight}
                  onChange={(e) =>
                    setCms({ ...cms, hero: { ...cms.hero, titleHighlight: e.target.value } })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-cyan-500/50 px-4 py-3 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Subtítulo / Descrição Completa
              </label>
              <textarea
                rows={3}
                value={cms.hero.description}
                onChange={(e) =>
                  setCms({ ...cms, hero: { ...cms.hero, description: e.target.value } })
                }
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                4 Destaques Rápidos (1 por linha)
              </label>
              <textarea
                rows={4}
                value={cms.hero.bullets.join("\n")}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    hero: { ...cms.hero, bullets: e.target.value.split("\n") },
                  })
                }
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
              />
            </div>
          </div>
        )}

        {/* ABA 2: VITRINE DE PRODUTOS E PEÇAS */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Gerenciar Vitrine de Produtos, Notebooks &amp; Peças
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adicione novos produtos, altere preços, status de pronta entrega ou fotos.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddProduct}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Novo Produto / Peça
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {cms.products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Item #{index + 1} &bull; {product.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.inStock !== false}
                          onChange={(e) =>
                            updateProduct(index, { inStock: e.target.checked })
                          }
                          className="rounded border-slate-700"
                        />
                        Visível na Vitrine
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Nome do Produto / Peça
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(index, { name: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Categoria
                      </label>
                      <select
                        value={product.category}
                        onChange={(e) =>
                          updateProduct(index, {
                            category: e.target.value as ProductItem["category"],
                          })
                        }
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                      >
                        <option value="Notebooks & PC Gamer">Notebooks &amp; PC Gamer</option>
                        <option value="Componentes & Peças">Componentes &amp; Peças</option>
                        <option value="Redes">Redes</option>
                        <option value="Segurança & CFTV">Segurança &amp; CFTV</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Preço ou Status (Ex: Pronta Entrega / R$ 1.290)
                      </label>
                      <input
                        type="text"
                        value={product.priceLabel}
                        onChange={(e) => updateProduct(index, { priceLabel: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-emerald-400 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Selo de Destaque (Badge)
                      </label>
                      <input
                        type="text"
                        value={product.badge || ""}
                        onChange={(e) => updateProduct(index, { badge: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        URL da Foto (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://... ou /images/..."
                        value={product.imageUrl || ""}
                        onChange={(e) => updateProduct(index, { imageUrl: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Descrição Curta
                    </label>
                    <textarea
                      rows={2}
                      value={product.description}
                      onChange={(e) => updateProduct(index, { description: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Especificações / Tags (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={product.specs.join(", ")}
                      onChange={(e) =>
                        updateProduct(index, {
                          specs: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 3: SERVIÇOS */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {cms.services.map((service, index) => (
              <div
                key={service.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase text-cyan-400">
                    Card de Serviço #{index + 1}
                  </span>
                  <label className="inline-flex items-center gap-2 text-xs text-emerald-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(service.highlight)}
                      onChange={(e) => updateService(index, { highlight: e.target.checked })}
                    />
                    Destacar em Evidência (Fundo Escuro + Borda Ciano)
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Título do Serviço
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(index, { title: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Selo (Badge)
                    </label>
                    <input
                      type="text"
                      value={service.badge}
                      onChange={(e) => updateService(index, { badge: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => updateService(index, { description: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Itens / Benefícios (1 por linha)
                  </label>
                  <textarea
                    rows={3}
                    value={service.features.join("\n")}
                    onChange={(e) =>
                      updateService(index, { features: e.target.value.split("\n") })
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA 4: CONTATOS, WHATSAPP E RODAPÉ */}
        {activeTab === "settings" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-white">
              Configurações de WhatsApp, Vitrine em Standby e Horários
            </h2>

            {/* Chave Geral para Ativar/Desativar Vitrine */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-cyan-400">
                  Exibir Vitrine de Produtos &amp; Catálogo no Site (enableStore)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Atualmente em modo Standby (oculto para focar 100% em Serviços no Google Ads). Marque para ativar no menu e na página inicial.
                </p>
              </div>
              <label className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={Boolean(cms.settings.enableStore)}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, enableStore: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-emerald-500"
                />
                {cms.settings.enableStore ? "Vitrine Ativa" : "Em Standby (Oculta)"}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-emerald-400 mb-1.5">
                  Número do WhatsApp (Apenas números com DDI 55 + DDD)
                </label>
                <input
                  type="text"
                  value={cms.settings.whatsappNumber}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, whatsappNumber: e.target.value },
                    })
                  }
                  placeholder="Ex: 5581999999999"
                  className="w-full rounded-xl bg-slate-950 border border-emerald-500/50 px-4 py-3 text-sm text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Horário de Funcionamento (Topo e Rodapé)
                </label>
                <input
                  type="text"
                  value={cms.settings.hours}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, hours: e.target.value },
                    })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Região de Atendimento
                </label>
                <input
                  type="text"
                  value={cms.settings.region}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, region: e.target.value },
                    })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Arroba do Instagram
                </label>
                <input
                  type="text"
                  value={cms.settings.instagramHandle}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, instagramHandle: e.target.value },
                    })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Link Completo do Instagram
                </label>
                <input
                  type="text"
                  value={cms.settings.instagramUrl}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, instagramUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Aviso Legal de Rodapé (Importante para Conformidade Google Ads)
                </label>
                <textarea
                  rows={3}
                  value={cms.settings.legalNotice}
                  onChange={(e) =>
                    setCms({
                      ...cms,
                      settings: { ...cms.settings, legalNotice: e.target.value },
                    })
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


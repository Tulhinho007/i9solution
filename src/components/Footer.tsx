import React from "react";
import Link from "next/link";
import { ShieldCheck, Instagram, MessageCircle, MapPin, Clock, Settings } from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/mock-data";
import { SiteSettings } from "@/types";
import { siteConfig } from "@/config/site";

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings = DEFAULT_SITE_SETTINGS }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isStoreEnabled = settings.enableStore ?? siteConfig.enableStore;
  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vim pelo site da i9 Solution e gostaria de solicitar atendimento."
  )}`;

  return (
    <footer className="bg-[#090E1A] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1 - Institucional */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5">
                <div className="w-full h-full bg-[#090E1A] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">
                i9 <span className="text-cyan-400">Solution</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Especialistas em Diagnóstico e Performance para Notebooks e PCs Gamers, Soluções para Smartphones, Redes Gigabit e Segurança Eletrônica em Recife e Região.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-cyan-400" />
                {settings.instagramHandle}
              </a>
            </div>
          </div>

          {/* Coluna 2 - Navegação Rápida */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navegação Rápida
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#solucoes" className="hover:text-cyan-400 transition-colors">
                  Nossas Soluções
                </Link>
              </li>
              {isStoreEnabled && (
                <>
                  <li>
                    <Link href="/#vitrine" className="hover:text-cyan-400 transition-colors">
                      Vitrine de Equipamentos &amp; Peças
                    </Link>
                  </li>
                  <li>
                    <Link href="/produtos" className="hover:text-cyan-400 transition-colors">
                      Catálogo de Produtos
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/#depoimentos" className="hover:text-cyan-400 transition-colors">
                  Diferenciais e Avaliações
                </Link>
              </li>
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                  Painel Administrativo (CMS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Especialidades (Notebooks, PCs Gamers e Placas de Vídeo primeiro, CFTV por último) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Especialidades
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-200 font-medium">Diagnóstico e Upgrades p/ Notebooks</li>
              <li className="text-slate-200 font-medium">Performance de PCs Gamers e Placas de Vídeo</li>
              <li>Diagnóstico Ágil para Smartphones</li>
              <li>Soluções para Servidores Corporativos</li>
              <li>Monitoramento CFTV e Segurança</li>
            </ul>
          </div>

          {/* Coluna 4 - Atendimento */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Atendimento
            </h3>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
              <span>{settings.region} - PE (Para outras regiões, entrar em contato)</span>
            </p>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <div className="space-y-0.5 text-xs sm:text-sm">
                <p>Segunda a Sexta: 09h às 19h</p>
                <p>Sábado: 09h às 15h</p>
                <p className="text-slate-500">Domingo: Fechado</p>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                Atendimento via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Avisos Legais e Conformidade Google Ads */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>
            &copy; {currentYear} {settings.name} &mdash; Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-slate-500">{settings.legalNotice}</p>
        </div>
      </div>

      {/* Botão Flutuante do WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a i9 Solution pelo WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline">Atendimento Rápido</span>
      </a>
    </footer>
  );
}

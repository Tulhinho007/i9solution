import React from "react";
import {
  Cpu,
  Clock,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Camera,
  Laptop,
  Wifi,
  Smartphone,
} from "lucide-react";
import { DEFAULT_HERO_CONTENT, DEFAULT_SITE_SETTINGS } from "@/lib/mock-data";
import { HeroContent, SiteSettings } from "@/types";

interface HeroSectionProps {
  hero?: HeroContent;
  settings?: SiteSettings;
}

export default function HeroSection({
  hero = DEFAULT_HERO_CONTENT,
  settings = DEFAULT_SITE_SETTINGS,
}: HeroSectionProps) {
  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vim pelo site da i9 Solution e gostaria de solicitar um diagnóstico para meu Notebook / PC Gamer."
  )}`;

  const isStoreEnabled = settings.enableStore ?? false;
  const secondaryHref = isStoreEnabled ? "#vitrine" : "#solucoes";
  const secondaryLabel =
    !isStoreEnabled && hero.ctaSecondaryText.toLowerCase().includes("equipamento")
      ? "Conhecer Nossas Soluções"
      : hero.ctaSecondaryText;

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Efeitos sutis de iluminação tecnológica no fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-cyan-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda - Copy Principal Editável pelo CMS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
              <Cpu className="w-4 h-4 text-cyan-400" />
              {hero.badgeText}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              {hero.titlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                {hero.titleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {hero.description}
            </p>

            {/* Destaques Rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {hero.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-xl shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                {hero.ctaPrimaryText}
              </a>

              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
              >
                {secondaryLabel}
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            <p className="text-xs text-slate-400">{hero.disclaimer}</p>
          </div>

          {/* Coluna Direita - Painel Visual (Notebooks e PCs Gamers no topo, CFTV por último) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                    Laboratório Avançado i9
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Performance &amp; Soluções Rápidas
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  1h Express
                </div>
              </div>

              <div className="space-y-4">
                {/* 1º Notebooks & PCs Gamers em Destaque */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 to-emerald-500/10 border border-cyan-500/40 shadow-md">
                  <div className="p-3 rounded-lg bg-cyan-500 text-slate-950">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        Diagnóstico de Notebooks &amp; PCs Gamers
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-400 text-slate-950">
                        Destaque
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1">
                      Upgrades de SSD NVMe e RAM, otimização de FPS, refrigeração térmica e diagnóstico eletrônico preciso.
                    </p>
                  </div>
                </div>

                {/* 2º Smartphones */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/50 transition-colors">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Atendimento Especializado para Celulares
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Diagnóstico ágil e renovação de telas, baterias e conectores com garantia.
                    </p>
                  </div>
                </div>

                {/* 3º Redes Gigabit */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/50 transition-colors">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Redes Gigabit &amp; Wi-Fi 6 de Baixa Latência
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Conexão ultraestável sem perda de pacotes para setups gamers, home office e empresas.
                    </p>
                  </div>
                </div>

                {/* 4º CFTV e Segurança por Último */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/50 transition-colors">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      CFTV Digital &amp; Segurança Eletrônica
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Câmeras Full HD/IP e sistemas de alarme monitorados pelo celular 24h por dia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

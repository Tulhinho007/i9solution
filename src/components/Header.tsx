"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X, MessageCircle, MapPin, Clock, Settings } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SiteSettings } from "@/types";
import { DEFAULT_SITE_SETTINGS } from "@/lib/mock-data";
import { siteConfig } from "@/config/site";

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings = DEFAULT_SITE_SETTINGS }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStoreEnabled = settings.enableStore ?? siteConfig.enableStore;

  const whatsappHref = `https://wa.me/${settings.whatsappNumber || SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vim pelo site da i9 Solution e gostaria de falar com um especialista."
  )}`;

  const navItems = [
    { label: "Soluções", href: "/#solucoes", show: true },
    { label: "Vitrine & Peças", href: "/#vitrine", show: isStoreEnabled },
    { label: "Catálogo Completo", href: "/produtos", show: isStoreEnabled },
    { label: "Diferenciais", href: "/#depoimentos", show: true },
    { label: "Cobertura Recife", href: "/#localizacao", show: true },
  ].filter((item) => item.show);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0F172A]/95 border-b border-slate-800 text-white">
      {/* TopBar informativa */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 text-xs text-slate-300 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              Atendimento em {settings.region}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {settings.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Diagnóstico Ágil &bull; Resolução em até 1 Hora*
            </span>
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
              title="Acessar Painel Administrativo (CMS)"
            >
              <Settings className="w-3 h-3" />
              Painel Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white">
              i9 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Solution</span>
            </span>
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-medium">
              Notebooks &bull; PC Gamer &bull; Tecnologia
            </span>
          </div>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA WhatsApp Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60"
          aria-label="Abrir menu de navegação"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/70 hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/70 hover:text-cyan-400"
          >
            Painel Administrativo (/admin)
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            Atendimento Rápido via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

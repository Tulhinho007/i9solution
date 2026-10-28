import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Database, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import ProductsShowcase from "@/components/ProductsShowcase";
import Footer from "@/components/Footer";
import { getCMSData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vitrine de Produtos, Notebooks & Peças | i9 Solution Recife",
  description:
    "Confira nossa vitrine de Notebooks revisados, Upgrades PC Gamer, Roteadores Wi-Fi 6 e componentes selecionados em Recife.",
};

export default async function ProdutosPage() {
  const cms = await getCMSData();
  const whatsappHref = `https://wa.me/${cms.settings.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Estou na página de Produtos da i9 Solution e gostaria de consultar um item."
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <Header settings={cms.settings} />
      <main className="flex-1">
        <div className="bg-slate-950/70 border-b border-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para a Página Inicial
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Catálogo de Equipamentos &amp; Componentes
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Consulte disponibilidade imediata para retirada ou entrega em Recife e Região Metropolitana.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Gerenciar no Painel
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                Consultar Peça Específica
              </a>
            </div>
          </div>
        </div>

        <ProductsShowcase
          products={cms.products}
          settings={cms.settings}
          showFullCatalogBanner={false}
        />
      </main>
      <Footer settings={cms.settings} />
    </div>
  );
}

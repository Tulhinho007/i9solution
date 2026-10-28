"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PackageCheck, MessageCircle, Cpu, ArrowUpRight, Database } from "lucide-react";
import { DEFAULT_SITE_SETTINGS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCategory, ProductItem, SiteSettings } from "@/types";

interface ProductsShowcaseProps {
  products?: ProductItem[];
  settings?: SiteSettings;
  showFullCatalogBanner?: boolean;
}

const CATEGORIES: ProductCategory[] = [
  "Todos",
  "Notebooks & PC Gamer",
  "Componentes & Peças",
  "Redes",
  "Segurança & CFTV",
];

export default function ProductsShowcase({
  products = MOCK_PRODUCTS,
  settings = DEFAULT_SITE_SETTINGS,
  showFullCatalogBanner = true,
}: ProductsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("Todos");

  const visibleProducts = products.filter((item) => item.inStock !== false);

  const filteredProducts =
    selectedCategory === "Todos"
      ? visibleProducts
      : visibleProducts.filter((item) => item.category === selectedCategory);

  const buildWhatsappHref = (text: string) =>
    `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;

  return (
    <section id="vitrine" className="py-20 lg:py-24 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3">
              <PackageCheck className="w-4 h-4" />
              Pronta Entrega em Recife
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Vitrine de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Notebooks, Upgrades Gamer &amp; Peças
              </span>
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              Kits de upgrade SSD NVMe e RAM, refrigeração para PCs Gamers, Notebooks revisados, roteadores Gigabit e equipamentos de segurança.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              <div>
                {product.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 h-44 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {product.name}
                </h3>

                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Especificações */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                    >
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase">
                    Disponibilidade
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    {product.priceLabel}
                  </span>
                </div>

                <a
                  href={buildWhatsappHref(
                    product.whatsappQuery || `Olá! Tenho interesse no produto: ${product.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  Consultar
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Expansão / Catálogo Completo */}
        {showFullCatalogBanner && (
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-slate-700/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Database className="w-4 h-4" />
                Vitrine Gerenciável pelo Painel (/admin)
              </div>
              <h3 className="text-xl font-bold text-white">
                Procurando algum componente para seu Notebook ou PC Gamer?
              </h3>
              <p className="text-sm text-slate-300">
                Consulte nosso estoque atualizado em tempo real ou acesse a página dedicada de produtos e peças.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
              >
                Abrir Página da Vitrine
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </Link>
              <a
                href={buildWhatsappHref(
                  "Olá! Estou procurando uma peça ou upgrade para meu Notebook / PC Gamer e gostaria de consultar o estoque da i9 Solution."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                Consultar Estoque no WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import React from "react";
import {
  Camera,
  ShieldAlert,
  Wifi,
  Laptop,
  Smartphone,
  Cpu,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { DEFAULT_SITE_SETTINGS, SERVICES_DATA } from "@/lib/mock-data";
import { ServiceItem, SiteSettings } from "@/types";

const iconMap: Record<ServiceItem["iconName"], React.ComponentType<{ className?: string }>> = {
  Laptop,
  Cpu,
  Smartphone,
  Wifi,
  Camera,
  ShieldAlert,
};

interface ServicesProps {
  services?: ServiceItem[];
  settings?: SiteSettings;
}

export default function Services({
  services = SERVICES_DATA,
  settings = DEFAULT_SITE_SETTINGS,
}: ServicesProps) {
  return (
    <section id="solucoes" className="py-20 lg:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 font-bold text-xs uppercase tracking-wider mb-3">
            Especialidades em Destaque
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Diagnóstico de Notebooks, PCs Gamers e Soluções Tecnológicas
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Priorizamos o desempenho máximo dos seus computadores e dispositivos móveis, além de oferecer infraestrutura completa de redes e segurança eletrônica em Recife e Região.
          </p>
        </div>

        {/* Grid de Cards: Notebooks e PCs Gamers primeiro e com destaque visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Laptop;
            const isHighlighted = Boolean(service.highlight);
            const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              `Olá! Vim pelo site da i9 Solution e gostaria de atendimento para: ${service.title}.`
            )}`;

            return (
              <div
                key={service.id}
                className={`group rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between ${
                  isHighlighted
                    ? "bg-[#0F172A] text-white border-2 border-cyan-500 shadow-xl shadow-cyan-950/20"
                    : "bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`w-13 h-13 p-3.5 rounded-xl transition-colors ${
                        isHighlighted
                          ? "bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950"
                          : "bg-[#0F172A] text-cyan-400 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:text-slate-950"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                        isHighlighted
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {isHighlighted && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                      {service.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold transition-colors ${
                      isHighlighted
                        ? "text-white group-hover:text-cyan-300"
                        : "text-slate-900 group-hover:text-cyan-700"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isHighlighted ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {service.description}
                  </p>

                  <ul
                    className={`mt-6 space-y-2.5 border-t pt-5 ${
                      isHighlighted ? "border-slate-800" : "border-slate-100"
                    }`}
                  >
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                          isHighlighted ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold transition-all ${
                      isHighlighted
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20"
                        : "bg-slate-900 text-white hover:bg-cyan-600"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isHighlighted ? "Solicitar Diagnóstico Agora" : "Solicitar Orçamento"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Star, ShieldCheck, Clock, Award, ThumbsUp } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/mock-data";

export default function Testimonials() {
  const differentials = [
    {
      icon: Clock,
      title: "Agilidade Real (Até 1h*)",
      description:
        "Sabemos que você não pode ficar desconectado. Priorizamos diagnósticos e soluções expressas no mesmo dia.",
    },
    {
      icon: ShieldCheck,
      title: "Garantia e Procedência",
      description:
        "Trabalhamos exclusivamente com equipamentos homologados e componentes de alta durabilidade com garantia.",
    },
    {
      icon: Award,
      title: "Equipe Especializada",
      description:
        "Profissionais qualificados em infraestrutura de redes, CFTV digital e arquitetura de notebooks e smart devices.",
    },
    {
      icon: ThumbsUp,
      title: "Orçamento Transparente",
      description:
        "Apresentamos o diagnóstico detalhado e as melhores alternativas de custo-benefício antes de qualquer execução.",
    },
  ];

  return (
    <section id="depoimentos" className="py-20 lg:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Diferenciais */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-3">
            Por Que Escolher a i9 Solution?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Compromisso com Velocidade, Qualidade e Segurança
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-cyan-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Prova Social / Depoimentos */}
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Quem Conhece, Recomenda
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Aprovação de Clientes em Recife e Região
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="font-bold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-cyan-400">
                    {testimonial.role} &bull; {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


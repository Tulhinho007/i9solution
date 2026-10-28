import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import ProductsShowcase from "@/components/ProductsShowcase"; // Guardado em standby
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import { getCMSData } from "@/lib/cms";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cms = await getCMSData();
  const isStoreEnabled = cms.settings.enableStore ?? siteConfig.enableStore;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <Header settings={cms.settings} />
      <main className="flex-1">
        {/* 1. Seção Principal (Hero) */}
        <HeroSection hero={cms.hero} settings={cms.settings} />

        {/* 2. Seção de Serviços e Soluções (Foco atual dos anúncios) */}
        <Services services={cms.services} settings={cms.settings} />

        {/* 3. VITRINE E CATÁLOGO - EM STANDBY (Só aparece se enableStore for true) */}
        {isStoreEnabled && (
          <ProductsShowcase
            products={cms.products}
            settings={cms.settings}
            showFullCatalogBanner={true}
          />
        )}

        {/* 4. Diferenciais e Prova Social */}
        <Testimonials />

        {/* 5. Cobertura (Recife e Região) */}
        <LocationMap />
      </main>
      <Footer settings={cms.settings} />
    </div>
  );
}

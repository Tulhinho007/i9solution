import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "i9 Solution | Diagnóstico de Notebooks, PCs Gamers e Tecnologia em Recife",
  description:
    "Especialistas em Diagnóstico Ágil e Upgrades para Notebooks e PCs Gamers, Smartphones, Redes Gigabit e Segurança Eletrônica em Recife e Região Metropolitana.",
  keywords: [
    "i9 Solution Recife",
    "Notebooks Recife",
    "PC Gamer Recife",
    "Upgrade SSD Notebook Recife",
    "Soluções em Tecnologia Recife",
    "Redes Wi-Fi Recife",
    "CFTV Recife",
  ],
  openGraph: {
    title: "i9 Solution | Notebooks, PCs Gamers e Tecnologia em Recife",
    description:
      "Diagnóstico Ágil, Upgrades de SSD NVMe/RAM e Soluções de Alta Performance para Notebooks e PCs Gamers em Recife e Região Metropolitana.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased selection:bg-cyan-500 selection:text-slate-950`}>
        {children}
      </body>
    </html>
  );
}

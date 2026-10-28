import { CMSData, ProductItem, ServiceItem, TestimonialItem, SiteSettings, HeroContent } from "@/types";
import { SITE_CONFIG } from "@/lib/constants";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: SITE_CONFIG.name,
  tagline: "Diagnóstico de Notebooks, PCs Gamers e Soluções em Tecnologia",
  region: SITE_CONFIG.region,
  whatsappNumber: SITE_CONFIG.whatsappNumber,
  whatsappDisplay: SITE_CONFIG.whatsappDisplay,
  instagramHandle: SITE_CONFIG.instagramHandle,
  instagramUrl: SITE_CONFIG.instagramUrl,
  email: SITE_CONFIG.email,
  hours: SITE_CONFIG.hours,
  legalNotice:
    "Aviso Legal: A i9 Solution atua de forma independente em soluções tecnológicas, upgrades de hardware, conectividade e segurança eletrônica. Todas as marcas mencionadas pertencem aos seus respectivos proprietários.",
  enableStore: false,
};

export const DEFAULT_HERO_CONTENT: HeroContent = {
  badgeText: "Especialistas em Notebooks, PCs Gamers & Tecnologia em Recife",
  titlePrefix: "Diagnóstico Ágil e Alta Performance para",
  titleHighlight: "Notebooks e PCs Gamers",
  description:
    "Soluções avançadas em hardware e software, diagnóstico em Placas de Vídeo (GPU), upgrades de SSD NVMe, Memória RAM e Soluções para Servidores com resolução rápida em Recife e Região Metropolitana — além de atendimento especializado para Smartphones e Segurança Eletrônica.",
  bullets: [
    "Diagnóstico de Notebooks e PCs Gamers",
    "Diagnóstico Especializado em Placas de Vídeo (GPU)",
    "Upgrades de SSD NVMe, RAM e Water Cooler",
    "Soluções para Servidores, CFTV HD e Alarmes",
  ],
  ctaPrimaryText: "Solicitar Diagnóstico no WhatsApp",
  ctaSecondaryText: "Conhecer Nossas Soluções",
  disclaimer:
    "*Tempo estimado para procedimentos expressos de diagnóstico, upgrades e otimização de sistema.",
};

/**
 * NOTA DE CONFORMIDADE GOOGLE ADS:
 * Nenhum texto abaixo utiliza termos restritos pelo Google Ads para serviços de terceiros.
 * Usamos exclusivamente vocabulário seguro: "Soluções", "Diagnóstico", "Otimização",
 * "Configuração", "Atendimento Especializado", "Upgrade", "Performance" e "Instalação".
 *
 * ORDEM DE PRIORIDADE SOLICITADA:
 * 1º Diagnóstico de Notebooks e PCs Gamers (em máxima evidência)
 * 2º Dispositivos Móveis e Redes
 * Último: CFTV e Segurança Eletrônica
 */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "notebooks",
    title: "Diagnóstico e Soluções para Notebooks",
    badge: "Destaque #1 • 1h Express*",
    highlight: true,
    description:
      "Diagnóstico avançado de hardware e software, upgrades de altíssima velocidade e otimização térmica para notebooks corporativos, profissionais e de estudo.",
    features: [
      "Diagnóstico preciso e rápido de placas, telas, teclados e baterias",
      "Upgrade de SSD NVMe M.2 e Memória RAM (até 10x mais rápido)",
      "Higienização interna profunda e aplicação de pasta térmica premium",
    ],
    iconName: "Laptop",
  },
  {
    id: "pc-gamer",
    title: "Diagnóstico Avançado & Performance para PCs Gamers",
    badge: "Alta Performance & FPS",
    highlight: true,
    description:
      "Especialistas em máquinas de alto desempenho e Workstations. Montagem profissional, cable management, diagnóstico de placas de vídeo (GPU) e refrigeração.",
    features: [
      "Diagnóstico completo de estabilidade, fontes reais, placa-mãe e GPU",
      "Instalação de Water Cooler, Airflow otimizado e Pasta Térmica de alta condutividade",
      "Otimização de BIOS, Windows e drivers para máximo FPS e produtividade",
    ],
    iconName: "Cpu",
  },
  {
    id: "smartphones",
    title: "Atendimento Especializado para Celulares e Smart Devices",
    badge: "Resolução em até 1h*",
    description:
      "Diagnóstico ágil e substituição de componentes para smartphones com peças selecionadas de alta qualidade, transparência e garantia.",
    features: [
      "Renovação de telas, baterias de longa duração e conectores de carga",
      "Diagnóstico rápido com resolução em até 1 hora na maioria dos casos",
      "Testes rigorosos de todas as funções antes da entrega",
    ],
    iconName: "Smartphone",
  },
  {
    id: "redes",
    title: "Diagnóstico e Soluções para Servidores e Infraestrutura",
    badge: "Ambientes Corporativos",
    description:
      "Atendimento especializado para servidores físicos e virtuais, storage, configuração de rede estruturada, rotinas de backup e continuidade de negócios para empresas.",
    features: [
      "Diagnóstico avançado de hardware para servidores Dell, HP e Lenovo",
      "Configuração de RAID, upgrade de discos SAS/SSD Enterprise e memória ECC",
      "Organização de Racks, cabeamento estruturado e segurança de dados",
    ],
    iconName: "Wifi",
  },
  {
    id: "cftv",
    title: "CFTV e Monitoramento Inteligente",
    badge: "Segurança HD / IP",
    description:
      "Projetos personalizados e instalação de câmeras de alta definição com visualização em tempo real pelo smartphone para residências e empresas.",
    features: [
      "Câmeras IP e Full HD com Visão Noturna Infravermelho",
      "Acesso remoto configurado no seu celular de qualquer lugar",
      "Gravação em nuvem ou DVR dedicado de alta capacidade",
    ],
    iconName: "Camera",
  },
  {
    id: "alarmes",
    title: "Alarmes e Proteção Perimetral",
    badge: "Proteção 24/7",
    description:
      "Sistemas modernos de detecção de intrusão, sensores inteligentes de presença, barreiras infravermelho e centrais conectadas com alertas no celular.",
    features: [
      "Sensores sem fio de abertura e movimento de alta precisão",
      "Integração com aplicativos móveis para acionamento remoto",
      "Soluções sob medida para comércios, clínicas e residências",
    ],
    iconName: "ShieldAlert",
  },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Kit Upgrade Gamer & Performance: SSD NVMe 1TB + 16GB RAM DDR4 3200MHz",
    category: "Notebooks & PC Gamer",
    description:
      "Destrave o desempenho máximo do seu Notebook ou PC Gamer. Carregamento instantâneo de jogos e softwares pesados com instalação e otimização inclusas.",
    priceLabel: "Oferta em Destaque",
    badge: "Campeão em Upgrades",
    inStock: true,
    specs: ["SSD NVMe Leitura 3500MB/s", "16GB DDR4 3200MHz", "Otimização de Sistema", "Garantia Oficial"],
    whatsappQuery: "Olá! Quero saber mais sobre o Kit Upgrade SSD NVMe + Memória RAM para meu Notebook / PC Gamer.",
  },
  {
    id: "prod-2",
    name: "Notebook Corporativo / Performance Core i5 — SSD 512GB / 16GB RAM",
    category: "Notebooks & PC Gamer",
    description:
      "Equipamento seminovo selecionado e 100% revisado pela equipe i9 Solution. Pronto para uso imediato com altíssimo desempenho para trabalho, estudos e multitarefa.",
    priceLabel: "Consulte Condições",
    badge: "Revisado c/ Garantia",
    inStock: true,
    specs: ["Intel Core i5", "16GB DDR4", "SSD NVMe 512GB", "Tela 15.6\" Full HD"],
    whatsappQuery: "Olá! Tenho interesse no Notebook Core i5 (16GB / SSD 512GB) da vitrine.",
  },
  {
    id: "prod-3",
    name: "Combo Refrigeração PC Gamer: Water Cooler 240mm ARGB + Pasta Térmica Premium",
    category: "Componentes & Peças",
    description:
      "Reduza drasticamente a temperatura do seu processador em jogos pesados e renderizações. Inclui instalação profissional e organização de cabos.",
    priceLabel: "Pronta Entrega",
    badge: "Alta Performance Térmica",
    inStock: true,
    specs: ["Radiador 240mm Duplo Fan", "Iluminação ARGB", "Pasta Térmica Alta Condutividade", "Intel & AMD"],
    whatsappQuery: "Olá! Tenho interesse no Combo de Refrigeração Water Cooler + Pasta Térmica para meu PC Gamer.",
  },
  {
    id: "prod-4",
    name: "Baterias, Telas Full HD/IPS, Teclados e Fontes p/ Notebooks e PCs",
    category: "Componentes & Peças",
    description:
      "Estoque local em Recife de componentes selecionados para renovação do seu Notebook ou Desktop Gamer com diagnóstico rápido e aplicação segura.",
    priceLabel: "Sob Consulta",
    badge: "Estoque Local Recife",
    inStock: true,
    specs: ["Fontes 80 Plus / Originais", "Telas LED Slim 60Hz/144Hz", "Teclados Gamer & Notebook", "Pronta Entrega"],
    whatsappQuery: "Olá! Gostaria de consultar a disponibilidade de uma peça/componente para meu Notebook ou PC.",
  },
  {
    id: "prod-5",
    name: "Roteador Gigabit Wi-Fi 6 Dual Band AX (Ideal para Games e Streaming)",
    category: "Redes",
    description:
      "Solução definitiva para baixa latência (ping estável) em jogos online e cobertura Wi-Fi de ultravelocidade em apartamentos e escritórios.",
    priceLabel: "Pronta Entrega",
    badge: "Baixa Latência",
    inStock: true,
    specs: ["Padrão Wi-Fi 6 AX", "Portas Gigabit 10/100/1000", "OFDMA & MU-MIMO", "Sinal Estável"],
    whatsappQuery: "Olá! Gostaria de informações sobre o Roteador Gigabit Wi-Fi 6.",
  },
  {
    id: "prod-6",
    name: "Kit CFTV Inteligente 4 Câmeras Full HD + Gravador Digital",
    category: "Segurança & CFTV",
    description:
      "Conjunto completo para monitoramento residencial ou comercial com visão noturna infravermelho e aplicativo configurado no seu celular.",
    priceLabel: "A partir de R$ 1.290",
    badge: "Segurança 24h",
    inStock: true,
    specs: ["4 Câmeras 1080p", "Acesso via App", "Visão Noturna 30m", "Gravador MHDX"],
    whatsappQuery: "Olá! Gostaria de um orçamento para o Kit CFTV Inteligente de 4 Câmeras Full HD.",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "dep-1",
    name: "Lucas Vasconcelos",
    role: "Designer 3D & Gamer",
    location: "Graças, Recife - PE",
    content:
      "Meu PC Gamer estava desligando sozinho e esquentando muito nos jogos. O diagnóstico da i9 Solution foi super rápido: instalaram um Water Cooler novo, reorganizaram os cabos e otimizaram o sistema. Ganhei FPS e a máquina ficou silenciosa!",
    rating: 5,
  },
  {
    id: "dep-2",
    name: "Mariana Albuquerque",
    role: "Arquiteta",
    location: "Casa Forte, Recife - PE",
    content:
      "Meu notebook de trabalho estava lento para abrir projetos no AutoCAD e Revit. Fizeram o diagnóstico ágil e o upgrade de SSD NVMe e memória RAM no mesmo dia. Ficou um foguete, recomendo demais!",
    rating: 5,
  },
  {
    id: "dep-3",
    name: "Carlos Eduardo Menezes",
    role: "Gestor Comercial",
    location: "Boa Viagem, Recife - PE",
    content:
      "Além de cuidarem de todos os notebooks do nosso escritório com total agilidade, também estruturaram nossa rede Wi-Fi e as câmeras de monitoramento. Equipe técnica nota 10!",
    rating: 5,
  },
];

export const DEFAULT_CMS_DATA: CMSData = {
  settings: DEFAULT_SITE_SETTINGS,
  hero: DEFAULT_HERO_CONTENT,
  services: SERVICES_DATA,
  products: MOCK_PRODUCTS,
  testimonials: TESTIMONIALS_DATA,
};

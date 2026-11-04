import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://raylab.pages.dev"),
  title: {
    default: "RayLab — Académie d'Ingénierie & Cybersécurité Opérationnelle",
    template: "%s | RayLab",
  },
  description:
    "Plateforme d'élite en Informatique, Programmation Python, Administration Système Linux, Réseaux et Cybersécurité (70% Pratique / 30% Théorie). Laboratoire virtuel & Terminal interactif.",
  keywords: [
    "RayLab",
    "Cybersécurité",
    "Python",
    "Ethical Hacking",
    "Linux",
    "SOC",
    "Pentest",
    "CTF",
    "CyberPath",
    "AppSec",
    "DevSecOps",
    "DFIR",
  ],
  authors: [{ name: "RayLab Engineering Team" }],
  creator: "RayLab",
  publisher: "RayLab",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://raylab.pages.dev",
    siteName: "RayLab",
    title: "RayLab — Learn. Build. Secure. Become.",
    description:
      "Plateforme d'élite en Informatique et Cybersécurité avec Terminal Linux interactif et moteur Python WebAssembly intégré.",
    images: [
      {
        url: "/raylab-banner.png",
        width: 1200,
        height: 630,
        alt: "Bannière Officielle RayLab — Académie de Cybersécurité & Lab Virtuel",
        type: "image/png",
      },
      {
        url: "/raylab-banner.jpg",
        width: 1200,
        height: 630,
        alt: "RayLab Official Banner",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RayLab — Académie d'Ingénierie & Cybersécurité",
    description:
      "Terminal Linux interactif, live runner Python WebAssembly et arène CTF en direct dans votre navigateur.",
    images: ["https://raylab.pages.dev/raylab-banner.png"],
    creator: "@raylab",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://raylab.pages.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "RayLab",
    url: "https://raylab.pages.dev",
    logo: "https://raylab.pages.dev/raylab-logo.png",
    image: "https://raylab.pages.dev/raylab-banner.png",
    description:
      "Plateforme d'apprentissage et de préparation de carrière en Informatique, Programmation Python, Administration Système Linux, Réseaux et Cybersécurité Opérationnelle.",
    sameAs: ["https://github.com/raysnothing-sketch/raylab"],
  };

  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian text-ivory min-h-screen flex flex-col selection:bg-gold selection:text-obsidian antialiased">
        <AppProvider>
          <AnnouncementBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

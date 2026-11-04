import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiMentorModal from "@/components/AiMentorModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://raylab.tech"),
  title: "RayLab — Learn. Build. Secure. Become.",
  description:
    "Plateforme d'apprentissage et de préparation de carrière en Informatique, Programmation Python, Administration Système Linux, Réseaux et Cybersécurité Opérationnelle.",
  openGraph: {
    title: "RayLab — Learn. Build. Secure. Become.",
    description:
      "Institut technique & laboratoire d'ingénierie logicielle et cybersécurité. Mentor IA RayBot intégré.",
    images: [
      {
        url: "/raylab-banner.svg",
        width: 1200,
        height: 630,
        alt: "RayLab Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-obsidian text-ivory min-h-screen flex flex-col selection:bg-gold selection:text-obsidian antialiased">
        <AppProvider>
          <AnnouncementBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AiMentorModal />
        </AppProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";

import { ChatPanel } from "@/components/chat/ChatPanel";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sditecnologia.cl"),
  title: "SDI Tecnología | El sistema de tu proceso, no el de un SaaS",
  description:
    "Construimos el sistema a la medida del proceso de tu pyme, del médico al industrial, en reemplazo de las planillas y suscripciones que hoy usas.",
  icons: {
    icon: "/logo_oficial.png",
    apple: "/logo_oficial.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bricolage.variable} ${schibsted.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatPanel />
      </body>
    </html>
  );
}

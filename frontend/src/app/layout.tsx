import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ToasterProvider from "@/components/providers/ToasterProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CADService | Soluções Profissionais em Projetos CAD e Engenharia",
    template: "%s | CADService",
  },
  description:
    "Soluções especializadas em projetos CAD, modelagem 3D e engenharia industrial. Orçamentos personalizados para indústria e construção civil.",
  keywords: [
    "CAD",
    "projetos",
    "engenharia",
    "modelagem 3D",
    "industrial",
    "orçamento",
  ],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "CADService | Soluções Profissionais em Projetos CAD e Engenharia",
    description:
      "Soluções especializadas em projetos CAD, modelagem 3D e engenharia industrial.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        <Header />
        <main className="flex-1">
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}


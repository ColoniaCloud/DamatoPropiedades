import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | D'Amato Propiedades",
    default: "D'Amato Propiedades — Inmobiliaria en Buenos Aires",
  },
  description:
    "Encontrá tu próxima propiedad en Buenos Aires con D'Amato Propiedades. Departamentos, casas, PH, locales en venta y alquiler.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://damatopropiedades.com.ar"
  ),
  openGraph: {
    siteName: "D'Amato Propiedades",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fafbfc]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

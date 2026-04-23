import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/contact/WhatsAppFloat";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | D'Amato Propiedades",
    default: "D'Amato Propiedades — Inmobiliaria en Villa Devoto y General San Martín",
  },
  description:
    "Más de 35 años asesorando familias en la compra, venta y alquiler de propiedades en Villa Devoto, CABA y General San Martín. D'Amato Propiedades.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://damatopropiedades.com.ar"
  ),
  openGraph: {
    siteName: "D'Amato Propiedades",
    locale: "es_AR",
    type: "website",
    images: [
      "/hero-nosotros.jpg"
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "/hero-nosotros.jpg"
    ],
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
    <html lang="es-AR" className={`h-full antialiased ${montserrat.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/logos/Icono.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#fafbfc]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

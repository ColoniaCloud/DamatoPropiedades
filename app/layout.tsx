import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/contact/WhatsAppFloat";
import CafeTab from "@/components/contact/CafeTab";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://damatopropiedades.com.ar";

export const metadata: Metadata = {
  title: {
    template: "%s | D'Amato Propiedades",
    default: "D'Amato Propiedades — Tu inmobiliaria en Villa Devoto",
  },
  description:
    "Más de 35 años comprando, vendiendo y alquilando propiedades " +
    "en Villa Devoto y zona norte de Buenos Aires. " +
    "Departamentos, casas, PHs y terrenos.",
  keywords: [
    "inmobiliaria Villa Devoto",
    "propiedades en venta Buenos Aires",
    "alquiler departamentos Villa Devoto",
    "D'Amato Propiedades",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://damatopropiedades.com.ar",
    siteName: "D'Amato Propiedades",
    images: [
      {
        url: "https://damatopropiedades.com.ar/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'Amato Propiedades — Villa Devoto",
      },
    ],
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
    <html lang="es-AR" className={`h-full antialiased ${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-full flex flex-col bg-[#fafbfc]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CafeTab />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

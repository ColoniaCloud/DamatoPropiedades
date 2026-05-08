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

const SITE_TITLE = "D'Amato Propiedades — Tu inmobiliaria de confianza en Villa Devoto";
const SITE_DESCRIPTION =
  "Tu inmobiliaria de confianza en Villa Devoto. Más de 35 años asesorando familias en la compra, venta y alquiler de propiedades. D'Amato Propiedades.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://damatopropiedades.com.ar";
const OG_IMAGE = "/og-image.jpg";

export const metadata: Metadata = {
  title: {
    template: "%s | D'Amato Propiedades",
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "D'Amato Propiedades",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "D'Amato Propiedades — Inmobiliaria en Villa Devoto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
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

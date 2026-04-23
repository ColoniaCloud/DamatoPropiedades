import type { Metadata } from "next";
import type { Property, Development } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import TaglineBanner from "@/components/home/TaglineBanner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyUs from "@/components/home/WhyUs";
import Emprendimientos from "@/components/home/Emprendimientos";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { getProperties, getDevelopments } from "@/lib/tokko";

export const metadata: Metadata = {
  title: "D'Amato Propiedades — Inmobiliaria en Villa Devoto y General San Martín",
  description:
    "Más de 35 años asesorando familias en la compra, venta y alquiler de propiedades en Villa Devoto, CABA y General San Martín. Tasaciones, venta e inversiones inmobiliarias.",
};

export const revalidate = 300;

export default async function HomePage() {
  let featuredProperties: Property[] = [];
  let developments: Development[] = [];

  try {
    const data = await getProperties({ limit: 6, order_by: "-created_at" });
    featuredProperties = data.objects;
  } catch {
    // fail gracefully
  }

  try {
    developments = (await getDevelopments()).filter((d) => d.display_on_web);
  } catch {
    // fail gracefully
  }

  return (
    <>
      <Hero />
      <TaglineBanner />
      <FeaturedProperties properties={featuredProperties} />
      <Emprendimientos developments={developments} />
      <WhyUs />

      {/* CTA Section */}
      <section className="py-14 lg:py-20 bg-[#0c1b2e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#00b4d8] text-sm font-semibold uppercase tracking-widest">
            Propietarios
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            ¿Querés vender o alquilar tu propiedad?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Tasamos tu propiedad sin cargo y la publicamos en los principales
            portales. Contactanos hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              message="Hola, quiero vender/alquilar mi propiedad. ¿Pueden asesorarme?"
              size="lg"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#00b4d8] text-white font-semibold rounded-lg px-6 py-4 text-base transition-colors min-h-[44px]"
            >
              Formulario de contacto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import type { Property, Development } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyUs from "@/components/home/WhyUs";
import EmprendimientosSlider from "@/components/home/EmprendimientosSlider";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import PropertiesMapClient from "@/components/home/PropertiesMapClient";
import { getAllProperties, getFeaturedProperties, getDevelopments, getBarrios } from "@/lib/tokko";

export const metadata: Metadata = {
  title: "D'Amato Propiedades — Inmobiliaria en Villa Devoto",
  description:
    "Encontrá tu próxima propiedad en Villa Devoto y alrededores. " +
    "Departamentos, casas, PHs, terrenos y emprendimientos en pozo. " +
    "Más de 35 años de experiencia.",
  openGraph: {
    title: "D'Amato Propiedades — Inmobiliaria en Villa Devoto",
    description:
      "Departamentos, casas, PHs y terrenos en Villa Devoto. " +
      "Venta, alquiler y emprendimientos en pozo.",
  },
};

export const revalidate = 300;

export default async function HomePage() {
  let featuredProperties: Property[] = [];
  let mapProperties: Property[] = [];
  let developments: Development[] = [];
  let barrios: string[] = [];

  try {
    featuredProperties = await getFeaturedProperties();
  } catch (err) {
    console.error("[home] getFeaturedProperties error:", err);
  }

  try {
    mapProperties = (await getAllProperties()).filter(
      (p) => p.geo_lat != null && p.geo_long != null
    );
  } catch (err) {
    console.error("[home] getAllProperties error:", err);
  }

  try {
    developments = (await getDevelopments()).filter((d) => d.display_on_web);
  } catch (err) {
    console.error("[home] getDevelopments error:", err);
  }

  try {
    barrios = await getBarrios();
  } catch (err) {
    console.error("[home] getBarrios error:", err);
  }

  return (
    <>
      <Hero barrios={barrios} />

      <EmprendimientosSlider developments={developments} />

      <FeaturedProperties properties={featuredProperties} />

      {/* Properties map */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[#1a5fb4] text-sm font-semibold uppercase tracking-widest">
              Zona de cobertura
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a2e] mt-1">
              Propiedades disponibles en el mapa
            </h2>
            <p className="text-[#5a5a6e] mt-1 text-sm">
              {mapProperties.length > 0
                ? `${mapProperties.length} propiedades activas — hacé clic en un pin para ver detalles`
                : "Cargando propiedades…"}
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-[#e2e4e8] shadow-sm"
            style={{ height: 500 }}
          >
            <PropertiesMapClient properties={mapProperties} />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-end">
            {[
              { color: "#1a5fb4", label: "Venta" },
              { color: "#10b981", label: "Alquiler" },
              { color: "#00b4d8", label: "Temporario" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-[#5a5a6e]">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
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
            Tasamos tu propiedad de manera profesional y la publicamos en los principales
            portales. Contactanos hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              message="Hola, quiero vender/alquilar mi propiedad. ¿Pueden asesorarme?"
              size="lg"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#00b4d8] text-white font-semibold rounded-lg px-6 py-4 text-base transition-colors min-h-11"
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


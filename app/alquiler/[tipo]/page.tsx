import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Property } from "@/lib/types";
import PropertyGrid from "@/components/property/PropertyGrid";
import { searchProperties } from "@/lib/tokko";
import { PROPERTY_TYPES } from "@/lib/constants";

interface PageProps {
  params: Promise<{ tipo: string }>;
}

function findType(slug: string) {
  return PROPERTY_TYPES.find((t) => t.slug === slug);
}

export async function generateStaticParams() {
  return PROPERTY_TYPES.map((t) => ({ tipo: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  const propType = findType(tipo);
  if (!propType) return {};
  return {
    title: `${propType.name}s en Alquiler en Buenos Aires | D'Amato Propiedades`,
    description: `Encontrá ${propType.name.toLowerCase()}s en alquiler en Villa Devoto. Amplio catálogo con todos los detalles y fotos.`,
  };
}

export const revalidate = 300;

export default async function AlquilerTipoPage({ params }: PageProps) {
  const { tipo } = await params;
  const propType = findType(tipo);
  if (!propType) notFound();

  let properties: Property[] = [];
  let totalCount = 0;
  try {
    const result = await searchProperties({
      operation_types: ["Alquiler"],
      property_types: [propType.id],
    }, { limit: 12 });
    properties = result.objects;
    totalCount = result.meta.total_count;
  } catch {
    // show empty state
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0c1b2e] pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-white/50 mb-3">
            <a href="/" className="hover:text-white/80">Inicio</a>
            <span className="mx-2">›</span>
            <a href="/propiedades?operacion=alquiler" className="hover:text-white/80">Alquiler</a>
            <span className="mx-2">›</span>
            <span className="text-white/80">{propType.name}s</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {propType.name}s en Alquiler
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            {totalCount > 0 ? `${totalCount} propiedades disponibles` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyGrid properties={properties} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Property } from "@/lib/types";
import PropertyGrid from "@/components/property/PropertyGrid";
import FilterDrawer from "@/components/search/FilterDrawer";
import { searchProperties, getBarrios } from "@/lib/tokko";
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
    title: `${propType.name}s en Venta en Buenos Aires | D'Amato Propiedades`,
    description: `Propiedades en venta en Villa Devoto y zona norte de Buenos Aires. ${propType.name}s disponibles con financiación y apto crédito.`,
  };
}

export const revalidate = 300;

export default async function VentaTipoPage({ params }: PageProps) {
  const { tipo } = await params;
  const propType = findType(tipo);
  if (!propType) notFound();

  let properties: Property[] = [];
  let totalCount = 0;
  let barrios: string[] = [];
  try {
    const [result, barriosResult] = await Promise.all([
      searchProperties({
        operation_types: ["Venta"],
        property_types: [propType.id],
      }, { limit: 12 }),
      getBarrios(),
    ]);
    properties = result.objects;
    totalCount = result.meta.total_count;
    barrios = barriosResult;
  } catch (err) {
    console.error(`[venta/${tipo}] Error fetching properties:`, err);
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0c1b2e] pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-white/50 mb-3">
            <Link href="/" className="hover:text-white/80">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/propiedades?operacion=venta" className="hover:text-white/80">Venta</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">{propType.name}s</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {propType.name}s en Venta
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            {totalCount > 0 ? `${totalCount} propiedades disponibles` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Suspense>
            <FilterDrawer
              lockedOperacion="venta"
              initialTypes={[String(propType.id)]}
              barrios={barrios}
            />
          </Suspense>
          <div className="flex-1 min-w-0">
            <PropertyGrid properties={properties} />
          </div>
        </div>
      </div>
    </div>
  );
}



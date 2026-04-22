import type { Metadata } from "next";
import type { Property } from "@/lib/types";
import PropertyGrid from "@/components/property/PropertyGrid";
import { searchProperties } from "@/lib/tokko";

export const metadata: Metadata = {
  title: "Alquiler Temporario en Villa Devoto y General San Martín | D'Amato Propiedades",
  description:
    "Propiedades en alquiler temporario en Villa Devoto y General San Martín. Departamentos, casas y PH disponibles por temporada.",
};

export const revalidate = 300;

export default async function AlquilerTemporarioPage() {
  let properties: Property[] = [];
  let totalCount = 0;
  try {
    const result = await searchProperties({
      operation_types: ["Alquiler temporario"],
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Alquiler Temporario
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            {totalCount > 0
              ? `${totalCount} propiedades disponibles`
              : "Propiedades en alquiler temporario"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyGrid properties={properties} />
      </div>
    </div>
  );
}

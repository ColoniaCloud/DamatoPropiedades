import PropertyCard from "./PropertyCard";
import SkeletonCard from "./SkeletonCard";
import type { Property } from "@/lib/types";

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function PropertyGrid({
  properties,
  loading = false,
  skeletonCount = 6,
}: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-16">
        <p className="text-[#5a5a6e] text-lg">No se encontraron propiedades.</p>
        <p className="text-[#5a5a6e] text-sm mt-2">
          Intentá con otros filtros o consultanos directamente.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

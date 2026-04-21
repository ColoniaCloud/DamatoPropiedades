import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/types";

interface SimilarPropertiesProps {
  properties: Property[];
}

export default function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (!properties.length) return null;

  return (
    <section className="py-10 border-t border-[#e2e4e8]">
      <h2 className="font-display text-2xl font-bold text-[#1a1a2e] mb-6">
        Propiedades similares
      </h2>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto snap-x pb-4 scrollbar-hide">
          {properties.map((p) => (
            <div key={p.id} className="snap-start flex-shrink-0 w-[80vw]">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.slice(0, 3).map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}

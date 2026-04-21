import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import type { Property } from "@/lib/types";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[#1a5fb4] text-sm font-semibold uppercase tracking-widest">
            Selección especial
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-1">
            Propiedades Destacadas
          </h2>
        </div>
        <Link
          href="/propiedades"
          className="hidden sm:flex items-center gap-1 text-[#1a5fb4] text-sm font-medium hover:gap-2 transition-all"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="sm:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto snap-x pb-4 scrollbar-hide">
          {properties.map((property) => (
            <div key={property.id} className="snap-start flex-shrink-0 w-[80vw]">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile link */}
      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 text-[#1a5fb4] text-sm font-medium border border-[#1a5fb4] rounded-lg px-5 py-2.5"
        >
          Ver todas las propiedades <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

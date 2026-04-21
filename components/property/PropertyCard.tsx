import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2 } from "lucide-react";
import { cn, getMainOperation, getMainPrice, getOperationColor, getPropertyPath, getNeighborhood } from "@/lib/utils";
import type { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const operation = getMainOperation(property);
  const price = getMainPrice(property);
  const photo = property.photos?.[0]?.image;
  const neighborhood = getNeighborhood(property);
  const path = getPropertyPath(property);

  return (
    <Link
      href={path}
      className={cn(
        "group block bg-white rounded-xl overflow-hidden border border-[#e2e4e8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {photo ? (
          <Image
            src={photo}
            alt={property.publication_title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a5fb4]/20 to-[#0c1b2e]/40 flex items-center justify-center">
            <span className="text-white/40 text-sm">Sin foto</span>
          </div>
        )}

        {/* Operation badge */}
        {operation && (
          <span
            className={cn(
              "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full",
              getOperationColor(operation.operation_type)
            )}
          >
            {operation.operation_type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-[#1a5fb4] font-bold text-lg leading-tight mb-1">
          {price}
        </p>

        {/* Address */}
        <p className="text-[#1a1a2e] font-medium text-sm leading-snug line-clamp-1 mb-0.5">
          {property.fake_address}
        </p>

        {/* Neighborhood */}
        {neighborhood && (
          <p className="text-[#5a5a6e] text-xs mb-3">{neighborhood}</p>
        )}

        {/* Chips */}
        <div className="flex items-center gap-3 text-xs text-[#5a5a6e]">
          {property.room_amount > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" />
              {property.room_amount} amb.
            </span>
          )}
          {property.bathroom_amount > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathroom_amount} baño{property.bathroom_amount !== 1 ? "s" : ""}
            </span>
          )}
          {property.total_surface && (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              {property.total_surface} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

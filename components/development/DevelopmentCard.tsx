import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Building2 } from "lucide-react";
import type { Development } from "@/lib/types";
import { getDevelopmentPath, formatConstructionDate, getConstructionStatusInfo } from "@/lib/utils";

interface Props {
  development: Development;
  priority?: boolean;
}

export default function DevelopmentCard({ development, priority }: Props) {
  const {
    name,
    fake_address,
    photos,
    construction_status,
    construction_date,
    is_starred_on_web,
    location,
  } = development;

  const photo = photos?.[0];
  const neighborhood = location?.divisions?.[0]?.name ?? "";
  const statusInfo = getConstructionStatusInfo(construction_status);
  const path = getDevelopmentPath(development);

  return (
    <Link
      href={path}
      className="group block rounded-2xl overflow-hidden border border-[#e2e4e8] bg-white hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#f4f7fb]">
        {photo ? (
          <Image
            src={photo.image}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-12 h-12 text-[#c0c4cc]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2e]/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {is_starred_on_web && (
            <span className="bg-[#00b4d8] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Destacado
            </span>
          )}
          <span className="bg-[#0c1b2e]/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-[#1a1a2e] text-lg leading-tight mb-1 group-hover:text-[#1a5fb4] transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 text-[#5a5a6e] text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#00b4d8]" />
          <span>{neighborhood || fake_address}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex gap-1 mb-1.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  step <= construction_status ? "bg-[#1a5fb4]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[#5a5a6e]">
            <span>En pozo</span>
            <span>Terminado</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#5a5a6e] text-xs">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#00b4d8]" />
          <span>Entrega estimada: {formatConstructionDate(construction_date)}</span>
        </div>
      </div>
    </Link>
  );
}

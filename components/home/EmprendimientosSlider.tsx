"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Development } from "@/lib/types";
import { getDevelopmentPath, formatConstructionDate, getConstructionStatusInfo } from "@/lib/utils";

interface Props {
  developments: Development[];
}

export default function EmprendimientosSlider({ developments }: Props) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + developments.length) % developments.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, developments.length]
  );

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (developments.length <= 1) return;
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, goTo, developments.length]);

  if (!developments.length) return null;

  const dev = developments[current];
  const photo = dev.photos?.[0];
  const neighborhood = dev.location?.divisions?.[1]?.name ?? dev.location?.divisions?.[0]?.name ?? dev.location?.full_location ?? "";
  const statusInfo = getConstructionStatusInfo(dev.construction_status);
  const path = getDevelopmentPath(dev);

  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-[#0c1b2e]">
      {/* Background image */}
      {photo && (
        <div
          key={dev.id}
          className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={photo.image}
            alt={dev.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0c1b2e]/90 via-[#0c1b2e]/60 to-[#0c1b2e]/20" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0c1b2e]/70 via-transparent to-transparent" />

      {/* Content — respects site max-width */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-36 sm:pb-20">
        {/* Eyebrow */}
        <span className="text-[#00b4d8] text-xs font-semibold uppercase tracking-widest mb-3">
          Emprendimientos
        </span>

        {/* Title */}
        <Link href={path} className="group">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight group-hover:text-[#00b4d8] transition-colors max-w-2xl">
            {dev.name}
          </h2>
        </Link>

        {/* Location */}
        {(neighborhood || dev.fake_address) && (
          <div className="flex items-center gap-1.5 mt-3 text-white/70">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm">
              {neighborhood ? `${neighborhood}${dev.fake_address ? ` — ${dev.fake_address}` : ""}` : dev.fake_address}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          {/* Estimated delivery */}
          <div className="flex items-center gap-1.5 text-white/80">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">
              Entrega estimada: {formatConstructionDate(dev.construction_date)}
            </span>
          </div>

          {/* Status badge */}
          <span
            className={`${statusInfo.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-4">
          <Link
            href={path}
            className="inline-flex items-center gap-2 bg-[#00b4d8] hover:bg-[#0096b8] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors min-h-11"
          >
            Ver emprendimiento
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/emprendimientos"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Ver todos
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      {developments.length > 1 && (
        <>
          {/* Mobile: flechas centradas sobre los dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4 sm:hidden">
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop: flechas en los laterales */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Anterior"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Siguiente"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {developments.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-[#00b4d8]"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

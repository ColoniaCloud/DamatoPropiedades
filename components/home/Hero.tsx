"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/lib/constants";

const OPERATION_OPTIONS = OPERATION_TYPES.map((o) => ({
  value: o.slug,
  label: o.label,
}));

export default function Hero() {
  const router = useRouter();
  const [operation, setOperation] = useState("venta");
  const [typeId, setTypeId] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("operacion", operation);
    if (typeId) params.set("tipo", typeId);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1b2e]/70 via-[#0c1b2e]/60 to-[#0c1b2e]/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <span className="inline-block bg-[#00b4d8]/20 border border-[#00b4d8]/40 text-[#00b4d8] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Inmobiliaria en Buenos Aires
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Encontrá tu próximo
          <span className="text-[#00b4d8]"> hogar</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Más de 35 años asesorando familias en la compra, venta y alquiler de
          propiedades.
        </p>

        {/* Search box */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
          {/* Operation tabs */}
          <div className="flex gap-1 mb-4 bg-white/10 rounded-lg p-1">
            {OPERATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOperation(opt.value)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all min-h-[40px] ${
                  operation === opt.value
                    ? "bg-white text-[#1a5fb4] shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Filters row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              className="flex-1 border border-white/20 rounded-lg px-3 py-3 text-sm text-white bg-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 min-h-[44px]"
            >
              <option value="">Tipo de propiedad</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="bg-[#00b4d8] hover:bg-[#0096b7] text-[#1a1a2e] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors min-h-[44px] whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

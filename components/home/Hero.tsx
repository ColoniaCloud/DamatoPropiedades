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
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1b2e]/70 via-[#0c1b2e]/60 to-[#0c1b2e]/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <span className="inline-block bg-[#e8b931]/20 border border-[#e8b931]/40 text-[#e8b931] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Inmobiliaria en Buenos Aires
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Encontrá tu próximo
          <span className="text-[#e8b931]"> hogar</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Más de 20 años asesorando familias en la compra, venta y alquiler de
          propiedades en CABA.
        </p>

        {/* Search box */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-2xl mx-auto">
          {/* Operation tabs */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
            {OPERATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOperation(opt.value)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all min-h-[40px] ${
                  operation === opt.value
                    ? "bg-[#1a5fb4] text-white shadow-sm"
                    : "text-[#5a5a6e] hover:text-[#1a1a2e]"
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
              className="flex-1 border border-[#e2e4e8] rounded-lg px-3 py-3 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-[44px]"
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
              className="bg-[#e8b931] hover:bg-[#d4a82a] text-[#1a1a2e] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors min-h-[44px] whitespace-nowrap"
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

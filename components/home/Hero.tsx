"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Check, Home, MapPin, BedDouble } from "lucide-react";
import { motion } from "framer-motion";
import { PROPERTY_TYPES, OPERATION_TYPES, ROOM_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const OPERATION_OPTIONS = OPERATION_TYPES.map((o) => ({
  value: o.slug,
  label: o.label,
}));

// Locations derived from live API data
const LOCATION_OPTIONS = [
  { value: "", label: "Todos los barrios" },
  { value: "San Martin", label: "San Martín" },
  { value: "Villa Devoto", label: "Villa Devoto" },
  { value: "Villa del Parque", label: "Villa del Parque" },
  { value: "Monte Castro", label: "Monte Castro" },
  { value: "Belgrano", label: "Belgrano" },
  { value: "Caseros", label: "Caseros" },
  { value: "Villa Luro", label: "Villa Luro" },
  { value: "Villa Crespo", label: "Villa Crespo" },
  { value: "Villa Ortuzar", label: "Villa Ortuzar" },
  { value: "Congreso", label: "Congreso" },
  { value: "Monserrat", label: "Monserrat" },
];

export default function Hero() {
  const router = useRouter();
  const [operation, setOperation] = useState("venta");
  const [typeId, setTypeId] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  function toggleRoom(r: string) {
    setRooms((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  }

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("operacion", operation);
    if (typeId) params.set("tipo", typeId);
    rooms.forEach((r) => params.append("ambientes", r));
    if (location) params.set("barrio", location);
    router.push(`/propiedades?${params.toString()}`);
  }

  const selectedType = PROPERTY_TYPES.find((t) => String(t.id) === typeId);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/deelc02ob/video/upload/q_auto/f_auto/v1776909598/15443517_3840_2160_25fps_xprrb6.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#0c1b2e]/70 via-[#0c1b2e]/60 to-[#0c1b2e]/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="inline-block bg-[#00b4d8]/20 border border-[#00b4d8]/40 text-[#00b4d8] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
        >
          Inmobiliaria en Buenos Aires
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
        >
          Encontrá tu próximo
          <span className="text-[#00b4d8]"> hogar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="text-white/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto"
        >
          Más de 35 años asesorando familias en la compra, venta y alquiler de
          propiedades.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto"
        >
          {/* Operation tabs */}
          <div className="relative flex gap-1 mb-4 bg-white/10 rounded-lg p-1">
            {OPERATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOperation(opt.value)}
                className="relative flex-1 py-2 px-3 rounded-md text-sm font-medium min-h-10 z-10"
              >
                {operation === opt.value && (
                  <motion.div
                    layoutId="hero-tab-indicator"
                    className="absolute inset-0 bg-white rounded-md shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-150 ${
                    operation === opt.value ? "text-[#1a5fb4]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Row 1: Tipo + Ubicación */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            {/* Property type custom dropdown */}
            <div ref={dropdownRef} className="flex-1 relative">
              <button
                type="button"
                onClick={() => setTypeOpen((v) => !v)}
                className="w-full flex items-center justify-between border border-white/20 rounded-lg px-3 py-3 text-sm text-white bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 min-h-11 transition-colors"
              >
                <span className={`flex items-center gap-2 ${selectedType ? "text-white" : "text-white/50"}`}>
                  <Home className="w-4 h-4 shrink-0" />
                  {selectedType ? selectedType.name : "Tipo de propiedad"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ml-2 ${
                    typeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {typeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-1.5 z-30 overflow-hidden rounded-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{
                    background: "rgba(12,27,46,0.97)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setTypeId(""); setTypeOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/8 group"
                    >
                      <span className={!typeId ? "text-[#00b4d8]" : "text-white/60 group-hover:text-white"}>
                        Todos los tipos
                      </span>
                      {!typeId && <Check className="w-3.5 h-3.5 text-[#00b4d8]" />}
                    </button>

                    <div className="mx-3 my-1 h-px bg-white/10" />

                    {PROPERTY_TYPES.map((t) => {
                      const isSelected = typeId === String(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => { setTypeId(String(t.id)); setTypeOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/8 group"
                        >
                          <span className={isSelected ? "text-[#00b4d8]" : "text-white/70 group-hover:text-white"}>
                            {t.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#00b4d8]" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Location custom dropdown */}
            <div ref={locationRef} className="flex-1 relative">
              <button
                type="button"
                onClick={() => setLocationOpen((v) => !v)}
                className="w-full flex items-center justify-between border border-white/20 rounded-lg px-3 py-3 text-sm text-white bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 min-h-11 transition-colors"
              >
                <span className={`flex items-center gap-2 ${location ? "text-white" : "text-white/50"}`}>
                  <MapPin className="w-4 h-4 shrink-0" />
                  {LOCATION_OPTIONS.find((o) => o.value === location)?.label ?? "Todos los barrios"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ml-2 ${
                    locationOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-1.5 z-30 overflow-hidden rounded-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{
                    background: "rgba(12,27,46,0.97)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div className="py-1">
                    {LOCATION_OPTIONS.map((opt) => {
                      const isSelected = location === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => { setLocation(opt.value); setLocationOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/8 group"
                        >
                          <span className={isSelected ? "text-[#00b4d8]" : "text-white/70 group-hover:text-white"}>
                            {opt.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#00b4d8]" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Row 2: Ambientes + Buscar */}
          <div className="flex items-center gap-3">
            {/* Rooms label + buttons */}
            <div className="flex items-center gap-2 flex-1">
              <div className="hidden sm:flex flex-col items-center justify-center gap-0.5 h-11">
                <span className="text-xs text-white/50 whitespace-nowrap leading-none">Amb.</span>
                <BedDouble className="w-3.5 h-3.5 text-white/40" />
              </div>
              <div className="flex gap-1.5 flex-1">
                {ROOM_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRoom(String(r))}
                    className={cn(
                      "flex-1 py-2 rounded-lg border text-sm font-medium min-h-11 transition-colors",
                      rooms.includes(String(r))
                        ? "bg-white text-[#1a5fb4] border-white"
                        : "border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/10"
                    )}
                  >
                    {r === 4 ? "4+" : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="bg-[#00b4d8] hover:bg-[#0096b7] text-[#1a1a2e] font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors min-h-11 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </motion.div>
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

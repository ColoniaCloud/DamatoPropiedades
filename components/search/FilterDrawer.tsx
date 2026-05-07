"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROPERTY_TYPES, OPERATION_TYPES, ROOM_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FilterDrawer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [operation, setOperation] = useState(searchParams.get("operacion") || "");
  const [types, setTypes] = useState<string[]>(searchParams.getAll("tipo"));
  const [rooms, setRooms] = useState<string[]>(searchParams.getAll("ambientes"));
  const [currency, setCurrency] = useState<"ARS" | "USD">(
    (searchParams.get("moneda") as "ARS" | "USD") || "ARS"
  );
  const [priceFrom, setPriceFrom] = useState(searchParams.get("precio_min") || "");
  const [priceTo, setPriceTo] = useState(searchParams.get("precio_max") || "");
  const [surfaceMin, setSurfaceMin] = useState(searchParams.get("superficie_min") || "");
  const [withParking, setWithParking] = useState(searchParams.get("cochera") === "1");
  const [creditEligible, setCreditEligible] = useState(searchParams.get("credito") === "1");
  const [tagIds, setTagIds] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) ?? []
  );
  const [withSuite, setWithSuite] = useState(searchParams.get("suite") === "1");

  function toggleType(id: string) {
    setTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function toggleRoom(r: string) {
    setRooms((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  }

  function toggleTag(id: string) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function applyFilters() {
    const params = new URLSearchParams();
    if (operation) params.set("operacion", operation);
    types.forEach((t) => params.append("tipo", t));
    rooms.forEach((r) => params.append("ambientes", r));
    params.set("moneda", currency);
    if (priceFrom) params.set("precio_min", priceFrom);
    if (priceTo) params.set("precio_max", priceTo);
    if (surfaceMin) params.set("superficie_min", surfaceMin);
    if (withParking) params.set("cochera", "1");
    if (creditEligible) params.set("credito", "1");
    if (tagIds.length > 0) params.set("tags", tagIds.join(","));
    if (withSuite) params.set("suite", "1");
    router.push(`/propiedades?${params.toString()}`);
    setOpen(false);
  }

  function clearFilters() {
    setOperation("");
    setTypes([]);
    setRooms([]);
    setCurrency("ARS");
    setPriceFrom("");
    setPriceTo("");
    setSurfaceMin("");
    setWithParking(false);
    setCreditEligible(false);
    setTagIds([]);
    setWithSuite(false);
    router.push("/propiedades");
    setOpen(false);
  }

  const activeCount = [
    operation,
    ...types,
    ...rooms,
    priceFrom,
    priceTo,
    surfaceMin,
    withParking ? "1" : "",
    creditEligible ? "1" : "",
    ...tagIds,
    withSuite ? "1" : "",
  ].filter(Boolean).length;

  const contentProps = {
    operation, setOperation,
    types, toggleType,
    rooms, toggleRoom,
    currency, setCurrency,
    priceFrom, setPriceFrom,
    priceTo, setPriceTo,
    surfaceMin, setSurfaceMin,
    withParking, setWithParking,
    creditEligible, setCreditEligible,
    tagIds, toggleTag,
    withSuite, setWithSuite,
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-30 bg-[#1a5fb4] text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-lg font-semibold text-sm min-h-11"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtrar
        {activeCount > 0 && (
          <span className="bg-[#00b4d8] text-[#1a1a2e] rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl transition-transform duration-300 ease-out lg:hidden max-h-[90vh] flex flex-col",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e4e8]">
          <h2 className="font-semibold text-[#1a1a2e]">Filtros</h2>
          <button onClick={() => setOpen(false)} className="p-1 text-[#5a5a6e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          <FilterContent {...contentProps} />
        </div>

        <div className="p-5 border-t border-[#e2e4e8] flex gap-3">
          <button
            onClick={clearFilters}
            className="flex-1 border border-[#e2e4e8] text-[#5a5a6e] font-medium py-3 rounded-lg text-sm min-h-11"
          >
            Limpiar
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 bg-[#1a5fb4] text-white font-semibold py-3 rounded-lg text-sm min-h-11"
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="bg-white border border-[#e2e4e8] rounded-xl p-6 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1a1a2e]">Filtros</h2>
            {activeCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#1a5fb4] hover:underline"
              >
                Limpiar todo
              </button>
            )}
          </div>
          <div className="space-y-6">
            <FilterContent {...contentProps} />
          </div>
          <button
            onClick={applyFilters}
            className="w-full mt-6 bg-[#1a5fb4] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#0e3d7a] transition-colors min-h-11"
          >
            Aplicar filtros
          </button>
        </div>
      </aside>
    </>
  );
}

interface FilterContentProps {
  operation: string;
  setOperation: (v: string) => void;
  types: string[];
  toggleType: (id: string) => void;
  rooms: string[];
  toggleRoom: (r: string) => void;
  currency: "ARS" | "USD";
  setCurrency: (v: "ARS" | "USD") => void;
  priceFrom: string;
  setPriceFrom: (v: string) => void;
  priceTo: string;
  setPriceTo: (v: string) => void;
  surfaceMin: string;
  setSurfaceMin: (v: string) => void;
  withParking: boolean;
  setWithParking: (v: boolean) => void;
  creditEligible: boolean;
  setCreditEligible: (v: boolean) => void;
  tagIds: string[];
  toggleTag: (id: string) => void;
  withSuite: boolean;
  setWithSuite: (v: boolean) => void;
}

const CHARACTERISTIC_TAGS = [
  { id: 10, label: "Balcón" },
  { id: 19, label: "Jardín" },
  { id: 23, label: "Patio" },
  { id: 25, label: "Terraza" },
  { id: 26, label: "Toilette" },
] as const;

function FilterContent({
  operation, setOperation,
  types, toggleType,
  rooms, toggleRoom,
  currency, setCurrency,
  priceFrom, setPriceFrom,
  priceTo, setPriceTo,
  surfaceMin, setSurfaceMin,
  withParking, setWithParking,
  creditEligible, setCreditEligible,
  tagIds, toggleTag,
  withSuite, setWithSuite,
}: FilterContentProps) {
  return (
    <>
      {/* Operation */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Operación
        </p>
        <div className="space-y-2">
          {OPERATION_TYPES.map((op) => (
            <label key={op.slug} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="operation"
                value={op.slug}
                checked={operation === op.slug}
                onChange={() => setOperation(op.slug)}
                className="w-4 h-4 text-[#1a5fb4]"
              />
              <span className="text-sm text-[#1a1a2e]">{op.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Property types */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Tipo de propiedad
        </p>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((t) => (
            <label key={t.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={types.includes(String(t.id))}
                onChange={() => toggleType(String(t.id))}
                className="w-4 h-4 text-[#1a5fb4] rounded"
              />
              <span className="text-sm text-[#1a1a2e]">{t.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rooms */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Ambientes
        </p>
        <div className="flex gap-2 flex-wrap">
          {ROOM_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => toggleRoom(String(r))}
              className={cn(
                "w-10 h-10 rounded-lg border text-sm font-medium transition-colors",
                rooms.includes(String(r))
                  ? "bg-[#1a5fb4] border-[#1a5fb4] text-white"
                  : "border-[#e2e4e8] text-[#5a5a6e] hover:border-[#1a5fb4]"
              )}
            >
              {r === 4 ? "4+" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Currency toggle */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Moneda
        </p>
        <div className="flex rounded-lg border border-[#e2e4e8] overflow-hidden">
          {(["ARS", "USD"] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCurrency(c); setPriceFrom(""); setPriceTo(""); }}
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors",
                currency === c
                  ? "bg-[#1a5fb4] text-white"
                  : "text-[#5a5a6e] hover:bg-gray-50"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Precio ({currency})
        </p>
        <div className="space-y-2">
          <input
            type="number"
            placeholder={currency === "USD" ? "Desde (USD)" : "Desde (ARS)"}
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="w-full border border-[#e2e4e8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-11"
          />
          <input
            type="number"
            placeholder={currency === "USD" ? "Hasta (USD)" : "Hasta (ARS)"}
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="w-full border border-[#e2e4e8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-11"
          />
        </div>
      </div>

      {/* Surface */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Superficie cubierta mínima
        </p>
        <div className="relative">
          <input
            type="number"
            placeholder="Ej: 50"
            value={surfaceMin}
            onChange={(e) => setSurfaceMin(e.target.value)}
            className="w-full border border-[#e2e4e8] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-11"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5a5a6e]">m²</span>
        </div>
      </div>

      {/* Extra options */}
      <div>
        <p className="text-xs font-semibold text-[#5a5a6e] uppercase tracking-wider mb-3">
          Características
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={withParking}
              onChange={(e) => setWithParking(e.target.checked)}
              className="w-4 h-4 text-[#1a5fb4] rounded"
            />
            <span className="text-sm text-[#1a1a2e]">Con cochera</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={creditEligible}
              onChange={(e) => setCreditEligible(e.target.checked)}
              className="w-4 h-4 text-[#1a5fb4] rounded"
            />
            <span className="text-sm text-[#1a1a2e]">Apto crédito</span>
          </label>
          {CHARACTERISTIC_TAGS.map((tag) => (
            <label key={tag.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={tagIds.includes(String(tag.id))}
                onChange={() => toggleTag(String(tag.id))}
                className="w-4 h-4 text-[#1a5fb4] rounded"
              />
              <span className="text-sm text-[#1a1a2e]">{tag.label}</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={withSuite}
              onChange={(e) => setWithSuite(e.target.checked)}
              className="w-4 h-4 text-[#1a5fb4] rounded"
            />
            <span className="text-sm text-[#1a1a2e]">Suite</span>
          </label>
        </div>
      </div>
    </>
  );
}

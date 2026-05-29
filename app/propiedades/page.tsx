import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import type { Property } from "@/lib/types";
import PropertyGrid from "@/components/property/PropertyGrid";
import FilterDrawer from "@/components/search/FilterDrawer";
import SortDropdown from "@/components/search/SortDropdown";
import { searchProperties, getBarrios } from "@/lib/tokko";
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Todas las propiedades",
  description:
    "Buscá entre todos los inmuebles disponibles en D'Amato Propiedades. " +
    "Filtrá por barrio, tipo, precio y operación.",
};

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    operacion?: string;
    operation?: string;
    tipo?: string | string[];
    type?: string | string[];
    ambientes?: string | string[];
    rooms?: string | string[];
    precio_min?: string;
    price_from?: string;
    precio_max?: string;
    price_to?: string;
    moneda?: string;
    superficie_min?: string;
    cochera?: string;
    credito?: string;
    tags?: string;
    suite?: string;
    barrio?: string;
    location?: string;
    orden?: string;
    order?: string;
    pagina?: string;
  }>;
}

function buildSearchData(params: Awaited<PageProps["searchParams"]>) {
  const data: Record<string, unknown> = {};

  if (params.operacion) {
    const opMap: Record<string, string> = {
      venta: "Venta",
      alquiler: "Alquiler",
      temporario: "Alquiler temporario",
    };
    const opLabel = opMap[params.operacion];
    if (opLabel) data.operation_types = [opLabel];
  }

  const tipos = params.tipo
    ? Array.isArray(params.tipo)
      ? params.tipo
      : [params.tipo]
    : [];
  if (tipos.length > 0) {
    data.property_types = tipos.map(Number);
  }

  const ambientes = params.ambientes
    ? Array.isArray(params.ambientes)
      ? params.ambientes
      : [params.ambientes]
    : [];
  if (ambientes.length > 0) {
    data.room_amount = ambientes.map(Number);
  }

  if (params.precio_min) data.price_from = Number(params.precio_min);
  if (params.precio_max) data.price_to = Number(params.precio_max);
  if (params.moneda === "USD") data.currency = "USD";

  return data;
}

function applyLocalFilters(properties: Property[], params: Awaited<PageProps["searchParams"]>): Property[] {
  let result = properties;

  if (params.superficie_min) {
    const min = Number(params.superficie_min);
    result = result.filter((p) => (parseFloat(String(p.roofed_surface)) || 0) >= min);
  }

  if (params.cochera === "1") {
    result = result.filter((p) => p.parking_lot_amount >= 1);
  }

  if (params.credito === "1") {
    result = result.filter((p) => p.credit_eligible === "Apto crédito");
  }

  if (params.tags) {
    const requiredTagIds = params.tags.split(",").map(Number).filter(Boolean);
    result = result.filter((p) =>
      requiredTagIds.every((id) => p.tags.some((t) => t.id === id))
    );
  }

  if (params.suite === "1") {
    result = result.filter((p) => p.suite_amount > 0);
  }

  if (params.barrio) {
    const barrio = params.barrio.toLowerCase();
    result = result.filter((p) =>
      p.location.full_location?.toLowerCase().includes(barrio) ||
      p.location.name?.toLowerCase().includes(barrio)
    );
  }

  return result;
}

function buildTitle(params: Awaited<PageProps["searchParams"]>): string {
  const parts: string[] = [];

  if (params.operacion) {
    const op = OPERATION_TYPES.find((o) => o.slug === params.operacion);
    if (op) parts.push(op.label);
  }

  const tipos = params.tipo
    ? (Array.isArray(params.tipo) ? params.tipo : [params.tipo])
    : [];
  if (tipos.length === 1) {
    const t = PROPERTY_TYPES.find((p) => String(p.id) === tipos[0]);
    if (t) parts.push(t.name + "s");
  }

  if (parts.length === 0) return "Todas las propiedades";
  return parts.join(" de ");
}

export default async function PropiedadesPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const params = {
    ...raw,
    operacion: (raw.operacion ?? raw.operation)?.toLowerCase(),
    tipo: raw.tipo ?? raw.type,
    ambientes: raw.ambientes ?? raw.rooms,
    precio_min: raw.precio_min ?? raw.price_from,
    precio_max: raw.precio_max ?? raw.price_to,
    barrio: raw.barrio ?? raw.location,
    orden: raw.orden ?? raw.order,
  };
  const page = Number(params.pagina) || 1;
  const limit = 12;
  const offset = (page - 1) * limit;
  const orderBy = params.orden || "-created_at";

  const searchData = buildSearchData(params);
  const hasLocalFilters = !!(params.superficie_min || params.cochera || params.credito || params.tags || params.suite || params.barrio);

  let properties: Property[] = [];
  let totalCount = 0;
  let barrios: string[] = [];

  try {
    const [searchResult, barriosResult] = await Promise.all([
      hasLocalFilters
        ? searchProperties(searchData, { limit: 200, offset: 0, order_by: orderBy })
        : searchProperties(searchData, { limit, offset, order_by: orderBy }),
      getBarrios(),
    ]);
    barrios = barriosResult;
    if (hasLocalFilters) {
      const filtered = applyLocalFilters(searchResult.objects, params);
      totalCount = filtered.length;
      properties = filtered.slice(offset, offset + limit);
    } else {
      properties = searchResult.objects;
      totalCount = searchResult.meta.total_count;
    }
  } catch {
    // show empty state
  }

  const title = buildTitle(params);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#0c1b2e] pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {title}
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            {totalCount > 0 ? `${totalCount} propiedades encontradas` : "Buscando propiedades..."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <Suspense>
            <FilterDrawer barrios={barrios} />
          </Suspense>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#5a5a6e]">
                {properties.length} de {totalCount} propiedades
              </p>
              <Suspense>
                <SortDropdown />
              </Suspense>
            </div>

            <PropertyGrid properties={properties} />

            {/* Pagination */}
            {totalCount > limit && (
              <Pagination
                currentPage={page}
                totalCount={totalCount}
                limit={limit}
                searchParams={params}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalCount,
  limit,
  searchParams,
}: {
  currentPage: number;
  totalCount: number;
  limit: number;
  searchParams: Record<string, unknown>;
}) {
  const totalPages = Math.ceil(totalCount / limit);

  function buildUrl(page: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((val) => params.append(k, val));
      else if (v) params.set(k, String(v));
    });
    params.set("pagina", String(page));
    return `/propiedades?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-[#e2e4e8] text-sm text-[#5a5a6e] hover:border-[#1a5fb4] hover:text-[#1a5fb4] transition-colors"
        >
          ← Anterior
        </Link>
      )}

      <span className="text-sm text-[#5a5a6e] px-3">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-[#e2e4e8] text-sm text-[#5a5a6e] hover:border-[#1a5fb4] hover:text-[#1a5fb4] transition-colors"
        >
          Siguiente →
        </Link>
      )}
    </div>
  );
}

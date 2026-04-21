import type { Metadata } from "next";
import { Suspense } from "react";
import type { Property } from "@/lib/types";
import PropertyGrid from "@/components/property/PropertyGrid";
import FilterDrawer from "@/components/search/FilterDrawer";
import SortDropdown from "@/components/search/SortDropdown";
import { searchProperties } from "@/lib/tokko";
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Propiedades en Venta y Alquiler en Buenos Aires",
  description:
    "Buscá entre cientos de propiedades en venta y alquiler en Buenos Aires. Filtrá por tipo, precio y ambientes.",
};

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    operacion?: string;
    tipo?: string | string[];
    ambientes?: string | string[];
    precio_min?: string;
    precio_max?: string;
    orden?: string;
    pagina?: string;
  }>;
}

function buildSearchData(params: Awaited<PageProps["searchParams"]>) {
  const data: Record<string, unknown> = {};

  if (params.operacion) {
    // Pass the slug — tokko.ts normalizeSearchData maps it to integer ID
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

  return data;
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
  const params = await searchParams;
  const page = Number(params.pagina) || 1;
  const limit = 12;
  const offset = (page - 1) * limit;
  const orderBy = params.orden || "-created_at";

  const searchData = buildSearchData(params);

  let properties: Property[] = [];
  let totalCount = 0;

  try {
    const result = await searchProperties(searchData, { limit, offset, order_by: orderBy });
    properties = result.objects;
    totalCount = result.meta.total_count;
  } catch {
    // show empty state
  }

  const title = buildTitle(params);

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="bg-[#0c1b2e] py-10 px-4 sm:px-6">
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
            <FilterDrawer />
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
        <a
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-[#e2e4e8] text-sm text-[#5a5a6e] hover:border-[#1a5fb4] hover:text-[#1a5fb4] transition-colors"
        >
          ← Anterior
        </a>
      )}

      <span className="text-sm text-[#5a5a6e] px-3">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages && (
        <a
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-[#e2e4e8] text-sm text-[#5a5a6e] hover:border-[#1a5fb4] hover:text-[#1a5fb4] transition-colors"
        >
          Siguiente →
        </a>
      )}
    </div>
  );
}

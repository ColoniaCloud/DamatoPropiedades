import { cache } from "react";
import type { TokkoPropertyList, TokkoDevelopmentList, Property, Development, ContactPayload } from "./types";

const API_BASE = "https://www.tokkobroker.com/api/v1";
const API_KEY = process.env.TOKKO_API_KEY;
if (!API_KEY) { throw new Error("TOKKO_API_KEY environment variable is not set. Please add it to .env.local"); }

const REVALIDATE = 300;

// Operation type IDs (verified against live API)
const OPERATION_TYPE_IDS: Record<string, number> = {
  Venta: 1,
  Alquiler: 2,
  "Alquiler temporario": 3,
  venta: 1,
  alquiler: 2,
  temporario: 3,
};

// All property type IDs
const ALL_PROPERTY_TYPES = [1, 2, 3, 5, 7, 13, 24];

function buildSearchUrl(
  data: Record<string, unknown>,
  params: { limit?: number; offset?: number; order_by?: string } = {}
): string {
  const { limit = 20, offset = 0, order_by = "-created_at" } = params;
  const encoded = encodeURIComponent(JSON.stringify(data));
  return `${API_BASE}/property/search/?format=json&key=${API_KEY}&lang=es_ar&limit=${limit}&offset=${offset}&order_by=${order_by}&data=${encoded}`;
}

function normalizeSearchData(raw: Record<string, unknown>): Record<string, unknown> {
  const data: Record<string, unknown> = {
    property_types: ALL_PROPERTY_TYPES,
    price_from: 0,
    price_to: 999999999,
    currency: "ARS",
  };

  // Normalize operation_types: accept strings or IDs
  if (raw.operation_types) {
    const ops = raw.operation_types as (string | number)[];
    data.operation_types = ops.map((op) => {
      if (typeof op === "number") return op;
      return OPERATION_TYPE_IDS[op] ?? op;
    });
  } else {
    data.operation_types = [1, 2, 3];
  }

  // Narrow down property_types if specified
  if (raw.property_types) {
    data.property_types = raw.property_types;
  }

  // Price filters
  if (raw.price_from !== undefined) data.price_from = raw.price_from;
  if (raw.price_to !== undefined) data.price_to = raw.price_to;
  if (raw.currency) data.currency = raw.currency;

  // Room amount filter
  if (raw.room_amount) data.room_amount = raw.room_amount;

  return data;
}

export async function getProperties(params: {
  limit?: number;
  offset?: number;
  order_by?: string;
} = {}): Promise<TokkoPropertyList> {
  // Use search with all filters to get only active properties
  const searchData = normalizeSearchData({});
  const url = buildSearchUrl(searchData, params);
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Tokko API error: ${res.status} — ${text}`);
  }
  return res.json();
}

export async function getProperty(id: number | string): Promise<Property> {
  const url = `${API_BASE}/property/${id}/?format=json&key=${API_KEY}&lang=es_ar`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Tokko API error: ${res.status}`);
  return res.json();
}

export async function searchProperties(
  rawData: Record<string, unknown>,
  params: {
    limit?: number;
    offset?: number;
    order_by?: string;
  } = {}
): Promise<TokkoPropertyList> {
  const data = normalizeSearchData(rawData);
  const url = buildSearchUrl(data, params);
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Tokko search error: ${res.status} — ${text}`);
  }
  return res.json();
}

// React cache deduplicates calls within the same request.
// Individual fetches use limit=40 (~1.4 MB each) to stay under the
// Next.js fetch-cache 2 MB per-item limit.
export const getAllProperties = cache(async (): Promise<Property[]> => {
  let all: Property[] = [];
  let offset = 0;
  const limit = 40;

  while (true) {
    const searchData = normalizeSearchData({});
    const url = buildSearchUrl(searchData, { limit, offset });
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`Tokko API error: ${res.status}`);
    const data: TokkoPropertyList = await res.json();
    all = all.concat(data.objects);
    if (!data.meta.next || all.length >= data.meta.total_count) break;
    offset += limit;
    if (offset > 1000) break;
  }

  return all;
});

export const getBarrios = cache(async (): Promise<string[]> => {
  const all = await getAllProperties();
  const set = new Set<string>();
  for (const p of all) {
    const barrio = (() => {
      const fullLocation = p.location?.full_location
      if (fullLocation) {
        const parts = fullLocation.split(' | ')
        if (parts.length >= 3) return parts[2]
      }
      return p.location?.divisions?.[1]?.name
        ?? p.location?.divisions?.[0]?.name
        ?? null
    })()
    if (barrio) {
      set.add(barrio);
    } else if (p.location.name) {
      set.add(p.location.name);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
});

export async function getFeaturedProperties(count = 6): Promise<Property[]> {
  const all = await getAllProperties();
  const starred = all.filter((p) => p.is_starred_on_web === true);

  if (starred.length >= count) return starred.slice(0, count);

  if (starred.length > 0) {
    const rest = all
      .filter((p) => !p.is_starred_on_web)
      .slice(0, count - starred.length);
    return [...starred, ...rest];
  }

  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function getSimilarProperties(
  propertyId: number,
  typeId: number,
  operationType: string,
  limit = 6
): Promise<Property[]> {
  try {
    const opId = OPERATION_TYPE_IDS[operationType];
    const data = await searchProperties({
      operation_types: opId ? [opId] : [1, 2, 3],
      property_types: [typeId],
    }, { limit: limit + 1 });
    return data.objects.filter((p) => p.id !== propertyId).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getDevelopments(): Promise<Development[]> {
  const url = `${API_BASE}/development/?format=json&key=${API_KEY}&lang=es_ar`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Tokko API error: ${res.status}`);
  const data: TokkoDevelopmentList = await res.json();
  return data.objects ?? [];
}

export async function getDevelopment(id: number | string): Promise<Development> {
  const url = `${API_BASE}/development/${id}/?format=json&key=${API_KEY}&lang=es_ar`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Tokko API error: ${res.status}`);
  return res.json();
}

export async function getPropertiesByDevelopment(developmentId: number): Promise<Property[]> {
  const url = `${API_BASE}/property/?format=json&key=${API_KEY}&lang=es_ar&development__isnull=false`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Tokko API error: ${res.status}`);
  const data: TokkoPropertyList = await res.json();
  return (data.objects ?? []).filter((p) => p.development?.id === developmentId);
}

export async function sendContact(payload: ContactPayload): Promise<{ success: boolean }> {
  const url = `${API_BASE}/webcontact/?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      tags: ["Web D'Amato"],
    }),
  });
  if (!res.ok) throw new Error(`Contact API error: ${res.status}`);
  return res.json();
}

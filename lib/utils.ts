import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, PropertyOperation, Development } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: "ARS" | "USD" | "EUR" = "ARS"): string {
  if (!price) return "Consultar";
  if (currency === "ARS") {
    return `$ ${price.toLocaleString("es-AR")}`;
  }
  if (currency === "USD") {
    return `USD ${price.toLocaleString("es-AR")}`;
  }
  return `â‚¬ ${price.toLocaleString("es-AR")}`;
}

export function getMainOperation(property: Property): PropertyOperation | null {
  return property.operations?.[0] ?? null;
}

export function getMainPrice(property: Property): string {
  const op = getMainOperation(property);
  if (!op || !op.prices?.length) return "Consultar";
  const { price, currency } = op.prices[0];
  const formatted = formatPrice(price, currency);
  if (op.operation_type === "Alquiler" || op.operation_type === "Alquiler temporario") {
    return `${formatted}/mes`;
  }
  return formatted;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getPropertyPath(property: Property): string {
  return `/propiedad/${property.id}/${slugify(property.publication_title)}`;
}

export function getSurface(property: Property): string {
  const total = property.total_surface;
  if (!total) return "";
  return `${total} mÂ²`;
}

export function getOperationColor(operationType: string): string {
  switch (operationType) {
    case "Venta":
      return "bg-[#1a5fb4] text-white";
    case "Alquiler":
      return "bg-[#10b981] text-white";
    case "Alquiler temporario":
      return "bg-[#e8b931] text-[#1a1a2e]";
    default:
      return "bg-gray-500 text-white";
  }
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const DOMPurify = require("dompurify");
    return DOMPurify.sanitize(html);
  } catch {
    return html;
  }
}

/**
 * Retorna el Localidad/Partido de una propiedad.
 * Usa full_location que tiene formato fijo:
 * "Argentina | Región | Localidad/Partido [| Sub-division]"
 * El índice [2] siempre es Localidad/Partido — nunca Sub-division.
 */
export function getNeighborhood(property: Property): string | null {
  const fullLocation = property.location?.full_location
  if (fullLocation) {
    const parts = fullLocation.split(' | ')
    if (parts.length >= 3) return parts[2]
  }
  // Fallback solo si full_location no existe
  return property.location?.divisions?.[1]?.name
    ?? property.location?.divisions?.[0]?.name
    ?? null
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "â€¦";
}

export function getDevelopmentPath(development: Development): string {
  return `/emprendimientos/${development.id}/${slugify(development.name)}`;
}

export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (['www.youtube.com', 'youtube.com', 'youtu.be'].includes(u.hostname)) return true;
    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(u.hostname)) return true;
    const ext = u.pathname.split('.').pop()?.toLowerCase() ?? '';
    return ['mp4', 'webm', 'ogg'].includes(ext);
  } catch {
    return false;
  }
}

export function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com') {
      if (u.pathname.startsWith('/embed/')) return url;
      if (u.pathname.startsWith('/shorts/')) {
        const id = u.pathname.split('/')[2];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1).split('?')[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === 'vimeo.com' || u.hostname === 'www.vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
    if (u.hostname === 'player.vimeo.com') return url;
  } catch {
    return null;
  }
  return url;
}

export function isDirectVideoFile(url: string): boolean {
  if (!url) return false;
  const ext = url.split('.').pop()?.split('?')[0]?.toLowerCase() ?? '';
  return ['mp4', 'webm', 'ogg'].includes(ext);
}

export function formatConstructionDate(dateStr: string): string {
  if (!dateStr) return "A confirmar";
  const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];
  const [year, month] = dateStr.split("-");
  const idx = parseInt(month, 10) - 1;
  return `${months[idx] ?? ""} ${year}`;
}

export const CONSTRUCTION_STATUS: Record<number, { label: string; color: string }> = {
  1: { label: "En pozo", color: "bg-gray-400" },
  2: { label: "En pozo avanzado", color: "bg-[#00b4d8]/60" },
  3: { label: "En construcciÃ³n", color: "bg-[#00b4d8]" },
  4: { label: "ConstrucciÃ³n avanzada", color: "bg-[#1a5fb4]" },
  5: { label: "Terminado", color: "bg-[#10b981]" },
};

export function getConstructionStatusInfo(status: number): { label: string; color: string } {
  return CONSTRUCTION_STATUS[status] ?? { label: "Sin estado", color: "bg-gray-300" };
}


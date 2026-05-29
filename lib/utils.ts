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

export function getNeighborhood(property: Property): string {
  return property.location?.divisions?.[0]?.name ?? "";
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "â€¦";
}

export function getDevelopmentPath(development: Development): string {
  return `/emprendimientos/${development.id}/${slugify(development.name)}`;
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


import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, PropertyOperation } from "./types";

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
  return `€ ${price.toLocaleString("es-AR")}`;
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
    .replace(/[̀-ͯ]/g, "")
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
  return `${total} m²`;
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
  return text.substring(0, length).trim() + "…";
}

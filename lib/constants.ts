export const PROPERTY_TYPES = [
  { id: 1, name: "Terreno", slug: "terrenos" },
  { id: 2, name: "Departamento", slug: "departamentos" },
  { id: 3, name: "Casa", slug: "casas" },
  { id: 5, name: "Oficina", slug: "oficinas" },
  { id: 7, name: "Local", slug: "locales" },
  { id: 13, name: "PH", slug: "ph" },
  { id: 24, name: "Galpón", slug: "galpones" },
] as const;

export const OPERATION_TYPES = [
  { value: "Venta", label: "Venta", slug: "venta" },
  { value: "Alquiler", label: "Alquiler", slug: "alquiler" },
  { value: "Alquiler temporario", label: "Alquiler temporario", slug: "alquiler-temporario" },
] as const;

export const ROOM_OPTIONS = [1, 2, 3, 4] as const;

export const ORDER_OPTIONS = [
  { value: "-created_at", label: "Más recientes" },
  { value: "price", label: "Menor precio" },
  { value: "-price", label: "Mayor precio" },
  { value: "-roofed_surface", label: "Mayor superficie" },
] as const;

export const BRANCH = {
  name: "D'Amato Propiedades",
  email: "contacto@damatopropiedades.com.ar",
  phone: "2005-2222",
  phoneArea: "011",
  fullPhone: "011 2005-2222",
  address: "Avenida Francisco Beiro 4763",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5491140931881",
  geo: { lat: -34.5943, lng: -58.503 },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://damatopropiedades.com.ar";

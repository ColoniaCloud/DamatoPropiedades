export interface PropertyPhoto {
  image: string;
  description: string | null;
  is_blueprint?: boolean;
  thumb?: string;
}

export interface PropertyVideo {
  url: string;
  player?: string;
}

export interface PropertyType {
  id: number;
  code: string;
  name: string;
}

export interface PropertyPrice {
  currency: "ARS" | "USD" | "EUR";
  price: number;
  period?: string;
}

export interface PropertyOperation {
  operation_id: number;
  operation_type: "Venta" | "Alquiler" | "Alquiler temporario";
  prices: PropertyPrice[];
}

export interface PropertyLocation {
  divisions: Array<{ id: number; name: string }>;
}

export interface PropertyTag {
  id: number;
  name: string;
  type: number;
}

export interface Branch {
  display_name: string;
  email: string;
  phone: string;
  phone_area: string;
  address: string;
  logo: string;
}

export interface Producer {
  email: string;
  name: string;
}

export interface Property {
  id: number;
  address: string;
  real_address: string;
  fake_address: string;
  publication_title: string;
  description: string;
  rich_description: string;
  type: PropertyType;
  operations: PropertyOperation[];
  photos: PropertyPhoto[];
  videos: PropertyVideo[];
  geo_lat: number | null;
  geo_long: number | null;
  location: PropertyLocation;
  room_amount: number;
  bathroom_amount: number;
  suite_amount: number;
  roofed_surface: number | null;
  total_surface: number | null;
  unroofed_surface: number | null;
  expenses: number | null;
  parking_lot_amount: number;
  age: number | null;
  property_condition: string | null;
  disposition: string | null;
  tags: PropertyTag[];
  reference_code: string;
  public_url: string;
  status: number;
  created_at: string;
  deleted_at: string | null;
  branch: Branch;
  producer: Producer | null;
}

export interface TokkoMeta {
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total_count: number;
}

export interface TokkoPropertyList {
  meta: TokkoMeta;
  objects: Property[];
}

export interface SearchFilters {
  operation?: string;
  type_ids?: number[];
  price_from?: number;
  price_to?: number;
  currency?: "ARS" | "USD";
  rooms?: number[];
  surface_min?: number;
  surface_max?: number;
  order_by?: string;
  page?: number;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  properties?: number[];
}

import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/tokko";
import { PROPERTY_TYPES, SITE_URL } from "@/lib/constants";
import { getPropertyPath } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/propiedades`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/alquiler-temporario`, changeFrequency: "daily", priority: 0.8 },
    ...PROPERTY_TYPES.map((t) => ({
      url: `${SITE_URL}/venta/${t.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...PROPERTY_TYPES.map((t) => ({
      url: `${SITE_URL}/alquiler/${t.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];

  try {
    const properties = await getAllProperties();
    const propertyRoutes: MetadataRoute.Sitemap = properties
      .filter((p) => p.status === 2)
      .map((p) => ({
        url: `${SITE_URL}${getPropertyPath(p)}`,
        lastModified: p.deleted_at || p.created_at,
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}

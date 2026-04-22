import type { MetadataRoute } from "next";
import { getAllProperties, getDevelopments } from "@/lib/tokko";
import { PROPERTY_TYPES, SITE_URL } from "@/lib/constants";
import { getPropertyPath, getDevelopmentPath } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/propiedades`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/emprendimientos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
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

  const results = await Promise.allSettled([getAllProperties(), getDevelopments()]);

  const propertyRoutes: MetadataRoute.Sitemap =
    results[0].status === "fulfilled"
      ? results[0].value
          .filter((p) => p.status === 2)
          .map((p) => ({
            url: `${SITE_URL}${getPropertyPath(p)}`,
            lastModified: p.deleted_at || p.created_at,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }))
      : [];

  const developmentRoutes: MetadataRoute.Sitemap =
    results[1].status === "fulfilled"
      ? results[1].value
          .filter((d) => d.display_on_web)
          .map((d) => ({
            url: `${SITE_URL}${getDevelopmentPath(d)}`,
            changeFrequency: "weekly" as const,
            priority: 0.85,
          }))
      : [];

  return [...staticRoutes, ...propertyRoutes, ...developmentRoutes];
}

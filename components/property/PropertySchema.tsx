import type { Property } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";
import { getPropertyPath } from "@/lib/utils";

interface PropertySchemaProps {
  property: Property;
}

export default function PropertySchema({ property }: PropertySchemaProps) {
  const url = `${SITE_URL}${getPropertyPath(property)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.publication_title,
    description: property.description,
    url,
    datePosted: property.created_at ?? undefined,
    image: property.photos
      ?.filter((p) => !p.is_blueprint)
      .map((p) => p.image)
      .filter(Boolean) ?? [],
    address: {
      "@type": "PostalAddress",
      streetAddress: property.fake_address,
      addressLocality:
        property.location?.divisions?.[0]?.name ??
        property.location?.full_location ??
        "Buenos Aires",
      addressCountry: "AR",
    },
    ...(property.geo_lat && property.geo_long
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: property.geo_lat,
            longitude: property.geo_long,
          },
        }
      : {}),
    numberOfRooms: property.room_amount || undefined,
    numberOfBathroomsTotal: property.bathroom_amount || undefined,
    numberOfParkingSpaces: property.parking_lot_amount || undefined,
    floorSize: property.total_surface
      ? {
          "@type": "QuantitativeValue",
          value: property.total_surface,
          unitCode: "MTK",
        }
      : undefined,
    amenityFeature: property.tags?.length
      ? property.tags.map((tag) => ({
          "@type": "LocationFeatureSpecification",
          name: tag.name,
          value: true,
        }))
      : undefined,
    offers: property.operations?.map((op) => ({
      "@type": "Offer",
      price: op.prices?.[0]?.price,
      priceCurrency: op.prices?.[0]?.currency ?? "ARS",
      name: op.operation_type,
    })) ?? [],
    video: property.videos?.length
      ? property.videos.map((v) => ({
          "@type": "VideoObject",
          contentUrl: v.url,
        }))
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import type { Property } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";
import { getMainOperation, getPropertyPath } from "@/lib/utils";

interface PropertySchemaProps {
  property: Property;
}

export default function PropertySchema({ property }: PropertySchemaProps) {
  const op = getMainOperation(property);
  const price = op?.prices?.[0];
  const url = `${SITE_URL}${getPropertyPath(property)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.publication_title,
    description: property.description,
    url,
    image: property.photos?.[0]?.image || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: property.fake_address,
      addressLocality: "Buenos Aires",
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
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price: price.price,
            priceCurrency: price.currency,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

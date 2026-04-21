import type { Metadata } from "next";
import type { Property } from "@/lib/types";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Maximize2, Car, Calendar, Home, MapPin, Hash, Check } from "lucide-react";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyMap from "@/components/property/PropertyMap";
import PropertySchema from "@/components/property/PropertySchema";
import SimilarProperties from "@/components/property/SimilarProperties";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import BottomBar from "@/components/layout/BottomBar";
import BottomBarWrapper from "./BottomBarWrapper";
import { getProperty, getSimilarProperties } from "@/lib/tokko";
import {
  getMainOperation,
  getMainPrice,
  getOperationColor,
  getNeighborhood,
  formatPrice,
} from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const property = await getProperty(Number(id));
    const op = getMainOperation(property);
    return {
      title: `${property.publication_title} | D'Amato Propiedades`,
      description: `${property.type.name} en ${op?.operation_type ?? ""} - ${property.fake_address}. ${property.room_amount > 0 ? `${property.room_amount} ambientes, ` : ""}${property.total_surface ? `${property.total_surface}m². ` : ""}D'Amato Propiedades.`,
      openGraph: {
        images: property.photos?.[0]?.image ? [property.photos[0].image] : [],
        type: "website",
      },
    };
  } catch {
    return { title: "Propiedad | D'Amato Propiedades" };
  }
}

export const revalidate = 300;

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  let property;
  try {
    property = await getProperty(Number(id));
  } catch {
    notFound();
  }

  if (!property || property.status !== 2) {
    notFound();
  }

  const op = getMainOperation(property);
  const price = getMainPrice(property);
  const neighborhood = getNeighborhood(property);
  const whatsappMsg = `Hola, me interesa la propiedad ${property.reference_code} en ${property.fake_address}. ¿Podría darme más información?`;

  let similar: Property[] = [];
  try {
    similar = await getSimilarProperties(
      property.id,
      property.type.id,
      op?.operation_type || "Venta",
      6
    );
  } catch {
    // non-critical
  }

  // Group tags by type
  const tagsByType = property.tags.reduce(
    (acc: Record<number, typeof property.tags>, tag) => {
      if (!acc[tag.type]) acc[tag.type] = [];
      acc[tag.type].push(tag);
      return acc;
    },
    {}
  );

  return (
    <>
      <PropertySchema property={property} />

      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Gallery */}
              <PropertyGallery
                photos={property.photos}
                title={property.publication_title}
              />

              {/* Title & operation */}
              <div className="mt-6 mb-4">
                {op && (
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${getOperationColor(op.operation_type)}`}
                  >
                    {op.operation_type}
                  </span>
                )}
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-snug">
                  {property.publication_title}
                </h1>

                {/* Location */}
                <div className="flex items-center gap-2 mt-2 text-[#5a5a6e]">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {property.fake_address}
                    {neighborhood ? ` · ${neighborhood}` : ""}
                  </span>
                </div>

                {/* Reference */}
                <div className="flex items-center gap-1 mt-1 text-[#5a5a6e]">
                  <Hash className="w-3.5 h-3.5" />
                  <span className="text-xs">{property.reference_code}</span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-[#e2e4e8] py-4 mb-6">
                <p className="text-3xl font-bold text-[#1a5fb4]">{price}</p>
                {property.expenses && (
                  <p className="text-sm text-[#5a5a6e] mt-1">
                    + Expensas: {formatPrice(property.expenses, "ARS")}/mes
                  </p>
                )}
              </div>

              {/* Quick features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {property.room_amount > 0 && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <BedDouble className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Ambientes</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.room_amount}
                      </p>
                    </div>
                  </div>
                )}
                {property.bathroom_amount > 0 && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <Bath className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Baños</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.bathroom_amount}
                      </p>
                    </div>
                  </div>
                )}
                {property.total_surface && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <Maximize2 className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Superficie</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.total_surface} m²
                      </p>
                    </div>
                  </div>
                )}
                {property.parking_lot_amount > 0 && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <Car className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Cocheras</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.parking_lot_amount}
                      </p>
                    </div>
                  </div>
                )}
                {property.age !== null && property.age !== undefined && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <Calendar className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Antigüedad</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.age === 0 ? "A estrenar" : `${property.age} años`}
                      </p>
                    </div>
                  </div>
                )}
                {property.property_condition && (
                  <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-xl p-4">
                    <Home className="w-5 h-5 text-[#1a5fb4]" />
                    <div>
                      <p className="text-xs text-[#5a5a6e]">Estado</p>
                      <p className="font-semibold text-[#1a1a2e]">
                        {property.property_condition}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional surfaces */}
              {(property.roofed_surface || property.unroofed_surface) && (
                <div className="flex gap-6 mb-6 text-sm text-[#5a5a6e]">
                  {property.roofed_surface && (
                    <span>Cubierta: <strong className="text-[#1a1a2e]">{property.roofed_surface} m²</strong></span>
                  )}
                  {property.unroofed_surface && (
                    <span>Descubierta: <strong className="text-[#1a1a2e]">{property.unroofed_surface} m²</strong></span>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">
                  Descripción
                </h2>
                {property.rich_description ? (
                  <div
                    className="prose prose-sm max-w-none text-[#5a5a6e] [&_p]:mb-2 [&_br]:block"
                    dangerouslySetInnerHTML={{ __html: property.rich_description }}
                  />
                ) : (
                  <p className="text-[#5a5a6e] text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                )}
              </div>

              {/* Tags / Features */}
              {property.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4">
                    Servicios y comodidades
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.tags.map((tag) => (
                      <div key={tag.id} className="flex items-center gap-2 text-sm text-[#1a1a2e]">
                        <Check className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {property.geo_lat && property.geo_long && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4">
                    Ubicación
                  </h2>
                  <PropertyMap
                    lat={property.geo_lat}
                    lng={property.geo_long}
                    address={property.fake_address}
                  />
                  <p className="text-xs text-[#5a5a6e] mt-2">
                    La ubicación es aproximada para preservar la privacidad.
                  </p>
                </div>
              )}

              {/* Mobile contact form */}
              <div className="lg:hidden mb-20">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4" id="consultar">
                  Consultar
                </h2>
                <div className="bg-white border border-[#e2e4e8] rounded-xl p-5">
                  <ContactForm
                    propertyId={property.id}
                    propertyRef={property.reference_code}
                    propertyAddress={property.fake_address}
                  />
                  <div className="mt-4 pt-4 border-t border-[#e2e4e8]">
                    <WhatsAppButton
                      message={whatsappMsg}
                      className="w-full justify-center"
                      size="md"
                    />
                  </div>
                </div>
              </div>

              {/* Similar properties */}
              <SimilarProperties properties={similar} />
            </div>

            {/* Desktop sticky sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-white border border-[#e2e4e8] rounded-xl p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-5">
                  Consultar
                </h2>
                <ContactForm
                  propertyId={property.id}
                  propertyRef={property.reference_code}
                  propertyAddress={property.fake_address}
                />
                <div className="mt-4 pt-4 border-t border-[#e2e4e8]">
                  <WhatsAppButton
                    message={whatsappMsg}
                    className="w-full justify-center"
                    size="md"
                  />
                </div>

                {/* Branch info */}
                <div className="mt-5 pt-5 border-t border-[#e2e4e8] text-xs text-[#5a5a6e] space-y-1">
                  <p className="font-semibold text-[#1a1a2e]">D&apos;Amato Propiedades</p>
                  <p>011 2005-2222</p>
                  <p>contacto@damatopropiedades.com.ar</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <BottomBarWrapper
        propertyRef={property.reference_code}
        propertyAddress={property.fake_address}
      />
    </>
  );
}

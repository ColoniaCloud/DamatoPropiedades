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

  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "5491140931881"}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <>
      <PropertySchema property={property} />

      {/* Hero */}
      <section
        className="relative h-[62vh] min-h-[400px] flex items-end"
        style={
          property.photos?.[0]?.image
            ? {
                backgroundImage: `url(${property.photos[0].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundColor: "#0c1b2e",
              }
            : { backgroundColor: "#0c1b2e" }
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2e] via-[#0c1b2e]/55 to-[#0c1b2e]/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            {/* Left: info */}
            <div>
              {op && (
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${getOperationColor(op.operation_type)}`}>
                  {op.operation_type}
                </span>
              )}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                {property.publication_title}
              </h1>
              <div className="flex items-center gap-1.5 text-white/70 mb-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">
                  {property.fake_address}
                  {neighborhood ? ` · ${neighborhood}` : ""}
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{price}</p>
            </div>

            {/* Right: CTAs */}
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="#consultar"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a2e] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors min-h-[44px] whitespace-nowrap"
              >
                Consultar
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors min-h-[44px] whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L.057 23.571a.75.75 0 00.92.92l5.788-1.474A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.497-5.176-1.367l-.371-.214-3.838.977.995-3.757-.234-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Gallery */}
              <PropertyGallery
                photos={property.photos}
                title={property.publication_title}
              />

              {/* Reference */}
              <div className="flex items-center gap-1 mt-4 mb-2 text-[#5a5a6e]">
                <Hash className="w-3.5 h-3.5" />
                <span className="text-xs">{property.reference_code}</span>
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
            <aside id="consultar" className="hidden lg:block w-80 flex-shrink-0 scroll-mt-24">
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

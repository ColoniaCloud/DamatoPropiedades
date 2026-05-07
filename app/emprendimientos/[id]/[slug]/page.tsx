import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { MapPin, Calendar, Hash, Tag, Phone, Mail, ChevronRight } from "lucide-react";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyMap from "@/components/property/PropertyMap";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import PropertyCard from "@/components/property/PropertyCard";
import { getDevelopment, getPropertiesByDevelopment } from "@/lib/tokko";
import { formatConstructionDate, getConstructionStatusInfo, slugify } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, slug } = await params;
  const canonicalPath = `/emprendimientos/${id}/${slug}`;
  try {
    const dev = await getDevelopment(Number(id));
    const title = dev.name;
    const description = `${dev.publication_title} — ${dev.fake_address}. Entrega estimada: ${formatConstructionDate(dev.construction_date)}.`;
    const ogImage = dev.photos?.[0]?.image
      ? [{ url: dev.photos[0].image, width: 1200, height: 800, alt: title }]
      : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }];
    return {
      title,
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        url: canonicalPath,
        type: "website",
        images: ogImage,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage.map((i) => i.url),
      },
    };
  } catch {
    return {
      title: "Emprendimiento | D'Amato Propiedades",
      alternates: { canonical: canonicalPath },
      openGraph: { images: ["/og-image.jpg"], type: "website" },
      twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
    };
  }
}

export const revalidate = 300;

const STATUS_STEPS = [
  "En pozo",
  "En pozo avanzado",
  "En construcción",
  "Constr. avanzada",
  "Terminado",
];

export default async function DevelopmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  let development;
  try {
    development = await getDevelopment(Number(id));
  } catch {
    notFound();
  }

  if (!development) notFound();

  const statusInfo = getConstructionStatusInfo(development.construction_status);
  const neighborhood = development.location?.divisions?.[0]?.name ?? "";
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const developmentUrl = `${protocol}://${host}/emprendimientos/${development.id}/${slugify(development.name)}`;
  const whatsappMsg = `Hola, me interesa este emprendimiento en ${development.fake_address}.
*Nombre:* _${development.name}_
*Link:* _${developmentUrl}_`;
  const formMsg = `Hola, me interesa este emprendimiento en ${development.fake_address}.\nNombre: ${development.name}\nLink: ${developmentUrl}`;

  const photos = development.photos.map((p) => ({
    image: p.image,
    description: p.description,
  }));

  let units: Awaited<ReturnType<typeof getPropertiesByDevelopment>> = [];
  try {
    units = await getPropertiesByDevelopment(development.id);
  } catch {
    // non-critical
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-[#5a5a6e] mb-6">
          <Link href="/" className="hover:text-[#1a5fb4] transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/emprendimientos" className="hover:text-[#1a5fb4] transition-colors">Emprendimientos</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a1a2e] truncate max-w-[200px]">{development.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Gallery */}
            <PropertyGallery photos={photos} title={development.publication_title} />

            {/* Title */}
            <div className="mt-6 mb-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-[#1a5fb4] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {development.type.name}
                </span>
                {development.is_starred_on_web && (
                  <span className="bg-[#00b4d8] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Destacado
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-tight">
                {development.name}
              </h1>
              <p className="text-[#5a5a6e] mt-1">{development.publication_title}</p>
              {(neighborhood || development.fake_address) && (
                <div className="flex items-center gap-1.5 text-[#5a5a6e] text-sm mt-2">
                  <MapPin className="w-4 h-4 text-[#00b4d8] flex-shrink-0" />
                  <span>{neighborhood ? `${neighborhood} — ${development.fake_address}` : development.fake_address}</span>
                </div>
              )}
            </div>

            {/* Construction status */}
            <div className="bg-white border border-[#e2e4e8] rounded-xl p-5 mb-6">
              <h2 className="font-display font-bold text-[#1a1a2e] mb-4">Estado de obra</h2>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full text-white ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                <span className="text-xs text-[#5a5a6e]">
                  Paso {development.construction_status} de 5
                </span>
              </div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      step <= development.construction_status ? "bg-[#1a5fb4]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#5a5a6e] mt-1">
                {STATUS_STEPS.map((s) => (
                  <span key={s} className="text-center" style={{ width: "20%" }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-[#e2e4e8] rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#5a5a6e] text-xs mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00b4d8]" />
                  Entrega estimada
                </div>
                <p className="font-semibold text-[#1a1a2e] text-sm">
                  {formatConstructionDate(development.construction_date)}
                </p>
              </div>
              <div className="bg-white border border-[#e2e4e8] rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#5a5a6e] text-xs mb-1">
                  <Hash className="w-3.5 h-3.5 text-[#00b4d8]" />
                  Código
                </div>
                <p className="font-semibold text-[#1a1a2e] text-sm">{development.reference_code}</p>
              </div>
              {neighborhood && (
                <div className="bg-white border border-[#e2e4e8] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#5a5a6e] text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00b4d8]" />
                    Barrio
                  </div>
                  <p className="font-semibold text-[#1a1a2e] text-sm">{neighborhood}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {development.description && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">Descripción</h2>
                <div className="prose prose-sm max-w-none text-[#5a5a6e] leading-relaxed whitespace-pre-line">
                  {development.description}
                </div>
              </div>
            )}

            {/* Financing */}
            {development.financing_details && (
              <div className="mb-8 bg-[#f4f7fb] rounded-xl p-5 border border-[#e2e4e8]">
                <h2 className="font-display text-lg font-bold text-[#1a1a2e] mb-2">Financiación</h2>
                <p className="text-sm text-[#5a5a6e] whitespace-pre-line leading-relaxed">
                  {development.financing_details}
                </p>
              </div>
            )}

            {/* Tags / Servicios */}
            {development.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">
                  <Tag className="inline-block w-5 h-5 mr-2 text-[#00b4d8]" />
                  Servicios y características
                </h2>
                <div className="flex flex-wrap gap-2">
                  {development.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-white border border-[#e2e4e8] text-[#5a5a6e] text-xs px-3 py-1.5 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {development.geo_lat && development.geo_long && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4">Ubicación</h2>
                <PropertyMap
                  lat={development.geo_lat}
                  lng={development.geo_long}
                  address={development.fake_address}
                />
              </div>
            )}

            {/* Units */}
            {units.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4">
                  Unidades disponibles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {units.map((unit) => (
                    <PropertyCard key={unit.id} property={unit} />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile contact */}
            <div className="lg:hidden mb-10">
              <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-4" id="consultar">
                Consultar
              </h2>
              <div className="bg-white border border-[#e2e4e8] rounded-xl p-5">
                <ContactForm initialMessage={formMsg} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 lg:flex-shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Contact form */}
              <div className="bg-white border border-[#e2e4e8] rounded-xl p-5 hidden lg:block">
                <h2 className="font-display text-lg font-bold text-[#1a1a2e] mb-4">
                  Consultar este proyecto
                </h2>
                <ContactForm initialMessage={formMsg} />
              </div>

              {/* WhatsApp */}
              <WhatsAppButton message={whatsappMsg} />

              {/* User in charge */}
              {development.users_in_charge?.name && (
                <div className="bg-white border border-[#e2e4e8] rounded-xl p-5">
                  <p className="text-xs text-[#5a5a6e] uppercase tracking-wider mb-3">Asesor a cargo</p>
                  <p className="font-semibold text-[#1a1a2e] mb-3">{development.users_in_charge.name}</p>
                  <div className="space-y-2">
                    {development.users_in_charge.cellphone && (
                      <a
                        href={`tel:${development.users_in_charge.cellphone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-sm text-[#5a5a6e] hover:text-[#1a5fb4] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#00b4d8]" />
                        {development.users_in_charge.cellphone}
                      </a>
                    )}
                    {development.users_in_charge.email && (
                      <a
                        href={`mailto:${development.users_in_charge.email}`}
                        className="flex items-center gap-2 text-sm text-[#5a5a6e] hover:text-[#1a5fb4] transition-colors break-all"
                      >
                        <Mail className="w-4 h-4 text-[#00b4d8]" />
                        {development.users_in_charge.email}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Reference */}
              <div className="text-xs text-[#5a5a6e] space-y-1 px-1">
                <p>Código: {development.reference_code}</p>
                <p>Publicado en {SITE_URL.replace("https://", "")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

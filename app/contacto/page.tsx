import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contacto — D'Amato Propiedades",
  description:
    "Contactanos para comprar, vender o alquilar tu propiedad. Estamos en Av. Fco. Beiro 4701, CABA. Tel: 011 2005-2222.",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Av. Fco. Beiro 4701, CABA",
    href: "https://maps.google.com/?q=Av.+Fco.+Beiro+4701,+CABA,+Argentina",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "011 2005-2222",
    href: "tel:01120052222",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@damatopropiedades.com.ar",
    href: "mailto:contacto@damatopropiedades.com.ar",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun a Vier 10:00 – 19:00 hs · Sáb 10:00 – 13:00 hs",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0c1b2e] pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#00b4d8] text-sm font-semibold uppercase tracking-widest">
            Estamos para ayudarte
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Contacto
          </h1>
          <p className="text-white/60 mt-3 max-w-md mx-auto">
            Dejanos tu consulta y te respondemos a la brevedad.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1a1a2e] mb-4">
                Información de contacto
              </h2>
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1a5fb4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#1a5fb4]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#5a5a6e] font-medium uppercase tracking-wider">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-[#1a1a2e] font-medium hover:text-[#1a5fb4] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[#1a1a2e] font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <WhatsAppButton
                message="Hola, me comunico desde la web. ¿Me pueden asesorar?"
                size="lg"
                className="w-full justify-center"
              />
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-[#e2e4e8] h-52">
              <iframe
                src="https://www.google.com/maps?q=Av.+Fco.+Beiro+4701,+CABA,+Argentina&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación D'Amato Propiedades — Av. Fco. Beiro 4701, CABA"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#e2e4e8] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-[#1a1a2e] mb-6">
                Envianos tu consulta
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/Icons";








const FOOTER_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades?operacion=venta", label: "Venta" },
  { href: "/propiedades?operacion=alquiler", label: "Alquiler" },
  { href: "/propiedades?operacion=temporario", label: "Temporario" },
  { href: "/emprendimientos", label: "Emprendimientos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const ASOCIADOS = [
  { src: "/asociados/cmcpsm.svg", alt: "CMCPSM" },
  { src: "/asociados/cpi.jpg", alt: "CPI" },
  { src: "/asociados/crs.png", alt: "CRS" },
  { src: "/asociados/cucicba.jpg", alt: "CUCICBA" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#0c1b2e] text-[#f0f0f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Main columns — 40 / 30 / 30 */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr_3fr] gap-8 lg:gap-12">

          {/* Columna 1 — Marca + Asociados */}
          <div className="text-center lg:text-left">
            <span className="font-display font-bold text-2xl text-white block mb-2">
              D&apos;Amato Propiedades
            </span>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed mx-auto lg:mx-0">
              Tu inmobiliaria de confianza en Villa Devoto.
              Más de 35 años de experiencia a tu servicio.
            </p>

            {/* Asociados */}
            <div className="mt-5">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
                Asociados con:
              </span>
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {ASOCIADOS.map(({ src, alt }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={alt}
                    className="h-8 w-auto object-contain bg-white rounded-[5px] p-[5px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2 — Links en 2 columnas internas */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Explorar
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 justify-items-center lg:justify-items-start">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-[#00b4d8] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 3 — Contacto + Redes */}
          <div className="text-center lg:text-left flex flex-col">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 justify-center lg:justify-start">
                <MapPin className="w-4 h-4 text-[#00b4d8] mt-0.5 shrink-0" />
                <a
                  href="https://maps.google.com/?q=Av.+Fco.+Beiro+4701,+CABA,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Av. Fco. Beiro 4701, CABA
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <Phone className="w-4 h-4 text-[#00b4d8] shrink-0" />
                <a
                  href="tel:01120052222"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  011 2005-2222
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <Mail className="w-4 h-4 text-[#00b4d8] shrink-0" />
                <a
                  href="mailto:contacto@damatopropiedades.com.ar"
                  className="text-sm text-white/60 hover:text-white transition-colors break-all"
                >
                  contacto@damatopropiedades.com.ar
                </a>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-6 justify-center lg:justify-start">
              <a
                href="https://api.whatsapp.com/send?phone=5491140931881&text=Quisiera%20contactarme%20con%20ustedes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/damato.propiedades/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/damatopropiedades/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} D&apos;Amato Propiedades. Todos los
            derechos reservados.
          </p>
          <p className="text-[10px]" style={{ color: "#2d4f7a" }}>
            Developed by NL360 Cloud
          </p>
        </div>
      </div>
    </footer>
  );
}

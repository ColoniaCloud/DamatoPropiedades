import Link from "next/link";
import { Phone, Mail, MapPin, Share2, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades?operacion=venta", label: "Venta" },
  { href: "/propiedades?operacion=alquiler", label: "Alquiler" },
  { href: "/propiedades?operacion=temporario", label: "Temporario" },
  { href: "/emprendimientos", label: "Emprendimientos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#0c1b2e] text-[#f0f0f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-display font-bold text-2xl text-white block mb-2">
              D&apos;Amato Propiedades
            </span>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Tu inmobiliaria de confianza en Villa Devoto y General San Martín.
              Más de 35 años de experiencia a tu servicio.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00b4d8] transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00b4d8] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Explorar
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#00b4d8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00b4d8] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">
                  Av. Francisco Beiro 4701, CABA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00b4d8] flex-shrink-0" />
                <a
                  href="tel:01120052222"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  011 2005-2222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00b4d8] flex-shrink-0" />
                <a
                  href="mailto:contacto@damatopropiedades.com.ar"
                  className="text-sm text-white/60 hover:text-white transition-colors break-all"
                >
                  contacto@damatopropiedades.com.ar
                </a>
              </li>
            </ul>
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

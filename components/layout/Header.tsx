"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/propiedades?operacion=venta", label: "Venta" },
  { href: "/propiedades?operacion=alquiler", label: "Alquiler" },
  { href: "/propiedades?operacion=temporario", label: "Temporario" },
  { href: "/emprendimientos", label: "Emprendimientos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5491140931881&text=Quisiera%20contactarme%20con%20ustedes";
const INSTAGRAM_URL = "https://www.instagram.com/damato.propiedades/";
const FACEBOOK_URL = "https://www.facebook.com/damatopropiedades/";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L.057 23.571a.75.75 0 00.92.92l5.788-1.474A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.497-5.176-1.367l-.371-.214-3.838.977.995-3.757-.234-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <header
          className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border border-gray-200/70 bg-white/90"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/logo-h.png"
              alt="D'Amato Propiedades"
              width={180}
              height={44}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Desktop nav — visible only on lg+ */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 mr-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[clamp(0.7rem,0.8vw,0.875rem)] font-medium whitespace-nowrap text-[#1a1a2e] hover:text-[#1a5fb4] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <span className="hidden lg:block h-5 w-px bg-gray-300" />

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-[#1a1a2e]/70 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#1a1a2e]/70 hover:text-[#E1306C] transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#1a1a2e]/70 hover:text-[#1877F2] transition-colors"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>

            {/* Hamburger — visible below lg (tablet y mobile) */}
            <button
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-1 text-[#1a1a2e] hover:text-[#1a5fb4] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}

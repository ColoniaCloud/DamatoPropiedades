"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/Icons";
import { SOCIAL } from "@/lib/constants";

import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/propiedades?operacion=venta", label: "Venta" },
  { href: "/propiedades?operacion=alquiler", label: "Alquiler" },
  { href: "/propiedades?operacion=temporario", label: "Temporario" },
  { href: "/emprendimientos", label: "Emprendimientos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP || "5491140931881"}&text=Quisiera%20contactarme%20con%20ustedes`;
const INSTAGRAM_URL = SOCIAL.instagram;
const FACEBOOK_URL = SOCIAL.facebook;







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

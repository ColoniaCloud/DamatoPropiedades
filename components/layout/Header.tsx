"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/propiedades?operacion=venta", label: "Venta" },
  { href: "/propiedades?operacion=alquiler", label: "Alquiler" },
  { href: "/propiedades?operacion=temporario", label: "Temporario" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span
              className={cn(
                "font-display font-bold text-xl leading-tight transition-colors",
                scrolled ? "text-[#1a5fb4]" : "text-white"
              )}
            >
              D&apos;Amato
              <span
                className={cn(
                  "block text-xs font-sans font-normal tracking-widest uppercase",
                  scrolled ? "text-[#5a5a6e]" : "text-white/80"
                )}
              >
                Propiedades
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#e8b931]",
                  scrolled ? "text-[#1a1a2e]" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="tel:01120052222"
            className={cn(
              "hidden md:flex items-center gap-2 text-sm font-medium transition-colors",
              scrolled ? "text-[#1a5fb4]" : "text-white"
            )}
          >
            <Phone className="w-4 h-4" />
            011 2005-2222
          </a>

          {/* Mobile menu button */}
          <button
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              scrolled ? "text-[#1a1a2e]" : "text-white"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}

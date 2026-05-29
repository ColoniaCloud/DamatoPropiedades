"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRANCH } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-[#0c1b2e] flex flex-col transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Image
            src="/logos/logo-h.png"
            alt="D'Amato Propiedades"
            width={160}
            height={40}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white/90 hover:text-[#00b4d8] font-medium text-lg py-3 border-b border-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact info */}
        <div className="px-6 py-6 border-t border-white/10 space-y-3">
          <a
            href={`tel:${BRANCH.fullPhone.replace(/\D/g, "")}`}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5 text-[#00b4d8]" />
            <span className="text-sm">{BRANCH.fullPhone}</span>
          </a>
          <a
            href={`mailto:${BRANCH.email}`}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5 text-[#00b4d8]" />
            <span className="text-sm">{BRANCH.email}</span>
          </a>
        </div>
      </div>
    </>
  );
}

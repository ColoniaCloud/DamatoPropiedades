"use client";

import { buildWhatsAppUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/Icons";




interface BottomBarProps {
  propertyRef: string;
  propertyAddress: string;
  onConsult: () => void;
}

export default function BottomBar({ propertyRef, propertyAddress, onConsult }: BottomBarProps) {
  const whatsappMessage = `Hola, me interesa la propiedad ${propertyRef} en ${propertyAddress}. ¿Podría darme más información?`;
  const whatsappUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP || "5491140931881",
    whatsappMessage
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e2e4e8] px-4 py-3 flex gap-3 md:hidden shadow-lg">
      <button
        onClick={onConsult}
        className="flex-1 bg-[#1a5fb4] text-white font-semibold py-3 rounded-lg text-sm transition-colors hover:bg-[#0e3d7a] active:scale-95 min-h-11"
      >
        Consultar
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#25d366] text-white font-semibold py-3 rounded-lg text-sm transition-colors hover:bg-[#1fba57] active:scale-95 flex items-center justify-center gap-2 min-h-11"
      >
        <WhatsAppIcon className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  );
}

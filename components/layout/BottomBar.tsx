"use client";

import { buildWhatsAppUrl } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L.057 23.571a.75.75 0 00.92.92l5.788-1.474A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.497-5.176-1.367l-.371-.214-3.838.977.995-3.757-.234-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

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

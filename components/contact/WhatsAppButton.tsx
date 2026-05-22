"use client";

import { buildWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/Icons";


interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}



export default function WhatsAppButton({
  message = "Hola, me gustaría recibir más información sobre sus propiedades.",
  className,
  size = "md",
}: WhatsAppButtonProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || "5491140931881";
  const url = buildWhatsAppUrl(phone, message);

  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-3",
    lg: "text-base px-6 py-4",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1fba57] text-white font-semibold rounded-lg transition-colors min-h-[44px]",
        sizeClasses[size],
        className
      )}
    >
      <WhatsAppIcon className="w-5 h-5" />
      WhatsApp
    </a>
  );
}

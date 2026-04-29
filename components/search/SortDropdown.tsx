"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import { ORDER_OPTIONS } from "@/lib/constants";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("orden") || "-created_at";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orden", value);
    params.delete("pagina");
    router.push(`/propiedades?${params.toString()}`);
    setOpen(false);
  }

  const currentLabel = ORDER_OPTIONS.find((o) => o.value === current)?.label ?? "Ordenar";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white border border-[#e2e4e8] rounded-lg pl-3 pr-3 py-2 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] cursor-pointer min-h-10 hover:border-[#1a5fb4] transition-colors whitespace-nowrap"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#5a5a6e] transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full right-0 mt-1.5 z-30 overflow-hidden rounded-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-w-[200px]"
          style={{
            background: "rgba(12,27,46,0.97)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <div className="py-1">
            {ORDER_OPTIONS.map((opt) => {
              const isSelected = current === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/8 group"
                >
                  <span className={isSelected ? "text-[#00b4d8]" : "text-white/70 group-hover:text-white"}>
                    {opt.label}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00b4d8]" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

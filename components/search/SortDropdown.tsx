"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ORDER_OPTIONS } from "@/lib/constants";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("orden") || "-created_at";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orden", value);
    params.delete("pagina");
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <div className="relative inline-block">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-white border border-[#e2e4e8] rounded-lg pl-3 pr-8 py-2 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] cursor-pointer min-h-[40px]"
      >
        {ORDER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a6e] pointer-events-none" />
    </div>
  );
}

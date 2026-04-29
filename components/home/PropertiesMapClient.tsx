"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/lib/types";

const PropertiesMap = dynamic(() => import("./PropertiesMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-sm text-gray-400">Cargando mapa...</span>
    </div>
  ),
});

export default function PropertiesMapClient({ properties }: { properties: Property[] }) {
  return <PropertiesMap properties={properties} />;
}

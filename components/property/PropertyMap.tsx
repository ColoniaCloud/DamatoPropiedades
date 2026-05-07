"use client";

import dynamic from "next/dynamic";

const PropertyMapLeaflet = dynamic(() => import("./PropertyMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-80 rounded-xl border border-[#e2e4e8] bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-sm text-gray-400">Cargando mapa...</span>
    </div>
  ),
});

interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function PropertyMap(props: PropertyMapProps) {
  return <PropertyMapLeaflet {...props} />;
}

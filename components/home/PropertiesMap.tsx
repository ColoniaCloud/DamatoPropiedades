"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { getPropertyPath, getMainPrice, getMainOperation } from "@/lib/utils";
import { OPERATION_TYPES } from "@/lib/constants";

// Default center: D'Amato (Av. Francisco Beiro 4701 - Villa Devoto)
const defaultCenter: [number, number] = [-34.5943, -58.503];

// Color por tipo de operación
const colorMap: Record<string, string> = {
  Venta: "#1a5fb4",
  Alquiler: "#10b981",
  "Alquiler temporario": "#00b4d8",
};

function createMarkerIcon(color: string) {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 14 24 14 24S28 23.625 28 14C28 6.268 21.732 0 14 0z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>`,
    className: "",
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -38],
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 15);
      return;
    }
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [map, positions]);
  return null;
}

interface PropertiesMapProps {
  properties: Property[];
}

export default function PropertiesMap({ properties }: PropertiesMapProps) {
  const valid = properties.filter(
    (p) => p.geo_lat != null && p.geo_long != null && p.geo_lat !== 0 && p.geo_long !== 0
  );

  const positions: [number, number][] = valid.map((p) => [
    Number(p.geo_lat),
    Number(p.geo_long),
  ]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={18}
      style={{ width: "100%", height: "100%" }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds positions={positions} />
      {valid.map((p) => {
        const op = getMainOperation(p);
        const opType = op?.operation_type ?? "Venta";
        const color = colorMap[opType] || "#1a5fb4";
        const position: [number, number] = [Number(p.geo_lat), Number(p.geo_long)];
        const opLabel =
          OPERATION_TYPES.find((o) => o.value === opType)?.label ?? "Venta";

        return (
          <Marker key={p.id} position={position} icon={createMarkerIcon(color)}>
            <Popup>
              <div className="py-1 px-2 min-w-[180px]">
                <p className="font-semibold text-[#1a1a2e] text-sm leading-snug mb-1">
                  {p.fake_address}
                </p>
                <p className="text-xs text-[#5a5a6e] mb-1">
                  {p.type?.name} · {opLabel}
                </p>
                <p className="text-sm font-bold text-[#1a5fb4] mb-2">
                  {getMainPrice(p)}
                </p>
                <Link
                  href={getPropertyPath(p)}
                  className="text-xs text-[#00b4d8] font-semibold hover:underline"
                >
                  Ver propiedad →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

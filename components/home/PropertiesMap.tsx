"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { getPropertyPath, getMainPrice, getMainOperation } from "@/lib/utils";
import { OPERATION_TYPES } from "@/lib/constants";

// Custom SVG pin — avoids needing Leaflet's default image assets
function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 14 24 14 24S28 23.625 28 14C28 6.268 21.732 0 14 0z"
        fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="14" cy="14" r="5.5" fill="white"/>
    </svg>`,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -40],
  });
}

const ICONS: Record<string, ReturnType<typeof makeIcon>> = {};
function getIcon(operationType: string) {
  if (!ICONS[operationType]) {
    const colorMap: Record<string, string> = {
      Venta: "#1a5fb4",
      Alquiler: "#10b981",
      "Alquiler temporario": "#00b4d8",
    };
    ICONS[operationType] = makeIcon(colorMap[operationType] ?? "#1a5fb4");
  }
  return ICONS[operationType];
}

function BoundsFitter({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length === 0) return;
    if (coords.length === 1) {
      map.setView(coords[0], 15);
      return;
    }
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [48, 48] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

interface PropertiesMapProps {
  properties: Property[];
}

export default function PropertiesMap({ properties }: PropertiesMapProps) {
  const valid = properties.filter(
    (p) => p.geo_lat != null && p.geo_long != null && p.geo_lat !== 0 && p.geo_long !== 0
  );
  const coords: [number, number][] = valid.map((p) => [Number(p.geo_lat), Number(p.geo_long)]);

  // Default center: D'Amato branch (Villa Devoto / Beiro)
  const defaultCenter: [number, number] = [-34.5943, -58.503];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coords.length > 0 && <BoundsFitter coords={coords} />}

      {valid.map((p) => {
        const op = getMainOperation(p);
        const opType = op?.operation_type ?? "Venta";
        const price = getMainPrice(p);
        const opLabel = OPERATION_TYPES.find((o) => o.value === opType)?.label ?? opType;

        return (
          <Marker
            key={p.id}
            position={[Number(p.geo_lat), Number(p.geo_long)]}
            icon={getIcon(opType)}
          >
            <Popup minWidth={200}>
              <div className="py-1">
                <p className="font-semibold text-[#1a1a2e] text-sm leading-snug mb-1">
                  {p.fake_address}
                </p>
                <p className="text-xs text-[#5a5a6e] mb-1">{p.type?.name} · {opLabel}</p>
                <p className="text-sm font-bold text-[#1a5fb4] mb-2">{price}</p>
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

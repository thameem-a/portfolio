"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { MapLocation } from "../config/portfolio";

type Props = { locations: MapLocation[] };

export default function TravelMap({ locations }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: "100%", width: "100%", background: "#0a0a0a" }} />;

  return (
    <MapContainer
      center={[30, 10]}
      zoom={2}
      minZoom={2}
      maxZoom={18}
      style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
      zoomControl={true}
      attributionControl={false}
      scrollWheelZoom={true}
      maxBounds={[[-85, -180], [85, 180]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        maxZoom={19}
      />
      {locations.map((loc) => (
        <CircleMarker
          key={loc.name}
          center={loc.coords}
          radius={loc.type === "lived" ? 5 : 4}
          pathOptions={{
            color: "white",
            weight: 1.5,
            fillColor: "white",
            fillOpacity: loc.type === "lived" ? 1 : 0,
            opacity: loc.type === "lived" ? 1 : 0.6,
          }}
        >
          <Tooltip
            direction="top"
            offset={[0, -8]}
            permanent={false}
            className="map-tooltip"
          >
            <span className="font-mono text-[12px]">
              {loc.name}
              {loc.note ? ` — ${loc.note}` : ""}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

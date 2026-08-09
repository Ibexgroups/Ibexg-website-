"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  GOOGLE_MY_MAPS_EMBED_URL,
  PORTFOLIO_LOCATIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";

type Loc = (typeof PORTFOLIO_LOCATIONS)[number];

const STATES = ["All", "Texas", "Louisiana", "Mississippi"] as const;

const goldIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:18px;height:18px;border-radius:9999px;
    background:#D4AF37;border:2px solid #141820;
    box-shadow:0 2px 8px rgba(0,0,0,.35);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

function FitBounds({ points }: { points: Loc[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
  }, [map, points]);
  return null;
}

function googleMapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function PortfolioMap() {
  const [stateFilter, setStateFilter] = useState<(typeof STATES)[number]>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      stateFilter === "All"
        ? [...PORTFOLIO_LOCATIONS]
        : PORTFOLIO_LOCATIONS.filter((p) => p.state === stateFilter),
    [stateFilter]
  );

  const useGoogleEmbed = Boolean(GOOGLE_MY_MAPS_EMBED_URL);

  return (
    <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-[0_16px_48px_rgba(20,24,32,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 px-4 py-4 sm:px-6">
        <div>
          <p className="font-heading text-lg font-semibold text-charcoal">
            Multi-State Portfolio Map
          </p>
          <p className="text-sm text-muted">
            {filtered.length} locations · TX · LA · MS
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStateFilter(s)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                stateFilter === s
                  ? "bg-charcoal text-white"
                  : "border border-charcoal/15 text-charcoal/70 hover:border-gold hover:text-charcoal"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.9fr]">
        {/* Map */}
        <div className="relative h-[360px] sm:h-[440px] lg:h-[560px]">
          {useGoogleEmbed ? (
            <iframe
              title="IBEX Portfolio Map"
              src={GOOGLE_MY_MAPS_EMBED_URL}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <MapContainer
              center={[31.8, -92.5]}
              zoom={6}
              scrollWheelZoom={false}
              className="h-full w-full z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitBounds points={filtered} />
              {filtered.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={goldIcon}
                  eventHandlers={{
                    click: () => setActiveId(loc.id),
                  }}
                >
                  <Popup>
                    <div className="min-w-[180px] text-sm">
                      <p className="font-semibold text-charcoal">{loc.address}</p>
                      <p className="mt-1 text-xs text-muted">
                        {loc.state} · {loc.status}
                      </p>
                      <a
                        href={googleMapsLink(loc.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8]"
                      >
                        Open in Google Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* List */}
        <div className="max-h-[360px] overflow-y-auto border-t border-charcoal/10 sm:max-h-[440px] lg:max-h-[560px] lg:border-l lg:border-t-0">
          <ul className="divide-y divide-charcoal/10">
            {filtered.map((loc) => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(loc.id)}
                  className={cn(
                    "flex w-full gap-3 px-4 py-3.5 text-left transition-colors hover:bg-ivory sm:px-5",
                    activeId === loc.id && "bg-gold/10"
                  )}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-charcoal">
                      {loc.address}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {loc.state} · {loc.status}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-charcoal/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-charcoal/60">
                        {loc.fuelContract}
                      </span>
                    </div>
                    <a
                      href={googleMapsLink(loc.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#1a73e8] hover:underline"
                    >
                      Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

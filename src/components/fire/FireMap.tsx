import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockIncidents } from "@/data/mockFireData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, Layers, Locate, Maximize2 } from "lucide-react";

// Lesotho district boundaries (simplified polygons)
const lesothoDistricts: { name: string; coords: [number, number][]; riskLevel: string }[] = [
  {
    name: "Maseru",
    riskLevel: "high",
    coords: [
      [-29.2, 27.3], [-29.2, 27.7], [-29.5, 27.7], [-29.5, 27.3],
    ],
  },
  {
    name: "Berea",
    riskLevel: "moderate",
    coords: [
      [-29.0, 27.7], [-29.0, 28.1], [-29.3, 28.1], [-29.3, 27.7],
    ],
  },
  {
    name: "Leribe",
    riskLevel: "low",
    coords: [
      [-28.7, 27.8], [-28.7, 28.3], [-29.0, 28.3], [-29.0, 27.8],
    ],
  },
  {
    name: "Butha-Buthe",
    riskLevel: "low",
    coords: [
      [-28.6, 28.1], [-28.6, 28.6], [-28.8, 28.6], [-28.8, 28.1],
    ],
  },
  {
    name: "Mokhotlong",
    riskLevel: "moderate",
    coords: [
      [-28.8, 28.6], [-28.8, 29.2], [-29.2, 29.2], [-29.2, 28.6],
    ],
  },
  {
    name: "Thaba-Tseka",
    riskLevel: "high",
    coords: [
      [-29.2, 28.4], [-29.2, 29.0], [-29.6, 29.0], [-29.6, 28.4],
    ],
  },
  {
    name: "Qacha's Nek",
    riskLevel: "low",
    coords: [
      [-29.6, 28.6], [-29.6, 29.2], [-30.0, 29.2], [-30.0, 28.6],
    ],
  },
  {
    name: "Quthing",
    riskLevel: "moderate",
    coords: [
      [-29.8, 27.6], [-29.8, 28.2], [-30.2, 28.2], [-30.2, 27.6],
    ],
  },
  {
    name: "Mohale's Hoek",
    riskLevel: "low",
    coords: [
      [-29.5, 27.3], [-29.5, 27.9], [-29.9, 27.9], [-29.9, 27.3],
    ],
  },
  {
    name: "Mafeteng",
    riskLevel: "moderate",
    coords: [
      [-29.6, 27.0], [-29.6, 27.5], [-30.0, 27.5], [-30.0, 27.0],
    ],
  },
];

const riskColors: Record<string, { fill: string; stroke: string }> = {
  high: { fill: "rgba(159, 18, 57, 0.25)", stroke: "#9F1239" },
  moderate: { fill: "rgba(245, 158, 11, 0.18)", stroke: "#F59E0B" },
  low: { fill: "rgba(22, 101, 52, 0.15)", stroke: "#166534" },
};

const createFireIcon = (severity: string) => {
  const colors: Record<string, string> = {
    critical: "#ef4444",
    high: "#f59e0b",
    moderate: "#3b82f6",
    low: "#22c55e",
  };
  const color = colors[severity] || "#f59e0b";
  const size = severity === "critical" ? 36 : 28;

  return L.divIcon({
    className: "fire-marker",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      display: flex; align-items: center; justify-content: center;
      filter: drop-shadow(0 0 8px ${color}80);
      animation: ${severity === "critical" ? "pulse 1.5s ease-in-out infinite" : "none"};
    ">
      <svg viewBox="0 0 24 24" width="${size - 6}" height="${size - 6}" fill="${color}" stroke="${color}" stroke-width="0.5">
        <path d="M12 23c-3.5 0-7-2.5-7-7 0-3.5 2-6 4-8.5 1-1.25 2-2.5 2.5-4.5.5 2 1.5 3.25 2.5 4.5 2 2.5 4 5 4 8.5 0 4.5-3.5 7-7 7z"/>
        <path d="M12 23c-1.5 0-3-1-3-3.5s1.5-3.5 2.5-5c.3.8.8 1.5 1.5 2.5s1.5 2.5 1.5 4c0 1.5-.5 2-2.5 2z" fill="rgba(255,255,255,0.5)"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const FitBounds = () => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([[-28.5, 27.0], [-30.5, 29.5]], { padding: [20, 20] });
  }, [map]);
  return null;
};

const FireMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">National Fire Risk Map</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Locate className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-border/30">
        <MapContainer
          center={[-29.5, 28.25]}
          zoom={8}
          zoomControl={false}
          className="w-full h-full"
          style={{ background: "hsl(140 20% 4%)" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com">CARTO</a>'
          />
          <ZoomControl position="topright" />
          <FitBounds />

          {/* District risk zones */}
          {lesothoDistricts.map((district) => {
            const colors = riskColors[district.riskLevel];
            return (
              <Polygon
                key={district.name}
                positions={district.coords}
                pathOptions={{
                  fillColor: colors.fill,
                  fillOpacity: 0.6,
                  color: colors.stroke,
                  weight: 1.5,
                  dashArray: "4 4",
                }}
              >
                <Popup>
                  <div className="text-xs">
                    <strong>{district.name} District</strong>
                    <br />
                    Risk: <span style={{ color: colors.stroke }}>{district.riskLevel.toUpperCase()}</span>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

          {/* Incident markers with fire icons */}
          {mockIncidents.map((incident) => (
            <Marker
              key={incident.id}
              position={incident.coordinates}
              icon={createFireIcon(incident.severity)}
            >
              <Popup>
                <div className="text-xs min-w-[180px]">
                  <strong className="text-sm">{incident.title}</strong>
                  <p className="mt-1 text-gray-600">{incident.location}</p>
                  <p className="mt-1">
                    Severity: <strong>{incident.severity.toUpperCase()}</strong>
                  </p>
                  <p>Units: {incident.assignedUnits.join(", ")}</p>
                  <p>ETA: {incident.eta}</p>
                  <Link
                    to={`/incident/${incident.id}`}
                    className="inline-block mt-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        {[
          { label: "Critical", cls: "bg-urgent" },
          { label: "High", cls: "bg-warning" },
          { label: "Moderate", cls: "bg-accent" },
          { label: "Low", cls: "bg-success" },
        ].map((level) => (
          <div key={level.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${level.cls}`} />
            {level.label}
          </div>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {[
            { label: "High Risk Zone", color: "#9F1239" },
            { label: "Moderate Zone", color: "#F59E0B" },
            { label: "Low Risk Zone", color: "#166534" },
          ].map((z) => (
            <div key={z.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-3 h-2 rounded-sm border" style={{ backgroundColor: z.color + "40", borderColor: z.color }} />
              {z.label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FireMap;

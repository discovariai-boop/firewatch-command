import { useParams, Link } from "react-router-dom";
import { mockIncidents, mockUnits } from "@/data/mockFireData";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Users, AlertTriangle, Radio, Activity, Flame, Shield } from "lucide-react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const severityStyles: Record<string, string> = {
  critical: "bg-urgent/20 text-urgent border-urgent/40",
  high: "bg-warning/20 text-warning border-warning/40",
  moderate: "bg-accent/20 text-accent border-accent/40",
  low: "bg-success/20 text-success border-success/40",
};

const statusStyles: Record<string, string> = {
  active: "bg-urgent/20 text-urgent",
  responding: "bg-warning/20 text-warning",
  contained: "bg-accent/20 text-accent",
  resolved: "bg-success/20 text-success",
};

const timeline = [
  { time: "0 min", event: "Incident reported via citizen app", icon: AlertTriangle },
  { time: "1 min", event: "AI severity assessment completed — Score calculated", icon: Activity },
  { time: "2 min", event: "Units dispatched automatically", icon: Radio },
  { time: "4 min", event: "First responders en route", icon: Users },
  { time: "6 min", event: "Drone deployed for thermal imaging", icon: Flame },
  { time: "8 min", event: "Units arriving at scene", icon: MapPin },
];

const createPinIcon = (color: string) =>
  L.divIcon({
    className: "custom-pin",
    html: `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 0 6px ${color}80);">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="${color}" stroke="${color}" stroke-width="0.5">
        <path d="M12 23c-3.5 0-7-2.5-7-7 0-3.5 2-6 4-8.5 1-1.25 2-2.5 2.5-4.5.5 2 1.5 3.25 2.5 4.5 2 2.5 4 5 4 8.5 0 4.5-3.5 7-7 7z"/>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const incident = mockIncidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Incident Not Found</h2>
          <Link to="/" className="text-primary hover:underline text-sm">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const assignedUnits = mockUnits.filter((u) => incident.assignedUnits.includes(u.name));
  const pinColor = incident.severity === "critical" ? "#ef4444" : incident.severity === "high" ? "#f59e0b" : "#3b82f6";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card mx-4 mt-4 px-6 py-4 rounded-xl flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">{incident.title}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severityStyles[incident.severity]}`}>
                {incident.severity.toUpperCase()}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${statusStyles[incident.status]}`}>
                {incident.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {incident.id} • {incident.location} • Reported {incident.reportedAt}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-2xl font-bold text-primary font-mono">{incident.aiScore}</p>
            <p className="text-[10px] text-muted-foreground">AI RISK SCORE</p>
          </div>
        </div>
      </motion.div>

      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-4 rounded-xl"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Incident Location
            </h3>
            <div className="h-72 rounded-lg overflow-hidden border border-border/30">
              <MapContainer
                center={incident.coordinates}
                zoom={13}
                zoomControl={false}
                className="w-full h-full"
                style={{ background: "hsl(140 20% 4%)" }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <ZoomControl position="topright" />
                <Marker position={incident.coordinates} icon={createPinIcon(pinColor)} />
              </MapContainer>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 rounded-xl space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Incident Details
            </h3>
            {[
              { label: "Type", value: incident.type.charAt(0).toUpperCase() + incident.type.slice(1), icon: Flame },
              { label: "ETA", value: incident.eta, icon: Clock },
              { label: "Units Assigned", value: String(incident.assignedUnits.length), icon: Users },
              { label: "Coordinates", value: `${incident.coordinates[0].toFixed(4)}, ${incident.coordinates[1].toFixed(4)}`, icon: MapPin },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/40">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Assigned units */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">ASSIGNED UNITS</h4>
              <div className="space-y-2">
                {assignedUnits.length > 0 ? assignedUnits.map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{unit.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{unit.status}</span>
                  </div>
                )) : (
                  incident.assignedUnits.map((name) => (
                    <div key={name} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 rounded-xl"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Incident Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50" />
            <div className="space-y-4">
              {timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-4 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center z-10 shrink-0">
                    <entry.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="pt-1">
                    <p className="text-xs font-mono text-muted-foreground">{entry.time}</p>
                    <p className="text-sm text-foreground">{entry.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LPISTH FIRE COMMAND — INCIDENT {incident.id} — SECURE CHANNEL
          </p>
        </div>
      </main>
    </div>
  );
};

export default IncidentDetail;

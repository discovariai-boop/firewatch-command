import TopBar from "@/components/fire/TopBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { mockIncidents } from "@/data/mockFireData";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { MapPin, Clock, Users, Zap, Filter, Search, AlertTriangle, Flame, Car, TreePine, Skull } from "lucide-react";
import { useState } from "react";
import type { Incident } from "@/data/mockFireData";

const typeIcons: Record<Incident["type"], typeof Flame> = {
  building: Flame,
  vehicle: Car,
  wildfire: TreePine,
  hazmat: Skull,
  electrical: Zap,
};

const severityBadge: Record<string, string> = {
  critical: "bg-urgent/20 text-urgent border border-urgent/40",
  high: "bg-warning/20 text-warning border border-warning/40",
  moderate: "bg-info/20 text-info border border-info/40",
  low: "bg-success/20 text-success border border-success/40",
};

const statusBadge: Record<string, string> = {
  active: "bg-urgent text-urgent-foreground",
  responding: "bg-warning text-warning-foreground",
  contained: "bg-info text-info-foreground",
  resolved: "bg-success text-success-foreground",
};

const IncidentsPage = () => {
  const { incidents } = useLiveSimulation(5000);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = incidents.filter((inc) => {
    if (filter !== "all" && inc.status !== filter) return false;
    if (search && !inc.title.toLowerCase().includes(search.toLowerCase()) && !inc.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Incident Management</h2>
            <p className="text-sm text-muted-foreground">Real-time queue of all fire-related incidents</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          {["all", "active", "responding", "contained", "resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                filter === s ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {s} {s !== "all" && `(${incidents.filter((i) => i.status === s).length})`}
              {s === "all" && `(${incidents.length})`}
            </button>
          ))}
        </div>

        {/* Incidents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((incident, i) => {
            const TypeIcon = typeIcons[incident.type];
            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/incident/${incident.id}`}>
                  <div className={`glass-card p-5 hover:bg-secondary/30 transition-all cursor-pointer group ${
                    incident.severity === "critical" ? "glass-card-urgent" : ""
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${severityBadge[incident.severity]}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{incident.title}</p>
                          <p className="text-xs text-muted-foreground font-mono">{incident.id}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${statusBadge[incident.status]}`}>
                        {incident.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-info" />
                      <span className="text-xs text-muted-foreground">{incident.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/30">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 text-cyan" />
                        {incident.reportedAt}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="w-3 h-3 text-purple" />
                        {incident.assignedUnits.length} units
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <AlertTriangle className="w-3 h-3 text-warning" />
                        <span className="font-mono font-bold text-foreground">AI: {incident.aiScore}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No incidents match your filter</p>
          </div>
        )}

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LESOTHO NATIONAL FIRE COMMAND — INCIDENT QUEUE — SECURE CHANNEL
          </p>
        </div>
      </main>
    </div>
  );
};

export default IncidentsPage;

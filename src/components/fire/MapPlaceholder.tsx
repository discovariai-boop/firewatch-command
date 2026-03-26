import { motion } from "framer-motion";
import { Map, Locate, Layers, Maximize2 } from "lucide-react";
import { mockIncidents } from "@/data/mockFireData";

const severityColor: Record<string, string> = {
  critical: "bg-urgent",
  high: "bg-warning",
  moderate: "bg-accent",
  low: "bg-success",
};

const MapPlaceholder = () => {
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

      {/* Simulated map area */}
      <div className="relative w-full h-72 rounded-lg bg-secondary/40 grid-pattern overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />

        {/* Simulated incident pins */}
        {mockIncidents.map((incident, i) => {
          const left = 15 + ((i * 17 + 10) % 70);
          const top = 15 + ((i * 23 + 5) % 60);
          return (
            <motion.div
              key={incident.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
              className="absolute group cursor-pointer"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${severityColor[incident.severity]} ${
                incident.severity === "critical" ? "animate-pulse-urgent" : ""
              } ring-4 ring-current/10`} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-card border border-border text-[10px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {incident.title}
              </div>
            </motion.div>
          );
        })}

        {/* Lesotho outline hint */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-dashed border-border/30 rounded-full" />
          <p className="absolute text-xs text-muted-foreground/40 font-mono">LESOTHO</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        {["Critical", "High", "Moderate", "Low"].map((level) => (
          <div key={level} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${severityColor[level.toLowerCase()]}`} />
            {level}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MapPlaceholder;

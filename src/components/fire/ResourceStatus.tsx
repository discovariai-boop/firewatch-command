import { motion } from "framer-motion";
import { Truck, Fuel, Users } from "lucide-react";
import { mockUnits } from "@/data/mockFireData";

const statusColors: Record<string, string> = {
  available: "bg-success",
  enroute: "bg-warning",
  "at-scene": "bg-urgent",
  refueling: "bg-accent/60",
  maintenance: "bg-muted-foreground/50",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  enroute: "En Route",
  "at-scene": "At Scene",
  refueling: "Refueling",
  maintenance: "Maintenance",
};

const ResourceStatus = () => {
  const summary = {
    available: mockUnits.filter((u) => u.status === "available").length,
    enroute: mockUnits.filter((u) => u.status === "enroute").length,
    atScene: mockUnits.filter((u) => u.status === "at-scene").length,
    offline: mockUnits.filter((u) => u.status === "refueling" || u.status === "maintenance").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Fleet Status</h3>
        <Truck className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Ready", value: summary.available, color: "text-success" },
          { label: "En Route", value: summary.enroute, color: "text-warning" },
          { label: "On Scene", value: summary.atScene, color: "text-urgent" },
          { label: "Offline", value: summary.offline, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {mockUnits.map((unit) => (
          <div
            key={unit.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${statusColors[unit.status]} ${
                unit.status === "at-scene" ? "animate-pulse-urgent" : ""
              }`} />
              <div>
                <p className="text-xs font-medium text-foreground">{unit.name}</p>
                <p className="text-[10px] text-muted-foreground">{unit.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Users className="w-3 h-3" />
                {unit.crew}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Fuel className="w-3 h-3" />
                <span className={unit.fuelLevel < 30 ? "text-urgent font-bold" : ""}>
                  {unit.fuelLevel}%
                </span>
              </div>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                {statusLabels[unit.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourceStatus;

import TopBar from "@/components/fire/TopBar";
import { motion } from "framer-motion";
import { mockUnits } from "@/data/mockFireData";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { Truck, Fuel, Users, MapPin, Wrench, Droplets, Activity } from "lucide-react";

const statusColors: Record<string, string> = {
  available: "bg-success",
  enroute: "bg-warning",
  "at-scene": "bg-urgent",
  refueling: "bg-info",
  maintenance: "bg-muted-foreground/50",
};

const statusBadge: Record<string, string> = {
  available: "bg-success/20 text-success",
  enroute: "bg-warning/20 text-warning",
  "at-scene": "bg-urgent/20 text-urgent",
  refueling: "bg-info/20 text-info",
  maintenance: "bg-muted/50 text-muted-foreground",
};

const typeIcon: Record<string, typeof Truck> = {
  engine: Truck,
  ladder: Activity,
  hazmat: Droplets,
  rescue: Users,
  tanker: Fuel,
};

const ResourcesPage = () => {
  const { units } = useLiveSimulation(4000);

  const summary = [
    { label: "Available", count: units.filter((u) => u.status === "available").length, color: "text-success", glow: "metric-glow-green" },
    { label: "En Route", count: units.filter((u) => u.status === "enroute").length, color: "text-warning", glow: "metric-glow-amber" },
    { label: "At Scene", count: units.filter((u) => u.status === "at-scene").length, color: "text-urgent", glow: "metric-glow-red" },
    { label: "Offline", count: units.filter((u) => ["refueling", "maintenance"].includes(u.status)).length, color: "text-muted-foreground", glow: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-foreground">Resource & Fleet Management</h2>
          <p className="text-sm text-muted-foreground">Real-time status of all fire units, equipment, and crew</p>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-5 ${s.glow}`}
            >
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-4xl font-bold font-mono ${s.color}`}>{s.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Unit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {units.map((unit, i) => {
            const Icon = typeIcon[unit.type] || Truck;
            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card p-4 hover:bg-secondary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/15">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{unit.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{unit.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${statusBadge[unit.status]}`}>
                    {unit.status.replace("-", " ")}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-info" />
                    {unit.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5 text-purple" />
                      {unit.crew} crew
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Fuel className="w-3.5 h-3.5 text-cyan" />
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              unit.fuelLevel > 60 ? "bg-success" : unit.fuelLevel > 30 ? "bg-warning" : "bg-urgent"
                            }`}
                            style={{ width: `${unit.fuelLevel}%` }}
                          />
                        </div>
                        <span className={`font-mono text-xs font-bold ${unit.fuelLevel < 30 ? "text-urgent" : "text-foreground"}`}>
                          {unit.fuelLevel}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hydrant / Water section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-info" /> Water Sources & Hydrants
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Hydrants", value: "147", color: "text-success" },
              { label: "Under Maintenance", value: "8", color: "text-warning" },
              { label: "Water Tankers", value: "3 available", color: "text-info" },
              { label: "Reservoir Level", value: "82%", color: "text-cyan" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/40">
                <p className="text-[10px] text-muted-foreground mb-1">{item.label}</p>
                <p className={`text-xl font-bold font-mono ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LESOTHO NATIONAL FIRE COMMAND — FLEET MANAGEMENT — SECURE CHANNEL
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;

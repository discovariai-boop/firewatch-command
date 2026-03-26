import TopBar from "@/components/fire/TopBar";
import { motion } from "framer-motion";
import { Ambulance, ShieldCheck, Zap, Bus, ExternalLink, Phone, Radio, CheckCircle2, AlertTriangle, Building, Wifi } from "lucide-react";
import { useState } from "react";

const departments = [
  {
    name: "EMS / Health",
    icon: Ambulance,
    color: "text-success",
    bgColor: "bg-success/15",
    status: "online",
    metrics: [
      { label: "Burn Beds Available", value: "12", color: "text-success" },
      { label: "Ambulances Nearby", value: "4", color: "text-info" },
      { label: "Avg EMS Response", value: "8 min", color: "text-warning" },
    ],
    actions: ["Request Ambulance", "Notify Burns Unit", "Request Medic Team"],
    recentComms: [
      { time: "2 min ago", msg: "Burns unit on standby for Maseru Mall incident" },
      { time: "15 min ago", msg: "2 ambulances dispatched to A2 Highway" },
    ],
  },
  {
    name: "Police (LMPS)",
    icon: ShieldCheck,
    color: "text-info",
    bgColor: "bg-info/15",
    status: "online",
    metrics: [
      { label: "Units at Fire Scenes", value: "3", color: "text-info" },
      { label: "Road Blocks Active", value: "2", color: "text-warning" },
      { label: "Escorts Available", value: "5", color: "text-success" },
    ],
    actions: ["Request Escort", "Request Perimeter", "Report Arson"],
    recentComms: [
      { time: "5 min ago", msg: "Perimeter secured at Maseru Mall" },
      { time: "20 min ago", msg: "Traffic diversion on Kingsway Rd active" },
    ],
  },
  {
    name: "Electricity (LEC)",
    icon: Zap,
    color: "text-warning",
    bgColor: "bg-warning/15",
    status: "alert",
    metrics: [
      { label: "Power Line Fires", value: "1", color: "text-urgent" },
      { label: "Shutdowns Active", value: "2", color: "text-warning" },
      { label: "Grid Status", value: "Stable", color: "text-success" },
    ],
    actions: ["Request Shutdown", "Report Downed Line", "Request Engineer"],
    recentComms: [
      { time: "10 min ago", msg: "Roma Valley line de-energized for fire crew" },
      { time: "1h ago", msg: "Grid section B-12 restored" },
    ],
  },
  {
    name: "Transport & Roads",
    icon: Bus,
    color: "text-purple",
    bgColor: "bg-purple/15",
    status: "online",
    metrics: [
      { label: "Road Closures", value: "2", color: "text-urgent" },
      { label: "Detours Active", value: "3", color: "text-warning" },
      { label: "Cleared Routes", value: "8", color: "text-success" },
    ],
    actions: ["Request Closure", "Request Heavy Equipment", "Clear Route"],
    recentComms: [
      { time: "8 min ago", msg: "A2 Highway closure approved — detour via B4" },
      { time: "30 min ago", msg: "Heavy crane dispatched to Industrial Zone" },
    ],
  },
];

const CoordinationPage = () => {
  const [activeDept, setActiveDept] = useState<number>(0);
  const dept = departments[activeDept];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-foreground">Cross-Department Coordination</h2>
          <p className="text-sm text-muted-foreground">Live links to EMS, Police, Electricity, and Transport departments</p>
        </motion.div>

        {/* Department tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {departments.map((d, i) => (
            <motion.button
              key={d.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveDept(i)}
              className={`glass-card p-4 text-left transition-all ${
                activeDept === i ? "ring-2 ring-primary/50" : "hover:bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${d.bgColor}`}>
                  <d.icon className={`w-5 h-5 ${d.color}`} />
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-bold ${
                  d.status === "online" ? "text-success" : "text-warning"
                }`}>
                  <Wifi className="w-3 h-3" />
                  {d.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-bold text-foreground">{d.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Active department detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Metrics */}
          <motion.div key={`metrics-${activeDept}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <dept.icon className={`w-4 h-4 ${dept.color}`} />
              {dept.name} — Live Status
            </h3>
            <div className="space-y-3">
              {dept.metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <span className={`text-lg font-bold font-mono ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div key={`actions-${activeDept}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {dept.actions.map((action) => (
                <button
                  key={action}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    {action}
                  </span>
                  <span className="text-[10px] text-muted-foreground">One-click</span>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border/30 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-success/15 text-success text-xs font-medium hover:bg-success/25 transition-colors">
                <Phone className="w-3.5 h-3.5" /> Direct Line
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-info/15 text-info text-xs font-medium hover:bg-info/25 transition-colors">
                <Radio className="w-3.5 h-3.5" /> Radio Channel
              </button>
            </div>
          </motion.div>

          {/* Recent comms */}
          <motion.div key={`comms-${activeDept}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Communications</h3>
            <div className="space-y-3">
              {dept.recentComms.map((comm, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-foreground">{comm.msg}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">{comm.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LESOTHO NATIONAL FIRE COMMAND — CROSS-DEPARTMENT COORDINATION — SECURE CHANNEL
          </p>
        </div>
      </main>
    </div>
  );
};

export default CoordinationPage;

import TopBar from "@/components/fire/TopBar";
import LiveMetrics from "@/components/fire/LiveMetrics";
import MapPlaceholder from "@/components/fire/MapPlaceholder";
import IncidentCard from "@/components/fire/IncidentCard";
import ResourceStatus from "@/components/fire/ResourceStatus";
import FireCharts from "@/components/fire/FireCharts";
import CrossDeptPanel from "@/components/fire/CrossDeptPanel";
import { mockIncidents } from "@/data/mockFireData";
import { motion } from "framer-motion";

const FireDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        {/* Metrics */}
        <LiveMetrics />

        {/* Map + Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <MapPlaceholder />
          </div>
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Active Incidents</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-urgent/20 text-urgent font-mono">
                  {mockIncidents.filter((i) => i.status === "active").length} CRITICAL
                </span>
              </div>
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {mockIncidents.map((incident, i) => (
                  <IncidentCard key={incident.id} incident={incident} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Charts */}
        <FireCharts />

        {/* Resources + Cross-dept */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ResourceStatus />
          <CrossDeptPanel />
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LPISTH FIRE COMMAND v2.4.1 — SECURE CHANNEL — LAST SYNC: LIVE
          </p>
        </div>
      </main>
    </div>
  );
};

export default FireDashboard;

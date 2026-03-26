import { motion } from "framer-motion";
import { Ambulance, ShieldCheck, Zap, Bus, ExternalLink } from "lucide-react";

const departments = [
  {
    name: "EMS / Health",
    icon: Ambulance,
    status: "12 burn beds available",
    statusColor: "text-success",
    action: "Request ambulance",
  },
  {
    name: "Police",
    icon: ShieldCheck,
    status: "2 units securing scene",
    statusColor: "text-accent",
    action: "Request escort",
  },
  {
    name: "Electricity (LEC)",
    icon: Zap,
    status: "1 power line fire active",
    statusColor: "text-warning",
    action: "Request shutdown",
  },
  {
    name: "Transport",
    icon: Bus,
    status: "A2 Hwy closure pending",
    statusColor: "text-muted-foreground",
    action: "Request closure",
  },
];

const CrossDeptPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Cross-Department Links</h3>
      <div className="space-y-2">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <dept.icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">{dept.name}</p>
                <p className={`text-[10px] ${dept.statusColor}`}>{dept.status}</p>
              </div>
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
              {dept.action}
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CrossDeptPanel;

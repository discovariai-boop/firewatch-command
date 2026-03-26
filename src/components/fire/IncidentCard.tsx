import { motion } from "framer-motion";
import { MapPin, Users, Clock, AlertTriangle, Flame, Car, Zap, Skull, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import type { Incident } from "@/data/mockFireData";

const typeIcons: Record<Incident["type"], typeof Flame> = {
  building: Flame,
  vehicle: Car,
  wildfire: TreePine,
  hazmat: Skull,
  electrical: Zap,
};

const severityStyles: Record<Incident["severity"], string> = {
  critical: "bg-urgent/20 text-urgent border-urgent/40",
  high: "bg-warning/20 text-warning border-warning/40",
  moderate: "bg-accent/10 text-accent border-accent/30",
  low: "bg-success/20 text-success border-success/40",
};

const statusStyles: Record<Incident["status"], string> = {
  active: "bg-urgent text-urgent-foreground",
  responding: "bg-warning text-warning-foreground",
  contained: "bg-success text-success-foreground",
  resolved: "bg-muted text-muted-foreground",
};

const IncidentCard = ({ incident, index }: { incident: Incident; index: number }) => {
  const TypeIcon = typeIcons[incident.type];

  return (
    <Link to={`/incident/${incident.id}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
        className={`glass-card p-4 cursor-pointer hover:bg-secondary/30 transition-all group ${
          incident.severity === "critical" ? "glass-card-urgent" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${severityStyles[incident.severity]}`}>
              <TypeIcon className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {incident.title}
              </p>
              <p className="text-xs text-muted-foreground font-mono">{incident.id}</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full ${statusStyles[incident.status]}`}>
            {incident.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{incident.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{incident.assignedUnits.length} units</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{incident.eta}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
          <span className="text-[10px] text-muted-foreground">{incident.reportedAt}</span>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 text-warning" />
            <span className="text-xs font-mono font-semibold text-foreground">
              AI: {incident.aiScore}%
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default IncidentCard;

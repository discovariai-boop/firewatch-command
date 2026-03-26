import { motion } from "framer-motion";
import { Flame, Clock, Truck, BedDouble, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { mockMetrics } from "@/data/mockFireData";

const icons = [Flame, Clock, Truck, BedDouble];
const glows = ["metric-glow-red", "metric-glow-green", "metric-glow-amber", ""];

const LiveMetrics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {mockMetrics.map((metric, i) => {
        const Icon = icons[i];
        const TrendIcon =
          metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus;

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className={`glass-card p-5 ${glows[i]} ${
              metric.type === "urgent" ? "glass-card-urgent" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`p-2 rounded-lg ${
                  metric.type === "urgent"
                    ? "bg-urgent/20 text-urgent"
                    : metric.type === "warning"
                    ? "bg-warning/20 text-warning"
                    : metric.type === "success"
                    ? "bg-success/20 text-success"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              {metric.type === "urgent" && (
                <span className="w-2 h-2 rounded-full bg-urgent animate-pulse-urgent" />
              )}
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">{metric.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <div className="flex items-center gap-1 text-xs">
                <TrendIcon className={`w-3 h-3 ${
                  metric.type === "success" ? "text-success" : 
                  metric.type === "urgent" ? "text-urgent" : "text-muted-foreground"
                }`} />
                <span className="text-muted-foreground font-mono">
                  {metric.change > 0 ? "+" : ""}{metric.change}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LiveMetrics;

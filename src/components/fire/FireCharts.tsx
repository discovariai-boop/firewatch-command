import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { responseTimeData, incidentTypeData, fireRiskForecast } from "@/data/mockFireData";

const chartTooltipStyle = {
  contentStyle: {
    background: "hsl(220, 30%, 8%)",
    border: "1px solid hsl(140, 10%, 16%)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "hsl(140, 10%, 90%)",
  },
};

const FireCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Response Time (24h)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={responseTimeData}>
            <defs>
              <linearGradient id="responseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(347, 82%, 35%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(347, 82%, 35%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} unit=" min" />
            <Tooltip {...chartTooltipStyle} />
            <Area type="monotone" dataKey="time" stroke="hsl(347, 82%, 45%)" fill="url(#responseGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Incident Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Incidents by Type (30d)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={incidentTypeData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip {...chartTooltipStyle} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {incidentTypeData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Fire Risk Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Fire Risk Forecast</h3>
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-warning/20 text-warning">
            HIGH RISK
          </span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={fireRiskForecast}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(140, 8%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
            <Tooltip {...chartTooltipStyle} />
            <Area type="monotone" dataKey="risk" stroke="hsl(38, 92%, 50%)" fill="url(#riskGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default FireCharts;

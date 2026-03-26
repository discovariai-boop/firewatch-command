import TopBar from "@/components/fire/TopBar";
import { motion } from "framer-motion";
import { Brain, Thermometer, Wind, MapPin, AlertTriangle, TrendingUp, Flame, CloudRain } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line,
} from "recharts";
import { fireRiskForecast } from "@/data/mockFireData";

const chartTooltip = {
  contentStyle: {
    background: "hsl(220, 30%, 10%)",
    border: "1px solid hsl(220, 15%, 20%)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "hsl(210, 20%, 95%)",
  },
};

const riskZones = [
  { district: "Maseru", risk: 87, trend: "rising", vegetation: "Dry grass", prevIncidents: 12 },
  { district: "Thaba-Tseka", risk: 74, trend: "stable", vegetation: "Mixed scrub", prevIncidents: 6 },
  { district: "Berea", risk: 62, trend: "falling", vegetation: "Agricultural", prevIncidents: 8 },
  { district: "Mokhotlong", risk: 58, trend: "rising", vegetation: "Highland grass", prevIncidents: 3 },
  { district: "Leribe", risk: 45, trend: "stable", vegetation: "Urban/Mixed", prevIncidents: 5 },
  { district: "Quthing", risk: 41, trend: "falling", vegetation: "Semi-arid", prevIncidents: 2 },
];

const weatherData = [
  { hour: "06:00", temp: 18, humidity: 45, windSpeed: 12 },
  { hour: "09:00", temp: 24, humidity: 35, windSpeed: 18 },
  { hour: "12:00", temp: 31, humidity: 22, windSpeed: 25 },
  { hour: "15:00", temp: 34, humidity: 18, windSpeed: 30 },
  { hour: "18:00", temp: 28, humidity: 28, windSpeed: 20 },
  { hour: "21:00", temp: 22, humidity: 40, windSpeed: 15 },
];

const spreadSimulation = [
  { time: "T+0h", area: 0.5 },
  { time: "T+1h", area: 1.2 },
  { time: "T+2h", area: 2.8 },
  { time: "T+3h", area: 5.1 },
  { time: "T+4h", area: 7.4 },
  { time: "T+6h", area: 12.8 },
  { time: "T+8h", area: 18.5 },
  { time: "T+12h", area: 24.2 },
];

const IntelligencePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple" /> Predictive Fire Intelligence
          </h2>
          <p className="text-sm text-muted-foreground">AI-powered fire risk analysis based on weather, vegetation, power lines, and historical data</p>
        </motion.div>

        {/* Risk zones table */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">High-Risk Zone Alerts</h3>
            <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-urgent/20 text-urgent animate-pulse-urgent">
              2 CRITICAL ZONES
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border/30">
                  <th className="pb-2 font-medium">District</th>
                  <th className="pb-2 font-medium">Risk Score</th>
                  <th className="pb-2 font-medium">Trend</th>
                  <th className="pb-2 font-medium">Vegetation</th>
                  <th className="pb-2 font-medium">Past Incidents (90d)</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {riskZones.map((zone, i) => (
                  <motion.tr
                    key={zone.district}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="border-b border-border/20 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-info" />
                      {zone.district}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              zone.risk > 70 ? "bg-urgent" : zone.risk > 50 ? "bg-warning" : "bg-success"
                            }`}
                            style={{ width: `${zone.risk}%` }}
                          />
                        </div>
                        <span className={`font-mono font-bold text-xs ${
                          zone.risk > 70 ? "text-urgent" : zone.risk > 50 ? "text-warning" : "text-success"
                        }`}>{zone.risk}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-medium ${
                        zone.trend === "rising" ? "text-urgent" : zone.trend === "falling" ? "text-success" : "text-muted-foreground"
                      }`}>
                        {zone.trend === "rising" ? "↑" : zone.trend === "falling" ? "↓" : "→"} {zone.trend}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{zone.vegetation}</td>
                    <td className="py-3 text-xs font-mono text-foreground">{zone.prevIncidents}</td>
                    <td className="py-3">
                      {zone.risk > 70 ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-urgent/20 text-urgent">ALERT</span>
                      ) : zone.risk > 50 ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-warning/20 text-warning">WATCH</span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/20 text-success">NORMAL</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weather conditions */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-info" /> Weather Conditions (Today)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weatherData}>
                <XAxis dataKey="hour" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="temp" stroke="hsl(0, 85%, 55%)" strokeWidth={2} dot={{ fill: "hsl(0, 85%, 55%)", r: 3 }} name="Temp °C" />
                <Line type="monotone" dataKey="windSpeed" stroke="hsl(200, 90%, 55%)" strokeWidth={2} dot={{ fill: "hsl(200, 90%, 55%)", r: 3 }} name="Wind km/h" />
                <Line type="monotone" dataKey="humidity" stroke="hsl(145, 70%, 42%)" strokeWidth={2} dot={{ fill: "hsl(145, 70%, 42%)", r: 3 }} name="Humidity %" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Wildfire spread prediction */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-urgent" /> Wildfire Spread Prediction
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={spreadSimulation}>
                <defs>
                  <linearGradient id="spreadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 85%, 55%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(38, 95%, 55%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} unit=" ha" />
                <Tooltip {...chartTooltip} />
                <Area type="monotone" dataKey="area" stroke="hsl(0, 85%, 55%)" fill="url(#spreadGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Fire Risk Forecast */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-warning" /> 24-Hour Fire Risk Forecast
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fireRiskForecast}>
              <XAxis dataKey="time" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
                {fireRiskForecast.map((entry, i) => (
                  <Cell key={i} fill={entry.risk > 70 ? "hsl(0, 85%, 55%)" : entry.risk > 50 ? "hsl(38, 95%, 55%)" : "hsl(145, 70%, 42%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LESOTHO NATIONAL FIRE COMMAND — PREDICTIVE INTELLIGENCE — AI-POWERED
          </p>
        </div>
      </main>
    </div>
  );
};

export default IntelligencePage;

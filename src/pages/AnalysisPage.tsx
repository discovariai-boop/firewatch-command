import TopBar from "@/components/fire/TopBar";
import { motion } from "framer-motion";
import { BarChart3, Clock, TrendingDown, FileText, CheckCircle2, AlertTriangle, Target, Award } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line,
} from "recharts";

const chartTooltip = {
  contentStyle: {
    background: "hsl(220, 30%, 10%)",
    border: "1px solid hsl(220, 15%, 20%)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "hsl(210, 20%, 95%)",
  },
};

const monthlyResponse = [
  { month: "Jan", time: 7.8 }, { month: "Feb", time: 7.2 }, { month: "Mar", time: 6.9 },
  { month: "Apr", time: 6.5 }, { month: "May", time: 6.8 }, { month: "Jun", time: 6.2 },
];

const incidentOutcomes = [
  { name: "Contained", value: 42, fill: "hsl(145, 70%, 42%)" },
  { name: "Property Saved", value: 28, fill: "hsl(200, 90%, 55%)" },
  { name: "Lives Saved", value: 18, fill: "hsl(270, 75%, 60%)" },
  { name: "Escalated", value: 12, fill: "hsl(0, 85%, 55%)" },
];

const weeklyIncidents = [
  { day: "Mon", count: 8 }, { day: "Tue", count: 5 }, { day: "Wed", count: 12 },
  { day: "Thu", count: 7 }, { day: "Fri", count: 15 }, { day: "Sat", count: 9 }, { day: "Sun", count: 4 },
];

const resolvedIncidents = [
  {
    id: "FI-2024-0840",
    title: "Warehouse Fire — Maputsoe",
    resolved: "2 days ago",
    responseTime: "5.4 min",
    duration: "2h 15m",
    aiSummary: "Fire originated from electrical fault in storage area B. Spread contained within 25 minutes. No casualties. Structural damage limited to 15% of building. Recommend electrical audit for adjacent units.",
    lessons: ["Early drone deployment improved situational awareness", "Cross-department water supply coordination was effective"],
    score: 92,
  },
  {
    id: "FI-2024-0838",
    title: "Grassland Fire — Mohale's Hoek",
    resolved: "4 days ago",
    responseTime: "12.1 min",
    duration: "4h 30m",
    aiSummary: "Wind-driven grassland fire affecting 8 hectares. Firebreak strategy deployed successfully. Two nearby homesteads evacuated. Fire extinguished using combined ground and aerial approach.",
    lessons: ["Remote area response time needs improvement", "Tanker pre-positioning during dry season recommended"],
    score: 78,
  },
  {
    id: "FI-2024-0835",
    title: "Vehicle Fire — Maseru Bridge",
    resolved: "1 week ago",
    responseTime: "4.2 min",
    duration: "45m",
    aiSummary: "Single vehicle fire on Maseru Bridge approach. Quick containment prevented traffic disruption. Driver safely evacuated before unit arrival. Cause: engine overheating.",
    lessons: ["Quick response time — below target", "Police coordination for traffic was seamless"],
    score: 96,
  },
];

const AnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-4 space-y-4 max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-info" /> Post-Incident Analysis
          </h2>
          <p className="text-sm text-muted-foreground">Timeline views, AI-generated summaries, and response analytics</p>
        </motion.div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Avg Response Time", value: "6.2 min", icon: Clock, color: "text-success", glow: "metric-glow-green", trend: "↓ 12% vs last month" },
            { label: "Incidents Resolved", value: "47", icon: CheckCircle2, color: "text-info", glow: "metric-glow-blue", trend: "↑ 8% vs last month" },
            { label: "Success Rate", value: "94%", icon: Target, color: "text-purple", glow: "metric-glow-purple", trend: "↑ 3% improvement" },
            { label: "Avg AI Score", value: "87", icon: Award, color: "text-warning", glow: "metric-glow-amber", trend: "Accuracy improving" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-5 ${kpi.glow}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className={`text-3xl font-bold font-mono ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{kpi.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Response Time Trend (6mo)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyResponse}>
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} unit=" min" />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="time" stroke="hsl(145, 70%, 42%)" strokeWidth={3} dot={{ fill: "hsl(145, 70%, 42%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Incident Outcomes</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={incidentOutcomes} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4}>
                  {incidentOutcomes.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {incidentOutcomes.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  {item.name}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Incident Volume</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyIncidents}>
                <XAxis dataKey="day" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {weeklyIncidents.map((entry, i) => (
                    <Cell key={i} fill={entry.count > 10 ? "hsl(0, 85%, 55%)" : entry.count > 7 ? "hsl(38, 95%, 55%)" : "hsl(200, 90%, 55%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Resolved incidents with AI summaries */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple" /> Resolved Incidents — AI Summaries
          </h3>
          <div className="space-y-4">
            {resolvedIncidents.map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{inc.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-mono">
                      <span>{inc.id}</span>
                      <span>• Resolved {inc.resolved}</span>
                      <span>• Response: {inc.responseTime}</span>
                      <span>• Duration: {inc.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold font-mono ${
                      inc.score >= 90 ? "text-success" : inc.score >= 75 ? "text-info" : "text-warning"
                    }`}>{inc.score}</p>
                    <p className="text-[10px] text-muted-foreground">AI SCORE</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 mb-3">
                  <p className="text-xs text-foreground/80 leading-relaxed">{inc.aiSummary}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">LESSONS LEARNED</p>
                  <div className="space-y-1">
                    {inc.lessons.map((lesson, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-foreground/70">
                        <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                        {lesson}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center py-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            LESOTHO NATIONAL FIRE COMMAND — POST-INCIDENT ANALYSIS — AI-GENERATED
          </p>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;

export interface Incident {
  id: string;
  type: "building" | "vehicle" | "wildfire" | "hazmat" | "electrical";
  title: string;
  location: string;
  severity: "critical" | "high" | "moderate" | "low";
  status: "active" | "responding" | "contained" | "resolved";
  reportedAt: string;
  assignedUnits: string[];
  eta: string;
  aiScore: number;
  coordinates: [number, number];
}

export interface FireUnit {
  id: string;
  name: string;
  type: "engine" | "ladder" | "hazmat" | "rescue" | "tanker";
  status: "available" | "enroute" | "at-scene" | "refueling" | "maintenance";
  crew: number;
  fuelLevel: number;
  location: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "stable";
  type: "urgent" | "warning" | "success" | "neutral";
}

export const mockIncidents: Incident[] = [
  {
    id: "FI-2024-0847",
    type: "building",
    title: "Structure Fire — Maseru Mall",
    location: "Kingsway Rd, Maseru",
    severity: "critical",
    status: "active",
    reportedAt: "2 min ago",
    assignedUnits: ["Engine 7", "Ladder 3", "Rescue 1"],
    eta: "4 min",
    aiScore: 94,
    coordinates: [-29.3167, 27.4833],
  },
  {
    id: "FI-2024-0846",
    type: "wildfire",
    title: "Grassland Fire — Thaba Bosiu",
    location: "Thaba Bosiu Heritage Site",
    severity: "high",
    status: "responding",
    reportedAt: "18 min ago",
    assignedUnits: ["Engine 12", "Tanker 2"],
    eta: "12 min",
    aiScore: 78,
    coordinates: [-29.3833, 27.6167],
  },
  {
    id: "FI-2024-0845",
    type: "vehicle",
    title: "Vehicle Fire — A2 Highway",
    location: "A2 near Maputsoe Junction",
    severity: "moderate",
    status: "responding",
    reportedAt: "25 min ago",
    assignedUnits: ["Engine 4"],
    eta: "8 min",
    aiScore: 52,
    coordinates: [-28.8833, 27.9000],
  },
  {
    id: "FI-2024-0844",
    type: "hazmat",
    title: "Chemical Spill — Industrial Zone",
    location: "Thetsane Industrial Area",
    severity: "high",
    status: "active",
    reportedAt: "35 min ago",
    assignedUnits: ["Hazmat 1", "Engine 9"],
    eta: "On scene",
    aiScore: 85,
    coordinates: [-29.3500, 27.4500],
  },
  {
    id: "FI-2024-0843",
    type: "electrical",
    title: "Power Line Fire — Roma Valley",
    location: "Roma, Maseru District",
    severity: "moderate",
    status: "contained",
    reportedAt: "1h ago",
    assignedUnits: ["Engine 2"],
    eta: "On scene",
    aiScore: 41,
    coordinates: [-29.4500, 27.7167],
  },
];

export const mockUnits: FireUnit[] = [
  { id: "E1", name: "Engine 1", type: "engine", status: "available", crew: 4, fuelLevel: 92, location: "Station 1 — Maseru Central" },
  { id: "E4", name: "Engine 4", type: "engine", status: "enroute", crew: 4, fuelLevel: 78, location: "En route — A2 Highway" },
  { id: "E7", name: "Engine 7", type: "engine", status: "at-scene", crew: 5, fuelLevel: 65, location: "Maseru Mall" },
  { id: "E9", name: "Engine 9", type: "engine", status: "at-scene", crew: 4, fuelLevel: 71, location: "Thetsane Industrial" },
  { id: "E12", name: "Engine 12", type: "engine", status: "enroute", crew: 4, fuelLevel: 88, location: "En route — Thaba Bosiu" },
  { id: "L3", name: "Ladder 3", type: "ladder", status: "at-scene", crew: 3, fuelLevel: 55, location: "Maseru Mall" },
  { id: "H1", name: "Hazmat 1", type: "hazmat", status: "at-scene", crew: 3, fuelLevel: 82, location: "Thetsane Industrial" },
  { id: "R1", name: "Rescue 1", type: "rescue", status: "at-scene", crew: 4, fuelLevel: 60, location: "Maseru Mall" },
  { id: "T2", name: "Tanker 2", type: "tanker", status: "enroute", crew: 2, fuelLevel: 95, location: "En route — Thaba Bosiu" },
  { id: "E3", name: "Engine 3", type: "engine", status: "available", crew: 4, fuelLevel: 100, location: "Station 2 — Mafeteng" },
  { id: "E6", name: "Engine 6", type: "engine", status: "refueling", crew: 0, fuelLevel: 12, location: "Station 1 — Maseru Central" },
  { id: "E8", name: "Engine 8", type: "engine", status: "maintenance", crew: 0, fuelLevel: 45, location: "Station 3 — Leribe" },
];

export const mockMetrics: MetricData[] = [
  { label: "Active Incidents", value: 4, change: 2, trend: "up", type: "urgent" },
  { label: "Avg Response Time", value: "6.2 min", change: -0.8, trend: "down", type: "success" },
  { label: "Units Deployed", value: 9, change: 3, trend: "up", type: "warning" },
  { label: "Burn Beds Available", value: 12, change: -2, trend: "down", type: "neutral" },
];

export const responseTimeData = [
  { hour: "00:00", time: 5.2 },
  { hour: "04:00", time: 4.8 },
  { hour: "08:00", time: 7.1 },
  { hour: "12:00", time: 6.5 },
  { hour: "16:00", time: 8.2 },
  { hour: "20:00", time: 6.8 },
  { hour: "Now", time: 6.2 },
];

export const incidentTypeData = [
  { name: "Building", count: 12, fill: "hsl(347, 82%, 35%)" },
  { name: "Wildfire", count: 8, fill: "hsl(38, 92%, 50%)" },
  { name: "Vehicle", count: 15, fill: "hsl(200, 60%, 45%)" },
  { name: "Hazmat", count: 4, fill: "hsl(280, 60%, 50%)" },
  { name: "Electrical", count: 6, fill: "hsl(152, 60%, 35%)" },
];

export const fireRiskForecast = [
  { time: "Now", risk: 72 },
  { time: "+3h", risk: 78 },
  { time: "+6h", risk: 65 },
  { time: "+9h", risk: 58 },
  { time: "+12h", risk: 45 },
  { time: "+18h", risk: 52 },
  { time: "+24h", risk: 61 },
];

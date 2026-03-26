import { useState, useEffect, useCallback } from "react";
import type { Incident, FireUnit, MetricData } from "@/data/mockFireData";
import { mockIncidents, mockUnits, mockMetrics } from "@/data/mockFireData";

const severities: Incident["severity"][] = ["critical", "high", "moderate", "low"];
const statuses: Incident["status"][] = ["active", "responding", "contained", "resolved"];
const unitStatuses: FireUnit["status"][] = ["available", "enroute", "at-scene", "refueling"];

function jitter(val: number, range: number) {
  return +(val + (Math.random() - 0.5) * range).toFixed(1);
}

export function useLiveSimulation(intervalMs = 4000) {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [units, setUnits] = useState<FireUnit[]>(mockUnits);
  const [metrics, setMetrics] = useState<MetricData[]>(mockMetrics);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const tick = useCallback(() => {
    // Randomly update an incident
    setIncidents((prev) =>
      prev.map((inc) => {
        if (Math.random() > 0.7) {
          const newSev = Math.random() > 0.8
            ? severities[Math.floor(Math.random() * severities.length)]
            : inc.severity;
          const statusIdx = statuses.indexOf(inc.status);
          const newStatus = Math.random() > 0.75 && statusIdx < statuses.length - 1
            ? statuses[statusIdx + 1]
            : inc.status;
          return {
            ...inc,
            severity: newSev,
            status: newStatus,
            aiScore: Math.min(100, Math.max(10, inc.aiScore + Math.floor((Math.random() - 0.5) * 10))),
            coordinates: [
              jitter(inc.coordinates[0], 0.01),
              jitter(inc.coordinates[1], 0.01),
            ] as [number, number],
          };
        }
        return inc;
      })
    );

    // Randomly update units
    setUnits((prev) =>
      prev.map((unit) => {
        if (Math.random() > 0.75) {
          return {
            ...unit,
            status: unitStatuses[Math.floor(Math.random() * unitStatuses.length)],
            fuelLevel: Math.min(100, Math.max(5, unit.fuelLevel + Math.floor((Math.random() - 0.3) * 8))),
          };
        }
        return unit;
      })
    );

    // Update metrics
    setMetrics((prev) =>
      prev.map((m) => {
        const delta = +(Math.random() * 2 - 1).toFixed(1);
        if (m.label === "Active Incidents") {
          const v = Math.max(1, (m.value as number) + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0));
          return { ...m, value: v, change: v > 3 ? 2 : -1, trend: v > 3 ? "up" as const : "down" as const };
        }
        if (m.label === "Avg Response Time") {
          const t = jitter(parseFloat(String(m.value)), 1.5);
          return { ...m, value: `${Math.max(2, t)} min`, change: delta, trend: delta > 0 ? "up" as const : "down" as const };
        }
        return { ...m, change: delta };
      })
    );

    setLastUpdate(Date.now());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [tick, intervalMs]);

  return { incidents, units, metrics, lastUpdate };
}

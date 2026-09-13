import React from "react";
import { 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Plus, 
  ShieldCheck, 
  Activity 
} from "lucide-react";

export function ServiceCatalogView({ services, onDeclareForService }) {
  const getBudgetColor = (pct) => {
    if (pct > 75) return "var(--color-green)";
    if (pct > 30) return "var(--color-yellow)";
    return "var(--color-red)";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "healthy":
        return (
          <span className="badge" style={{ background: "rgba(39, 174, 96, 0.12)", color: "#27ae60", border: "1px solid rgba(39, 174, 96, 0.25)" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#27ae60" }} />
            Operational
          </span>
        );
      case "degraded":
        return (
          <span className="badge" style={{ background: "rgba(242, 153, 74, 0.12)", color: "#f2994a", border: "1px solid rgba(242, 153, 74, 0.25)" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#f2994a" }} />
            Degraded
          </span>
        );
      case "outage":
        return (
          <span className="badge badge-p0">
            <span className="pulse-red" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#eb5757" }} />
            Critical Outage
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
        <div style={{
          padding: "14px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)"
        }}>
          <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
            Monitored Services
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)" }}>
            {services.length}
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            4 Tier-1 Critical, 2 Tier-2 High
          </div>
        </div>

        <div style={{
          padding: "14px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)"
        }}>
          <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
            Fleet Uptime (30d)
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-green)" }}>
            99.95%
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            Meeting global SLA target 99.90%
          </div>
        </div>

        <div style={{
          padding: "14px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)"
        }}>
          <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
            Active Impacted Services
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-red)" }}>
            2
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            1 Outage, 1 Degraded
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div style={{
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-primary)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--color-border-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Service Reliability Catalog
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
            SLO error budget calculation
          </span>
        </div>

        {/* Table rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              className="service-row-item"
            >
              {/* Name & Tier */}
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {svc.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
                  {svc.tier}
                </div>
              </div>

              {/* Status */}
              <div>
                {getStatusBadge(svc.status)}
              </div>

              {/* Error Budget Gauge */}
              <div style={{ paddingRight: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "var(--color-text-tertiary)" }}>Budget:</span>
                  <span style={{ fontWeight: 600, color: getBudgetColor(svc.errorBudgetRemaining) }}>
                    {svc.errorBudgetRemaining}%
                  </span>
                </div>
                <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    width: `${svc.errorBudgetRemaining}%`,
                    height: "100%",
                    background: getBudgetColor(svc.errorBudgetRemaining),
                    transition: "width 0.3s ease"
                  }} />
                </div>
              </div>

              {/* Latency */}
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: svc.status === "outage" ? "var(--color-red)" : "var(--color-text-primary)" }}>
                  {svc.p99Latency}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--color-text-tertiary)" }}>
                  base: {svc.normalLatency}
                </div>
              </div>

              {/* On-Call */}
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)"
                }}>
                  {svc.onCall.initials}
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>
                    {svc.onCall.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>
                    {svc.owner}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => onDeclareForService(svc)}
                  className="btn btn-secondary"
                  style={{ height: "26px", fontSize: "11px" }}
                >
                  <Plus size={11} />
                  <span>Alert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

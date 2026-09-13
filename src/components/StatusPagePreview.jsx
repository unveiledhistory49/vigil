import React, { useState } from "react";
import { 
  Radio, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Check,
  ExternalLink
} from "lucide-react";

export function StatusPagePreview({ incidents, services }) {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const activeIncidents = incidents.filter(i => i.status !== "resolved");
  const hasOutage = activeIncidents.some(i => i.severity === "P0");
  const hasDegraded = activeIncidents.some(i => i.severity === "P1");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribedEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setSubscribedEmail("");
    }, 2500);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "780px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Top Status Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--color-border-primary)", paddingBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #5e6ad2 0%, #2f3475 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Radio size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                Acme Systems Status
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                Public Status Dashboard Preview
              </div>
            </div>
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <label htmlFor="status-subscribe-email" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Email address for incident notifications
            </label>
            <input
              id="status-subscribe-email"
              name="subscriberEmail"
              type="email"
              placeholder="engineer@company.com"
              aria-label="Email address for incident notifications"
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              style={{
                height: "28px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--color-border-primary)",
                borderRadius: "var(--radius-md)",
                padding: "0 8px",
                fontSize: "11.5px",
                color: "var(--color-text-primary)",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ height: "28px", fontSize: "11.5px" }}
            >
              {isSubscribed ? <Check size={12} color="var(--color-green)" /> : <Mail size={12} />}
              <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
            </button>
          </form>
        </div>

        {/* Global Banner */}
        <div style={{
          padding: "16px 20px",
          borderRadius: "var(--radius-lg)",
          background: hasOutage ? "rgba(235, 87, 87, 0.12)" : hasDegraded ? "rgba(242, 153, 74, 0.12)" : "rgba(39, 174, 96, 0.12)",
          border: hasOutage ? "1px solid rgba(235, 87, 87, 0.3)" : hasDegraded ? "1px solid rgba(242, 153, 74, 0.3)" : "1px solid rgba(39, 174, 96, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: hasOutage ? "var(--color-red)" : hasDegraded ? "var(--color-orange)" : "var(--color-green)"
          }} className={hasOutage ? "pulse-red" : ""} />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: hasOutage ? "#ff7878" : hasDegraded ? "#ffa959" : "var(--color-green)" }}>
              {hasOutage ? "Partial System Outage in EU-West Ingress" : hasDegraded ? "Degraded Service Performance" : "All Global Systems Operational"}
            </div>
            <div style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Incident triage active. SRE engineers are actively mitigating impact.
            </div>
          </div>
        </div>

        {/* Active Notices */}
        {activeIncidents.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)" }}>
              Active Incident Notices
            </div>

            {activeIncidents.map((inc) => (
              <div
                key={inc.id}
                style={{
                  padding: "16px",
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border-primary)",
                  borderRadius: "var(--radius-lg)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="badge badge-p0">{inc.severity}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {inc.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                    Updated {inc.updatedAt}
                  </span>
                </div>

                <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
                  {inc.impact}
                </div>

                {/* Latest timeline entry */}
                {inc.timeline[inc.timeline.length - 1] && (
                  <div style={{
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: "2px solid var(--color-brand-bg)",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    fontSize: "12px"
                  }}>
                    <div style={{ fontSize: "10.5px", color: "var(--color-text-tertiary)", marginBottom: "2px" }}>
                      Latest Update ({inc.timeline[inc.timeline.length - 1].time})
                    </div>
                    <div style={{ color: "var(--color-text-primary)" }}>
                      {inc.timeline[inc.timeline.length - 1].message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* System Services Status */}
        <div style={{
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden"
        }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border-primary)", fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Current Core Service Components
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((svc) => (
              <div
                key={svc.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--color-border-translucent)",
                  fontSize: "12.5px"
                }}
              >
                <div>
                  <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{svc.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginLeft: "8px" }}>{svc.uptime30d} uptime</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: svc.status === "healthy" ? "var(--color-green)" : svc.status === "degraded" ? "var(--color-orange)" : "var(--color-red)"
                  }} />
                  <span style={{
                    fontSize: "11px",
                    textTransform: "capitalize",
                    color: svc.status === "healthy" ? "var(--color-green)" : svc.status === "degraded" ? "var(--color-orange)" : "var(--color-red)"
                  }}>
                    {svc.status === "outage" ? "Major Outage" : svc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 90-Day Uptime Calendar Visualization */}
        <div style={{
          padding: "16px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              90-Day Historical Reliability
            </span>
            <span style={{ fontSize: "11px", color: "var(--color-green)", fontWeight: 600 }}>
              99.95% Overall
            </span>
          </div>

          {/* Day blocks */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center", justifyContent: "space-between" }}>
            {Array.from({ length: 45 }).map((_, idx) => {
              const isIssue = idx === 12 || idx === 31;
              const isToday = idx === 44;

              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: "22px",
                    borderRadius: "2px",
                    background: isToday ? "var(--color-red)" : isIssue ? "var(--color-yellow)" : "var(--color-green)",
                    opacity: 0.85
                  }}
                  title={isToday ? "Today: 1 Outage" : isIssue ? "Degraded performance" : "100% operational"}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--color-text-tertiary)", marginTop: "6px" }}>
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

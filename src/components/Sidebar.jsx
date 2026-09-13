import React from "react";
import { 
  AlertOctagon, 
  Server, 
  Terminal, 
  FileText, 
  Radio, 
  Filter, 
  CheckCircle2, 
  Flame, 
  ChevronDown, 
  Layers, 
  CircleDot,
  Zap,
  Smartphone
} from "lucide-react";

export function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  activeFilter, 
  setActiveFilter, 
  activeIncidentsCount, 
  degradedServicesCount,
  onToggleViewMode
}) {
  return (
    <aside className="app-sidebar">
      {/* Workspace Selector */}
      <div style={{
        padding: "12px 14px",
        borderBottom: "1px solid var(--color-border-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            background: "#1c1d22",
            border: "1px solid var(--color-border-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-text-secondary)",
            fontWeight: 700,
            fontSize: "11px"
          }}>
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Acme Production
            </span>
            <span style={{ fontSize: "10.5px", color: "var(--color-text-tertiary)" }}>
              eu-west cluster
            </span>
          </div>
        </div>
        <ChevronDown size={14} color="var(--color-text-tertiary)" />
      </div>

      {/* Primary Navigation Sections */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        <div className="sidebar-section-title">Core Operations</div>

        {/* Incidents Nav */}
        <div 
          className={`sidebar-nav-item ${currentTab === "incidents" ? "active" : ""}`}
          onClick={() => setCurrentTab("incidents")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <AlertOctagon size={14} color={activeIncidentsCount > 0 ? "var(--color-red)" : "var(--color-text-secondary)"} />
            <span>Incidents</span>
          </div>
          {activeIncidentsCount > 0 && (
            <span className="sidebar-count-badge has-active">
              {activeIncidentsCount}
            </span>
          )}
        </div>

        {/* Services & SLOs Nav */}
        <div 
          className={`sidebar-nav-item ${currentTab === "services" ? "active" : ""}`}
          onClick={() => setCurrentTab("services")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <Server size={14} />
            <span>Services & SLOs</span>
          </div>
          {degradedServicesCount > 0 && (
            <span className="sidebar-count-badge" style={{ background: "var(--color-orange-dim)", color: "var(--color-orange)" }}>
              {degradedServicesCount}
            </span>
          )}
        </div>

        {/* Runbooks Nav */}
        <div 
          className={`sidebar-nav-item ${currentTab === "runbooks" ? "active" : ""}`}
          onClick={() => setCurrentTab("runbooks")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <Terminal size={14} />
            <span>Runbooks</span>
          </div>
          <span className="sidebar-count-badge">3</span>
        </div>

        {/* Post-Mortem Studio */}
        <div 
          className={`sidebar-nav-item ${currentTab === "retros" ? "active" : ""}`}
          onClick={() => setCurrentTab("retros")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <FileText size={14} />
            <span>Post-Mortems</span>
          </div>
          <span className="sidebar-count-badge">2</span>
        </div>

        {/* Integrations Nav */}
        <div 
          className={`sidebar-nav-item ${currentTab === "onboarding" ? "active" : ""}`}
          onClick={() => setCurrentTab("onboarding")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <Zap size={14} />
            <span>Integrations</span>
          </div>
          <span className="sidebar-count-badge" style={{ background: "rgba(113, 135, 251, 0.12)", color: "#7187fb" }}>
            Setup
          </span>
        </div>

        {/* Public Status Page */}
        <div 
          className={`sidebar-nav-item ${currentTab === "status" ? "active" : ""}`}
          onClick={() => setCurrentTab("status")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <Radio size={14} />
            <span>Status Page</span>
          </div>
          <span style={{ fontSize: "10px", color: "var(--color-green)", display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-green)" }} />
            Live
          </span>
        </div>

        {/* Incident Filter Presets (when on Incidents tab) */}
        {currentTab === "incidents" && (
          <>
            <div className="sidebar-section-title" style={{ marginTop: "16px" }}>Filter Presets</div>
            
            <div 
              className={`sidebar-nav-item ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <Layers size={13} color="var(--color-text-tertiary)" />
                <span>All Incidents</span>
              </div>
            </div>

            <div 
              className={`sidebar-nav-item ${activeFilter === "active" ? "active" : ""}`}
              onClick={() => setActiveFilter("active")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <Flame size={13} color="var(--color-orange)" />
                <span>Active (Open)</span>
              </div>
            </div>

            <div 
              className={`sidebar-nav-item ${activeFilter === "p0" ? "active" : ""}`}
              onClick={() => setActiveFilter("p0")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ 
                  width: "8px", 
                  height: "8px", 
                  borderRadius: "2px", 
                  background: "var(--color-red)" 
                }} />
                <span>P0 Critical</span>
              </div>
            </div>

            <div 
              className={`sidebar-nav-item ${activeFilter === "resolved" ? "active" : ""}`}
              onClick={() => setActiveFilter("resolved")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <CheckCircle2 size={13} color="var(--color-green)" />
                <span>Resolved</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Switch to Mobile View Action */}
      <div style={{ 
        padding: "8px 12px", 
        borderTop: "1px solid var(--color-border-primary)",
        background: "rgba(0,0,0,0.15)"
      }}>
        <button
          onClick={onToggleViewMode}
          className="btn btn-ghost"
          style={{
            width: "100%",
            justifyContent: "flex-start",
            gap: "8px",
            fontSize: "11.5px",
            color: "var(--color-text-secondary)",
            height: "28px",
            padding: "0 8px",
            borderRadius: "var(--radius-md)"
          }}
          title="Preview 390px Mobile Artboards"
        >
          <Smartphone size={13} />
          <span>Switch to Mobile View</span>
        </button>
      </div>

      {/* On-Call Engineer Status at Bottom */}
      <div style={{
        padding: "12px 14px",
        borderTop: "1px solid var(--color-border-primary)",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7170ff, #5e6ad2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "10px"
          }}>
            ER
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--color-text-primary)" }}>
              Elena Rostova
            </span>
            <span style={{ fontSize: "10px", color: "var(--color-green)", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-green)" }} />
              On-call Primary
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

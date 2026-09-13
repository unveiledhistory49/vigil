import React from "react";
import { 
  AlertCircle, 
  Clock, 
  User, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

export function IncidentListView({ 
  incidents, 
  onSelectIncident, 
  selectedIncidentId,
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter 
}) {
  const getSeverityBadgeClass = (sev) => {
    switch (sev) {
      case "P0": return "badge-p0";
      case "P1": return "badge-p1";
      case "P2": return "badge-p2";
      case "P3": return "badge-p3";
      default: return "";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "investigating": return "badge-status-investigating";
      case "identified": return "badge-status-identified";
      case "monitoring": return "badge-status-monitoring";
      case "resolved": return "badge-status-resolved";
      default: return "";
    }
  };

  return (
    <div className="incident-list-container">
      {/* Sub-header Filter Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "rgba(255, 255, 255, 0.02)",
        borderBottom: "1px solid var(--color-border-primary)",
        gap: "10px",
        flexWrap: "wrap"
      }}>
        {/* Severity Filter Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginRight: "2px" }}>
            Sev:
          </span>
          {["ALL", "P0", "P1", "P2", "P3"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className="btn btn-ghost"
              style={{
                height: "24px",
                padding: "2px 7px",
                fontSize: "11px",
                borderRadius: "var(--radius-sm)",
                background: severityFilter === sev ? "rgba(255,255,255,0.1)" : "transparent",
                color: severityFilter === sev ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                border: severityFilter === sev ? "1px solid var(--color-border-secondary)" : "1px solid transparent"
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Search within view */}
        <div style={{ position: "relative", minWidth: "180px", flex: "1 1 180px", maxWidth: "320px" }}>
          <label htmlFor="incident-search-input" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
            Filter incidents by title, service, or ID
          </label>
          <Search size={12} style={{ position: "absolute", left: "9px", top: "8px", color: "var(--color-text-tertiary)" }} />
          <input
            id="incident-search-input"
            name="searchFilter"
            type="text"
            placeholder="Filter by title, service, ID..."
            aria-label="Filter incidents by title, service, or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "26px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--color-border-primary)",
              borderRadius: "var(--radius-md)",
              padding: "0 8px 0 28px",
              fontSize: "11.5px",
              color: "var(--color-text-primary)",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Table Header (desktop only) */}
      <div className="incident-table-header">
        <div>SEV</div>
        <div>INCIDENT</div>
        <div>TITLE</div>
        <div>SERVICE</div>
        <div>STATUS</div>
        <div>COMMANDER</div>
        <div style={{ textAlign: "right" }}>UPDATED</div>
      </div>

      {/* Incidents Rows */}
      {incidents.length === 0 ? (
        <div style={{
          padding: "60px 24px",
          textAlign: "center",
          color: "var(--color-text-tertiary)"
        }}>
          <AlertCircle size={32} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>
            No incidents match the active criteria
          </div>
          <div style={{ fontSize: "12px", marginTop: "4px" }}>
            Adjust your severity filter or search query to view other incidents.
          </div>
        </div>
      ) : (
        <div style={{ overflowY: "auto", flex: 1 }}>
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className={`incident-item-wrapper ${selectedIncidentId === inc.id ? "selected" : ""}`}
              onClick={() => onSelectIncident(inc)}
            >
              {/* Desktop Row View */}
              <div className="incident-desktop-grid">
                <div>
                  <span className={`badge ${getSeverityBadgeClass(inc.severity)}`}>
                    {inc.severity === "P0" && <span className="pulse-red" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#eb5757" }} />}
                    {inc.severity}
                  </span>
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--color-text-secondary)" }}>
                  {inc.id}
                </div>

                <div style={{ fontWeight: 500, color: "var(--color-text-primary)", fontSize: "12.5px", paddingRight: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {inc.title}
                </div>

                <div style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {inc.serviceName}
                </div>

                <div>
                  <span className={`badge ${getStatusBadgeClass(inc.status)}`}>
                    {inc.status}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)"
                  }}>
                    {inc.commander.initials}
                  </div>
                  <span style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {inc.commander.name}
                  </span>
                </div>

                <div style={{ textAlign: "right", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                  {inc.updatedAt}
                </div>
              </div>

              {/* Mobile Card Row View */}
              <div className="incident-mobile-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className={`badge ${getSeverityBadgeClass(inc.severity)}`}>
                      {inc.severity === "P0" && <span className="pulse-red" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#eb5757" }} />}
                      {inc.severity}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                      {inc.id}
                    </span>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(inc.status)}`}>
                    {inc.status}
                  </span>
                </div>

                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                  {inc.title}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                  <span>{inc.serviceName}</span>
                  <span>{inc.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

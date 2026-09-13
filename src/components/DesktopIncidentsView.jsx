import React, { useState } from "react";
import { 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  LayoutList, 
  Kanban, 
  AlertCircle,
  Clock, 
  ShieldAlert, 
  Server, 
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Terminal
} from "lucide-react";

export function DesktopIncidentsView({ 
  incidents, 
  onSelectIncident, 
  activeFilter, 
  setActiveFilter, 
  displayMode, 
  setDisplayMode, 
  onDeclareIncident,
  onOpenRunbook 
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const p0Incident = incidents.find(i => i.severity === "P0" && i.status !== "resolved");
  const activeCount = incidents.filter(i => i.status !== "resolved").length;
  const p0Count = incidents.filter(i => i.severity === "P0" && i.status !== "resolved").length;
  const resolvedCount = incidents.filter(i => i.status === "resolved").length;

  // Filtered incidents based on activeFilter & search
  const filteredIncidents = incidents.filter(inc => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${inc.id} ${inc.title} ${inc.serviceName || ""} ${inc.commander?.name || ""}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    // Filter match
    if (activeFilter === "p0") return inc.severity === "P0";
    if (activeFilter === "assigned") return inc.commander?.name === "Elena Rostova";
    if (activeFilter === "resolved") return inc.status === "resolved";
    return true; // "all"
  });

  const COLUMNS = [
    { id: "investigating", label: "Investigating", dotColor: "#eb5757" },
    { id: "identified", label: "Identified", dotColor: "#f2994a" },
    { id: "monitoring", label: "Monitoring", dotColor: "#5e6ad2" },
    { id: "resolved", label: "Resolved", dotColor: "#27ae60" }
  ];

  return (
    <div className="desktop-incidents-container">
      {/* Critical P0 Outage Banner if active */}
      {p0Incident && (
        <div 
          className="desktop-outage-banner"
          onClick={() => onSelectIncident(p0Incident)}
          role="button"
          tabIndex={0}
        >
          <div className="outage-banner-left">
            <span className="pulse-red-dot" />
            <span className="outage-pill-p0">P0 CRITICAL OUTAGE</span>
            <span className="outage-id-tag">{p0Incident.id}: {p0Incident.title}</span>
            <span className="outage-desc-tag">Error rate at 12.4% • Ingress 504 threshold breach</span>
          </div>
          <div className="outage-banner-right">
            <span className="btn-join-warroom-text">Join Active War Room</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
      )}

      {/* Top SRE Overview Metric Cards */}
      <div className="desktop-kpi-row">
        <div className="desktop-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-title">Active Incidents</span>
            <AlertCircle size={14} color="#f2994a" />
          </div>
          <div className="kpi-card-main">
            <span className="kpi-card-number">{activeCount}</span>
            <span className="kpi-card-sub">{p0Count} critical P0 requiring action</span>
          </div>
        </div>

        <div className="desktop-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-title">Mean Time to Ack (MTTA)</span>
            <Clock size={14} color="#5e6ad2" />
          </div>
          <div className="kpi-card-main">
            <span className="kpi-card-number">1m 42s</span>
            <span className="kpi-card-sub green">94% within 5m SLA</span>
          </div>
        </div>

        <div className="desktop-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-title">Mean Time to Resolve (MTTR)</span>
            <Activity size={14} color="#27ae60" />
          </div>
          <div className="kpi-card-main">
            <span className="kpi-card-number">28m 10s</span>
            <span className="kpi-card-sub green">-14.2% vs last week</span>
          </div>
        </div>

        <div className="desktop-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-title">On-Call Primary</span>
            <div className="oncall-status-indicator">
              <span className="pulse-green-dot" />
              <span>Active</span>
            </div>
          </div>
          <div className="kpi-card-main">
            <span className="kpi-card-number text-name">Elena Rostova</span>
            <span className="kpi-card-sub">Secondary: Marcus Vance</span>
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="desktop-controls-bar">
        <div className="controls-left">
          {/* Quick Search */}
          <div className="desktop-search-input-wrap">
            <Search size={14} className="search-icon" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by ID, service, or title..."
              className="desktop-search-input"
            />
          </div>

          {/* Filter Pills */}
          <div className="desktop-filter-pills-group">
            {[
              { id: "all", label: "All Incidents", count: incidents.length },
              { id: "assigned", label: "Assigned to Me", count: 1 },
              { id: "p0", label: "P0 Critical Only", count: p0Count },
              { id: "resolved", label: "Resolved", count: resolvedCount }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`desktop-filter-pill-btn ${activeFilter === tab.id ? "active" : ""}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="pill-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="controls-right">
          {/* Switcher: Table List vs Kanban Board */}
          <div className="view-mode-toggle-group">
            <button
              className={`view-mode-btn ${displayMode === "list" ? "active" : ""}`}
              onClick={() => setDisplayMode("list")}
              title="Table List View"
            >
              <LayoutList size={14} />
              <span>Table</span>
            </button>
            <button
              className={`view-mode-btn ${displayMode === "board" ? "active" : ""}`}
              onClick={() => setDisplayMode("board")}
              title="Kanban Board View"
            >
              <Kanban size={14} />
              <span>Board</span>
            </button>
          </div>

          {/* Declare Incident Button */}
          <button 
            className="btn-declare-primary"
            onClick={onDeclareIncident}
            title="Declare new incident (Shortcut: C)"
          >
            <Plus size={14} />
            <span>Declare Incident</span>
            <kbd>C</kbd>
          </button>
        </div>
      </div>

      {/* Content Area: Table vs Board */}
      {displayMode === "list" ? (
        <div className="desktop-table-wrapper">
          <table className="desktop-incident-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>Severity</th>
                <th style={{ width: "100px" }}>Incident ID</th>
                <th>Title & Impact Summary</th>
                <th style={{ width: "150px" }}>Impacted Service</th>
                <th style={{ width: "160px" }}>Commander</th>
                <th style={{ width: "120px" }}>Lifecycle</th>
                <th style={{ width: "110px" }}>Updated</th>
                <th style={{ width: "130px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty-row">
                    <div className="empty-message-wrap">
                      <AlertCircle size={20} color="#636b7b" />
                      <span>No incidents found matching your query</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((inc) => {
                  const isP0 = inc.severity === "P0" && inc.status !== "resolved";

                  return (
                    <tr 
                      key={inc.id}
                      className={`table-incident-row ${isP0 ? "row-critical-p0" : ""}`}
                      onClick={() => onSelectIncident(inc)}
                    >
                      <td>
                        <span className={`pill-sev pill-sev-${inc.severity.toLowerCase()}`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td>
                        <span className="mono-incident-id">{inc.id}</span>
                      </td>
                      <td>
                        <div className="title-summary-wrap">
                          <span className="table-incident-title">{inc.title}</span>
                          <span className="table-incident-snippet">
                            {inc.summary || "High latency and 504 threshold breaches across ingress node pool."}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="table-service-pill">
                          <Server size={11} />
                          <span>{inc.serviceName || "api-gateway"}</span>
                        </span>
                      </td>
                      <td>
                        <div className="table-commander-cell">
                          {inc.commander?.avatar ? (
                            <img 
                              src={inc.commander.avatar} 
                              alt={inc.commander.name} 
                              className="commander-avatar-table"
                            />
                          ) : (
                            <span className="commander-avatar-fallback-table">
                              {inc.commander?.initials || "ER"}
                            </span>
                          )}
                          <span className="commander-table-name">{inc.commander?.name || "Elena Rostova"}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`table-lifecycle-badge ${inc.status}`}>
                          <span className="status-dot" />
                          <span>{inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}</span>
                        </span>
                      </td>
                      <td>
                        <span className="table-timestamp">{inc.updatedAt || inc.createdAt}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions-cell" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="btn-table-warroom"
                            onClick={() => onSelectIncident(inc)}
                            title="Enter Command War Room"
                          >
                            <span>War Room</span>
                            <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Kanban Board View */
        <div className="desktop-kanban-board">
          {COLUMNS.map((col) => {
            const colIncidents = filteredIncidents.filter((i) => i.status === col.id);

            return (
              <div key={col.id} className="desktop-kanban-column">
                <div className="kanban-column-header">
                  <div className="col-header-title">
                    <span className="col-dot" style={{ background: col.dotColor }} />
                    <span className="col-name">{col.label}</span>
                  </div>
                  <span className="kanban-count-pill">{colIncidents.length}</span>
                </div>

                <div className="kanban-cards-stream">
                  {colIncidents.length === 0 ? (
                    <div className="kanban-empty-placeholder">
                      <span>No incidents in {col.label.toLowerCase()}</span>
                    </div>
                  ) : (
                    colIncidents.map((inc) => (
                      <div 
                        key={inc.id}
                        className={`desktop-kanban-card ${inc.severity === "P0" && inc.status !== "resolved" ? "card-p0" : ""}`}
                        onClick={() => onSelectIncident(inc)}
                      >
                        <div className="kanban-card-top">
                          <div className="card-left-tags">
                            <span className={`pill-sev pill-sev-${inc.severity.toLowerCase()}`}>
                              {inc.severity}
                            </span>
                            <span className="card-id-mono">{inc.id}</span>
                          </div>
                          <span className="card-time">{inc.updatedAt || inc.createdAt}</span>
                        </div>

                        <h4 className="card-headline">{inc.title}</h4>
                        <p className="card-body-text">{inc.summary || "Degraded throughput on gateway pods"}</p>

                        <div className="card-bottom-row">
                          <span className="card-service-tag">{inc.serviceName || "api-gateway"}</span>
                          {inc.commander && (
                            <div className="card-commander-mini">
                              {inc.commander.avatar ? (
                                <img 
                                  src={inc.commander.avatar} 
                                  alt={inc.commander.name} 
                                  className="commander-avatar-mini"
                                />
                              ) : (
                                <span className="commander-initials-mini">
                                  {inc.commander.initials || "ER"}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

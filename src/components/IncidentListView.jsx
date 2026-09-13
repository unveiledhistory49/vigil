import React from "react";
import { ChevronRight, Plus, AlertCircle } from "lucide-react";

export function IncidentListView({ 
  incidents, 
  onSelectIncident, 
  selectedIncidentId,
  activeFilter,
  setActiveFilter,
  displayMode,
  setDisplayMode,
  onDeclareIncident,
  onSelectOnCall
}) {
  const p0Incident = incidents.find(i => i.severity === "P0" && i.status !== "resolved");

  return (
    <div className="artboard-incidents-view">
      {/* Red Outage Strip */}
      {p0Incident && (
        <div 
          className="artboard-outage-banner"
          onClick={() => onSelectIncident(p0Incident)}
          role="button"
          tabIndex={0}
        >
          <div className="banner-left">
            <span className="pulse-red-dot" />
            <span className="banner-id">{p0Incident.id}</span>
            <span className="banner-text">1 P0 active</span>
          </div>
          <ChevronRight size={15} className="banner-chevron" />
        </div>
      )}

      {/* Filter Pills */}
      <div className="artboard-filter-pills-row">
        {[
          { id: "all", label: "All Incidents" },
          { id: "assigned", label: "Assigned to Me" },
          { id: "p0", label: "P0 Critical Only" },
          { id: "resolved", label: "Resolved" }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`artboard-filter-pill ${activeFilter === tab.id ? "active" : ""}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Segmented View Switcher: List | Board */}
      <div className="artboard-view-switcher-container">
        <div className="artboard-segmented-control">
          <button
            className={`artboard-segment-btn ${displayMode === "list" ? "active" : ""}`}
            onClick={() => setDisplayMode("list")}
          >
            List
          </button>
          <button
            className={`artboard-segment-btn ${displayMode === "board" ? "active" : ""}`}
            onClick={() => setDisplayMode("board")}
          >
            Board
          </button>
        </div>
      </div>

      {/* Incident List Items */}
      <div className="artboard-incident-list-items">
        {incidents.length === 0 ? (
          <div className="empty-incidents-state">
            <AlertCircle size={24} color="#636b7b" />
            <span>No incidents match this filter</span>
          </div>
        ) : (
          incidents.map((inc) => {
            const isP0 = inc.severity === "P0";
            const isP1 = inc.severity === "P1";
            const isP2 = inc.severity === "P2";
            const isP3 = inc.severity === "P3";

            return (
              <div 
                key={inc.id}
                className={`artboard-incident-row-card ${isP0 && inc.status !== "resolved" ? "has-p0-bar" : ""}`}
                onClick={() => onSelectIncident(inc)}
                role="button"
                tabIndex={0}
              >
                {/* Top Row: Severity + ID + Timestamp */}
                <div className="row-top">
                  <div className="row-tags-left">
                    <span className={`pill-sev pill-sev-${inc.severity.toLowerCase()}`}>
                      {inc.severity}
                    </span>
                    <span className="row-mono-id">{inc.id}</span>
                  </div>
                  <span className="row-timestamp">{inc.updatedAt || inc.createdAt}</span>
                </div>

                {/* Title */}
                <h3 className="row-incident-title">{inc.title}</h3>

                {/* Sub-tags: Service + Status */}
                <div className="row-subtags">
                  <span className="subtag-service">{inc.serviceName || "api-gateway"}</span>
                  <span className="subtag-dot">•</span>
                  <span className="subtag-status-pill">{inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}</span>
                </div>

                {/* Commander Avatar + Name */}
                <div className="row-commander">
                  {inc.commander?.avatar ? (
                    <img 
                      src={inc.commander.avatar} 
                      alt={inc.commander.name} 
                      className="commander-avatar-img"
                    />
                  ) : (
                    <div className="commander-avatar-fallback">
                      {inc.commander?.initials || "ER"}
                    </div>
                  )}
                  <span className="commander-name">{inc.commander?.name}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* On-Call Strip */}
      <div 
        className="artboard-oncall-strip"
        onClick={onSelectOnCall}
        role="button"
        tabIndex={0}
      >
        <div className="oncall-left">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" 
            alt="Elena Rostova" 
            className="oncall-avatar"
          />
          <span className="oncall-text">Elena Rostova • Primary On-Call</span>
        </div>
        <ChevronRight size={15} className="oncall-chevron" />
      </div>

      {/* Floating Action Button (+) */}
      <button 
        className="artboard-fab-declare"
        onClick={onDeclareIncident}
        aria-label="Declare New Incident"
        title="Declare New Incident (Shortcut: C)"
      >
        <Plus size={22} color="#ffffff" />
      </button>
    </div>
  );
}

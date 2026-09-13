import React from "react";
import { Clock } from "lucide-react";

export function IncidentBoardView({ 
  incidents, 
  onSelectIncident, 
  onUpdateStatus 
}) {
  const COLUMNS = [
    { id: "investigating", label: "Investigating", dotColor: "#eb5757" },
    { id: "identified", label: "Identified", dotColor: "#f2994a" },
    { id: "monitoring", label: "Monitoring", dotColor: "#5e6ad2" },
    { id: "resolved", label: "Resolved", dotColor: "#27ae60" }
  ];

  return (
    <div className="artboard-board-container">
      {COLUMNS.map((col) => {
        const colIncidents = incidents.filter((i) => i.status === col.id);

        return (
          <div key={col.id} className="artboard-board-column">
            {/* Column Header */}
            <div className="artboard-board-column-header">
              <div className="col-header-left">
                <span className="col-dot" style={{ background: col.dotColor }} />
                <span className="col-title">{col.label}</span>
              </div>
              <span className="col-count-pill">{colIncidents.length}</span>
            </div>

            {/* Column Items */}
            <div className="artboard-board-column-body">
              {colIncidents.length === 0 ? (
                <div className="board-empty-placeholder">
                  <span>No incidents in {col.label.toLowerCase()}</span>
                </div>
              ) : (
                colIncidents.map((inc) => (
                  <div 
                    key={inc.id}
                    className="artboard-board-card"
                    onClick={() => onSelectIncident(inc)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="row-top">
                      <div className="row-tags-left">
                        <span className={`pill-sev pill-sev-${inc.severity.toLowerCase()}`}>
                          {inc.severity}
                        </span>
                        <span className="row-mono-id">{inc.id}</span>
                      </div>
                      <span className="row-timestamp">{inc.updatedAt || inc.createdAt}</span>
                    </div>

                    <h4 className="board-card-title">{inc.title}</h4>

                    <div className="board-card-footer">
                      <span className="subtag-service">{inc.serviceName || "api-gateway"}</span>
                      {inc.commander && (
                        <div className="board-commander-mini">
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
  );
}

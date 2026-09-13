import React from "react";
import { 
  Clock, 
  ChevronRight, 
  AlertOctagon, 
  CheckCircle2, 
  Layers 
} from "lucide-react";

export function IncidentBoardView({ 
  incidents, 
  onSelectIncident, 
  onUpdateStatus 
}) {
  const COLUMNS = [
    { id: "investigating", label: "Investigating", color: "var(--color-orange)" },
    { id: "identified", label: "Identified", color: "var(--color-purple)" },
    { id: "monitoring", label: "Monitoring", color: "var(--color-blue)" },
    { id: "resolved", label: "Resolved", color: "var(--color-green)" }
  ];

  const getSeverityBadgeClass = (sev) => {
    switch (sev) {
      case "P0": return "badge-p0";
      case "P1": return "badge-p1";
      case "P2": return "badge-p2";
      case "P3": return "badge-p3";
      default: return "";
    }
  };

  return (
    <div className="board-container">
      {COLUMNS.map((col) => {
        const colIncidents = incidents.filter((i) => i.status === col.id);

        return (
          <div key={col.id} className="board-column">
            {/* Column Header */}
            <div className="board-column-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: col.color }} />
                <span>{col.label}</span>
              </div>
              <span style={{ 
                fontSize: "11px", 
                color: "var(--color-text-tertiary)", 
                background: "rgba(255,255,255,0.06)", 
                padding: "1px 6px", 
                borderRadius: "10px" 
              }}>
                {colIncidents.length}
              </span>
            </div>

            {/* Column Body Cards */}
            <div className="board-column-body">
              {colIncidents.length === 0 ? (
                <div style={{
                  padding: "30px 10px",
                  textAlign: "center",
                  fontSize: "11.5px",
                  color: "var(--color-text-tertiary)",
                  border: "1px dashed var(--color-border-primary)",
                  borderRadius: "var(--radius-md)"
                }}>
                  No incidents in {col.label.toLowerCase()}
                </div>
              ) : (
                colIncidents.map((inc) => (
                  <div 
                    key={inc.id} 
                    className="board-card"
                    onClick={() => onSelectIncident(inc)}
                  >
                    {/* Top Row: Sev + ID + Time */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className={`badge ${getSeverityBadgeClass(inc.severity)}`}>
                          {inc.severity === "P0" && (
                            <span className="pulse-red" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#eb5757" }} />
                          )}
                          {inc.severity}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                          {inc.id}
                        </span>
                      </div>
                      <span style={{ fontSize: "10.5px", color: "var(--color-text-tertiary)" }}>
                        {inc.updatedAt}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{ 
                      fontSize: "12.5px", 
                      fontWeight: 500, 
                      color: "var(--color-text-primary)", 
                      lineHeight: 1.35, 
                      marginBottom: "10px" 
                    }}>
                      {inc.title}
                    </div>

                    {/* Affected Service */}
                    <div style={{ 
                      fontSize: "11px", 
                      color: "var(--color-text-secondary)", 
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      <span style={{ color: "var(--color-text-quaternary)" }}>svc:</span>
                      <span>{inc.serviceName}</span>
                    </div>

                    {/* Bottom Row: Commander + Advance Status button */}
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between",
                      paddingTop: "8px",
                      borderTop: "1px solid var(--color-border-translucent)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.08)",
                          color: "var(--color-text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "9px",
                          fontWeight: 600
                        }}>
                          {inc.commander.initials}
                        </div>
                        <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                          {inc.commander.name.split(" ")[0]}
                        </span>
                      </div>

                      {/* Quick Advance Button */}
                      {col.id !== "resolved" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextIndex = COLUMNS.findIndex(c => c.id === col.id) + 1;
                            if (nextIndex < COLUMNS.length) {
                              onUpdateStatus(inc.id, COLUMNS[nextIndex].id);
                            }
                          }}
                          className="btn btn-ghost"
                          style={{
                            height: "20px",
                            padding: "1px 6px",
                            fontSize: "10px",
                            color: "var(--color-text-secondary)",
                            borderRadius: "var(--radius-sm)"
                          }}
                          title="Advance to next phase"
                        >
                          <span>Advance</span>
                          <ChevronRight size={11} />
                        </button>
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

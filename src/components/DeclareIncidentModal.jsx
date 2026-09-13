import React, { useState, useEffect } from "react";
import { X, AlertOctagon, Plus } from "lucide-react";

export function DeclareIncidentModal({ 
  isOpen, 
  onClose, 
  services, 
  onDeclareIncident 
}) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("P1");
  const [serviceId, setServiceId] = useState(services[0]?.id || "svc-api-gw");
  const [commanderName, setCommanderName] = useState("Elena Rostova");
  const [impact, setImpact] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !impact.trim()) return;

    const matchedService = services.find(s => s.id === serviceId);

    const newInc = {
      id: `INC-${Math.floor(410 + Math.random() * 80)}`,
      title: title.trim(),
      severity,
      status: "investigating",
      serviceId,
      serviceName: matchedService ? matchedService.name : "Core Infrastructure",
      commander: {
        name: commanderName,
        role: "Incident Lead",
        initials: commanderName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
      },
      createdAt: "Just now",
      updatedAt: "Just now",
      impact: impact.trim(),
      slackChannel: `#inc-${Math.floor(100 + Math.random() * 900)}-incident`,
      warRoomUrl: "https://meet.vigil.internal/war-room-live",
      runbookId: null,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          time: "Just now",
          author: `${commanderName} (Commander)`,
          type: "user",
          message: `${severity} incident declared. Initial blast radius: ${impact.trim()}`
        }
      ]
    };

    onDeclareIncident(newInc);
    onClose();
    setTitle("");
    setImpact("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "560px" }}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              width: "22px", 
              height: "22px", 
              borderRadius: "4px", 
              background: "var(--color-red-dim)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              <AlertOctagon size={13} color="var(--color-red)" />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Declare New Incident
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <kbd>ESC</kbd>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: "4px" }} aria-label="Close declare modal">
              <X size={16} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Incident Title */}
            <div className="form-group">
              <label htmlFor="incident-title" className="form-label">Incident Title</label>
              <input
                id="incident-title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. EU-West Ingress Gateway 504 Timeouts"
                className="form-input"
                autoFocus
              />
            </div>

            {/* Severity + Impacted Service in a row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label htmlFor="incident-severity" className="form-label">Severity Level</label>
                <select
                  id="incident-severity"
                  name="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="form-select"
                >
                  <option value="P0">P0 - Outage (Critical impact)</option>
                  <option value="P1">P1 - Major Degradation</option>
                  <option value="P2">P2 - Moderate Impact</option>
                  <option value="P3">P3 - Minor / Informational</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="incident-service" className="form-label">Impacted Service</label>
                <select
                  id="incident-service"
                  name="serviceId"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="form-select"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Incident Commander */}
            <div className="form-group">
              <label htmlFor="incident-commander" className="form-label">Incident Commander</label>
              <input
                id="incident-commander"
                name="commanderName"
                type="text"
                required
                value={commanderName}
                onChange={(e) => setCommanderName(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Impact Details */}
            <div className="form-group">
              <label htmlFor="incident-impact" className="form-label">Blast Radius & Customer Impact</label>
              <textarea
                id="incident-impact"
                name="impact"
                required
                rows={3}
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                placeholder="Describe current error rates, affected customer segments, and observed symptoms..."
                className="form-textarea"
                style={{ resize: "none" }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-danger"
              disabled={!title.trim() || !impact.trim()}
            >
              <Plus size={13} />
              <span>Declare & Assemble War Room</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

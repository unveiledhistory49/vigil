import React, { useState, useEffect } from "react";
import { 
  X, 
  Video, 
  MessageSquare, 
  Terminal, 
  CheckCircle2, 
  Send, 
  AlertOctagon, 
  Clock, 
  User, 
  ChevronDown,
  Copy,
  Check
} from "lucide-react";

export function IncidentDetailModal({ 
  incident, 
  onClose, 
  onUpdateSeverity, 
  onUpdateStatus, 
  onAddTimelineEntry,
  onOpenRunbook 
}) {
  const [updateText, setUpdateText] = useState("");
  const [updateType, setUpdateType] = useState("user");
  const [copiedHuddle, setCopiedHuddle] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!incident) return null;

  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    onAddTimelineEntry(incident.id, {
      author: "Elena Rostova (Commander)",
      type: updateType,
      message: updateText.trim()
    });

    setUpdateText("");
  };

  const handleCopyHuddle = () => {
    navigator.clipboard?.writeText(incident.warRoomUrl);
    setCopiedHuddle(true);
    setTimeout(() => setCopiedHuddle(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "760px", height: "88vh" }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "12px", 
              color: "var(--color-text-tertiary)",
              fontWeight: 600 
            }}>
              {incident.id}
            </span>

            {/* Severity Selector */}
            <select
              id="detail-severity-select"
              name="incidentSeverity"
              aria-label="Incident Severity Level"
              value={incident.severity}
              onChange={(e) => onUpdateSeverity(incident.id, e.target.value)}
              className="form-select"
              style={{
                height: "24px",
                padding: "1px 8px",
                fontSize: "11px",
                fontWeight: 600,
                color: incident.severity === "P0" ? "#ff7878" : "#ffa959",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--color-border-secondary)"
              }}
            >
              <option value="P0">P0 - Critical Outage</option>
              <option value="P1">P1 - Major Degradation</option>
              <option value="P2">P2 - Moderate Impact</option>
              <option value="P3">P3 - Minor Warning</option>
            </select>

            {/* Status Selector */}
            <select
              id="detail-status-select"
              name="incidentStatus"
              aria-label="Incident Triage Status"
              value={incident.status}
              onChange={(e) => onUpdateStatus(incident.id, e.target.value)}
              className="form-select"
              style={{
                height: "24px",
                padding: "1px 8px",
                fontSize: "11px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--color-border-secondary)",
                textTransform: "capitalize"
              }}
            >
              <option value="investigating">Investigating</option>
              <option value="identified">Identified</option>
              <option value="monitoring">Monitoring</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <kbd>ESC</kbd>
            <button 
              onClick={onClose} 
              className="btn btn-ghost" 
              style={{ padding: "4px" }}
              aria-label="Close modal dialog"
              title="Close (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Incident Title & Meta */}
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              {incident.title}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", color: "var(--color-text-secondary)", flexWrap: "wrap" }}>
              <div>
                <span style={{ color: "var(--color-text-tertiary)" }}>Service: </span>
                <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{incident.serviceName}</span>
              </div>
              <div>
                <span style={{ color: "var(--color-text-tertiary)" }}>Commander: </span>
                <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{incident.commander.name} ({incident.commander.role})</span>
              </div>
              <div>
                <span style={{ color: "var(--color-text-tertiary)" }}>Declared: </span>
                <span>{incident.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-primary)",
            flexWrap: "wrap"
          }}>
            <button 
              onClick={handleCopyHuddle}
              className="btn btn-secondary" 
              style={{ fontSize: "11.5px" }}
            >
              {copiedHuddle ? <Check size={13} color="var(--color-green)" /> : <Video size={13} />}
              <span>{copiedHuddle ? "War Room Link Copied!" : "Join Live War Room"}</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-text-secondary)", padding: "0 8px" }}>
              <MessageSquare size={13} color="var(--color-text-tertiary)" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>{incident.slackChannel}</span>
            </div>

            {incident.runbookId && (
              <button 
                onClick={() => {
                  onClose();
                  onOpenRunbook(incident.runbookId);
                }}
                className="btn btn-primary"
                style={{ fontSize: "11.5px", marginLeft: "auto" }}
              >
                <Terminal size={13} />
                <span>Execute Attached Runbook</span>
              </button>
            )}

            {incident.status !== "resolved" && (
              <button
                onClick={() => onUpdateStatus(incident.id, "resolved")}
                className="btn btn-ghost"
                style={{ fontSize: "11.5px", color: "var(--color-green)" }}
              >
                <CheckCircle2 size={13} />
                <span>Mark Resolved</span>
              </button>
            )}
          </div>

          {/* Customer Impact Summary */}
          <div style={{
            padding: "12px 14px",
            background: "rgba(235, 87, 87, 0.05)",
            border: "1px solid rgba(235, 87, 87, 0.2)",
            borderRadius: "var(--radius-md)"
          }}>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ff8c8c", marginBottom: "4px" }}>
              Blast Radius & Impact
            </div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-primary)", lineHeight: 1.45 }}>
              {incident.impact}
            </div>
          </div>

          {/* Timeline Feed */}
          <div>
            <div style={{ 
              fontSize: "12px", 
              fontWeight: 600, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em", 
              color: "var(--color-text-tertiary)", 
              marginBottom: "12px" 
            }}>
              Chronological Incident War Room Feed
            </div>

            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "10px", 
              borderLeft: "2px solid var(--color-border-primary)", 
              paddingLeft: "16px",
              marginLeft: "6px" 
            }}>
              {incident.timeline.map((event) => (
                <div key={event.id} style={{ position: "relative" }}>
                  {/* Timeline node bullet */}
                  <div style={{
                    position: "absolute",
                    left: "-21px",
                    top: "4px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: event.type === "system" ? "var(--color-orange)" : event.type === "action" ? "var(--color-brand-bg)" : "var(--color-text-tertiary)"
                  }} />

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {event.author}
                    </span>
                    <span style={{
                      fontSize: "10px",
                      padding: "1px 5px",
                      borderRadius: "3px",
                      background: "rgba(255,255,255,0.06)",
                      color: "var(--color-text-tertiary)"
                    }}>
                      {event.type}
                    </span>
                    <span style={{ fontSize: "10.5px", color: "var(--color-text-tertiary)" }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                    {event.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Timeline Update Form */}
          <form 
            onSubmit={handlePostUpdate}
            style={{
              marginTop: "10px",
              padding: "12px",
              background: "var(--color-bg-tertiary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-primary)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="war-room-update-input" style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer" }}>
                Broadcast War Room Update
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                {["user", "action", "system"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUpdateType(type)}
                    style={{
                      height: "20px",
                      padding: "1px 6px",
                      fontSize: "10px",
                      textTransform: "capitalize",
                      borderRadius: "var(--radius-sm)",
                      background: updateType === type ? "var(--color-brand-bg)" : "rgba(255,255,255,0.05)",
                      color: updateType === type ? "#fff" : "var(--color-text-tertiary)",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              id="war-room-update-input"
              name="updateText"
              aria-label="War room update notes"
              rows={2}
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="Post a diagnostic finding, status update, or mitigation note..."
              className="form-textarea"
              style={{ width: "100%", resize: "none", marginBottom: "8px" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!updateText.trim()}
                style={{ fontSize: "11px", height: "26px" }}
              >
                <Send size={11} />
                <span>Post Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

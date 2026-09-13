import React, { useState } from "react";
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Video, 
  MessageSquare, 
  BookOpen, 
  Send, 
  ChevronRight,
  Check,
  Radio,
  Clock,
  ShieldAlert
} from "lucide-react";

export function IncidentDetailModal({ 
  incident, 
  onClose, 
  onUpdateSeverity, 
  onUpdateStatus, 
  onAddTimelineEntry,
  onOpenRunbook 
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "runbook" | "timeline" | "updates"
  const [updateText, setUpdateText] = useState("");
  const [postToStatusPage, setPostToStatusPage] = useState(false);
  const [copiedHuddle, setCopiedHuddle] = useState(false);
  const [isSeverityOpen, setIsSeverityOpen] = useState(false);

  if (!incident) return null;

  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")} UTC`;

    onAddTimelineEntry(incident.id, {
      time: timeStr,
      author: incident.commander?.name || "Elena Rostova",
      type: "user",
      message: updateText.trim()
    });

    setUpdateText("");
  };

  const handleJoinHuddle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(incident.warRoomUrl || "https://meet.google.com/inc-409-huddle");
      setCopiedHuddle(true);
      setTimeout(() => setCopiedHuddle(false), 2000);
    }
    window.open(incident.warRoomUrl || "https://meet.google.com/inc-409-huddle", "_blank");
  };

  const SEVERITIES = ["P0", "P1", "P2", "P3"];

  return (
    <div className="artboard-command-room-overlay">
      <div className="artboard-command-room-screen">
        {/* Top Nav Header */}
        <header className="command-room-header">
          <button 
            className="command-room-back-btn" 
            onClick={onClose}
            aria-label="Back to incidents list"
          >
            <ChevronLeft size={22} color="#f7f8f8" />
          </button>
          
          <h2 className="command-room-title">
            {incident.id} • {incident.title}
          </h2>

          <button 
            className="command-room-more-btn"
            onClick={() => setIsSeverityOpen(!isSeverityOpen)}
            aria-label="More incident options"
          >
            <MoreHorizontal size={20} color="#b4bcd0" />
          </button>
        </header>

        {/* Severity Selector Dropdown if toggled */}
        {isSeverityOpen && (
          <div className="command-room-dropdown-menu">
            <div className="dropdown-label">Change Severity</div>
            <div className="dropdown-options-grid">
              {SEVERITIES.map((sev) => (
                <button
                  key={sev}
                  className={`dropdown-sev-btn ${incident.severity === sev ? "selected" : ""}`}
                  onClick={() => {
                    onUpdateSeverity(incident.id, sev);
                    setIsSeverityOpen(false);
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-label">Lifecycle Status</div>
            <div className="dropdown-options-grid">
              {["investigating", "identified", "monitoring", "resolved"].map((st) => (
                <button
                  key={st}
                  className={`dropdown-status-btn ${incident.status === st ? "selected" : ""}`}
                  onClick={() => {
                    onUpdateStatus(incident.id, st);
                    setIsSeverityOpen(false);
                  }}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="command-room-scrollable-body">
          {/* 2x2 Quick Action Cards */}
          <div className="action-cards-grid-2x2">
            {/* Top-Left: Severity */}
            <button 
              className="action-card action-card-severity"
              onClick={() => setIsSeverityOpen(true)}
            >
              <div className="action-card-text">
                <span className="sev-critical-text">
                  {incident.severity} – {incident.severity === "P0" ? "Critical Outage" : incident.severity === "P1" ? "Major Degradation" : "Active Alert"}
                </span>
              </div>
              <ChevronRight size={15} className="action-card-chevron red" />
            </button>

            {/* Top-Right: Commander */}
            <div className="action-card action-card-commander">
              <div className="commander-left">
                {incident.commander?.avatar ? (
                  <img 
                    src={incident.commander.avatar} 
                    alt={incident.commander.name} 
                    className="commander-avatar-img small"
                  />
                ) : (
                  <div className="commander-avatar-fallback small">
                    {incident.commander?.initials || "ER"}
                  </div>
                )}
                <span className="action-card-name">{incident.commander?.name || "Elena Rostova"}</span>
              </div>
              <ChevronRight size={15} className="action-card-chevron" />
            </div>

            {/* Bottom-Left: Join Huddle */}
            <button 
              className="action-card action-card-button"
              onClick={handleJoinHuddle}
            >
              <Video size={16} color="#8e95a5" />
              <span>{copiedHuddle ? "Copied Link!" : "Join Huddle"}</span>
            </button>

            {/* Bottom-Right: Slack Channel */}
            <a 
              href={`#${incident.slackChannel}`}
              className="action-card action-card-button"
              onClick={(e) => { e.preventDefault(); alert(`Deep-linking to Slack: ${incident.slackChannel}`); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A"/>
                <path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0"/>
                <path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" fill="#2EB67D"/>
                <path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E"/>
              </svg>
              <span className="mono-slack-name">{incident.slackChannel || "#inc-409-eu-gateway"}</span>
            </a>
          </div>

          {/* Navigation Tabs */}
          <div className="command-room-tabs-bar">
            {[
              { id: "overview", label: "Overview" },
              { id: "runbook", label: "Runbook" },
              { id: "timeline", label: "Timeline" },
              { id: "updates", label: "Updates" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`command-room-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && <span className="tab-indicator-bar" />}
              </button>
            ))}
          </div>

          {/* Tab 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="tab-content-overview">
              {/* 3-Column Metrics Card */}
              <div className="command-room-kpi-card">
                <div className="kpi-column">
                  <span className="kpi-label">Error Rate</span>
                  <span className="kpi-number red">{incident.errorRate || "12.4%"}</span>
                  <span className="kpi-target">{`(target < 1%)`}</span>
                </div>
                <div className="kpi-column">
                  <span className="kpi-label">P99 Latency</span>
                  <span className="kpi-number red">{incident.p99Latency || "842ms"}</span>
                  <span className="kpi-target">{`(target < 300ms)`}</span>
                </div>
                <div className="kpi-column">
                  <span className="kpi-label">Affected Customers</span>
                  <span className="kpi-number white">{incident.affectedCustomers || 187}</span>
                  <span className="kpi-target">{`(est.)`}</span>
                </div>
              </div>

              {/* Service Health Section */}
              <div className="service-health-section">
                <div className="service-health-header">
                  <span className="section-title">Service Health</span>
                  <div className="service-health-status red">
                    <span className="pulse-red-dot" />
                    <span>Degraded</span>
                  </div>
                </div>

                <div className="service-health-rows-card">
                  {(incident.impactedServices || [
                    { name: "api-gateway", sev: "P0" },
                    { name: "payments", sev: "P1" },
                    { name: "search", sev: "P3" },
                    { name: "frontend", sev: "P3" }
                  ]).map((svc, idx) => (
                    <div key={idx} className="service-health-row">
                      <span className="svc-name">{svc.name}</span>
                      <div className="svc-right">
                        <span className={`pill-sev pill-sev-${svc.sev.toLowerCase()}`}>
                          {svc.sev}
                        </span>
                        <ChevronRight size={14} className="svc-chevron" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Runbook Card */}
              <div className="active-runbook-card">
                <div className="runbook-card-top">
                  <div className="runbook-icon-box">
                    <BookOpen size={18} color="#f7f8f8" />
                  </div>
                  <div className="runbook-text-block">
                    <h4 className="runbook-title">Runbook: Envoy Proxy Pool Drain</h4>
                    <p className="runbook-subtitle">Drain unhealthy proxies and restore pool.</p>
                  </div>
                </div>

                <button 
                  className="artboard-btn-white full-width"
                  onClick={() => onOpenRunbook && onOpenRunbook("rb-envoy-drain")}
                >
                  Run Diagnostic
                </button>

                <div className="runbook-progress-row">
                  <div className="runbook-segmented-bar">
                    <span className="segment filled" />
                    <span className="segment" />
                    <span className="segment" />
                    <span className="segment" />
                  </div>
                  <span className="runbook-step-label">Step 1 of 4</span>
                </div>
              </div>

              {/* Connected Timeline Section */}
              <div className="command-room-timeline-section">
                <h4 className="section-title" style={{ marginBottom: "14px" }}>Timeline</h4>
                <div className="connected-timeline-list">
                  {(incident.timeline || [
                    { time: "03:12 UTC", message: "Error rate crossed 5% threshold" },
                    { time: "03:14 UTC", message: "On-call notified (Elena Rostova)" },
                    { time: "03:16 UTC", message: "Incident declared (P0)" }
                  ]).map((item, idx, arr) => (
                    <div key={idx} className="connected-timeline-item">
                      <div className="timeline-node-rail">
                        <span className="timeline-dot" />
                        {idx < arr.length - 1 && <span className="timeline-rail-line" />}
                      </div>
                      <div className="timeline-entry-content">
                        <span className="timeline-time-mono">{item.time}</span>
                        <span className="timeline-msg-text">{item.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: RUNBOOK INLINE */}
          {activeTab === "runbook" && (
            <div className="tab-content-runbook-inline">
              <div className="active-runbook-card" style={{ marginTop: "10px" }}>
                <h4 className="runbook-title" style={{ fontSize: "15px", marginBottom: "6px" }}>
                  Envoy Sidecar Drain Procedure
                </h4>
                <p className="runbook-subtitle" style={{ marginBottom: "16px" }}>
                  Automated verification and traffic redirection commands.
                </p>
                <button 
                  className="artboard-btn-white full-width"
                  onClick={() => onOpenRunbook && onOpenRunbook("rb-envoy-drain")}
                >
                  Open Full Runbook Console
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: TIMELINE EXPANDED */}
          {activeTab === "timeline" && (
            <div className="tab-content-timeline-expanded" style={{ padding: "16px 0" }}>
              <div className="connected-timeline-list">
                {incident.timeline?.map((item, idx, arr) => (
                  <div key={idx} className="connected-timeline-item">
                    <div className="timeline-node-rail">
                      <span className="timeline-dot" />
                      {idx < arr.length - 1 && <span className="timeline-rail-line" />}
                    </div>
                    <div className="timeline-entry-content">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                        <span className="timeline-time-mono">{item.time}</span>
                        {item.author && <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>• {item.author}</span>}
                      </div>
                      <span className="timeline-msg-text">{item.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: UPDATES */}
          {activeTab === "updates" && (
            <div className="tab-content-updates" style={{ padding: "16px 0" }}>
              <div className="active-runbook-card">
                <span style={{ fontSize: "11px", color: "var(--color-accent)", textTransform: "uppercase", fontWeight: 700 }}>
                  Customer Status Broadcast
                </span>
                <p style={{ fontSize: "13px", color: "var(--color-text-primary)", marginTop: "6px" }}>
                  "We are currently experiencing elevated 504 Gateway Timeouts affecting API ingress in EU-West. Engineers are actively investigating the upstream proxy pool."
                </p>
                <span style={{ fontSize: "10px", color: "var(--color-text-quaternary)", marginTop: "8px", display: "block" }}>
                  Broadcasted 8m ago to status.vigil.dev
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sticky Update Input Bar */}
        <footer className="command-room-bottom-bar">
          <form onSubmit={handlePostUpdate} className="command-room-input-form">
            <div className="input-with-send">
              <input 
                type="text" 
                placeholder="Post an update..."
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                className="command-room-text-input"
              />
              <button 
                type="submit" 
                disabled={!updateText.trim()}
                className="command-room-send-btn"
                aria-label="Send incident update"
              >
                <Send size={15} color={updateText.trim() ? "#ffffff" : "#62666d"} />
              </button>
            </div>

            {/* Toggle: Also post to public status page */}
            <div className="status-toggle-row">
              <button 
                type="button"
                className={`toggle-switch ${postToStatusPage ? "on" : "off"}`}
                onClick={() => setPostToStatusPage(!postToStatusPage)}
                aria-pressed={postToStatusPage}
              >
                <span className="toggle-thumb" />
              </button>
              <span className="toggle-label">Also post to public status page</span>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}

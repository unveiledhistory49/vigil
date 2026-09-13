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
  ShieldAlert,
  Terminal,
  ExternalLink,
  Copy,
  AlertTriangle,
  Server,
  Play,
  CheckCircle2,
  Share2
} from "lucide-react";

export function DesktopWarRoom({ 
  incident, 
  onClose, 
  onUpdateSeverity, 
  onUpdateStatus, 
  onAddTimelineEntry,
  onOpenRunbook 
}) {
  const [updateText, setUpdateText] = useState("");
  const [postToStatusPage, setPostToStatusPage] = useState(false);
  const [copiedHuddle, setCopiedHuddle] = useState(false);
  const [copiedSlack, setCopiedSlack] = useState(false);
  const [isSeverityOpen, setIsSeverityOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  // Runbook interactive state
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [copiedStepCmd, setCopiedStepCmd] = useState(null);
  const [executingStep, setExecutingStep] = useState(false);

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

  const handleToggleStep = (stepNum) => {
    setCompletedSteps(prev => 
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const handleCopyCommand = (cmd, stepNum) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd);
      setCopiedStepCmd(stepNum);
      setTimeout(() => setCopiedStepCmd(null), 2000);
    }
  };

  const handleExecuteNextStep = () => {
    setExecutingStep(true);
    setTimeout(() => {
      setExecutingStep(false);
      if (!completedSteps.includes(2)) {
        setCompletedSteps(prev => [...prev, 2]);
      } else if (!completedSteps.includes(3)) {
        setCompletedSteps(prev => [...prev, 3]);
      }
    }, 1200);
  };

  const SEVERITIES = ["P0", "P1", "P2", "P3"];
  const STATUSES = ["investigating", "identified", "monitoring", "resolved"];

  return (
    <div className="desktop-warroom-layout">
      {/* Top War Room Navigation Bar */}
      <header className="warroom-topbar">
        <div className="warroom-topbar-left">
          <button 
            className="warroom-back-link-btn" 
            onClick={onClose}
            title="Return to Incidents list (Esc)"
          >
            <ChevronLeft size={16} />
            <span>All Incidents</span>
          </button>
          <span className="warroom-topbar-divider">/</span>
          <div className="warroom-identity">
            <span className={`pill-sev pill-sev-${incident.severity.toLowerCase()}`}>
              {incident.severity}
            </span>
            <span className="warroom-id-mono">{incident.id}</span>
            <h1 className="warroom-title-heading">{incident.title}</h1>
          </div>
        </div>

        <div className="warroom-topbar-right">
          {/* Severity Selector */}
          <div className="dropdown-control-wrapper">
            <button 
              className="warroom-control-pill"
              onClick={() => { setIsSeverityOpen(!isSeverityOpen); setIsStatusOpen(false); }}
            >
              <span className="control-label">Severity:</span>
              <span className={`control-val ${incident.severity.toLowerCase()}`}>{incident.severity}</span>
            </button>
            {isSeverityOpen && (
              <div className="warroom-popover-menu">
                <div className="popover-title">Change Severity</div>
                {SEVERITIES.map(sev => (
                  <button 
                    key={sev}
                    className={`popover-item ${incident.severity === sev ? "active" : ""}`}
                    onClick={() => { onUpdateSeverity(incident.id, sev); setIsSeverityOpen(false); }}
                  >
                    <span className={`pill-sev pill-sev-${sev.toLowerCase()}`}>{sev}</span>
                    <span>{sev === "P0" ? "Critical Outage" : sev === "P1" ? "Major Degradation" : sev === "P2" ? "Moderate Alert" : "Minor Issue"}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lifecycle Status Selector */}
          <div className="dropdown-control-wrapper">
            <button 
              className="warroom-control-pill"
              onClick={() => { setIsStatusOpen(!isStatusOpen); setIsSeverityOpen(false); }}
            >
              <span className="control-label">Status:</span>
              <span className="control-val">{incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}</span>
            </button>
            {isStatusOpen && (
              <div className="warroom-popover-menu">
                <div className="popover-title">Lifecycle Status</div>
                {STATUSES.map(st => (
                  <button 
                    key={st}
                    className={`popover-item ${incident.status === st ? "active" : ""}`}
                    onClick={() => { onUpdateStatus(incident.id, st); setIsStatusOpen(false); }}
                  >
                    <span className={`status-indicator-dot ${st}`} />
                    <span>{st.charAt(0).toUpperCase() + st.slice(1)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="warroom-timer-badge">
            <Clock size={13} color="#8e95a5" />
            <span>00:42:18 elapsed</span>
          </div>

          {/* Quick Collaboration Actions */}
          <button 
            className="btn-warroom-action"
            onClick={handleJoinHuddle}
            title="Join live Google Meet / Zoom war room"
          >
            <Video size={14} color="#7187fb" />
            <span>{copiedHuddle ? "Copied Huddle Link!" : "Join Huddle"}</span>
          </button>

          <button 
            className="btn-warroom-action"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(incident.slackChannel || "#inc-409-eu-gateway");
                setCopiedSlack(true);
                setTimeout(() => setCopiedSlack(false), 2000);
              }
            }}
            title="Open Slack incident channel"
          >
            <MessageSquare size={14} color="#2EB67D" />
            <span>{copiedSlack ? "Copied Channel!" : (incident.slackChannel || "#inc-409")}</span>
          </button>
        </div>
      </header>

      {/* 3-Column Desktop Command Center Layout */}
      <div className="warroom-columns-container">
        {/* COLUMN 1: Telemetry, Impact & Service Health Mesh (Left) */}
        <aside className="warroom-col-left">
          {/* Commander Card */}
          <div className="warroom-panel-card">
            <div className="panel-card-header">
              <span className="panel-card-title">Incident Command</span>
              <span className="panel-card-badge">Primary</span>
            </div>
            <div className="commander-profile-row">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" 
                alt="Elena Rostova" 
                className="commander-avatar-lg"
              />
              <div className="commander-details">
                <span className="commander-full-name">{incident.commander?.name || "Elena Rostova"}</span>
                <span className="commander-role-tag">Staff Reliability Engineer • Tier 1</span>
                <span className="commander-handoff-note">Next rotation handoff in 3h 18m</span>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Metrics */}
          <div className="warroom-panel-card">
            <div className="panel-card-header">
              <span className="panel-card-title">Live Telemetry Metrics</span>
              <span className="telemetry-live-tag">
                <span className="pulse-red-mini" />
                Live 1s
              </span>
            </div>

            <div className="telemetry-kpis-list">
              <div className="telemetry-kpi-item">
                <div className="kpi-top">
                  <span className="kpi-label">Error Rate (5xx)</span>
                  <span className="kpi-target">Baseline: &lt; 0.1%</span>
                </div>
                <div className="kpi-value-row">
                  <span className="kpi-value red">12.4%</span>
                  <span className="kpi-delta">+12.3% threshold breach</span>
                </div>
                <div className="kpi-bar-track">
                  <div className="kpi-bar-fill red" style={{ width: "78%" }} />
                </div>
              </div>

              <div className="telemetry-kpi-item">
                <div className="kpi-top">
                  <span className="kpi-label">P99 Ingress Latency</span>
                  <span className="kpi-target">SLO: &lt; 120ms</span>
                </div>
                <div className="kpi-value-row">
                  <span className="kpi-value red">842ms</span>
                  <span className="kpi-delta">+722ms over budget</span>
                </div>
                <div className="kpi-bar-track">
                  <div className="kpi-bar-fill red" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="telemetry-kpi-item">
                <div className="kpi-top">
                  <span className="kpi-label">Impacted Traffic Volume</span>
                  <span className="kpi-target">Region: eu-west-1</span>
                </div>
                <div className="kpi-value-row">
                  <span className="kpi-value orange">142.8k req/m</span>
                  <span className="kpi-delta">~18% of EU user sessions</span>
                </div>
                <div className="kpi-bar-track">
                  <div className="kpi-bar-fill orange" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Service Health Mesh */}
          <div className="warroom-panel-card">
            <div className="panel-card-header">
              <span className="panel-card-title">Impacted Service Mesh</span>
              <span className="panel-card-counter">3 Services</span>
            </div>

            <div className="service-mesh-list">
              <div className="service-mesh-row degraded">
                <div className="mesh-row-left">
                  <span className="mesh-status-dot degraded" />
                  <div className="mesh-name-group">
                    <span className="mesh-service-name">api-gateway</span>
                    <span className="mesh-service-role">Ingress Controller • Traefik</span>
                  </div>
                </div>
                <span className="mesh-status-pill degraded">Degraded</span>
              </div>

              <div className="service-mesh-row healthy">
                <div className="mesh-row-left">
                  <span className="mesh-status-dot healthy" />
                  <div className="mesh-name-group">
                    <span className="mesh-service-name">auth-service</span>
                    <span className="mesh-service-role">Token Verification • Go</span>
                  </div>
                </div>
                <span className="mesh-status-pill healthy">Healthy</span>
              </div>

              <div className="service-mesh-row monitoring">
                <div className="mesh-row-left">
                  <span className="mesh-status-dot monitoring" />
                  <div className="mesh-name-group">
                    <span className="mesh-service-name">billing-api</span>
                    <span className="mesh-service-role">Payment Webhook • Node.js</span>
                  </div>
                </div>
                <span className="mesh-status-pill monitoring">Recovering</span>
              </div>
            </div>
          </div>
        </aside>

        {/* COLUMN 2: Live Incident Timeline & Status Broadcast (Center) */}
        <main className="warroom-col-center">
          <div className="timeline-broadcast-wrapper">
            <div className="timeline-header-row">
              <div className="timeline-header-title">
                <Activity size={15} color="#7187fb" />
                <span>Live Event Stream & Operational Log</span>
              </div>
              <span className="timeline-entries-count">
                {incident.timeline?.length || 5} chronological events
              </span>
            </div>

            {/* Scrollable Timeline Stream */}
            <div className="warroom-timeline-feed">
              {incident.timeline && incident.timeline.length > 0 ? (
                incident.timeline.map((item, idx) => (
                  <div key={idx} className={`timeline-feed-item ${item.type || "system"}`}>
                    <div className="timeline-item-meta">
                      <span className="timeline-item-time">{item.time}</span>
                      <span className={`timeline-item-author ${item.type || "system"}`}>
                        {item.author || "System Bot"}
                      </span>
                      {item.type === "system" && <span className="timeline-type-pill">SYSTEM ALERT</span>}
                      {item.type === "user" && <span className="timeline-type-pill user">COMMANDER</span>}
                    </div>
                    <div className="timeline-item-body">
                      {item.message}
                    </div>
                  </div>
                ))
              ) : (
                <div className="timeline-empty-feed">
                  <span>No timeline entries yet. Post the first update below.</span>
                </div>
              )}
            </div>

            {/* Broadcast Update Composer */}
            <form onSubmit={handlePostUpdate} className="warroom-update-composer">
              <div className="composer-textarea-wrap">
                <textarea 
                  rows={2}
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                  placeholder="Post operational update to war room timeline (e.g. Ingress pods restarted, evaluating error drops)..."
                  className="composer-textarea"
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      handlePostUpdate(e);
                    }
                  }}
                />
              </div>

              <div className="composer-controls-bar">
                <label className="composer-statuspage-toggle">
                  <input 
                    type="checkbox" 
                    checked={postToStatusPage}
                    onChange={(e) => setPostToStatusPage(e.target.checked)}
                  />
                  <span>Sync update to Public Status Dashboard</span>
                </label>

                <button 
                  type="submit" 
                  disabled={!updateText.trim()}
                  className="btn-composer-send"
                >
                  <Send size={13} />
                  <span>Send Update</span>
                  <kbd>⌘Enter</kbd>
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* COLUMN 3: Active Executable Runbook & Automation Runner (Right) */}
        <aside className="warroom-col-right">
          <div className="warroom-panel-card runbook-runner-card">
            <div className="panel-card-header">
              <div className="header-with-icon">
                <Terminal size={15} color="#7187fb" />
                <span className="panel-card-title">Remediation Automation</span>
              </div>
              <span className="runbook-status-badge in-progress">Step 2 of 3</span>
            </div>

            <div className="runbook-target-strip">
              <span className="runbook-code-name">rb-restart-lb</span>
              <h3 className="runbook-display-title">Restart Ingress Load Balancers</h3>
              <p className="runbook-desc-text">
                Gracefully drains traffic and initiates a rolling restart of the Traefik ingress controller daemonset in cluster eu-west-prod.
              </p>
            </div>

            {/* Step Sequence */}
            <div className="runbook-step-sequence">
              {/* Step 1 */}
              <div className={`runbook-step-box ${completedSteps.includes(1) ? "completed" : ""}`}>
                <div className="step-header">
                  <button 
                    type="button" 
                    className={`step-checkbox ${completedSteps.includes(1) ? "checked" : ""}`}
                    onClick={() => handleToggleStep(1)}
                  >
                    {completedSteps.includes(1) && <Check size={12} color="#ffffff" />}
                  </button>
                  <span className="step-num-label">Step 1: Drain unhealthy ingress node</span>
                  {completedSteps.includes(1) && <span className="step-verified-tag">Verified</span>}
                </div>
                <div className="step-code-snippet">
                  <code>kubectl cordon eu-west-node-04</code>
                  <button 
                    type="button" 
                    className="step-copy-btn"
                    onClick={() => handleCopyCommand("kubectl cordon eu-west-node-04", 1)}
                    title="Copy command"
                  >
                    {copiedStepCmd === 1 ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`runbook-step-box ${completedSteps.includes(2) ? "completed" : "active-step"}`}>
                <div className="step-header">
                  <button 
                    type="button" 
                    className={`step-checkbox ${completedSteps.includes(2) ? "checked" : ""}`}
                    onClick={() => handleToggleStep(2)}
                  >
                    {completedSteps.includes(2) && <Check size={12} color="#ffffff" />}
                  </button>
                  <span className="step-num-label">Step 2: Rolling restart ingress pods</span>
                  {!completedSteps.includes(2) && <span className="step-active-tag">CURRENT</span>}
                </div>
                <div className="step-code-snippet">
                  <code>kubectl rollout restart ds/traefik-ingress -n ingress-system</code>
                  <button 
                    type="button" 
                    className="step-copy-btn"
                    onClick={() => handleCopyCommand("kubectl rollout restart ds/traefik-ingress -n ingress-system", 2)}
                    title="Copy command"
                  >
                    {copiedStepCmd === 2 ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`runbook-step-box ${completedSteps.includes(3) ? "completed" : ""}`}>
                <div className="step-header">
                  <button 
                    type="button" 
                    className={`step-checkbox ${completedSteps.includes(3) ? "checked" : ""}`}
                    onClick={() => handleToggleStep(3)}
                  >
                    {completedSteps.includes(3) && <Check size={12} color="#ffffff" />}
                  </button>
                  <span className="step-num-label">Step 3: Verify gateway health endpoint</span>
                </div>
                <div className="step-code-snippet">
                  <code>curl -fsS https://api.acme.corp/healthz -H "Host: ingress-probe"</code>
                  <button 
                    type="button" 
                    className="step-copy-btn"
                    onClick={() => handleCopyCommand('curl -fsS https://api.acme.corp/healthz -H "Host: ingress-probe"', 3)}
                    title="Copy command"
                  >
                    {copiedStepCmd === 3 ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Runbook Output Simulator Log */}
            <div className="runbook-terminal-output">
              <div className="terminal-header">
                <span className="terminal-title">STDOUT Execution Stream</span>
                <span className="terminal-pod-id">pod/traefik-ingress-7d8b94</span>
              </div>
              <pre className="terminal-body">
                <code>{completedSteps.includes(2) 
                  ? `$ kubectl rollout restart ds/traefik-ingress -n ingress-system\ndaemonset.apps/traefik-ingress restarted\nwaiting for rollout to finish: 4 of 4 updated pods are available...\n[OK] all 4 ingress controller replicas healthy in 14.2s`
                  : `$ kubectl cordon eu-west-node-04\nnode/eu-west-node-04 cordoned\n[OK] node cordoned successfully. Ready for step 2.`
                }</code>
              </pre>
            </div>

            {/* Action Bar */}
            <div className="runbook-action-footer">
              <button 
                className="btn-runbook-step-execute"
                onClick={handleExecuteNextStep}
                disabled={executingStep || completedSteps.length === 3}
              >
                {executingStep ? (
                  <>
                    <span className="pulse-white-mini" />
                    <span>Executing Step...</span>
                  </>
                ) : completedSteps.length === 3 ? (
                  <>
                    <CheckCircle2 size={14} color="#27ae60" />
                    <span>All Runbook Steps Complete</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>Execute Step {completedSteps.includes(2) ? "3" : "2"} in Cluster</span>
                  </>
                )}
              </button>

              <button 
                className="btn-open-runbook-suite"
                onClick={() => onOpenRunbook && onOpenRunbook("rb-restart-lb")}
                title="Open full execution runner with dry-run parameters"
              >
                <span>Full Runner</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

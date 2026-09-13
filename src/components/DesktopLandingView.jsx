import React, { useState } from "react";
import { 
  Zap, 
  Terminal, 
  Share2, 
  ChevronRight, 
  Smartphone, 
  ExternalLink,
  Shield,
  Activity,
  ArrowRight,
  Server,
  Radio,
  Clock,
  CheckCircle2,
  AlertOctagon
} from "lucide-react";

export function DesktopLandingView({ 
  onLaunchApp, 
  onSimulateIncident, 
  onOpenIncident, 
  onOpenFeature,
  onSwitchToMobile 
}) {
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  const handleSimulate = () => {
    setSimulatedAlert(true);
    setTimeout(() => {
      if (onSimulateIncident) onSimulateIncident();
    }, 900);
  };

  return (
    <div className="desktop-landing-container">
      {/* Sticky Desktop Navigation Header */}
      <header className="desktop-landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand-group">
            <div className="landing-logo-mark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4L11 20L13.5 13.5L8.5 4H4Z" fill="#7187fb" />
                <path d="M11 20L20 4H15.5L13.5 13.5L11 20Z" fill="#4455c7" />
              </svg>
            </div>
            <span className="landing-brand-title">Vigil</span>
            <span className="landing-version-badge">v2.0</span>
          </div>

          <nav className="landing-nav-links">
            <button onClick={onLaunchApp} className="landing-nav-link">
              Incidents Console
            </button>
            <button onClick={() => onOpenFeature && onOpenFeature("runbooks")} className="landing-nav-link">
              Runbooks
            </button>
            <button onClick={() => onOpenFeature && onOpenFeature("services")} className="landing-nav-link">
              Services & SLOs
            </button>
            <button onClick={() => onOpenFeature && onOpenFeature("retros")} className="landing-nav-link">
              Post-Mortems
            </button>
            <button onClick={() => onOpenFeature && onOpenFeature("onboarding")} className="landing-nav-link">
              Integrations
            </button>
          </nav>

          <div className="landing-nav-actions">
            <button 
              onClick={onSwitchToMobile}
              className="btn-mode-toggle"
              title="Switch to Mobile Artboard View"
            >
              <Smartphone size={14} />
              <span>Mobile View</span>
            </button>
            <button 
              onClick={onLaunchApp}
              className="btn-landing-cta"
            >
              <span>Launch Live App</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Simulated Outage Banner Toast */}
      {simulatedAlert && (
        <div className="desktop-alert-banner">
          <span className="pulse-red-dot" />
          <span className="alert-banner-text">SIMULATED P0 OUTAGE FIRED: EU Ingress Gateway 504 Threshold Breach</span>
          <span className="alert-banner-tag">Redirecting to War Room...</span>
        </div>
      )}

      {/* Expansive Desktop Hero */}
      <section className="desktop-hero-section">
        <div className="desktop-hero-inner">
          <div className="desktop-hero-left">
            <div className="hero-pill-badge">
              <span className="pill-dot-green" />
              <span>Incident Automation Engine • High-Velocity SRE</span>
            </div>

            <h1 className="desktop-hero-title">
              Incident command<br />
              at the speed of<br />
              thought.
            </h1>

            <p className="desktop-hero-desc">
              Replace tab-switching between five monitoring tools and the wait on a dashboard. Vigil gives reliability engineers a keyboard-driven incident command platform with live telemetry, automated mitigation, and executable runbooks.
            </p>

            <div className="desktop-hero-actions">
              <button 
                onClick={onLaunchApp}
                className="desktop-btn-primary"
              >
                <span>Launch Live App</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={handleSimulate}
                className="desktop-btn-secondary"
              >
                <span className="pulse-red-mini" />
                <span>Simulate P0 Outage</span>
              </button>
            </div>

            {/* Quick SRE Telemetry Stats */}
            <div className="desktop-hero-stats">
              <div className="hero-stat-block">
                <span className="stat-big-num">&lt; 90s</span>
                <span className="stat-sub-label">Mean Time to Acknowledge</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-block">
                <span className="stat-big-num">4.2x</span>
                <span className="stat-sub-label">Faster Runbook MTTR</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-block">
                <span className="stat-big-num">99.99%</span>
                <span className="stat-sub-label">Service Mesh SLO Target</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Command Center Preview Card */}
          <div className="desktop-hero-right">
            <div 
              className="desktop-warroom-preview-card"
              onClick={() => onOpenIncident ? onOpenIncident("INC-409") : onLaunchApp()}
              title="Click to enter active INC-409 Command Room"
            >
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="card-badge-p0">P0</span>
                  <span className="preview-id">INC-409</span>
                  <span className="preview-pulsing-badge">
                    <span className="pulse-red-mini" />
                    WAR ROOM ACTIVE
                  </span>
                </div>
                <span className="preview-timestamp">Updated 2m ago</span>
              </div>

              <div className="preview-title-row">
                <h3 className="preview-title">EU Gateway Errors: Ingress 504 Threshold Breach</h3>
                <span className="preview-commander-tag">Commander: Elena Rostova</span>
              </div>

              <div className="preview-metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Error rate</span>
                  <span className="metric-val red">12.4%</span>
                  <span className="metric-target">Target: &lt; 0.1%</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">P99 latency</span>
                  <span className="metric-val red">842ms</span>
                  <span className="metric-target">Target: &lt; 120ms</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Impacted Req</span>
                  <span className="metric-val orange">142.8k/m</span>
                  <span className="metric-target">Mesh: eu-west-1</span>
                </div>
              </div>

              {/* Live Sparkline */}
              <div className="preview-sparkline-area">
                <div className="sparkline-title-row">
                  <span>TELEMETRY METRIC: HTTP 5XX ANOMALY BURST</span>
                  <span className="sparkline-badge-red">+840% vs Baseline</span>
                </div>
                <svg viewBox="0 0 460 70" preserveAspectRatio="none" className="desktop-sparkline-svg">
                  <defs>
                    <linearGradient id="desktop-red-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#eb5757" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#eb5757" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0 55 Q 35 55 60 52 T 120 48 T 180 50 T 230 46 T 280 40 T 320 22 T 370 12 T 420 8 L 460 6 L 460 70 L 0 70 Z" 
                    fill="url(#desktop-red-grad)" 
                  />
                  <path 
                    d="M 0 55 Q 35 55 60 52 T 120 48 T 180 50 T 230 46 T 280 40 T 320 22 T 370 12 T 420 8 L 460 6" 
                    fill="none" 
                    stroke="#eb5757" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                  <circle cx="460" cy="6" r="4.5" fill="#eb5757" />
                  <circle cx="460" cy="6" r="8" fill="none" stroke="#eb5757" strokeWidth="1.5" opacity="0.6" className="pulse-red" />
                </svg>
              </div>

              <div className="preview-card-footer">
                <div className="preview-services-tags">
                  <span className="srv-tag degraded">api-gateway (degraded)</span>
                  <span className="srv-tag healthy">auth-service</span>
                  <span className="srv-tag healthy">billing-api</span>
                </div>
                <button className="preview-enter-btn">
                  <span>Enter War Room</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Capabilities Grid (Matches the exact 3 rows from artboard mockup) */}
      <section className="desktop-features-section">
        <div className="features-inner">
          <div className="features-section-header">
            <span className="section-pill">Core Engine Architecture</span>
            <h2 className="section-heading">Designed for engineers under pressure</h2>
            <p className="section-subtext">Built to eliminate context-switching, automate triage, and capture real-time post-mortem data.</p>
          </div>

          <div className="desktop-features-grid">
            {/* Feature 1 */}
            <div 
              className="feature-desktop-card"
              onClick={onLaunchApp}
            >
              <div className="feature-icon-wrapper">
                <Zap size={22} color="#7187fb" />
              </div>
              <h3 className="feature-card-title">Instant triage & routing</h3>
              <p className="feature-card-body">
                Auto-correlate alerts from Datadog, Prometheus, and Grafana into a unified war room. Immediate Slack and Zoom dispatch with zero manual setup.
              </p>
              <div className="feature-card-action">
                <span>View Incidents Console</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              className="feature-desktop-card"
              onClick={() => onOpenFeature && onOpenFeature("runbooks")}
            >
              <div className="feature-icon-wrapper">
                <Terminal size={22} color="#7187fb" />
              </div>
              <h3 className="feature-card-title">Runbook automation engine</h3>
              <p className="feature-card-body">
                Execute tested, parameter-driven runbooks directly from the console. Drain pods, restart load balancers, and failover databases in seconds with audited output.
              </p>
              <div className="feature-card-action">
                <span>Explore Executable Runbooks</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              className="feature-desktop-card"
              onClick={() => onOpenFeature && onOpenFeature("retros")}
            >
              <div className="feature-icon-wrapper">
                <Share2 size={22} color="#7187fb" />
              </div>
              <h3 className="feature-card-title">Zero-friction retros & sync</h3>
              <p className="feature-card-body">
                Incident timelines generated in real time from system alerts, bot commands, and commander notes. Publish one-click updates to your public status dashboard.
              </p>
              <div className="feature-card-action">
                <span>Open Post-Mortem Studio</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SRE Pipeline Flow Visual Section */}
      <section className="desktop-pipeline-section">
        <div className="pipeline-inner">
          <div className="pipeline-header">
            <span className="section-pill">Real-Time Event Architecture</span>
            <h3 className="pipeline-title">Sub-second telemetry ingestion to war room resolution</h3>
          </div>

          <div className="pipeline-flow-diagram">
            <div className="pipeline-node">
              <div className="node-icon"><Server size={18} /></div>
              <div className="node-content">
                <span className="node-title">Telemetry Sources</span>
                <span className="node-desc">Datadog • Prometheus • CloudWatch</span>
              </div>
            </div>

            <div className="pipeline-connector">
              <span className="connector-line" />
              <ChevronRight size={16} className="connector-arrow" />
            </div>

            <div className="pipeline-node active">
              <div className="node-icon"><AlertOctagon size={18} color="#eb5757" /></div>
              <div className="node-content">
                <span className="node-title">Vigil Triage Matrix</span>
                <span className="node-desc">P0-P3 Routing • Cluster Correlator</span>
              </div>
            </div>

            <div className="pipeline-connector">
              <span className="connector-line" />
              <ChevronRight size={16} className="connector-arrow" />
            </div>

            <div className="pipeline-node">
              <div className="node-icon"><Terminal size={18} /></div>
              <div className="node-content">
                <span className="node-title">Automated Runbook</span>
                <span className="node-desc">Kubernetes • Traefik • RDS Failover</span>
              </div>
            </div>

            <div className="pipeline-connector">
              <span className="connector-line" />
              <ChevronRight size={16} className="connector-arrow" />
            </div>

            <div className="pipeline-node">
              <div className="node-icon"><Radio size={18} color="#27ae60" /></div>
              <div className="node-content">
                <span className="node-title">Public Status Sync</span>
                <span className="node-desc">Slack • Discord • Customer Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Landing Footer */}
      <footer className="desktop-landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-left">
            <div className="landing-logo-mark small">
              <Shield size={14} color="#7187fb" />
            </div>
            <span className="footer-brand">Vigil Incident Command</span>
            <span className="footer-copy">© 2026 Vigil Reliability Engine. Open telemetry protocol compatible.</span>
          </div>

          <div className="footer-right">
            <span className="system-health-indicator">
              <span className="pulse-green-dot" />
              All Systems Operational (eu-west-1)
            </span>
            <button onClick={onSwitchToMobile} className="footer-mobile-link">
              <Smartphone size={13} />
              <span>Mobile Artboard View</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

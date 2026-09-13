import React, { useState } from "react";
import { 
  Copy, 
  Check, 
  CheckCircle2, 
  Building2, 
  MessageSquare, 
  Radio, 
  Server, 
  ShieldCheck, 
  ArrowRight,
  Send,
  ExternalLink,
  Flame,
  Zap,
  Activity
} from "lucide-react";

export function DesktopOnboardingView({ onComplete }) {
  const [workspaceName, setWorkspaceName] = useState("Acme Production");
  const [clusterRegion, setClusterRegion] = useState("eu-west-1 (Frankfurt)");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [pingSent, setPingSent] = useState(false);

  // Connection states
  const [connections, setConnections] = useState({
    slack: true,
    discord: false,
    datadog: true,
    prometheus: true,
    grafana: false,
    cloudwatch: false,
    pagerduty: true
  });

  const toggleConnection = (key) => {
    setConnections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyWebhook = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://api.vigil.dev/v1/inbound/acme-eu-7f3e9c2a");
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleTestPing = () => {
    setPingSent(true);
    setTimeout(() => setPingSent(false), 2500);
  };

  return (
    <div className="desktop-onboarding-container">
      {/* Onboarding Header */}
      <header className="desktop-onboarding-header">
        <div className="onboarding-header-left">
          <span className="onboarding-eyebrow">WORKSPACE INITIALIZATION</span>
          <h1 className="onboarding-main-heading">Reliability Mesh Setup & Integrations</h1>
          <p className="onboarding-subheading">
            Connect your telemetry ingress, configure real-time alert routing, and verify cluster webhook delivery in three steps.
          </p>
        </div>

        <button 
          className="btn-complete-setup"
          onClick={onComplete}
        >
          <span>Complete Setup & Open Console</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* 3-Column Stepper Cards Grid */}
      <div className="onboarding-cards-grid">
        {/* STEP 1: Workspace & Cluster Mesh */}
        <div className="onboarding-step-card">
          <div className="card-step-badge">
            <span className="step-badge-num">1</span>
            <span className="step-badge-title">Workspace Configuration</span>
          </div>

          <p className="step-explainer">
            Configure your SRE cluster profile and default escalation policy.
          </p>

          <div className="step-form-group">
            <label className="form-label">Team / Organization Name</label>
            <input 
              type="text" 
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="form-text-input"
            />
          </div>

          <div className="step-form-group">
            <label className="form-label">Primary Ingress Region</label>
            <select 
              value={clusterRegion}
              onChange={(e) => setClusterRegion(e.target.value)}
              className="form-select-input"
            >
              <option value="eu-west-1 (Frankfurt)">EU-West (Frankfurt) • Primary</option>
              <option value="us-east-1 (N. Virginia)">US-East (N. Virginia) • Failover</option>
              <option value="ap-southeast-1 (Singapore)">AP-Southeast (Singapore)</option>
            </select>
          </div>

          <div className="step-card-status-pill success">
            <CheckCircle2 size={13} />
            <span>Telemetry endpoint provisioned</span>
          </div>
        </div>

        {/* STEP 2: Alert Destinations */}
        <div className="onboarding-step-card">
          <div className="card-step-badge">
            <span className="step-badge-num">2</span>
            <span className="step-badge-title">Alert & Dispatch Channels</span>
          </div>

          <p className="step-explainer">
            Select incident notification channels and automated war room dispatch triggers.
          </p>

          <div className="integrations-toggle-list">
            <div 
              className={`integration-row-card ${connections.slack ? "connected" : ""}`}
              onClick={() => toggleConnection("slack")}
            >
              <div className="int-left">
                <span className="int-name">Slack Bot Dispatch</span>
                <span className="int-desc">Create #inc-[id] channels automatically</span>
              </div>
              <span className={`int-badge ${connections.slack ? "active" : ""}`}>
                {connections.slack ? "Connected" : "Connect"}
              </span>
            </div>

            <div 
              className={`integration-row-card ${connections.pagerduty ? "connected" : ""}`}
              onClick={() => toggleConnection("pagerduty")}
            >
              <div className="int-left">
                <span className="int-name">PagerDuty Sync</span>
                <span className="int-desc">Two-way acknowledgment & escalation</span>
              </div>
              <span className={`int-badge ${connections.pagerduty ? "active" : ""}`}>
                {connections.pagerduty ? "Connected" : "Connect"}
              </span>
            </div>

            <div 
              className={`integration-row-card ${connections.discord ? "connected" : ""}`}
              onClick={() => toggleConnection("discord")}
            >
              <div className="int-left">
                <span className="int-name">Discord Webhook</span>
                <span className="int-desc">Engineering announcements broadcast</span>
              </div>
              <span className={`int-badge ${connections.discord ? "active" : ""}`}>
                {connections.discord ? "Connected" : "Connect"}
              </span>
            </div>
          </div>
        </div>

        {/* STEP 3: Telemetry Ingress Webhook */}
        <div className="onboarding-step-card">
          <div className="card-step-badge">
            <span className="step-badge-num">3</span>
            <span className="step-badge-title">Telemetry Ingress Hub</span>
          </div>

          <p className="step-explainer">
            Send raw alerts from Datadog, Prometheus, or Grafana to your unique Vigil endpoint.
          </p>

          <div className="webhook-endpoint-box">
            <div className="webhook-label-row">
              <span className="webhook-title">YOUR INGRESS ENDPOINT:</span>
              <button 
                type="button" 
                className="btn-copy-webhook"
                onClick={handleCopyWebhook}
              >
                {copiedUrl ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedUrl ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <code className="webhook-url-string">
              https://api.vigil.dev/v1/inbound/acme-eu-7f3e9c2a
            </code>
          </div>

          <div className="test-alert-action-box">
            <button 
              className="btn-send-test-ping"
              onClick={handleTestPing}
              disabled={pingSent}
            >
              {pingSent ? (
                <>
                  <CheckCircle2 size={13} color="#27ae60" />
                  <span>HTTP 200 OK: Event Ingested</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>Send Synthetic Test Ping</span>
                </>
              )}
            </button>
            <span className="test-hint-text">Validates JSON schema payload and cluster routing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

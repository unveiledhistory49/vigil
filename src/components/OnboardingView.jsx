import React, { useState } from "react";
import { 
  ChevronLeft, 
  Copy, 
  Check, 
  CheckCircle2, 
  Flame, 
  Cloud, 
  Share2, 
  Activity, 
  Radio
} from "lucide-react";

export function OnboardingView({ onBack, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, or 3
  const [workspaceName, setWorkspaceName] = useState("Acme Corp");
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Connection states
  const [connections, setConnections] = useState({
    slack: true,
    discord: false,
    datadog: true,
    prometheus: false,
    grafana: false,
    cloudwatch: false,
    webhook: true
  });

  const toggleConnection = (key) => {
    setConnections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyWebhook = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://api.vigil.dev/v1/inbound/7f3e9c2a");
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="artboard-onboarding-view">
      {/* Top Header */}
      <header className="onboarding-header">
        <button 
          className="onboarding-back-btn"
          onClick={() => {
            if (currentStep > 1) setCurrentStep(currentStep - 1);
            else if (onBack) onBack();
          }}
          aria-label="Go back"
        >
          <ChevronLeft size={22} color="#f7f8f8" />
        </button>
        <h2 className="onboarding-header-title">Onboarding</h2>
      </header>

      <div className="onboarding-body-scrollable">
        {/* Step Indicator */}
        <div className="onboarding-step-indicator">
          <div className="step-dots-row">
            <span className={`step-dot ${currentStep >= 1 ? "filled" : "empty"}`} />
            <span className={`step-dot ${currentStep >= 2 ? "filled" : "empty"}`} />
            <span className={`step-dot ${currentStep >= 3 ? "filled" : "empty"}`} />
          </div>
          <span className="step-label">Step {currentStep} of 3</span>
        </div>

        {/* STEP 1: Workspace & Notification Channels */}
        {currentStep === 1 && (
          <div className="onboarding-step-content">
            <h1 className="step-main-title">Workspace & Notification Channels</h1>
            <p className="step-description">
              Give your workspace a name and connect your notification channels.
            </p>

            <div className="onboarding-field-group">
              <label className="onboarding-label">Workspace name</label>
              <input 
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="onboarding-text-input"
                placeholder="Acme Corp"
              />
            </div>

            {/* Notification Integrations */}
            <div className="onboarding-integrations-list">
              {/* Slack */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A"/>
                      <path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0"/>
                      <path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" fill="#2EB67D"/>
                      <path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E"/>
                    </svg>
                  </div>
                  <span className="integration-name">Slack</span>
                </div>
                <button 
                  className={`btn-connect ${connections.slack ? "connected" : ""}`}
                  onClick={() => toggleConnection("slack")}
                >
                  {connections.slack ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Discord */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5865F2">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <span className="integration-name">Discord</span>
                </div>
                <button 
                  className={`btn-connect ${connections.discord ? "connected" : ""}`}
                  onClick={() => toggleConnection("discord")}
                >
                  {connections.discord ? "Connected" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Connect Telemetry Source */}
        {currentStep === 2 && (
          <div className="onboarding-step-content">
            <h1 className="step-main-title">Connect Telemetry Source</h1>
            <p className="step-description">
              Link your observability and monitoring data sources.
            </p>

            <div className="onboarding-integrations-list">
              {/* Datadog */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap datadog">
                    <Activity size={18} color="#632CA6" />
                  </div>
                  <span className="integration-name">Datadog</span>
                </div>
                <button 
                  className={`btn-connect ${connections.datadog ? "connected" : ""}`}
                  onClick={() => toggleConnection("datadog")}
                >
                  {connections.datadog ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Prometheus */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap prometheus">
                    <Flame size={18} color="#e6522c" />
                  </div>
                  <span className="integration-name">Prometheus</span>
                </div>
                <button 
                  className={`btn-connect ${connections.prometheus ? "connected" : ""}`}
                  onClick={() => toggleConnection("prometheus")}
                >
                  {connections.prometheus ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Grafana */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap grafana">
                    <Radio size={18} color="#f46800" />
                  </div>
                  <span className="integration-name">Grafana</span>
                </div>
                <button 
                  className={`btn-connect ${connections.grafana ? "connected" : ""}`}
                  onClick={() => toggleConnection("grafana")}
                >
                  {connections.grafana ? "Connected" : "Connect"}
                </button>
              </div>

              {/* CloudWatch */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap cloudwatch">
                    <Cloud size={18} color="#ff9900" />
                  </div>
                  <span className="integration-name">CloudWatch</span>
                </div>
                <button 
                  className={`btn-connect ${connections.cloudwatch ? "connected" : ""}`}
                  onClick={() => toggleConnection("cloudwatch")}
                >
                  {connections.cloudwatch ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Custom HTTP Webhook */}
              <div className="integration-row-card">
                <div className="integration-left">
                  <div className="integration-icon-wrap webhook">
                    <Share2 size={18} color="#5e6ad2" />
                  </div>
                  <span className="integration-name">Custom HTTP Webhook</span>
                </div>
                <button 
                  className={`btn-connect ${connections.webhook ? "connected" : ""}`}
                  onClick={() => toggleConnection("webhook")}
                >
                  {connections.webhook ? "Connected" : "Connect"}
                </button>
              </div>
            </div>

            {/* Webhook Ingress URL Card */}
            <div className="webhook-ingress-card">
              <span className="webhook-card-label">Webhook ingress URL</span>
              <div className="webhook-url-row">
                <span className="webhook-url-mono">https://api.vigil.dev/v1/inbound/7f3e9c2a</span>
                <button 
                  className="webhook-copy-btn"
                  onClick={handleCopyWebhook}
                  aria-label="Copy Webhook ingress URL"
                >
                  {copiedUrl ? <Check size={13} color="#27ae60" /> : <Copy size={13} />}
                  <span>{copiedUrl ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Complete / Ready */}
        {currentStep === 3 && (
          <div className="onboarding-step-content" style={{ textAlign: "center", padding: "30px 10px" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(39, 174, 96, 0.15)",
              border: "1px solid rgba(39, 174, 96, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <CheckCircle2 size={30} color="#27ae60" />
            </div>

            <h1 className="step-main-title">Workspace Ready</h1>
            <p className="step-description" style={{ maxWidth: "300px", margin: "0 auto 24px" }}>
              {workspaceName} is configured with live webhook ingress and notification channels.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="onboarding-bottom-bar">
        <button 
          className="artboard-btn-primary full-width"
          onClick={handleNext}
        >
          {currentStep === 3 ? "Enter Incident Console" : "Next"}
        </button>
      </footer>
    </div>
  );
}

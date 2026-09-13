import React, { useState } from "react";
import { 
  Zap, 
  Terminal, 
  Share2, 
  ChevronRight, 
  Menu,
  X
} from "lucide-react";

export function LandingPage({ onLaunchApp, onSimulateIncident, onOpenFeature }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  const handleSimulate = () => {
    setSimulatedAlert(true);
    setTimeout(() => {
      if (onSimulateIncident) onSimulateIncident();
    }, 1000);
  };

  return (
    <div className="artboard-landing-wrapper">
      {/* Top Mobile Status Header */}
      <header className="artboard-header">
        <div className="artboard-brand">
          <div className="artboard-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 4L11 20L13.5 13.5L8.5 4H4Z" fill="#7187fb" />
              <path d="M11 20L20 4H15.5L13.5 13.5L11 20Z" fill="#4455c7" />
            </svg>
          </div>
          <span className="brand-name">Vigil</span>
          <span className="brand-version">v2.0</span>
        </div>

        <div className="artboard-header-actions">
          <button 
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu if toggled */}
      {isMenuOpen && (
        <div className="mobile-menu-drawer">
          <button onClick={() => { setIsMenuOpen(false); onLaunchApp(); }} className="menu-drawer-item">
            <span>Open Command Console</span>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => { setIsMenuOpen(false); handleSimulate(); }} className="menu-drawer-item">
            <span>Simulate P0 Outage</span>
            <span className="badge badge-p0" style={{ fontSize: "10px" }}>TEST</span>
          </button>
          <button onClick={() => { setIsMenuOpen(false); onOpenFeature && onOpenFeature("runbooks"); }} className="menu-drawer-item">
            <span>Runbooks Catalog</span>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => { setIsMenuOpen(false); onOpenFeature && onOpenFeature("onboarding"); }} className="menu-drawer-item">
            <span>Setup & Onboarding</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Simulated Alert Notification Toast */}
      {simulatedAlert && (
        <div className="simulated-alert-banner">
          <span className="pulse-red" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#eb5757" }} />
          <span>SIMULATED P0 FIRED: Ingress 504 Threshold Breach</span>
        </div>
      )}

      {/* Main Hero Content */}
      <main className="artboard-hero-section">
        <h1 className="artboard-hero-title">
          Incident command<br />
          at the speed of<br />
          thought.
        </h1>

        <p className="artboard-hero-subtitle">
          Replace the tab-switching between five tools and the wait on a dashboard. A keyboard-driven incident command platform for engineering teams.
        </p>

        {/* CTA Buttons */}
        <div className="artboard-hero-ctas">
          <button 
            onClick={onLaunchApp}
            className="artboard-btn-primary"
          >
            Launch Live App
          </button>
          <button 
            onClick={handleSimulate}
            className="artboard-btn-secondary"
          >
            Simulate P0 Outage
          </button>
        </div>

        {/* Hero Card: Real-time Incident Preview */}
        <div 
          className="artboard-incident-card"
          onClick={onLaunchApp}
          title="Click to enter INC-409 War Room"
        >
          <div className="card-top-row">
            <div className="card-tags-left">
              <span className="card-badge-p0">P0</span>
              <span className="card-incident-id">INC-409</span>
            </div>
            <span className="card-timestamp">2m ago</span>
          </div>

          <div className="card-title-row">
            <h2 className="card-incident-title">EU Gateway Errors</h2>
          </div>

          <div className="card-meta-split">
            <div className="card-service-tags">
              <span className="tag-service">api-gateway</span>
              <span className="tag-status">Investigating</span>
            </div>
            <div className="card-telemetry-stats">
              <div className="stat-group">
                <span className="stat-label">Error rate</span>
                <span className="stat-value red">12.4%</span>
              </div>
              <div className="stat-group">
                <span className="stat-label">P99 latency</span>
                <span className="stat-value red">842ms</span>
              </div>
            </div>
          </div>

          {/* Sparkline Graph */}
          <div className="card-sparkline-wrapper">
            <svg viewBox="0 0 340 54" preserveAspectRatio="none" className="sparkline-svg">
              <defs>
                <linearGradient id="sparkline-red-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eb5757" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#eb5757" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path 
                d="M 0 46 
                   L 12 44 L 24 45 L 36 40 L 48 43 L 60 38 L 72 40 L 84 35 L 96 37 L 108 32 L 120 34 
                   L 132 30 L 144 33 L 156 28 L 168 31 L 180 25 L 192 27 L 204 22 L 216 26 L 228 18 
                   L 240 24 L 252 14 L 264 22 L 276 10 L 288 18 L 300 16 L 312 24 L 324 22 L 340 26 
                   L 340 54 L 0 54 Z"
                fill="url(#sparkline-red-grad)"
              />
              {/* Line */}
              <path 
                d="M 0 46 
                   L 12 44 L 24 45 L 36 40 L 48 43 L 60 38 L 72 40 L 84 35 L 96 37 L 108 32 L 120 34 
                   L 132 30 L 144 33 L 156 28 L 168 31 L 180 25 L 192 27 L 204 22 L 216 26 L 228 18 
                   L 240 24 L 252 14 L 264 22 L 276 10 L 288 18 L 300 16 L 312 24 L 324 22 L 340 26"
                fill="none"
                stroke="#eb5757"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Feature List (Structured Chevron Rows) */}
        <div className="artboard-features-list">
          <div 
            className="feature-row-item"
            onClick={onLaunchApp}
          >
            <div className="feature-icon-box">
              <Zap size={18} color="#f7f8f8" />
            </div>
            <div className="feature-text-block">
              <div className="feature-title">Sub-second Triage</div>
              <div className="feature-subtitle">⇧2 acknowledges and escalates</div>
            </div>
            <ChevronRight size={16} className="feature-chevron" />
          </div>

          <div 
            className="feature-row-item"
            onClick={() => onOpenFeature && onOpenFeature("runbooks")}
          >
            <div className="feature-icon-box">
              <Terminal size={18} color="#f7f8f8" />
            </div>
            <div className="feature-text-block">
              <div className="feature-title">Deterministic Runbooks</div>
              <div className="feature-code-pill">
                <code>$ kubectl drain node/ip-10-12-34-56</code>
              </div>
            </div>
            <ChevronRight size={16} className="feature-chevron" />
          </div>

          <div 
            className="feature-row-item"
            onClick={() => onOpenFeature && onOpenFeature("retros")}
          >
            <div className="feature-icon-box">
              <Share2 size={18} color="#f7f8f8" />
            </div>
            <div className="feature-text-block">
              <div className="feature-title">5 Whys Studio</div>
              <div className="feature-subtitle">Auto-generate root cause documentation</div>
            </div>
            <ChevronRight size={16} className="feature-chevron" />
          </div>
        </div>

        {/* Bottom Callout Card */}
        <div className="artboard-bottom-callout">
          <p className="callout-headline">
            Your next P0 will already have a room, a runbook, and a commander.
          </p>
          <button 
            onClick={onLaunchApp}
            className="artboard-btn-primary full-width"
          >
            Launch Live App
          </button>
        </div>
      </main>
    </div>
  );
}

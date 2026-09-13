import React, { useState } from "react";
import { 
  Shield, 
  Terminal, 
  AlertOctagon, 
  Server, 
  FileText, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Command, 
  Play, 
  Layers,
  ChevronRight,
  Activity,
  Cpu
} from "lucide-react";

export function LandingPage({ onLaunchApp, onSimulateIncident }) {
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  const handleSimulate = () => {
    setSimulatedAlert(true);
    setTimeout(() => {
      onSimulateIncident();
    }, 1200);
  };

  return (
    <div className="landing-container">
      {/* Background Ambient Glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "1200px",
        height: "600px",
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(94, 106, 210, 0.18), transparent 70%)",
        pointerEvents: "none",
        zIndex: 1
      }} />

      {/* Top Sticky Nav */}
      <nav className="landing-nav">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "26px",
            height: "26px",
            borderRadius: "6px",
            background: "linear-gradient(135deg, #5e6ad2 0%, #2f3475 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(94,106,210,0.5)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <Shield size={15} color="#fff" />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Vigil
          </span>
          <span style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            background: "rgba(255,255,255,0.06)",
            padding: "1px 6px",
            borderRadius: "4px"
          }}>
            Reliability Platform
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onLaunchApp}
            className="btn btn-secondary"
            style={{ fontSize: "12px" }}
          >
            Live Demo
          </button>
          <button
            onClick={onLaunchApp}
            className="btn btn-primary"
            style={{ fontSize: "12px", padding: "6px 14px" }}
          >
            <span>Launch App Console</span>
            <kbd style={{ marginLeft: "4px", background: "rgba(255,255,255,0.2)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>⌘K</kbd>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        {/* Release Pill Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 12px",
          borderRadius: "var(--radius-full)",
          background: "rgba(94, 106, 210, 0.12)",
          border: "1px solid rgba(94, 106, 210, 0.3)",
          fontSize: "12px",
          color: "var(--color-accent-hover)",
          marginBottom: "24px",
          cursor: "pointer"
        }}
        onClick={onLaunchApp}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)" }} />
          <span>Vigil 2.0: Linear-speed Incident Command</span>
          <ChevronRight size={12} />
        </div>

        {/* Hero Title */}
        <h1 className="landing-hero-headline">
          Incident command at the<br />speed of thought.
        </h1>

        {/* Subhead */}
        <p className="landing-hero-subhead">
          Built for site reliability and infrastructure teams who need zero latency when production is degraded. Keyboard-driven triage, executable runbooks, and automated root cause retrospectives.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
          <button
            onClick={onLaunchApp}
            className="btn btn-primary"
            style={{ height: "40px", padding: "0 22px", fontSize: "13.5px", fontWeight: 600 }}
          >
            <span>Launch Live App Console</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={handleSimulate}
            className="btn btn-secondary"
            style={{ height: "40px", padding: "0 18px", fontSize: "13.5px" }}
          >
            <Play size={13} color="var(--color-red)" />
            <span>{simulatedAlert ? "Triggering P0 Telemetry..." : "Simulate P0 Outage"}</span>
          </button>
        </div>

        {/* Interactive App Preview Box with Linear Edge Shine */}
        <div 
          className="edge-glow" 
          style={{
            borderRadius: "var(--radius-xl)",
            background: "rgba(15, 16, 17, 0.8)",
            border: "1px solid var(--color-border-secondary)",
            boxShadow: "0 20px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(94, 106, 210, 0.15)",
            overflow: "hidden",
            textAlign: "left"
          }}
        >
          {/* Simulated App Header */}
          <div style={{
            height: "36px",
            background: "#141516",
            borderBottom: "1px solid var(--color-border-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eb5757" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f2994a" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27ae60" }} />
              <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginLeft: "12px", fontFamily: "var(--font-mono)" }}>
                vigil-cluster-eu-west / incident-command-center
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="pulse-red" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-red)" }} />
              <span style={{ fontSize: "11px", color: "#ff7878", fontWeight: 600 }}>INC-409 ACTIVE (P0)</span>
            </div>
          </div>

          {/* Hero Body Split: Telemetry visual + Incident Matrix */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {/* Left: Telemetry Radar Visualizer */}
            <div style={{ position: "relative", minHeight: "260px", overflow: "hidden", borderRight: "1px solid var(--color-border-primary)" }}>
              <TelemetryWaveformVisualizer />
            </div>

            {/* Right: Live Triage Feed */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(10, 11, 12, 0.95)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)" }}>
                    Active War Room Timeline
                  </span>
                  <span className="badge badge-p0">P0 Critical</span>
                </div>

                <div style={{
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "2px solid var(--color-red)",
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  fontSize: "12px"
                }}>
                  <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginBottom: "2px" }}>
                    Elena Rostova (Commander) • 2m ago
                  </div>
                  <div style={{ color: "var(--color-text-primary)" }}>
                    Executing Runbook: Envoy Sidecar Rollback and Pool Drain.
                  </div>
                </div>

                <div style={{
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "2px solid var(--color-orange)",
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  fontSize: "12px"
                }}>
                  <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginBottom: "2px" }}>
                    Klaus Weber • 7m ago
                  </div>
                  <div style={{ color: "var(--color-text-primary)" }}>
                    Identified connection pool exhaustion on upstream Envoy sidecars.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <button
                  onClick={onLaunchApp}
                  className="btn btn-primary"
                  style={{ flex: 1, height: "32px", fontSize: "12px" }}
                >
                  Enter Live Incident Command Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Pillars Grid */}
      <section style={{ maxWidth: "1120px", margin: "40px auto 20px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-accent)",
            fontWeight: 600
          }}>
            Engineered for High-Pressure Reliability
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginTop: "6px" }}>
            Precision tools when milliseconds count
          </h2>
        </div>

        <div className="landing-grid" style={{ margin: 0, padding: 0 }}>
          {/* Card 1: Zero Latency Triage */}
          <div className="landing-card">
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(235, 87, 87, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <AlertOctagon size={18} color="var(--color-red)" />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              Zero-Lag Triage Matrix
            </h3>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Categorize P0 to P3 incidents with single keystrokes. Assemble dedicated war rooms and notify team channels automatically in under two seconds.
            </p>
          </div>

          {/* Card 2: Executable Runbooks */}
          <div className="landing-card">
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(94, 106, 210, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <Terminal size={18} color="var(--color-accent)" />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              Executable Runbooks
            </h3>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Deterministic operational workflows. One-click copyable bash and kubectl diagnostics with automated progress tracking and rollback steps.
            </p>
          </div>

          {/* Card 3: 5 Whys Retrospectives */}
          <div className="landing-card">
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(39, 174, 96, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <FileText size={18} color="var(--color-green)" />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              Automated Retrospective Studio
            </h3>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Transform chaotic war room chatter into structured 5 Whys root cause post-mortems and tracked preventative action items.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Infrastructure Showcase Card */}
      <section style={{ maxWidth: "1120px", margin: "60px auto 80px", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          background: "rgba(15, 16, 17, 0.5)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-xl)",
          padding: "32px",
          alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-accent)", fontWeight: 600 }}>
              Hardware & Mesh Architecture
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", marginTop: "6px", marginBottom: "12px" }}>
              Autonomous dependency discovery and SLO error budgets
            </h3>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>
              Vigil maps services in real time, calculating error budget burns and correlating alerts directly to the exact upstream code commit.
            </p>
            <button
              onClick={onLaunchApp}
              className="btn btn-primary"
              style={{ fontSize: "12px", height: "34px", padding: "0 16px" }}
            >
              <span>Explore Services Matrix</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <MeshTopologyVisualizer />
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <footer style={{
        borderTop: "1px solid var(--color-border-primary)",
        padding: "48px 24px",
        textAlign: "center",
        background: "rgba(8, 9, 10, 0.8)"
      }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
          Ready to experience sub-second reliability?
        </h2>
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
          Switch between the landing page and the live web app anytime.
        </p>
        <button
          onClick={onLaunchApp}
          className="btn btn-primary"
          style={{ height: "38px", padding: "0 20px", fontSize: "13px" }}
        >
          <span>Open Vigil Command Console</span>
          <kbd style={{ marginLeft: "4px", background: "rgba(255,255,255,0.2)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>⌘K</kbd>
        </button>
      </footer>
    </div>
  );
}

function TelemetryWaveformVisualizer() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: "280px",
      padding: "16px",
      background: "linear-gradient(180deg, #0e0f13 0%, #08090b 100%)",
      justifyContent: "space-between"
    }}>
      {/* Header telemetry info */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="pulse-red" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-red)" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
            Ingress Latency P99
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: "var(--color-text-quaternary)", fontFamily: "var(--font-mono)" }}>SLO: 2,500ms</span>
          <span className="badge badge-p0" style={{ fontSize: "10px", padding: "1px 6px" }}>BREACH</span>
        </div>
      </div>

      {/* SVG Waveform Graph */}
      <div style={{ position: "relative", flex: 1, minHeight: "150px", marginTop: "8px" }}>
        <svg 
          viewBox="0 0 420 180" 
          preserveAspectRatio="none" 
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="waveform-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eb5757" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#f2994a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#5e6ad2" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="waveform-stroke-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5e6ad2" />
              <stop offset="55%" stopColor="#5e6ad2" />
              <stop offset="70%" stopColor="#f2994a" />
              <stop offset="85%" stopColor="#eb5757" />
              <stop offset="100%" stopColor="#eb5757" />
            </linearGradient>
            <filter id="glow-breach" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <line x1="0" y1="30" x2="420" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1="70" x2="420" y2="70" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1="110" x2="420" y2="110" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1="150" x2="420" y2="150" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* SLO Threshold Line (2500ms at y=80) */}
          <line x1="0" y1="80" x2="420" y2="80" stroke="#f2994a" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
          <text x="6" y="74" fill="#f2994a" fontSize="9" fontFamily="var(--font-mono)" opacity="0.9">
            SLO CEILING (2,500ms)
          </text>

          {/* Area under curve */}
          <path
            d="M 0 148 
               C 30 145, 60 152, 90 146 
               C 120 140, 150 149, 180 144 
               C 210 138, 240 142, 270 130 
               C 290 120, 310 85, 335 48 
               C 350 25, 365 20, 380 22 
               C 395 24, 405 32, 420 28 
               L 420 180 L 0 180 Z"
            fill="url(#waveform-area-grad)"
          />

          {/* Main Waveform Stroke */}
          <path
            d="M 0 148 
               C 30 145, 60 152, 90 146 
               C 120 140, 150 149, 180 144 
               C 210 138, 240 142, 270 130 
               C 290 120, 310 85, 335 48 
               C 350 25, 365 20, 380 22 
               C 395 24, 405 32, 420 28"
            fill="none"
            stroke="url(#waveform-stroke-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Breach Anomaly Peak Pin */}
          <line x1="365" y1="20" x2="365" y2="180" stroke="rgba(235, 87, 87, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="365" cy="20" r="8" fill="rgba(235, 87, 87, 0.25)" className="pulse-red" />
          <circle cx="365" cy="20" r="4" fill="#eb5757" filter="url(#glow-breach)" />

          {/* Anomaly Callout Card */}
          <g transform="translate(268, 6)">
            <rect width="90" height="24" rx="4" fill="#141518" stroke="#eb5757" strokeWidth="1" />
            <text x="45" y="16" textAnchor="middle" fill="#f7f8f8" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
              4,210ms P99
            </text>
          </g>

          {/* X Axis Time Labels */}
          <text x="10" y="172" fill="#62666d" fontSize="9" fontFamily="var(--font-mono)">-60s</text>
          <text x="110" y="172" fill="#62666d" fontSize="9" fontFamily="var(--font-mono)">-45s</text>
          <text x="210" y="172" fill="#62666d" fontSize="9" fontFamily="var(--font-mono)">-30s</text>
          <text x="310" y="172" fill="#62666d" fontSize="9" fontFamily="var(--font-mono)">-15s</text>
          <text x="390" y="172" fill="#eb5757" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">NOW</text>
        </svg>
      </div>

      {/* Real-time telemetry summary bar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", paddingTop: "12px", borderTop: "1px solid var(--color-border-primary)", marginTop: "8px" }}>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-text-quaternary)", fontFamily: "var(--font-mono)" }}>EDGE THROUGHPUT</div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>84.2k req/s</div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-text-quaternary)", fontFamily: "var(--font-mono)" }}>ERROR RATE (504)</div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#ff7878", fontFamily: "var(--font-mono)", marginTop: "2px" }}>8.42% <span style={{ fontSize: "10px" }}>▲</span></div>
        </div>
        <div>
          <div style={{ fontSize: "10px", color: "var(--color-text-quaternary)", fontFamily: "var(--font-mono)" }}>ROOT NODE</div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>envoy-ingress-01</div>
        </div>
      </div>
    </div>
  );
}

function MeshTopologyVisualizer() {
  return (
    <div style={{
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--color-border-primary)",
      background: "radial-gradient(ellipse 90% 70% at 50% 20%, #111218 0%, #08090b 100%)",
      padding: "20px",
      position: "relative"
    }}>
      {/* Topology Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={13} color="var(--color-accent)" />
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--color-text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            Live Autonomous Service Mesh Map
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#27ae60" }} />
          <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>
            14 Services • 2 Degradations
          </span>
        </div>
      </div>

      {/* SVG Mesh Graph */}
      <div style={{ width: "100%", height: "230px" }}>
        <svg viewBox="0 0 520 220" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Connecting Edge Paths */}
          {/* Edge -> Envoy */}
          <path d="M 125 110 C 155 110, 155 65, 185 65" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 125 110 C 155 110, 155 65, 185 65" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 10" className="flow-stream" />

          {/* Edge -> Event Bus */}
          <path d="M 125 110 C 155 110, 155 155, 185 155" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 125 110 C 155 110, 155 155, 185 155" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 10" className="flow-stream" />

          {/* Envoy -> Auth Cluster */}
          <path d="M 315 65 C 340 65, 340 40, 365 40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 315 65 C 340 65, 340 40, 365 40" fill="none" stroke="#27ae60" strokeWidth="2" strokeDasharray="4 8" className="flow-stream" />

          {/* Envoy -> Patroni PostgreSQL (Bottlenecked Link) */}
          <path d="M 315 65 C 340 65, 340 105, 365 105" fill="none" stroke="#eb5757" strokeWidth="1.8" opacity="0.6" />
          <path d="M 315 65 C 340 65, 340 105, 365 105" fill="none" stroke="#eb5757" strokeWidth="2.5" strokeDasharray="4 6" className="flow-stream-fast" />

          {/* Event Bus -> Kafka Cluster */}
          <path d="M 315 155 C 340 155, 340 170, 365 170" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 315 155 C 340 155, 340 170, 365 170" fill="none" stroke="#5e6ad2" strokeWidth="2" strokeDasharray="5 10" className="flow-stream" />

          {/* NODE 1: Anycast Gateway */}
          <g transform="translate(10, 85)">
            <rect width="115" height="50" rx="6" fill="#141517" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <circle cx="20" cy="18" r="4" fill="#27ae60" />
            <text x="32" y="21" fill="#f7f8f8" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Anycast Edge</text>
            <text x="20" y="38" fill="#8a8f98" fontSize="9" fontFamily="var(--font-mono)">1.2ms • 100% OK</text>
          </g>

          {/* NODE 2: Envoy Mesh Router */}
          <g transform="translate(185, 40)">
            <rect width="130" height="50" rx="6" fill="#141517" stroke="rgba(242, 153, 74, 0.45)" strokeWidth="1" />
            <circle cx="20" cy="18" r="4" fill="#f2994a" />
            <text x="32" y="21" fill="#f7f8f8" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Envoy Ingress</text>
            <text x="20" y="38" fill="#ffaa55" fontSize="9" fontFamily="var(--font-mono)">504 High Saturation</text>
          </g>

          {/* NODE 3: Event Broker */}
          <g transform="translate(185, 130)">
            <rect width="130" height="50" rx="6" fill="#141517" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="20" cy="18" r="4" fill="#27ae60" />
            <text x="32" y="21" fill="#f7f8f8" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Internal Bus</text>
            <text x="20" y="38" fill="#8a8f98" fontSize="9" fontFamily="var(--font-mono)">gRPC • 0.8ms</text>
          </g>

          {/* NODE 4: Auth Service */}
          <g transform="translate(365, 15)">
            <rect width="145" height="48" rx="6" fill="#141517" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="18" cy="18" r="4" fill="#27ae60" />
            <text x="30" y="21" fill="#f7f8f8" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Auth & Session</text>
            <text x="18" y="36" fill="#8a8f98" fontSize="9" fontFamily="var(--font-mono)">v2.14 • 99.99%</text>
          </g>

          {/* NODE 5: Patroni PostgreSQL (Spike Point) */}
          <g transform="translate(365, 80)">
            <rect width="145" height="50" rx="6" fill="#1b1214" stroke="#eb5757" strokeWidth="1.2" />
            <circle cx="18" cy="18" r="5" fill="#eb5757" className="pulse-red" />
            <text x="30" y="21" fill="#ff8888" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Patroni Postgres</text>
            <text x="18" y="38" fill="#ff7878" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">CONN POOL 100%</text>
          </g>

          {/* NODE 6: Kafka Events */}
          <g transform="translate(365, 145)">
            <rect width="145" height="48" rx="6" fill="#141517" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="18" cy="18" r="4" fill="#27ae60" />
            <text x="30" y="21" fill="#f7f8f8" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Kafka Partition Bus</text>
            <text x="18" y="36" fill="#8a8f98" fontSize="9" fontFamily="var(--font-mono)">0 Lag • 24 Shards</text>
          </g>
        </svg>
      </div>

      {/* Mesh Footer Detail */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--color-border-primary)", fontSize: "11px", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>
        <div>Source: git commit #8f1b40c</div>
        <div style={{ color: "#ff8888" }}>Blast Radius: 4 Upstream Dependents</div>
      </div>
    </div>
  );
}

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
  ChevronRight
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
            {/* Left: Telemetry Radar Image */}
            <div style={{ position: "relative", minHeight: "260px", overflow: "hidden", borderRight: "1px solid var(--color-border-primary)" }}>
              <img 
                src="./images/telemetry_card.jpg" 
                alt="Vigil Real-time Telemetry Dashboard" 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.9 }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(15,16,17,0.9) 0%, transparent 60%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px"
              }}>
                <div style={{ fontSize: "11px", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                  Real-Time Edge Telemetry
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginTop: "2px" }}>
                  Ingress 504 Threshold Breach: 4,210ms P99
                </div>
              </div>
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

          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border-primary)" }}>
            <img
              src="./images/hero_infra.jpg"
              alt="Vigil Bare-Metal Cloud Infrastructure Node"
              style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
            />
          </div>
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

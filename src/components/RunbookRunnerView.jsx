import React, { useState } from "react";
import { 
  Terminal, 
  Check, 
  Copy, 
  Play, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from "lucide-react";

export function RunbookRunnerView({ 
  runbooks, 
  selectedRunbookId, 
  onSelectRunbook,
  onToggleStep,
  onResetRunbook
}) {
  const [copiedStepId, setCopiedStepId] = useState(null);

  const activeRunbook = runbooks.find(r => r.id === selectedRunbookId) || runbooks[0];

  const handleCopyCommand = (stepId, command) => {
    navigator.clipboard?.writeText(command);
    setCopiedStepId(stepId);
    setTimeout(() => setCopiedStepId(null), 2000);
  };

  const completedCount = activeRunbook.steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / activeRunbook.steps.length) * 100);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* Left List of Runbooks */}
      <div style={{
        width: "300px",
        background: "var(--color-bg-secondary)",
        borderRight: "1px solid var(--color-border-primary)",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexShrink: 0
      }}>
        <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", padding: "4px 8px 8px" }}>
          Operational Runbooks
        </div>

        {runbooks.map((rb) => {
          const isSelected = rb.id === activeRunbook.id;
          const rbCompleted = rb.steps.filter(s => s.completed).length;

          return (
            <div
              key={rb.id}
              onClick={() => onSelectRunbook(rb.id)}
              style={{
                padding: "12px",
                borderRadius: "var(--radius-md)",
                background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: isSelected ? "1px solid var(--color-border-secondary)" : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.12s ease"
              }}
            >
              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                {rb.title}
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{rb.serviceName}</span>
                <span>•</span>
                <span>{rb.estimatedMinutes}m est.</span>
              </div>
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{
                    width: `${Math.round((rbCompleted / rb.steps.length) * 100)}%`,
                    height: "100%",
                    background: "var(--color-brand-bg)"
                  }} />
                </div>
                <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>
                  {rbCompleted}/{rb.steps.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Detail Execution View */}
      <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "16px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{
                fontSize: "10.5px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-brand-text)",
                background: "var(--color-brand-bg)",
                padding: "2px 6px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600
              }}>
                Runbook
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                Target: {activeRunbook.serviceName}
              </span>
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              {activeRunbook.title}
            </h1>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "6px", maxWidth: "680px" }}>
              {activeRunbook.description}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => onResetRunbook(activeRunbook.id)}
              className="btn btn-secondary"
              style={{ fontSize: "11px", height: "28px" }}
              title="Reset all checkboxes in this runbook"
            >
              <RotateCcw size={12} />
              <span>Reset Steps</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          padding: "14px 18px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px" }}>
            <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
              Execution Progress
            </span>
            <span style={{ color: "var(--color-brand-text)", fontWeight: 600 }}>
              {completedCount} of {activeRunbook.steps.length} steps completed ({progressPercent}%)
            </span>
          </div>
          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: progressPercent === 100 ? "var(--color-green)" : "var(--color-brand-bg)",
              transition: "width 0.25s ease"
            }} />
          </div>
        </div>

        {/* Steps List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {activeRunbook.steps.map((step, idx) => (
            <div
              key={step.id}
              style={{
                padding: "16px 20px",
                background: step.completed ? "rgba(39, 174, 96, 0.04)" : "var(--color-bg-secondary)",
                border: step.completed ? "1px solid rgba(39, 174, 96, 0.25)" : "1px solid var(--color-border-primary)",
                borderRadius: "var(--radius-lg)",
                transition: "all 0.15s ease"
              }}
            >
              {/* Step Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: step.completed ? "var(--color-green)" : "rgba(255,255,255,0.08)",
                    color: step.completed ? "#fff" : "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600
                  }}>
                    {step.completed ? <Check size={12} /> : idx + 1}
                  </div>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: step.completed ? "var(--color-text-secondary)" : "var(--color-text-primary)",
                    textDecoration: step.completed ? "line-through" : "none"
                  }}>
                    {step.title}
                  </span>
                </div>

                {/* Step Complete Checkbox button */}
                <button
                  onClick={() => onToggleStep(activeRunbook.id, step.id)}
                  className="btn btn-ghost"
                  style={{
                    height: "26px",
                    padding: "2px 8px",
                    fontSize: "11px",
                    background: step.completed ? "rgba(39, 174, 96, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    color: step.completed ? "var(--color-green)" : "var(--color-text-secondary)",
                    border: "1px solid var(--color-border-primary)"
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>{step.completed ? "Completed" : "Mark Done"}</span>
                </button>
              </div>

              {/* Step Description */}
              <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", marginBottom: "12px", paddingLeft: "32px", lineHeight: 1.45 }}>
                {step.description}
              </div>

              {/* Terminal Command Snippet */}
              <div style={{ paddingLeft: "32px" }}>
                <div className="terminal-block">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingRight: "70px" }}>
                    <span style={{ color: "#79c0ff", userSelect: "none" }}>$</span>
                    <code>{step.command}</code>
                  </div>
                  <button
                    onClick={() => handleCopyCommand(step.id, step.command)}
                    className="btn btn-secondary"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "6px",
                      height: "24px",
                      padding: "2px 8px",
                      fontSize: "10.5px"
                    }}
                    title="Copy command to clipboard"
                  >
                    {copiedStepId === step.id ? (
                      <>
                        <Check size={11} color="var(--color-green)" />
                        <span style={{ color: "var(--color-green)" }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { 
  FileText, 
  Check, 
  Copy, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  CornerDownRight,
  User
} from "lucide-react";

export function PostMortemStudioView({ 
  postmortems, 
  onToggleActionItem,
  onAddActionItem
}) {
  const [selectedPmId, setSelectedPmId] = useState(postmortems[0]?.id || "PM-406");
  const [copiedMd, setCopiedMd] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState("");
  const [newActionAssignee, setNewActionAssignee] = useState("Elena Rostova");

  const activePm = postmortems.find(p => p.id === selectedPmId) || postmortems[0];

  const handleCopyMarkdown = () => {
    if (!activePm) return;
    const md = `# Retrospective: ${activePm.title} (${activePm.id})
**Incident Ref**: ${activePm.incidentId} | **Lead**: ${activePm.lead} | **Date**: ${activePm.date}

## Executive Impact Summary
${activePm.impactSummary}

## 5 Whys Root Cause Analysis
${activePm.fiveWhys.map((w, idx) => `${idx + 1}. **${w.q}**\n   ${w.a}`).join("\n\n")}

## Preventative Action Items
${activePm.actionItems.map(a => `- [${a.done ? "x" : " "}] ${a.title} (@${a.assignee}, Priority: ${a.priority})`).join("\n")}
`;
    navigator.clipboard?.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    onAddActionItem(activePm.id, {
      title: newActionTitle.trim(),
      assignee: newActionAssignee,
      priority: "Medium"
    });

    setNewActionTitle("");
  };

  if (!activePm) return null;

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* Left List of Retros */}
      <div style={{
        width: "280px",
        background: "var(--color-bg-secondary)",
        borderRight: "1px solid var(--color-border-primary)",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexShrink: 0
      }}>
        <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", padding: "4px 8px 8px" }}>
          Published Retrospectives
        </div>

        {postmortems.map((pm) => {
          const isSelected = pm.id === activePm.id;
          const openActions = pm.actionItems.filter(a => !a.done).length;

          return (
            <div
              key={pm.id}
              onClick={() => setSelectedPmId(pm.id)}
              style={{
                padding: "12px",
                borderRadius: "var(--radius-md)",
                background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: isSelected ? "1px solid var(--color-border-secondary)" : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.12s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                  {pm.id}
                </span>
                <span className="badge" style={{ fontSize: "10px", background: "rgba(39, 174, 96, 0.1)", color: "#27ae60" }}>
                  {pm.status}
                </span>
              </div>
              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                {pm.title}
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Lead: {pm.lead.split(" ")[0]}</span>
                <span>{openActions} pending items</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Detail Retrospective */}
      <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-brand-text)", background: "var(--color-brand-bg)", padding: "1px 6px", borderRadius: "3px" }}>
                {activePm.id}
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                Linked to {activePm.incidentId} • Published {activePm.date}
              </span>
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              {activePm.title}
            </h1>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              Investigation Lead: <strong style={{ color: "var(--color-text-primary)" }}>{activePm.lead}</strong>
            </div>
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="btn btn-secondary"
            style={{ fontSize: "11.5px", height: "28px" }}
            title="Copy retrospective markdown to clipboard"
          >
            {copiedMd ? <Check size={13} color="var(--color-green)" /> : <Copy size={13} />}
            <span>{copiedMd ? "Copied Markdown!" : "Export Markdown"}</span>
          </button>
        </div>

        {/* Executive Impact Summary */}
        <div style={{
          padding: "14px 18px",
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-lg)",
          marginBottom: "24px"
        }}>
          <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: "6px" }}>
            Executive Impact Summary
          </div>
          <div style={{ fontSize: "13px", color: "var(--color-text-primary)", lineHeight: 1.5 }}>
            {activePm.impactSummary}
          </div>
        </div>

        {/* 5 Whys Root Cause Chain */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: "14px" }}>
            5 Whys Root Cause Investigation
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {activePm.fiveWhys.map((why, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 16px",
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border-primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  marginLeft: `${idx * 12}px`
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-brand-text)", fontSize: "12px", fontWeight: 600 }}>
                  <CornerDownRight size={13} color="var(--color-accent)" />
                  <span>Why #{idx + 1}: {why.q}</span>
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", paddingLeft: "21px" }}>
                  {why.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preventative Action Items */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
            Preventative Action Items
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            {activePm.actionItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleActionItem(activePm.id, item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: item.done ? "rgba(39, 174, 96, 0.03)" : "var(--color-bg-secondary)",
                  border: item.done ? "1px solid rgba(39, 174, 96, 0.2)" : "1px solid var(--color-border-primary)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  transition: "background 0.1s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "4px",
                    border: item.done ? "1px solid var(--color-green)" : "1px solid var(--color-border-secondary)",
                    background: item.done ? "var(--color-green)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                  }}>
                    {item.done && <Check size={11} />}
                  </div>
                  <span style={{
                    fontSize: "12.5px",
                    color: item.done ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                    textDecoration: item.done ? "line-through" : "none"
                  }}>
                    {item.title}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                    @{item.assignee}
                  </span>
                  <span className="badge" style={{
                    fontSize: "10px",
                    background: item.priority === "High" ? "var(--color-red-dim)" : "rgba(255,255,255,0.06)",
                    color: item.priority === "High" ? "#ff7878" : "var(--color-text-secondary)"
                  }}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Action Item Form */}
          <form 
            onSubmit={handleAddAction}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border-primary)",
              borderRadius: "var(--radius-md)"
            }}
          >
            <label htmlFor="new-action-title" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              New preventative action item title
            </label>
            <input
              id="new-action-title"
              name="actionTitle"
              type="text"
              aria-label="New preventative action item title"
              value={newActionTitle}
              onChange={(e) => setNewActionTitle(e.target.value)}
              placeholder="Add new preventative action item..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "12.5px",
                color: "var(--color-text-primary)"
              }}
            />
            <label htmlFor="new-action-assignee" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Assignee
            </label>
            <select
              id="new-action-assignee"
              name="actionAssignee"
              aria-label="Action item assignee"
              value={newActionAssignee}
              onChange={(e) => setNewActionAssignee(e.target.value)}
              className="form-select"
              style={{ height: "24px", padding: "1px 6px", fontSize: "11px" }}
            >
              <option value="Elena Rostova">Elena Rostova</option>
              <option value="Devon Reed">Devon Reed</option>
              <option value="Klaus Weber">Klaus Weber</option>
              <option value="Marcus Vance">Marcus Vance</option>
            </select>
            <button
              type="submit"
              disabled={!newActionTitle.trim()}
              className="btn btn-primary"
              style={{ height: "24px", padding: "2px 8px", fontSize: "11px" }}
            >
              <Plus size={11} />
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

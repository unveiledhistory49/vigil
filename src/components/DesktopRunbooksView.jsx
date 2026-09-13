import React, { useState } from "react";
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  Search, 
  CheckCircle2, 
  Layers, 
  Server, 
  Clock, 
  Activity,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from "lucide-react";

export function DesktopRunbooksView({ 
  runbooks, 
  selectedRunbookId, 
  onSelectRunbook 
}) {
  const [activeRunbookId, setActiveRunbookId] = useState(selectedRunbookId || "rb-restart-lb");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [dryRunMode, setDryRunMode] = useState(false);
  const [targetNamespace, setTargetNamespace] = useState("ingress-system");

  const activeRunbook = runbooks.find(r => r.id === activeRunbookId) || runbooks[0];

  const filteredRunbooks = runbooks.filter(rb => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return rb.title.toLowerCase().includes(q) || rb.id.toLowerCase().includes(q) || rb.category?.toLowerCase().includes(q);
  });

  const handleToggleStep = (stepNum) => {
    setCompletedSteps(prev => 
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const handleCopy = (cmd, stepNum) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd);
      setCopiedCmd(stepNum);
      setTimeout(() => setCopiedCmd(null), 2000);
    }
  };

  const handleExecuteNext = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const allStepNums = activeRunbook.steps.map(s => s.step);
      const nextStep = allStepNums.find(n => !completedSteps.includes(n));
      if (nextStep) {
        setCompletedSteps(prev => [...prev, nextStep]);
      }
    }, 1200);
  };

  const handleResetRunbook = () => {
    setCompletedSteps([]);
  };

  return (
    <div className="desktop-runbooks-suite">
      {/* LEFT PANE: Runbook Catalog (340px) */}
      <aside className="runbooks-catalog-sidebar">
        <div className="catalog-sidebar-header">
          <div className="catalog-title-group">
            <Terminal size={16} color="#7187fb" />
            <h2 className="catalog-title">Runbook Automation</h2>
          </div>
          <span className="catalog-count-badge">{runbooks.length} Total</span>
        </div>

        {/* Catalog Search */}
        <div className="catalog-search-box">
          <Search size={13} className="catalog-search-icon" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search runbooks by name, tag..."
            className="catalog-search-input"
          />
        </div>

        {/* Runbook Items List */}
        <div className="catalog-items-scroll">
          {filteredRunbooks.map((rb) => {
            const isSelected = rb.id === activeRunbook.id;

            return (
              <div 
                key={rb.id}
                className={`catalog-item-card ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setActiveRunbookId(rb.id);
                  onSelectRunbook && onSelectRunbook(rb.id);
                  setCompletedSteps([1]);
                }}
              >
                <div className="item-top-row">
                  <span className="item-mono-id">{rb.id}</span>
                  <span className="item-category-tag">{rb.category || "Kubernetes"}</span>
                </div>

                <h3 className="item-card-title">{rb.title}</h3>
                <p className="item-card-desc">{rb.description}</p>

                <div className="item-bottom-meta">
                  <div className="item-meta-group">
                    <Clock size={11} />
                    <span>{rb.estimatedTime || "4m"}</span>
                  </div>
                  <div className="item-meta-group">
                    <Layers size={11} />
                    <span>{rb.steps?.length || 3} steps</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* RIGHT PANE: Interactive Runbook Execution Suite */}
      <main className="runbook-execution-pane">
        {/* Execution Header */}
        <header className="execution-pane-header">
          <div className="header-left-info">
            <div className="execution-id-strip">
              <span className="execution-id-tag">{activeRunbook.id}</span>
              <span className="execution-cat-pill">{activeRunbook.category || "Kubernetes"}</span>
            </div>
            <h1 className="execution-main-title">{activeRunbook.title}</h1>
            <p className="execution-main-desc">{activeRunbook.description}</p>
          </div>

          <div className="header-right-actions">
            <button 
              className="btn-reset-runbook"
              onClick={handleResetRunbook}
              title="Reset all completed steps"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>

            <button 
              className="btn-execute-next-step"
              onClick={handleExecuteNext}
              disabled={isExecuting || completedSteps.length === (activeRunbook.steps?.length || 3)}
            >
              {isExecuting ? (
                <>
                  <span className="pulse-white-mini" />
                  <span>Running in Cluster...</span>
                </>
              ) : completedSteps.length === (activeRunbook.steps?.length || 3) ? (
                <>
                  <CheckCircle2 size={14} color="#27ae60" />
                  <span>All Steps Executed</span>
                </>
              ) : (
                <>
                  <Play size={13} />
                  <span>Execute Next Step</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Execution Control Parameters Strip */}
        <div className="execution-controls-strip">
          <div className="control-param-group">
            <label className="param-label">Target Cluster</label>
            <span className="param-value-pill">acme-prod-eu-west-1</span>
          </div>

          <div className="control-param-group">
            <label className="param-label">Target Namespace</label>
            <select 
              value={targetNamespace} 
              onChange={(e) => setTargetNamespace(e.target.value)}
              className="param-select-dropdown"
            >
              <option value="ingress-system">ingress-system</option>
              <option value="default">default</option>
              <option value="production">production</option>
              <option value="data-mesh">data-mesh</option>
            </select>
          </div>

          <div className="control-param-group">
            <label className="param-label">Execution Mode</label>
            <label className="param-checkbox-wrap">
              <input 
                type="checkbox" 
                checked={dryRunMode}
                onChange={(e) => setDryRunMode(e.target.checked)}
              />
              <span>--dry-run=client</span>
            </label>
          </div>

          <div className="control-param-group ml-auto">
            <span className="steps-progress-counter">
              Progress: <strong>{completedSteps.length}</strong> of <strong>{activeRunbook.steps?.length || 3}</strong> steps verified
            </span>
          </div>
        </div>

        {/* Interactive Steps List */}
        <div className="execution-steps-stream">
          {activeRunbook.steps?.map((stepItem) => {
            const isCompleted = completedSteps.includes(stepItem.step);

            return (
              <div 
                key={stepItem.step}
                className={`execution-step-card ${isCompleted ? "step-done" : ""}`}
              >
                <div className="step-card-header">
                  <button 
                    type="button" 
                    className={`step-card-checkbox ${isCompleted ? "checked" : ""}`}
                    onClick={() => handleToggleStep(stepItem.step)}
                  >
                    {isCompleted && <Check size={13} color="#ffffff" />}
                  </button>

                  <div className="step-card-title-wrap">
                    <span className="step-number-tag">Step {stepItem.step}</span>
                    <h3 className="step-instruction-heading">{stepItem.instruction}</h3>
                  </div>

                  {isCompleted && (
                    <span className="step-badge-verified">
                      <CheckCircle2 size={12} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Command Snippet Block */}
                <div className="step-command-terminal-block">
                  <div className="terminal-top-bar">
                    <span className="terminal-lang-tag">BASH</span>
                    <button 
                      type="button" 
                      className="terminal-copy-action-btn"
                      onClick={() => handleCopy(stepItem.command, stepItem.step)}
                    >
                      {copiedCmd === stepItem.step ? (
                        <>
                          <Check size={12} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="terminal-code-body">
                    <code>{stepItem.command}</code>
                  </pre>
                </div>

                {/* Expected Output */}
                {stepItem.expectedOutput && (
                  <div className="step-expected-output-box">
                    <span className="expected-label">EXPECTED STDOUT VERIFICATION:</span>
                    <pre className="expected-code">
                      <code>{stepItem.expectedOutput}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

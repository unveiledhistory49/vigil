import React, { useState } from "react";
import { 
  ChevronLeft, 
  Search, 
  Copy, 
  Check, 
  ChevronRight,
  Terminal,
  RotateCcw,
  AlertTriangle,
  BookOpen
} from "lucide-react";

export function RunbookRunnerView({ 
  runbooks, 
  selectedRunbookId, 
  onSelectRunbook,
  onToggleStep,
  onResetRunbook,
  onBackToIncidents
}) {
  const [activeCategory, setActiveCategory] = useState("Networking");
  const [isExecuting, setIsExecuting] = useState(false); // false = catalog, true = runner
  const [copied, setCopied] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // 0-indexed, 1 is Step 2
  const [stepVerified, setStepVerified] = useState(false);
  const [reverting, setReverting] = useState(false);

  // Active runbook
  const activeRunbook = runbooks.find(r => r.id === selectedRunbookId) || runbooks[0];

  const handleOpenRunbook = (rbId) => {
    onSelectRunbook(rbId);
    setIsExecuting(true);
    setCurrentStepIndex(1); // Start on step 2 like the mockup
    setStepVerified(false);
  };

  const handleCopyCommand = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleVerify = () => {
    const nextState = !stepVerified;
    setStepVerified(nextState);
    if (nextState && activeRunbook.steps && activeRunbook.steps[currentStepIndex]) {
      onToggleStep(activeRunbook.id, activeRunbook.steps[currentStepIndex].id);
    }
  };

  const handleAbortRevert = () => {
    setReverting(true);
    setTimeout(() => {
      setReverting(false);
      alert(`Rollback sequence initiated for ${activeRunbook.title}. Reverting changes...`);
      setIsExecuting(false);
    }, 800);
  };

  const categories = ["Networking", "PostgreSQL", "Kafka", "Auth"];

  // Filter runbooks by category
  const filteredRunbooks = runbooks.filter(rb => 
    activeCategory === "All" || rb.category === activeCategory || (!rb.category && activeCategory === "Networking")
  );

  // If in Execution Mode (Screen 5)
  if (isExecuting) {
    const totalSteps = activeRunbook.totalSteps || activeRunbook.steps?.length || 4;
    const currentStepNum = currentStepIndex + 1;
    const currentStep = activeRunbook.steps?.[currentStepIndex] || activeRunbook.steps?.[0] || {
      command: `# Restart the load balancer service\nkubectl rollout restart deployment/nginx-ingress-controller -n ingress-nginx\n\n# Verify rollout status\nkubectl rollout status deployment/nginx-ingress-controller -n ingress-nginx`,
      expectedOutput: `deployment "nginx-ingress-controller" successfully rolled out\nWaiting for deployment "nginx-ingress-controller" to become ready...`
    };

    return (
      <div className="artboard-runbook-runner-view">
        {/* Runner Header */}
        <header className="runbook-runner-header">
          <button 
            className="runner-back-btn"
            onClick={() => setIsExecuting(false)}
            aria-label="Back to Runbooks catalog"
          >
            <ChevronLeft size={22} color="#f7f8f8" />
          </button>

          <h2 className="runner-header-title">{activeRunbook.title}</h2>

          <div className="runner-step-indicator">
            <div className="step-dots-row">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <span 
                  key={idx} 
                  className={`step-dot ${idx < currentStepNum ? "filled" : "empty"}`} 
                />
              ))}
            </div>
            <span className="step-count-label">Step {currentStepNum} of {totalSteps}</span>
          </div>
        </header>

        {/* Runner Body */}
        <div className="runner-body-scrollable">
          {/* Terminal Command Box */}
          <div className="terminal-code-box">
            <div className="terminal-code-header">
              <button 
                className="code-copy-btn"
                onClick={() => handleCopyCommand(currentStep.command)}
              >
                {copied ? <Check size={13} color="#27ae60" /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <pre className="terminal-code-content">
              <code>
                {currentStep.command.split("\n").map((line, lIdx) => {
                  if (line.startsWith("#")) {
                    return <span key={lIdx} className="syntax-comment">{line}{"\n"}</span>;
                  }
                  return (
                    <span key={lIdx} className="syntax-cmd-line">
                      {line.replace(/(kubectl|rollout|restart|status|deployment|curl)/g, (match) => {
                        return `<span class="syntax-keyword">${match}</span>`;
                      })}
                      {"\n"}
                    </span>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Expected Output Box */}
          <div className="expected-output-box">
            <div className="expected-output-title">Expected output</div>
            <pre className="expected-output-text">
              {currentStep.expectedOutput || `deployment "nginx-ingress-controller" successfully rolled out\nWaiting for deployment "nginx-ingress-controller" to become ready...`}
            </pre>
          </div>

          {/* Verification Checkbox */}
          <div 
            className="verification-checkbox-row"
            onClick={handleToggleVerify}
            role="checkbox"
            aria-checked={stepVerified}
            tabIndex={0}
          >
            <div className={`custom-checkbox-box ${stepVerified ? "checked" : ""}`}>
              {stepVerified && <Check size={14} color="#ffffff" strokeWidth={3} />}
            </div>
            <span className="verification-label">Mark step verified</span>
          </div>

          {/* Abort & Execute Revert Button */}
          <button 
            className="btn-abort-revert"
            onClick={handleAbortRevert}
            disabled={reverting}
          >
            {reverting ? "Executing Rollback..." : "Abort & Execute Revert"}
          </button>
        </div>
      </div>
    );
  }

  // Otherwise: Runbooks Catalog (Screen 4)
  return (
    <div className="artboard-runbooks-catalog-view">
      {/* Top Header */}
      <header className="catalog-top-header">
        <h1 className="catalog-main-title">Runbooks</h1>
        <button className="catalog-search-btn" aria-label="Search runbooks">
          <Search size={20} color="#b4bcd0" />
        </button>
      </header>

      {/* Filter Pills */}
      <div className="catalog-filter-pills-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`catalog-filter-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* High-density Runbook List Rows */}
      <div className="catalog-runbooks-list">
        {filteredRunbooks.map((rb) => (
          <div 
            key={rb.id}
            className="catalog-runbook-row"
            onClick={() => handleOpenRunbook(rb.id)}
            role="button"
            tabIndex={0}
          >
            <div className="runbook-row-left">
              <div className="runbook-title-line">
                <span className="runbook-row-title">{rb.title}</span>
                <span className="runbook-category-pill">{rb.category || "Networking"}</span>
              </div>
              <div className="runbook-meta-line">
                <span>{rb.duration || "~4m"}</span>
                <span className="meta-sep">•</span>
                <span>{rb.lastRun || "2d ago"}</span>
                <span className="meta-sep">•</span>
                <span>{rb.successRate || "98%"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { 
  INITIAL_INCIDENTS, 
  INITIAL_SERVICES, 
  INITIAL_RUNBOOKS, 
  INITIAL_POSTMORTEMS 
} from "./data/mockData.js";

import { LandingPage } from "./components/LandingPage.jsx";
import { IncidentListView } from "./components/IncidentListView.jsx";
import { IncidentBoardView } from "./components/IncidentBoardView.jsx";
import { IncidentDetailModal } from "./components/IncidentDetailModal.jsx";
import { RunbookRunnerView } from "./components/RunbookRunnerView.jsx";
import { OnboardingView } from "./components/OnboardingView.jsx";
import { ServiceCatalogView } from "./components/ServiceCatalogView.jsx";
import { PostMortemStudioView } from "./components/PostMortemStudioView.jsx";
import { StatusPagePreview } from "./components/StatusPagePreview.jsx";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { DeclareIncidentModal } from "./components/DeclareIncidentModal.jsx";

import { 
  AlertOctagon, 
  Layers, 
  BookOpen, 
  FileText, 
  MoreHorizontal, 
  Search, 
  ChevronDown,
  Smartphone,
  Monitor,
  ExternalLink,
  Shield,
  Building2
} from "lucide-react";

export function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState("app"); // "landing" | "app"
  const [currentTab, setCurrentTab] = useState("incidents"); // "incidents" | "services" | "runbooks" | "retros" | "onboarding" | "status"
  const [displayMode, setDisplayMode] = useState("list"); // "list" | "board"
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "assigned" | "p0" | "resolved"
  const [isMobileFrame, setIsMobileFrame] = useState(false); // Mobile frame toggle for desktop reviewers

  // Data State
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [runbooks, setRunbooks] = useState(INITIAL_RUNBOOKS);
  const [postmortems, setPostmortems] = useState(INITIAL_POSTMORTEMS);

  // Modals & Panels
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedRunbookId, setSelectedRunbookId] = useState("rb-restart-lb");
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const targetTag = e.target.tagName.toLowerCase();
      const isInput = targetTag === "input" || targetTag === "textarea" || targetTag === "select";

      // Cmd+K or Ctrl+K for command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }

      // 'c' or 'C' for declare incident
      if (!isInput && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        setIsDeclareModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered incidents
  const filteredIncidents = incidents.filter((inc) => {
    if (activeFilter === "assigned" && inc.commander?.name !== "Elena Rostova") return false;
    if (activeFilter === "p0" && inc.severity !== "P0") return false;
    if (activeFilter === "resolved" && inc.status !== "resolved") return false;
    return true;
  });

  // Action handlers
  const handleUpdateSeverity = (incidentId, newSev) => {
    setIncidents(prev => prev.map(inc => inc.id === incidentId ? { ...inc, severity: newSev } : inc));
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({ ...prev, severity: newSev }));
    }
  };

  const handleUpdateStatus = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(inc => inc.id === incidentId ? { ...inc, status: newStatus, updatedAt: "Just now" } : inc));
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({ ...prev, status: newStatus, updatedAt: "Just now" }));
    }
  };

  const handleAddTimelineEntry = (incidentId, entry) => {
    const newEntry = {
      id: `tl-${Date.now()}`,
      time: "Just now",
      ...entry
    };

    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          updatedAt: "Just now",
          timeline: [...(inc.timeline || []), newEntry]
        };
      }
      return inc;
    }));

    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({
        ...prev,
        updatedAt: "Just now",
        timeline: [...(prev.timeline || []), newEntry]
      }));
    }
  };

  const handleDeclareIncident = (newInc) => {
    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncident(newInc);
    setCurrentTab("incidents");
    setIsDeclareModalOpen(false);
  };

  const handleOpenRunbook = (rbId) => {
    setSelectedRunbookId(rbId);
    setSelectedIncident(null);
    setCurrentTab("runbooks");
  };

  const handleToggleStep = (runbookId, stepId) => {
    setRunbooks(prev => prev.map(rb => {
      if (rb.id === runbookId) {
        const updatedSteps = rb.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s);
        return { ...rb, steps: updatedSteps };
      }
      return rb;
    }));
  };

  const handleSimulateIncident = () => {
    setCurrentView("app");
    setCurrentTab("incidents");
    const p0 = incidents.find(i => i.id === "INC-409");
    if (p0) setSelectedIncident(p0);
  };

  // Jump helpers to verify each artboard screen instantly
  const jumpToScreen = (screenNum) => {
    switch (screenNum) {
      case 1:
        setCurrentView("landing");
        setSelectedIncident(null);
        break;
      case 2:
        setCurrentView("app");
        setCurrentTab("incidents");
        setSelectedIncident(null);
        setDisplayMode("list");
        break;
      case 3:
        setCurrentView("app");
        setCurrentTab("incidents");
        const p0 = incidents.find(i => i.id === "INC-409") || incidents[0];
        setSelectedIncident(p0);
        break;
      case 4:
        setCurrentView("app");
        setCurrentTab("runbooks");
        setSelectedIncident(null);
        break;
      case 5:
        setCurrentView("app");
        setCurrentTab("runbooks");
        setSelectedRunbookId("rb-restart-lb");
        setSelectedIncident(null);
        break;
      case 6:
        setCurrentView("app");
        setCurrentTab("onboarding");
        setSelectedIncident(null);
        break;
      default:
        break;
    }
  };

  const activeIncidentsCount = incidents.filter(i => i.status !== "resolved").length;

  return (
    <div className={`app-root-shell ${isMobileFrame ? "frame-mode" : "full-mode"}`}>
      {/* Top Engineering Review Bar: Quick jump between mockups & view modes */}
      <div className="artboard-director-toolbar">
        <div className="director-left">
          <span className="director-title">Vigil Artboards:</span>
          <div className="artboard-pills-selector">
            <button 
              className={`artboard-pill-btn ${currentView === "landing" ? "active" : ""}`}
              onClick={() => jumpToScreen(1)}
            >
              1: Landing
            </button>
            <button 
              className={`artboard-pill-btn ${currentView === "app" && currentTab === "incidents" && !selectedIncident ? "active" : ""}`}
              onClick={() => jumpToScreen(2)}
            >
              2: Incidents
            </button>
            <button 
              className={`artboard-pill-btn ${currentView === "app" && selectedIncident?.id === "INC-409" ? "active" : ""}`}
              onClick={() => jumpToScreen(3)}
            >
              3: Command Room
            </button>
            <button 
              className={`artboard-pill-btn ${currentView === "app" && currentTab === "runbooks" ? "active" : ""}`}
              onClick={() => jumpToScreen(4)}
            >
              4: Runbooks
            </button>
            <button 
              className={`artboard-pill-btn ${currentView === "app" && currentTab === "onboarding" ? "active" : ""}`}
              onClick={() => jumpToScreen(6)}
            >
              6: Onboarding
            </button>
          </div>
        </div>

        <div className="director-right">
          <button 
            className={`frame-toggle-btn ${isMobileFrame ? "active" : ""}`}
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title="Toggle 390px Mobile Artboard Mockup Frame"
          >
            {isMobileFrame ? <Monitor size={14} /> : <Smartphone size={14} />}
            <span>{isMobileFrame ? "Desktop View" : "Mobile Frame"}</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Frame */}
      <div className="device-viewport-container">
        {/* If Mobile Frame Mode is enabled, render the authentic 9:41 mobile status bar */}
        {isMobileFrame && (
          <div className="mobile-statusbar">
            <span className="statusbar-time">9:41</span>
            <div className="statusbar-icons">
              <svg width="16" height="11" viewBox="0 0 17 11" fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="0.5"/>
                <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
              </svg>
              <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 2.8C5.5 2.8 3.3 3.8 1.6 5.4L0 3.8C2.1 1.7 5 0.4 8 0.4s5.9 1.3 8 3.4l-1.6 1.6C12.7 3.8 10.5 2.8 8 2.8zm0 4.8c-1.4 0-2.6.6-3.5 1.5L8 12l3.5-2.9C10.6 8.2 9.4 7.6 8 7.6z"/>
              </svg>
              <svg width="22" height="11" viewBox="0 0 25 12" fill="currentColor">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" fill="none"/>
                <rect x="2" y="2" width="18" height="8" rx="2"/>
                <path d="M23 4v4c.8-.4 1.3-1.1 1.3-2s-.5-1.6-1.3-2z"/>
              </svg>
            </div>
          </div>
        )}

        {/* VIEW 1: LANDING PAGE (Screen 1) */}
        {currentView === "landing" ? (
          <LandingPage 
            onLaunchApp={() => {
              setCurrentView("app");
              setCurrentTab("incidents");
            }}
            onSimulateIncident={handleSimulateIncident}
            onOpenFeature={(feature) => {
              setCurrentView("app");
              if (feature === "runbooks") setCurrentTab("runbooks");
              else if (feature === "retros") setCurrentTab("retros");
              else if (feature === "onboarding") setCurrentTab("onboarding");
            }}
          />
        ) : (
          /* VIEW 2: APP CONSOLE */
          <div className="artboard-app-layout">
            {/* Top Workspace Bar (Header from Screen 2) */}
            <header className="app-workspace-header">
              <div 
                className="workspace-selector-pill"
                onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
                role="button"
                tabIndex={0}
              >
                <Building2 size={15} color="#8e95a5" />
                <span className="workspace-label">Acme SRE • EU-West</span>
                <ChevronDown size={14} color="#8e95a5" />
              </div>

              <div className="header-right-tools">
                <button 
                  className="icon-search-btn"
                  onClick={() => setIsCmdPaletteOpen(true)}
                  aria-label="Search or Command Palette (⌘K)"
                  title="Search incidents (⌘K)"
                >
                  <Search size={18} color="#b4bcd0" />
                </button>
              </div>

              {/* Workspace Switcher Modal */}
              {isWorkspaceMenuOpen && (
                <div className="workspace-dropdown-menu">
                  <div className="ws-menu-header">Select Cluster / Team</div>
                  <button className="ws-menu-item active" onClick={() => setIsWorkspaceMenuOpen(false)}>
                    <span>Acme SRE • EU-West (Frankfurt)</span>
                    <span className="badge badge-p0" style={{ fontSize: "10px" }}>1 ACTIVE</span>
                  </button>
                  <button className="ws-menu-item" onClick={() => setIsWorkspaceMenuOpen(false)}>
                    <span>Acme SRE • US-East (N. Virginia)</span>
                    <span className="badge badge-status-resolved" style={{ fontSize: "10px" }}>HEALTHY</span>
                  </button>
                  <button className="ws-menu-item" onClick={() => setIsWorkspaceMenuOpen(false)}>
                    <span>Staging / Canary Mesh</span>
                    <span className="badge badge-status-monitoring" style={{ fontSize: "10px" }}>TEST</span>
                  </button>
                </div>
              )}
            </header>

            {/* Active Content Body */}
            <div className="app-workspace-body">
              {/* TAB: INCIDENTS */}
              {currentTab === "incidents" && (
                displayMode === "list" ? (
                  <IncidentListView 
                    incidents={filteredIncidents}
                    onSelectIncident={(inc) => setSelectedIncident(inc)}
                    selectedIncidentId={selectedIncident?.id}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    displayMode={displayMode}
                    setDisplayMode={setDisplayMode}
                    onDeclareIncident={() => setIsDeclareModalOpen(true)}
                    onSelectOnCall={() => {
                      const inc = incidents.find(i => i.commander?.name === "Elena Rostova") || incidents[0];
                      setSelectedIncident(inc);
                    }}
                  />
                ) : (
                  <IncidentBoardView 
                    incidents={filteredIncidents}
                    onSelectIncident={(inc) => setSelectedIncident(inc)}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )
              )}

              {/* TAB: SERVICES */}
              {currentTab === "services" && (
                <ServiceCatalogView 
                  services={services}
                  onSelectService={() => {}}
                />
              )}

              {/* TAB: RUNBOOKS (Screen 4 & 5) */}
              {currentTab === "runbooks" && (
                <RunbookRunnerView 
                  runbooks={runbooks}
                  selectedRunbookId={selectedRunbookId}
                  onSelectRunbook={(id) => setSelectedRunbookId(id)}
                  onToggleStep={handleToggleStep}
                  onResetRunbook={() => {}}
                  onBackToIncidents={() => setCurrentTab("incidents")}
                />
              )}

              {/* TAB: POST-MORTEMS */}
              {currentTab === "retros" && (
                <PostMortemStudioView 
                  postmortems={postmortems}
                />
              )}

              {/* TAB: ONBOARDING (Screen 6) */}
              {currentTab === "onboarding" && (
                <OnboardingView 
                  onBack={() => setCurrentTab("incidents")}
                  onComplete={() => setCurrentTab("incidents")}
                />
              )}

              {/* TAB: STATUS PAGE */}
              {currentTab === "status" && (
                <StatusPagePreview 
                  services={services}
                  incidents={incidents}
                />
              )}
            </div>

            {/* Bottom 5-Tab Navigation Bar (Screen 2) */}
            <nav className="artboard-bottom-navbar">
              <button 
                className={`nav-tab-item ${currentTab === "incidents" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTab("incidents");
                  setSelectedIncident(null);
                }}
              >
                <div className="tab-icon-wrap">
                  <AlertOctagon size={20} />
                  {activeIncidentsCount > 0 && (
                    <span className="nav-tab-badge">{activeIncidentsCount}</span>
                  )}
                </div>
                <span className="tab-text">Incidents</span>
              </button>

              <button 
                className={`nav-tab-item ${currentTab === "services" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTab("services");
                  setSelectedIncident(null);
                }}
              >
                <div className="tab-icon-wrap">
                  <Layers size={20} />
                </div>
                <span className="tab-text">Services</span>
              </button>

              <button 
                className={`nav-tab-item ${currentTab === "runbooks" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTab("runbooks");
                  setSelectedIncident(null);
                }}
              >
                <div className="tab-icon-wrap">
                  <BookOpen size={20} />
                </div>
                <span className="tab-text">Runbooks</span>
              </button>

              <button 
                className={`nav-tab-item ${currentTab === "retros" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTab("retros");
                  setSelectedIncident(null);
                }}
              >
                <div className="tab-icon-wrap">
                  <FileText size={20} />
                </div>
                <span className="tab-text">Post-Mortems</span>
              </button>

              <button 
                className={`nav-tab-item ${currentTab === "more" || isMoreSheetOpen || currentTab === "onboarding" || currentTab === "status" ? "active" : ""}`}
                onClick={() => setIsMoreSheetOpen(!isMoreSheetOpen)}
              >
                <div className="tab-icon-wrap">
                  <MoreHorizontal size={20} />
                </div>
                <span className="tab-text">More</span>
              </button>
            </nav>

            {/* "More" Sheet Modal */}
            {isMoreSheetOpen && (
              <div className="more-menu-sheet-backdrop" onClick={() => setIsMoreSheetOpen(false)}>
                <div className="more-menu-sheet-dialog" onClick={(e) => e.stopPropagation()}>
                  <div className="more-sheet-header">
                    <span>Vigil Navigation & Tools</span>
                  </div>
                  <div className="more-sheet-items">
                    <button 
                      className="more-sheet-row"
                      onClick={() => {
                        setIsMoreSheetOpen(false);
                        setCurrentTab("onboarding");
                        setSelectedIncident(null);
                      }}
                    >
                      <span>Onboarding Setup (Screen 6)</span>
                      <span className="pill-status">3-Step</span>
                    </button>
                    <button 
                      className="more-sheet-row"
                      onClick={() => {
                        setIsMoreSheetOpen(false);
                        setCurrentTab("status");
                        setSelectedIncident(null);
                      }}
                    >
                      <span>Public Status Dashboard</span>
                      <span className="pill-status">Live</span>
                    </button>
                    <button 
                      className="more-sheet-row"
                      onClick={() => {
                        setIsMoreSheetOpen(false);
                        setCurrentView("landing");
                      }}
                    >
                      <span>Marketing Landing (Screen 1)</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INCIDENT COMMAND ROOM OVERLAY (Screen 3) */}
            {selectedIncident && (
              <IncidentDetailModal 
                incident={selectedIncident}
                onClose={() => setSelectedIncident(null)}
                onUpdateSeverity={handleUpdateSeverity}
                onUpdateStatus={handleUpdateStatus}
                onAddTimelineEntry={handleAddTimelineEntry}
                onOpenRunbook={handleOpenRunbook}
              />
            )}
          </div>
        )}

        {/* If Mobile Frame Mode, render the bottom home bar indicator */}
        {isMobileFrame && <div className="mobile-home-indicator" />}
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette 
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        onNavigate={(tab) => {
          setCurrentView("app");
          setCurrentTab(tab);
          setSelectedIncident(null);
        }}
        onSelectIncident={(inc) => {
          setCurrentView("app");
          setSelectedIncident(inc);
        }}
        onSelectRunbook={handleOpenRunbook}
        incidents={incidents}
        services={services}
        runbooks={runbooks}
      />

      {/* Declare Incident Modal (C) */}
      <DeclareIncidentModal 
        isOpen={isDeclareModalOpen}
        onClose={() => setIsDeclareModalOpen(false)}
        onDeclare={handleDeclareIncident}
        services={services}
      />
    </div>
  );
}

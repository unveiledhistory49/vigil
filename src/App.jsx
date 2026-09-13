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
import { DesktopLandingView } from "./components/DesktopLandingView.jsx";
import { DesktopWarRoom } from "./components/DesktopWarRoom.jsx";
import { DesktopIncidentsView } from "./components/DesktopIncidentsView.jsx";
import { DesktopRunbooksView } from "./components/DesktopRunbooksView.jsx";
import { DesktopOnboardingView } from "./components/DesktopOnboardingView.jsx";
import { TopNav } from "./components/TopNav.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
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
  ExternalLink,
  Shield,
  Building2,
  Monitor,
  Smartphone
} from "lucide-react";

export function App() {
  // Viewport mode state: "desktop" | "mobile"
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? "desktop" : "mobile";
    }
    return "desktop";
  });
  const [userToggledMode, setUserToggledMode] = useState(false);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (!userToggledMode && typeof window !== "undefined") {
        setViewMode(window.innerWidth >= 1024 ? "desktop" : "mobile");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userToggledMode]);

  const toggleViewMode = () => {
    setUserToggledMode(true);
    setViewMode(prev => prev === "desktop" ? "mobile" : "desktop");
  };

  // Navigation & View State
  const [currentView, setCurrentView] = useState("landing"); // "landing" | "app"
  const [currentTab, setCurrentTab] = useState("incidents"); // "incidents" | "services" | "runbooks" | "retros" | "onboarding" | "status"
  const [displayMode, setDisplayMode] = useState("list"); // "list" | "board"
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "assigned" | "p0" | "resolved"

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

  const activeIncidentsCount = incidents.filter(i => i.status !== "resolved").length;
  const degradedServicesCount = services.filter(s => s.status !== "healthy").length;

  // DEDICATED DESKTOP VIEWPORT
  if (viewMode === "desktop") {
    return (
      <div className="app-root-desktop">
        {currentView === "landing" ? (
          <DesktopLandingView 
            onLaunchApp={() => {
              setCurrentView("app");
              setCurrentTab("incidents");
              setSelectedIncident(null);
            }}
            onSimulateIncident={handleSimulateIncident}
            onOpenIncident={(incId) => {
              setCurrentView("app");
              setCurrentTab("incidents");
              const found = incidents.find(i => i.id === incId);
              if (found) setSelectedIncident(found);
            }}
            onOpenFeature={(feature) => {
              setCurrentView("app");
              if (feature === "runbooks") setCurrentTab("runbooks");
              else if (feature === "services") setCurrentTab("services");
              else if (feature === "retros") setCurrentTab("retros");
              else if (feature === "onboarding") setCurrentTab("onboarding");
              setSelectedIncident(null);
            }}
            onSwitchToMobile={toggleViewMode}
          />
        ) : (
          <div className="app-layout desktop-shell">
            <TopNav 
              currentView={currentView}
              setCurrentView={setCurrentView}
              onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
              onOpenDeclareModal={() => setIsDeclareModalOpen(true)}
              activeIncidentsCount={activeIncidentsCount}
              onSelectActiveIncident={() => {
                setCurrentTab("incidents");
                const p0 = incidents.find(i => i.id === "INC-409");
                if (p0) setSelectedIncident(p0);
              }}
              onToggleViewMode={toggleViewMode}
            />

            <div className="app-body">
              <Sidebar 
                currentTab={currentTab}
                setCurrentTab={(tab) => {
                  setCurrentTab(tab);
                  setSelectedIncident(null);
                }}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                activeIncidentsCount={activeIncidentsCount}
                degradedServicesCount={degradedServicesCount}
                onToggleViewMode={toggleViewMode}
              />

              <main className="app-main">
                {selectedIncident ? (
                  <DesktopWarRoom 
                    incident={selectedIncident}
                    onClose={() => setSelectedIncident(null)}
                    onUpdateSeverity={handleUpdateSeverity}
                    onUpdateStatus={handleUpdateStatus}
                    onAddTimelineEntry={handleAddTimelineEntry}
                    onOpenRunbook={handleOpenRunbook}
                  />
                ) : (
                  <>
                    {currentTab === "incidents" && (
                      <DesktopIncidentsView 
                        incidents={incidents}
                        onSelectIncident={(inc) => setSelectedIncident(inc)}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        displayMode={displayMode}
                        setDisplayMode={setDisplayMode}
                        onDeclareIncident={() => setIsDeclareModalOpen(true)}
                        onOpenRunbook={handleOpenRunbook}
                      />
                    )}

                    {currentTab === "services" && (
                      <ServiceCatalogView 
                        services={services}
                        onDeclareForService={() => setIsDeclareModalOpen(true)}
                      />
                    )}

                    {currentTab === "runbooks" && (
                      <DesktopRunbooksView 
                        runbooks={runbooks}
                        selectedRunbookId={selectedRunbookId}
                        onSelectRunbook={(id) => setSelectedRunbookId(id)}
                      />
                    )}

                    {currentTab === "retros" && (
                      <PostMortemStudioView 
                        postmortems={postmortems}
                        onToggleActionItem={handleToggleActionItem}
                        onAddActionItem={handleAddActionItem}
                      />
                    )}

                    {currentTab === "onboarding" && (
                      <DesktopOnboardingView 
                        onComplete={() => {
                          setCurrentTab("incidents");
                          setSelectedIncident(null);
                        }}
                      />
                    )}

                    {currentTab === "status" && (
                      <StatusPagePreview 
                        incidents={incidents}
                        services={services}
                        onBack={() => setCurrentTab("incidents")}
                      />
                    )}
                  </>
                )}
              </main>
            </div>
          </div>
        )}

        {/* Global Command Palette (⌘K) */}
        <CommandPalette 
          isOpen={isCmdPaletteOpen}
          onClose={() => setIsCmdPaletteOpen(false)}
          onNavigate={(tab) => {
            setCurrentView("app");
            setCurrentTab(tab);
            setSelectedIncident(null);
          }}
          onDeclareIncident={() => {
            setIsCmdPaletteOpen(false);
            setIsDeclareModalOpen(true);
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
          onDeclareIncident={handleDeclareIncident}
          services={services}
        />
      </div>
    );
  }

  // DEDICATED MOBILE VIEWPORT (Mobile Artboards 1 to 6)
  return (
    <div className="app-root-shell">
      {/* Main Viewport Container */}
      <div className="device-viewport-container">
        {/* VIEW 1: LANDING PAGE (Screen 1) */}
        {currentView === "landing" ? (
          <LandingPage 
            onLaunchApp={() => {
              setCurrentView("app");
              setCurrentTab("incidents");
              setSelectedIncident(null);
            }}
            onOpenIncident={(incId) => {
              setCurrentView("app");
              setCurrentTab("incidents");
              const found = incidents.find(i => i.id === incId);
              if (found) setSelectedIncident(found);
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
                      <span>Onboarding & Integrations</span>
                      <span className="pill-status">Setup</span>
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
                      <span>Product Overview</span>
                      <ExternalLink size={14} />
                    </button>
                    <button 
                      className="more-sheet-row"
                      onClick={() => {
                        setIsMoreSheetOpen(false);
                        toggleViewMode();
                      }}
                    >
                      <span>Switch to Desktop View</span>
                      <Monitor size={14} />
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
        onDeclareIncident={() => {
          setIsCmdPaletteOpen(false);
          setIsDeclareModalOpen(true);
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
        onDeclareIncident={handleDeclareIncident}
        services={services}
      />
    </div>
  );
}

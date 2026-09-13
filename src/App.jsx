import React, { useState, useEffect } from "react";
import { 
  INITIAL_INCIDENTS, 
  INITIAL_SERVICES, 
  INITIAL_RUNBOOKS, 
  INITIAL_POSTMORTEMS 
} from "./data/mockData.js";

import { TopNav } from "./components/TopNav.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { IncidentListView } from "./components/IncidentListView.jsx";
import { IncidentBoardView } from "./components/IncidentBoardView.jsx";
import { IncidentDetailModal } from "./components/IncidentDetailModal.jsx";
import { DeclareIncidentModal } from "./components/DeclareIncidentModal.jsx";
import { ServiceCatalogView } from "./components/ServiceCatalogView.jsx";
import { RunbookRunnerView } from "./components/RunbookRunnerView.jsx";
import { PostMortemStudioView } from "./components/PostMortemStudioView.jsx";
import { StatusPagePreview } from "./components/StatusPagePreview.jsx";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { LandingPage } from "./components/LandingPage.jsx";

import { 
  List, 
  Kanban, 
  Filter, 
  Plus, 
  AlertOctagon,
  CheckCircle2,
  Server,
  Terminal,
  FileText,
  Radio,
  Layers
} from "lucide-react";

export function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState("app"); // "app" | "landing"
  const [currentTab, setCurrentTab] = useState("incidents"); // "incidents" | "services" | "runbooks" | "retros" | "status"
  const [displayMode, setDisplayMode] = useState("list"); // "list" | "board"
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "active" | "p0" | "resolved"
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Data State
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [runbooks, setRunbooks] = useState(INITIAL_RUNBOOKS);
  const [postmortems, setPostmortems] = useState(INITIAL_POSTMORTEMS);

  // Modal State
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedRunbookId, setSelectedRunbookId] = useState("rb-envoy-drain");
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input or textarea
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

  // Filter incidents logic
  const filteredIncidents = incidents.filter((inc) => {
    // Presets from sidebar
    if (activeFilter === "active" && inc.status === "resolved") return false;
    if (activeFilter === "p0" && inc.severity !== "P0") return false;
    if (activeFilter === "resolved" && inc.status !== "resolved") return false;

    // Severity pill
    if (severityFilter !== "ALL" && inc.severity !== severityFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = inc.title.toLowerCase().includes(q);
      const matchesId = inc.id.toLowerCase().includes(q);
      const matchesService = inc.serviceName.toLowerCase().includes(q);
      const matchesCommander = inc.commander.name.toLowerCase().includes(q);
      if (!matchesTitle && !matchesId && !matchesService && !matchesCommander) return false;
    }

    return true;
  });

  // Action Handlers
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
          timeline: [...inc.timeline, newEntry]
        };
      }
      return inc;
    }));

    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({
        ...prev,
        updatedAt: "Just now",
        timeline: [...prev.timeline, newEntry]
      }));
    }
  };

  const handleDeclareIncident = (newInc) => {
    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncident(newInc);
    setCurrentTab("incidents");
  };

  const handleToggleRunbookStep = (runbookId, stepId) => {
    setRunbooks(prev => prev.map(rb => {
      if (rb.id === runbookId) {
        return {
          ...rb,
          steps: rb.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
        };
      }
      return rb;
    }));
  };

  const handleResetRunbook = (runbookId) => {
    setRunbooks(prev => prev.map(rb => {
      if (rb.id === runbookId) {
        return {
          ...rb,
          steps: rb.steps.map(s => ({ ...s, completed: false }))
        };
      }
      return rb;
    }));
  };

  const handleToggleActionItem = (pmId, actionId) => {
    setPostmortems(prev => prev.map(pm => {
      if (pm.id === pmId) {
        return {
          ...pm,
          actionItems: pm.actionItems.map(a => a.id === actionId ? { ...a, done: !a.done } : a)
        };
      }
      return pm;
    }));
  };

  const handleAddActionItem = (pmId, action) => {
    setPostmortems(prev => prev.map(pm => {
      if (pm.id === pmId) {
        return {
          ...pm,
          actionItems: [
            ...pm.actionItems,
            { id: `ai-${Date.now()}`, done: false, ...action }
          ]
        };
      }
      return pm;
    }));
  };

  // Simulate a live P0 incident trigger from the landing page
  const handleSimulateIncident = () => {
    const simulated = {
      id: "INC-410",
      title: "Frankfurt Ingress TLS Certificate Expiry Alert",
      severity: "P0",
      status: "investigating",
      serviceId: "svc-cdn",
      serviceName: "CDN Edge Workers & Caching",
      commander: {
        name: "Elena Rostova",
        role: "Principal SRE",
        initials: "ER"
      },
      createdAt: "Just now",
      updatedAt: "Just now",
      impact: "Automated ACME challenge renewal stalled. Intermediate cert authority unreachable.",
      slackChannel: "#inc-410-tls-outage",
      warRoomUrl: "https://meet.vigil.internal/war-room-410",
      runbookId: "rb-envoy-drain",
      timeline: [
        {
          id: "tl-sim-1",
          time: "Just now",
          author: "Let's Encrypt Bot",
          type: "system",
          message: "Certificate validity crossed critical threshold: 14 minutes remaining."
        },
        {
          id: "tl-sim-2",
          time: "Just now",
          author: "Elena Rostova (Commander)",
          type: "user",
          message: "P0 declared. Forcing alternate OCSP stapling route and initiating fallback CA rotation."
        }
      ]
    };

    setIncidents(prev => [simulated, ...prev]);
    setCurrentView("app");
    setCurrentTab("incidents");
    setSelectedIncident(simulated);
  };

  const activeIncidentsCount = incidents.filter(i => i.status !== "resolved").length;
  const degradedServicesCount = services.filter(s => s.status !== "healthy").length;

  // Render Landing Page View
  if (currentView === "landing") {
    return (
      <LandingPage 
        onLaunchApp={() => setCurrentView("app")}
        onSimulateIncident={handleSimulateIncident}
      />
    );
  }

  // Render Application View
  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <TopNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
        onOpenDeclareModal={() => setIsDeclareModalOpen(true)}
        activeIncidentsCount={activeIncidentsCount}
        onSelectActiveIncident={() => {
          const p0 = incidents.find(i => i.severity === "P0" && i.status !== "resolved");
          if (p0) {
            setSelectedIncident(p0);
            setCurrentTab("incidents");
          }
        }}
      />

      {/* Main App Body */}
      <div className="app-body">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeIncidentsCount={activeIncidentsCount}
          degradedServicesCount={degradedServicesCount}
        />

        {/* Content Area */}
        <main className="app-main">
          {/* Sub-Header / View Header */}
          <div className="view-header">
            <div className="view-title">
              {currentTab === "incidents" && (
                <>
                  <AlertOctagon size={16} color="var(--color-brand-text)" />
                  <span>Incidents Command Matrix</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 400 }}>
                    {filteredIncidents.length} visible
                  </span>
                </>
              )}
              {currentTab === "services" && (
                <>
                  <Server size={16} color="var(--color-brand-text)" />
                  <span>Service Reliability & SLO Catalog</span>
                </>
              )}
              {currentTab === "runbooks" && (
                <>
                  <Terminal size={16} color="var(--color-brand-text)" />
                  <span>Operational Runbook Executor</span>
                </>
              )}
              {currentTab === "retros" && (
                <>
                  <FileText size={16} color="var(--color-brand-text)" />
                  <span>Post-Mortem Studio</span>
                </>
              )}
              {currentTab === "status" && (
                <>
                  <Radio size={16} color="var(--color-brand-text)" />
                  <span>Public Customer Status Page Preview</span>
                </>
              )}
            </div>

            {/* View controls on top right */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {currentTab === "incidents" && (
                <div style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.05)",
                  padding: "2px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-primary)"
                }}>
                  <button
                    onClick={() => setDisplayMode("list")}
                    className="btn btn-ghost"
                    style={{
                      height: "24px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      background: displayMode === "list" ? "rgba(255,255,255,0.12)" : "transparent",
                      color: displayMode === "list" ? "var(--color-text-primary)" : "var(--color-text-tertiary)"
                    }}
                    title="List View"
                  >
                    <List size={13} />
                    <span className="hide-on-mobile">List</span>
                  </button>
                  <button
                    onClick={() => setDisplayMode("board")}
                    className="btn btn-ghost"
                    style={{
                      height: "24px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      background: displayMode === "board" ? "rgba(255,255,255,0.12)" : "transparent",
                      color: displayMode === "board" ? "var(--color-text-primary)" : "var(--color-text-tertiary)"
                    }}
                    title="Kanban Board View"
                  >
                    <Kanban size={13} />
                    <span className="hide-on-mobile">Board</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => setIsDeclareModalOpen(true)}
                className="btn btn-primary"
                style={{ height: "28px", fontSize: "11px" }}
              >
                <Plus size={12} />
                <span>Declare</span>
              </button>
            </div>
          </div>

          {/* Tab View Content */}
          {currentTab === "incidents" && (
            displayMode === "list" ? (
              <IncidentListView
                incidents={filteredIncidents}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
                selectedIncidentId={selectedIncident?.id}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                severityFilter={severityFilter}
                setSeverityFilter={setSeverityFilter}
              />
            ) : (
              <IncidentBoardView
                incidents={filteredIncidents}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
                onUpdateStatus={handleUpdateStatus}
              />
            )
          )}

          {currentTab === "services" && (
            <ServiceCatalogView
              services={services}
              onDeclareForService={(svc) => {
                setIsDeclareModalOpen(true);
              }}
            />
          )}

          {currentTab === "runbooks" && (
            <RunbookRunnerView
              runbooks={runbooks}
              selectedRunbookId={selectedRunbookId}
              onSelectRunbook={(id) => setSelectedRunbookId(id)}
              onToggleStep={handleToggleRunbookStep}
              onResetRunbook={handleResetRunbook}
            />
          )}

          {currentTab === "retros" && (
            <PostMortemStudioView
              postmortems={postmortems}
              onToggleActionItem={handleToggleActionItem}
              onAddActionItem={handleAddActionItem}
            />
          )}

          {currentTab === "status" && (
            <StatusPagePreview
              incidents={incidents}
              services={services}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          onClick={() => setCurrentTab("incidents")}
          className={`mobile-tab-btn ${currentTab === "incidents" ? "active" : ""}`}
        >
          <AlertOctagon size={16} />
          <span>Incidents</span>
        </button>
        <button
          onClick={() => setCurrentTab("services")}
          className={`mobile-tab-btn ${currentTab === "services" ? "active" : ""}`}
        >
          <Server size={16} />
          <span>Services</span>
        </button>
        <button
          onClick={() => setCurrentTab("runbooks")}
          className={`mobile-tab-btn ${currentTab === "runbooks" ? "active" : ""}`}
        >
          <Terminal size={16} />
          <span>Runbooks</span>
        </button>
        <button
          onClick={() => setCurrentTab("retros")}
          className={`mobile-tab-btn ${currentTab === "retros" ? "active" : ""}`}
        >
          <FileText size={16} />
          <span>Retros</span>
        </button>
        <button
          onClick={() => setCurrentTab("status")}
          className={`mobile-tab-btn ${currentTab === "status" ? "active" : ""}`}
        >
          <Radio size={16} />
          <span>Status</span>
        </button>
      </nav>

      {/* Incident Command Room Detail Modal */}
      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onUpdateSeverity={handleUpdateSeverity}
          onUpdateStatus={handleUpdateStatus}
          onAddTimelineEntry={handleAddTimelineEntry}
          onOpenRunbook={(rbId) => {
            setSelectedRunbookId(rbId);
            setCurrentTab("runbooks");
          }}
        />
      )}

      {/* Declare Incident Modal */}
      <DeclareIncidentModal
        isOpen={isDeclareModalOpen}
        onClose={() => setIsDeclareModalOpen(false)}
        services={services}
        onDeclareIncident={handleDeclareIncident}
      />

      {/* Global Cmd+K Command Palette */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        onNavigate={(tab, detailId) => {
          if (tab === "landing") {
            setCurrentView("landing");
          } else {
            setCurrentView("app");
            setCurrentTab(tab);
            if (tab === "runbooks" && detailId) {
              setSelectedRunbookId(detailId);
            }
          }
        }}
        onDeclareIncident={() => setIsDeclareModalOpen(true)}
        onSelectIncident={(inc) => setSelectedIncident(inc)}
        incidents={incidents}
        runbooks={runbooks}
      />
    </div>
  );
}

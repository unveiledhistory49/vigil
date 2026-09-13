import React from "react";
import { 
  Shield, 
  Search, 
  Plus, 
  Radio, 
  ExternalLink,
  ChevronDown,
  Smartphone
} from "lucide-react";

export function TopNav({ 
  currentView, 
  setCurrentView, 
  onOpenCmdPalette, 
  onOpenDeclareModal, 
  activeIncidentsCount,
  onSelectActiveIncident,
  onToggleViewMode 
}) {
  return (
    <header className="app-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView("landing")}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            cursor: "pointer",
            padding: "4px 6px",
            borderRadius: "var(--radius-md)",
            transition: "background 0.15s ease"
          }}
          title="Go to Landing Page"
        >
          <div style={{
            width: "22px",
            height: "22px",
            borderRadius: "5px",
            background: "linear-gradient(135deg, #5e6ad2 0%, #2f3475 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 0 10px rgba(94,106,210,0.5)"
          }}>
            <Shield size={13} color="#ffffff" />
          </div>
          <span style={{ 
            fontWeight: 600, 
            letterSpacing: "-0.02em", 
            fontSize: "14px",
            color: "var(--color-text-primary)" 
          }}>
            Vigil
          </span>
        </div>

        {/* Active Incident Alert Banner / Ticker */}
        {activeIncidentsCount > 0 && (
          <button 
            className="btn btn-ghost hide-on-tiny"
            onClick={onSelectActiveIncident}
            style={{
              height: "26px",
              padding: "2px 8px",
              fontSize: "11px",
              background: "rgba(235, 87, 87, 0.1)",
              border: "1px solid rgba(235, 87, 87, 0.3)",
              color: "#ff7878",
              whiteSpace: "nowrap"
            }}
            title="Click to view critical active incident"
          >
            <span className="pulse-red" style={{ 
              width: "6px", 
              height: "6px", 
              borderRadius: "50%", 
              background: "var(--color-red)",
              display: "inline-block" 
            }} />
            <span className="hide-on-mobile">{activeIncidentsCount} active: EU Gateway</span>
            <span className="show-on-mobile">{activeIncidentsCount} active</span>
          </button>
        )}
      </div>

      {/* Center Search / Cmd+K Button */}
      <div className="search-bar-wrapper" style={{ flex: 1, maxWidth: "380px", margin: "0 12px" }}>
        <button 
          onClick={onOpenCmdPalette}
          aria-label="Open command palette"
          style={{
            width: "100%",
            height: "28px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--color-border-primary)",
            borderRadius: "var(--radius-md)",
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--color-text-tertiary)",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.15s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
            <Search size={13} style={{ flexShrink: 0 }} />
            <span className="hide-on-mobile" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search incidents, services, runbooks...
            </span>
            <span className="show-on-mobile">Search...</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
            <kbd>⌘K</kbd>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {/* Toggle Mode: App vs Landing */}
        <div className="hide-on-mobile" style={{
          display: "flex",
          background: "rgba(255,255,255,0.05)",
          padding: "2px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border-primary)"
        }}>
          <button
            onClick={() => setCurrentView("app")}
            className="btn btn-ghost"
            style={{
              height: "24px",
              padding: "2px 8px",
              fontSize: "11px",
              background: currentView === "app" ? "var(--color-brand-bg)" : "transparent",
              color: currentView === "app" ? "#fff" : "var(--color-text-secondary)"
            }}
          >
            App
          </button>
          <button
            onClick={() => setCurrentView("landing")}
            className="btn btn-ghost"
            style={{
              height: "24px",
              padding: "2px 8px",
              fontSize: "11px",
              background: currentView === "landing" ? "var(--color-brand-bg)" : "transparent",
              color: currentView === "landing" ? "#fff" : "var(--color-text-secondary)"
            }}
          >
            Landing
          </button>
        </div>

        {/* Switch to Mobile View Button */}
        <button
          onClick={onToggleViewMode}
          className="btn btn-ghost hide-on-mobile"
          style={{
            height: "28px",
            padding: "0 8px",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            border: "1px solid var(--color-border-primary)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)"
          }}
          title="Switch to 390px Mobile Artboards"
        >
          <Smartphone size={13} />
          <span>Mobile View</span>
        </button>

        {/* Declare Incident Button */}
        <button 
          onClick={onOpenDeclareModal}
          className="btn btn-danger"
          style={{ height: "28px", padding: "0 10px", fontSize: "11px", fontWeight: 600 }}
          title="Declare new incident (Shortcut: C)"
        >
          <Plus size={13} />
          <span className="hide-on-mobile">Declare Incident</span>
          <span className="show-on-mobile">Declare</span>
        </button>
      </div>
    </header>
  );
}

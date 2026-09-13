import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Plus, 
  AlertOctagon, 
  Server, 
  Terminal, 
  FileText, 
  Radio, 
  ArrowRight,
  Flame,
  Layout,
  Layers
} from "lucide-react";

export function CommandPalette({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onDeclareIncident, 
  onSelectIncident,
  incidents,
  runbooks 
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Command items builder
  const allItems = [
    {
      id: "cmd-declare",
      category: "Action",
      title: "Declare New Incident",
      shortcut: "C",
      icon: Plus,
      action: () => onDeclareIncident()
    },
    {
      id: "cmd-view-incidents",
      category: "Navigation",
      title: "Go to Incidents Matrix",
      shortcut: "G I",
      icon: AlertOctagon,
      action: () => onNavigate("incidents")
    },
    {
      id: "cmd-view-services",
      category: "Navigation",
      title: "Go to Services & SLOs",
      shortcut: "G S",
      icon: Server,
      action: () => onNavigate("services")
    },
    {
      id: "cmd-view-runbooks",
      category: "Navigation",
      title: "Go to Executable Runbooks",
      shortcut: "G R",
      icon: Terminal,
      action: () => onNavigate("runbooks")
    },
    {
      id: "cmd-view-retros",
      category: "Navigation",
      title: "Go to Post-Mortem Studio",
      shortcut: "G P",
      icon: FileText,
      action: () => onNavigate("retros")
    },
    {
      id: "cmd-view-status",
      category: "Navigation",
      title: "Open Public Status Page Preview",
      shortcut: "G T",
      icon: Radio,
      action: () => onNavigate("status")
    },
    {
      id: "cmd-view-landing",
      category: "Navigation",
      title: "Switch to Marketing Landing Page",
      shortcut: "G L",
      icon: Layout,
      action: () => onNavigate("landing")
    },
    // Top incidents
    ...incidents.slice(0, 3).map((inc) => ({
      id: `cmd-inc-${inc.id}`,
      category: "Incident",
      title: `${inc.id}: ${inc.title}`,
      shortcut: inc.severity,
      icon: Flame,
      action: () => {
        onNavigate("incidents");
        onSelectIncident(inc);
      }
    })),
    // Runbooks
    ...runbooks.slice(0, 2).map((rb) => ({
      id: `cmd-rb-${rb.id}`,
      category: "Runbook",
      title: `Run: ${rb.title}`,
      shortcut: `${rb.estimatedMinutes}m`,
      icon: Terminal,
      action: () => {
        onNavigate("runbooks", rb.id);
      }
    }))
  ];

  const filteredItems = allItems.filter((item) => {
    if (!query.trim()) return true;
    return item.title.toLowerCase().includes(query.toLowerCase()) ||
           item.category.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside command palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="cmd-palette-box" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="cmd-input-container">
          <Search size={16} color="var(--color-text-tertiary)" />
          <input
            ref={inputRef}
            id="cmd-palette-input"
            name="cmdQuery"
            aria-label="Search commands, incidents, and resources"
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="cmd-input"
          />
          <kbd>ESC</kbd>
        </div>

        {/* Results List */}
        <div className="cmd-list">
          {filteredItems.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: "12px" }}>
              No matching commands or resources found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={14} />
                    <span>{item.title}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "10px", opacity: 0.7 }}>
                      {item.category}
                    </span>
                    {item.shortcut && <kbd>{item.shortcut}</kbd>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

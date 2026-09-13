import React from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Vigil ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          backgroundColor: "#08090a",
          color: "#ededed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          <div style={{
            maxWidth: "480px",
            width: "100%",
            backgroundColor: "#0d0f12",
            border: "1px solid rgba(235, 87, 87, 0.3)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(235, 87, 87, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#eb5757"
              }}>
                <AlertOctagon size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#ffffff" }}>
                  Incident Command Recovery
                </h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "2px 0 0 0" }}>
                  An unexpected render exception occurred.
                </p>
              </div>
            </div>

            {this.state.error?.message && (
              <div style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
                padding: "10px 12px",
                marginBottom: "20px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#eb5757",
                overflowX: "auto"
              }}>
                {this.state.error.message}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={this.handleReload}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  color: "#08090a",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                <RotateCcw size={14} />
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                Reset State
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

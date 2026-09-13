# Vigil: Incident Command & Service Reliability Platform

Vigil is an incident command and site reliability management platform built in the distinct, high-precision style of Linear. Designed for infrastructure and SRE teams requiring sub-second triage, executable operational runbooks, continuous SLO tracking, and automated post-mortem retrospectives.

## Key Capabilities

- **Zero-Latency Incident Command Matrix**: Real-time incident triage across P0 to P3 severity tiers with keyboard-first shortcuts (`Cmd+K`, `C`), blast radius assessment, and live war room feeds.
- **Dual View Modes**: Switch between high-density List View and Kanban Board view with phase swimlanes (Triage, Investigating, Identified, Monitoring, Resolved).
- **Executable Operational Runbooks**: Interactive step-by-step diagnostic and rollback procedures with one-click copyable terminal commands and execution progress tracking.
- **Service Reliability & SLO Catalog**: Fleet microservice dependency catalog with real-time error budget burn bars, p99 latency monitoring, and on-call engineer directory.
- **Automated Post-Mortem Studio**: 5 Whys root cause tree analysis and preventative action item tracking with one-click markdown export.
- **Public Status Page Preview**: Customer-facing live uptime monitor with 90-day historical reliability blocks and subscriber notification form.
- **Linear Aesthetic System**: Obsidian dark palette (`#08090a`, `#000212`), glowing edge shine borders, radial ambient highlights, micro-badges, and accessible keyboard navigation.
- **Responsive Architecture**: Adaptive layouts supporting desktop displays down to 375px mobile viewports with native bottom navigation.

## Tech Stack

- **Runtime & Bundler**: [Bun](https://bun.sh) (fast all-in-one JavaScript runtime)
- **Frontend**: React 19, Lucide React
- **Design Tokens**: Linear-inspired custom design tokens in pure CSS
- **Visuals**: Generated dark-minimalist infrastructure and telemetry imagery via Pollinations AI

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.1+ or Node.js

### Installation

```bash
cd /root/vigil
bun install
```

### Build

```bash
bun run build
```

This bundles React components, minifies CSS/JS into `./dist`, and syncs public assets.

### Start Local Server

```bash
bun run start
```

Runs on `http://localhost:3000`.

## Keyboard Shortcuts

- `⌘K` or `Ctrl+K`: Global Command Palette
- `C`: Declare New Incident
- `Esc`: Close any active modal or command menu

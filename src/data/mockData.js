// Vigil Mock Dataset: Incident Command & Service Reliability Platform

export const INITIAL_INCIDENTS = [
  {
    id: "INC-409",
    title: "EU Gateway Errors",
    severity: "P0",
    status: "investigating",
    serviceId: "svc-api-gw",
    serviceName: "api-gateway",
    commander: {
      name: "Elena Rostova",
      role: "Primary On-Call",
      initials: "ER",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    createdAt: "14m ago",
    updatedAt: "2m ago",
    errorRate: "12.4%",
    errorRateTarget: "< 1%",
    p99Latency: "842ms",
    p99LatencyTarget: "< 300ms",
    affectedCustomers: 187,
    serviceHealth: "Degraded",
    impactedServices: [
      { name: "api-gateway", sev: "P0" },
      { name: "payments", sev: "P1" },
      { name: "search", sev: "P3" },
      { name: "frontend", sev: "P3" }
    ],
    impact: "Inbound requests returning HTTP 504 across Frankfurt and Dublin ingress clusters.",
    slackChannel: "#inc-409-eu-gateway",
    warRoomUrl: "https://meet.google.com/inc-409-huddle",
    runbookId: "rb-envoy-drain",
    activeRunbook: {
      title: "Runbook: Envoy Proxy Pool Drain",
      description: "Drain unhealthy proxies and restore pool.",
      stepText: "Step 1 of 4",
      totalSteps: 4,
      currentStep: 1
    },
    timeline: [
      {
        id: "tl-1",
        time: "03:12 UTC",
        author: "Datadog Alert",
        type: "system",
        message: "Error rate crossed 5% threshold"
      },
      {
        id: "tl-2",
        time: "03:14 UTC",
        author: "PagerDuty Router",
        type: "system",
        message: "On-call notified (Elena Rostova)"
      },
      {
        id: "tl-3",
        time: "03:16 UTC",
        author: "Elena Rostova",
        type: "user",
        message: "Incident declared (P0)"
      }
    ]
  },
  {
    id: "INC-402",
    title: "Payment Service Latency",
    severity: "P1",
    status: "identified",
    serviceId: "svc-billing",
    serviceName: "payments",
    commander: {
      name: "Marcus Chen",
      role: "Payments SRE",
      initials: "MC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    createdAt: "28m ago",
    updatedAt: "14m ago",
    errorRate: "4.8%",
    errorRateTarget: "< 0.5%",
    p99Latency: "410ms",
    p99LatencyTarget: "< 200ms",
    affectedCustomers: 64,
    serviceHealth: "Degraded",
    impactedServices: [
      { name: "payments", sev: "P1" }
    ],
    impact: "Webhook workers throttled due to database lock contention.",
    slackChannel: "#inc-402-payment-latency",
    warRoomUrl: "https://meet.google.com/inc-402-huddle",
    runbookId: "rb-restart-lb",
    activeRunbook: {
      title: "Runbook: Restart Load Balancer",
      description: "Graceful restart of ingress pods.",
      stepText: "Step 2 of 4",
      totalSteps: 4,
      currentStep: 2
    },
    timeline: [
      { id: "tl-4", time: "02:45 UTC", author: "CloudWatch", type: "system", message: "Dead letter queue depth exceeded 1,200 events." },
      { id: "tl-5", time: "02:50 UTC", author: "Marcus Chen", type: "user", message: "Identified lock contention on transaction ledger." }
    ]
  },
  {
    id: "INC-398",
    title: "Search Degraded",
    severity: "P2",
    status: "monitoring",
    serviceId: "svc-search",
    serviceName: "search",
    commander: {
      name: "Sophia Patel",
      role: "Search Platform Engineer",
      initials: "SP",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    createdAt: "1h 10m ago",
    updatedAt: "37m ago",
    errorRate: "1.2%",
    errorRateTarget: "< 0.2%",
    p99Latency: "290ms",
    p99LatencyTarget: "< 150ms",
    affectedCustomers: 12,
    serviceHealth: "Monitoring",
    impactedServices: [
      { name: "search", sev: "P2" }
    ],
    impact: "Index compaction backlog temporarily impacting search ranking latency.",
    slackChannel: "#inc-398-search",
    warRoomUrl: "https://meet.google.com/inc-398-huddle",
    runbookId: "rb-flush-dns",
    timeline: [
      { id: "tl-6", time: "01:30 UTC", author: "Elastic Alert", type: "system", message: "Index compaction backlog triggered warning." },
      { id: "tl-7", time: "01:45 UTC", author: "Sophia Patel", type: "action", message: "Allocated dedicated compute shards. Monitoring recovery." }
    ]
  },
  {
    id: "INC-391",
    title: "Report Generation Delays",
    severity: "P3",
    status: "monitoring",
    serviceId: "svc-search",
    serviceName: "search",
    commander: {
      name: "Daniel Kim",
      role: "Data Infrastructure Lead",
      initials: "DK",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    },
    createdAt: "3h ago",
    updatedAt: "2h ago",
    errorRate: "0.4%",
    errorRateTarget: "< 0.1%",
    p99Latency: "180ms",
    p99LatencyTarget: "< 120ms",
    affectedCustomers: 4,
    serviceHealth: "Monitoring",
    impactedServices: [
      { name: "search", sev: "P3" }
    ],
    impact: "Asynchronous PDF report generation queued behind daily batch export.",
    slackChannel: "#inc-391-reports",
    warRoomUrl: "https://meet.google.com/inc-391-huddle",
    runbookId: null,
    timeline: [
      { id: "tl-8", time: "23:15 UTC", author: "Job Queue Monitor", type: "system", message: "Queue delay exceeded 120s." }
    ]
  },
  {
    id: "INC-387",
    title: "Mobile API 5xx Spikes",
    severity: "P3",
    status: "monitoring",
    serviceId: "svc-api-gw",
    serviceName: "mobile-api",
    commander: {
      name: "Priya Nair",
      role: "Mobile Backend SRE",
      initials: "PN",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
    },
    createdAt: "6h ago",
    updatedAt: "4h ago",
    errorRate: "0.8%",
    errorRateTarget: "< 0.1%",
    p99Latency: "140ms",
    p99LatencyTarget: "< 100ms",
    affectedCustomers: 9,
    serviceHealth: "Monitoring",
    impactedServices: [
      { name: "mobile-api", sev: "P3" }
    ],
    impact: "Occasional HTTP 502 errors observed on legacy Android app clients.",
    slackChannel: "#inc-387-mobile",
    warRoomUrl: "https://meet.google.com/inc-387-huddle",
    runbookId: "rb-clear-cdn",
    timeline: [
      { id: "tl-9", time: "20:00 UTC", author: "Ingress Monitor", type: "system", message: "Legacy TLS handshake drops detected." }
    ]
  }
];

export const INITIAL_SERVICES = [
  {
    id: "svc-api-gw",
    name: "API Gateway & Edge Routing",
    shortName: "api-gateway",
    tier: "Tier 1 (Critical)",
    status: "outage",
    uptime30d: "99.91%",
    errorBudgetRemaining: 14,
    p99Latency: "842ms",
    normalLatency: "45ms",
    owner: "Core Platform",
    onCall: {
      name: "Elena Rostova",
      initials: "ER",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    dependencies: ["Authentication Engine", "Primary PostgreSQL Clustered DB"],
    repo: "github.com/vigil-systems/edge-gateway",
    activeIncidents: 1
  },
  {
    id: "svc-billing",
    name: "Billing & Payments Engine",
    shortName: "payments",
    tier: "Tier 1 (Critical)",
    status: "degraded",
    uptime30d: "99.85%",
    errorBudgetRemaining: 42,
    p99Latency: "410ms",
    normalLatency: "85ms",
    owner: "Monetization Team",
    onCall: {
      name: "Marcus Chen",
      initials: "MC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    dependencies: ["API Gateway & Edge Routing"],
    repo: "github.com/vigil-systems/billing-worker",
    activeIncidents: 1
  },
  {
    id: "svc-search",
    name: "Vector Search & Indexing",
    shortName: "search",
    tier: "Tier 2 (High)",
    status: "healthy",
    uptime30d: "99.96%",
    errorBudgetRemaining: 78,
    p99Latency: "290ms",
    normalLatency: "60ms",
    owner: "Search Platform",
    onCall: {
      name: "Sophia Patel",
      initials: "SP",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    dependencies: ["Primary PostgreSQL Clustered DB"],
    repo: "github.com/vigil-systems/vector-search",
    activeIncidents: 0
  },
  {
    id: "svc-frontend",
    name: "Frontend Application CDN",
    shortName: "frontend",
    tier: "Tier 1 (Critical)",
    status: "healthy",
    uptime30d: "99.999%",
    errorBudgetRemaining: 98,
    p99Latency: "12ms",
    normalLatency: "12ms",
    owner: "Client Experience",
    onCall: {
      name: "Elena Rostova",
      initials: "ER",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    dependencies: [],
    repo: "github.com/vigil-systems/web-client",
    activeIncidents: 0
  }
];

export const INITIAL_RUNBOOKS = [
  {
    id: "rb-restart-lb",
    title: "Restart Load Balancer",
    category: "Networking",
    estimatedMinutes: 4,
    duration: "~4m",
    lastRun: "2d ago",
    successRate: "98%",
    totalSteps: 4,
    currentStep: 2,
    serviceId: "svc-api-gw",
    serviceName: "API Gateway & Ingress NGINX",
    description: "Gracefully rolling restarts ingress controller pods and validates zero-downtime routing.",
    steps: [
      {
        id: "s1",
        title: "Inspect ingress pod status",
        command: "kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx",
        expectedOutput: "NAME                                READY   STATUS    RESTARTS   AGE\nnginx-ingress-controller-7d8b9c-4x   1/1     Running   0          14d",
        completed: true
      },
      {
        id: "s2",
        title: "Restart the load balancer service",
        command: "# Restart the load balancer service\nkubectl rollout restart deployment/nginx-ingress-controller -n ingress-nginx\n\n# Verify rollout status\nkubectl rollout status deployment/nginx-ingress-controller -n ingress-nginx",
        expectedOutput: "deployment \"nginx-ingress-controller\" successfully rolled out\nWaiting for deployment \"nginx-ingress-controller\" to become ready...",
        completed: false
      },
      {
        id: "s3",
        title: "Verify health probe restoration",
        command: "curl -I https://api.vigil.internal/healthz",
        expectedOutput: "HTTP/2 200 OK\ncache-control: no-cache",
        completed: false
      },
      {
        id: "s4",
        title: "Re-enable traffic routing",
        command: "kubectl annotate ingress -n default --all traffic.routing/status=enabled",
        expectedOutput: "ingress.networking.k8s.io/api-ingress annotated",
        completed: false
      }
    ]
  },
  {
    id: "rb-flush-dns",
    title: "Flush DNS Cache",
    category: "Networking",
    estimatedMinutes: 2,
    duration: "~2m",
    lastRun: "5d ago",
    successRate: "100%",
    totalSteps: 3,
    currentStep: 1,
    serviceId: "svc-cdn",
    serviceName: "DNS & Edge Resolvers",
    description: "Flushes CoreDNS daemonset caches and verifies upstream authoritative resolver latency.",
    steps: [
      { id: "s1", title: "Flush CoreDNS cache daemonset", command: "kubectl exec -n kube-system coredns-pod -- coredns-cli cache flush", expectedOutput: "DNS Cache flushed across 6 replicas.", completed: true },
      { id: "s2", title: "Dig test resolution", command: "dig +short api.vigil.internal @10.96.0.10", expectedOutput: "10.0.4.12", completed: false }
    ]
  },
  {
    id: "rb-rotate-ssl",
    title: "Rotate SSL Certificate",
    category: "Networking",
    estimatedMinutes: 6,
    duration: "~6m",
    lastRun: "3d ago",
    successRate: "97%",
    totalSteps: 3,
    currentStep: 1,
    serviceId: "svc-api-gw",
    serviceName: "Edge Gateway TLS",
    description: "Issues Let's Encrypt rotation or syncs AWS ACM certificate secret to ingress gateway.",
    steps: [
      { id: "s1", title: "Renew cert-manager certificate", command: "cmctl renew api-vigil-cert -n ingress-nginx", expectedOutput: "Certificate api-vigil-cert renewal initiated.", completed: true }
    ]
  },
  {
    id: "rb-rebuild-net",
    title: "Rebuild Network Policy",
    category: "Networking",
    estimatedMinutes: 7,
    duration: "~7m",
    lastRun: "1d ago",
    successRate: "96%",
    totalSteps: 4,
    currentStep: 1,
    serviceId: "svc-api-gw",
    serviceName: "Cilium CNI / Network Policies",
    description: "Reapplies Calico or Cilium network security policies across production namespaces.",
    steps: [
      { id: "s1", title: "Apply baseline Cilium policy", command: "cilium policy apply -f /etc/cilium/policies/ingress-strict.yaml", expectedOutput: "CiliumNetworkPolicy applied.", completed: true }
    ]
  },
  {
    id: "rb-check-conn",
    title: "Check Service Connectivity",
    category: "Networking",
    estimatedMinutes: 3,
    duration: "~3m",
    lastRun: "4d ago",
    successRate: "99%",
    totalSteps: 3,
    currentStep: 1,
    serviceId: "svc-api-gw",
    serviceName: "Mesh Connectivity",
    description: "Executes synthetic ping and gRPC health checks between service mesh pods.",
    steps: [
      { id: "s1", title: "Run probe matrix", command: "vigil probe run --all-tiers", expectedOutput: "All 14 services reachable. Jitter < 2ms.", completed: true }
    ]
  },
  {
    id: "rb-update-fw",
    title: "Update Firewall Rules",
    category: "Networking",
    estimatedMinutes: 5,
    duration: "~5m",
    lastRun: "6d ago",
    successRate: "98%",
    totalSteps: 3,
    currentStep: 1,
    serviceId: "svc-api-gw",
    serviceName: "WAF & Security Groups",
    description: "Synchronizes Cloudflare WAF ipset blocklist to AWS VPC security group rules.",
    steps: [
      { id: "s1", title: "Sync WAF IP rules", command: "vigil waf sync --provider cloudflare --vpc vpc-08b4e72", expectedOutput: "Security group ingress updated with 42 cidrs.", completed: true }
    ]
  },
  {
    id: "rb-clear-cdn",
    title: "Clear CDN Cache",
    category: "Networking",
    estimatedMinutes: 8,
    duration: "~8m",
    lastRun: "2d ago",
    successRate: "99%",
    totalSteps: 2,
    currentStep: 1,
    serviceId: "svc-cdn",
    serviceName: "Cloudflare Edge Cache",
    description: "Purges edge cache tags for static assets and API schema endpoints globally.",
    steps: [
      { id: "s1", title: "Purge by cache tag", command: "curl -X POST https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache -H 'Authorization: Bearer $CF_TOKEN' -d '{\"tags\":[\"api-static\"]}'", expectedOutput: "{\"success\": true}", completed: true }
    ]
  },
  {
    id: "rb-validate-dns",
    title: "Validate DNS Records",
    category: "Networking",
    estimatedMinutes: 3,
    duration: "~3m",
    lastRun: "5d ago",
    successRate: "100%",
    totalSteps: 2,
    currentStep: 1,
    serviceId: "svc-cdn",
    serviceName: "Route53 Anycast",
    description: "Checks Anycast propagation across 24 global edge resolvers with latency verification.",
    steps: [
      { id: "s1", title: "Verify propagation", command: "vigil dns check --domain vigil.dev --expected-cname edge.vigil.dev", expectedOutput: "All 24 regions resolved 100% matched.", completed: true }
    ]
  },
  {
    id: "rb-envoy-drain",
    title: "Runbook: Envoy Proxy Pool Drain",
    category: "Networking",
    estimatedMinutes: 8,
    duration: "~8m",
    lastRun: "14m ago",
    successRate: "95%",
    totalSteps: 4,
    currentStep: 1,
    serviceId: "svc-api-gw",
    serviceName: "API Gateway & Edge Routing",
    description: "Drain unhealthy proxies and restore pool.",
    steps: [
      {
        id: "s1",
        title: "Inspect Active Connection Pool Depth",
        command: "kubectl exec -n ingress-system deploy/envoy-gw -- envoy-admin -c 'stats --filter upstream_cx_active'",
        expectedOutput: "upstream_cx_active: 4129 (Pool Saturation: 98%)",
        completed: true
      },
      {
        id: "s2",
        title: "Trigger Graceful Connection Drain",
        command: "kubectl patch deployment envoy-gw -n ingress-system -p '{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"drain-timeout\":\"30s\"}}}}}'",
        expectedOutput: "deployment.apps/envoy-gw patched. Drain timeout initiated.",
        completed: false
      },
      {
        id: "s3",
        title: "Roll Back Ingress Deployment to Stable Tag",
        command: "kubectl rollout undo deployment/envoy-gw -n ingress-system",
        expectedOutput: "deployment.apps/envoy-gw rolled back to revision 41",
        completed: false
      },
      {
        id: "s4",
        title: "Verify Error Rate Restoration",
        command: "curl -I https://api.vigil.internal/healthz",
        expectedOutput: "HTTP/2 200 OK\nLatency: 38ms",
        completed: false
      }
    ]
  }
];

export const INITIAL_POSTMORTEMS = [
  {
    id: "PM-406",
    incidentId: "INC-406",
    title: "Auth Token Revocation Redis Memory Pressure",
    severity: "P2",
    lead: "Devon Reed",
    date: "2 days ago",
    status: "Published",
    impactSummary: "Cluster redis-auth-prod crossed 85% memory watermark due to accumulated session revocation keys without TTL headers. No customer session loss occurred.",
    fiveWhys: [
      {
        q: "Why did Redis memory approach capacity limits?",
        a: "Memory reached 88% watermark due to rapid accumulation of 4.2 million session records."
      },
      {
        q: "Why were expired session records accumulating?",
        a: "The token creation payload lacked a standard time-to-live expiration parameter."
      },
      {
        q: "Why was the expiration parameter missing?",
        a: "A new biometric refresh endpoint was introduced without calling the shared token serializer."
      },
      {
        q: "Why did the Redis cluster not evict older keys automatically?",
        a: "The Redis instance was configured with default noeviction policy inherited during legacy cloud migration."
      },
      {
        q: "Why was the missing TTL not detected during code review or staging?",
        a: "Integration tests in staging only verified token generation HTTP 200, not the Redis key metadata or TTL."
      }
    ],
    actionItems: [
      {
        id: "ai-1",
        title: "Set volatile-lru eviction policy on production Redis cluster",
        assignee: "Devon Reed",
        priority: "High",
        done: true
      },
      {
        id: "ai-2",
        title: "Add automated test asserting TTL presence on all generated tokens",
        assignee: "Klaus Weber",
        priority: "High",
        done: true
      },
      {
        id: "ai-3",
        title: "Deploy Datadog alert triggering at 75% Redis memory capacity",
        assignee: "Elena Rostova",
        priority: "Medium",
        done: false
      }
    ]
  },
  {
    id: "PM-404",
    incidentId: "INC-404",
    title: "PostgreSQL Primary Read-Replica Synchronization Jitter",
    severity: "P1",
    lead: "Klaus Weber",
    date: "5 days ago",
    status: "Published",
    impactSummary: "Replication lag reached 22s on primary read replicas when an unindexed analytics query blocked wal_sender processes. Total duration: 18 minutes.",
    fiveWhys: [
      {
        q: "Why did read replicas experience 22s replication lag?",
        a: "The primary node wal_sender process was stalled waiting on an exclusive table lock."
      },
      {
        q: "Why was an exclusive table lock acquired?",
        a: "A manual migration script initiated an unpartitioned index rebuild during business hours."
      },
      {
        q: "Why was the migration allowed without concurrent indexing?",
        a: "The DDL script used CREATE INDEX instead of CREATE INDEX CONCURRENTLY."
      },
      {
        q: "Why did CI linting not catch non-concurrent index creation?",
        a: "The repository migration linter had its postgres-safety check disabled for maintenance branch."
      },
      {
        q: "Why did change control approve off-hours maintenance rules during daylight?",
        a: "The deployment schedule time zone was misconfigured as UTC rather than local datacenter time."
      }
    ],
    actionItems: [
      {
        id: "ai-4",
        title: "Enforce strict CI lint blocking non-concurrent index creation on primary tables",
        assignee: "Klaus Weber",
        priority: "High",
        done: true
      },
      {
        id: "ai-5",
        title: "Configure statement_timeout = 3000ms for all migration scripts",
        assignee: "Elena Rostova",
        priority: "High",
        done: true
      },
      {
        id: "ai-6",
        title: "Automate replication lag circuit breaker in PgBouncer pool router",
        assignee: "Marcus Vance",
        priority: "Medium",
        done: false
      }
    ]
  }
];

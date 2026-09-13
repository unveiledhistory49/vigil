// Vigil Mock Dataset: Incident Command & Service Reliability Platform

export const INITIAL_INCIDENTS = [
  {
    id: "INC-409",
    title: "EU-West Primary API Gateway 504 Gateway Timeouts",
    severity: "P0",
    status: "investigating",
    serviceId: "svc-api-gw",
    serviceName: "API Gateway & Edge Routing",
    commander: {
      name: "Elena Rostova",
      role: "Principal SRE",
      initials: "ER"
    },
    createdAt: "14m ago",
    updatedAt: "2m ago",
    impact: "18.4% of inbound requests returning HTTP 504 across Frankfurt and Dublin ingress clusters.",
    slackChannel: "#inc-409-eu-gateway",
    warRoomUrl: "https://meet.vigil.internal/war-room-409",
    runbookId: "rb-envoy-drain",
    timeline: [
      {
        id: "tl-1",
        time: "14m ago",
        author: "Datadog Telemetry",
        type: "system",
        message: "P99 latency exceeded 4500ms on edge-ingress-eu. Alert threshold: 500ms."
      },
      {
        id: "tl-2",
        time: "12m ago",
        author: "Elena Rostova",
        type: "user",
        message: "P0 declared. Assembling war room. Escalating to Ingress Platform engineers."
      },
      {
        id: "tl-3",
        time: "7m ago",
        author: "Klaus Weber",
        type: "user",
        message: "Identified connection pool exhaustion on upstream Envoy sidecars following config push v2.41.9."
      },
      {
        id: "tl-4",
        time: "2m ago",
        author: "Elena Rostova",
        type: "action",
        message: "Started executable runbook: Envoy Sidecar Rollback and Pool Drain."
      }
    ]
  },
  {
    id: "INC-408",
    title: "Stripe Webhook Delivery Delays Exceeding 180s",
    severity: "P1",
    status: "identified",
    serviceId: "svc-billing",
    serviceName: "Billing & Stripe Webhook Sync",
    commander: {
      name: "Marcus Vance",
      role: "Staff Backend Engineer",
      initials: "MV"
    },
    createdAt: "42m ago",
    updatedAt: "9m ago",
    impact: "Subscription provisioning delayed by 3 to 5 minutes for new checkout sessions.",
    slackChannel: "#inc-408-billing-lag",
    warRoomUrl: "https://meet.vigil.internal/war-room-408",
    runbookId: "rb-stripe-reconcile",
    timeline: [
      {
        id: "tl-5",
        time: "42m ago",
        author: "Cloudwatch Monitor",
        type: "system",
        message: "Dead letter queue depth exceeded 1,200 events on payments-inbound."
      },
      {
        id: "tl-6",
        time: "35m ago",
        author: "Marcus Vance",
        type: "user",
        message: "P1 declared. Webhook worker consumer concurrency throttled by database row locks."
      },
      {
        id: "tl-7",
        time: "18m ago",
        author: "Devon Reed",
        type: "user",
        message: "Identified advisory lock conflict on account_subscriptions table during batch upsert."
      },
      {
        id: "tl-8",
        time: "9m ago",
        author: "Marcus Vance",
        type: "action",
        message: "Applying partition index fix and scaling consumer pool to 12 workers."
      }
    ]
  },
  {
    id: "INC-407",
    title: "Vector Search Cluster Replica Lag Spike",
    severity: "P2",
    status: "monitoring",
    serviceId: "svc-search",
    serviceName: "Vector Search & Embeddings Cluster",
    commander: {
      name: "Aiko Tanaka",
      role: "ML Platform Lead",
      initials: "AT"
    },
    createdAt: "1h 15m ago",
    updatedAt: "22m ago",
    impact: "Semantic similarity query latency increased by 140ms. Fallback lex search operating normally.",
    slackChannel: "#inc-407-vector-lag",
    warRoomUrl: "https://meet.vigil.internal/war-room-407",
    runbookId: null,
    timeline: [
      {
        id: "tl-9",
        time: "1h 15m ago",
        author: "Qdrant Cluster Monitor",
        type: "system",
        message: "Segment compaction throttling triggered on nodes v-search-03 and v-search-04."
      },
      {
        id: "tl-10",
        time: "55m ago",
        author: "Aiko Tanaka",
        type: "user",
        message: "P2 declared. Resized worker IOPS limit and enabled distributed indexing bypass."
      },
      {
        id: "tl-11",
        time: "22m ago",
        author: "Aiko Tanaka",
        type: "action",
        message: "Replica lag dropped back to 12ms. In 30-minute monitoring observation."
      }
    ]
  },
  {
    id: "INC-406",
    title: "Auth Token Revocation Redis Memory Pressure",
    severity: "P2",
    status: "resolved",
    serviceId: "svc-auth",
    serviceName: "Authentication & Session Engine",
    commander: {
      name: "Devon Reed",
      role: "Security Engineer",
      initials: "DR"
    },
    createdAt: "2d ago",
    updatedAt: "1d ago",
    impact: "Redis memory reached 88% watermark. No dropped sessions or auth failures occurred.",
    slackChannel: "#inc-406-auth-cache",
    warRoomUrl: "https://meet.vigil.internal/war-room-406",
    runbookId: null,
    timeline: [
      {
        id: "tl-12",
        time: "2d ago",
        author: "Memory Alert",
        type: "system",
        message: "Cluster redis-auth-prod memory usage crossed 85% threshold."
      },
      {
        id: "tl-13",
        time: "2d ago",
        author: "Devon Reed",
        type: "user",
        message: "P2 declared. Investigation revealed expired refresh tokens retained without TTL."
      },
      {
        id: "tl-14",
        time: "1d ago",
        author: "Devon Reed",
        type: "action",
        message: "Eviction policy set to volatile-lru. Memory stabilized at 38%. Incident resolved."
      }
    ]
  },
  {
    id: "INC-405",
    title: "CDN Edge TLS Handshake Slowdown on Legacy Clients",
    severity: "P3",
    status: "resolved",
    serviceId: "svc-cdn",
    serviceName: "CDN Edge Workers & Caching",
    commander: {
      name: "Elena Rostova",
      role: "Principal SRE",
      initials: "ER"
    },
    createdAt: "3d ago",
    updatedAt: "3d ago",
    impact: "Legacy TLS 1.2 clients in APAC experienced 80ms additional negotiation latency.",
    slackChannel: "#inc-405-cdn-tls",
    warRoomUrl: "https://meet.vigil.internal/war-room-405",
    runbookId: null,
    timeline: [
      {
        id: "tl-15",
        time: "3d ago",
        author: "Cloudflare Ingress Alert",
        type: "system",
        message: "Handshake duration spike on Tokyo and Singapore PoPs."
      },
      {
        id: "tl-16",
        time: "3d ago",
        author: "Elena Rostova",
        type: "action",
        message: "Reordered cipher suite priorities to re-enable session ticket reuse. Resolved."
      }
    ]
  },
  {
    id: "INC-404",
    title: "PostgreSQL Primary Read-Replica Synchronization Jitter",
    severity: "P1",
    status: "resolved",
    serviceId: "svc-db",
    serviceName: "Primary PostgreSQL Clustered DB",
    commander: {
      name: "Klaus Weber",
      role: "Database Reliability Engineer",
      initials: "KW"
    },
    createdAt: "5d ago",
    updatedAt: "5d ago",
    impact: "Replica wal_sender was blocked by long-running analytics query, causing 22s replication delay.",
    slackChannel: "#inc-404-db-sync",
    warRoomUrl: "https://meet.vigil.internal/war-room-404",
    runbookId: "rb-pg-failover",
    timeline: [
      {
        id: "tl-17",
        time: "5d ago",
        author: "Patroni Monitor",
        type: "system",
        message: "Replication lag on pg-replica-02 exceeded 15 seconds."
      },
      {
        id: "tl-18",
        time: "5d ago",
        author: "Klaus Weber",
        type: "user",
        message: "Identified rogue analytics PID holding lock on billing_ledger table."
      },
      {
        id: "tl-19",
        time: "5d ago",
        author: "Klaus Weber",
        type: "action",
        message: "Terminated query PID via pg_terminate_backend. Sync lag returned to <5ms."
      }
    ]
  }
];

export const INITIAL_SERVICES = [
  {
    id: "svc-api-gw",
    name: "API Gateway & Edge Routing",
    tier: "Tier 1 (Critical)",
    status: "outage",
    uptime30d: "99.91%",
    errorBudgetRemaining: 14,
    p99Latency: "4,210ms",
    normalLatency: "45ms",
    owner: "Core Platform",
    onCall: {
      name: "Elena Rostova",
      initials: "ER"
    },
    dependencies: ["Authentication Engine", "Primary PostgreSQL Clustered DB"],
    repo: "github.com/vigil-systems/edge-gateway",
    activeIncidents: 1
  },
  {
    id: "svc-auth",
    name: "Authentication & Session Engine",
    tier: "Tier 1 (Critical)",
    status: "healthy",
    uptime30d: "99.99%",
    errorBudgetRemaining: 89,
    p99Latency: "18ms",
    normalLatency: "18ms",
    owner: "Identity Platform",
    onCall: {
      name: "Devon Reed",
      initials: "DR"
    },
    dependencies: ["Primary PostgreSQL Clustered DB"],
    repo: "github.com/vigil-systems/auth-service",
    activeIncidents: 0
  },
  {
    id: "svc-billing",
    name: "Billing & Stripe Webhook Sync",
    tier: "Tier 2 (High)",
    status: "degraded",
    uptime30d: "99.85%",
    errorBudgetRemaining: 42,
    p99Latency: "240ms",
    normalLatency: "85ms",
    owner: "Monetization Team",
    onCall: {
      name: "Marcus Vance",
      initials: "MV"
    },
    dependencies: ["API Gateway & Edge Routing"],
    repo: "github.com/vigil-systems/billing-worker",
    activeIncidents: 1
  },
  {
    id: "svc-db",
    name: "Primary PostgreSQL Clustered DB",
    tier: "Tier 1 (Critical)",
    status: "healthy",
    uptime30d: "99.995%",
    errorBudgetRemaining: 95,
    p99Latency: "6ms",
    normalLatency: "6ms",
    owner: "Database Reliability",
    onCall: {
      name: "Klaus Weber",
      initials: "KW"
    },
    dependencies: [],
    repo: "github.com/vigil-systems/patroni-cluster",
    activeIncidents: 0
  },
  {
    id: "svc-search",
    name: "Vector Search & Embeddings Cluster",
    tier: "Tier 2 (High)",
    status: "healthy",
    uptime30d: "99.96%",
    errorBudgetRemaining: 78,
    p99Latency: "64ms",
    normalLatency: "60ms",
    owner: "Search Platform",
    onCall: {
      name: "Aiko Tanaka",
      initials: "AT"
    },
    dependencies: ["Primary PostgreSQL Clustered DB"],
    repo: "github.com/vigil-systems/vector-search",
    activeIncidents: 0
  },
  {
    id: "svc-cdn",
    name: "CDN Edge Workers & Caching",
    tier: "Tier 1 (Critical)",
    status: "healthy",
    uptime30d: "99.999%",
    errorBudgetRemaining: 98,
    p99Latency: "12ms",
    normalLatency: "12ms",
    owner: "Core Platform",
    onCall: {
      name: "Elena Rostova",
      initials: "ER"
    },
    dependencies: [],
    repo: "github.com/vigil-systems/edge-workers",
    activeIncidents: 0
  }
];

export const INITIAL_RUNBOOKS = [
  {
    id: "rb-envoy-drain",
    title: "Envoy Sidecar Rollback & Connection Drain",
    serviceId: "svc-api-gw",
    serviceName: "API Gateway & Edge Routing",
    estimatedMinutes: 8,
    description: "Gracefully drains active HTTP/2 connections and safely rolls back Envoy ingress deployment to stable SHA.",
    steps: [
      {
        id: "rb1-s1",
        title: "Inspect Active Connection Pool Depth",
        description: "Query active upstream socket connections across all ingress pods in namespace ingress-system.",
        command: "kubectl exec -n ingress-system deploy/envoy-gw -- envoy-admin -c 'stats --filter upstream_cx_active'",
        completed: true
      },
      {
        id: "rb1-s2",
        title: "Trigger Graceful Connection Drain",
        description: "Instruct Envoy ingress listeners to stop accepting new requests and complete in-flight transactions within 30s.",
        command: "kubectl patch deployment envoy-gw -n ingress-system -p '{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"drain-timeout\":\"30s\"}}}}}'",
        completed: true
      },
      {
        id: "rb1-s3",
        title: "Roll Back Ingress Deployment to Stable Tag",
        description: "Execute roll back to prior verified deployment artifact v2.41.8.",
        command: "kubectl rollout undo deployment/envoy-gw -n ingress-system",
        completed: false
      },
      {
        id: "rb1-s4",
        title: "Verify Error Rate Restoration",
        description: "Assert that 504 error rate across edge gateway drops below 0.01% over a 3-minute sample window.",
        command: "vigil metric verify --service api-gateway --error-rate \"<0.01%\" --window 3m",
        completed: false
      }
    ]
  },
  {
    id: "rb-pg-failover",
    title: "PostgreSQL Primary Failover & Standby Promotion",
    serviceId: "svc-db",
    serviceName: "Primary PostgreSQL Clustered DB",
    estimatedMinutes: 12,
    description: "Automated failover protocol using Patroni consensus to promote healthy read-replica with minimum replication lag.",
    steps: [
      {
        id: "rb2-s1",
        title: "Inspect Patroni Cluster Topology",
        description: "Confirm health, timeline ID, and WAL replication lag on all standby candidates.",
        command: "patronictl -c /etc/patroni/pg.yml topology",
        completed: false
      },
      {
        id: "rb2-s2",
        title: "Pause Client Traffic on PgBouncer",
        description: "Pause incoming transactional connection pools to prevent split-brain write buffers during promotion.",
        command: "pgbouncer-admin -p 6432 -c 'PAUSE primary_pool'",
        completed: false
      },
      {
        id: "rb2-s3",
        title: "Promote Standby Replica",
        description: "Issue failover order to promote pg-replica-02 with zero data loss flag.",
        command: "patronictl -c /etc/patroni/pg.yml failover --candidate pg-replica-02 --force",
        completed: false
      },
      {
        id: "rb2-s4",
        title: "Resume Write Traffic and Assert Readiness",
        description: "Resume PgBouncer connection pool and execute automated synthetic write validation probe.",
        command: "pgbouncer-admin -p 6432 -c 'RESUME primary_pool' && vigil healthcheck run --target db-write-path",
        completed: false
      }
    ]
  },
  {
    id: "rb-stripe-reconcile",
    title: "Stripe Webhook DLQ Flush & Throttled Replay",
    serviceId: "svc-billing",
    serviceName: "Billing & Stripe Webhook Sync",
    estimatedMinutes: 15,
    description: "Scales consumer workers, clears lock contention, and replays unhandled webhook payloads from the dead letter queue.",
    steps: [
      {
        id: "rb3-s1",
        title: "Inspect Dead Letter Queue Volume",
        description: "Check approximate unconsumed event count in SQS dead letter queue.",
        command: "aws sqs get-queue-attributes --queue-url $STRIPE_DLQ_URL --attribute-names ApproximateNumberOfMessages",
        completed: false
      },
      {
        id: "rb3-s2",
        title: "Scale Worker Pool Replicas",
        description: "Increase webhook consumer deployment replica count to handle re-drive burst.",
        command: "kubectl scale deployment stripe-worker --replicas=12 -n payments",
        completed: false
      },
      {
        id: "rb3-s3",
        title: "Replay Dead Letter Queue with Rate Limiting",
        description: "Safely redeliver DLQ messages at a bounded rate of 150 events per second.",
        command: "vigil queue replay --source stripe-dlq --rate 150 --max-attempts 3",
        completed: false
      },
      {
        id: "rb3-s4",
        title: "Verify Inbound Sync Reconciliation",
        description: "Confirm all subscriptions and payment intents match Stripe balance ledger.",
        command: "vigil stripe verify-reconciliation --since-minutes 60",
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

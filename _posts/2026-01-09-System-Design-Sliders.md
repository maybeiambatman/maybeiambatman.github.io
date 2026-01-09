---
layout: post
title: "System Design Sliders"
---

<!--
  INSTRUCTIONS:
  Copy and paste this entire block directly into your Markdown file (.md)
  or save it as an _include in Jekyll (e.g., _includes/system-design-sliders.html)
  and use {% include system-design-sliders.html %}.
-->

<style>
  /* Scoped CSS to prevent conflicts with your blog theme */
  .sds-widget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 0;
    margin: 2rem 0;
    color: #334155;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    overflow: hidden;
    position: relative; /* For modal positioning */
  }

  /* Header */
  .sds-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: white;
  }
  .sds-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }
  .sds-subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: #64748b;
  }

  /* Tabs */
  .sds-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }
  .sds-tab-btn {
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s;
  }
  .sds-tab-btn:hover {
    background: #e2e8f0;
  }
  .sds-tab-btn.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  /* Main Display Area */
  .sds-display {
    padding: 1.5rem;
    background: #1e293b; /* Dark bg for contrast */
    color: white;
  }
  .sds-dim-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .sds-dim-desc {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  /* Slider Styling */
  .sds-slider-container {
    position: relative;
    padding: 0 10px;
    margin-bottom: 2rem;
  }
  .sds-range-input {
    width: 100%;
    -webkit-appearance: none;
    height: 8px;
    border-radius: 4px;
    background: #475569;
    outline: none;
  }
  .sds-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
  .sds-range-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .sds-range-label {
    width: 33%;
    text-align: center;
    cursor: pointer;
  }
  .sds-range-label:first-child { text-align: left; }
  .sds-range-label:last-child { text-align: right; }
  .sds-range-label.active { color: #60a5fa; }

  /* Content Cards */
  .sds-content {
    background: white;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .sds-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .sds-pattern-name {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
  .sds-pattern-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #2563eb;
    font-weight: 700;
    display: block;
    margin-bottom: 0.25rem;
  }

  /* Tags */
  .sds-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .sds-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer; /* Clickable */
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  .sds-tag:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .sds-tag-tech { background: #f1f5f9; color: #475569; border-color: #e2e8f0; }
  .sds-tag-tech:hover { background: #e2e8f0; border-color: #cbd5e1; }

  .sds-tag-concept { background: #fffbeb; color: #92400e; border-color: #fcd34d; }
  .sds-tag-concept:hover { background: #fef3c7; border-color: #f59e0b; }

  /* Pros Cons Grid */
  .sds-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 640px) { .sds-grid { grid-template-columns: 1fr; } }

  .sds-card {
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
  }
  .sds-card-pros { background: #ecfdf5; border: 1px solid #a7f3d0; }
  .sds-card-cons { background: #fff1f2; border: 1px solid #fecdd3; }

  .sds-card-title {
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .sds-card-pros .sds-card-title { color: #047857; }
  .sds-card-cons .sds-card-title { color: #be123c; }

  .sds-list { padding-left: 1rem; margin: 0; }
  .sds-list li { margin-bottom: 0.25rem; }

  /* Staff Note */
  .sds-staff-note {
    background: #fff8eb;
    border-left: 4px solid #f59e0b;
    padding: 1rem;
    border-radius: 0 8px 8px 0;
    font-size: 0.9rem;
    color: #78350f;
    font-style: italic;
  }
  .sds-staff-label {
    font-weight: 800;
    font-style: normal;
    display: block;
    margin-bottom: 0.25rem;
    color: #b45309;
  }

  /* Modal Overlay */
  .sds-modal-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(2px);
    z-index: 10;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .sds-modal-overlay.open { display: flex; }

  .sds-modal {
    background: white;
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: sds-fade-up 0.2s ease-out;
  }

  @keyframes sds-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .sds-modal-header {
    padding: 1.5rem;
    color: white;
    position: relative;
  }
  .sds-modal-header.tech { background: #2563eb; }
  .sds-modal-header.concept { background: #d97706; }

  .sds-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    line-height: 1;
  }
  .sds-modal-close:hover { background: rgba(255,255,255,0.3); }

  .sds-modal-type {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    opacity: 0.9;
    margin-bottom: 0.25rem;
    display: block;
  }
  .sds-modal-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
  }

  .sds-modal-body {
    padding: 1.5rem;
  }
  .sds-modal-def {
    font-size: 1rem;
    line-height: 1.6;
    color: #334155;
    margin-bottom: 1.5rem;
  }
  .sds-modal-why {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
  }
  .sds-modal-why-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 0.5rem;
  }
  .sds-modal-why-text {
    font-size: 0.9rem;
    color: #475569;
    margin: 0;
  }

</style>

<div class="sds-widget" id="sds-widget">

  <div class="sds-header">
    <h2 class="sds-title">System Design Trade-off Matrix</h2>
    <p class="sds-subtitle">Adjust constraints to see architectural shifts.</p>
  </div>

  <div class="sds-tabs" id="sds-tabs">
    <!-- Generated by JS -->
  </div>

  <div class="sds-display">
    <div class="sds-dim-title" id="sds-dim-title"></div>
    <p class="sds-dim-desc" id="sds-dim-desc"></p>

    <div class="sds-slider-container">
      <input type="range" min="0" max="2" step="1" value="1" class="sds-range-input" id="sds-slider">
      <div class="sds-range-labels" id="sds-labels">
        <!-- Generated by JS -->
      </div>
    </div>
  </div>

  <div class="sds-content">
    <div class="sds-section-header">
      <div>
        <span class="sds-pattern-label">Architecture Pattern</span>
        <h3 class="sds-pattern-name" id="sds-pattern"></h3>
      </div>
    </div>

    <div class="sds-tags" id="sds-tech-tags"></div>

    <div class="sds-grid">
      <div class="sds-card sds-card-pros">
        <h4 class="sds-card-title">✓ Gains</h4>
        <ul class="sds-list" id="sds-pros"></ul>
      </div>
      <div class="sds-card sds-card-cons">
        <h4 class="sds-card-title">✕ Sacrifices</h4>
        <ul class="sds-list" id="sds-cons"></ul>
      </div>
    </div>

    <div class="sds-staff-note">
      <span class="sds-staff-label">⚠ Staff Engineer Insight</span>
      <span id="sds-note"></span>
    </div>
  </div>

  <!-- Modal -->
  <div class="sds-modal-overlay" id="sds-modal-overlay">
    <div class="sds-modal" id="sds-modal">
      <div class="sds-modal-header" id="sds-modal-header">
        <button class="sds-modal-close" id="sds-modal-close">×</button>
        <span class="sds-modal-type" id="sds-modal-type">Technology</span>
        <h3 class="sds-modal-title" id="sds-modal-title">Title</h3>
      </div>
      <div class="sds-modal-body">
        <div class="sds-modal-def" id="sds-modal-def">Definition text goes here.</div>
        <div class="sds-modal-why" id="sds-modal-why-box">
          <span class="sds-modal-why-label">Why it fits here</span>
          <p class="sds-modal-why-text" id="sds-modal-why">Explanation text.</p>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
(function() {
  // --- DATA (Restored full definitions) ---
  const data = {
    consistency: {
      title: "Consistency vs. Availability",
      desc: "CAP Theorem: Do you need instant correctness (CP) or higher uptime (AP)?",
      stops: [
        {
          label: "Strict (ACID)",
          pattern: "Sync Replication",
          tech: [
            { name: "PostgreSQL", desc: "Advanced open-source relational database.", why: "Offers strong consistency via ACID transactions and MVCC." },
            { name: "CockroachDB", desc: "Distributed SQL database built on a transactional KV store.", why: "Scales horizontally while maintaining PostgreSQL-like consistency." },
            { name: "Zookeeper", desc: "Centralized service for maintaining configuration information.", why: "Used for leader election and distributed synchronization." }
          ],
          concepts: [
            { term: "ACID", def: "Atomicity, Consistency, Isolation, Durability. Standard properties for reliable transactions." },
            { term: "2-Phase Commit", def: "Distributed algorithm to ensure all nodes commit or abort a transaction together." },
            { term: "Linearizability", def: "Strongest consistency model. Once a write completes, all later reads return that value." }
          ],
          pros: ["Guaranteed accuracy", "No stale reads", "Simple logic"],
          cons: ["High Latency", "Lower Availability", "Hard global scale"],
          note: "Mention Spanner if you need scale + consistency, but acknowledge latency cost."
        },
        {
          label: "Tunable (Quorum)",
          pattern: "Quorum (R+W > N)",
          tech: [
            { name: "Cassandra", desc: "Wide-column store based on BigTable and Dynamo.", why: "Allows specifying consistency level (ONE, QUORUM, ALL) per query." },
            { name: "DynamoDB", desc: "AWS managed NoSQL database.", why: "Offers configurable consistency reads to trade speed for accuracy." },
            { name: "Riak", desc: "Distributed NoSQL key-value store.", why: "Uses a ring topology to ensure data is always writable." }
          ],
          concepts: [
            { term: "Quorum", def: "Minimum votes a distributed transaction must obtain to proceed." },
            { term: "Tunable Consistency", def: "Choosing between strong and eventual consistency per-operation." },
            { term: "Hinted Handoff", def: "Storing writes on a neighbor node temporarily if the target node is down." }
          ],
          pros: ["Configurable", "Survives failure", "Fast writes"],
          cons: ["Conflict resolution needed", "Read repair", "Phantom reads"],
          note: "Discuss Tunable Consistency. Write Quorum (W=2), Read One (R=1) for speed."
        },
        {
          label: "Eventual (BASE)",
          pattern: "Async Gossip",
          tech: [
            { name: "DNS", desc: "Domain Name System.", why: "Updates propagate slowly across the internet (TTL)." },
            { name: "CDN", desc: "Content Delivery Network.", why: "Caches content at edge; purging takes time." },
            { name: "Redis (Async)", desc: "In-memory data store.", why: "Async replication means replicas might be slightly behind master." }
          ],
          concepts: [
            { term: "Eventual Consistency", def: "Guarantees that if no new updates are made, all accesses will eventually return the last updated value." },
            { term: "Gossip Protocol", def: "Peer-to-peer communication where nodes periodically exchange state." },
            { term: "CRDTs", def: "Conflict-free Replicated Data Types that merge automatically." }
          ],
          pros: ["Lowest Latency", "High Availability", "Global Scale"],
          cons: ["Stale reads", "Data loss risk", "Confusing UX"],
          note: "Key phrase: Conflict Resolution Strategy (Vector clocks vs LWW)."
        }
      ]
    },
    latency: {
      title: "Latency Requirements",
      desc: "Dictates storage medium (RAM vs Disk) and protocol (TCP vs UDP).",
      stops: [
        {
          label: "Real-Time (<50ms)",
          pattern: "In-Memory / Push",
          tech: [
            { name: "Redis", desc: "In-memory data structure store.", why: "RAM (nanoseconds) is orders of magnitude faster than Disk." },
            { name: "WebSockets", desc: "Full-duplex communication over single TCP connection.", why: "Avoids HTTP handshake overhead for every message." },
            { name: "UDP/QUIC", desc: "Connectionless protocol.", why: "Better for streaming/gaming; dropping a packet is better than waiting." }
          ],
          concepts: [
            { term: "Head-of-Line Blocking", def: "Performance issue where a line of packets is held up by the first packet." },
            { term: "Stateful", def: "Server maintains open connection with client (unlike stateless HTTP)." }
          ],
          pros: ["Instant feedback", "High frequency", "Live interaction"],
          cons: ["Volatile data", "Expensive RAM", "Hard to load balance"],
          note: "The bottleneck is stateful connections. You need a dedicated Gateway layer."
        },
        {
          label: "Interactive (<500ms)",
          pattern: "Cache-Aside",
          tech: [
            { name: "Postgres + Cache", desc: "RDBMS + Redis/Memcached.", why: "Cache absorbs 90% of read traffic." },
            { name: "MongoDB", desc: "Document NoSQL DB.", why: "Flexible schema allows fetching nested data in one query." },
            { name: "CDN", desc: "Content Delivery Network.", why: "Serves static assets physically close to user." }
          ],
          concepts: [
            { term: "Cache Invalidation", def: "Removing stale data from cache when DB changes." },
            { term: "Cold Start", def: "Delay when cache is empty and system must hit the DB." }
          ],
          pros: ["Cost effective", "Standard tooling", "Good durability"],
          cons: ["Invalidation is hard", "Cold starts", "DB bottlenecks"],
          note: "Focus on Fan-out. Push vs Pull models for feeds."
        },
        {
          label: "Async (Seconds+)",
          pattern: "Batch / Queue",
          tech: [
            { name: "Kafka", desc: "Distributed event streaming.", why: "Decouples producers/consumers to buffer spikes." },
            { name: "S3 + Athena", desc: "Serverless SQL on Object Storage.", why: "Cheap for massive datasets where speed isn't critical." },
            { name: "Spark", desc: "Distributed processing framework.", why: "Chews through Petabytes by splitting work." }
          ],
          concepts: [
            { term: "Backpressure", def: "Resistance when consumer cannot keep up with producer." },
            { term: "Dead Letter Queue", def: "Storage for messages that cannot be processed successfully." }
          ],
          pros: ["Massive throughput", "Decoupled", "Easy retries"],
          cons: ["Poor UX", "System complexity", "Hard to debug"],
          note: "Mention Backpressure. What happens if the queue fills up?"
        }
      ]
    },
    throughput: {
      title: "Read vs. Write Heavy",
      desc: "Is it a Library (Read) or a Sensor (Write)?",
      stops: [
        {
          label: "Read Heavy (100:1)",
          pattern: "Scatter-Gather",
          tech: [
            { name: "CDN", desc: "Content Delivery Network.", why: "Offloads read traffic from origin." },
            { name: "Varnish", desc: "HTTP accelerator.", why: "Caches entire HTML pages." },
            { name: "Read Replicas", desc: "DB copies.", why: "Scale reads horizontally by adding nodes." }
          ],
          concepts: [
            { term: "Thundering Herd", def: "Many processes waking up to attack DB when cache expires." },
            { term: "Coalescing", def: "Combining multiple requests for same resource into one." }
          ],
          pros: ["Cheap scaling", "Stateless", "Global reach"],
          cons: ["Cache coherence", "Replication lag", "Stale data"],
          note: "Thundering Herd protection is critical. Use Request Coalescing."
        },
        {
          label: "Balanced (50:50)",
          pattern: "Sharding",
          tech: [
            { name: "Sharded SQL", desc: "Partitioning DB across machines.", why: "Scales beyond single machine limits." },
            { name: "MongoDB", desc: "Document DB.", why: "Handles mix of read/write well with auto-sharding." }
          ],
          concepts: [
            { term: "Hot Keys", def: "Specific data (e.g. celebrity) accessed disproportionately." },
            { term: "Consistent Hashing", def: "Minimizes remapping when nodes are added/removed." }
          ],
          pros: ["Predictable", "Standard patterns", "Reasonable"],
          cons: ["Jack of all trades", "Capacity planning", "Schema changes"],
          note: "Discuss Hot Keys. What if one shard gets 50% of traffic?"
        },
        {
          label: "Write Heavy (1:100)",
          pattern: "Append-Only (LSM)",
          tech: [
            { name: "Cassandra", desc: "Wide-Column Store.", why: "Uses LSM Trees for fast sequential writes." },
            { name: "Kafka", desc: "Event Streaming.", why: "Acts as shock absorber for writes." },
            { name: "TimescaleDB", desc: "Time-series DB.", why: "Optimized for ingesting timestamped data." }
          ],
          concepts: [
            { term: "LSM Tree", def: "Log-Structured Merge-tree. Optimizes write frequency." },
            { term: "Bloom Filter", def: "Probabilistic structure to check if element exists without disk lookup." }
          ],
          pros: ["Insane ingest", "Sequential disk I/O", "No locking"],
          cons: ["Slow reads", "No JOINs", "Data duplication"],
          note: "Trade-off is Read Amplification. Bloom Filters are mandatory."
        }
      ]
    },
    reliability: {
      title: "Reliability (9s)",
      desc: "Cost increases 10x for every 9 you add.",
      stops: [
        {
          label: "99.9% (Single Region)",
          pattern: "N+1 Redundancy",
          tech: [
            { name: "Load Balancer", desc: "Distributes traffic.", why: "Redundancy if one server fails." },
            { name: "Primary-Replica", desc: "Main DB + Backup.", why: "Standard redundancy." }
          ],
          concepts: [
            { term: "SPOF", def: "Single Point of Failure." },
            { term: "RTO/RPO", def: "Recovery Time/Point Objective." }
          ],
          pros: ["Simple", "Cheap", "Easy deploy"],
          cons: ["Regional downtime", "Manual failover", "Maintenance"],
          note: "Don't over-engineer. Multi-region for MVP is a red flag."
        },
        {
          label: "99.99% (Multi-AZ)",
          pattern: "High Availability",
          tech: [
            { name: "Multi-AZ RDS", desc: "DB spanning zones.", why: "Auto-flip to standby on failure." },
            { name: "Auto-healing", desc: "K8s/ASG feature.", why: "Replaces dead nodes automatically." }
          ],
          concepts: [
            { term: "Availability Zone", def: "Isolated DC within a region." },
            { term: "Graceful Degradation", def: " maintaining functionality when parts fail." }
          ],
          pros: ["Survives fire", "Auto failover", "Standard prod"],
          cons: ["Double cost", "Sync latency", "Complex VPC"],
          note: "Mention Graceful Degradation. Show cached data if DB is down."
        },
        {
          label: "99.999% (Global)",
          pattern: "Geo-Redundancy",
          tech: [
            { name: "Anycast DNS", desc: "Routing methodology.", why: "Routes to nearest healthy DC." },
            { name: "Active-Active", desc: "Multi-master cluster.", why: "No single master to fail." }
          ],
          concepts: [
            { term: "Blast Radius", def: "Max damage from a failure." },
            { term: "Chaos Engineering", def: "Testing system resilience." }
          ],
          pros: ["Zero downtime", "Low latency global", "Resilient"],
          cons: ["Astronomical cost", "Consistency hell", "Hard testing"],
          note: "Cell-Based Architecture (bulkheads) is the Staff pattern here."
        }
      ]
    },
    security: {
      title: "Security & Compliance",
      desc: "Dictates encryption depth and key management.",
      stops: [
        {
          label: "Public / Open",
          pattern: "Static Hosting",
          tech: [
            { name: "Public S3", desc: "Open bucket.", why: "Cheapest hosting." },
            { name: "API Keys", desc: "Simple token.", why: "Rate limiting only." }
          ],
          concepts: [
            { term: "Signed URL", def: "Time-limited access URL." }
          ],
          pros: ["Max caching", "Low latency", "Simple"],
          cons: ["No privacy", "Scraping", "Leak risks"],
          note: "Public data shouldn't be encrypted—it kills CDN efficiency."
        },
        {
          label: "Private (Standard)",
          pattern: "Defense in Depth",
          tech: [
            { name: "TLS", desc: "HTTPS.", why: "Encrypts in transit." },
            { name: "RBAC", desc: "Role-Based Access.", why: "Authorization." },
            { name: "KMS", desc: "Key Management.", why: "Encrypts at rest." }
          ],
          concepts: [
            { term: "Tokenization", def: "Replacing sensitive data with non-sensitive tokens." },
            { term: "Least Privilege", def: "Minimum necessary permissions." }
          ],
          pros: ["Industry standard", "Disk protection", "Balanced"],
          cons: ["Key complexity", "TLS overhead", "Internal threats"],
          note: "Tokenization in logs prevents PII leakage."
        },
        {
          label: "Regulated",
          pattern: "Zero Trust / Enclave",
          tech: [
            { name: "HSM", desc: "Hardware Security Module.", why: "Tamper-proof key storage." },
            { name: "Column Encryption", desc: "Encrypting specific fields.", why: "Data unreadable even if DB dumped." }
          ],
          concepts: [
            { term: "Zero Trust", def: "Never trust, always verify." },
            { term: "Homomorphic Enc", def: "Compute on encrypted data." }
          ],
          pros: ["HIPAA/PCI", "Insider protection", "Verifiable"],
          cons: ["Massive latency", "Expensive", "Hard debug"],
          note: "Client-Side Encryption implies extreme threat models."
        }
      ]
    }
  };

  // --- DOM ELEMENTS ---
  const widget = document.getElementById('sds-widget');
  const tabsContainer = document.getElementById('sds-tabs');
  const slider = document.getElementById('sds-slider');
  const labelsContainer = document.getElementById('sds-labels');

  // Modal Elements
  const modalOverlay = document.getElementById('sds-modal-overlay');
  const modalClose = document.getElementById('sds-modal-close');
  const mType = document.getElementById('sds-modal-type');
  const mTitle = document.getElementById('sds-modal-title');
  const mHeader = document.getElementById('sds-modal-header');
  const mDef = document.getElementById('sds-modal-def');
  const mWhy = document.getElementById('sds-modal-why');
  const mWhyBox = document.getElementById('sds-modal-why-box');

  let activeDim = 'consistency';

  // --- FUNCTIONS ---

  function openModal(type, item) {
    mType.innerText = type === 'tech' ? 'Technology' : 'Concept';
    mTitle.innerText = type === 'tech' ? item.name : item.term;
    mDef.innerText = type === 'tech' ? item.desc : item.def;

    // Header styling
    mHeader.className = `sds-modal-header ${type}`;

    // "Why" section (only for tech usually, but some concepts might have it)
    if (type === 'tech' && item.why) {
      mWhyBox.style.display = 'block';
      mWhy.innerText = item.why;
    } else {
      mWhyBox.style.display = 'none';
    }

    modalOverlay.classList.add('open');
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
  }

  // Close modal on click outside or x button
  modalClose.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };


  function renderTabs() {
    tabsContainer.innerHTML = '';
    Object.keys(data).forEach(key => {
      const btn = document.createElement('button');
      btn.className = `sds-tab-btn ${key === activeDim ? 'active' : ''}`;
      btn.innerText = data[key].title;
      btn.onclick = () => {
        activeDim = key;
        slider.value = 1; // Reset to middle
        updateUI();
      };
      tabsContainer.appendChild(btn);
    });
  }

  function renderTags(container, items, type) {
    if (!items) return;

    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `sds-tag ${type === 'tech' ? 'sds-tag-tech' : 'sds-tag-concept'}`;
      btn.innerText = type === 'tech' ? item.name : item.term;

      // Add info icon indicator? (optional, keeping clean for now)

      btn.onclick = () => openModal(type, item);
      container.appendChild(btn);
    });
  }

  function renderList(id, items) {
    const el = document.getElementById(id);
    el.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      el.appendChild(li);
    });
  }

  function updateUI() {
    const dim = data[activeDim];
    const valIndex = parseInt(slider.value);
    const stop = dim.stops[valIndex];

    // Update Header
    renderTabs();
    document.getElementById('sds-dim-title').innerText = dim.title;
    document.getElementById('sds-dim-desc').innerText = dim.desc;

    // Update Slider Labels
    labelsContainer.innerHTML = '';
    dim.stops.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = `sds-range-label ${i === valIndex ? 'active' : ''}`;
      div.innerText = s.label;
      div.onclick = () => {
        slider.value = i;
        updateUI();
      }
      labelsContainer.appendChild(div);
    });

    // Update Content
    document.getElementById('sds-pattern').innerText = stop.pattern;

    // Merge Tech and Concepts for tags
    const techTags = document.getElementById('sds-tech-tags');
    techTags.innerHTML = '';
    renderTags(techTags, stop.tech, 'tech');
    renderTags(techTags, stop.concepts || [], 'concept');

    renderList('sds-pros', stop.pros);
    renderList('sds-cons', stop.cons);
    document.getElementById('sds-note').innerText = stop.note;
  }

  // Initialize
  slider.addEventListener('input', updateUI);
  updateUI();

})();
</script>

---
layout: post
title: "System Design Sliders"
---

Despite having ten years of industry experience I haven't done many system design interview. During these interviews, I have a tendency to fall in the classic trap of thinking there is a 'correct' architecture for every problem, which leaves me freezing up at the whiteboard. Once I realized that system design isn't about memorizing diagrams—it's about managing trade-offs, I built this interactive tool to visualize that mental shift: showing exactly how moving a single 'requirement slider' (like latency or consistency) fundamentally influences your entire tech stack.

<style>
  /* Hokusai Great Wave Theme - System Design Widget */
  .sds-widget {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #e8dcc8;
    border: 1px solid rgba(30, 77, 123, 0.15);
    padding: 0;
    margin: 2rem 0;
    color: #2c2416;
    max-width: 100%;
    overflow: hidden;
    position: relative;
  }

  /* Header - Parchment with wave decoration */
  .sds-header {
    padding: 1.5rem 1.5rem 2rem;
    background: linear-gradient(180deg, #f2e9dc 0%, #e8dcc8 100%);
    text-align: center;
    border-bottom: none;
    position: relative;
  }
  .sds-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20'%3E%3Cpath d='M0,10 Q25,3 50,10 T100,10 T150,10 T200,10' fill='none' stroke='%231e4d7b' stroke-width='2' opacity='0.5'/%3E%3Ccircle cx='50' cy='5' r='2' fill='%23f5f2eb'/%3E%3Ccircle cx='100' cy='5' r='2.5' fill='%23f5f2eb'/%3E%3Ccircle cx='150' cy='5' r='2' fill='%23f5f2eb'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
  .sds-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 400;
    font-family: Georgia, serif;
    letter-spacing: 0.03em;
    color: #0d2840;
  }
  .sds-subtitle {
    display: none;
  }

  /* Tabs */
  .sds-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
    background: #d4c4a8;
    border-bottom: 1px solid rgba(30, 77, 123, 0.1);
    justify-content: center;
  }
  .sds-tab-btn {
    background: #f2e9dc;
    border: 1px solid rgba(30, 77, 123, 0.2);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 400;
    cursor: pointer;
    color: #1e4d7b;
    font-family: inherit;
    transition: all 0.2s ease;
  }
  .sds-tab-btn:hover {
    background: #f5f2eb;
    border-color: rgba(30, 77, 123, 0.4);
  }
  .sds-tab-btn.active {
    background: #1e4d7b;
    color: #f2e9dc;
    border-color: #1e4d7b;
  }

  /* Main Display Area - Deep Prussian blue like the wave */
  .sds-display {
    padding: 1.5rem;
    background: linear-gradient(180deg, #0d2840 0%, #1e4d7b 100%);
    color: #f2e9dc;
    position: relative;
  }
  /* Foam spray decoration */
  .sds-display::before {
    content: '';
    position: absolute;
    top: 10px;
    right: 15px;
    width: 80px;
    height: 40px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40'%3E%3Ccircle cx='70' cy='12' r='4' fill='%23f5f2eb' opacity='0.2'/%3E%3Ccircle cx='58' cy='8' r='3' fill='%23f5f2eb' opacity='0.15'/%3E%3Ccircle cx='65' cy='22' r='2.5' fill='%23f5f2eb' opacity='0.12'/%3E%3Ccircle cx='50' cy='15' r='2' fill='%23f5f2eb' opacity='0.1'/%3E%3Ccircle cx='72' cy='30' r='2' fill='%23f5f2eb' opacity='0.1'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    pointer-events: none;
  }
  .sds-dim-title {
    font-size: 1.1rem;
    font-weight: 400;
    font-family: Georgia, serif;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  .sds-dim-desc {
    font-size: 0.85rem;
    color: #c9d4dc;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  /* Slider */
  .sds-slider-container {
    margin-bottom: 1rem;
  }
  .sds-range-input {
    width: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    height: 6px;
    background: rgba(245, 242, 235, 0.2);
    border-radius: 3px;
    outline: none;
  }
  .sds-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #c23a3a;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #f5f2eb;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }
  .sds-range-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #c23a3a;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #f5f2eb;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }
  .sds-range-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    color: #a0b8c8;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .sds-range-label {
    width: 33%;
    text-align: center;
    cursor: pointer;
    transition: color 0.2s;
  }
  .sds-range-label:first-child { text-align: left; }
  .sds-range-label:last-child { text-align: right; }
  .sds-range-label.active { color: #ffffff; font-weight: 600; }

  /* Content - Parchment background */
  .sds-content {
    background: #f2e9dc;
    padding: 1.5rem;
  }

  .sds-section-header {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    position: relative;
  }
  .sds-section-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12'%3E%3Cpath d='M0,6 Q12,2 25,6 T50,6 T75,6 T100,6' fill='none' stroke='%231e4d7b' stroke-width='2' stroke-linecap='round' opacity='0.5'/%3E%3Ccircle cx='20' cy='4' r='1.5' fill='%23f5f2eb'/%3E%3Ccircle cx='45' cy='4' r='1' fill='%23f5f2eb'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
  }
  .sds-pattern-name {
    font-size: 1.15rem;
    font-weight: 400;
    font-family: Georgia, serif;
    color: #0d2840;
    margin: 0;
  }
  .sds-pattern-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    color: #c23a3a;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
    display: block;
  }

  /* Tags */
  .sds-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .sds-tag {
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 400;
    cursor: pointer;
    border: 1px solid;
    font-family: inherit;
    transition: all 0.2s;
  }
  .sds-tag-tech {
    background: #e8dcc8;
    color: #1e4d7b;
    border-color: rgba(30, 77, 123, 0.25);
  }
  .sds-tag-tech:hover {
    background: #1e4d7b;
    color: #f2e9dc;
    border-color: #1e4d7b;
  }
  .sds-tag-concept {
    background: #e8dcc8;
    color: #8b6914;
    border-color: rgba(184, 134, 11, 0.3);
  }
  .sds-tag-concept:hover {
    background: #b8860b;
    color: #fff;
    border-color: #b8860b;
  }

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
    font-size: 0.85rem;
    border-left: 3px solid;
    background: #e8dcc8;
  }
  .sds-card-pros {
    border-color: #4a7ba7;
    background: linear-gradient(135deg, rgba(74, 123, 167, 0.1), #e8dcc8);
  }
  .sds-card-cons {
    border-color: #c23a3a;
    background: linear-gradient(135deg, rgba(194, 58, 58, 0.08), #e8dcc8);
  }

  .sds-card-title {
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .sds-card-pros .sds-card-title { color: #1e4d7b; }
  .sds-card-cons .sds-card-title { color: #a02828; }

  .sds-list { padding-left: 1.25rem; margin: 0; }
  .sds-list li { margin-bottom: 0.35rem; color: #4a3d2e; }

  /* Staff Note */
  .sds-staff-note {
    background: linear-gradient(135deg, rgba(184, 134, 11, 0.1), #e8dcc8);
    border-left: 3px solid #b8860b;
    padding: 1rem;
    font-size: 0.85rem;
    color: #5a4a3a;
    font-style: italic;
  }
  .sds-staff-label {
    font-weight: 600;
    font-style: normal;
    display: block;
    margin-bottom: 0.35rem;
    color: #8b6914;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Example Application - Parchment style */
  .sds-example {
    background: #f2e9dc;
    border: 1px solid rgba(30, 77, 123, 0.12);
    border-left: 3px solid #4a7ba7;
    padding: 1rem;
    margin-bottom: 1.5rem;
    color: #0d2840;
  }
  .sds-example-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
    color: #1e4d7b;
  }
  .sds-example-app {
    font-size: 1.05rem;
    font-weight: 400;
    font-family: Georgia, serif;
    margin: 0 0 0.5rem 0;
    color: #0d2840;
  }
  .sds-example-desc {
    font-size: 0.85rem;
    line-height: 1.6;
    margin: 0;
    color: #4a3d2e;
  }

  /* Modal */
  .sds-modal-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 40, 64, 0.7);
    z-index: 10;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .sds-modal-overlay.open { display: flex; }

  .sds-modal {
    background: #e8dcc8;
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    border: 1px solid rgba(30, 77, 123, 0.2);
  }

  .sds-modal-header {
    padding: 1rem;
    color: #f2e9dc;
    position: relative;
    background: linear-gradient(135deg, #0d2840, #1e4d7b);
  }
  .sds-modal-header.tech { background: linear-gradient(135deg, #0d2840, #1e4d7b); }
  .sds-modal-header.concept { background: linear-gradient(135deg, #6b4e0a, #8b6914); }

  .sds-modal-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(245,242,235,0.15);
    border: none;
    color: #f2e9dc;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    transition: background 0.2s;
  }
  .sds-modal-close:hover { background: rgba(245,242,235,0.25); }

  .sds-modal-type {
    text-transform: uppercase;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
    color: #c9d4dc;
  }
  .sds-modal-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
    font-family: Georgia, serif;
    color: #ffffff;
  }

  .sds-modal-body {
    padding: 1.5rem;
    background: #f2e9dc;
  }
  .sds-modal-def {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #2c2416;
    margin-bottom: 1.25rem;
  }
  .sds-modal-why {
    background: #e8dcc8;
    border-left: 3px solid #4a7ba7;
    padding: 1rem;
  }
  .sds-modal-why-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #1e4d7b;
    margin-bottom: 0.5rem;
    display: block;
  }
  .sds-modal-why-text {
    font-size: 0.85rem;
    color: #4a3d2e;
    margin: 0;
    line-height: 1.5;
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

    <div class="sds-example" id="sds-example">
      <span class="sds-example-label">Real-World Example</span>
      <h4 class="sds-example-app" id="sds-example-app"></h4>
      <p class="sds-example-desc" id="sds-example-desc"></p>
    </div>

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
  // --- DATA (Full definitions with examples) ---
  const data = {
    consistency: {
      title: "Consistency vs. Availability",
      desc: "The CAP Theorem forces a choice: Do you need instant correctness (CP) or higher uptime (AP)? This dimension defines how your system handles network partitions and determines whether users see stale data.",
      stops: [
        {
          label: "Strict (ACID)",
          pattern: "Synchronous Replication / Distributed Transactions",
          tech: [
            { name: "PostgreSQL", desc: "Advanced open-source relational database with support for complex queries, JSONB, and extensions. The gold standard for ACID compliance.", why: "Offers strong consistency via ACID transactions, MVCC (Multi-Version Concurrency Control), and serializable isolation levels." },
            { name: "CockroachDB", desc: "Distributed SQL database built on a transactional and strongly-consistent key-value store. Designed to survive datacenter failures.", why: "Scales horizontally across regions while maintaining serializable isolation and PostgreSQL wire compatibility." },
            { name: "Zookeeper", desc: "Centralized service for maintaining configuration information, naming, and providing distributed synchronization.", why: "Provides strong consistency guarantees for leader election, distributed locks, and configuration management via ZAB protocol." }
          ],
          concepts: [
            { term: "ACID", def: "Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). The gold standard for reliable transactions." },
            { term: "2-Phase Commit", def: "Distributed algorithm ensuring all nodes either commit or abort a transaction together. Coordinator asks all participants to prepare, then tells them to commit only if all agreed." },
            { term: "Linearizability", def: "The strongest consistency model. Once a write completes, all subsequent reads (from any node) must return that value. Behaves as if there's only one copy of the data." }
          ],
          pros: ["Data is guaranteed accurate.", "No 'stale' reads possible.", "Application logic stays simple."],
          cons: ["Higher latency (coordination overhead).", "Lower availability during partitions.", "Difficult to scale globally."],
          exampleApp: "Banking Ledger / ATM",
          exampleDesc: "You cannot withdraw money you don't have. If two ATMs process withdrawals simultaneously, the system must coordinate to prevent overdraft. Eventual consistency here means lawsuits.",
          note: "Mention Google Spanner if the interviewer wants global scale + consistency, but acknowledge the latency cost and complexity of TrueTime."
        },
        {
          label: "Tunable (Quorum)",
          pattern: "Quorum Reads/Writes (R + W > N)",
          tech: [
            { name: "Cassandra", desc: "Wide-column store inspired by Amazon's Dynamo and Google's BigTable. Excels at write-heavy workloads across multiple datacenters.", why: "Allows specifying consistency level (ONE, QUORUM, ALL) per query, letting you trade consistency for speed on a per-operation basis." },
            { name: "DynamoDB", desc: "AWS fully-managed NoSQL database with single-digit millisecond performance. Supports both key-value and document data models.", why: "Offers strongly consistent reads as an option, letting you choose between speed (eventually consistent) and accuracy (strongly consistent) per read." },
            { name: "Riak", desc: "Distributed NoSQL key-value database designed for high availability and fault tolerance using consistent hashing.", why: "Uses a ring topology with configurable N/R/W values to ensure data remains writable even during node failures." }
          ],
          concepts: [
            { term: "Quorum", def: "The minimum number of votes a distributed transaction must obtain to proceed. With N replicas, requiring R reads and W writes where R+W>N ensures overlap and consistency." },
            { term: "Tunable Consistency", def: "The ability to choose consistency level per-operation. Write with QUORUM for important data, write with ONE for logs. Read with ALL when accuracy matters, ONE when speed matters." },
            { term: "Hinted Handoff", def: "When a target node is unavailable, writes are temporarily stored on another node with a 'hint' to forward them when the target recovers. Improves availability at the cost of consistency." }
          ],
          pros: ["Flexibility per operation.", "Survives node failures.", "Good write performance."],
          cons: ["Must handle conflict resolution.", "Read repair overhead.", "Possible phantom reads."],
          exampleApp: "Social Media Feed",
          exampleDesc: "If a user posts an update, it's okay if some followers see it a few seconds later. You tune writes to be fast (W=1) and reads to be consistent enough (R=2) based on the feature's tolerance.",
          note: "Discuss Tunable Consistency. 'We'd use Write Quorum (W=2) for posts but Read One (R=1) for the feed since slight staleness is acceptable.'"
        },
        {
          label: "Eventual (BASE)",
          pattern: "Asynchronous Replication / Gossip Protocol",
          tech: [
            { name: "DNS", desc: "The Domain Name System - the internet's phone book. Distributes and caches IP address mappings globally.", why: "Updates propagate slowly across the internet via TTL (Time To Live). A DNS change might take 24-48 hours to reach all resolvers." },
            { name: "CDN", desc: "Content Delivery Network - caches content at edge locations worldwide to reduce latency for end users.", why: "Caches content at edge nodes; cache invalidation propagates eventually. Users in different regions may see different versions temporarily." },
            { name: "Redis (Async Replication)", desc: "In-memory data structure store used as cache, message broker, and database. Lightning fast but trades durability for speed.", why: "With async replication, replicas might be slightly behind master. A failover could lose the most recent writes not yet replicated." }
          ],
          concepts: [
            { term: "Eventual Consistency", def: "If no new updates are made, all replicas will eventually converge to the same value. The system guarantees convergence but not timing - could be milliseconds or minutes." },
            { term: "Gossip Protocol", def: "Peer-to-peer communication where nodes periodically exchange state with random neighbors. Information spreads epidemically through the cluster, eventually reaching all nodes." },
            { term: "CRDTs", def: "Conflict-free Replicated Data Types - data structures that can be replicated across nodes and merged automatically without conflicts. Examples: counters, sets, registers." }
          ],
          pros: ["Lowest possible latency.", "Maximum availability.", "Scales globally with ease."],
          cons: ["Users may see stale data.", "Risk of conflicts and data loss.", "Confusing UX edge cases."],
          exampleApp: "Like Counter / View Count",
          exampleDesc: "If a video shows 1,000,000 views vs 1,000,003 views, nobody cares. The counter can be slightly off; eventual convergence is fine. Trying to make this strongly consistent would be absurdly expensive.",
          note: "The key phrase here is 'Conflict Resolution Strategy' - mention Vector Clocks vs Last-Write-Wins (LWW) and their trade-offs."
        }
      ]
    },
    latency: {
      title: "Latency Requirements",
      desc: "Latency requirements dictate your storage medium (RAM vs SSD vs HDD), communication protocol (WebSocket vs HTTP vs UDP), and architecture patterns. Each 10x increase in acceptable latency opens new, cheaper options.",
      stops: [
        {
          label: "Real-Time (<50ms)",
          pattern: "In-Memory Storage / Push-Based Updates",
          tech: [
            { name: "Redis", desc: "In-memory data structure store supporting strings, hashes, lists, sets, and sorted sets. Sub-millisecond operations.", why: "RAM access (nanoseconds) is 100,000x faster than SSD. When you need <10ms response, you cannot afford disk I/O." },
            { name: "WebSockets", desc: "Protocol providing full-duplex communication channels over a single TCP connection. Enables server-initiated messages.", why: "Eliminates HTTP request/response overhead. Once connected, messages flow instantly in both directions without handshakes." },
            { name: "UDP/QUIC", desc: "UDP is connectionless with no delivery guarantees. QUIC adds reliability on top while avoiding TCP's head-of-line blocking.", why: "For gaming/streaming, dropping a packet (UDP) is better than waiting for retransmission (TCP). QUIC gives you the best of both worlds." }
          ],
          concepts: [
            { term: "Head-of-Line Blocking", def: "In TCP, if one packet is lost, all subsequent packets must wait for retransmission even if they arrived fine. QUIC solves this by allowing streams to be processed independently." },
            { term: "Stateful Connections", def: "Server maintains an open connection with each client (unlike stateless HTTP). Enables instant push but requires careful connection management and makes horizontal scaling harder." }
          ],
          pros: ["Instant user feedback.", "Supports high-frequency updates.", "Enables live collaboration."],
          cons: ["Data in RAM is volatile.", "RAM is expensive at scale.", "Stateful = hard to load balance."],
          exampleApp: "Multiplayer Game Server",
          exampleDesc: "In a first-person shooter, 50ms of lag is the difference between a headshot and a miss. Players rage-quit over latency. You need UDP, in-memory state, and servers geographically close to players.",
          note: "The key bottleneck is stateful connections. You'll need a dedicated Gateway/Connection layer that can be scaled independently from your business logic."
        },
        {
          label: "Interactive (<500ms)",
          pattern: "Cache-Aside / Read-Through Caching",
          tech: [
            { name: "PostgreSQL + Redis Cache", desc: "Durable RDBMS as source of truth with Redis caching hot data. The standard web application architecture.", why: "Cache absorbs 90%+ of read traffic. Database handles writes and cache misses. Best of both worlds: durability + speed." },
            { name: "MongoDB", desc: "Document database storing data as flexible JSON-like documents. Great for hierarchical data and rapid iteration.", why: "Flexible schema allows fetching deeply nested data in one query without JOINs. Reduces round trips compared to normalized SQL." },
            { name: "CDN (Cloudflare/Fastly)", desc: "Global network of edge servers caching static content close to users. Also increasingly handles dynamic content.", why: "Serves assets from the nearest edge location, turning a 200ms cross-continent request into a 20ms local one." }
          ],
          concepts: [
            { term: "Cache Invalidation", def: "The hard problem: knowing when to remove stale data from cache. Options: TTL (time-based), write-through (update cache on write), or event-driven invalidation." },
            { term: "Cold Start", def: "When cache is empty (after deploy, cache flush, or new keys), all requests hit the database. Can cause cascading failures if not handled with thundering herd protection." }
          ],
          pros: ["Cost-effective for most apps.", "Well-understood patterns.", "Good durability guarantees."],
          cons: ["Cache invalidation is hard.", "Cold starts cause latency spikes.", "Database can become bottleneck."],
          exampleApp: "E-commerce Product Pages",
          exampleDesc: "Users expect pages to load in under 500ms. Product details don't change often, so cache them aggressively. Price/inventory might need shorter TTLs or event-driven invalidation.",
          note: "Focus on the Fan-out problem. 'Would you use Push (precompute feeds) or Pull (compute on read)?' - it depends on celebrity vs normal user ratio."
        },
        {
          label: "Async (Seconds+)",
          pattern: "Message Queue / Batch Processing",
          tech: [
            { name: "Apache Kafka", desc: "Distributed event streaming platform handling trillions of events per day. Persistent, scalable, and fault-tolerant.", why: "Decouples producers from consumers. Buffers traffic spikes. Consumers can catch up at their own pace without data loss." },
            { name: "S3 + Athena", desc: "Object storage with serverless SQL queries. Store petabytes cheaply and query them directly without loading into a database.", why: "When latency doesn't matter, you can use the cheapest storage (S3) and process it lazily. Perfect for analytics and audit logs." },
            { name: "Apache Spark", desc: "Distributed computing framework for large-scale data processing. Processes petabytes across thousands of nodes.", why: "Splits work across a cluster, processes in parallel, and aggregates results. Accepts minutes of latency for massive throughput." }
          ],
          concepts: [
            { term: "Backpressure", def: "What happens when consumers can't keep up with producers. Without backpressure handling, queues fill up and systems crash. Solutions: drop messages, slow producers, or scale consumers." },
            { term: "Dead Letter Queue", def: "Where messages go when they fail processing repeatedly. Prevents poison messages from blocking the queue while allowing manual inspection and replay." }
          ],
          pros: ["Massive throughput possible.", "Systems are decoupled.", "Built-in retry mechanisms."],
          cons: ["Poor real-time UX.", "Adds system complexity.", "Debugging is challenging."],
          exampleApp: "Video Transcoding Pipeline",
          exampleDesc: "When a user uploads a video, they don't expect it to be available instantly. Queue the job, process it when resources are available, notify them when done. Trying to do this synchronously would timeout.",
          note: "Always mention Backpressure. 'What happens if the queue fills up? We'd implement backpressure by rejecting new uploads with a 503 and showing a queue position.'"
        }
      ]
    },
    throughput: {
      title: "Read vs. Write Heavy",
      desc: "Is your system more like a Library (read-heavy) or a Sensor Network (write-heavy)? This ratio determines your database choice, caching strategy, and scaling approach.",
      stops: [
        {
          label: "Read Heavy (100:1)",
          pattern: "CQRS / Scatter-Gather / Aggressive Caching",
          tech: [
            { name: "CDN", desc: "Content Delivery Network caching content at hundreds of edge locations globally.", why: "Offloads read traffic from your origin servers. A popular page might be served millions of times from cache for every one origin fetch." },
            { name: "Varnish", desc: "HTTP accelerator designed for content-heavy dynamic websites. Caches entire HTTP responses.", why: "Sits in front of your application servers and caches full HTML pages. Can serve thousands of requests per second from a single node." },
            { name: "Read Replicas", desc: "Read-only copies of your primary database that stay in sync via replication.", why: "Scale reads horizontally by adding more replicas. Each replica can serve thousands of read queries per second." }
          ],
          concepts: [
            { term: "Thundering Herd", def: "When a popular cache key expires, thousands of requests simultaneously hit the database to regenerate it. Can cascade into full system failure. Mitigate with request coalescing or staggered TTLs." },
            { term: "Request Coalescing", def: "When multiple requests ask for the same uncached data simultaneously, only one fetches from the source while others wait. Prevents thundering herd." }
          ],
          pros: ["Cheap to scale reads.", "Stateless edge servers.", "Global reach via CDN."],
          cons: ["Cache coherence is hard.", "Replication lag issues.", "Stale data during updates."],
          exampleApp: "News Website / Wikipedia",
          exampleDesc: "Millions of people read the same article, but it's updated rarely. Cache it aggressively at the edge. A 5-minute TTL means at most one origin fetch per 5 minutes regardless of traffic.",
          note: "Thundering Herd protection is critical. Mention Request Coalescing - only one request fetches from DB while others wait for the result."
        },
        {
          label: "Balanced (10:1)",
          pattern: "Horizontal Sharding / Consistent Hashing",
          tech: [
            { name: "Vitess/CockroachDB", desc: "Sharding middleware for MySQL (Vitess) or distributed SQL (CockroachDB). Scales relational databases horizontally.", why: "When a single database can't handle your load, shard across multiple machines while maintaining SQL semantics." },
            { name: "MongoDB", desc: "Document database with built-in sharding based on a shard key. Auto-balances data across shards.", why: "Handles mixed read/write workloads well. Auto-sharding reduces operational overhead compared to manual sharding." }
          ],
          concepts: [
            { term: "Hot Keys/Partitions", def: "When one shard gets disproportionate traffic (e.g., celebrity user, viral post). Can overload that shard while others sit idle. Requires careful shard key selection." },
            { term: "Consistent Hashing", def: "Hashing scheme that minimizes data movement when nodes are added/removed. Only K/N keys need to move (K=keys, N=nodes) instead of rehashing everything." }
          ],
          pros: ["Predictable performance.", "Well-documented patterns.", "Scales both directions."],
          cons: ["Cross-shard queries are slow.", "Capacity planning required.", "Schema changes are painful."],
          exampleApp: "SaaS Application (B2B)",
          exampleDesc: "Each tenant has their own data that's read and written regularly. Shard by tenant_id so each tenant's data lives on one shard. Cross-tenant queries are rare and can be slow.",
          note: "Discuss Hot Keys. 'What if one shard gets 50% of traffic?' - solutions include splitting hot shards, caching hot keys, or rate limiting."
        },
        {
          label: "Write Heavy (1:100)",
          pattern: "Append-Only / LSM Tree / Event Sourcing",
          tech: [
            { name: "Cassandra", desc: "Wide-column store optimized for write-heavy workloads. Handles millions of writes per second across clusters.", why: "Uses LSM Trees (Log-Structured Merge Trees) which turn random writes into sequential writes, maximizing disk throughput." },
            { name: "Kafka", desc: "Append-only distributed log. Writes are sequential appends, the fastest possible disk operation.", why: "Acts as a buffer absorbing write spikes. Downstream systems consume at their own pace without losing data." },
            { name: "TimescaleDB", desc: "Time-series database built on PostgreSQL. Optimized for high-ingest rate of timestamped data.", why: "Automatically partitions data by time. Old data can be compressed or moved to cheaper storage without affecting write performance." }
          ],
          concepts: [
            { term: "LSM Tree", def: "Log-Structured Merge Tree. Writes go to an in-memory buffer, then flush to sorted files on disk. Background compaction merges files. Optimizes for write throughput at the cost of read amplification." },
            { term: "Bloom Filter", def: "Probabilistic data structure that quickly tells you if an element is definitely NOT in a set. Used to avoid unnecessary disk reads in LSM trees - check the filter before checking the file." }
          ],
          pros: ["Insane write throughput.", "Sequential I/O is fast.", "No locking contention."],
          cons: ["Reads are slower.", "No efficient JOINs.", "Data duplication."],
          exampleApp: "IoT Sensor Data / Metrics",
          exampleDesc: "Millions of sensors each reporting every second. You're writing constantly but only reading for dashboards or alerts. Optimize everything for ingestion speed; reads can be slower.",
          note: "The trade-off is Read Amplification - may need to check multiple LSM levels to find a key. Bloom Filters are mandatory to avoid checking files that don't contain your key."
        }
      ]
    },
    reliability: {
      title: "Reliability (The 9s)",
      desc: "Every additional '9' of availability costs roughly 10x more. 99.9% allows 8.7 hours of downtime per year; 99.99% allows only 52 minutes. Choose based on business impact of downtime.",
      stops: [
        {
          label: "99.9% (Single Region)",
          pattern: "N+1 Redundancy / Hot Standby",
          tech: [
            { name: "Load Balancer + App Servers", desc: "Distribute traffic across multiple application servers. If one fails, others continue serving.", why: "Basic redundancy - if you have 3 servers and one dies, the other 2 handle the load. The LB health-checks and removes failed nodes." },
            { name: "Primary-Replica Database", desc: "One primary handles writes, replicas handle reads. If primary fails, promote a replica.", why: "Standard database redundancy. Failover might take a few minutes and require manual intervention." }
          ],
          concepts: [
            { term: "Single Point of Failure (SPOF)", def: "Any component whose failure brings down the entire system. Goal is to identify and eliminate SPOFs through redundancy." },
            { term: "RTO/RPO", def: "Recovery Time Objective (how long until restored) and Recovery Point Objective (how much data loss is acceptable). Drive your backup and replication strategy." }
          ],
          pros: ["Simple to implement.", "Cost-effective.", "Easy to deploy and manage."],
          cons: ["Regional outages hurt.", "Failover may be manual.", "Maintenance causes downtime."],
          exampleApp: "Internal Tools / MVP",
          exampleDesc: "Your company's internal admin dashboard being down for an hour is annoying but not catastrophic. Don't over-engineer. A simple primary + standby in one region is sufficient.",
          note: "Don't over-engineer. Proposing multi-region active-active for an MVP is a red flag. Match the reliability investment to the business impact."
        },
        {
          label: "99.99% (Multi-AZ)",
          pattern: "High Availability / Auto-Failover",
          tech: [
            { name: "Multi-AZ RDS", desc: "Database automatically replicated across Availability Zones with automatic failover.", why: "If one AZ loses power or network, the database automatically fails over to the standby in another AZ within minutes." },
            { name: "Kubernetes / Auto Scaling", desc: "Container orchestration with automatic pod rescheduling and scaling.", why: "If a node dies, Kubernetes automatically reschedules pods to healthy nodes. Auto-scaling handles traffic spikes." }
          ],
          concepts: [
            { term: "Availability Zone", def: "Physically separate data centers within a region, with independent power, cooling, and networking. An AZ failure shouldn't affect other AZs in the same region." },
            { term: "Graceful Degradation", def: "System continues operating with reduced functionality when components fail. Show cached data if database is down, disable non-critical features under load." }
          ],
          pros: ["Survives datacenter failures.", "Automatic failover.", "Industry standard for production."],
          cons: ["Roughly 2x the infrastructure cost.", "Cross-AZ latency overhead.", "More complex networking (VPC)."],
          exampleApp: "E-commerce Checkout",
          exampleDesc: "Downtime during checkout directly loses money. Every minute down could be thousands in lost sales. Multi-AZ ensures a single datacenter failure doesn't stop transactions.",
          note: "Mention Graceful Degradation. 'If the recommendation service is down, we'd show generic recommendations rather than failing the whole page.'"
        },
        {
          label: "99.999% (Global/Multi-Region)",
          pattern: "Geo-Redundancy / Active-Active / Cell Architecture",
          tech: [
            { name: "Global Load Balancing", desc: "Routes traffic to the nearest healthy region using GeoDNS or Anycast.", why: "If an entire region goes down (rare but happens), traffic automatically routes to the next nearest healthy region." },
            { name: "Active-Active Multi-Region", desc: "All regions actively serve traffic simultaneously. No single master.", why: "No failover needed - every region is already serving. Requires solving consistency across regions (usually eventual)." }
          ],
          concepts: [
            { term: "Blast Radius", def: "The scope of impact when something fails. Cell-based architecture limits blast radius by isolating groups of users to independent cells/shards." },
            { term: "Chaos Engineering", def: "Intentionally injecting failures in production to verify resilience. Netflix's Chaos Monkey randomly kills instances to ensure the system handles it." }
          ],
          pros: ["Near-zero downtime.", "Global low latency.", "Survives regional disasters."],
          cons: ["Astronomical cost.", "Consistency is very hard.", "Testing is challenging."],
          exampleApp: "Global Payment Processor",
          exampleDesc: "Visa/Mastercard cannot go down. Ever. A global outage makes international news and costs millions per minute. This justifies massive investment in multi-region active-active.",
          note: "Cell-Based Architecture is the Staff-level pattern here. Isolate users into independent cells so a bug or overload only affects a subset, limiting blast radius."
        }
      ]
    },
    security: {
      title: "Security & Compliance",
      desc: "Security requirements dictate encryption depth, access controls, and audit capabilities. Over-securing public data wastes resources; under-securing PII causes breaches and fines.",
      stops: [
        {
          label: "Public / Open",
          pattern: "Static Hosting / CDN Edge",
          tech: [
            { name: "Public S3 + CloudFront", desc: "S3 bucket with public read access, CloudFront CDN in front for caching and DDoS protection.", why: "For truly public content (marketing site, public APIs, open datasets), this is the simplest and cheapest architecture." },
            { name: "API Keys (Rate Limiting)", desc: "Simple tokens to identify callers and enforce rate limits. Not for authentication, just tracking.", why: "Even public APIs need rate limiting to prevent abuse. API keys let you track usage and throttle bad actors." }
          ],
          concepts: [
            { term: "Signed URLs", def: "Time-limited URLs that grant temporary access to private resources. Useful for sharing private files without exposing permanent credentials." }
          ],
          pros: ["Maximum caching efficiency.", "Lowest latency.", "Simplest to implement."],
          cons: ["No privacy whatsoever.", "Vulnerable to scraping.", "API abuse risk."],
          exampleApp: "Marketing Website / Public API",
          exampleDesc: "Your company's marketing pages are meant to be seen by everyone. Encrypting or authenticating access would just slow things down and break SEO with no benefit.",
          note: "Public data shouldn't be encrypted at rest - it kills CDN efficiency. Focus on DDoS protection and rate limiting instead."
        },
        {
          label: "Private (Standard)",
          pattern: "Defense in Depth / Encryption at Rest & Transit",
          tech: [
            { name: "TLS Everywhere", desc: "HTTPS for all connections, including internal service-to-service communication.", why: "Encrypts data in transit. Prevents eavesdropping and man-in-the-middle attacks. Now standard - Chrome marks HTTP as 'Not Secure'." },
            { name: "RBAC + JWT/OAuth", desc: "Role-Based Access Control using industry-standard token formats and protocols.", why: "Users only access what they need. Tokens are stateless and verifiable. Integrates with identity providers." },
            { name: "KMS (Key Management Service)", desc: "Cloud service managing encryption keys with audit logging and automatic rotation.", why: "Encrypts data at rest. If someone steals your hard drive or database dump, they can't read it without the keys." }
          ],
          concepts: [
            { term: "Tokenization", def: "Replacing sensitive data (like SSN or credit card) with non-sensitive tokens. The mapping is stored securely elsewhere. Reduces exposure if your database is breached." },
            { term: "Principle of Least Privilege", def: "Users and services should have only the minimum permissions necessary. Reduces blast radius when credentials are compromised." }
          ],
          pros: ["Industry standard compliance.", "Protected if disks stolen.", "Balanced security/usability."],
          cons: ["Key management complexity.", "TLS termination overhead.", "Internal threats remain."],
          exampleApp: "B2B SaaS Application",
          exampleDesc: "Your customers' business data is private but not regulated. Standard encryption in transit and at rest, proper authentication, and audit logs cover your bases without going overboard.",
          note: "Tokenization in logs is often overlooked. 'We tokenize PII before logging so a log breach doesn't expose customer data.'"
        },
        {
          label: "Regulated (HIPAA/PCI/SOC2)",
          pattern: "Zero Trust / Encryption Enclaves / Client-Side Encryption",
          tech: [
            { name: "HSM (Hardware Security Module)", desc: "Tamper-resistant hardware device that stores cryptographic keys. Keys never leave the device.", why: "For PCI compliance, encryption keys must be stored in certified hardware. Even root access to the server can't extract the keys." },
            { name: "Field-Level Encryption", desc: "Encrypting specific database columns containing sensitive data with separate keys.", why: "Even if database is fully compromised, attacker can't read encrypted fields without separate key access. Defense in depth." }
          ],
          concepts: [
            { term: "Zero Trust", def: "Security model assuming the network is compromised. Every request must be authenticated and authorized, even internal ones. 'Never trust, always verify.'" },
            { term: "Homomorphic Encryption", def: "Encryption allowing computation on encrypted data without decrypting. Early stages but enables processing sensitive data without exposure." }
          ],
          pros: ["Meets strict compliance.", "Defense against insiders.", "Audit trail everything."],
          cons: ["Significant latency impact.", "Very expensive.", "Difficult to debug."],
          exampleApp: "Healthcare Records System",
          exampleDesc: "HIPAA violations can cost millions in fines. Patient data must be encrypted at rest, in transit, and access must be logged. Field-level encryption ensures even DBAs can't read patient names.",
          note: "Client-Side Encryption (where you never see plaintext) implies an extreme threat model. Only use when you genuinely can't be trusted with the data."
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

    // Update Example Application
    document.getElementById('sds-example-app').innerText = stop.exampleApp || '';
    document.getElementById('sds-example-desc').innerText = stop.exampleDesc || '';

    renderList('sds-pros', stop.pros);
    renderList('sds-cons', stop.cons);
    document.getElementById('sds-note').innerText = stop.note;
  }

  // Initialize
  slider.addEventListener('input', updateUI);
  updateUI();

})();
</script>

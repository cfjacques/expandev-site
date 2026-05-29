import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/png;base64,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";

const C = {
  bg: "#06091a",
  surface: "#0b1028",
  surface2: "#111827",
  blue: "#1a56ff",
  blueDim: "#0e3acc",
  cyan: "#00d4ff",
  purple: "#7c3aed",
  text: "#eef2ff",
  muted: "#7a8499",
  border: "rgba(255,255,255,0.07)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Figtree', sans-serif; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5,h6 { font-family: 'Syne', sans-serif; }
  a { color: inherit; text-decoration: none; }
  html { scroll-behavior: smooth; }
  ::selection { background: rgba(26,86,255,.35); }
  input, textarea, select { font-family: 'Figtree', sans-serif; }
`;

/* ─── Shared ─── */
const Wrap = ({ children, style }) => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", ...style }}>
    {children}
  </div>
);

const Eyebrow = ({ children }) => (
  <p style={{ fontFamily: "Syne, sans-serif", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: C.cyan, marginBottom: "1rem" }}>
    {children}
  </p>
);

const Tag = ({ children, color = C.blue }) => (
  <span style={{ display: "inline-block", padding: ".3rem .8rem", borderRadius: 4, border: `1px solid ${color}44`, background: `${color}12`, fontSize: ".72rem", fontFamily: "Syne, sans-serif", fontWeight: 600, color: `${color}`, letterSpacing: ".08em" }}>
    {children}
  </span>
);

const Btn = ({ children, primary, onClick, style }) => (
  <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".72rem 1.6rem", borderRadius: 6, border: primary ? "none" : `1px solid ${C.border}`, background: primary ? C.blue : "transparent", color: C.text, fontFamily: "Syne, sans-serif", fontSize: ".875rem", fontWeight: 600, cursor: "pointer", transition: "all .2s", letterSpacing: ".03em", ...style }}>
    {children}
  </button>
);

const Card = ({ children, featured, style }) => (
  <div style={{ background: C.surface, border: `1px solid ${featured ? C.blue : C.border}`, borderRadius: 14, padding: "1.75rem", transition: "border-color .25s, transform .25s", ...style }}>
    {children}
  </div>
);

/* ─── Nav ─── */
const PAGES = [
  { id: "home", label: "Home" },
  { id: "platform", label: "Platform" },
  { id: "governance", label: "Governance" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

function Nav({ current, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, backdropFilter: scrolled ? "blur(16px)" : "none", background: scrolled ? "rgba(6,9,26,.88)" : "transparent", transition: "all .3s" }}>
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <img src={LOGO} alt="expandev" style={{ height: 26, cursor: "pointer" }} onClick={() => navigate("home")} />
        <div style={{ display: "flex", gap: "2rem" }}>
          {PAGES.filter(p => p.id !== "home").map(p => (
            <button key={p.id} onClick={() => navigate(p.id)} style={{ background: "none", border: "none", color: current === p.id ? C.text : C.muted, fontFamily: "Syne, sans-serif", fontSize: ".875rem", fontWeight: 500, cursor: "pointer", transition: "color .2s" }}>
              {p.label}
            </button>
          ))}
        </div>
        <Btn primary onClick={() => navigate("contact")}>Talk to sales</Btn>
      </Wrap>
    </nav>
  );
}

/* ─── Home Page ─── */
function HomePage({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 0 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)" }} />
        <div style={{ position: "absolute", top: "-20%", left: "-5%", width: "50%", height: "70%", background: "radial-gradient(ellipse,rgba(26,86,255,.14) 0%,transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <Wrap style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left: copy */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".38rem 1rem", borderRadius: 100, border: "1px solid rgba(26,86,255,.4)", background: "rgba(26,86,255,.1)", fontSize: ".72rem", fontWeight: 500, color: "rgba(200,215,255,.85)", marginBottom: "1.75rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.cyan, display: "inline-block" }} />
                ISO 42001 · NIST AI RMF · EU AI Act
              </div>
              <h1 style={{ fontSize: "clamp(1.9rem,3vw,2.75rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: "1.25rem", letterSpacing: "-.022em" }}>
                AI speed.<br />
                <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#1a56ff,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Engineering</span> quality.<br />
                Auditable governance.
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(200,215,255,.62)", marginBottom: "2rem", fontWeight: 300, lineHeight: 1.8 }}>
                Enterprise-grade software, from briefing to release. expandev governs how AI builds your software — every line traceable, compliant, and owned by humans.
              </p>
              <div style={{ display: "flex", gap: ".875rem", flexWrap: "wrap" }}>
                <Btn primary onClick={() => navigate("contact")}>Book a demo</Btn>
                <Btn onClick={() => navigate("platform")}>See the platform →</Btn>
              </div>
            </div>
            {/* Right: framework tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "ISO / IEC 42001", sub: "AI Management System", color: C.blue },
                { label: "NIST AI RMF", sub: "Risk Management Framework", color: C.cyan },
                { label: "EU AI Act", sub: "European Regulation", color: C.purple },
                { label: "GAISD", sub: "Governed AI Software Development", color: "#22c55e" },
              ].map(fw => (
                <div key={fw.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${fw.color}`, borderRadius: 8, padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: ".95rem", marginBottom: ".2rem" }}>{fw.label}</p>
                    <p style={{ fontSize: ".78rem", color: C.muted }}>{fw.sub}</p>
                  </div>
                  <span style={{ fontSize: ".7rem", color: fw.color, fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: ".08em" }}>ALIGNED</span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* Paradox */}
      <section style={{ background: C.surface, padding: "6rem 0" }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <Eyebrow>The Generative AI Paradox</Eyebrow>
              <p style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "1.25rem" }}>
                <em style={{ color: C.muted, fontStyle: "italic" }}>Code is generated in seconds. Architectures emerge from prompts.</em>{" "}
                <strong style={{ color: C.text }}>AI has changed how software is built — but not who is responsible for it.</strong>
              </p>
              <p style={{ fontSize: ".9rem", color: C.muted, lineHeight: 1.75 }}>When AI generates code without boundaries, decisions become implicit, logic becomes untraceable, and organizational risk compounds silently. Speed without governance isn't productivity — it's compounding risk.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[
                { label: "Visible gains", icon: "✓", color: "#22c55e", items: ["Implementation speed", "Democratized development", "Productivity on repetitive tasks"] },
                { label: "Blind spots", icon: "⊘", color: C.muted, items: ["Fragmented tooling", "Speed asymmetry", "Hidden human-AI boundary"] },
              ].map(col => (
                <div key={col.label}>
                  <p style={{ fontSize: ".7rem", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: col.color, marginBottom: ".75rem" }}>{col.label}</p>
                  {col.items.map(item => (
                    <div key={item} style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", padding: ".4rem 0", borderBottom: `1px solid ${C.border}`, fontSize: ".875rem", color: "rgba(200,215,255,.75)" }}>
                      <span style={{ color: col.color, flexShrink: 0 }}>{col.icon}</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* Risk */}
      <section style={{ padding: "6rem 0" }}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".75rem" }}>
              Speed without governance isn't productivity —<br />
              <em style={{ fontStyle: "italic", color: C.blue }}>it's compounding risk.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
            {[
              { icon: "🗂️", bg: "rgba(26,86,255,.12)", title: "Fragile Systems", desc: "Code generated without standards collapses at scale. What works in a demo breaks in production." },
              { icon: "🧠", bg: "rgba(124,58,237,.12)", title: "Implicit Decisions", desc: "No one knows why a technical decision was made. Architecture becomes accidental, not intentional." },
              { icon: "🔍", bg: "rgba(0,212,255,.08)", title: "Untraceable Logic", desc: "No decision history means no audit is possible. Regulators and clients can't verify anything." },
              { icon: "🛡️", bg: "rgba(239,68,68,.1)", title: "Organizational Risk", desc: "Compliance, security, and maintainability are all compromised. Liability propagates silently." },
            ].map(card => (
              <Card key={card.title}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "1.25rem" }}>{card.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem" }}>{card.title}</h3>
                <p style={{ fontSize: ".85rem", color: C.muted, lineHeight: 1.65 }}>{card.desc}</p>
              </Card>
            ))}
          </div>
        </Wrap>
      </section>

      {/* How it works */}
      <section style={{ background: C.surface, padding: "6rem 0" }}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Eyebrow>How it works</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".75rem" }}>Four stages. One governed pipeline.</h2>
            <p style={{ color: "rgba(200,215,255,.6)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>From business intent to auditable source code — every step is structured, traced, and human-owned.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "2.75rem", left: "calc(12.5% + 1.75rem)", right: "calc(12.5% + 1.75rem)", height: 1, background: `linear-gradient(90deg,${C.blue},${C.cyan})` }} />
            {[
              { n: "1", title: "Declare", desc: "Objective, scope, business rules, and requirements are defined by the user — not inferred by AI.", bg: C.blue },
              { n: "2", title: "Structure", desc: "Processes, data, integrations, and architecture are defined before any code generation begins.", bg: C.purple },
              { n: "3", title: "Generate", desc: "AI generates code exclusively within the declared functional and architectural boundaries.", bg: "#374151" },
              { n: "4", title: "Trace", desc: "Decisions, requirements, and deliverables stay linked, auditable, and explainable — permanently.", bg: "#15803d" },
            ].map(step => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontSize: "1.15rem", fontWeight: 800, margin: "0 auto 1.25rem", position: "relative", zIndex: 1, boxShadow: `0 0 0 6px ${step.bg}22` }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem" }}>{step.title}</h3>
                <p style={{ fontSize: ".825rem", color: C.muted, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 0" }}>
        <Wrap>
          <div style={{ background: `linear-gradient(135deg, rgba(26,86,255,.15), rgba(0,212,255,.08))`, border: `1px solid rgba(26,86,255,.25)`, borderRadius: 20, padding: "4rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,2.3vw,2.1rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: "1rem" }}>Ready to govern your AI development?</h2>
            <p style={{ color: "rgba(200,215,255,.6)", fontSize: "1rem", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>Join engineering teams building compliant, auditable software with expandev.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <Btn primary onClick={() => navigate("contact")}>Book a demo</Btn>
              <Btn onClick={() => navigate("pricing")}>See pricing</Btn>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}

/* ─── Platform Page ─── */
function PlatformPage({ navigate }) {
  const caps = [
    { icon: "💬", color: "rgba(26,86,255,.12)", tag: "Context Orchestration & AI FinOps", title: "Centralization, Cost Governance & Shadow AI Elimination", desc: "Acts as a central bus for LLMs, eliminating tool fragmentation and Shadow AI risk. Restricts context to project boundaries to ensure financial governance and full traceability." },
    { icon: "✅", color: "rgba(124,58,237,.12)", tag: "Requirements Engineering (Spec-Driven)", title: "Business rules declared by humans, structured by the platform", desc: "Transforms intentions into structured specifications through an AI-accelerated pipeline. Every rule is reviewed item by item, with approval workflows and immediate technical review." },
    { icon: "🏗️", color: "rgba(0,212,255,.08)", tag: "Contract-Based Architectural Compliance", title: "No code generated without prior architectural definition", desc: "Software architecture becomes a rigorous system contract. Any code suggestion violating the organization's security or structural policies is rejected at the source." },
    { icon: "</>", color: "rgba(34,197,94,.1)", tag: "Absolute Code Provenance Control", title: "End-to-End Bidirectional Traceability", desc: "Generates AI BOM (Bill of Materials) for every software increment. Every component is linked to its original requirement, architectural constraint, and the human who approved it." },
    { icon: "🔄", color: "rgba(249,115,22,.1)", tag: "Impact & Sync Management", title: "Dynamic Alignment Between Business, Architecture & Source Code", desc: "Any functional or technical change triggers a three-dimensional impact and risk analysis. Ensures consistency across concurrent users and in-progress definitions." },
    { icon: "👁️", color: "rgba(239,68,68,.08)", tag: "Continuous Auditing & Explainability", title: "Native Compliance with AI Governance Frameworks", desc: "Every decision and human-AI interaction is saved to immutable append-only logs with strict timestamp controls. Natively meets ISO 42001 and NIST AI RMF accountability requirements." },
  ];

  return (
    <div style={{ paddingTop: "5rem" }}>
      <section style={{ background: C.surface, padding: "5rem 0 4rem" }}>
        <Wrap>
          <Eyebrow>Platform</Eyebrow>
          <h1 style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: "1rem", maxWidth: 700 }}>Six modules. Full governed SDLC.</h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(200,215,255,.6)", maxWidth: 600, fontWeight: 300, lineHeight: 1.75 }}>Every plan ships the complete governed software development lifecycle. Governance is never tier-gated — what changes between plans is DVU volume, not governance quality.</p>
        </Wrap>
      </section>
      <section style={{ padding: "5rem 0" }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {caps.map(cap => (
              <div key={cap.tag} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "2rem", transition: "border-color .25s" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: cap.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "1.25rem" }}>{cap.icon}</div>
                <p style={{ fontSize: ".7rem", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.cyan, marginBottom: ".5rem" }}>{cap.tag}</p>
                <h3 style={{ fontSize: ".975rem", fontWeight: 700, marginBottom: ".6rem", lineHeight: 1.35 }}>{cap.title}</h3>
                <p style={{ fontSize: ".85rem", color: C.muted, lineHeight: 1.7 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Why expandev comparison */}
      <section style={{ background: C.surface, padding: "5rem 0" }}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow>Why expandev</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.5rem,2.3vw,2.1rem)", fontWeight: 800, letterSpacing: "-.02em" }}>AI can generate code.<br />Only governance can build software.</h2>
          </div>
          <div style={{ background: C.bg, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", background: C.surface2 }}>
              {["Capability", "Code assistants / prompt-to-code", "expandev"].map((h, i) => (
                <div key={h} style={{ padding: "1rem 1.5rem", fontFamily: "Syne, sans-serif", fontSize: ".8rem", fontWeight: 700, color: i === 2 ? "#fff" : C.muted, background: i === 2 ? C.blue : "transparent", textAlign: i === 2 ? "center" : "left" }}>{h}</div>
              ))}
            </div>
            {[
              ["Scope", "Code generation only", "✓ End-to-end governed SDLC"],
              ["Business rules", "Inferred by the model", "✓ Declared by the user"],
              ["Architecture", "Emergent (accidental)", "✓ Pre-defined and mandatory"],
              ["Traceability", "Non-existent", "✓ Complete and auditable"],
              ["ISO 42001 audit evidence", "✕ Not generated", "✓ Native output"],
              ["NIST AI RMF alignment", "✕ Not mapped", "✓ Built into every step"],
              ["Human accountability", "Diluted — no named owner", "✓ Clear human ownership"],
              ["Vendor lock-in", "Cloud provider dependent", "✓ Fully vendor-agnostic"],
            ].map(([cap, code, exp], i) => (
              <div key={cap} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "rgba(255,255,255,.012)" : "transparent" }}>
                <div style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: ".875rem" }}>{cap}</div>
                <div style={{ padding: "1rem 1.5rem", color: C.muted, fontSize: ".875rem" }}>{code}</div>
                <div style={{ padding: "1rem 1.5rem", color: exp.startsWith("✓") ? "#22c55e" : "#6b7280", fontSize: ".875rem", textAlign: "center", fontWeight: exp.startsWith("✓") ? 600 : 400 }}>{exp}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: ".875rem", color: C.muted }}>Already using GitHub Copilot, AWS Kiro, or IBM Bob? <strong style={{ color: C.blue }}>expandev is the governance layer those tools don't provide.</strong></p>
        </Wrap>
      </section>
    </div>
  );
}

/* ─── Governance Page ─── */
function GovernancePage() {
  const principles = [
    { n: "01", title: "Human Intentionality", desc: "Every AI-generated output must originate from explicit, declared user intent. No autonomous inference of business rules." },
    { n: "02", title: "Structural Governance", desc: "AI operates within clear architectural boundaries, defined upfront. Architecture is a contract, not a suggestion." },
    { n: "03", title: "Business Rule Sovereignty", desc: "Business rules must be authored and owned by humans — regardless of the extent to which AI supports their formulation." },
    { n: "04", title: "Traceability", desc: "Decisions are explainable, versionable, and auditable across the entire development cycle — from brief to deploy." },
    { n: "05", title: "Human Accountability", desc: "AI is a tool, not a scapegoat. The responsibility for every output rests with a named human approver." },
  ];

  return (
    <div style={{ paddingTop: "5rem" }}>
      <section style={{ background: C.surface, padding: "5rem 0 4rem" }}>
        <Wrap>
          <Eyebrow>Governance</Eyebrow>
          <h1 style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: "1rem", maxWidth: 700 }}>Aligned with the global AI governance movement.</h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(200,215,255,.6)", maxWidth: 580, fontWeight: 300, lineHeight: 1.75 }}>expandev implements the GAISD principles and natively aligns with the frameworks that define AI accountability across every major regulatory market.</p>
        </Wrap>
      </section>

      {/* GAISD */}
      <section style={{ padding: "5rem 0" }}>
        <Wrap>
          <div style={{ background: "rgba(26,86,255,.07)", border: "1px solid rgba(26,86,255,.22)", borderRadius: 20, padding: "3.5rem", textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "5rem", fontFamily: "Syne, sans-serif", fontWeight: 800, letterSpacing: "-.04em", background: "linear-gradient(135deg,#fff,rgba(255,255,255,.35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>GAISD</div>
            <p style={{ color: "rgba(200,215,255,.55)", marginTop: ".5rem", fontSize: "1rem", fontWeight: 300 }}>Governed AI Software Development</p>
            <p style={{ color: "rgba(200,215,255,.8)", marginTop: "1.5rem", fontStyle: "italic", fontSize: "1.05rem" }}>"Defines how software gets built when AI is in the loop."</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {[
              { title: "ISO / IEC 42001", sub: "AI Management", desc: "The first international standard for AI management systems. Requires continuous governance over the AI model lifecycle.", accent: C.blue },
              { title: "EU AI Act", sub: "European Regulation", desc: "European regulation establishing risk-based obligations for AI. Core provisions, GPAI obligations, and penalties are active now.", accent: C.purple },
              { title: "NIST AI RMF", sub: "Risk Management", desc: "The US government framework for managing AI risk and improving the trustworthiness of AI systems across the organization.", accent: C.cyan },
            ].map(fw => (
              <div key={fw.title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${fw.accent}`, borderRadius: 10, padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".25rem" }}>{fw.title}</h3>
                <p style={{ fontSize: ".75rem", color: fw.accent, fontFamily: "Syne, sans-serif", fontWeight: 600, letterSpacing: ".08em", marginBottom: ".75rem", textTransform: "uppercase" }}>{fw.sub}</p>
                <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>{fw.desc}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* 5 Principles */}
      <section style={{ background: C.surface, padding: "5rem 0" }}>
        <Wrap>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Eyebrow>5 GAISD Principles</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.5rem,2.3vw,2.1rem)", fontWeight: 800, letterSpacing: "-.02em" }}>At expandev, AI executes —<br />humans govern.</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {principles.map((p, i) => (
              <div key={p.n} style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.5rem", padding: "1.75rem 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none", alignItems: "start" }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "rgba(26,86,255,.25)", lineHeight: 1 }}>{p.n}</div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".4rem" }}>{p.title}</h3>
                  <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>
    </div>
  );
}

/* ─── Pricing Page ─── */
function PricingPage({ navigate }) {
  const tiers = [
    { id: "team", label: "Team", best: "Teams up to 10 developers adopting governed AI development", price: "$1,500", dvu: "500 DVUs included", overage: "$0.95 / DVU overage", featured: false, features: ["Full governed SDLC", "ISO 42001 audit evidence", "NIST AI RMF alignment", "Code Provenance (AI BOM)", "Continuous auditing logs"] },
    { id: "pro", label: "Professional", best: "Engineering orgs standardizing governance across teams", price: "$3,500", dvu: "3,000 DVUs included", overage: "$0.80 / DVU overage", featured: true, features: ["Everything in Team", "Multi-team workspace", "Advanced impact analysis", "Priority support", "Custom integrations"] },
    { id: "ent", label: "Enterprise", best: "Regulated, production-scale delivery at 30+ developers", price: "$10,000", dvu: "12,000 DVUs included", overage: "$0.60 / DVU overage", featured: false, features: ["Everything in Professional", "Dedicated SLA & support", "VPC / on-prem options", "Custom MSA contracts", "Annual pricing available"] },
  ];

  return (
    <div style={{ paddingTop: "5rem" }}>
      <section style={{ background: C.surface, padding: "5rem 0 4rem" }}>
        <Wrap>
          <Eyebrow>Pricing</Eyebrow>
          <h1 style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: "1rem", maxWidth: 640 }}>A fixed plan, plus exactly what you use.</h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(200,215,255,.6)", maxWidth: 580, fontWeight: 300, lineHeight: 1.75 }}>Every plan pairs a predictable monthly fee with a bundle of Dev Units (DVUs). Governance is never tier-gated — every plan ships the full governed SDLC.</p>
        </Wrap>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <Wrap>
          {/* DVU explain */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "2rem", maxWidth: 680, margin: "0 auto 4rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".5rem" }}>What's a DVU?</h3>
            <p style={{ fontSize: ".9rem", color: C.muted, lineHeight: 1.75 }}>A Dev Unit (DVU) is expandev's unit of consumption. Every operation the platform runs — generating code, structuring a specification, running an architectural analysis — consumes a measured number of DVUs. The larger the plan, the lower your effective cost per DVU.</p>
          </div>

          {/* Tiers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {tiers.map(tier => (
              <div key={tier.id} style={{ background: C.surface, border: `1px solid ${tier.featured ? C.blue : C.border}`, borderRadius: 14, padding: "2rem", position: "relative", ...(tier.featured ? { background: "rgba(26,86,255,.07)" } : {}) }}>
                {tier.featured && (
                  <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: C.blue, color: "#fff", fontSize: ".68rem", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: ".25rem .9rem", borderRadius: "0 0 6px 6px" }}>Most Popular</div>
                )}
                <p style={{ fontSize: ".7rem", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.cyan, marginBottom: ".75rem" }}>{tier.label}</p>
                <p style={{ fontSize: ".825rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.5, minHeight: "2.5rem" }}>{tier.best}</p>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2.5rem", fontWeight: 800, lineHeight: 1, marginBottom: ".25rem" }}>{tier.price}<span style={{ fontSize: "1rem", fontWeight: 400, color: C.muted }}>/mo</span></div>
                <p style={{ fontSize: ".825rem", color: C.muted, marginBottom: ".25rem" }}>{tier.dvu}</p>
                <p style={{ fontSize: ".825rem", color: C.muted, marginBottom: "1.75rem" }}>{tier.overage}</p>
                <div style={{ height: 1, background: C.border, margin: "0 0 1.25rem" }} />
                {tier.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: ".6rem", alignItems: "center", fontSize: ".875rem", color: "rgba(200,215,255,.78)", padding: ".3rem 0" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </div>
                ))}
                <button onClick={() => navigate("contact")} style={{ display: "block", width: "100%", marginTop: "1.5rem", padding: ".75rem", borderRadius: 6, border: tier.featured ? "none" : `1px solid ${C.border}`, background: tier.featured ? C.blue : "transparent", color: C.text, fontFamily: "Syne, sans-serif", fontSize: ".875rem", fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
                  Talk to sales
                </button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: ".825rem", color: C.muted, fontStyle: "italic" }}>Governance is never tier-gated. All plans include the full governed SDLC. Plans differ on DVU volume and price, not governance quality.</p>
        </Wrap>
      </section>
    </div>
  );
}

/* ─── Contact Page ─── */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const field = (label, children) => (
    <div>
      <label style={{ display: "block", fontSize: ".78rem", fontFamily: "Syne, sans-serif", fontWeight: 600, color: C.muted, marginBottom: ".4rem", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</label>
      {children}
    </div>
  );
  const inp = { width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: ".75rem 1rem", color: C.text, fontSize: ".9rem", outline: "none", fontFamily: "Figtree, sans-serif" };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <section style={{ background: C.surface, padding: "5rem 0 4rem" }}>
        <Wrap>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: "1rem", maxWidth: 640 }}>Ready to govern your AI development?</h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(200,215,255,.6)", maxWidth: 540, fontWeight: 300, lineHeight: 1.75 }}>Tell us about your team and we'll find the right plan together. We typically respond within one business day.</p>
        </Wrap>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              {sent ? (
                <div style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ fontWeight: 700, marginBottom: ".5rem" }}>Message sent!</h3>
                  <p style={{ color: C.muted, fontSize: ".9rem" }}>We'll be in touch within one business day.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {field("First name", <input placeholder="Jane" style={inp} />)}
                    {field("Last name", <input placeholder="Smith" style={inp} />)}
                  </div>
                  {field("Work email", <input type="email" placeholder="jane@company.com" style={inp} />)}
                  {field("Company", <input placeholder="Acme Corp" style={inp} />)}
                  {field("Team size (developers)",
                    <select style={inp}>
                      <option value="">Select range</option>
                      {["1–10", "11–30", "31–100", "100+"].map(r => <option key={r}>{r}</option>)}
                    </select>
                  )}
                  {field("What brings you here?",
                    <textarea placeholder="Tell us about your current challenge with AI-assisted development, compliance requirements, or what you're trying to solve..." style={{ ...inp, minHeight: 110, resize: "vertical" }} />
                  )}
                  <button onClick={() => setSent(true)} style={{ padding: ".875rem", background: C.blue, color: "#fff", border: "none", borderRadius: 7, fontFamily: "Syne, sans-serif", fontSize: ".9rem", fontWeight: 700, cursor: "pointer", letterSpacing: ".04em" }}>
                    Send message →
                  </button>
                  <p style={{ fontSize: ".75rem", color: C.muted, textAlign: "center" }}>No spam. Your information is used only to follow up on your inquiry.</p>
                </div>
              )}
            </div>
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {[
                { icon: "🎯", title: "Enterprise-focused", desc: "We work exclusively with engineering organizations building AI-powered software in regulated or high-stakes environments." },
                { icon: "⚡", title: "Fast response", desc: "Our team responds within one business day. For urgent compliance needs, mention it and we'll prioritize." },
                { icon: "📋", title: "Custom demo", desc: "Every demo is tailored to your stack, your compliance framework, and your team's specific challenges." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: ".1rem" }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: ".35rem" }}>{item.title}</h3>
                    <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}

/* ─── Footer ─── */
function Footer({ navigate }) {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "3rem 0 2rem" }}>
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <img src={LOGO} alt="expandev" style={{ height: 22, marginBottom: "1rem" }} />
            <p style={{ fontSize: ".85rem", color: C.muted, lineHeight: 1.7, maxWidth: 240 }}>Governed AI Software Development. Control, traceability, and human accountability for every line of AI-generated code.</p>
          </div>
          {[
            { title: "Platform", links: [["platform", "Overview"], ["platform", "Context & FinOps"], ["platform", "Spec-Driven Requirements"], ["platform", "Architectural Compliance"], ["platform", "Code Provenance"]] },
            { title: "Solutions", links: [["platform", "Engineering Leaders"], ["platform", "Compliance & GRC"], ["platform", "Financial Services"], ["platform", "Healthcare"], ["platform", "Public Sector"]] },
            { title: "Company", links: [["governance", "Governance"], ["pricing", "Pricing"], ["contact", "Contact"]] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "Syne, sans-serif", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(200,215,255,.4)", marginBottom: "1rem" }}>{col.title}</p>
              {col.links.map(([page, label]) => (
                <button key={label} onClick={() => navigate(page)} style={{ display: "block", background: "none", border: "none", color: C.muted, fontSize: ".875rem", cursor: "pointer", padding: ".3rem 0", textAlign: "left", transition: "color .2s" }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: ".8rem", color: C.muted }}>© 2026 expandev, Inc. All rights reserved.</p>
          <p style={{ fontSize: ".8rem", color: C.muted }}>ISO 42001 · NIST AI RMF · EU AI Act · GAISD</p>
        </div>
      </Wrap>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <Nav current={page} navigate={navigate} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "platform" && <PlatformPage navigate={navigate} />}
      {page === "governance" && <GovernancePage />}
      {page === "pricing" && <PricingPage navigate={navigate} />}
      {page === "contact" && <ContactPage />}
      <Footer navigate={navigate} />
    </div>
  );
}

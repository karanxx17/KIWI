"use client";
import { useState, useEffect, useRef, type RefObject, type MouseEvent } from "react";
import Navbar from "@/app/components/Navbar";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Service {
  id: string;
  icon: string;
  tag: string;
  title: string;
  short: string;
  desc: string;
  features: string[];
  img: string;
  accent: string;
  light: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface FloatingPill {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
  rot: string;
}

type FilterKey = "All" | "Growth" | "Creative" | "Technical";

/* ─────────────────────────────────────────
   useInView hook — fully typed
───────────────────────────────────────── */
function useInView(threshold = 0.1): [RefObject<HTMLElement| null>, boolean] {
  const ref = useRef<HTMLElement| null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SERVICES: Service[] = [
  {
    id: "smm",
    icon: "📱",
    tag: "01",
    title: "Social Media Marketing",
    short: "Build a powerful community that converts.",
    desc: "Build a strong social media presence with expert management services. We create engaging content, manage profiles, and run campaigns to boost engagement and grow your following across every platform.",
    features: ["Content Strategy & Calendar", "Profile Management", "Community Engagement", "Campaign Execution", "Analytics & Reporting"],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&q=85",
    accent: "#6DBF3E",
    light: "#EBF8D8",
  },
  {
    id: "seo",
    icon: "🔍",
    tag: "02",
    title: "SEO Services",
    short: "Rank higher. Get found. Grow organically.",
    desc: "Boost your website&apos;s visibility and rank higher on search engines with expert SEO strategies to drive organic traffic, improve domain authority, and build a lasting online presence.",
    features: ["Technical SEO Audit", "On-Page Optimisation", "Link Building", "Keyword Research", "Monthly Reporting"],
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=700&q=85",
    accent: "#3B82F6",
    light: "#EFF6FF",
  },
  {
    id: "ads",
    icon: "🎯",
    tag: "03",
    title: "Google & Meta Ads",
    short: "Every rupee working harder for you.",
    desc: "Maximize ROI with targeted ad campaigns on Google and Meta platforms. We research, build, and continuously optimise your ad budget for maximum conversions and measurable results.",
    features: ["Campaign Architecture", "Audience Targeting", "A/B Creative Testing", "Bid Optimisation", "Conversion Tracking"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=85",
    accent: "#F97316",
    light: "#FFF7ED",
  },
  {
    id: "content",
    icon: "✍️",
    tag: "04",
    title: "Content Creation",
    short: "Words and visuals that earn attention.",
    desc: "Engage your audience with compelling, high-quality content that drives traffic, builds brand authority, and converts visitors into loyal customers across every digital touchpoint.",
    features: ["Blog & Article Writing", "Copywriting", "Graphic Design", "Infographics", "Brand Storytelling"],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=85",
    accent: "#8B5CF6",
    light: "#F5F3FF",
  },
  {
    id: "reels",
    icon: "🎬",
    tag: "05",
    title: "Reels & Short Video Editing",
    short: "Scroll-stopping content for the short-form era.",
    desc: "Create viral-worthy short videos and reels that capture attention instantly, boost engagement, and grow your social media following rapidly across Instagram, TikTok, and YouTube Shorts.",
    features: ["Script & Storyboard", "Professional Editing", "Captions & Motion Graphics", "Music & SFX", "Platform Optimisation"],
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=85",
    accent: "#EC4899",
    light: "#FDF2F8",
  },
  {
    id: "web",
    icon: "💻",
    tag: "06",
    title: "Website Design & Development",
    short: "Your website should work as hard as you do.",
    desc: "Build a powerful online presence with responsive, user-friendly websites designed to convert visitors into customers and drive sustainable business growth effectively.",
    features: ["UI/UX Design", "Responsive Development", "CMS Integration", "Speed Optimisation", "Ongoing Maintenance"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=85",
    accent: "#14B8A6",
    light: "#F0FDFA",
  },
  {
    id: "youtube",
    icon: "▶️",
    tag: "07",
    title: "YouTube Marketing",
    short: "Grow your channel into a brand asset.",
    desc: "Grow your YouTube channel with strategic video marketing. We optimise content for discovery, manage ads, and build subscriber funnels for maximum reach and monetisation potential.",
    features: ["Channel Optimisation", "SEO for YouTube", "Thumbnail Design", "Ad Campaign Management", "Subscriber Growth Strategy"],
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&q=85",
    accent: "#EF4444",
    light: "#FEF2F2",
  },
  {
    id: "influencer",
    icon: "🤝",
    tag: "08",
    title: "Influencer Marketing",
    short: "Borrow trust. Amplify reach. Win credibility.",
    desc: "Amplify your brand reach through strategic influencer partnerships. We connect you with relevant, high-impact influencers to boost credibility, awareness, and conversions authentically.",
    features: ["Influencer Discovery & Vetting", "Campaign Briefing", "Contract Management", "Performance Tracking", "ROI Analysis"],
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=85",
    accent: "#F59E0B",
    light: "#FFFBEB",
  },
  {
    id: "gmb",
    icon: "📍",
    tag: "09",
    title: "Local Business Listing & GMB",
    short: "Dominate your neighbourhood search results.",
    desc: "Dominate local search with an optimised Google Business Profile and directory listings. Attract nearby customers, manage your online reputation, and boost local visibility significantly.",
    features: ["GMB Setup & Optimisation", "Review Management", "Local Citations", "NAP Consistency", "Local SEO Strategy"],
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=700&q=85",
    accent: "#10B981",
    light: "#ECFDF5",
  },
  {
    id: "brand",
    icon: "🎨",
    tag: "10",
    title: "Logo & Brand Package",
    short: "First impressions that last forever.",
    desc: "Create a memorable brand identity with professional logo design and complete branding packages that make your business stand out, inspire trust, and communicate your story instantly.",
    features: ["Logo Design (3 Concepts)", "Brand Guidelines", "Colour & Typography System", "Business Card & Stationery", "Brand Asset Library"],
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&q=85",
    accent: "#6DBF3E",
    light: "#EBF8D8",
  },
  {
    id: "email",
    icon: "📧",
    tag: "11",
    title: "Email Marketing",
    short: "The highest-ROI channel — done right.",
    desc: "Engage and nurture your audience with personalised email campaigns that consistently boost open rates, drive conversions, and build lasting customer relationships over time.",
    features: ["List Building & Segmentation", "Template Design", "Automation Sequences", "A/B Subject Testing", "Deliverability Optimisation"],
    img: "https://images.unsplash.com/photo-1596526131083-e8c633964948?w=700&q=85",
    accent: "#6366F1",
    light: "#EEF2FF",
  },
];

const PROCESS: ProcessStep[] = [
  { step: "01", title: "Discovery Call", desc: "We learn your business, goals, audience, and competition inside-out before we ever recommend a single tactic." },
  { step: "02", title: "Strategy Blueprint", desc: "Our team crafts a bespoke digital strategy with clear KPIs, channels, timelines, and budget allocation." },
  { step: "03", title: "Build & Launch", desc: "We execute with precision — from creative production to technical setup, every detail is handled by specialists." },
  { step: "04", title: "Optimise & Scale", desc: "We monitor performance daily, iterate based on data, and scale what works. Your growth compounds over time." },
];

const FILTER_MAP: Record<string, string[]> = {
  Growth: ["smm", "seo", "ads", "youtube", "influencer", "email"],
  Creative: ["content", "reels", "brand"],
  Technical: ["web", "gmb"],
};

const FILTERS: FilterKey[] = ["All", "Growth", "Creative", "Technical"];

const FLOATING_PILLS: FloatingPill[] = [
  { label: "SEO", top: "22%", left: "6%", delay: "0.5s", rot: "-4deg" },
  { label: "Social Media", top: "18%", right: "7%", delay: "0.65s", rot: "3deg" },
  { label: "Google Ads", bottom: "28%", left: "4%", delay: "0.8s", rot: "2deg" },
  { label: "Video Editing", bottom: "30%", right: "5%", delay: "0.7s", rot: "-3deg" },
];

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "80vh",
      background: "linear-gradient(158deg, #FAFAF7 0%, #EFF9E4 55%, #FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "140px 5% 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Decorative BG */}
      <div style={{ position: "absolute", top: "5%", right: "0%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "-3%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Floating pills */}
      {FLOATING_PILLS.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          top: p.top,
          bottom: p.bottom,
          left: p.left,
          right: p.right,
          background: "#fff", borderRadius: 100, padding: "10px 20px",
          border: "1.5px solid #D5EDBB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          fontSize: 13, fontWeight: 700, color: "#3A7A18",
          opacity: loaded ? 1 : 0,
          transform: loaded ? `rotate(${p.rot})` : `rotate(${p.rot}) translateY(16px)`,
          transition: `all 0.8s cubic-bezier(.22,.68,0,1.2) ${p.delay}`,
          display: "flex", alignItems: "center", gap: 7,
          pointerEvents: "none",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6DBF3E", display: "inline-block" }} />
          {p.label}
        </div>
      ))}

      {/* Badge */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #C8EBAA",
        borderRadius: 100, padding: "7px 20px", marginBottom: 32,
        boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#3A7A18", letterSpacing: "1.5px", textTransform: "uppercase" }}>11 Specialist Services</span>
      </div>

      {/* H1 */}
      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(40px, 6.5vw, 86px)",
        fontWeight: 800, lineHeight: 1.04, letterSpacing: "-3px",
        color: "#141414", maxWidth: 900, marginBottom: 26,
      }}>
        Every service you need<br />to <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>dominate</em> digital.
      </h1>

      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
        fontSize: "clamp(15px, 1.6vw, 19px)", color: "#5A5A5A",
        maxWidth: 560, lineHeight: 1.75, fontWeight: 500, marginBottom: 44,
      }}>
        From strategy to execution — 11 specialist services built to grow your brand, generate leads, and compound your results.
      </p>

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s",
        display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
      }}>
        <button
          style={{
            padding: "15px 34px", borderRadius: 100,
            background: "#6DBF3E", color: "#fff", border: "none",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 8px 28px rgba(109,191,62,0.38)",
            fontFamily: "'Cabinet Grotesk', sans-serif", transition: "all 0.25s",
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(109,191,62,0.5)";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(109,191,62,0.38)";
          }}
        >Get a Free Strategy Call →</button>

        <button
          style={{
            padding: "15px 34px", borderRadius: 100,
            background: "transparent", color: "#1A1A1A",
            border: "2px solid #D0D0D0", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Cabinet Grotesk', sans-serif", transition: "all 0.25s",
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.borderColor = "#6DBF3E";
            e.currentTarget.style.color = "#6DBF3E";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.borderColor = "#D0D0D0";
            e.currentTarget.style.color = "#1A1A1A";
          }}
        >View All Services ↓</button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICES GRID
───────────────────────────────────────── */
function ServicesGrid() {
  const [gridRef, inView] = useInView(0.05);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = activeFilter === "All"
    ? SERVICES
    : SERVICES.filter(s => FILTER_MAP[activeFilter]?.includes(s.id));

  return (
    <section
      id="all-services"
      ref={gridRef as RefObject<HTMLElement>}
      style={{ padding: "100px 5% 120px", background: "#FAFAF7" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>What We Offer</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Our specialist<br /><em style={{ fontStyle: "italic", color: "#6DBF3E" }}>services.</em>
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, background: "#EDEAE4", borderRadius: 100, padding: 5, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "9px 20px", borderRadius: 100, border: "none",
                  background: activeFilter === f ? "#1A1A1A" : "transparent",
                  color: activeFilter === f ? "#fff" : "#666",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  transition: "all 0.25s",
                }}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {filtered.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ s, i, inView }: { s: Service; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        border: `1.5px solid ${hov ? s.accent : "#EAE6E0"}`,
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.06 * (i % 9)}s`,
        cursor: "default",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.img} alt={s.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hov ? "scale(1.06)" : "scale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>{s.tag}</div>
        <div style={{
          position: "absolute", bottom: 16, left: 16,
          width: 44, height: 44, borderRadius: 12,
          background: s.light, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          transition: "transform 0.3s",
          transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)",
        }}>{s.icon}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "26px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#1A1A1A", marginBottom: 6, letterSpacing: "-0.3px" }}>{s.title}</h3>
        <p style={{ fontSize: 13, fontWeight: 700, color: s.accent, marginBottom: 14, letterSpacing: "0.2px" }}>{s.short}</p>
        <p style={{ fontSize: 14, lineHeight: 1.78, color: "#666", fontWeight: 500, marginBottom: 20 }}>{s.desc}</p>

        {/* Expandable features */}
        <div style={{
          maxHeight: expanded ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(.22,.68,0,1.2)",
          marginBottom: expanded ? 20 : 0,
        }}>
          <div style={{ paddingTop: 4, display: "flex", flexDirection: "column", gap: 8 }}>
            {s.features.map((f, fi) => (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.light, border: `1.5px solid ${s.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 9, color: s.accent, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              fontSize: 13, fontWeight: 700, color: s.accent,
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cabinet Grotesk', sans-serif", padding: 0,
              display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s",
            }}
          >
            {expanded ? "Show less ↑" : "What&apos;s included ↓"}
          </button>
          <button
            style={{
              padding: "9px 20px", borderRadius: 100,
              background: hov ? s.accent : "#F2EFE9",
              color: hov ? "#fff" : "#444",
              border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = s.accent;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = hov ? s.accent : "#F2EFE9";
              e.currentTarget.style.color = hov ? "#fff" : "#444";
            }}
          >Get Started →</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROCESS SECTION
───────────────────────────────────────── */
function ProcessSection() {
  const [sectionRef, inView] = useInView();
  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      style={{ padding: "120px 5%", background: "#1A1A1A", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "-20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>How We Work</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            From brief to breakthrough<br />in <em style={{ fontStyle: "italic", color: "#A8E063" }}>4 focused steps.</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, position: "relative" }}>
          <div style={{ position: "absolute", top: 36, left: "12%", right: "12%", height: 1, background: "linear-gradient(to right, #6DBF3E, rgba(109,191,62,0.2))", zIndex: 0 }} />
          {PROCESS.map((p, i) => (
            <ProcessCard key={i} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ p, i, inView }: { p: ProcessStep; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0 28px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${0.12 * i}s`,
        position: "relative", zIndex: 1,
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: hov ? "#6DBF3E" : "#2A2A2A",
        border: `2px solid ${hov ? "#6DBF3E" : "#3A3A3A"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 28, transition: "all 0.35s",
        boxShadow: hov ? "0 0 0 8px rgba(109,191,62,0.15)" : "none",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: hov ? "#fff" : "#6DBF3E" }}>{p.step}</span>
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.3px" }}>{p.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{p.desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   SPOTLIGHT SECTION
───────────────────────────────────────── */
function SpotlightSection() {
  const [sectionRef, inView] = useInView();
  const [active, setActive] = useState(0);
  const spotlights = SERVICES.filter((_, i) => [0, 1, 2, 4].includes(i));
  const s = spotlights[active];

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>Deep Dives</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.2px" }}>
            Our most-requested <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>services.</em>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 52, flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.1s" }}>
          {spotlights.map((sp, i) => (
            <button
              key={sp.id}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 22px", borderRadius: 100,
                background: active === i ? sp.accent : "#F2EFE9",
                color: active === i ? "#fff" : "#555",
                border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 700,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                transition: "all 0.25s",
                boxShadow: active === i ? `0 6px 20px ${sp.accent}55` : "none",
              }}
            >{sp.icon} {sp.title}</button>
          ))}
        </div>

        {/* Spotlight card */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 0, borderRadius: 28, overflow: "hidden",
          boxShadow: "0 20px 72px rgba(0,0,0,0.1)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.15s",
        }}>
          {/* Image side */}
          <div style={{ position: "relative", minHeight: 460 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${s.accent}CC 0%, rgba(0,0,0,0.5) 100%)` }} />
            <div style={{ position: "absolute", inset: 0, padding: "44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 64 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", marginTop: 12 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500, marginTop: 6 }}>{s.short}</div>
            </div>
          </div>

          {/* Content side */}
          <div style={{ background: "#FAFAF7", padding: "52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", fontWeight: 500, marginBottom: 36 }}>{s.desc}</p>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#AAA", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 18 }}>What&apos;s Included</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.light, border: `2px solid ${s.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: s.accent, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              style={{
                padding: "16px 32px", borderRadius: 100,
                background: s.accent, color: "#fff", border: "none",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                alignSelf: "flex-start",
                boxShadow: `0 8px 28px ${s.accent}55`,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 14px 40px ${s.accent}77`;
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 28px ${s.accent}55`;
              }}
            >Start This Service →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────── */
function CTASection() {
  const [sectionRef, inView] = useInView();
  return (
    <section ref={sectionRef as RefObject<HTMLElement>} style={{ padding: "0 5% 100px", background: "#FAFAF7" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        background: "#1A1A1A",
        borderRadius: 32, padding: "80px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 60, alignItems: "center",
        position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)",
      }}>
        <div style={{ position: "absolute", top: "-25%", right: "18%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.14) 0%, transparent 70%)" }} />

        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {["SEO", "Social Media", "Ads", "Content", "Video", "Web"].map(t => (
              <span key={t} style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(109,191,62,0.15)", border: "1px solid rgba(109,191,62,0.3)", fontSize: 12, fontWeight: 700, color: "#A8E063" }}>{t}</span>
            ))}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 16 }}>
            Not sure which services<br />you <em style={{ fontStyle: "italic", color: "#A8E063" }}>actually need?</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
            Book a free 30-minute strategy call. We&apos;ll audit your current presence and recommend exactly what will move the needle.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          <button
            style={{
              padding: "18px 40px", borderRadius: 100,
              background: "#6DBF3E", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 8px 32px rgba(109,191,62,0.4)",
              fontFamily: "'Cabinet Grotesk', sans-serif", whiteSpace: "nowrap", transition: "all 0.25s",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
          >Book Free Strategy Call →</button>

          <button
            style={{
              padding: "18px 40px", borderRadius: 100,
              background: "transparent", color: "rgba(255,255,255,0.6)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Cabinet Grotesk', sans-serif", whiteSpace: "nowrap", transition: "all 0.25s",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >View Case Studies</button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#111", padding: "52px 5% 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #6DBF3E, #A8E063)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16, fontFamily: "'Syne', sans-serif" }}>K</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>Kiwi Connect <span style={{ color: "#6DBF3E" }}>Digital</span></span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>© 2025 Kiwi Connect Digital. All rights reserved.</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Crafted with ✦ in Mumbai</div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'Cabinet Grotesk', sans-serif; }
      `}</style>
      <Navbar activePage="Services" />
      <HeroSection />
      <ServicesGrid />
      <ProcessSection />
      <SpotlightSection />
      <CTASection />
      <Footer />
    </>
  );
}
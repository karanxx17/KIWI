"use client";
import { useState, useEffect, useRef, type MouseEvent, type RefObject } from "react";
import Navbar from "@/app/components/Navbar";

const NAV_LINKS = ["About", "Work", "About", "Clients", "Contact"];

const SERVICES = [
  {
    icon: "✦",
    title: "Brand Strategy",
    desc: "We build brand identities that command attention — from positioning and messaging to visual language that sticks.",
    tag: "01",
  },
  {
    icon: "◈",
    title: "Performance Marketing",
    desc: "Data-obsessed campaigns across Google, Meta & beyond. Every rupee spent is tracked, tested, and optimised.",
    tag: "02",
  },
  {
    icon: "❋",
    title: "SEO & Content",
    desc: "Organic growth engineered with precision. We make search engines fall in love with your brand.",
    tag: "03",
  },
  {
    icon: "⬡",
    title: "Social Media",
    desc: "Scroll-stopping content ecosystems. We turn followers into fans and fans into paying customers.",
    tag: "04",
  },
  {
    icon: "◎",
    title: "Web & UX Design",
    desc: "Conversion-first interfaces that are also genuinely beautiful. Because performance and aesthetics aren't a trade-off.",
    tag: "05",
  },
  {
    icon: "⬟",
    title: "Video & Creative",
    desc: "Motion, narrative, emotion. We craft video and creative assets that make people stop, watch, and remember.",
    tag: "06",
  },
];

const STATS = [
  { value: "17+", label: "Years of Expertise" },
  { value: "340+", label: "Brands Scaled" },
  { value: "4.2×", label: "Avg. ROAS Delivered" },
  { value: "98%", label: "Client Retention" },
];

const WORK = [
  {
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    client: "NovaPulse",
    category: "Brand Strategy + Social",
    result: "+320% engagement",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    client: "Terrax Realty",
    category: "Performance Marketing",
    result: "4.8× ROAS",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    client: "Lumē Skincare",
    category: "SEO + Content + UX",
    result: "#1 on 60+ keywords",
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    client: "Stackr Finance",
    category: "Full-funnel Digital",
    result: "2.1× MoM growth",
  },
];

const TESTIMONIALS = [
  {
    quote: "Kiwi Connect didn't just run our campaigns — they fundamentally changed how we think about growth. Our revenue tripled in 14 months.",
    name: "Priya Mehta",
    role: "CEO, Lumē Skincare",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote: "I've worked with five agencies before. None came close to the strategic depth and execution speed of this team.",
    name: "Arjun Shetty",
    role: "Founder, Stackr Finance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    quote: "Every metric we care about moved in the right direction — within weeks, not months.",
    name: "Kavita Rao",
    role: "CMO, NovaPulse",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

const CLIENTS = [
  "https://logo.clearbit.com/airbnb.com",
  "https://logo.clearbit.com/spotify.com",
  "https://logo.clearbit.com/notion.so",
  "https://logo.clearbit.com/figma.com",
  "https://logo.clearbit.com/shopify.com",
  "https://logo.clearbit.com/stripe.com",
  "https://logo.clearbit.com/linear.app",
  "https://logo.clearbit.com/vercel.com",
];

// ─────────────────────────────────────────
// useInView hook for scroll animations
// ─────────────────────────────────────────
function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <nav style={{
//       position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
//       padding: "0 5%",
//       height: 72,
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       background: scrolled ? "rgba(250,248,244,0.95)" : "transparent",
//       backdropFilter: scrolled ? "blur(20px)" : "none",
//       borderBottom: scrolled ? "1px solid #E8E2D9" : "1px solid transparent",
//       transition: "all 0.4s ease",
//     }}>
//       {/* Logo */}
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{
//           width: 36, height: 36, borderRadius: 10,
//           background: "linear-gradient(135deg, #6DBF3E, #A8E063)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 18, fontWeight: 800, color: "#fff",
//           boxShadow: "0 4px 16px rgba(109,191,62,0.35)",
//         }}>K</div>
//         <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
//           Kiwi Connect <span style={{ color: "#6DBF3E" }}>Digital</span>
//         </span>
//       </div>

//       {/* Desktop links */}
//       <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
//         {NAV_LINKS.map(l => (
//           <a key={l} href={`${l.toLowerCase()}`} style={{
//             fontFamily: "'Cabinet Grotesk', sans-serif",
//             fontSize: 14, fontWeight: 600, color: "#3A3A3A",
//             textDecoration: "none", letterSpacing: "0.2px",
//             transition: "color 0.2s",
//           }}
//             onMouseEnter={e => e.target.style.color = "#6DBF3E"}
//             onMouseLeave={e => e.target.style.color = "#3A3A3A"}
//           >{l}</a>
//         ))}
//         <button style={{
//           padding: "10px 22px", borderRadius: 100,
//           background: "#1A1A1A", color: "#fff",
//           border: "none", cursor: "pointer",
//           fontSize: 13, fontWeight: 700, letterSpacing: "0.3px",
//           transition: "all 0.25s",
//           fontFamily: "'Cabinet Grotesk', sans-serif",
//         }}
//           onMouseEnter={e => { e.target.style.background = "#6DBF3E"; e.target.style.transform = "scale(1.04)"; }}
//           onMouseLeave={e => { e.target.style.background = "#1A1A1A"; e.target.style.transform = "scale(1)"; }}
//         >Get a Free Audit →</button>
//       </div>
//     </nav>
//   );
// }

// ─────────────────────────────────────────
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #FAFAF7 0%, #F0F7E8 50%, #FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "120px 5% 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: "10%", right: "8%",
        width: 420, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,191,62,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "3%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Pill badge */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #D6EFC0",
        borderRadius: 100, padding: "7px 18px", marginBottom: 32,
        boxShadow: "0 2px 16px rgba(109,191,62,0.12)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6DBF3E", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#3A7A18", letterSpacing: "0.4px" }}>17 Years of Digital Excellence</span>
      </div>

      {/* Headline */}
      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(42px, 6.5vw, 88px)",
        fontWeight: 800, lineHeight: 1.05,
        color: "#141414", textAlign: "center",
        letterSpacing: "-2px", maxWidth: 960,
        marginBottom: 28,
      }}>
        Marketing That<br />
        <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>Actually Grows</em><br />
        Your Business.
      </h1>

      {/* Sub */}
      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
        fontSize: "clamp(15px, 1.6vw, 19px)", color: "#5A5A5A",
        maxWidth: 560, textAlign: "center", lineHeight: 1.7,
        fontWeight: 500, marginBottom: 48,
      }}>
        Kiwi Connect Digital is a full-service growth agency trusted by 340+ brands. We blend strategy, creativity, and data to build marketing that converts.
      </p>

      {/* CTAs */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s",
        display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
        marginBottom: 80,
      }}>
        <button style={{
          padding: "16px 36px", borderRadius: 100,
          background: "#6DBF3E", color: "#fff", border: "none",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 8px 32px rgba(109,191,62,0.38)",
          transition: "all 0.25s", fontFamily: "'Cabinet Grotesk', sans-serif",
          letterSpacing: "0.2px",
        }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(109,191,62,0.5)"; }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(109,191,62,0.38)"; }}
        >Start Growing Today →</button>
        <button style={{
          padding: "16px 36px", borderRadius: 100,
          background: "transparent", color: "#1A1A1A",
          border: "2px solid #D0D0D0",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          transition: "all 0.25s", fontFamily: "'Cabinet Grotesk', sans-serif",
        }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#6DBF3E"; e.currentTarget.style.color = "#6DBF3E"; }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#D0D0D0"; e.currentTarget.style.color = "#1A1A1A"; }}
        >View Our Work</button>
      </div>

      {/* Hero Image Grid */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.45s",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gridTemplateRows: "240px 180px",
        gap: 14, width: "100%", maxWidth: 1100,
        borderRadius: 24, overflow: "hidden",
      }}>
        <div style={{ gridRow: "1 / 3", borderRadius: 20, overflow: "hidden", position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }}
            onMouseEnter={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
          <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.92)", borderRadius: 12, padding: "10px 16px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6DBF3E", letterSpacing: "0.5px" }}>STRATEGY & VISION</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Building brands that last</div>
          </div>
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=85" alt="Analytics" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
            onMouseEnter={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #6DBF3E, #A8E063)" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 24 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>4.2×</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", textAlign: "center", marginTop: 8 }}>Average ROAS<br />across all clients</div>
          </div>
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=85" alt="Creative" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
            onMouseEnter={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=85" alt="Data" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
            onMouseEnter={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{
      background: "#1A1A1A",
      padding: "60px 5%",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0,
    }}>
      {STATS.map((s, i) => (
        <div key={i} style={{
          textAlign: "center", padding: "0 20px",
          borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${i * 0.1}s`,
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 800, color: "#6DBF3E", lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────
function ServicesSection() {
  const [ref, inView] = useInView();
  return (
    <section id="services" ref={ref} style={{ padding: "120px 5%", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-1.5px" }}>
              Services built for<br /><em style={{ fontStyle: "italic", color: "#6DBF3E" }}>real results.</em>
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "#666", lineHeight: 1.8, fontSize: 15, fontWeight: 500, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>
            From brand building to performance campaigns, we offer end-to-end marketing solutions powered by 17 years of hard-earned expertise.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i, inView }: { s: { icon: string; title: string; desc: string; tag: string }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#1A1A1A" : "#fff",
        border: `1.5px solid ${hov ? "#6DBF3E" : "#EAE6E0"}`,
        borderRadius: 20, padding: "36px 32px",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${0.08 * i}s`,
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ fontSize: 28, color: hov ? "#6DBF3E" : "#6DBF3E", transition: "all 0.3s" }}>{s.icon}</div>
        <span style={{ fontSize: 11, fontWeight: 800, color: hov ? "rgba(255,255,255,0.3)" : "#CCC", letterSpacing: "1px" }}>{s.tag}</span>
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: hov ? "#fff" : "#1A1A1A", marginBottom: 14, letterSpacing: "-0.3px", transition: "color 0.3s" }}>{s.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: hov ? "rgba(255,255,255,0.65)" : "#777", transition: "color 0.3s", fontWeight: 500 }}>{s.desc}</p>
      <div style={{ marginTop: 28, fontSize: 13, fontWeight: 700, color: hov ? "#6DBF3E" : "#1A1A1A", display: "flex", alignItems: "center", gap: 6, transition: "color 0.3s" }}>
        Learn more <span style={{ transition: "transform 0.3s", transform: hov ? "translateX(4px)" : "translateX(0)", display: "inline-block" }}>→</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
function WorkSection() {
  const [ref, inView] = useInView();
  return (
    <section id="work" ref={ref} style={{ padding: "120px 5%", background: "#F2F0EA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Case Studies</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px" }}>Work that speaks louder.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {WORK.map((w, i) => (
            <WorkCard key={i} w={w} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, i, inView }: { w: { img: string; client: string; category: string; result: string }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24, overflow: "hidden", position: "relative",
        height: 340, cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${i * 0.12}s`,
        boxShadow: hov ? "0 24px 64px rgba(0,0,0,0.22)" : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <img src={w.img} alt={w.client} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hov ? "scale(1.07)" : "scale(1)" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: hov ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
        transition: "background 0.4s",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#A8E063", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>{w.category}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{w.client}</div>
          <div style={{
            background: "#6DBF3E", color: "#fff",
            padding: "7px 16px", borderRadius: 100,
            fontSize: 13, fontWeight: 800,
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.3s",
          }}>{w.result}</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Image cluster */}
        <div style={{
          position: "relative", height: 540,
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
          transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)",
        }}>
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=85" alt="Team" style={{ position: "absolute", top: 0, left: 0, width: "80%", height: "75%", objectFit: "cover", borderRadius: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }} />
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=85" alt="Office" style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: "50%", objectFit: "cover", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.16)", border: "5px solid #fff" }} />
          <div style={{
            position: "absolute", top: "42%", right: "10%",
            background: "#6DBF3E", borderRadius: 16, padding: "20px 24px",
            boxShadow: "0 12px 40px rgba(109,191,62,0.45)",
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1 }}>17</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 700, marginTop: 4 }}>Years of<br />Expertise</div>
          </div>
        </div>

        {/* Text */}
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.15s",
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>About Kiwi Connect</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 24 }}>
            We're not just an agency.<br />We're your <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>growth partners.</em>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#666", marginBottom: 20, fontWeight: 500 }}>
            Founded in 2007, Kiwi Connect Digital has spent 17 years at the intersection of strategy, creativity, and technology. We've worked with startups and Fortune 500s, local heroes and global brands.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#666", marginBottom: 40, fontWeight: 500 }}>
            Our philosophy is simple: marketing should generate measurable, compounding growth. Every campaign, every creative decision, every rupee is accountable to that north star.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Strategy First", "We diagnose before we prescribe."], ["Data-Driven", "Every decision is backed by numbers."], ["Full Funnel", "We own the journey end-to-end."]].map(([title, sub]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E8F7D8", border: "2px solid #6DBF3E", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1A1A1A" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 2, fontWeight: 500 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
function ClientsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="clients" ref={ref} style={{ padding: "80px 5%", background: "#FAFAF7", borderTop: "1px solid #EAE6E0", borderBottom: "1px solid #EAE6E0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: "#AAA", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 44 }}>Trusted by leading brands worldwide</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          {CLIENTS.map((url, i) => (
            <div key={i} style={{
              opacity: inView ? 0.45 : 0,
              transition: `all 0.6s ease ${i * 0.06}s`,
              filter: "grayscale(1)",
              transform: inView ? "translateY(0)" : "translateY(16px)",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = "grayscale(0)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "0.45"; e.currentTarget.style.filter = "grayscale(1)"; }}
            >
              <img src={url} alt="client" style={{ height: 28, objectFit: "contain" }} onError={e => { e.currentTarget.style.display = "none"; }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
function TestimonialsSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section style={{ padding: "120px 5%", background: "#fff" }}>
      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Client Love</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: "#1A1A1A", marginBottom: 64, letterSpacing: "-1px" }}>Don't take our word for it.</h2>

        {/* Testimonial card */}
        <div style={{
          background: "#F7F4EF", borderRadius: 28, padding: "56px 64px",
          marginBottom: 40, position: "relative",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s cubic-bezier(.22,.68,0,1.2)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: 80, color: "#6DBF3E", lineHeight: 0.6, marginBottom: 32, fontFamily: "Georgia, serif", opacity: 0.4 }}>"</div>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 22px)", lineHeight: 1.7, color: "#2C2C2C", fontWeight: 500, fontStyle: "italic", marginBottom: 36 }}>
            {TESTIMONIALS[active].quote}
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
            <img src={TESTIMONIALS[active].avatar} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "3px solid #6DBF3E" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#1A1A1A" }}>{TESTIMONIALS[active].name}</div>
              <div style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{TESTIMONIALS[active].role}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 10, height: 10, borderRadius: 100,
              background: i === active ? "#6DBF3E" : "#DDD",
              border: "none", cursor: "pointer",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: "80px 5% 120px", background: "#FAFAF7" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        background: "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
        borderRadius: 32, padding: "80px 80px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 60, alignItems: "center",
        position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)",
      }}>
        {/* Green glow */}
        <div style={{ position: "absolute", top: "-40%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18 }}>Ready to scale?</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 18 }}>
            Let's build something<br /><em style={{ fontStyle: "italic", color: "#A8E063" }}>extraordinary together.</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Free strategy audit included. No commitment required.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          <button style={{
            padding: "18px 40px", borderRadius: 100,
            background: "#6DBF3E", color: "#fff", border: "none",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 8px 32px rgba(109,191,62,0.4)",
            transition: "all 0.25s", fontFamily: "'Cabinet Grotesk', sans-serif",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(109,191,62,0.55)"; }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(109,191,62,0.4)"; }}
          >Get Free Audit →</button>
          <button style={{
            padding: "18px 40px", borderRadius: 100,
            background: "transparent", color: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            transition: "all 0.25s", fontFamily: "'Cabinet Grotesk', sans-serif",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >Schedule a Call</button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
function Footer() {
  const MENU: [string, string[]][] = [
    ["Company", ["About", "Work", "Services", "Blog", "Careers"]],
    ["Services", ["Brand Strategy", "Performance", "SEO & Content", "Social Media", "Web & UX"]],
    ["Contact", ["hello@kiwiconnect.in", "+91 98765 43210", "Mumbai, India", "LinkedIn", "Twitter"]],
  ];

  return (
    <footer style={{ background: "#111", padding: "60px 5% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #6DBF3E, #A8E063)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16 }}>K</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>Kiwi Connect <span style={{ color: "#6DBF3E" }}>Digital</span></span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 500, maxWidth: 260 }}>Growth-driven marketing for ambitious brands. 17 years. 340+ clients. Counting.</p>
          </div>

          {MENU.map(([title, items]) => (
            <div key={title}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#6DBF3E", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 18 }}>{title}</div>
              {items.map(item => (
                <div key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer", fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={(e: MouseEvent<HTMLDivElement>) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e: MouseEvent<HTMLDivElement>) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                >{item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>© 2025 Kiwi Connect Digital. All rights reserved.</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Crafted with ✦ in Mumbai</div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────
export default function KiwiConnectDigital() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ClientsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
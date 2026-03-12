"use client";
import { useState, useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import Navbar from "@/app/components/Navbar";


/* ─────────────────────────────────────────
   useInView — scroll-triggered reveal
───────────────────────────────────────── */
function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.12): [MutableRefObject<T | null>, boolean] {
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

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TEAM = [
  {
    name: "Aryan Kapoor",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85",
    quote: "Strategy is the soul of every campaign we build.",
  },
  {
    name: "Meera Nair",
    role: "Chief Creative Officer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85",
    quote: "Great design earns attention before words can.",
  },
  {
    name: "Rohit Desai",
    role: "Head of Performance",
    img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=85",
    quote: "Every rupee should compound. That's the only goal.",
  },
  {
    name: "Sneha Iyer",
    role: "Director of Strategy",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85",
    quote: "We don't guess. We test, learn, and scale.",
  },
];

const VALUES = [
  {
    icon: "◈",
    title: "Transparency",
    desc: "No black boxes. Every decision, every metric, every result — fully visible to you at all times.",
  },
  {
    icon: "✦",
    title: "Innovation",
    desc: "We stay ahead of algorithms, platforms, and trends so your brand is always one step ahead.",
  },
  {
    icon: "❋",
    title: "Accountability",
    desc: "We own results, not just activity. If the numbers don't move, we don't rest.",
  },
  {
    icon: "⬡",
    title: "Partnership",
    desc: "We embed into your team. Your goals become our goals — completely and without reservation.",
  },
];

const MILESTONES = [
  { year: "2007", event: "Founded in Mumbai with a team of 4 marketers and one shared dream." },
  { year: "2010", event: "Crossed 50 active clients. Launched our first in-house creative studio." },
  { year: "2014", event: "Expanded into SEO, content, and full-funnel performance marketing." },
  { year: "2018", event: "Opened offices in Delhi & Bangalore. Team grew to 60+ specialists." },
  { year: "2021", event: "Launched our proprietary analytics platform: KiwiMetrics™." },
  { year: "2024", event: "340+ brands scaled. ₹500Cr+ in attributed client revenue generated." },
];

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <nav style={{
//       position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
//       height: 72, padding: "0 5%",
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       background: scrolled ? "rgba(250,248,244,0.94)" : "transparent",
//       backdropFilter: scrolled ? "blur(20px)" : "none",
//       borderBottom: scrolled ? "1px solid #E8E2D9" : "1px solid transparent",
//       transition: "all 0.4s ease",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{
//           width: 36, height: 36, borderRadius: 10,
//           background: "linear-gradient(135deg, #6DBF3E, #A8E063)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 18, fontWeight: 900, color: "#fff",
//           boxShadow: "0 4px 16px rgba(109,191,62,0.35)",
//           fontFamily: "'Syne', sans-serif",
//         }}>K</div>
//         <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#1A1A1A" }}>
//           Kiwi Connect <span style={{ color: "#6DBF3E" }}>Digital</span>
//         </span>
//       </div>
//       <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
//         {["Services", "Work", "About", "Contact"].map(l => (
//           <a key={l} href={`/${l.toLowerCase()}`} style={{
//             fontFamily: "'Cabinet Grotesk', sans-serif",
//             fontSize: 14, fontWeight: 600,
//             color: l === "About" ? "#6DBF3E" : "#3A3A3A",
//             textDecoration: "none",
//             transition: "color 0.2s",
//           }}
//             onMouseEnter={e => e.target.style.color = "#6DBF3E"}
//             onMouseLeave={e => e.target.style.color = l === "About" ? "#6DBF3E" : "#3A3A3A"}
//           >{l}</a>
//         ))}
//         <button style={{
//           padding: "10px 22px", borderRadius: 100,
//           background: "#1A1A1A", color: "#fff", border: "none",
//           fontSize: 13, fontWeight: 700, cursor: "pointer",
//           fontFamily: "'Cabinet Grotesk', sans-serif",
//           transition: "all 0.25s",
//         }}
//           onMouseEnter={e => { e.target.style.background = "#6DBF3E"; e.target.style.transform = "scale(1.04)"; }}
//           onMouseLeave={e => { e.target.style.background = "#1A1A1A"; e.target.style.transform = "scale(1)"; }}
//         >Get a Free Audit →</button>
//       </div>
//     </nav>
//   );
// }

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(155deg, #FAFAF7 0%, #EEF7E4 55%, #FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "140px 5% 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "8%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Eyebrow */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #C8EBAA",
        borderRadius: 100, padding: "7px 20px", marginBottom: 36,
        boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#3A7A18", letterSpacing: "1.5px", textTransform: "uppercase" }}>Our Story</span>
      </div>

      {/* Headline */}
      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(44px, 7vw, 96px)",
        fontWeight: 800, lineHeight: 1.04, letterSpacing: "-3px",
        color: "#141414", maxWidth: 960, marginBottom: 30,
      }}>
        Every brand has<br />a <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>story.</em> Ours<br />began with yours.
      </h1>

      {/* Sub */}
      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
        fontSize: "clamp(16px, 1.7vw, 20px)", color: "#5C5C5C",
        maxWidth: 600, lineHeight: 1.75, fontWeight: 500, marginBottom: 56,
      }}>
        We are a team of marketers, designers, and strategists dedicated to driving measurable digital success for brands worldwide.
      </p>

      {/* Hero images — asymmetric floating layout */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.38s",
        position: "relative", width: "100%", maxWidth: 1100, height: 480,
      }}>
        {/* Large center */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, width: "44%", height: "100%", borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 72px rgba(0,0,0,0.14)" }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85" alt="Team collaboration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#A8E063", letterSpacing: "1.5px", textTransform: "uppercase" }}>Est. 2007</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" }}>Mumbai, India</div>
          </div>
        </div>

        {/* Left floating card */}
        <div style={{ position: "absolute", left: "2%", top: "10%", width: "28%", height: "72%", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", transform: "rotate(-2deg)" }}>
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=85" alt="Strategy session" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Right floating card */}
        <div style={{ position: "absolute", right: "2%", top: "8%", width: "26%", height: "68%", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", transform: "rotate(1.5deg)" }}>
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=85" alt="Creative work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Floating stat pill — bottom left */}
        <div style={{
          position: "absolute", left: "6%", bottom: "2%",
          background: "#fff", borderRadius: 16, padding: "16px 20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", display: "flex", gap: 14, alignItems: "center",
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E8F7D8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏆</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#1A1A1A", lineHeight: 1 }}>340+</div>
            <div style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>Brands Scaled</div>
          </div>
        </div>

        {/* Floating stat pill — bottom right */}
        <div style={{
          position: "absolute", right: "6%", bottom: "2%",
          background: "#6DBF3E", borderRadius: 16, padding: "16px 20px",
          boxShadow: "0 8px 32px rgba(109,191,62,0.35)", display: "flex", gap: 14, alignItems: "center",
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>17 yrs</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>of Expertise</div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MISSION + VISION
───────────────────────────────────────── */
function MissionVision() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

        {/* Mission */}
        <div style={{
          background: "#1A1A1A", borderRadius: 28, padding: "60px 52px",
          position: "relative", overflow: "hidden",
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
          transition: "all 0.85s cubic-bezier(.22,.68,0,1.2)",
        }}>
          <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.18) 0%, transparent 70%)" }} />
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>Our Mission</div>
          <div style={{ fontSize: 56, marginBottom: 24, lineHeight: 1 }}>🎯</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 2.8vw, 36px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.8px" }}>
            Making digital success <em style={{ fontStyle: "italic", color: "#A8E063" }}>accessible</em> for everyone.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, fontWeight: 500 }}>
            To empower businesses of all sizes with innovative, data-driven digital marketing solutions that drive growth, build meaningful customer connections, and deliver measurable results. We strive to make digital success accessible, transparent, and scalable for every client we serve.
          </p>
        </div>

        {/* Vision */}
        <div style={{
          background: "linear-gradient(145deg, #F0FAE6, #E4F5D4)",
          borderRadius: 28, padding: "60px 52px",
          position: "relative", overflow: "hidden",
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.15s",
          border: "1.5px solid #C8EBAA",
        }}>
          <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.15) 0%, transparent 70%)" }} />
          <div style={{ fontSize: 11, fontWeight: 800, color: "#3A7A18", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>Our Vision</div>
          <div style={{ fontSize: 56, marginBottom: 24, lineHeight: 1 }}>🌐</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 2.8vw, 36px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.8px" }}>
            The most <em style={{ fontStyle: "italic", color: "#5A9B2A" }}>trusted</em> growth agency, globally.
          </h2>
          <p style={{ fontSize: 15, color: "#4A5A3A", lineHeight: 1.85, fontWeight: 500 }}>
            To be the most trusted and results-oriented digital marketing agency, recognized globally for transforming brands through creativity, technology, and performance. We aim to lead the industry by setting new standards in strategy, service, and success.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   OUR STORY (Timeline)
───────────────────────────────────────── */
function StorySection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section style={{ padding: "120px 5%", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 100, alignItems: "flex-start" }}>

        {/* Left — text */}
        <div ref={ref}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease", marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase" }}>Our Story</span>
          </div>
          <h2 style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s ease 0.08s",
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(30px, 3.5vw, 50px)", fontWeight: 800, color: "#1A1A1A",
            lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 28,
          }}>
            Built on trust,<br />driven by <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>results.</em>
          </h2>
          <div style={{ opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.16s", display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", fontWeight: 500 }}>
              Every brand has a story — and ours began with a simple belief: digital marketing should be results-driven, transparent, and client-focused.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", fontWeight: 500 }}>
              What started as a small team of passionate marketers has grown into a full-service digital agency helping businesses across industries achieve measurable success online. From day one, we've focused on blending creativity with strategy — using data, design, and technology to craft campaigns that truly connect.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", fontWeight: 500 }}>
              Our journey is built on trust, innovation, and the results we deliver for our clients. And we're just getting started.
            </p>
          </div>

          {/* Story image */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.9s ease 0.28s", marginTop: 44, borderRadius: 20, overflow: "hidden", height: 280, position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85" alt="Our office" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>Our Mumbai HQ</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Where every great campaign begins</div>
            </div>
          </div>
        </div>

        {/* Right — timeline */}
        <div>
          <div style={{ paddingLeft: 28, borderLeft: "2px solid #E2DDD6", display: "flex", flexDirection: "column", gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <TimelineItem key={i} m={m} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ m, i, inView }: { m: { year: string; event: string }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", paddingLeft: 36, paddingBottom: 44,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(24px)",
        transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${0.1 + i * 0.1}s`,
      }}
    >
      {/* Dot */}
      <div style={{
        position: "absolute", left: -9, top: 4,
        width: 16, height: 16, borderRadius: "50%",
        background: hov ? "#6DBF3E" : "#fff",
        border: `2px solid ${hov ? "#6DBF3E" : "#CCC"}`,
        transition: "all 0.3s",
        boxShadow: hov ? "0 0 0 5px rgba(109,191,62,0.2)" : "none",
      }} />
      <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: hov ? "#6DBF3E" : "#AAA", letterSpacing: "1.5px", marginBottom: 8, transition: "color 0.3s" }}>{m.year}</div>
      <p style={{ fontSize: 15, color: hov ? "#1A1A1A" : "#666", lineHeight: 1.7, fontWeight: 500, transition: "color 0.3s" }}>{m.event}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   VALUES
───────────────────────────────────────── */
function ValuesSection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>What Drives Us</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px" }}>
            Our core <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>values.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {VALUES.map((v, i) => (
            <ValueCard key={i} v={v} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ v, i, inView }: { v: { icon: string; title: string; desc: string }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#1A1A1A" : "#F7F4EF",
        borderRadius: 22, padding: "40px 30px",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${0.09 * i}s`,
        border: `1.5px solid ${hov ? "#6DBF3E" : "transparent"}`,
        boxShadow: hov ? "0 20px 56px rgba(0,0,0,0.16)" : "none",
      }}
    >
      <div style={{ fontSize: 30, color: "#6DBF3E", marginBottom: 24 }}>{v.icon}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: hov ? "#fff" : "#1A1A1A", marginBottom: 14, letterSpacing: "-0.3px", transition: "color 0.3s" }}>{v.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: hov ? "rgba(255,255,255,0.6)" : "#777", transition: "color 0.3s", fontWeight: 500 }}>{v.desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   TEAM
───────────────────────────────────────── */
function TeamSection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} style={{ padding: "120px 5%", background: "#F2F0EA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>The People</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 3.8vw, 50px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Meet the minds<br />behind the <em style={{ fontStyle: "italic", color: "#6DBF3E" }}>magic.</em>
            </h2>
          </div>
          <p style={{ maxWidth: 340, color: "#666", lineHeight: 1.8, fontSize: 15, fontWeight: 500, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>
            60+ specialists across strategy, creative, performance, and tech — all united by one goal: your growth.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {TEAM.map((t, i) => (
            <TeamCard key={i} t={t} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ t, i, inView }: { t: { name: string; role: string; img: string; quote: string }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 22, overflow: "hidden", background: "#fff",
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.15)" : "0 4px 16px rgba(0,0,0,0.06)",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.1 * i}s`,
      }}
    >
      <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
        <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hov ? "scale(1.07)" : "scale(1)" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: hov ? "linear-gradient(to top, rgba(26,26,26,0.85) 0%, transparent 55%)" : "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)",
          transition: "background 0.4s",
        }} />
        {/* Quote on hover */}
        <div style={{
          position: "absolute", bottom: 16, left: 16, right: 16,
          opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.35s",
          fontSize: 13, color: "rgba(255,255,255,0.85)", fontStyle: "italic", fontWeight: 500, lineHeight: 1.6,
        }}>"{t.quote}"</div>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "#1A1A1A", marginBottom: 4 }}>{t.name}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6DBF3E", letterSpacing: "0.5px" }}>{t.role}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TEAM PHOTO COLLAGE
───────────────────────────────────────── */
function CultureSection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} style={{ padding: "80px 5% 120px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>Life at Kiwi</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1px" }}>We work hard. We celebrate harder.</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr 1fr",
          gridTemplateRows: "220px 220px",
          gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.1s",
        }}>
          {[
            { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=85", style: { gridRow: "1 / 3" }, label: "Strategy Sprints" },
            { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=85", style: {}, label: "Team Offsites" },
            { src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=85", style: {}, label: "Creative Studio" },
            { src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=85", style: {}, label: "Award Nights" },
            { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=85", style: {}, label: "Client Wins" },
          ].map((img, i) => (
            <div key={i} style={{ ...img.style, borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(255,255,255,0.92)", borderRadius: 10, padding: "6px 12px", backdropFilter: "blur(6px)" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */
function CTASection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} style={{ padding: "0 5% 100px", background: "#FAFAF7" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        background: "linear-gradient(135deg, #6DBF3E 0%, #3A8A1A 100%)",
        borderRadius: 32, padding: "80px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 48, flexWrap: "wrap",
        position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)",
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "20%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-40%", left: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)" }} />

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Join 340+ brands</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", maxWidth: 520 }}>
            Ready to write your<br />own growth story?
          </h2>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", flexShrink: 0 }}>
          <button style={{
            padding: "18px 40px", borderRadius: 100,
            background: "#fff", color: "#1A1A1A", border: "none",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
            fontFamily: "'Cabinet Grotesk', sans-serif",
            boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
            transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.15)"; }}
          >Get a Free Audit →</button>
          <button style={{
            padding: "18px 40px", borderRadius: 100,
            background: "transparent", color: "#fff",
            border: "2px solid rgba(255,255,255,0.5)",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Cabinet Grotesk', sans-serif",
            transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#fff"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >Meet the Team</button>
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
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>© 2025 Kiwi Connect Digital. All rights reserved.</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Crafted with ✦ in Mumbai</div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'Cabinet Grotesk', sans-serif; }
      `}</style>
      <Navbar />
      <HeroSection />
      <MissionVision />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <CultureSection />
      <CTASection />
      <Footer />
    </>
  );
}
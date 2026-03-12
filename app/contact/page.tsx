"use client";
import { useState, useEffect, useRef, type RefObject, type MouseEvent } from "react";
import Navbar from "@/app/components/Navbar";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface ContactInfoItem {
  icon: string;
  label: string;
  lines: string[];
  accent: string;
  light: string;
  action: { label: string; href: string } | null;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

/* ─────────────────────────────────────────
   useInView hook — fully typed
───────────────────────────────────────── */
function useInView(threshold = 0.1): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
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
   CONSTANTS
───────────────────────────────────────── */
const WA_NUMBER = "919876543210";
const WA_MESSAGE = "Hi! I found you through your website and would like to discuss my project.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(WA_LINK)}&bgcolor=ffffff&color=1A1A1A&margin=10`;

const CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: "📍",
    label: "Office Address",
    lines: ["4th Floor, Inspire Hub,", "Bandra Kurla Complex,", "Mumbai — 400 051, India"],
    accent: "#6DBF3E",
    light: "#EBF8D8",
    action: null,
  },
  {
    icon: "📞",
    label: "Call / WhatsApp",
    lines: ["+91 98765 43210", "+91 98765 43211"],
    accent: "#3B82F6",
    light: "#EFF6FF",
    action: { label: "Call Now", href: "tel:+919876543210" },
  },
  {
    icon: "✉️",
    label: "Email Us",
    lines: ["hello@kiwiconnect.in", "support@kiwiconnect.in"],
    accent: "#F97316",
    light: "#FFF7ED",
    action: { label: "Send Email", href: "mailto:hello@kiwiconnect.in" },
  },
  {
    icon: "🕐",
    label: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sun: By Appointment Only"],
    accent: "#8B5CF6",
    light: "#F5F3FF",
    action: null,
  },
];

const SERVICES_LIST = [
  "Social Media Marketing", "SEO Services", "Google & Meta Ads",
  "Content Creation", "Reels & Video Editing", "Website Design & Development",
  "YouTube Marketing", "Influencer Marketing", "Local Listing & GMB",
  "Logo & Brand Package", "Email Marketing", "Other / Not Sure",
];

const BUDGETS = [
  "Under ₹25,000/mo", "₹25K–₹50K/mo", "₹50K–₹1L/mo",
  "₹1L–₹2.5L/mo", "₹2.5L+/mo", "Let's discuss",
];

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      minHeight: "52vh",
      background: "linear-gradient(158deg, #FAFAF7 0%, #EFF9E4 55%, #FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "140px 5% 60px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "0%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #C8EBAA",
        borderRadius: 100, padding: "7px 20px", marginBottom: 28,
        boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6DBF3E", display: "inline-block", animation: "blink 2s infinite" }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: "#3A7A18", letterSpacing: "1.5px", textTransform: "uppercase" }}>We respond within 2 hours</span>
      </div>

      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(40px, 6vw, 82px)",
        fontWeight: 800, lineHeight: 1.05, letterSpacing: "-3px",
        color: "#141414", maxWidth: 820, marginBottom: 22,
      }}>
        Let&apos;s build something<br /><em style={{ fontStyle: "italic", color: "#6DBF3E" }}>great together.</em>
      </h1>

      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.2s",
        fontSize: "clamp(15px, 1.6vw, 18px)", color: "#5A5A5A",
        maxWidth: 520, lineHeight: 1.75, fontWeight: 500,
      }}>
        Tell us about your brand and goals. We&apos;ll get back to you with a tailored strategy — no fluff, no pushy sales.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT SECTION — wrapper
───────────────────────────────────────── */
function ContactSection() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      style={{ padding: "40px 5% 100px", background: "#FAFAF7" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 32, alignItems: "flex-start" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CONTACT_INFO.map((c, i) => (
            <ContactCard key={i} c={c} i={i} inView={inView} />
          ))}
          <WhatsAppQR inView={inView} />
          <MapCard inView={inView} />
        </div>
        {/* RIGHT */}
        <ContactForm inView={inView} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT INFO CARD
───────────────────────────────────────── */
function ContactCard({ c, i, inView }: { c: ContactInfoItem; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? c.accent : "#fff",
        border: `1.5px solid ${hov ? c.accent : "#EAE6E0"}`,
        borderRadius: 20, padding: "24px 28px",
        display: "flex", alignItems: "flex-start", gap: 18,
        transition: "all 0.32s cubic-bezier(.22,.68,0,1.2)",
        boxShadow: hov ? `0 16px 48px ${c.accent}33` : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hov ? "translateX(4px)" : "translateX(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.08 * i}s`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: hov ? "rgba(255,255,255,0.2)" : c.light,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, transition: "background 0.3s",
      }}>{c.icon}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: hov ? "rgba(255,255,255,0.7)" : "#AAA", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6, transition: "color 0.3s" }}>{c.label}</div>
        {c.lines.map((ln, li) => (
          <div key={li} style={{ fontSize: 15, fontWeight: 700, color: hov ? "#fff" : "#1A1A1A", lineHeight: 1.6, transition: "color 0.3s" }}>{ln}</div>
        ))}
        {c.action && (
          <a href={c.action.href} style={{
            display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10,
            fontSize: 13, fontWeight: 700,
            color: hov ? "#fff" : c.accent,
            textDecoration: "none", transition: "color 0.3s",
          }}>
            {c.action.label} →
          </a>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   WHATSAPP QR
───────────────────────────────────────── */
function WhatsAppQR({ inView }: { inView: boolean }) {
  const [hov, setHov] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(WA_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {});
  };

  return (
    <div style={{
      background: "#1A1A1A",
      borderRadius: 24, padding: "32px 28px",
      border: "1.5px solid #2A2A2A",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s cubic-bezier(.22,.68,0,1.2) 0.32s",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,191,62,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ display: "flex", gap: 28, alignItems: "center", position: "relative" }}>
        {/* QR */}
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            flexShrink: 0, background: "#fff", borderRadius: 18, padding: 10,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            border: "3px solid #6DBF3E",
            transition: "transform 0.3s",
            transform: hov ? "scale(1.03)" : "scale(1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={QR_URL} alt="WhatsApp QR Code" width={110} height={110} style={{ display: "block", borderRadius: 10 }} />
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#25D366", letterSpacing: "0.5px" }}>SCAN TO CHAT</span>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#25D36622", border: "1px solid #25D36644", borderRadius: 100, padding: "5px 14px", marginBottom: 14 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.057 23.804a.75.75 0 0 0 .92.92l5.946-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.964-1.36l-.355-.214-3.532.876.892-3.532-.232-.367A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#25D366", letterSpacing: "0.5px" }}>WhatsApp Direct Chat</span>
          </div>

          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.3px" }}>Chat with us instantly</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 500, marginBottom: 18 }}>
            Scan the QR code with your phone camera to open a WhatsApp chat directly — no saving numbers needed.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={WA_LINK} target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "10px 20px", borderRadius: 100,
                background: "#25D366", color: "#fff",
                textDecoration: "none", fontSize: 13, fontWeight: 800,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,211,102,0.5)";
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.35)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
              Open WhatsApp
            </a>
            <button
              onClick={copyLink}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 20px", borderRadius: 100,
                background: copied ? "#6DBF3E" : "rgba(255,255,255,0.1)",
                color: "#fff", border: "1.5px solid rgba(255,255,255,0.15)",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Cabinet Grotesk', sans-serif", transition: "all 0.3s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAP CARD
───────────────────────────────────────── */
function MapCard({ inView }: { inView: boolean }) {
  return (
    <div style={{
      borderRadius: 22, overflow: "hidden",
      border: "1.5px solid #EAE6E0",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.42s",
    }}>
      <iframe
        title="Kiwi Connect Digital Location"
        src="https://maps.google.com/maps?q=Bandra+Kurla+Complex+Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="220"
        style={{ display: "block", border: "none" }}
        loading="lazy"
        allowFullScreen
      />
      <div style={{ padding: "16px 20px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1A1A1A" }}>Kiwi Connect Digital HQ</div>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 500, marginTop: 2 }}>BKC, Mumbai — 400 051</div>
        </div>
        <a
          href="https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai"
          target="_blank" rel="noreferrer"
          style={{
            padding: "8px 18px", borderRadius: 100, background: "#6DBF3E", color: "#fff",
            fontSize: 12, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Cabinet Grotesk', sans-serif",
            boxShadow: "0 4px 14px rgba(109,191,62,0.35)",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function ContactForm({ inView }: { inView: boolean }) {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim() || form.message.length < 20) e.message = "Please tell us a bit more (min 20 chars)";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%", padding: "14px 18px",
    borderRadius: 14,
    border: `1.5px solid ${errors[field as keyof FormErrors] ? "#EF4444" : focusedField === field ? "#6DBF3E" : "#E2DDD6"}`,
    background: focusedField === field ? "#FAFFF5" : "#FAFAF7",
    fontSize: 15, color: "#1A1A1A", fontWeight: 500,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    outline: "none", transition: "all 0.25s",
    boxShadow: focusedField === field ? "0 0 0 4px rgba(109,191,62,0.12)" : "none",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 700, color: "#444",
    marginBottom: 7, display: "block", letterSpacing: "0.2px",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 5,
  };

  const EMPTY_FORM: FormState = {
    firstName: "", lastName: "", email: "", phone: "",
    company: "", service: "", budget: "", message: "",
  };

  if (submitted) {
    return (
      <div style={{
        background: "#fff", borderRadius: 28, padding: "80px 60px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.08)",
        border: "1.5px solid #EAE6E0",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", minHeight: 500,
        opacity: inView ? 1 : 0,
        transition: "all 0.7s ease",
      }}>
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          background: "linear-gradient(135deg, #6DBF3E, #A8E063)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 40, marginBottom: 28,
          boxShadow: "0 12px 40px rgba(109,191,62,0.35)",
          animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4)",
        }}>✓</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "#1A1A1A", marginBottom: 14, letterSpacing: "-0.8px" }}>
          Message Received! 🎉
        </h2>
        <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, fontWeight: 500, maxWidth: 380, marginBottom: 36 }}>
          Thank you, <strong style={{ color: "#1A1A1A" }}>{form.firstName}</strong>! Our team will reach out within{" "}
          <strong style={{ color: "#6DBF3E" }}>2 business hours</strong> to discuss your project.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={WA_LINK} target="_blank" rel="noreferrer"
            style={{
              padding: "13px 28px", borderRadius: 100, background: "#25D366", color: "#fff",
              textDecoration: "none", fontSize: 14, fontWeight: 800,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
            }}
          >Chat on WhatsApp →</a>
          <button
            onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}
            style={{
              padding: "13px 28px", borderRadius: 100,
              background: "#F2EFE9", color: "#555", border: "none",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Cabinet Grotesk', sans-serif",
            }}
          >Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff", borderRadius: 28, padding: "48px 52px",
      boxShadow: "0 8px 48px rgba(0,0,0,0.08)",
      border: "1.5px solid #EAE6E0",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(32px)",
      transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.1s",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#6DBF3E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>Start the conversation</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: 8 }}>Tell us about your project</h2>
        <p style={{ fontSize: 14, color: "#888", fontWeight: 500 }}>Free strategy call included. No commitment. No spam, ever.</p>
      </div>

      {/* Name */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>First Name <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            value={form.firstName}
            onChange={e => { setForm({ ...form, firstName: e.target.value }); setErrors({ ...errors, firstName: "" }); }}
            onFocus={() => setFocusedField("firstName")}
            onBlur={() => setFocusedField(null)}
            placeholder="Arjun"
            style={inputStyle("firstName")}
          />
          {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            onFocus={() => setFocusedField("lastName")}
            onBlur={() => setFocusedField(null)}
            placeholder="Shetty"
            style={inputStyle("lastName")}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="arjun@company.com"
            style={inputStyle("email")}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>
        <div>
          <label style={labelStyle}>Phone / WhatsApp <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
            placeholder="+91 98765 43210"
            style={inputStyle("phone")}
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>
      </div>

      {/* Company */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Company / Brand Name</label>
        <input
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          onFocus={() => setFocusedField("company")}
          onBlur={() => setFocusedField(null)}
          placeholder="Your company or brand name"
          style={inputStyle("company")}
        />
      </div>

      {/* Service pills */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Service You&apos;re Interested In <span style={{ color: "#EF4444" }}>*</span></label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SERVICES_LIST.map(svc => (
            <button
              key={svc}
              onClick={() => { setForm({ ...form, service: svc }); setErrors({ ...errors, service: "" }); }}
              style={{
                padding: "8px 16px", borderRadius: 100, border: "none", cursor: "pointer",
                background: form.service === svc ? "#6DBF3E" : "#F2EFE9",
                color: form.service === svc ? "#fff" : "#555",
                fontSize: 12, fontWeight: 700,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                transition: "all 0.2s",
                boxShadow: form.service === svc ? "0 4px 14px rgba(109,191,62,0.35)" : "none",
              }}
            >{svc}</button>
          ))}
        </div>
        {errors.service && <div style={errorStyle}>{errors.service}</div>}
      </div>

      {/* Budget pills */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Monthly Budget</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {BUDGETS.map(b => (
            <button
              key={b}
              onClick={() => setForm({ ...form, budget: b })}
              style={{
                padding: "8px 16px", borderRadius: 100, border: "none", cursor: "pointer",
                background: form.budget === b ? "#1A1A1A" : "#F2EFE9",
                color: form.budget === b ? "#fff" : "#555",
                fontSize: 12, fontWeight: 700,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                transition: "all 0.2s",
              }}
            >{b}</button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelStyle}>Tell Us About Your Goals <span style={{ color: "#EF4444" }}>*</span></label>
        <textarea
          value={form.message}
          onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          placeholder="Share your current challenges, goals, target audience, and anything else that'll help us prepare a tailored strategy for you..."
          rows={5}
          style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120, lineHeight: 1.7 }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          {errors.message ? <div style={errorStyle}>{errors.message}</div> : <div />}
          <div style={{ fontSize: 11, color: "#BBB", fontWeight: 600 }}>{form.message.length} chars</div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", padding: "18px 32px",
          borderRadius: 16, border: "none",
          background: loading ? "#A8E063" : "linear-gradient(135deg, #6DBF3E, #5AAD30)",
          color: "#fff", fontSize: 16, fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Cabinet Grotesk', sans-serif",
          boxShadow: "0 8px 32px rgba(109,191,62,0.38)",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          letterSpacing: "0.2px",
        }}
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 14px 44px rgba(109,191,62,0.5)";
          }
        }}
        onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(109,191,62,0.38)";
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 18, height: 18,
              border: "2.5px solid rgba(255,255,255,0.4)",
              borderTopColor: "#fff", borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }} />
            Sending your message…
          </>
        ) : "Send My Message — It's Free →"}
      </button>

      {/* Trust badges */}
      <div style={{ display: "flex", gap: 20, marginTop: 22, justifyContent: "center", flexWrap: "wrap" }}>
        {["🔒 100% Private", "⚡ 2hr Response", "🚫 No Spam Ever"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "#AAA", fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
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
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
            Kiwi Connect <span style={{ color: "#6DBF3E" }}>Digital</span>
          </span>
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
export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'Cabinet Grotesk', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        input::placeholder, textarea::placeholder { color: #BBC; font-weight: 500; }
        input:focus, textarea:focus { outline: none; }
      `}</style>
      <Navbar activePage="Contact" />
      <HeroSection />
      <ContactSection />
      <Footer />
    </>
  );
}
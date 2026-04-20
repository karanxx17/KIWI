"use client";
import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  type RefObject,
} from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const NAV_LINKS = ["About", "Work", "Services", "Clients", "Contact"];

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
  { value: "More Leads", label: "Consistent Pipeline Growth" },
  { value: "Better Reach", label: "Right Audience Targeting" },
  { value: "Conversions", label: "Optimized Sales Funnels" },
  { value: "Branding", label: "Strong Market Positioning" },
];

const WORK = [
  {
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    client: "Content Creation",
    category: "Scroll-Stopping Posts",
    result: "More Engagement",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    client: "Ad Campaigns",
    category: "Targeted Performance Ads",
    result: "Quality Leads",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    client: "SEO Growth",
    category: "Ranking + Traffic",
    result: "Better Visibility",
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    client: "Branding",
    category: "Identity + Positioning",
    result: "Strong Presence",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Kiwi Connect didn't just run our campaigns — they fundamentally changed how we think about growth. Our revenue tripled in 14 months.",
    name: "Priya Mehta",
    // role: "CEO, Lumē Skincare",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682089844121-6e7d9edc30ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I've worked with five agencies before. None came close to the strategic depth and execution speed of this team.",
    name: "Arjun Shetty",
    // role: "Founder, Stackr Finance",
    avatar:
      "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Every metric we care about moved in the right direction — within weeks, not months.",
    name: "Kavita Rao",
    // role: "CMO, NovaPulse",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CLIENTS = [
  "/clients/client1.jpg",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
  "/clients/client6.png",
  "/clients/logo1.png",
  "/clients/logo.png",
  "/clients/logo 2.jpg",
];

function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─────────────────────────────────────────
// Hero
// ─────────────────────────────────────────
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);
  return (
    <section className="hero relative overflow-hidden min-h-screen">
      {/* --- BUBBLE ANIMATION LAYER --- */}
      <div className="bubble-container">
        <div className="bubble bubble--1" />
        <div className="bubble bubble--2" />
        <div className="bubble bubble--3" />
        <div className="bubble bubble--4" />
        <div className="bubble bubble--5" />
        <div className="bubble-noise" />
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <h1 className={`hero__headline${loaded ? " hero__headline--in" : ""}`}>
          Marketing That
          <br />
          <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
            Actually Grows
          </em>
          <br />
          Your Business.
        </h1>

        <p className={`hero__sub${loaded ? " hero__sub--in" : ""}`}>
          Kiwi Connect Digital is a full-service growth agency. We blend
          strategy, creativity, and data to build marketing that converts.
        </p>

        <div className={`hero__ctas${loaded ? " hero__ctas--in" : ""}`}>
          <Link href="/contact">
            <button className="btn btn--primary">Start Growing Today →</button>
          </Link>
          <Link href="/services">
            <button className="btn btn--outline">View Our Services</button>
          </Link>
        </div>
      </div>

      {/* Hero Image Grid */}
      <div className={`hero__grid${loaded ? " hero__grid--in" : ""}`}>
        <div className="hero__grid-main">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85"
            alt="Team"
            className="hero__grid-img"
          />
          <div className="hero__grid-caption">
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#ff6ce7",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              STRATEGY & VISION
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>
              Building brands that last
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=85"
          alt="Analytics"
          className="hero__grid-img hero__grid-img--sm"
        />
        <div className="hero__grid-stat">
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            4.2×
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Average ROAS
            <br />
            across all clients
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=85"
          alt="Creative"
          className="hero__grid-img hero__grid-img--sm"
        />
        <img
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=85"
          alt="Data"
          className="hero__grid-img hero__grid-img--sm"
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Stats
// ─────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="stats">
      {STATS.map((s, i) => (
        <div
          key={i}
          className={`stats__item${inView ? " stats__item--in" : ""}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="stats__value">{s.value}</div>
          <div className="stats__label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────
// Services
// ─────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="section section--light">
      <div className="container">
        <div className="services__header">
          {/* Changed: Removed the template literal and 'inView' check */}
          <div className="services__header-left">
            <div className="eyebrow">What We Do</div>
            <h2 className="heading-lg">
              Services built for
              <br />
              <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
                real results.
              </em>
            </h2>
          </div>

          {/* Changed: Removed conditional classes */}
          <p className="services__header-desc">
            From brand building to high-performance campaigns, we deliver
            end-to-end marketing solutions built on real results.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Removed: inView prop as it's no longer needed for visibility
function ServiceCard({ s }: { s: (typeof SERVICES)[0] }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      /* Removed: service-card--in and dynamic style for transitionDelay */
      className={`service-card${hov ? " service-card--hov" : ""}`}
    >
      <div className="service-card__top">
        <div className="service-card__icon">{s.icon}</div>
        <span className="service-card__tag">{s.tag}</span>
      </div>
      <h3 className="service-card__title">{s.title}</h3>
      <p className="service-card__desc">{s.desc}</p>
      <div className="service-card__link">
        Learn more{" "}
        <span
          className={`service-card__arrow${hov ? " service-card__arrow--hov" : ""}`}
        >
          →
        </span>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────
// About
// ─────────────────────────────────────────
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} className="section section--white">
      <div className="container">
        <div className="about__grid">
          {/* Image cluster */}
          <div className={`about__images${inView ? " about__images--in" : ""}`}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=85"
              alt="Team"
              className="about__img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=85"
              alt="Work"
              className="about__img-second"
            />

            {/* Badge */}
            <div className="about__badge">
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                Growth
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                Focused
                <br />
                Agency
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`about__text${inView ? " about__text--in" : ""}`}>
            <div className="eyebrow">About Kiwi Connect</div>

            <h2 className="heading-lg">
              We're not just an agency.
              <br />
              We're your{" "}
              <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
                growth partners.
              </em>
            </h2>

            <p className="body-text">
              Kiwi Connect Digital is a young and fast-growing marketing agency
              built for startups and modern businesses. We focus on what
              actually matters — generating leads, building brands, and driving
              real growth.
            </p>

            <p className="body-text">
              We may be new, but we move fast, think smart, and execute with
              precision. Our approach is simple: no fluff, no guesswork — just
              strategies that work.
            </p>

            <div className="about__pillars">
              {[
                ["Startup Mindset", "Fast, flexible, and built for growth."],
                ["Performance Focus", "Every action tied to results."],
                ["Execution First", "Ideas are nothing without action."],
              ].map(([title, sub]) => (
                <div key={title} className="pillar">
                  <div className="pillar__dot" />
                  <div>
                    <div className="pillar__title">{title}</div>
                    <div className="pillar__sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Employees / Team
// ─────────────────────────────────────────
interface Employee {
  _id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

function EmployeesSection() {
  const [ref, inView] = useInView();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  if (!employees || employees.length === 0) return null;

  return (
    <section id="team" ref={ref} className="section section--light">
      <div className="container">
        <div className={`text-center mb-lg${inView ? " fade-in" : ""}`}>
          <div className="eyebrow">Our Team</div>
          <h2 className="heading-lg">The minds behind the magic.</h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {employees.map((emp, i) => (
            <div
              key={emp._id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "30px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transform: inView ? "translateY(0)" : "translateY(20px)",
                opacity: inView ? 1 : 0,
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <img
                src={emp.image || "https://via.placeholder.com/150"}
                alt={emp.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 20px",
                  border: "3px solid #ff6ce7",
                }}
              />
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#1A1A1A",
                  marginBottom: "8px",
                }}
              >
                {emp.name}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ff6ce7",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                }}
              >
                {emp.role}
              </p>
              {emp.bio && (
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                  {emp.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Clients
// ─────────────────────────────────────────
function ClientsSection() {
  const [ref, inView] = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless infinite loop
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clients" ref={ref} className="clients">
      <div className="container">
        <p className="clients__label">Trusted by leading brands worldwide</p>
      </div>

      <div className="carousel">
        <div className="carousel__track" ref={trackRef}>
          {doubled.map((url, i) => (
            <div key={i} className="carousel__item">
              <img
                src={url}
                alt="client"
                style={{ height: 64, objectFit: "contain", maxWidth: 140 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────
function TestimonialsSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section className="section section--white">
      <div ref={ref} className="container">
        <div className="text-center mb-lg">
          <div className="eyebrow">Client Love</div>
          <h2 className="heading-lg">Don't take our word for it.</h2>
        </div>

        <div className={`testimonial${inView ? " testimonial--in" : ""}`}>
          <div className="testimonial__quote-mark">"</div>
          <p className="testimonial__text">{TESTIMONIALS[active].quote}</p>
          <div className="testimonial__author">
            <img
              src={TESTIMONIALS[active].avatar}
              alt=""
              className="testimonial__avatar"
            />
            <div>
              <div className="testimonial__name">
                {TESTIMONIALS[active].name}
              </div>
              {/* <div className="testimonial__role">{TESTIMONIALS[active].role}</div> */}
            </div>
          </div>
        </div>

        <div className="testimonial__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`testimonial__dot${i === active ? " testimonial__dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// CTA
// ─────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" className="section section--light">
      <div className="container">
        <div ref={ref} className={`cta-block${inView ? " cta-block--in" : ""}`}>
          <div className="cta-block__glow" />
          <div className="cta-block__text">
            <div className="eyebrow eyebrow--green">Ready to scale?</div>
            <h2 className="heading-lg heading--white">
              Let's build something
              <br />
              <em style={{ fontStyle: "italic", color: "#ba3aff" }}>
                extraordinary together.
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                marginTop: 12,
              }}
            >
              Free strategy audit included. No commitment required.
            </p>
          </div>
          <div className="cta-block__actions">
            <Link href="/contact">
              <button className="btn btn--primary">Get Free Audit →</button>
            </Link>
            {/* <button className="btn btn--ghost">Schedule a Call</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────
function Footer() {
  const MENU: [string, string[]][] = [
    ["Company", ["About", "Work", "Services", "Blog", "Careers"]],
    [
      "Services",
      [
        "Brand Strategy",
        "Performance",
        "SEO & Content",
        "Social Media",
        "Web & UX",
      ],
    ],
    [
      "Contact",
      [
        "kiwiconnectdigital@gmail.com",
        "+91 8305959538, +91 6261610281",
        "Bhopal, India",
        "LinkedIn",
        "Twitter",
      ],
    ],
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/kiwilogo.png"
                alt="Kiwi Connect Digital"
                style={{ width: 36, height: 36, objectFit: "contain" }}
              />
              <span className="footer__logo-text">
                Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
              </span>
            </div>

            <p className="footer__tagline">
              Growth-driven marketing for ambitious brands. Built for results,
              focused on scale.
            </p>

            {/* CTA */}
            <div className="footer__cta">
              <div className="footer__cta-text">
                Ready to grow your business?
              </div>
              {/* <a href="#contact" className="footer__cta-btn">Get Free Consultation</a> */}
            </div>
          </div>

          {/* Services */}
          <div className="footer__col">
            <div className="footer__col-title">Services</div>
            <div className="footer__col-item">Social Media Marketing</div>
            <div className="footer__col-item">Performance Ads</div>
            <div className="footer__col-item">SEO Optimization</div>
            <div className="footer__col-item">Website Development</div>
            <div className="footer__col-item">Branding & Design</div>
          </div>

          {/* Company */}
          <div className="footer__col">
            <div className="footer__col-title">Company</div>
            <div className="footer__col-item">About Us</div>
            <div className="footer__col-item">Our Process</div>
            <div className="footer__col-item">Contact</div>
            <div className="footer__col-item">Careers</div>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <div className="footer__col-title">Contact</div>
            <div className="footer__col-item">📞 +91 83059 59538</div>
            <div className="footer__col-item">
              📧 kiwiconnectdigital@gmail.com.com
            </div>
            <div className="footer__col-item">📍 India</div>

            {/* Socials */}
            <div style={{ marginTop: 12 }}>
              <div className="footer__col-item">Instagram</div>
              <div className="footer__col-item">LinkedIn</div>
              <div className="footer__col-item">Facebook</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <div>© 2026 Kiwi Connect Digital. All rights reserved.</div>
          <div>Crafted with 💜 by Kiwi Connect</div>
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* ── UTILITIES ─────────────────────── */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
        .section { padding: 80px 0; }
        .section--light { background: #FAFAF7; }
        .section--sand { background: #F2F0EA; }
        .section--white { background: #fff; }
        @media (min-width: 768px) { .section { padding: 120px 0; } }

        .eyebrow {
          font-size: 12px; font-weight: 800; color: #ff6ce7;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
        }
        .eyebrow--green { color: #ff6ce7; }

        .heading-lg {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800; color: #1A1A1A;
          line-height: 1.1; letter-spacing: -1.5px;
        }
        .heading--white { color: #fff; }

        .body-text { font-size: 15px; line-height: 1.8; color: #666; margin-bottom: 18px; font-weight: 500; }
        @media (min-width: 768px) { .body-text { font-size: 16px; } }

        .text-center { text-align: center; }
        .mb-lg { margin-bottom: 48px; }
        @media (min-width: 768px) { .mb-lg { margin-bottom: 72px; } }

        /* ── BUTTONS ───────────────────────── */
        .btn {
          padding: 14px 28px; border-radius: 100px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.25s;
          white-space: nowrap; border: none;
        }
        @media (min-width: 480px) { .btn { padding: 16px 36px; font-size: 15px; } }

        .btn--primary {
          background: #ff6ce7; color: #fff;
          box-shadow: 0 8px 32px rgba(109,191,62,0.38);
        }
        .btn--primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 40px rgba(109,191,62,0.5);
        }
        .btn--outline {
          background: transparent; color: #1A1A1A;
          border: 2px solid #D0D0D0;
        }
        .btn--outline:hover { border-color: #ff6ce7; color: #ff6ce7; }

        .btn--ghost {
          background: transparent; color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .btn--ghost:hover { border-color: rgba(255,255,255,0.5); color: #fff; }

        /* ── NAVBAR ────────────────────────── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.3s;
        }
        .navbar--scrolled {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
        }
        .navbar__inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 5%;
        }
        .navbar__logo { display: flex; align-items: center; gap: 10px; }
        .navbar__logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .navbar__logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; color: #1A1A1A; white-space: nowrap;
        }
        .navbar__links {
          display: none; list-style: none; gap: 36px;
        }
        @media (min-width: 768px) { .navbar__links { display: flex; } }

        .navbar__link {
          font-size: 14px; font-weight: 600; color: #3A3A3A;
          text-decoration: none; transition: color 0.2s;
        }
        .navbar__link:hover { color: #ff6ce7; }

        .navbar__cta {
          display: none;
          padding: 10px 22px; border-radius: 100px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.25s; font-family: 'DM Sans', sans-serif;
        }
        @media (min-width: 768px) { .navbar__cta { display: block; } }
        .navbar__cta:hover { background: #ff6ce7; }

        .navbar__cta--mobile {
          display: block; width: 100%; margin-top: 8px;
          padding: 14px; text-align: center; border-radius: 12px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar__hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        @media (min-width: 768px) { .navbar__hamburger { display: none; } }

        .navbar__hamburger-line {
          display: block; width: 24px; height: 2px;
          background: #1A1A1A; border-radius: 2px;
          transition: all 0.3s;
        }
        .navbar__hamburger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar__hamburger-line.open:nth-child(2) { opacity: 0; }
        .navbar__hamburger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .navbar__mobile-menu {
          display: flex; flex-direction: column; gap: 4px;
          background: #fff; padding: 0 5%;
          max-height: 0; overflow: hidden;
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
          border-top: 1px solid transparent;
        }
        .navbar__mobile-menu--open {
          max-height: 400px; padding: 16px 5% 24px;
          border-top-color: #EAE6E0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .navbar__mobile-link {
          font-size: 17px; font-weight: 600; color: #1A1A1A;
          text-decoration: none; padding: 10px 0;
          border-bottom: 1px solid #F0EDE8;
          transition: color 0.2s;
        }
        .navbar__mobile-link:hover { color: #ff6ce7; }

        /* ── HERO ──────────────────────────── */
        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, #FAFAF7 0%, #F0F7E8 50%, #FAFAF7 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 120px 5% 60px;
          position: relative; overflow: hidden;
          text-align: center;
        }
        .hero__blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .hero__blob--tr {
          top: 10%; right: 8%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(109,191,62,0.14) 0%, transparent 70%);
        }
        .hero__blob--bl {
          bottom: 5%; left: 3%; width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 70%);
        }
        @media (min-width: 768px) {
          .hero__blob--tr { width: 420px; height: 420px; }
          .hero__blob--bl { width: 300px; height: 300px; }
        }

        .hero__badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #D6EFC0;
          border-radius: 100px; padding: 7px 18px; margin-bottom: 28px;
          box-shadow: 0 2px 16px rgba(109,191,62,0.12);
          opacity: 0; transform: translateY(20px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
          font-size: 12px; font-weight: 700; color: #b774db; letter-spacing: 0.4px;
          position: relative; z-index: 1;
        }
        @media (min-width: 480px) { .hero__badge { font-size: 13px; } }
        .hero__badge--in { opacity: 1; transform: translateY(0); }
        .hero__badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff6ce7; display: inline-block;
          animation: pulse 2s infinite; flex-shrink: 0;
        }

        .hero__headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 7vw, 88px);
          font-weight: 800; line-height: 1.05;
          color: #141414; letter-spacing: -2px;
          max-width: 960px; margin-bottom: 24px;
          opacity: 0; transform: translateY(30px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s;
          position: relative; z-index: 1;
        }
        .hero__headline--in { opacity: 1; transform: translateY(0); }

        .hero__sub {
          font-size: clamp(14px, 1.8vw, 19px); color: #5A5A5A;
          max-width: 560px; line-height: 1.7; font-weight: 500;
          margin-bottom: 40px;
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s;
          position: relative; z-index: 1;
        }
        .hero__sub--in { opacity: 1; transform: translateY(0); }

        .hero__ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center; margin-bottom: 56px;
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s;
          position: relative; z-index: 1;
        }
        .hero__ctas--in { opacity: 1; transform: translateY(0); }

        /* Hero image grid */
        .hero__grid {
          width: 100%; max-width: 1100px;
          display: grid; gap: 10px; border-radius: 20px; overflow: hidden;
          opacity: 0; transform: translateY(40px);
          transition: all 1s cubic-bezier(.22,.68,0,1.2) 0.45s;
          /* Mobile: 2 cols, 3 rows */
          grid-template-columns: 1.4fr 1fr;
          grid-template-rows: 180px 120px 120px;
        }
        .hero__grid--in { opacity: 1; transform: translateY(0); }
        
        @media (min-width: 640px) {
          .hero__grid {
            grid-template-columns: 1.4fr 1fr 1fr;
            grid-template-rows: 240px 180px;
          }
        }

        .hero__grid-main {
          position: relative; border-radius: 16px; overflow: hidden;
          /* Mobile: spans both rows in col 1 */
          grid-row: 1 / 3;
        }
        @media (max-width: 639px) {
          .hero__grid-main { grid-row: 1 / 3; grid-column: 1; }
          .hero__grid-img--sm:nth-child(2) { grid-column: 2; grid-row: 1; }
          .hero__grid-stat { grid-column: 2; grid-row: 2; }
          .hero__grid-img--sm:nth-child(4) { grid-column: 1; grid-row: 3; }
          .hero__grid-img--sm:nth-child(5) { grid-column: 2; grid-row: 3; }
        }

        .hero__grid-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.6s;
          border-radius: 16px;
        }
        .hero__grid-img:hover { transform: scale(1.04); }
        .hero__grid-img--sm { border-radius: 16px; overflow: hidden; }

        .hero__grid-caption {
          position: absolute; bottom: 14px; left: 14px;
          background: rgba(255,255,255,0.92); border-radius: 10px;
          padding: 8px 12px; backdrop-filter: blur(8px);
        }
        .hero__grid-stat {
          border-radius: 16px; overflow: hidden;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 16px;
        }

        /* ── STATS ─────────────────────────── */
        .stats {
          background: #1A1A1A;
          padding: 48px 5%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        @media (min-width: 640px) {
          .stats { grid-template-columns: repeat(4, 1fr); padding: 60px 5%; }
        }

        .stats__item {
          text-align: center; padding: 20px 16px;
          opacity: 0; transform: translateY(24px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
        }
        /* borders: right on col 1, bottom on row 1 for 2-col mobile */
        @media (max-width: 639px) {
          .stats__item:nth-child(1),
          .stats__item:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.1); }
          .stats__item:nth-child(1),
          .stats__item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
        @media (min-width: 640px) {
          .stats__item:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.1); }
        }
        .stats__item--in { opacity: 1; transform: translateY(0); }

        .stats__value {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; color: #ff6ce7; line-height: 1;
        }
        .stats__label {
          font-size: 12px; color: rgba(255,255,255,0.55);
          margin-top: 8px; font-weight: 600;
          letter-spacing: 0.5px; text-transform: uppercase;
        }

        /* ── SERVICES ──────────────────────── */
        .services__header {
          display: flex; flex-direction: column;
          gap: 24px; margin-bottom: 48px;
        }
        @media (min-width: 768px) {
          .services__header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 72px;
          }
        }
        .services__header-left { flex-shrink: 0; }
        .services__header-desc {
          max-width: 360px; color: #666; line-height: 1.8;
          font-size: 14px; font-weight: 500;
          opacity: 0; transition: all 0.7s ease 0.15s;
        }
        @media (min-width: 768px) { .services__header-desc { font-size: 15px; } }

        .services__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 480px) {
          .services__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .services__grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }

        .service-card {
          background: #fff; border: 1.5px solid #EAE6E0;
          border-radius: 20px; padding: 28px 24px;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          cursor: default;
          opacity: 0; transform: translateY(32px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        @media (min-width: 768px) { .service-card { padding: 36px 32px; } }
        .service-card--in { opacity: 1; transform: translateY(0); }
        .service-card--hov {
          background: #1A1A1A; border-color: #ff6ce7;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }
        .service-card__top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 20px;
        }
        .service-card__icon { font-size: 26px; color: #ff6ce7; }
        .service-card__tag {
          font-size: 11px; font-weight: 800;
          color: #CCC; letter-spacing: 1px;
        }
        .service-card--hov .service-card__tag { color: rgba(255,255,255,0.3); }
        .service-card__title {
          font-family: 'Syne', sans-serif; font-size: 18px;
          font-weight: 800; color: #1A1A1A;
          margin-bottom: 12px; letter-spacing: -0.3px;
          transition: color 0.3s;
        }
        .service-card--hov .service-card__title { color: #fff; }
        .service-card__desc {
          font-size: 13px; line-height: 1.75; color: #777;
          transition: color 0.3s; font-weight: 500;
        }
        @media (min-width: 768px) { .service-card__desc { font-size: 14px; } }
        .service-card--hov .service-card__desc { color: rgba(255,255,255,0.65); }
        .service-card__link {
          margin-top: 24px; font-size: 13px; font-weight: 700;
          color: #1A1A1A; display: flex; align-items: center; gap: 6px;
          transition: color 0.3s;
        }
        .service-card--hov .service-card__link { color: #ff6ce7; }
        .service-card__arrow { transition: transform 0.3s; display: inline-block; }
        .service-card__arrow--hov { transform: translateX(4px); }

        /* Fade-in utility */
        .fade-in { opacity: 0; transform: translateY(24px); transition: all 0.7s ease; }
        .fade-in--delay { transition-delay: 0.15s; }

        /* ── WORK ──────────────────────────── */
        .work__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .work__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        .work-card {
          border-radius: 20px; overflow: hidden;
          position: relative; height: 260px; cursor: pointer;
          opacity: 0; transform: translateY(40px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        @media (min-width: 480px) { .work-card { height: 300px; } }
        @media (min-width: 768px) { .work-card { height: 340px; border-radius: 24px; } }
        .work-card--in { opacity: 1; transform: translateY(0); }
        .work-card--hov { box-shadow: 0 24px 64px rgba(0,0,0,0.22); }

        .work-card__img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.6s;
        }
        .work-card__img--hov { transform: scale(1.07); }
        .work-card__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%);
          transition: background 0.4s;
        }
        .work-card__overlay--hov {
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
        }
        .work-card__content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 24px;
        }
        @media (min-width: 768px) { .work-card__content { padding: 28px 32px; } }
        .work-card__category {
          font-size: 10px; font-weight: 800; color: #ba3aff;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;
        }
        @media (min-width: 480px) { .work-card__category { font-size: 11px; } }
        .work-card__bottom {
          display: flex; justify-content: space-between; align-items: flex-end; gap: 8px;
        }
        .work-card__client {
          font-family: 'Syne', sans-serif; font-size: 20px;
          font-weight: 800; color: #fff; letter-spacing: -0.5px;
        }
        @media (min-width: 768px) { .work-card__client { font-size: 24px; } }
        .work-card__result {
          background: #ff6ce7; color: #fff;
          padding: 6px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          opacity: 0; transform: translateY(8px);
          transition: all 0.3s;
        }
        @media (min-width: 480px) { .work-card__result { padding: 7px 16px; font-size: 13px; } }
        .work-card__result--hov { opacity: 1; transform: translateY(0); }

        /* ── ABOUT ─────────────────────────── */
        .about__grid {
          display: grid; grid-template-columns: 1fr;
          gap: 48px; align-items: center;
        }
        @media (min-width: 900px) {
          .about__grid { grid-template-columns: 1fr 1fr; gap: 80px; }
        }

        .about__images {
          position: relative; height: 380px;
          opacity: 0; transform: translateX(-40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2);
        }
        @media (min-width: 480px) { .about__images { height: 460px; } }
        @media (min-width: 768px) { .about__images { height: 540px; } }
        .about__images--in { opacity: 1; transform: translateX(0); }

        .about__img-main {
          position: absolute; top: 0; left: 0;
          width: 78%; height: 72%;
          object-fit: cover; border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14);
        }
        @media (min-width: 640px) { .about__img-main { border-radius: 24px; } }

        .about__img-second {
          position: absolute; bottom: 0; right: 0;
          width: 52%; height: 48%;
          object-fit: cover; border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.16);
          border: 4px solid #fff;
        }
        @media (min-width: 640px) { .about__img-second { border: 5px solid #fff; border-radius: 20px; } }

        .about__badge {
          position: absolute; top: 40%; right: 8%;
          background: #ff6ce7; border-radius: 14px; padding: 16px 20px;
          box-shadow: 0 12px 40px rgba(109,191,62,0.45);
        }

        .about__text {
          opacity: 0; transform: translateX(40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2) 0.15s;
        }
        .about__text--in { opacity: 1; transform: translateX(0); }
        .about__text .heading-lg { margin-bottom: 20px; margin-top: 8px; }

        .about__pillars {
          display: flex; flex-direction: column; gap: 16px; margin-top: 32px;
        }
        @media (min-width: 480px) {
          .about__pillars { flex-direction: row; flex-wrap: wrap; gap: 20px; }
        }

        .pillar { display: flex; gap: 12px; align-items: flex-start; }
        .pillar__dot {
          width: 20px; height: 20px; border-radius: 50%;
          background: #E8F7D8; border: 2px solid #ff6ce7;
          flex-shrink: 0; margin-top: 2px;
        }
        .pillar__title { font-size: 14px; font-weight: 800; color: #1A1A1A; }
        .pillar__sub { font-size: 13px; color: #888; margin-top: 2px; font-weight: 500; }

       /* ── CLIENTS CAROUSEL ──────────────────── */
.clients {
  padding: 60px 0;
  background: #FAFAF7;
  border-top: 1px solid #EAE6E0;
  border-bottom: 1px solid #EAE6E0;
  overflow: hidden;
}
@media (min-width: 768px) { .clients { padding: 80px 0; } }

.clients__label {
  text-align: center; font-size: 11px; font-weight: 800;
  color: #AAA; letter-spacing: 2.5px; text-transform: uppercase;
  margin-bottom: 36px;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* fade edges */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

.carousel__track {
  display: flex;
  align-items: center;
  gap: 0;
  width: max-content;
  animation: marquee 22s linear infinite;
}

.carousel__track:hover {
  animation-play-state: paused;
}

.carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  transition: opacity 0.3s, filter 0.3s;
  flex-shrink: 0;
}

.carousel__item:hover {
  opacity: 1;
  filter: grayscale(0);
}

        /* ── TESTIMONIALS ──────────────────── */
        .testimonial {
          background: #F7F4EF; border-radius: 24px;
          padding: 40px 28px; margin-bottom: 32px;
          position: relative; text-align: left;
          opacity: 0; transform: translateY(32px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 40px rgba(0,0,0,0.06);
        }
        @media (min-width: 640px) { .testimonial { padding: 56px 64px; border-radius: 28px; } }
        .testimonial--in { opacity: 1; transform: translateY(0); }

        .testimonial__quote-mark {
          font-size: 72px; color: #ff6ce7; line-height: 0.6;
          margin-bottom: 28px; font-family: Georgia, serif; opacity: 0.4;
        }
        .testimonial__text {
          font-size: clamp(15px, 2vw, 22px); line-height: 1.7;
          color: #2C2C2C; font-weight: 500; font-style: italic;
          margin-bottom: 28px;
        }
        .testimonial__author {
          display: flex; align-items: center; gap: 14px;
          justify-content: flex-start;
        }
        .testimonial__avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover; border: 3px solid #ff6ce7; flex-shrink: 0;
        }
        @media (min-width: 640px) { .testimonial__avatar { width: 48px; height: 48px; } }
        .testimonial__name { font-weight: 800; font-size: 14px; color: #1A1A1A; }
        @media (min-width: 480px) { .testimonial__name { font-size: 15px; } }
        .testimonial__role { font-size: 13px; color: #888; font-weight: 500; }

        .testimonial__dots {
          display: flex; gap: 10px; justify-content: center;
        }
        .testimonial__dot {
          height: 10px; width: 10px; border-radius: 100px;
          background: #DDD; border: none; cursor: pointer;
          transition: all 0.3s;
        }
        .testimonial__dot--active { width: 28px; background: #ff6ce7; }

        /* ── CTA ───────────────────────────── */
        .cta-block {
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          border-radius: 24px; padding: 48px 32px;
          display: flex; flex-direction: column; gap: 32px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2);
        }
        @media (min-width: 640px) { .cta-block { padding: 64px 64px; border-radius: 28px; } }
        @media (min-width: 900px) {
          .cta-block {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 80px 80px; border-radius: 32px;
            gap: 60px;
          }
        }
        .cta-block--in { opacity: 1; transform: translateY(0); }

        .cta-block__glow {
          position: absolute; top: -40%; right: 20%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(109,191,62,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-block__text { position: relative; z-index: 1; }
        .cta-block__text .heading-lg { margin: 8px 0 0; }
        .cta-block__actions {
          display: flex; flex-direction: column; gap: 12px;
          flex-shrink: 0; position: relative; z-index: 1;
        }
        @media (min-width: 480px) {
          .cta-block__actions { flex-direction: row; }
        }
        @media (min-width: 900px) {
          .cta-block__actions { flex-direction: column; }
        }

        /* ── FOOTER ────────────────────────── */
        .footer { background: #111; padding: 48px 0 28px; }
        @media (min-width: 768px) { .footer { padding: 60px 0 32px; } }

        .footer__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px; margin-bottom: 48px;
        }
        @media (min-width: 640px) {
          .footer__grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .footer__grid { grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px; }
        }

        .footer__brand { grid-column: 1 / -1; }
        @media (min-width: 640px) { .footer__brand { grid-column: 1; } }

        .footer__logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .footer__logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .footer__logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; color: #fff;
        }
        .footer__tagline {
          font-size: 13px; color: rgba(255,255,255,0.4);
          line-height: 1.8; font-weight: 500; max-width: 260px;
        }
        .footer__col-title {
          font-size: 11px; font-weight: 800; color: #ff6ce7;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px;
        }
        .footer__col-item {
          font-size: 13px; color: rgba(255,255,255,0.4);
          margin-bottom: 9px; cursor: pointer; font-weight: 500;
          transition: color 0.2s;
        }
        .footer__col-item:hover { color: #fff; }
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px; display: flex;
          flex-direction: column; gap: 8px;
          font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 500;
        }
        @media (min-width: 640px) {
          .footer__bottom {
            flex-direction: row;
            justify-content: space-between; align-items: center;
            font-size: 13px;
          }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      {/* <WorkSection /> */}
      <AboutSection />
      <EmployeesSection />
      <ClientsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}

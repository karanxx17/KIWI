"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = ["Services", "About", "Contact"];

export default function Navbar({ activePage = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close mobile menu on route change / resize */
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');

        .kcd-nav-link {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.2px;
          transition: color 0.2s;
        }
        .kcd-nav-link:hover { color: #6DBF3E !important; }

        .kcd-cta-btn {
          padding: 10px 22px;
          border-radius: 100px;
          background: #1A1A1A;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          font-family: 'Cabinet Grotesk', sans-serif;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .kcd-cta-btn:hover {
          background: #6DBF3E !important;
          transform: scale(1.04);
        }

        /* Hamburger */
        .kcd-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 1001;
        }
        .kcd-hamburger span {
          display: block;
          width: 24px;
          height: 2.5px;
          background: #1A1A1A;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.2);
          transform-origin: center;
        }
        .kcd-hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .kcd-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .kcd-hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        /* Mobile drawer */
        .kcd-mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0; right: 0;
          background: rgba(250,248,244,0.98);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid #E8E2D9;
          flex-direction: column;
          padding: 24px 5% 32px;
          gap: 6px;
          z-index: 998;
          transform: translateY(-16px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          pointer-events: none;
        }
        .kcd-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .kcd-mobile-link {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #1A1A1A;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid #EAE6E0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s;
        }
        .kcd-mobile-link:last-of-type { border-bottom: none; }
        .kcd-mobile-link:hover { color: #6DBF3E; }
        .kcd-mobile-link.active { color: #6DBF3E; }
        .kcd-mobile-cta {
          margin-top: 16px;
          padding: 15px 24px;
          border-radius: 100px;
          background: #1A1A1A;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Cabinet Grotesk', sans-serif;
          width: 100%;
          transition: background 0.25s;
        }
        .kcd-mobile-cta:hover { background: #6DBF3E; }

        @media (max-width: 768px) {
          .kcd-desktop-links { display: none !important; }
          .kcd-hamburger { display: flex !important; }
          .kcd-mobile-menu { display: flex; }
        }
      `}</style>

      {/* ── NAV BAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "0 5%",
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(250,248,244,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid #E8E2D9" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>

        {/* ── Logo ── */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #6DBF3E, #A8E063)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "#fff",
            boxShadow: "0 4px 16px rgba(109,191,62,0.35)",
            fontFamily: "'Syne', sans-serif",
            flexShrink: 0,
          }}>K</div>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 17, color: "#1A1A1A", letterSpacing: "-0.3px",
          }}>
            Kiwi Connect{" "}
            <span style={{ color: "#6DBF3E" }}>Digital</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <div className="kcd-desktop-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map(link => {
            const isActive = activePage.toLowerCase() === link.toLowerCase();
            return (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="kcd-nav-link"
                style={{ color: isActive ? "#6DBF3E" : "#3A3A3A" }}
              >
                {link}
              </a>
            );
          })}
          <a href="/contact">
            <button className="kcd-cta-btn">Get a Free Audit →</button>
          </a>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`kcd-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`kcd-mobile-menu${menuOpen ? " open" : ""}`} role="navigation">
        {NAV_LINKS.map(link => {
          const isActive = activePage.toLowerCase() === link.toLowerCase();
          return (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className={`kcd-mobile-link${isActive ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link}
              <span style={{ fontSize: 16, opacity: 0.35 }}>→</span>
            </a>
          );
        })}
        <a href="/contact" onClick={() => setMenuOpen(false)}>
          <button className="kcd-mobile-cta">Get a Free Audit →</button>
        </a>
      </div>

      {/* ── Mobile backdrop overlay ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 997,
            background: "rgba(0,0,0,0.08)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}
import { notFound } from "next/navigation";
import Link from "next/link";


const SERVICES = [
  {
    id: "Social-Media-Marketing", icon: "📱", tag: "01",
    title: "Social Media Marketing",
    short: "Build a powerful community that converts.",
    desc: "Build a strong social media presence with expert management services. We create engaging content, manage profiles, and run campaigns to boost engagement and grow your following across every platform.",
    features: ["Content Strategy & Calendar", "Profile Management", "Community Engagement", "Campaign Execution", "Analytics & Reporting"],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&q=85",
    accent: "#ff6ce7",
  },
  {
    id: "seo", icon: "🔍", tag: "02",
    title: "SEO Services",
    short: "Rank higher. Get found. Grow organically.",
    desc: "Boost your website's visibility and rank higher on search engines with expert SEO strategies to drive organic traffic.",
    features: ["Technical SEO Audit", "On-Page Optimisation", "Link Building", "Keyword Research"],
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=700&q=85",
    accent: "#3B82F6",
  },
  {
    id: "ads", icon: "🎯", tag: "03",
    title: "Google & Meta Ads",
    short: "Every rupee working harder for you.",
    desc: "Maximize ROI with targeted ad campaigns on Google and Meta platforms.",
    features: ["Campaign Setup", "Audience Targeting", "A/B Testing", "Conversion Tracking"],
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&q=85",
    accent: "#F97316",
  },
  {
    id: "reels", icon: "🎬", tag: "04",
    title: "Reels & Short Video Editing",
    short: "Scroll-stopping content.",
    desc: "Create viral-worthy short videos and reels that capture attention instantly.",
    features: ["Script", "Editing", "Captions", "Music"],
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=85",
    accent: "#EC4899",
  },
  {
    id: "software", icon: "💻", tag: "05",
    title: "Software Development",
    short: "Custom solutions.",
    desc: "We build scalable software tailored to your business.",
    features: ["CRM/ERP", "SaaS", "APIs", "Cloud"],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=85",
    accent: "#14B8A6",
  },
  {
    id: "app-dev", icon: "📱", tag: "06",
    title: "Mobile App Development",
    short: "Apps that perform.",
    desc: "We develop high-performance mobile applications.",
    features: ["iOS", "Android", "React Native", "Push Notifications"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85",
    accent: "#6366F1",
  },
  {
    id: "web-dev", icon: "🌐", tag: "07",
    title: "Website Development",
    short: "High-converting websites.",
    desc: "We build responsive and conversion-focused websites.",
    features: ["UI/UX", "Responsive", "CMS", "Speed Optimisation"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=85",
    accent: "#8B5CF6",
  },
  {
    id: "youtube", icon: "▶️", tag: "08",
    title: "YouTube Marketing",
    short: "Grow your channel.",
    desc: "We help you grow your YouTube presence.",
    features: ["SEO", "Thumbnails", "Ads", "Growth Strategy"],
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&q=85",
    accent: "#EF4444",
  },
  {
    id: "influencer", icon: "🤝", tag: "09",
    title: "Influencer Marketing",
    short: "Amplify reach.",
    desc: "Connect with influencers to grow your brand.",
    features: ["Vetting", "Campaigns", "Tracking", "ROI"],
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=85",
    accent: "#F59E0B",
  },
  {
    id: "gmb", icon: "📍", tag: "10",
    title: "GMB & Local SEO",
    short: "Dominate local search.",
    desc: "Optimise your Google Business Profile.",
    features: ["GMB Setup", "Reviews", "Citations", "Local SEO"],
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=700&q=85",
    accent: "#10B981",
  },
  {
    id: "brand", icon: "🎨", tag: "11",
    title: "Branding",
    short: "Build identity.",
    desc: "Create a memorable brand identity.",
    features: ["Logo", "Guidelines", "Typography"],
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&q=85",
    accent: "#ff6ce7",
  },
  {
    id: "email", icon: "📧", tag: "12",
    title: "Email Marketing",
    short: "High ROI.",
    desc: "Engage customers with email campaigns.",
    features: ["Automation", "Templates", "A/B Testing"],
    img: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=700&q=80",
    accent: "#6366F1",
  },
  {
    id: "content", icon: "✍️", tag: "13",
    title: "Content Creation",
    short: "Content that converts.",
    desc: "Create engaging content for your brand.",
    features: ["Blogs", "Copywriting", "Graphics"],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=85",
    accent: "#8B5CF6",
  },
];

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    id: s.id,
  }));
}

export default function ServicePage({ params }: { params: { id: string } }) {
    const service = SERVICES.find((s) => s.id === params.id);
  if (!service) return notFound();

  return (
    <section style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      
      {/* HERO */}
      <div style={{
        background: `linear-gradient(135deg, ${service.accent}20, #fff)`,
        padding: "120px 5% 80px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 50 }}>{service.icon}</div>
        <h1 style={{
          fontSize: "clamp(32px,5vw,56px)",
          fontWeight: 800,
          marginTop: 10
        }}>
          {service.title}
        </h1>
        <p style={{
          marginTop: 12,
          color: "#666",
          fontSize: 16,
          maxWidth: 600,
          marginInline: "auto"
        }}>
          {service.short}
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 5%" }}>
        
        <img src={service.img} style={{
          width: "100%",
          borderRadius: 20,
          marginBottom: 30
        }} />

        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#555" }}>
          {service.desc}
        </p>

        {/* FEATURES */}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 22, marginBottom: 20 }}>
            What’s Included
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16
          }}>
            {service.features.map((f, i) => (
              <div key={i} style={{
                padding: 16,
                borderRadius: 12,
                background: "#fff",
                border: "1px solid #eee",
                fontWeight: 600
              }}>
                ✓ {f}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 60,
          padding: 30,
          borderRadius: 20,
          background: "#111",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: 22 }}>
            Ready to grow with {service.title}?
          </h3>

        <Link href="/contact">
  <button
    style={{
      marginTop: 20,
      padding: "14px 28px",
      borderRadius: 100,
      background: service.accent,
      color: "#fff",
      border: "none",
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
    Book Free Strategy Call →
  </button>
</Link>
        </div>

      </div>
    </section>
  );
}
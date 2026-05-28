"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const reasons = [
  { icon: "😊", title: "Your Smile", text: "Tumhari ek smile se mera pura din ban jata hai. Woh sparkle tumhari aankhon mein... priceless." },
  { icon: "🤗", title: "Your Care", text: "Jab bhi main low feel karta hoon, tum hamesha wahan hoti ho. Your support is my strength." },
  { icon: "😂", title: "Your Laugh", text: "Tumhari hassi sunke mujhe bhi hassi aa jati hai. It's contagious in the best way." },
  { icon: "🧠", title: "Your Mind", text: "You're not just beautiful, you're brilliant. Tumhari soch, tumhare dreams — sab inspire karta hai." },
  { icon: "🌈", title: "Your Vibe", text: "Tumhare saath rehna ek festival jaisa hai. Har pal colorful, har pal special." },
  { icon: "🏠", title: "You = Home", text: "Kahin bhi ho, agar tum saath ho toh wahi ghar lagta hai. You're my safe place." },
];

export default function Reasons() {
  useScrollReveal();
  return (
    <section id="reasons" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          textAlign: "center",
          marginBottom: 70,
          color: "#e8446a",
        }}
      >
        Reasons Why I Love You
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 24,
        }}
      >
        {reasons.map((r, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 22,
              padding: "36px 30px",
              textAlign: "center",
              transition: "transform 0.4s, border-color 0.4s, box-shadow 0.4s",
              backdropFilter: "blur(8px)",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(-10px)";
              el.style.borderColor = "rgba(232,68,106,0.5)";
              el.style.boxShadow = "0 20px 50px rgba(232,68,106,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "";
              el.style.borderColor = "rgba(201,168,76,0.15)";
              el.style.boxShadow = "";
            }}
          >
            <div style={{ fontSize: "2.8rem", marginBottom: 14 }}>{r.icon}</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: "#f0d080",
                marginBottom: 10,
              }}
            >
              {r.title}
            </h3>
            <p style={{ fontStyle: "italic", opacity: 0.8, lineHeight: 1.7, fontSize: "0.95rem" }}>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
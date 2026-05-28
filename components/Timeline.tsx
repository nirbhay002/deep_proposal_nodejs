"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const events = [
  { icon: "🌟", title: "The First Meeting", text: "Jab pehli baar mile, pata chala ki \"yeh wali alag hai.\"" },
  { icon: "💬", title: "Late Night Chats", text: "Raat ke 3 baje bhi jab tumse baat hoti thi — bas tumhari awaaz sunni thi." },
  { icon: "🎉", title: "Adventures Together", text: "Choti choti outings, bade bade memories. Har jagah bas tum aur main." },
  { icon: "❤️", title: "Falling in Love", text: "Dheere dheere realize hua — yeh sirf crush nahi, pure wala love hai." },
  { icon: "🔮", title: "Today & Forever", text: "Ab bas ek hi sapna hai — tumhare saath poori zindagi." },
];

export default function Timeline() {
  useScrollReveal();
  return (
    <section id="story" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          textAlign: "center",
          marginBottom: 80,
          color: "#e8446a",
        }}
      >
        Our Journey
      </h2>

      <div className="timeline-wrapper" style={{ position: "relative" }}>
        {/* center line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, #e8446a, #c9a84c, #e8446a)",
            transform: "translateX(-50%)",
            opacity: 0.4,
          }}
        />

        {events.map((e, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`tl-item ${isLeft ? "reveal-left" : "reveal-right"}`}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-end" : "flex-start",
                paddingLeft: isLeft ? 0 : "calc(50% + 40px)",
                paddingRight: isLeft ? "calc(50% + 40px)" : 0,
                marginBottom: 60,
                position: "relative",
              }}
            >
              <div
                className="tl-dot"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 24,
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: "#e8446a",
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 20px #e8446a",
                  zIndex: 2,
                }}
              />
              <div style={{
                maxWidth: 340,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                borderRadius: 18,
                border: "1px solid rgba(232,68,106,0.2)",
                padding: "24px 28px",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{e.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#f0d080", marginBottom: 8 }}>
                  {e.title}
                </h3>
                <p style={{ fontStyle: "italic", opacity: 0.8, lineHeight: 1.7, fontSize: "0.95rem" }}>{e.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
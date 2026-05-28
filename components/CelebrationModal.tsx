"use client";
import { useEffect, useState } from "react";

interface Particle { id: number; x: number; y: number; tx: number; ty: number; color: string }
interface Confetti { id: number; left: string; color: string; size: number; duration: number; isCircle: boolean }

const COLORS = ["#e8446a", "#f0d080", "#00d2ff", "#ff006e", "#8338ec", "#fff"];

export default function CelebrationModal() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fireworks
    const newParticles: Particle[] = [];
    for (let w = 0; w < 6; w++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.7;
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const vel = 80 + Math.random() * 100;
        newParticles.push({
          id: w * 10 + i,
          x, y,
          tx: Math.cos(angle) * vel,
          ty: Math.sin(angle) * vel,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }
    setParticles(newParticles);

    // Confetti
    const newConfetti: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 6,
      duration: Math.random() * 3 + 2,
      isCircle: Math.random() > 0.5,
    }));
    setConfetti(newConfetti);

    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 9997,
        }}
      />

      {/* Fireworks */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: p.color,
              animation: `explode 1.2s ease-out forwards`,
              transform: `translate(${p.tx}px, ${p.ty}px)`,
            }}
          />
        ))}
        {confetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: "absolute",
              left: c.left,
              top: -16,
              width: c.size,
              height: c.size,
              background: c.color,
              borderRadius: c.isCircle ? "50%" : 2,
              animation: `fallDown ${c.duration}s linear forwards`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: show
            ? "translate(-50%,-50%) scale(1)"
            : "translate(-50%,-50%) scale(0.7)",
          background:
            "linear-gradient(135deg, rgba(26,11,46,0.98), rgba(44,15,62,0.98))",
          border: "1px solid rgba(232,68,106,0.4)",
          borderRadius: 28,
          padding: "60px 50px",
          textAlign: "center",
          zIndex: 9999,
          maxWidth: "90%",
          width: 560,
          boxShadow: "0 40px 100px rgba(232,68,106,0.3)",
          transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#e8446a",
            marginBottom: 16,
          }}
        >
          She Said YES! 🎉
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.9,
            fontStyle: "italic",
            opacity: 0.9,
            marginBottom: 30,
          }}
        >
          Deep & Devanshi<br /><br />
          "I promise to be your partner in crime, your shoulder to cry on,
          your biggest cheerleader, and your forever home.
          Here's to our forever!" ❤️💍
        </p>
        <div style={{ fontSize: "3.5rem", letterSpacing: 8 }}>🥂💑🎊</div>
      </div>

      <style>{`
        @keyframes explode {
          0% { opacity: 1; transform: translate(0,0); }
          100% { opacity: 0; }
        }
        @keyframes fallDown {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
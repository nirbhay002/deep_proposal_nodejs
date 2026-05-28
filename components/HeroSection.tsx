"use client";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HeroSection() {
  useScrollReveal();
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 20px 60px",
        position: "relative",
        zIndex: 1,
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(232,68,106,0.12) 0%, transparent 65%)",
      }}
    >
      {/* Decorative gold line */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, opacity: 0.5 }}>
        <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
        <span style={{ fontSize: "1.2rem" }}>💍</span>
        <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
      </div>

      <div
        style={{
          position: "relative",
          width: 260,
          height: 260,
          marginBottom: 40,
        }}
      >
        {/* Glowing ring behind image */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)",
            animation: "spin 8s linear infinite",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: "50%",
            background: "#0d0812",
            zIndex: 1,
          }}
        />
        <Image
          src="/images/photo1.jpg"
          alt="Deep and Devanshi"
          fill
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            zIndex: 2,
            padding: 6,
          }}
        />
      </div>

      <h1
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #e8446a 0%, #f0d080 50%, #e8446a 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 4s linear infinite",
          marginBottom: 16,
        }}
      >
        Deep & Devanshi
      </h1>

      <p
        style={{
          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
          letterSpacing: "5px",
          textTransform: "uppercase",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          opacity: 0.7,
          marginBottom: 50,
        }}
      >
        A love story written in the stars
      </p>

      <a href="#gallery" style={{ fontSize: "1.8rem", opacity: 0.5, textDecoration: "none", animation: "bounce 2.5s infinite" }}>
        ⬇
      </a>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shine { to { background-position: 200% center; } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
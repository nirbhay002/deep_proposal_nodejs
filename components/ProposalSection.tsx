"use client";
import { useState, useRef } from "react";

export default function ProposalSection({ onYes }: { onYes: () => void }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("No 😢");
  const noTexts = ["No 😢", "Pakka? 🥺", "Soch lo! 🤔", "Galti se? 😅", "Nahi! 💔", "Sure? 👀"];

  function runAway() {
    setNoPos({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 160,
    });
    setNoText(noTexts[Math.floor(Math.random() * noTexts.length)]);
  }

  return (
    <section
      id="proposal"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 30px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(232,68,106,0.1) 0%, transparent 70%)",
      }}
    >
      {/* Ring */}
      <div style={{ position: "relative", width: 180, height: 180, marginBottom: 50, animation: "floatRing 4s ease-in-out infinite" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 130,
            height: 130,
            border: "7px solid",
            borderColor: "#c9a84c",
            borderRadius: "50%",
            boxShadow: "0 0 40px rgba(201,168,76,0.5), inset 0 0 20px rgba(201,168,76,0.2)",
            animation: "goldShine 2.5s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 80px)",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "2.8rem",
            filter: "drop-shadow(0 0 12px rgba(255,255,255,0.6))",
          }}
        >
          💎
        </div>
      </div>

      <h2
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          lineHeight: 1.2,
          marginBottom: 24,
          background: "linear-gradient(135deg, #f7b2c1, #f0d080)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Will You Marry Me,<br />Devanshi?
      </h2>

      <p
        style={{
          maxWidth: 600,
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          lineHeight: 2,
          fontStyle: "italic",
          opacity: 0.85,
          marginBottom: 60,
        }}
      >
        Deep hamesha se jaanta tha ki uski zindagi incomplete hai... jab tak Devanshi uska haath na thaame.
        Aaj se nahi, kal se nahi — humesha ke liye. 💍
      </p>

      <div style={{ position: "relative", width: "100%", maxWidth: 500, height: 120, margin: "0 auto" }}>
        {/* YES button — centered */}
        <button
          onClick={onYes}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "18px 56px",
            borderRadius: 50,
            border: "none",
            background: "linear-gradient(135deg, #e8446a, #c44569)",
            color: "white",
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: 1,
            cursor: "none",
            boxShadow: "0 10px 40px rgba(232,68,106,0.5)",
            transition: "transform 0.2s, box-shadow 0.2s",
            fontFamily: "'Cormorant Garamond', serif",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-50%, -50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-50%, -50%)";
          }}
        >
          YES, FOREVER! ❤️
        </button>

        {/* NO button — starts bottom-right, then runs away */}
        <button
          onMouseEnter={runAway}
          onClick={runAway}
          style={{
            position: "absolute",
            bottom: -55,
            left: "50%",
            marginLeft: "-60px",
            padding: "12px 30px",
            borderRadius: 50,
            border: "1.5px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.9rem",
            cursor: "none",
            fontFamily: "'Cormorant Garamond', serif",
            whiteSpace: "nowrap",
            zIndex: 1,
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
          }}
        >
          {noText}
        </button>
      </div>

      <style>{`
        @keyframes floatRing {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes goldShine {
          from { box-shadow: 0 0 30px rgba(201,168,76,0.4), inset 0 0 15px rgba(201,168,76,0.2); }
          to { box-shadow: 0 0 70px rgba(201,168,76,0.8), inset 0 0 30px rgba(201,168,76,0.4); }
        }
      `}</style>
    </section>
  );
}
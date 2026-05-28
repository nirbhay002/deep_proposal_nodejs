"use client";
import { useEffect, useState } from "react";

interface Heart { id: number; left: string; size: number; duration: number; symbol: string }
const SYMBOLS = ["❤️", "💖", "💕", "💗", "💝", "💘", "🌹"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const h: Heart = {
        id: id++,
        left: Math.random() * 100 + "%",
        size: Math.random() * 18 + 14,
        duration: Math.random() * 5 + 7,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      };
      setHearts((prev) => [...prev.slice(-30), h]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            bottom: -40,
            left: h.left,
            fontSize: h.size,
            opacity: 0.25,
            animation: `floatUp ${h.duration}s linear forwards`,
          }}
        >
          {h.symbol}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
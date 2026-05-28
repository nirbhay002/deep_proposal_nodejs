"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFade(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0d0812",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99990,
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "all",
        transition: "opacity 0.7s ease",
      }}
    >
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <div style={heartStyle} />
      </div>
      <p
        style={{
          marginTop: 48,
          fontFamily: "'Great Vibes', cursive",
          fontSize: "2.2rem",
          color: "#e8446a",
          letterSpacing: 2,
        }}
      >
        Loading Our Love Story...
      </p>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

const heartStyle: React.CSSProperties = {
  width: 70,
  height: 70,
  background: "#e8446a",
  position: "relative",
  transform: "rotate(-45deg)",
  animation: "heartbeat 1.2s infinite",
  boxShadow: "0 0 50px rgba(232,68,106,0.7)",
  borderRadius: "2px",
};
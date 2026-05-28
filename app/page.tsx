"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Reasons from "@/components/Reasons";
import ProposalSection from "@/components/ProposalSection";
import CelebrationModal from "@/components/CelebrationModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [celebrated, setCelebrated] = useState(false);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + "px";
        cursorRingRef.current.style.top = e.clientY + "px";
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="cursor-dot" ref={cursorDotRef} />

      {loading && <Loader />}
      <FloatingHearts />

      <nav style={navStyle}>
        <span style={logoStyle}>Deep & Devanshi</span>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "flex-end",}}>
          {(
            [
              { label: "Home", href: "#home" },
              { label: "Memories", href: "#gallery" },
              { label: "Our Story", href: "#story" },
              { label: "Why I Love You", href: "#reasons" },
              { label: "The Question", href: "#proposal" },
            ] as { label: string; href: string }[]
          ).map((item) => (
            <a key={item.href} href={item.href} style={ {...navLinkStyle, fontSize: "0.75rem"}}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <HeroSection />
        <Gallery />
        <Timeline />
        <Reasons />
        <ProposalSection onYes={() => setCelebrated(true)} />
      </main>

      {celebrated && <CelebrationModal />}
    </>
  );
}

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  width: "100%",
  padding: "16px clamp(16px, 4vw, 60px)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 100,
  background: "rgba(13, 8, 18, 0.6)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const logoStyle: React.CSSProperties = {
  fontFamily: "'Great Vibes', cursive",
  fontSize: "1.8rem",
  background: "linear-gradient(90deg, #e8446a, #c9a84c)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const navLinkStyle: React.CSSProperties = {
  color: "rgba(240,232,240,0.7)",
  textDecoration: "none",
  fontSize: "0.85rem",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontFamily: "'Cormorant Garamond', serif",
  transition: "color 0.3s",
};
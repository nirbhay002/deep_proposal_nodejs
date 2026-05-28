"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const photos = [
  { src: "/images/photo1.jpg", title: "🎨 Colors of Love", caption: "Holi ke rang, tumhare sang!", note: "Yeh woh din tha jab pata chala — rang sirf baahon mein nahi, tumhare saath rehne mein bhi hain. 💕" },
  { src: "/images/photo2.jpg", title: "✨ Traditional Vibes", caption: "Jab tum hass ti ho, duniya ruk jati hai.", note: "Is tasveer mein jo chamak hai na — woh kajal nahi, woh tum ho. Hamesha se." },
  { src: "/images/photo3.jpg", title: "🌅 Sunset Dreams", caption: "Har sunset tumhare naam.", note: "Uss shaam jo roshni thi, woh suraj ki nahi thi. Tumhare hone ki thi." },
  { src: "/images/photo4.jpg", title: "🍦 Sweet Moments", caption: "Ice cream se bhi zyada sweet ho tum!", note: "Choti choti khushiyaan, tumhare saath milke badi ho jaati hain. 🍦" },
];

export default function Gallery() {
  useScrollReveal();
  const [cardOpened, setCardOpened] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [lightBurst, setLightBurst] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  function handleCardClick() {
    if (cardOpened) return;
    setLightBurst(true);
    setTimeout(() => {
      setCardOpened(true);
      setTimeout(() => setPhotosVisible(true), 900);
    }, 350);
    setTimeout(() => setLightBurst(false), 800);
  }

  function closeModal() {
    setIsClosing(true);
    setTimeout(() => { setOpen(null); setIsClosing(false); }, 400);
  }

  const current = open !== null ? photos[open] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}
    >
      <h2
        className="reveal"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          textAlign: "center",
          marginBottom: 70,
          color: "#e8446a",
          textShadow: "0 0 40px rgba(232,68,106,0.3)",
        }}
      >
        Our Beautiful Moments
      </h2>

      {/* ── LIGHT BURST EFFECT ── */}
      {lightBurst && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "burstFade 0.8s ease-out forwards",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(255,240,200,0.95) 0%, rgba(232,68,106,0.55) 30%, rgba(140,26,53,0.25) 60%, transparent 80%)",
            animation: "burstExpand 0.8s ease-out forwards",
          }} />
          {[...Array(16)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 2,
              height: `${150 + (i % 3) * 80}px`,
              background: "linear-gradient(to bottom, rgba(255,235,160,1), rgba(232,68,106,0.4), transparent)",
              transformOrigin: "0% 0%",
              transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
              animation: `rayExpand 0.65s ease-out ${i * 0.015}s forwards`,
              borderRadius: 4,
            }} />
          ))}
          {/* center flash */}
          <div style={{
            position: "absolute",
            width: 120, height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,220,1) 0%, rgba(255,200,100,0.8) 50%, transparent 100%)",
            animation: "centerFlash 0.5s ease-out forwards",
          }} />
        </div>
      )}

      {/* ── THE BIG GREETING CARD WRAPPER ── */}
      <div style={{
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(232,68,106,0.1)",
        border: "1px solid rgba(232,68,106,0.2)",
        perspective: "1400px",
      }}>

        {/* Gold shimmer strip top */}
        <div style={{
          height: 5,
          background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)",
          backgroundSize: "300% 100%",
          animation: "shimmer 3s linear infinite",
        }} />

        {/* ── CARD COVER ── */}
        <div
          onClick={handleCardClick}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "100%",
            transformOrigin: "top center",
            transform: cardOpened ? "rotateX(-105deg)" : "rotateX(0deg)",
            transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
            transformStyle: "preserve-3d",
            zIndex: 10,
            pointerEvents: cardOpened ? "none" : "all",
            cursor: cardOpened ? "default" : "pointer",
            background: "linear-gradient(160deg, #1e0a2e 0%, #2a0f3d 50%, #1a0820 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            minHeight: 460,
            borderRadius: 28,
          }}
        >
          {/* Envelope diagonal lines */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 28, opacity: 0.12 }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              background: "linear-gradient(135deg, transparent 49.5%, rgba(201,168,76,0.8) 49.5%, rgba(201,168,76,0.8) 50.5%, transparent 50.5%)",
            }} />
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              background: "linear-gradient(225deg, transparent 49.5%, rgba(201,168,76,0.8) 49.5%, rgba(201,168,76,0.8) 50.5%, transparent 50.5%)",
            }} />
          </div>

          {/* Wax seal */}
          <div style={{
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #e8446a, #8c1a35)",
            boxShadow: "0 0 50px rgba(232,68,106,0.6), inset 0 0 20px rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3.2rem",
            animation: "sealPulse 2.5s ease-in-out infinite",
            transition: "transform 0.2s",
          }}>
            💌
          </div>

          <p style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2.8rem",
            color: "#f0d080",
            textShadow: "0 0 30px rgba(240,208,128,0.5)",
          }}>
            Our Beautiful Moments
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: 0.45 }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}>
              click to open ✉️
            </p>
            <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
          </div>

          {/* Bottom fold shadow */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
            borderRadius: "0 0 28px 28px",
          }} />
        </div>

        {/* ── PHOTOS INSIDE THE CARD ── */}
        <div style={{
          background: "linear-gradient(160deg, #160822 0%, #1e0b30 100%)",
          padding: "36px 32px 40px",
        }}>
          {/* Inner hint text */}
          <div style={{
            textAlign: "center", marginBottom: 32,
            opacity: photosVisible ? 1 : 0,
            transform: photosVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "rgba(240,208,128,0.55)",
              letterSpacing: 2,
            }}>
              — click any photo to read a little note 💌 —
            </p>
          </div>

          {/* 4 Photos grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 22 }}>
            {photos.map((p, i) => (
              <div
                key={i}
                onClick={() => setOpen(i)}
                style={{
                  position: "relative", borderRadius: 16, overflow: "hidden",
                  height: 320, cursor: "pointer",
                  border: "1px solid rgba(232,68,106,0.12)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                  opacity: photosVisible ? 1 : 0,
                  transform: photosVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
                  transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-6px) scale(1.03)";
                  el.style.boxShadow = "0 24px 60px rgba(232,68,106,0.25)";
                  el.style.borderColor = "rgba(232,68,106,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
                  el.style.borderColor = "rgba(232,68,106,0.12)";
                }}
              >
                <Image src={p.src} alt={p.title} fill style={{ objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(13,8,18,0.92) 0%, rgba(13,8,18,0.1) 55%, transparent 100%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "20px 18px",
                }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#f0d080", marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.82rem", fontStyle: "italic", opacity: 0.65 }}>{p.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom decorative divider */}
          <div style={{
            marginTop: 36, textAlign: "center",
            opacity: photosVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
              <span style={{ fontSize: "1.2rem", opacity: 0.45 }}>💕</span>
              <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>
          </div>
        </div>

        {/* Gold shimmer strip bottom */}
        <div style={{
          height: 5,
          background: "linear-gradient(90deg, #c9a84c, #e8446a, #f7b2c1, #c9a84c)",
          backgroundSize: "300% 100%",
          animation: "shimmer 3s linear infinite reverse",
        }} />
      </div>

      {/* ── INDIVIDUAL PHOTO GREETING CARD MODAL ── */}
      {open !== null && current && (
        <>
          <div
            onClick={closeModal}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              animation: isClosing ? "fadeOut 0.4s ease forwards" : "fadeIn 0.3s ease forwards",
            }}
          />
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1001,
            width: "min(96vw, 780px)",
            maxHeight: "90vh",
            overflowY: "auto" as const,
            animation: isClosing
              ? "cardClose 0.4s cubic-bezier(0.4,0,1,1) forwards"
              : "cardOpen 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>
            <div style={{
              background: "linear-gradient(160deg, #1e0a2e 0%, #2a0f3d 40%, #1a0820 100%)",
              borderRadius: 28,
              border: "1px solid rgba(232,68,106,0.3)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 60px rgba(232,68,106,0.12)",
              overflow: "hidden",
            }}>
              <div style={{
                height: 6,
                background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)",
                backgroundSize: "300% 100%",
                animation: "shimmer 3s linear infinite",
              }} />

              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {/* Photo */}
                <div style={{ position: "relative", flex: "1 1 300px", minHeight: 360 }}>
                  <Image src={current.src} alt={current.title} fill style={{ objectFit: "cover" }} />
                  <div style={{
                    position: "absolute", top: 16, left: 16,
                    background: "rgba(13,8,18,0.7)", backdropFilter: "blur(6px)",
                    border: "1px solid rgba(240,208,128,0.4)",
                    borderRadius: 10, padding: "6px 14px",
                    fontSize: "0.8rem", color: "#f0d080",
                    fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1,
                  }}>
                    {current.title}
                  </div>
                </div>

                {/* Message */}
                <div style={{
                  flex: "1 1 280px", padding: "48px 40px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  position: "relative",
                }}>
                  <span style={{ position: "absolute", top: 18, right: 22, fontSize: "1.4rem", opacity: 0.3 }}>💕</span>
                  <span style={{ position: "absolute", bottom: 18, left: 22, fontSize: "1rem", opacity: 0.2 }}>🌹</span>

                  <p style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "2rem", color: "#e8446a",
                    marginBottom: 24, lineHeight: 1.3,
                  }}>
                    A little note...
                  </p>

                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: "3px solid rgba(232,68,106,0.4)",
                    borderRadius: "0 12px 12px 0",
                    padding: "20px 24px", marginBottom: 28,
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic", fontSize: "1.1rem",
                      lineHeight: 1.9, color: "rgba(240,232,240,0.9)",
                    }}>
                      "{current.note}"
                    </p>
                  </div>

                  <p style={{
                    fontSize: "0.85rem", opacity: 0.5, letterSpacing: 2,
                    textTransform: "uppercase",
                    fontFamily: "'Cormorant Garamond', serif", marginBottom: 32,
                  }}>
                    — Deep 💌
                  </p>

                  {/* Prev / Next */}
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }}
                      style={arrowBtn}
                    >←</button>
                    <span style={{ opacity: 0.4, fontSize: "0.8rem", flex: 1, textAlign: "center" }}>
                      {open + 1} / {photos.length}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }}
                      style={arrowBtn}
                    >→</button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: "14px 30px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontStyle: "italic", opacity: 0.4, fontSize: "0.85rem" }}>{current.caption}</span>
                <button
                  onClick={closeModal}
                  style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)", borderRadius: 20,
                    padding: "6px 18px", fontSize: "0.8rem", cursor: "pointer",
                    fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1,
                  }}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes shimmer     { to { background-position: 300% center; } }
        @keyframes sealPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(232,68,106,0.4), inset 0 0 20px rgba(0,0,0,0.3); }
          50%       { box-shadow: 0 0 70px rgba(232,68,106,0.8), inset 0 0 20px rgba(0,0,0,0.3); }
        }
        @keyframes burstFade {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes burstExpand {
          0%   { transform: scale(0.05); opacity: 0; }
          35%  { transform: scale(1);    opacity: 1; }
          100% { transform: scale(1.8);  opacity: 0; }
        }
        @keyframes rayExpand {
          0%   { opacity: 1; transform: rotate(var(--r, 0deg)) translateX(-50%) scaleY(0.1); }
          60%  { opacity: 0.8; }
          100% { opacity: 0;   transform: rotate(var(--r, 0deg)) translateX(-50%) scaleY(1); }
        }
        @keyframes centerFlash {
          0%   { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes cardOpen {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.85) rotateX(8deg); }
          100% { opacity: 1; transform: translate(-50%,-50%) scale(1)    rotateX(0deg); }
        }
        @keyframes cardClose {
          0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(0.9) translateY(20px); }
        }
      `}</style>
    </section>
  );
}

const arrowBtn: React.CSSProperties = {
  width: 38, height: 38, borderRadius: "50%",
  border: "1px solid rgba(232,68,106,0.3)",
  background: "rgba(232,68,106,0.1)",
  color: "#e8446a", fontSize: "1.1rem",
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
  transition: "background 0.2s",
};
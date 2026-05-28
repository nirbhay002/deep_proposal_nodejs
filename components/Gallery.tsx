"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
  const [coverGone, setCoverGone] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleCardClick() {
    if (cardOpened) return;
    setLightBurst(true);
    setTimeout(() => {
      setCardOpened(true);
      // Mobile: animation 700ms, uske baad cover completely hatao
      if (isMobile) {
        setTimeout(() => setCoverGone(true), 750);
      }
      setTimeout(() => setPhotosVisible(true), isMobile ? 900 : 900);
    }, 350);
    setTimeout(() => setLightBurst(false), 800);
  }

  function closeModal() {
    setIsClosing(true);
    setTimeout(() => { setOpen(null); setIsClosing(false); }, 400);
  }

  const current = open !== null ? photos[open] : null;

  // Mobile cover: slides up. Desktop: 3D flip
  const coverTransform = cardOpened
    ? isMobile
      ? "translateY(-110%)"
      : "rotateX(-105deg)"
    : isMobile
      ? "translateY(0)"
      : "rotateX(0deg)";

  const coverTransition = isMobile
    ? "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
    : "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(16px, 4vw, 60px)",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        className="reveal"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          textAlign: "center",
          marginBottom: "clamp(40px, 6vw, 70px)",
          color: "#e8446a",
          textShadow: "0 0 40px rgba(232,68,106,0.3)",
        }}
      >
        Our Beautiful Moments
      </h2>

      {/* ── LIGHT BURST ── */}
      {lightBurst && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9990,
          pointerEvents: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "burstFade 0.8s ease-out forwards",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, rgba(255,240,200,0.95) 0%, rgba(232,68,106,0.55) 30%, rgba(140,26,53,0.25) 60%, transparent 80%)",
            animation: "burstExpand 0.8s ease-out forwards",
          }} />
          {[...Array(16)].map((_, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: 2, height: `${150 + (i % 3) * 80}px`,
              background: "linear-gradient(to bottom, rgba(255,235,160,1), rgba(232,68,106,0.4), transparent)",
              transformOrigin: "0% 0%",
              transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
              animation: `rayExpand 0.65s ease-out ${i * 0.015}s forwards`,
              borderRadius: 4,
            }} />
          ))}
          <div style={{
            position: "absolute",
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,220,1) 0%, rgba(255,200,100,0.8) 50%, transparent 100%)",
            animation: "centerFlash 0.5s ease-out forwards",
          }} />
        </div>
      )}

      {/* ── GREETING CARD WRAPPER ── */}
      <div style={{
        position: "relative",
        borderRadius: isMobile ? 20 : 28,
        // No overflow:hidden on mobile so flipped cover doesn't clip photos
        overflow: isMobile ? "visible" : "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(232,68,106,0.1)",
        border: "1px solid rgba(232,68,106,0.2)",
        perspective: isMobile ? "none" : "1400px",
      }}>

        {/* Top shimmer strip */}
        {!isMobile && (
          <div style={{
            height: 5,
            background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)",
            backgroundSize: "300% 100%",
            animation: "shimmer 3s linear infinite",
          }} />
        )}

        {/* ── CARD COVER ── */}
        <div
          onClick={handleCardClick}
          style={{
            // On mobile: relative so it takes natural height, then slides up via transform
            // On desktop: absolute overlay over photos
            position: isMobile ? "relative" : "absolute",
            top: 0, left: 0, right: 0,
            // Mobile: auto height, compact. Desktop: full height overlay
            height: isMobile ? "auto" : "100%",
            transformOrigin: isMobile ? "top center" : "top center",
            transform: coverTransform,
            transition: coverTransition,
            transformStyle: isMobile ? "flat" : "preserve-3d",
            zIndex: 10,
            pointerEvents: cardOpened ? "none" : "all",
            cursor: cardOpened ? "default" : "pointer",
            display: coverGone ? "none" : "flex",
            background: "linear-gradient(160deg, #1e0a2e 0%, #2a0f3d 50%, #1a0820 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 14 : 20,
            // Mobile: compact. Desktop: tall
            padding: isMobile ? "40px 20px" : "0",
            minHeight: isMobile ? "unset" : 460,
            borderRadius: isMobile ? 20 : 28,
            // Mobile shimmer strips inline
            borderTop: isMobile ? "4px solid transparent" : "none",
            borderBottom: isMobile ? "4px solid transparent" : "none",
            backgroundClip: "padding-box",
          }}
        >
          {/* Mobile shimmer strips */}
          {isMobile && (
            <>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4, borderRadius: "20px 20px 0 0",
                background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)",
                backgroundSize: "300% 100%", animation: "shimmer 3s linear infinite",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 4, borderRadius: "0 0 20px 20px",
                background: "linear-gradient(90deg, #c9a84c, #e8446a, #c9a84c)",
                backgroundSize: "300% 100%", animation: "shimmer 3s linear infinite reverse",
              }} />
            </>
          )}

          {/* Envelope diagonal lines — desktop only */}
          {!isMobile && (
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
          )}

          {/* Wax seal */}
          <div style={{
            width: isMobile ? 80 : 120,
            height: isMobile ? 80 : 120,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #e8446a, #8c1a35)",
            boxShadow: "0 0 50px rgba(232,68,106,0.6), inset 0 0 20px rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: isMobile ? "2rem" : "3.2rem",
            animation: "sealPulse 2.5s ease-in-out infinite",
            flexShrink: 0,
          }}>
            💌
          </div>

          {/* Title — guaranteed centered */}
          <div style={{ width: "100%", textAlign: "center", padding: "0 16px" }}>
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: isMobile ? "1.8rem" : "2.8rem",
              color: "#f0d080",
              textShadow: "0 0 30px rgba(240,208,128,0.5)",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}>
              Our Beautiful Moments
            </p>
          </div>

          {/* Click hint */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14, opacity: 0.45 }}>
            <div style={{ width: isMobile ? 30 : 50, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: isMobile ? "0.75rem" : "0.95rem",
              letterSpacing: isMobile ? 1 : 3,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              {isMobile ? "tap to open ✉️" : "click to open ✉️"}
            </p>
            <div style={{ width: isMobile ? 30 : 50, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
          </div>

          {/* Desktop bottom shadow */}
          {!isMobile && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
              background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
              borderRadius: "0 0 28px 28px",
            }} />
          )}
        </div>

        {/* ── PHOTOS INSIDE (always rendered, hidden behind cover on desktop) ── */}
        <div style={{
          background: "linear-gradient(160deg, #160822 0%, #1e0b30 100%)",
          padding: isMobile ? "24px 16px 32px" : "36px 32px 40px",
          display: isMobile && !cardOpened ? "none" : "block",
          borderRadius: isMobile ? 20 : 0,
          border: isMobile ? "1px solid rgba(232,68,106,0.2)" : "none",
          marginTop: isMobile ? 12 : 0,
        }}>

          {/* Desktop shimmer strips */}
          {!isMobile && (
            <>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)", backgroundSize: "300% 100%", animation: "shimmer 3s linear infinite" }} />
            </>
          )}

          {/* Hint text */}
          <div style={{
            textAlign: "center", marginBottom: isMobile ? 20 : 32,
            opacity: photosVisible ? 1 : 0,
            transform: photosVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: isMobile ? "0.85rem" : "1.05rem",
              color: "rgba(240,208,128,0.55)",
              letterSpacing: isMobile ? 1 : 2,
            }}>
              — {isMobile ? "tap" : "click"} any photo to read a little note 💌 —
            </p>
          </div>

          {/* Photos grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"          // 2 columns on mobile
              : "repeat(auto-fit, minmax(240px, 1fr))",
            gap: isMobile ? 12 : 22,
          }}>
            {photos.map((p, i) => (
              <div
                key={i}
                onClick={() => setOpen(i)}
                style={{
                  position: "relative",
                  borderRadius: isMobile ? 12 : 16,
                  overflow: "hidden",
                  height: isMobile ? 160 : 320,
                  cursor: "pointer",
                  border: "1px solid rgba(232,68,106,0.12)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                  opacity: photosVisible ? 1 : 0,
                  transform: photosVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
                  transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s`,
                }}
              >
                <Image src={p.src} alt={p.title} fill style={{ objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(13,8,18,0.92) 0%, rgba(13,8,18,0.1) 55%, transparent 100%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: isMobile ? "10px 10px" : "20px 18px",
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? "0.75rem" : "1.05rem",
                    color: "#f0d080", marginBottom: 2,
                  }}>{p.title}</h3>
                  {!isMobile && (
                    <p style={{ fontSize: "0.82rem", fontStyle: "italic", opacity: 0.65 }}>{p.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom divider */}
          <div style={{
            marginTop: isMobile ? 20 : 36, textAlign: "center",
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

        {/* Bottom shimmer — desktop only */}
        {!isMobile && (
          <div style={{
            height: 5,
            background: "linear-gradient(90deg, #c9a84c, #e8446a, #f7b2c1, #c9a84c)",
            backgroundSize: "300% 100%",
            animation: "shimmer 3s linear infinite reverse",
          }} />
        )}
      </div>

      {/* ── INDIVIDUAL PHOTO MODAL ── */}
      {open !== null && current && (
        <>
          <div
            onClick={closeModal}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              animation: isClosing ? "fadeOut 0.4s ease forwards" : "fadeIn 0.3s ease forwards",
            }}
          />
          <div style={{
            position: "fixed",
            top: isMobile ? "50%" : "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1001,
            width: "min(96vw, 780px)",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 24,
            animation: isClosing
              ? "cardClose 0.4s cubic-bezier(0.4,0,1,1) forwards"
              : "cardOpen 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>
            <div style={{
              background: "linear-gradient(160deg, #1e0a2e 0%, #2a0f3d 40%, #1a0820 100%)",
              borderRadius: 24,
              border: "1px solid rgba(232,68,106,0.3)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
              overflow: "hidden",
            }}>
              <div style={{ height: 5, background: "linear-gradient(90deg, #e8446a, #c9a84c, #f7b2c1, #e8446a)", backgroundSize: "300% 100%", animation: "shimmer 3s linear infinite" }} />

              {/* Photo + message — stacks vertically on mobile */}
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "nowrap",
              }}>
                {/* Photo */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? 240 : 360,
                  flexShrink: 0,
                  flex: isMobile ? "none" : "1 1 300px",
                }}>
                  <Image src={current.src} alt={current.title} fill style={{ objectFit: "cover" }} />
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgba(13,8,18,0.7)", backdropFilter: "blur(6px)",
                    border: "1px solid rgba(240,208,128,0.4)",
                    borderRadius: 8, padding: "5px 12px",
                    fontSize: "0.78rem", color: "#f0d080",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}>
                    {current.title}
                  </div>
                </div>

                {/* Message */}
                <div style={{
                  flex: "1 1 280px",
                  padding: isMobile ? "28px 24px" : "48px 40px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  position: "relative",
                }}>
                  {!isMobile && (
                    <>
                      <span style={{ position: "absolute", top: 18, right: 22, fontSize: "1.4rem", opacity: 0.3 }}>💕</span>
                      <span style={{ position: "absolute", bottom: 18, left: 22, fontSize: "1rem", opacity: 0.2 }}>🌹</span>
                    </>
                  )}
                  <p style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: isMobile ? "1.6rem" : "2rem",
                    color: "#e8446a", marginBottom: 16, lineHeight: 1.3,
                  }}>
                    A little note...
                  </p>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: "3px solid rgba(232,68,106,0.4)",
                    borderRadius: "0 12px 12px 0",
                    padding: "16px 20px", marginBottom: 20,
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      lineHeight: 1.9, color: "rgba(240,232,240,0.9)",
                    }}>
                      "{current.note}"
                    </p>
                  </div>
                  <p style={{
                    fontSize: "0.82rem", opacity: 0.5, letterSpacing: 2,
                    textTransform: "uppercase",
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: isMobile ? 20 : 28,
                  }}>
                    — Deep 💌
                  </p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }} style={arrowBtn}>←</button>
                    <span style={{ opacity: 0.4, fontSize: "0.8rem", flex: 1, textAlign: "center" }}>{open + 1} / {photos.length}</span>
                    <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }} style={arrowBtn}>→</button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: "12px 24px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontStyle: "italic", opacity: 0.4, fontSize: isMobile ? "0.75rem" : "0.85rem" }}>{current.caption}</span>
                <button onClick={closeModal} style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.5)", borderRadius: 20,
                  padding: "5px 16px", fontSize: "0.8rem", cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                }}>
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
          0%   { opacity: 0; } 20%  { opacity: 1; } 100% { opacity: 0; }
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
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.85); }
          100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
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
  width: 36, height: 36, borderRadius: "50%",
  border: "1px solid rgba(232,68,106,0.3)",
  background: "rgba(232,68,106,0.1)",
  color: "#e8446a", fontSize: "1rem",
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
  transition: "background 0.2s", flexShrink: 0,
};
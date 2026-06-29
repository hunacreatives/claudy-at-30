"use client";

import { useState, useRef } from "react";

export default function InvitePage() {
  const [form, setForm] = useState({ name: "", email: "", plusOnes: "0", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", plusOnes: "0", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const sans = "var(--font-dm-sans), sans-serif";
  const display = "var(--font-display), serif";
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`;
  };
  const handleCardReset = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#f2ede6",
    borderRadius: "8px",
    padding: "13px 16px",
    fontSize: "13px",
    color: "#3d5a2a",
    outline: "none",
    fontFamily: sans,
    border: "none",
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", overflowX: "hidden" }}>


      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes btn-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(151,166,121,0.45); }
          50%       { box-shadow: 0 0 0 8px rgba(151,166,121,0); }
        }
        @keyframes float-a {
          0%, 100% { transform: translateX(-50%) translateY(0px) rotate(-30deg); }
          50%       { transform: translateX(-50%) translateY(-12px) rotate(-26deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes float-c {
          0%, 100% { transform: translateX(50%) translateY(0px) rotate(-10deg); }
          50%       { transform: translateX(50%) translateY(-14px) rotate(-6deg); }
        }
        @keyframes float-d {
          0%, 100% { transform: translateX(50%) translateY(0px); }
          50%       { transform: translateX(50%) translateY(-10px); }
        }
        @keyframes float-e {
          0%, 100% { transform: translateX(50%) translateY(0px) rotate(8deg); }
          50%       { transform: translateX(50%) translateY(-12px) rotate(12deg); }
        }
        @keyframes float-f {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes bounce-on-paddle {
          0%        { transform: translate(-50%, 0px) scaleY(1) scaleX(1); animation-timing-function: cubic-bezier(.33,0,.66,0); }
          42%       { transform: translate(-50%, -55px) scaleY(1) scaleX(1); animation-timing-function: cubic-bezier(.33,1,.66,1); }
          50%       { transform: translate(-50%, -55px) scaleY(1) scaleX(1); animation-timing-function: cubic-bezier(.33,0,.66,0); }
          92%       { transform: translate(-50%, 0px) scaleY(0.75) scaleX(1.25); animation-timing-function: cubic-bezier(.33,1,.66,1); }
          100%      { transform: translate(-50%, 0px) scaleY(1) scaleX(1); }
        }
        @keyframes star-pop-1 {
          0%,100% { opacity:0; transform: scale(0) rotate(0deg); }
          20%,80% { opacity:0; }
          40%     { opacity:1; transform: scale(1.2) rotate(20deg); }
          60%     { opacity:0.6; transform: scale(0.8) rotate(40deg); }
        }
        @keyframes star-pop-2 {
          0%,100% { opacity:0; transform: scale(0) rotate(0deg); }
          10%,70% { opacity:0; }
          30%     { opacity:1; transform: scale(1) rotate(-15deg); }
          55%     { opacity:0; transform: scale(0.6) rotate(-30deg); }
        }
        @keyframes star-pop-3 {
          0%,100% { opacity:0; transform: scale(0) rotate(0deg); }
          50%,90% { opacity:0; }
          65%     { opacity:1; transform: scale(1.1) rotate(10deg); }
          80%     { opacity:0; transform: scale(0.5) rotate(25deg); }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          50%      { opacity: 0.7; transform: scale(1) rotate(20deg); }
        }
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gradient-30 {
          background: linear-gradient(90deg, #3d5a2a, #e6c3b8, #c4785a, #7a9a6a, #3d5a2a);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
          padding-right: 0.15em;
          display: inline-block;
        }
        @keyframes subtle-breathe {
          0%, 100% { box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.06); }
          50%       { box-shadow: 0 32px 80px rgba(0,0,0,0.14), 0 8px 28px rgba(0,0,0,0.08); }
        }
        .panel-3d {
          box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.06);
          animation: subtle-breathe 6s ease-in-out infinite;
        }
        .card-3d {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          transform: perspective(900px) rotateY(0deg) rotateX(0deg) scale(1);
          will-change: transform;
        }
        .decor-depth {
          filter: drop-shadow(2px 6px 8px rgba(0,0,0,0.14));
        }
        @keyframes btn-pulse {
          0%, 100% { box-shadow: 0 4px 18px rgba(122,154,106,0.35), 0 0 0 0 rgba(151,166,121,0.5); }
          50%       { box-shadow: 0 4px 24px rgba(122,154,106,0.4), 0 0 0 8px rgba(151,166,121,0); }
        }
        .btn-attend {
          background: linear-gradient(135deg, #97a679 0%, #7a9a6a 100%) !important;
          animation: btn-pulse 2.4s ease-in-out infinite;
          transition: filter 0.2s, transform 0.15s;
        }
        .btn-attend:hover {
          filter: brightness(1.08);
          transform: scale(1.02);
        }
        .gift-img-wrap { margin-left: -80px; margin-right: -80px; overflow: hidden; border-radius: 12px; }
        @media (max-width: 640px) {
          .gift-img-wrap { margin-left: 0; margin-right: 0; overflow: visible; border-radius: 0; }
        }
        @media (max-width: 380px) {
          .gift-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Full-bleed stripes + centered column */}
      <div style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/bg-stripes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflowX: "hidden",
      }}>
        {/* Vignette — darkens edges to give depth */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(80,70,60,0.18) 100%)",
        }} />

        {/* Shimmer sweep */}
        <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "40%",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            animation: "shimmer-sweep 8s ease-in-out 1s infinite",
          }} />
        </div>

        {/* Background stars — scattered, slow twinkle */}
        {[
          { left:"6%",  top:"8%",  size:12, delay:"0s",    dur:"4.2s" },
          { left:"91%", top:"5%",  size:10, delay:"1.1s",  dur:"5.0s" },
          { left:"3%",  top:"28%", size:14, delay:"2.3s",  dur:"4.6s" },
          { left:"94%", top:"22%", size:11, delay:"0.5s",  dur:"3.8s" },
          { left:"8%",  top:"55%", size:10, delay:"3.1s",  dur:"5.2s" },
          { left:"92%", top:"48%", size:13, delay:"1.7s",  dur:"4.4s" },
          { left:"5%",  top:"76%", size:11, delay:"0.9s",  dur:"4.8s" },
          { left:"89%", top:"70%", size:12, delay:"2.8s",  dur:"3.9s" },
          { left:"12%", top:"90%", size:10, delay:"1.4s",  dur:"5.1s" },
          { left:"85%", top:"88%", size:14, delay:"0.2s",  dur:"4.3s" },
          { left:"50%", top:"3%",  size:9,  delay:"2.0s",  dur:"4.7s" },
          { left:"48%", top:"95%", size:11, delay:"1.6s",  dur:"4.0s" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "fixed",
            left: s.left, top: s.top,
            fontSize: s.size,
            color: "#c9b5a5",
            opacity: 0,
            zIndex: 2,
            pointerEvents: "none",
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}>✦</div>
        ))}
        {/* Centered column */}
        <div style={{
          width: "min(720px, 88vw)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          overflow: "visible",
        }}>
          {/* Section 1 elements */}
          <img src="/elements/ball-pink.webp" alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "22%", width: "clamp(72px,8vw,130px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.3s both, float-b 3.5s ease-in-out 0s infinite" }} />
          <img src="/elements/champagne.webp" alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "52%", width: "clamp(110px,13vw,200px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.5s both, float-a 4s ease-in-out 0s infinite" }} />
          <img src="/elements/bucket.webp"    alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "82%", width: "clamp(100px,12vw,190px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.9s both, float-f 5s ease-in-out 0s infinite" }} />
          <img src="/elements/spritz.webp"    alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "18%", width: "clamp(100px,12vw,190px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.4s both, float-c 4.2s ease-in-out 0s infinite" }} />
          <img src="/elements/ball-pink.webp" alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "48%", width: "clamp(72px,8vw,130px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.6s both, float-d 3.8s ease-in-out 0s infinite" }} />
          <img src="/elements/martini.webp"   alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "78%", width: "clamp(100px,12vw,190px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.8s both, float-e 4.6s ease-in-out 0s infinite" }} />


          {/* ── Arch SVG ── */}
          <div style={{ width: "100%", position: "relative", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
            <svg viewBox="0 0 500 300" style={{ width: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="arcLabel" d="M 55 300 A 195 195 0 0 1 445 300" />
              </defs>
              <path d="M 0 300 A 250 250 0 0 1 500 300 Z" fill="#f9f8f4" />
              <path d="M 0 300 A 250 250 0 0 1 500 300" fill="none" stroke="#e6c3b8" strokeWidth="2.2" />
              <text fontFamily={display} fontSize="28" fontWeight="900" letterSpacing="4" fill="#3d5a2a" textAnchor="middle">
                <textPath href="#arcLabel" startOffset="50%">LET&apos;S HIT THE COURT</textPath>
              </text>
            </svg>

            {/* Paddle + orbiting ball — below the text curve */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%) translateY(8px)", bottom: "4%", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img src="/elements/paddle.webp" alt="paddle" style={{ width: "clamp(100px,14vw,160px)", transform: "rotate(-28deg)", display: "block" }} />
                  <span style={{ position:"absolute", top:"8%",  left:"60%", fontSize:"16px", animation:"star-pop-1 2.4s ease-in-out infinite",        pointerEvents:"none" }}>✦</span>
                  <span style={{ position:"absolute", top:"25%", left:"20%", fontSize:"12px", animation:"star-pop-2 2.4s ease-in-out 0.6s infinite",  pointerEvents:"none", color:"#f4bfb0" }}>✦</span>
                  <span style={{ position:"absolute", top:"5%",  left:"35%", fontSize:"9px",  animation:"star-pop-3 2.4s ease-in-out 1.1s infinite",  pointerEvents:"none", color:"#ffd9cc" }}>✦</span>
                  <span style={{ position:"absolute", top:"40%", left:"75%", fontSize:"13px", animation:"star-pop-1 2.4s ease-in-out 1.6s infinite",  pointerEvents:"none", color:"#e8c4b8" }}>✦</span>
                </div>
                {/* Bouncing ball */}
                <img src="/elements/ball-pink.webp" alt="" style={{
                  position: "absolute",
                  width: "clamp(22px,3.5vw,36px)",
                  top: "12%", left: "38%",
                  zIndex: 2,
                  animation: "bounce-on-paddle 1.1s ease-in-out infinite",
                }} />
              </div>
            </div>
          </div>

          {/* ── Cream panel ── */}
          <div style={{
            width: "100%",
            marginTop: "-2px",
            background: "#f9f8f4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "24px",
            borderLeft: "2.2px solid #e6c3b8",
            borderRight: "2.2px solid #e6c3b8",
            borderBottom: "2.2px solid #e6c3b8",
            borderBottomLeftRadius: "28px",
            borderBottomRightRadius: "28px",
          }}>

            <div style={{ textAlign: "center", padding: "32px 40px 0", width: "100%" }}>
              <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "clamp(9px,2vw,13px)", fontWeight: 600, marginBottom: "14px", whiteSpace: "nowrap", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.35s both" }}>
                Please join us in celebrating
              </p>
              <h1 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", lineHeight: 1.05, fontSize: "clamp(3.2rem, 9vw, 4.2rem)", marginBottom: "16px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.5s both" }}>
                Claudy&apos;s <span className="text-gradient-30">30th</span><br />Birthday:
              </h1>
              <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "clamp(9px,2vw,13px)", fontWeight: 600, marginBottom: "24px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.6s both" }}>
                Level 30: Ready to Rally. 🎾
              </p>
              <div style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.16em", color: "#9aa885", fontSize: "13px", fontWeight: 400, lineHeight: 2.2, marginBottom: "24px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.65s both" }}>
                <p>Saturday, July 25th</p>
                <p>5:00pm – 2:00am</p>
                <p>Dinkside Pickleball Court</p>
              </div>
              <div style={{ height: "1px", background: "#ddd6cd", width: "55%", margin: "0 auto 60px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.8s both" }} />
            </div>

            {/* Form card */}
            <div id="rsvp-form" ref={cardRef} className="card-3d"
              onMouseMove={handleCardTilt} onMouseLeave={handleCardReset}
              style={{ width: "calc(100% - 60px)", maxWidth: "480px", background: "#fff", borderRadius: "20px", padding: "36px 32px", textAlign: "left", marginBottom: "24px", border: "1px solid #e5ddd6", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.95s both" }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <p style={{ fontSize: "40px", marginBottom: "12px" }}>🎾</p>
                  <p style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "26px", marginBottom: "10px" }}>
                    You&apos;re on the list!
                  </p>
                  <p style={{ fontFamily: sans, color: "#c0a99c", fontSize: "14px", lineHeight: 1.7, marginBottom: "28px" }}>
                    Can&apos;t wait to celebrate with you.<br />See you on the court!
                  </p>

                  <div style={{ borderTop: "1px solid #f0ebe4", paddingTop: "24px" }}>
                    <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "10px", fontWeight: 600, marginBottom: "8px" }}>
                      Getting There
                    </p>
                    <p style={{ fontFamily: sans, fontSize: "12px", color: "#b0a090", marginBottom: "14px", lineHeight: 1.7 }}>
                      Dinkside Pickleball Court<br />
                      G28C+8V9, Ext, Rizal St<br />
                      Poblacion, Danao, Cebu
                    </p>
                    <a
                      href="https://maps.google.com/?q=G28C%2B8V9+Danao+Cebu"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "block", borderRadius: "12px", overflow: "hidden", border: "1px solid #e6ddd5", textDecoration: "none" }}
                    >
                      <iframe
                        src="https://maps.google.com/maps?q=G28C%2B8V9+Danao+Cebu&output=embed&z=16"
                        width="100%"
                        height="160"
                        style={{ display: "block", border: "none", pointerEvents: "none" }}
                        loading="lazy"
                      />
                      <div style={{ background: "#f9f8f4", padding: "8px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "12px" }}>📍</span>
                        <p style={{ fontFamily: sans, fontSize: "11px", color: "#7a9a6a", fontWeight: 600, margin: 0, letterSpacing: "0.05em" }}>
                          Open in Google Maps ›
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "28px", marginBottom: "4px", textAlign: "center" }}>
                Let&apos;s Play?
              </h3>
              <p style={{ fontFamily: sans, color: "#c0a99c", fontSize: "13px", marginBottom: "24px", textAlign: "center" }}>
                I would love to Celebrate with you!
              </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ fontFamily: sans, fontSize: "11px", color: "#9aa885", display: "block", marginBottom: "6px" }}>Your Name</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: sans, fontSize: "11px", color: "#9aa885", display: "block", marginBottom: "6px" }}>Email Address</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: sans, fontSize: "11px", color: "#9aa885", display: "block", marginBottom: "6px" }}>Will you be bringing anyone?</label>
                    <select value={form.plusOnes} onChange={(e) => setForm({ ...form, plusOnes: e.target.value })} style={{ ...inputStyle, appearance: "auto" as "auto" }}>
                      <option value="0">Just me</option>
                      <option value="1">+1</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: sans, fontSize: "11px", color: "#9aa885", display: "block", marginBottom: "6px" }}>A Thoughtful Message</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                  </div>
                  {status === "error" && <p style={{ color: "#ef4444", fontSize: "12px" }}>Something went wrong, please try again.</p>}
                  <button type="submit" disabled={status === "loading"}
                    className="btn-attend"
                  style={{ width: "100%", color: "#fff", borderRadius: "999px", padding: "14px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: sans, opacity: status === "loading" ? 0.6 : 1, border: "none", marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {status === "loading" ? "Sending..." : "Confirm Attendance"}
                  </button>
                </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── What to Wear — striped bg + cream card ── */}
      <div style={{
        width: "100%",
        backgroundImage: "url('/bg-stripes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        padding: "32px 24px 16px",
      }}>
        <div style={{ position: "relative", width: "min(720px, 88vw)" }}>
          {/* Section elements — staggered */}
          <img src="/elements/spritz.webp" alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "10%", width: "clamp(90px,11vw,170px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.7s both, float-a 4s ease-in-out 0s infinite" }} />
          <img src="/elements/ball-pink.webp" alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "60%", width: "clamp(64px,7vw,110px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.8s both, float-d 3.8s ease-in-out 0s infinite" }} />
          <div style={{
            background: "#f9f8f4",
            borderRadius: "28px",
            border: "2.2px solid #e6c3b8",
            padding: "48px 24px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.06)",
          }}>
            <h3 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "clamp(1.6rem,6vw,2rem)", marginBottom: "6px", textAlign: "center" }}>
              What to Wear
            </h3>
            <p style={{ fontFamily: sans, color: "#c0a99c", fontSize: "12px", textAlign: "center", marginBottom: "28px", letterSpacing: "0.05em", lineHeight: 1.7 }}>
              Come dressed in <strong style={{ color: "#3d5a2a" }}>white</strong> or <strong style={{ color: "#7a9a6a" }}>green</strong> — let&apos;s match the court. 🎾
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "clamp(64px,16vw,90px)",
                  height: "clamp(64px,16vw,90px)",
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: "1px solid #e5ddd6",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
                }} />
                <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "11px", fontWeight: 600, margin: 0 }}>
                  White
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "clamp(64px,16vw,90px)",
                  height: "clamp(64px,16vw,90px)",
                  borderRadius: "50%",
                  background: "#7a9a6a",
                  boxShadow: "0 10px 24px rgba(122,154,106,0.35), 0 4px 8px rgba(0,0,0,0.10)",
                }} />
                <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "11px", fontWeight: 600, margin: 0 }}>
                  Green
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── What to Bring — striped bg + cream card ── */}
      <div style={{
        width: "100%",
        backgroundImage: "url('/bg-stripes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        padding: "32px 24px 16px",
      }}>
        <div style={{ position: "relative", width: "min(720px, 88vw)" }}>
          {/* Section 2 elements — staggered */}
          <img src="/elements/bucket.webp"  alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "5%", width: "clamp(100px,12vw,180px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.7s both, float-f 5s ease-in-out 0s infinite" }} />
          <img src="/elements/martini.webp" alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "75%", width: "clamp(90px,11vw,170px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.8s both, float-e 4.6s ease-in-out 0s infinite" }} />
          <div style={{
            background: "#f9f8f4",
            borderRadius: "28px",
            border: "2.2px solid #e6c3b8",
            padding: "48px 24px 0px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.06)",
          }}>
            <h3 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "clamp(1.6rem,6vw,2rem)", marginBottom: "6px", textAlign: "center" }}>
              What to Bring
            </h3>
            <p style={{ fontFamily: sans, color: "#c0a99c", fontSize: "12px", textAlign: "center", marginBottom: "4px", letterSpacing: "0.05em", lineHeight: 1.7 }}>
              Dress for the court — it&apos;s going to be a long, sweaty, glorious night. 🎾
            </p>
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <img
                src="/what-to-bring.png"
                alt="What to Bring"
                style={{ width: "100%", display: "block", marginTop: "-8%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Gift Ideas + Directions + CTA ── */}
      <div style={{
        width: "100%",
        backgroundImage: "url('/bg-stripes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        padding: "16px 24px 48px",
      }}>
        <div style={{ position: "relative", width: "min(720px, 88vw)" }}>
          {/* Section 3 elements — staggered so left/right don't align */}
          <img src="/elements/champagne.webp" alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "5%", width: "clamp(100px,12vw,190px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.5s both, float-a 4s ease-in-out 0s infinite" }} />
          <img src="/elements/ball-pink.webp" alt="" className="decor-depth" style={{ position: "absolute", left: 0, top: "55%", width: "clamp(72px,8vw,130px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.3s both, float-b 3.5s ease-in-out 0s infinite" }} />
          <img src="/elements/martini.webp"   alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "35%", width: "clamp(100px,12vw,190px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.8s both, float-e 4.6s ease-in-out 0s infinite" }} />
          <img src="/elements/ball-pink.webp" alt="" className="decor-depth" style={{ position: "absolute", right: 0, top: "72%", width: "clamp(72px,8vw,130px)", zIndex: 20, pointerEvents: "none", animation: "fade-in 0.6s ease 0.6s both, float-d 3.8s ease-in-out 0s infinite" }} />
        <div style={{
          background: "#f9f8f4",
          borderRadius: "28px",
          border: "2.2px solid #e6c3b8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "48px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.06)",
        }}>

            {/* ── Gift Ideas ── */}
            <div style={{ width: "min(calc(100% - 32px), 480px)", marginBottom: "48px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 1.7s both" }}>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "clamp(1.6rem,6vw,2rem)", marginBottom: "6px", textAlign: "center" }}>
                Gift Ideas
              </h3>
              <p style={{ fontFamily: sans, color: "#c0a99c", fontSize: "12px", textAlign: "center", marginBottom: "20px", letterSpacing: "0.05em" }}>
                She deserves the world — here's a little inspo 🎁
              </p>
              <div className="gift-img-wrap">
                <img src="/gift-ideas.png" alt="Gift Ideas" style={{ width: "100%", display: "block", marginTop: "-4%" }} />
              </div>
              <p style={{ fontFamily: sans, fontSize: "clamp(13px,3.5vw,15px)", color: "#b0a090", textAlign: "center", lineHeight: 1.8, marginTop: "20px" }}>
                <strong style={{ color: "#3d5a2a" }}>But truly, your presence is enough.</strong><br />
                Sharing this celebration with you means<br />more than any present ever could.
              </p>
            </div>

            {/* divider */}
            <div style={{ width: "min(calc(100% - 32px), 480px)", marginBottom: "48px" }}>
              <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e6c3b8, transparent)" }} />
            </div>

            {/* ── Directions ── */}
            {status !== "success" && <div style={{ width: "min(calc(100% - 32px), 480px)", marginBottom: "48px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 1.85s both" }}>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontStyle: "italic", color: "#3d5a2a", fontSize: "clamp(1.4rem,5vw,1.8rem)", marginBottom: "6px", textAlign: "center" }}>
                Getting There
              </h3>
              <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "clamp(9px,2vw,11px)", fontWeight: 600, textAlign: "center", marginBottom: "16px" }}>
                Dinkside Pickleball Court
              </p>
              <p style={{ fontFamily: sans, fontSize: "12px", color: "#b0a090", textAlign: "center", marginBottom: "16px", lineHeight: 1.7 }}>
                G28C+8V9, Ext, Rizal St, Poblacion<br />Danao, Cebu
              </p>
              <a
                href="https://maps.google.com/?q=G28C%2B8V9+Danao+Cebu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", borderRadius: "14px", overflow: "hidden", border: "1px solid #e6ddd5", textDecoration: "none" }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=G28C%2B8V9+Danao+Cebu&output=embed&z=16"
                  width="100%"
                  height="200"
                  style={{ display: "block", border: "none", pointerEvents: "none" }}
                  loading="lazy"
                />
                <div style={{ background: "#f9f8f4", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "14px" }}>📍</span>
                  <p style={{ fontFamily: sans, fontSize: "11px", color: "#7a9a6a", fontWeight: 600, margin: 0, letterSpacing: "0.05em" }}>
                    Open in Google Maps ›
                  </p>
                </div>
              </a>
            </div>}

            {/* ── Bottom CTA ── */}
            {status !== "success" && <div style={{ textAlign: "center", paddingBottom: "40px", animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 1.9s both" }}>
              <p style={{ fontFamily: sans, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9aa885", fontSize: "clamp(9px,2vw,13px)", fontWeight: 600, marginBottom: "16px" }}>
                Ready to RSVP?
              </p>
              <button
                onClick={() => document.getElementById("rsvp-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="btn-attend"
                style={{ fontFamily: sans, color: "#fff", borderRadius: "999px", padding: "14px 48px", fontSize: "13px", fontWeight: 700, cursor: "pointer", border: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Confirm Attendance ›
              </button>
            </div>}

        </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        width: "100%",
        background: "#8fa476",
        padding: "20px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <p style={{ fontFamily: sans, color: "#fff", fontSize: "14px", margin: 0 }}>
          Made with love by{" "}
          <a href="https://www.hunacreatives.com/contact" target="_blank" rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline", fontWeight: 600 }}>
            The RSVP Studio
          </a>
        </p>
      </div>
    </div>
  );
}

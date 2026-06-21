"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const BALL_SIZE = 130;
const MAX_SPEED = 4;
const MIN_SPEED = 1.5;
const MOUSE_REPEL = 180;
const BALL_REPEL = 180;

type Ball = { x: number; y: number; vx: number; vy: number; src: string };
type ZoomBall = { x: number; y: number; src: string };

export default function IntroPage() {
  const router = useRouter();
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [zoomBall, setZoomBall] = useState<ZoomBall | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ballsRef.current = [
        { x: -BALL_SIZE,    y: h * 0.3,    vx: 3,    vy: 2,   src: "/elements/ball-pink.png" },
        { x: w * 0.6,       y: -BALL_SIZE, vx: -2,   vy: 3,   src: "/elements/ball-pink.png" },
        { x: w + BALL_SIZE, y: h * 0.7,    vx: -2.5, vy: -2,  src: "/elements/ball-pink.png" },
      ];

      const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

      const tick = () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const m = mouseRef.current;
        const balls = ballsRef.current;

        for (let i = 0; i < balls.length; i++) {
          const b = balls[i];
          const mdx = b.x + BALL_SIZE / 2 - m.x;
          const mdy = b.y + BALL_SIZE / 2 - m.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MOUSE_REPEL && md > 0) {
            const f = ((MOUSE_REPEL - md) / MOUSE_REPEL) * 6;
            b.vx += (mdx / md) * f; b.vy += (mdy / md) * f;
          }
          for (let j = i + 1; j < balls.length; j++) {
            const o = balls[j];
            const bdx = b.x - o.x; const bdy = b.y - o.y;
            const bd = Math.sqrt(bdx * bdx + bdy * bdy);
            if (bd < BALL_REPEL && bd > 0) {
              const f = ((BALL_REPEL - bd) / BALL_REPEL) * 4;
              b.vx += (bdx / bd) * f; b.vy += (bdy / bd) * f;
              o.vx -= (bdx / bd) * f; o.vy -= (bdy / bd) * f;
            }
          }
          const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (spd > 0) { const c = clamp(spd, MIN_SPEED, MAX_SPEED); b.vx = (b.vx / spd) * c; b.vy = (b.vy / spd) * c; }
          b.x += b.vx; b.y += b.vy;
          if (b.x < 0)             { b.x = 0;             b.vx = Math.abs(b.vx); }
          if (b.x > W - BALL_SIZE) { b.x = W - BALL_SIZE; b.vx = -Math.abs(b.vx); }
          if (b.y < 0)             { b.y = 0;             b.vy = Math.abs(b.vy); }
          if (b.y > H - BALL_SIZE) { b.y = H - BALL_SIZE; b.vy = -Math.abs(b.vy); }
        }

        setPositions(balls.map(b => ({ x: b.x, y: b.y })));
        animRef.current = requestAnimationFrame(tick);
      };

      animRef.current = requestAnimationFrame(tick);
    }, 1800);

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => {
      ballsRef.current.forEach(b => {
        const dx = b.x + BALL_SIZE / 2 - e.clientX;
        const dy = b.y + BALL_SIZE / 2 - e.clientY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 400 && d > 0) { b.vx += (dx / d) * 10; b.vy += (dy / d) * 10; }
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const handleDink = () => {
    cancelAnimationFrame(animRef.current);

    // Pick the ball closest to screen center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const balls = ballsRef.current;
    let closest = balls[0];
    let minDist = Infinity;
    balls.forEach(b => {
      const d = Math.hypot(b.x + BALL_SIZE / 2 - cx, b.y + BALL_SIZE / 2 - cy);
      if (d < minDist) { minDist = d; closest = b; }
    });

    setZoomBall({ x: closest.x, y: closest.y, src: closest.src });
    setTimeout(() => router.push("/invite"), 500);
  };

  // Scale needed to cover the full diagonal of the screen
  const scale = zoomBall && typeof window !== "undefined"
    ? (Math.hypot(window.innerWidth, window.innerHeight) / BALL_SIZE) * 2.5
    : 1;

  return (
    <>
      <style>{`
        @keyframes bg-reveal {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes btn-glow-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 0 rgba(151,166,121,0.5); }
          50%       { box-shadow: 0 4px 28px rgba(0,0,0,0.2), 0 0 0 10px rgba(151,166,121,0); }
        }
        @keyframes title-float {
          0%   { transform: translateX(0px) rotate(0deg); }
          25%  { transform: translateX(6px) rotate(0.5deg); }
          50%  { transform: translateX(-4px) rotate(-0.5deg); }
          75%  { transform: translateX(5px) rotate(0.3deg); }
          100% { transform: translateX(0px) rotate(0deg); }
        }
        ${zoomBall ? `@keyframes ball-zoom-cover {
          0%   { transform: scale(1); }
          100% { transform: scale(${scale}); }
        }` : ""}
      `}</style>

      <main
        className="fixed inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('/bg-court.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "bg-reveal 0.8s ease-out forwards",
        }}
      >
        {/* Bouncing balls — hidden when zoom starts */}
        {!zoomBall && positions.map((pos, i) => (
          <img key={i} src={ballsRef.current[i]?.src} alt=""
            className="absolute pointer-events-none"
            style={{ left: pos.x, top: pos.y, width: BALL_SIZE, height: BALL_SIZE }}
          />
        ))}

        {/* Zoom ball transition */}
        {zoomBall && (
          <img
            src={zoomBall.src}
            alt=""
            className="absolute pointer-events-none"
            style={{
              left: zoomBall.x,
              top: zoomBall.y,
              width: BALL_SIZE,
              height: BALL_SIZE,
              transformOrigin: "center center",
              animation: "ball-zoom-cover 0.48s cubic-bezier(.4,0,.6,1) forwards",
              zIndex: 50,
            }}
          />
        )}

        {/* Title + button — centered on all screen sizes */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div style={{ animation: "slide-in-left 0.7s cubic-bezier(.22,1,.36,1) 0.4s both, title-float 5s ease-in-out 1.5s infinite" }}>
            <Image
              src="/title.png"
              alt="Claudy Turns 30"
              width={500}
              height={420}
              className="w-[85vw] max-w-[560px] h-auto"
              priority
            />
          </div>
          <div style={{ animation: "pop-in 0.6s cubic-bezier(.36,.07,.19,.97) 1.1s both", width: "min(300px, 70vw)" }}>
            <button
              onClick={handleDink}
              style={{ animation: "btn-glow-pulse 2.2s ease-in-out 2s infinite", background: "linear-gradient(135deg, #a8be89 0%, #7d9e62 100%)" }}
              className="mt-10 w-full inline-flex items-center justify-center gap-3 text-white font-bold rounded-full px-8 py-5 text-2xl md:text-3xl md:py-6 hover:brightness-110 transition-all cursor-pointer"
            >
              Ready to Dink? ›
            </button>
            <p style={{ animation: "pop-in 0.6s cubic-bezier(.36,.07,.19,.97) 1.6s both", textAlign: "center", color: "rgba(255,255,255,0.72)", fontSize: "clamp(11px, 2.5vw, 13px)", marginTop: "14px", letterSpacing: "0.04em", lineHeight: 1.6, width: "min(320px, 85vw)", margin: "14px auto 0" }}>
              We&apos;d love to have you there — tap the button above to see the details &amp; RSVP.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

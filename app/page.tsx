"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  const handleDink = () => {
    router.push("/invite");
  };

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
      `}</style>

      <main
        className="fixed inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('/bg-court.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "bg-reveal 0.8s ease-out forwards",
        }}
      >
        {/* Title + button — centered on all screen sizes */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div style={{ animation: "slide-in-left 0.7s cubic-bezier(.22,1,.36,1) 0.4s both, title-float 5s ease-in-out 1.5s infinite" }}>
            <Image
              src="/title.webp"
              alt="Claudy Turns 30"
              width={500}
              height={420}
              className="w-[85vw] max-w-[560px] h-auto"
              priority
            />
          </div>
          <div style={{ animation: "pop-in 0.6s cubic-bezier(.36,.07,.19,.97) 1.1s both", width: "min(260px, 65vw)", marginTop: "5vh" }}>
            <button
              onClick={handleDink}
              style={{ animation: "btn-glow-pulse 2.2s ease-in-out 2s infinite", background: "linear-gradient(135deg, #a8be89 0%, #7d9e62 100%)" }}
              className="w-full inline-flex items-center justify-center gap-3 text-white font-bold rounded-full px-6 py-11 text-2xl md:text-3xl md:py-12 hover:brightness-110 transition-all cursor-pointer"
            >
              Ready to Dink? ›
            </button>
            <p style={{ animation: "pop-in 0.6s cubic-bezier(.36,.07,.19,.97) 1.6s both", textAlign: "center", color: "rgba(255,255,255,0.72)", fontSize: "clamp(11px, 2.5vw, 13px)", letterSpacing: "0.04em", lineHeight: 1.6, marginTop: "14px" }}>
              We&apos;d love to have you there — tap the button above to see the details &amp; RSVP.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

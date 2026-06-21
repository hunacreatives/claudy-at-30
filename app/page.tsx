"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    plusOnes: "0",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollToInvite = () => {
    document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/bg-court.png"
          alt="Pickleball court"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#f0b4ae]/10" />

        <div className="relative z-10 px-10 md:px-20 pt-16">
          <h1
            className="font-display font-black leading-none"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              WebkitTextStroke: "3px #3d5a2a",
              color: "transparent",
            }}
          >
            Claudy
            <br />
            Turns
            <br />
            30
          </h1>

          <button
            onClick={scrollToInvite}
            className="mt-10 inline-flex items-center gap-2 border-2 border-[#3d5a2a] text-[#3d5a2a] font-semibold rounded-full px-6 py-2.5 text-sm tracking-wide hover:bg-[#3d5a2a] hover:text-white transition-colors cursor-pointer"
          >
            Ready to Dink? <span>›</span>
          </button>
        </div>
      </section>

      {/* ── INVITATION ── */}
      <section id="invite" className="relative overflow-hidden">
        <Image
          src="/bg-stripes.png"
          alt="Stripes background"
          fill
          className="object-cover object-center"
        />

        <div className="relative z-10 flex flex-col items-center text-center py-16 px-6">
          {/* Arch banner */}
          <div className="mb-4">
            <p className="font-display font-bold tracking-[0.2em] uppercase text-[#3d5a2a] text-sm">
              Let&apos;s Hit the Court
            </p>
          </div>

          {/* Paddle placeholder — replace src with exported Canva PNG */}
          <div className="w-14 h-14 mb-6 opacity-70">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="20" rx="16" ry="18" fill="#3d5a2a" />
              <rect x="24.5" y="37" width="7" height="14" rx="3.5" fill="#3d5a2a" />
            </svg>
          </div>

          <p className="font-dm-sans uppercase tracking-[0.25em] text-[#3d5a2a] text-xs mb-3">
            Please join us in celebrating
          </p>

          <h2
            className="font-display font-black italic text-[#3d5a2a] leading-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)" }}
          >
            Claudy&apos;s 30th
            <br />
            Birthday
          </h2>

          <div className="font-dm-sans uppercase tracking-[0.2em] text-[#3d5a2a] text-xs space-y-1 mb-8">
            <p className="font-semibold">Saturday, July 25th</p>
            <p>5:00pm – 2:00am</p>
            <p>Dinkside Pickleball Court</p>
          </div>

          <button
            onClick={() =>
              document.getElementById("rsvp-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center border-2 border-[#3d5a2a] text-[#3d5a2a] font-semibold rounded-full px-8 py-2.5 text-sm tracking-widest uppercase hover:bg-[#3d5a2a] hover:text-white transition-colors mb-14 cursor-pointer"
          >
            RSVP
          </button>

          {/* Decorative scattered balls — replace with Canva PNGs when ready */}
          <div className="flex gap-6 mb-10">
            <div className="w-10 h-10 rounded-full bg-[#f4a8a0] border-4 border-[#e8877e] shadow" />
            <div className="w-10 h-10 rounded-full bg-[#c8d88a] border-4 border-[#a8b860] shadow" />
          </div>

          {/* ── RSVP FORM CARD ── */}
          <div
            id="rsvp-form"
            className="w-full max-w-sm bg-white/90 backdrop-blur rounded-2xl px-8 py-10 shadow-md text-left"
          >
            <h3 className="font-display font-bold text-[#3d5a2a] text-2xl mb-1">
              Let&apos;s Play?
            </h3>
            <p className="text-[#7b9a6a] text-sm mb-6">
              I would love to Celebrate with you!
            </p>

            {status === "success" ? (
              <div className="text-center py-6">
                <p className="font-display italic text-[#3d5a2a] text-xl mb-2">
                  You&apos;re on the list!
                </p>
                <p className="text-sm text-[#7b9a6a]">See you on the court 🎾</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#d4c5a9] rounded-lg px-4 py-2.5 text-sm text-[#3d5a2a] placeholder-[#b0a090] outline-none focus:border-[#7b9a6a]"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#d4c5a9] rounded-lg px-4 py-2.5 text-sm text-[#3d5a2a] placeholder-[#b0a090] outline-none focus:border-[#7b9a6a]"
                />
                <select
                  value={form.plusOnes}
                  onChange={(e) => setForm({ ...form, plusOnes: e.target.value })}
                  className="w-full border border-[#d4c5a9] rounded-lg px-4 py-2.5 text-sm text-[#3d5a2a] outline-none focus:border-[#7b9a6a] bg-white"
                >
                  <option value="0">Will you be bringing anyone?</option>
                  <option value="1">+1 guest</option>
                  <option value="2">+2 guests</option>
                  <option value="3">+3 guests</option>
                  <option value="4">+4 guests</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="A thoughtful Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-[#d4c5a9] rounded-lg px-4 py-2.5 text-sm text-[#3d5a2a] placeholder-[#b0a090] outline-none focus:border-[#7b9a6a] resize-none"
                />
                {status === "error" && (
                  <p className="text-red-500 text-xs">Something went wrong, please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#3d5a2a] text-white rounded-lg py-3 text-sm font-semibold tracking-wide hover:bg-[#2e4520] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? "Sending..." : "Send My RSVP"}
                </button>
              </form>
            )}
          </div>

          <div className="mt-10 pb-10 text-4xl">🍾</div>
        </div>
      </section>
    </main>
  );
}

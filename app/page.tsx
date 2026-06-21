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

        {/* Text */}
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
            onClick={() => document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-10 inline-flex items-center gap-2 border-2 border-[#3d5a2a] text-[#3d5a2a] font-semibold rounded-full px-6 py-2.5 text-sm tracking-wide hover:bg-[#3d5a2a] hover:text-white transition-colors cursor-pointer"
          >
            Ready to Dink? <span>›</span>
          </button>
        </div>

        {/* Paddle — bottom right of hero */}
        <div className="absolute bottom-10 right-8 md:right-20 w-36 md:w-52 z-10 rotate-12">
          <Image src="/elements/paddle.png" alt="Paddle" width={300} height={370} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
        </div>

        {/* Green ball — mid right */}
        <div className="absolute top-1/3 right-4 md:right-16 w-16 md:w-24 z-10">
          <Image src="/elements/ball-green.png" alt="Ball" width={200} height={200} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
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

        {/* Scattered elements — absolute positioned */}
        {/* Top left pink ball */}
        <div className="absolute top-8 left-4 w-16 md:w-20 z-10 opacity-90" style={{ filter: "brightness(1.1)" }}>
          <Image src="/elements/ball-pink.png" alt="" width={200} height={200} className="w-full h-auto" style={{ mixBlendMode: "screen" }} />
        </div>
        {/* Top right martini */}
        <div className="absolute top-6 right-4 w-16 md:w-20 z-10">
          <Image src="/elements/martini.png" alt="" width={200} height={200} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
        </div>
        {/* Left champagne */}
        <div className="absolute top-1/3 left-2 w-20 md:w-28 z-10">
          <Image src="/elements/champagne.png" alt="" width={300} height={300} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
        </div>
        {/* Right spritz */}
        <div className="absolute top-1/2 right-2 w-16 md:w-24 z-10">
          <Image src="/elements/spritz.png" alt="" width={200} height={250} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
        </div>
        {/* Bottom bucket */}
        <div className="absolute bottom-8 left-4 w-20 md:w-28 z-10">
          <Image src="/elements/bucket.png" alt="" width={250} height={250} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center py-16 px-6">
          {/* Arch text */}
          <p className="font-display font-bold tracking-[0.2em] uppercase text-[#3d5a2a] text-sm mb-4">
            Let&apos;s Hit the Court
          </p>

          {/* Paddle icon */}
          <div className="w-16 mb-6">
            <Image src="/elements/paddle.png" alt="Paddle" width={120} height={150} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
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
            onClick={() => document.getElementById("rsvp-form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center border-2 border-[#3d5a2a] text-[#3d5a2a] font-semibold rounded-full px-8 py-2.5 text-sm tracking-widest uppercase hover:bg-[#3d5a2a] hover:text-white transition-colors mb-14 cursor-pointer"
          >
            RSVP
          </button>

          {/* Balls row */}
          <div className="flex gap-6 mb-10 items-center">
            <div className="w-10">
              <Image src="/elements/ball-green.png" alt="" width={80} height={80} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
            </div>
            <div className="w-10" style={{ filter: "brightness(1.1)" }}>
              <Image src="/elements/ball-pink.png" alt="" width={80} height={80} className="w-full h-auto" style={{ mixBlendMode: "screen" }} />
            </div>
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

          {/* Bucket at bottom */}
          <div className="mt-10 pb-6 w-24">
            <Image src="/elements/bucket.png" alt="" width={200} height={200} className="w-full h-auto" style={{ mixBlendMode: "multiply" }} />
          </div>
        </div>
      </section>
    </main>
  );
}

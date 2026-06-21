import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "You're Invited — Claudy's 30th Birthday!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const loubagBlack = readFileSync(join(process.cwd(), "public/fonts/Loubag-Black.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#f9f8f4",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left pink accent band */}
        <div style={{ width: 320, height: "100%", background: "#f0b4ae", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 100 }}>🎾</div>
            <div style={{ fontSize: 48 }}>🏓</div>
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", gap: 0 }}>
          <p style={{
            fontFamily: "Loubag",
            fontSize: 18,
            color: "#9aa885",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
          }}>
            You&apos;re Invited!
          </p>

          <p style={{
            fontFamily: "Loubag",
            fontWeight: 900,
            fontSize: 72,
            color: "#3d5a2a",
            lineHeight: 1.0,
            margin: "0 0 8px 0",
          }}>
            Claudy&apos;s
          </p>
          <p style={{
            fontFamily: "Loubag",
            fontWeight: 900,
            fontSize: 72,
            color: "#e6c3b8",
            lineHeight: 1.0,
            margin: "0 0 8px 0",
          }}>
            30th Birthday
          </p>

          <div style={{ width: 80, height: 2, background: "#e6c3b8", margin: "24px 0" }} />

          <p style={{
            fontSize: 22,
            color: "#7b9a6a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: "0 0 6px 0",
          }}>
            Saturday, July 25th · 5:00 PM
          </p>
          <p style={{
            fontSize: 22,
            color: "#7b9a6a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: 0,
          }}>
            Dinkside Pickleball Court
          </p>

          <p style={{
            fontSize: 16,
            color: "#b0a090",
            marginTop: 32,
            letterSpacing: "0.05em",
          }}>
            RSVP at claudyat30.com
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Loubag", data: loubagBlack, style: "normal", weight: 900 },
      ],
    }
  );
}

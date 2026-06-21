import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "You're Invited — Claudy's 30th Birthday!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left pink band */}
        <div style={{
          width: 360,
          height: "100%",
          background: "#f0b4ae",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 110, lineHeight: 1 }}>🎾</div>
          <div style={{ fontSize: 52, lineHeight: 1 }}>🏓</div>
        </div>

        {/* Right content */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 64px",
        }}>
          <p style={{
            fontSize: 16,
            color: "#9aa885",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: "0 0 20px 0",
            fontFamily: "Georgia, serif",
          }}>
            You&apos;re Invited!
          </p>

          <p style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#3d5a2a",
            lineHeight: 1.0,
            margin: "0 0 4px 0",
            fontFamily: "Georgia, serif",
          }}>
            Claudy&apos;s
          </p>
          <p style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#e6c3b8",
            lineHeight: 1.0,
            margin: "0 0 28px 0",
            fontFamily: "Georgia, serif",
          }}>
            30th Birthday
          </p>

          <div style={{ width: 72, height: 2, background: "#e6c3b8", margin: "0 0 28px 0" }} />

          <p style={{
            fontSize: 22,
            color: "#7b9a6a",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 8px 0",
          }}>
            Saturday, July 25th · 5:00 PM
          </p>
          <p style={{
            fontSize: 22,
            color: "#7b9a6a",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 32px 0",
          }}>
            Dinkside Pickleball Court
          </p>

          <p style={{
            fontSize: 15,
            color: "#b0a090",
            letterSpacing: "0.04em",
            margin: 0,
          }}>
            claudyat30.com
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}

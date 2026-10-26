import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 90,
        background: "#2a1a12",
        color: "#f5eee3",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 6,
          color: "#e9b25f",
          textTransform: "uppercase",
        }}
      >
        Neighbourhood café
      </div>
      <div style={{ fontSize: 96, marginTop: 20, fontWeight: 700 }}>
        {SITE.name}
      </div>
      <div style={{ fontSize: 44, marginTop: 20, color: "#e8dccb" }}>
        {SITE.tagline}
      </div>
      <div style={{ fontSize: 26, marginTop: 60, color: "#e9b25f" }}>
        Sample project · fictional business
      </div>
    </div>,
    size,
  );
}

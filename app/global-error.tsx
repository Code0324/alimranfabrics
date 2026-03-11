"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#FAF7F2" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#CC0000", marginBottom: "12px" }}>
              Critical Error
            </p>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2C2C2C", marginBottom: "16px" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "24px" }}>
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              style={{ backgroundColor: "#FFFD82", color: "#CC0000", border: "none", padding: "12px 24px", cursor: "pointer", fontWeight: "600", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

import { checkpoints } from "../data/checkpoints";

export default function CheckpointsTab({ checked, onToggle }) {
  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A09070", marginBottom: 4, fontFamily: "EB Garamond, Georgia, serif" }}>
          Servant Resource Hub
        </div>
        <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 400, color: "#1C1209", letterSpacing: "-0.01em", fontFamily: "EB Garamond, Georgia, serif", lineHeight: 1.2 }}>
          Completion
        </div>
        <div style={{ fontSize: 12, color: "#7A6545", fontStyle: "italic", marginTop: 4, fontFamily: "EB Garamond, Georgia, serif" }}>
          Track readiness for Baptism & Chrismation
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {checkpoints.map((cp, i) => {
          const done = !!checked[i];
          return (
            <div
              key={i}
              onClick={() => onToggle(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 28px",
                borderBottom: "1px solid #D5C9B0",
                cursor: "pointer",
                background: done ? "#DFF0E0" : "transparent",
                transition: "background 0.15s",
              }}
            >
              <div style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: `1.5px solid ${done ? "#4A8A5A" : "#C0B090"}`,
                background: done ? "#4A8A5A" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}>
                {done && <span style={{ fontSize: 9, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{
                fontSize: 14,
                color: done ? "#3A7040" : "#3A2E1A",
                fontFamily: "EB Garamond, Georgia, serif",
                lineHeight: 1.4,
                transition: "color 0.15s",
              }}>{cp}</span>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "20px 28px" }}>
        <div style={{
          padding: "12px 16px",
          borderRadius: 4,
          background: "#EAE0C8",
          border: "1px solid #D5C9B0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: "#7A6545", fontFamily: "EB Garamond, Georgia, serif" }}>Progress toward Baptism</span>
          <span style={{ fontSize: 13, color: "#8B6820", fontFamily: "EB Garamond, Georgia, serif" }}>
            {completedCount} / {checkpoints.length}
          </span>
        </div>
      </div>
    </div>
  );
}

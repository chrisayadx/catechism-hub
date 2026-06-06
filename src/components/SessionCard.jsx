const ROMAN = ["I", "II", "III", "IV", "V"];

export default function SessionCard({ session, isExpanded, onToggle }) {
  return (
    <div style={{
      borderBottom: "1px solid #DDD5C0",
      background: isExpanded ? "rgba(210,198,175,0.15)" : "transparent",
      transition: "background 0.2s",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "stretch",
          padding: 0,
          textAlign: "left",
        }}
      >
        {/* Floating colored bar — spaced away from edges */}
        <div style={{
          display: "flex",
          alignItems: "stretch",
          padding: "14px 14px 14px 20px",
          flexShrink: 0,
        }}>
          <div style={{
            width: 2,
            background: session.color,
            borderRadius: 2,
            opacity: 0.75,
          }} />
        </div>

        {/* Roman numeral */}
        <div style={{
          width: 32,
          paddingTop: 22,
          fontSize: 12,
          color: "#B8A880",
          fontFamily: "EB Garamond, Georgia, serif",
          flexShrink: 0,
          fontStyle: "italic",
        }}>
          {ROMAN[session.id - 1]}.
        </div>

        {/* Text content */}
        <div style={{ flex: 1, padding: "18px 12px 18px 2px" }}>
          <div style={{
            fontSize: "clamp(15px, 2.4vw, 17px)",
            color: "#1C1209",
            lineHeight: 1.3,
            fontFamily: "EB Garamond, Georgia, serif",
            marginBottom: 3,
            fontWeight: 400,
          }}>
            {session.title}
          </div>
          <div style={{
            fontSize: 13,
            color: "#8A7255",
            fontStyle: "italic",
            fontFamily: "EB Garamond, Georgia, serif",
            lineHeight: 1.4,
          }}>
            {session.theme}
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 9, flexWrap: "wrap" }}>
            {session.memorize.map((m, i) => (
              <span key={i} style={{
                fontSize: 9.5,
                padding: "2px 9px",
                borderRadius: 20,
                background: "transparent",
                border: "1px solid #C0B490",
                color: "#9A8A68",
                fontFamily: "EB Garamond, Georgia, serif",
                letterSpacing: "0.03em",
              }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <div style={{
          padding: "22px 22px 0 0",
          fontSize: 9,
          color: "#C8BD9F",
          transition: "transform 0.2s",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0,
        }}>▼</div>
      </button>

      {/* Expanded content */}
      <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
        <div className="accordion-inner">
          <div style={{
            padding: "4px 24px 22px 70px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>
            <div>
              <div style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#8B6820",
                marginBottom: 10,
                marginTop: 4,
                fontFamily: "EB Garamond, Georgia, serif",
              }}>Core Content</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 7 }}>
                {session.topics.map((t, i) => (
                  <li key={i} style={{
                    fontSize: 14,
                    color: "#3A2E1A",
                    lineHeight: 1.55,
                    fontFamily: "EB Garamond, Georgia, serif",
                  }}>{t}</li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#4A7838",
                  marginBottom: 8,
                  fontFamily: "EB Garamond, Georgia, serif",
                }}>Memorization</div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                  {session.memorize.map((m, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#3A6028", fontFamily: "EB Garamond, Georgia, serif", lineHeight: 1.45 }}>{m}</li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#6B5080",
                  marginBottom: 8,
                  fontFamily: "EB Garamond, Georgia, serif",
                }}>Practice</div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                  {session.practice.map((p, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#5A4070", lineHeight: 1.5, fontFamily: "EB Garamond, Georgia, serif" }}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

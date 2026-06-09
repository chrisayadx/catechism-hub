import { useState } from "react";
import SessionCard from "./SessionCard";
import { useData } from "../context/DataContext";

export default function SessionsTab() {
  const { sessions } = useData();
  const [expandedSession, setExpandedSession] = useState(null);
  const toggle = (id) => setExpandedSession((prev) => (prev === id ? null : id));

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {/* Page header */}
      <div className="tab-header" style={{
        borderBottom: "1px solid #D5C9B0",
        background: "#EBE2CC",
      }}>
        <div style={{
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#A09070",
          marginBottom: 4,
          fontFamily: "EB Garamond, Georgia, serif",
        }}>
          5-session catechesis curriculum
        </div>
        <div style={{
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 400,
          color: "#1C1209",
          letterSpacing: "-0.01em",
          fontFamily: "EB Garamond, Georgia, serif",
          lineHeight: 1.2,
        }}>
          Sessions
        </div>
        <div style={{
          fontSize: 12,
          color: "#7A6545",
          fontStyle: "italic",
          marginTop: 4,
          fontFamily: "EB Garamond, Georgia, serif",
        }}>
          Tap any session to expand its content, memorization, and practice
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1 }}>
        {sessions.map((s) => (
          <SessionCard
            key={s.id}
            session={s}
            isExpanded={expandedSession === s.id}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

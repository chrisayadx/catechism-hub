import { useState } from "react";
import { useData } from "../context/DataContext";

const PART_LABELS = ["I", "II", "III"];

function TopicRow({ number, topic, isExpanded, onToggle }) {
  const hasPoints = topic.points.length > 0;

  return (
    <div style={{
      borderBottom: "1px solid #DDD5C0",
      background: isExpanded ? "rgba(210,198,175,0.13)" : "transparent",
      transition: "background 0.2s",
    }}>
      <button
        onClick={hasPoints ? onToggle : undefined}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: hasPoints ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          gap: 0,
          padding: "13px 20px 13px 28px",
          textAlign: "left",
        }}
      >
        {/* Topic number */}
        <div style={{
          width: 28,
          fontSize: 12,
          color: "#B8A880",
          fontFamily: "EB Garamond, Georgia, serif",
          flexShrink: 0,
        }}>
          {number}.
        </div>

        {/* Title */}
        <div style={{
          flex: 1,
          fontSize: 14,
          color: "#1C1209",
          fontFamily: "EB Garamond, Georgia, serif",
          lineHeight: 1.35,
        }}>
          {topic.title}
        </div>

        {/* Chevron or dot */}
        {hasPoints ? (
          <div style={{
            fontSize: 9,
            color: "#C8BD9F",
            transition: "transform 0.2s",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
            marginLeft: 8,
          }}>▼</div>
        ) : (
          <div style={{ width: 9, flexShrink: 0 }} />
        )}
      </button>

      {/* Expanded bullet points */}
      {hasPoints && (
        <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
          <div className="accordion-inner">
            <ul style={{
              margin: 0,
              paddingLeft: 0,
              paddingBottom: 14,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}>
              {topic.points.map((pt, i) => (
                <li key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "4px 20px 4px 56px",
                  fontSize: 13,
                  color: "#6B5840",
                  fontFamily: "EB Garamond, Georgia, serif",
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: "#B8A880", flexShrink: 0, fontSize: 10, paddingTop: 3 }}>—</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function PartSection({ part, label }) {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const toggle = (i) => setExpandedTopic((prev) => (prev === i ? null : i));

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Part header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 20px 14px 28px",
        borderBottom: "1px solid #DDD5C0",
        borderTop: "1px solid #DDD5C0",
        background: "#EAE2CC",
        position: "sticky",
        top: 0,
        zIndex: 2,
      }}>
        <div style={{
          width: 3,
          height: 36,
          borderRadius: 2,
          background: part.color,
          flexShrink: 0,
          opacity: 0.8,
        }} />
        <div>
          <div style={{
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#A09070",
            fontFamily: "EB Garamond, Georgia, serif",
            marginBottom: 2,
          }}>
            Part {label}
          </div>
          <div style={{
            fontSize: 17,
            color: "#1C1209",
            fontFamily: "EB Garamond, Georgia, serif",
            lineHeight: 1.2,
          }}>
            {part.part}
          </div>
        </div>
        <div style={{
          marginLeft: "auto",
          fontSize: 10,
          color: "#B8A880",
          fontFamily: "EB Garamond, Georgia, serif",
          fontStyle: "italic",
        }}>
          {part.topics.length} topics
        </div>
      </div>

      {/* Topics */}
      <div>
        {part.topics.map((topic, i) => (
          <TopicRow
            key={i}
            number={i + 1}
            topic={topic}
            isExpanded={expandedTopic === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function CurriculumTab() {
  const { curriculum } = useData();
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {/* Page header */}
      <div style={{
        padding: "22px 28px 18px",
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
          Full catechism outline
        </div>
        <div style={{
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 400,
          color: "#1C1209",
          letterSpacing: "-0.01em",
          fontFamily: "EB Garamond, Georgia, serif",
          lineHeight: 1.2,
        }}>
          Curriculum
        </div>
        <div style={{
          fontSize: 12,
          color: "#7A6545",
          fontStyle: "italic",
          marginTop: 4,
          fontFamily: "EB Garamond, Georgia, serif",
        }}>
          3 parts · {curriculum.reduce((n, p) => n + p.topics.length, 0)} topics — tap any topic to expand
        </div>
      </div>

      {/* Parts */}
      <div style={{ flex: 1 }}>
        {curriculum.map((part, i) => (
          <PartSection key={part.id} part={part} label={PART_LABELS[i]} />
        ))}
      </div>
    </div>
  );
}

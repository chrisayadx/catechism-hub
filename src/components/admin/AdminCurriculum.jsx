import { useState } from "react";
import { useData } from "../../context/DataContext";

const F = "EB Garamond, Georgia, serif";

const inputStyle = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 4,
  border: "1px solid #D5C9B0",
  background: "#F2EAD5",
  fontSize: 13,
  color: "#1C1209",
  fontFamily: F,
  outline: "none",
  boxSizing: "border-box",
};

const taStyle = {
  ...inputStyle,
  resize: "vertical",
  lineHeight: 1.6,
  minHeight: 64,
};

const labelStyle = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#A09070",
  fontFamily: F,
  marginBottom: 4,
  display: "block",
};

const btnPrimary = {
  padding: "7px 16px",
  borderRadius: 4,
  border: "none",
  background: "#C8A96E",
  color: "#1C1209",
  fontSize: 12,
  fontFamily: F,
  cursor: "pointer",
};

const btnSecondary = {
  padding: "7px 14px",
  borderRadius: 4,
  border: "1px solid #D5C9B0",
  background: "transparent",
  color: "#6B5840",
  fontSize: 12,
  fontFamily: F,
  cursor: "pointer",
};

const btnDanger = {
  padding: "5px 10px",
  borderRadius: 4,
  border: "1px solid #D9BABA",
  background: "transparent",
  color: "#9B3030",
  fontSize: 11,
  fontFamily: F,
  cursor: "pointer",
};

const btnSmall = {
  padding: "4px 10px",
  borderRadius: 4,
  border: "1px solid #D5C9B0",
  background: "transparent",
  color: "#6B5840",
  fontSize: 11,
  fontFamily: F,
  cursor: "pointer",
};

// Topic editor — each topic has { title, points: string[] }
function TopicEditor({ topics, onChange }) {
  function updateTitle(i, val) {
    onChange(topics.map((t, idx) => idx === i ? { ...t, title: val } : t));
  }
  function updatePoints(i, text) {
    const points = text.split("\n").map(s => s.trim()).filter(Boolean);
    onChange(topics.map((t, idx) => idx === i ? { ...t, points } : t));
  }
  function addTopic() {
    onChange([...topics, { title: "", points: [] }]);
  }
  function removeTopic(i) {
    onChange(topics.filter((_, idx) => idx !== i));
  }
  function moveTopic(i, dir) {
    const next = [...topics];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {topics.map((topic, i) => (
        <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "#EAE0C8", borderRadius: 4, border: "1px solid #D5C9B0" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Topic title</label>
              <input style={inputStyle} value={topic.title} onChange={e => updateTitle(i, e.target.value)} placeholder="e.g. What is Doctrine?" />
            </div>
            <div style={{ display: "flex", gap: 4, paddingTop: 18 }}>
              <button style={btnSmall} onClick={() => moveTopic(i, -1)} title="Move up">↑</button>
              <button style={btnSmall} onClick={() => moveTopic(i, 1)} title="Move down">↓</button>
              <button style={btnDanger} onClick={() => removeTopic(i)}>✕</button>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Bullet points <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line, optional)</span></label>
            <textarea
              style={taStyle}
              value={topic.points.join("\n")}
              onChange={e => updatePoints(i, e.target.value)}
              placeholder="Bullet point 1&#10;Bullet point 2"
            />
          </div>
        </div>
      ))}
      <button style={{ ...btnSmall, marginTop: 4 }} onClick={addTopic}>+ Add topic</button>
    </div>
  );
}

function PartEditor({ part, onSave, onClose }) {
  const [draft, setDraft] = useState({ ...part });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const { error } = await onSave(draft);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 900);
    }
  }

  return (
    <div style={{ padding: "16px 14px", background: "#F2EAD5" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Part name</label>
          <input style={inputStyle} value={draft.part} onChange={e => setDraft(d => ({ ...d, part: e.target.value }))} />
        </div>
        <div style={{ width: 70 }}>
          <label style={labelStyle}>Label</label>
          <input style={inputStyle} value={draft.label} onChange={e => setDraft(d => ({ ...d, label: e.target.value }))} placeholder="I" />
        </div>
        <div style={{ width: 90 }}>
          <label style={labelStyle}>Color</label>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="color"
              value={draft.color}
              onChange={e => setDraft(d => ({ ...d, color: e.target.value }))}
              style={{ width: 36, height: 32, border: "1px solid #D5C9B0", borderRadius: 4, padding: 2, cursor: "pointer", background: "#F2EAD5" }}
            />
            <input
              style={{ ...inputStyle, flex: 1, fontSize: 11 }}
              value={draft.color}
              onChange={e => setDraft(d => ({ ...d, color: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ ...labelStyle, marginBottom: 8 }}>Topics</label>
        <TopicEditor topics={draft.topics} onChange={topics => setDraft(d => ({ ...d, topics }))} />
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button style={btnSecondary} onClick={onClose}>Cancel</button>
        <button style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default function AdminCurriculum() {
  const { curriculum, saveCurriculumPart } = useData();
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      <div style={{ fontSize: 16, color: "#1C1209", fontFamily: F, marginBottom: 16 }}>Curriculum</div>
      <div style={{ fontSize: 12, color: "#7A6545", fontFamily: F, fontStyle: "italic", marginBottom: 16 }}>
        Click a part to edit its name, color, and topics. Changes are saved to the database.
      </div>

      {curriculum.map((part) => (
        <div key={part.id} style={{ marginBottom: 8, border: "1px solid #D5C9B0", borderRadius: 6, overflow: "hidden" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              background: openId === part.id ? "#EAE0C8" : "#EBE2CC",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              borderBottom: openId === part.id ? "1px solid #D5C9B0" : "none",
            }}
            onClick={() => setOpenId(id => id === part.id ? null : part.id)}
          >
            <div style={{ width: 3, height: 36, borderRadius: 2, background: part.color, flexShrink: 0, opacity: 0.8 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#A09070", fontFamily: F, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 1 }}>
                Part {part.label}
              </div>
              <div style={{ fontSize: 15, color: "#1C1209", fontFamily: F }}>{part.part}</div>
            </div>
            <span style={{ fontSize: 10, color: "#A09070", marginRight: 4 }}>{part.topics.length} topics</span>
            <span style={{ fontSize: 10, color: "#A09070" }}>{openId === part.id ? "▲" : "▼"}</span>
          </button>

          {openId === part.id && (
            <PartEditor
              part={part}
              onSave={saveCurriculumPart}
              onClose={() => setOpenId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

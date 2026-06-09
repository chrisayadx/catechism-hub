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
  minHeight: 80,
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

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// Convert array to textarea value (one item per line)
const arrToText = (arr) => (arr || []).join("\n");
// Convert textarea value to array
const textToArr = (text) => text.split("\n").map(s => s.trim()).filter(Boolean);

function SessionEditor({ session, onSave, onClose }) {
  const [draft, setDraft] = useState({
    ...session,
    _topics: arrToText(session.topics),
    _memorize: arrToText(session.memorize),
    _practice: arrToText(session.practice),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const updated = {
      ...draft,
      topics: textToArr(draft._topics),
      memorize: textToArr(draft._memorize),
      practice: textToArr(draft._practice),
    };
    // Remove helper fields
    delete updated._topics;
    delete updated._memorize;
    delete updated._practice;
    const { error } = await onSave(updated);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 900);
    }
  }

  return (
    <div style={{ padding: "16px 14px", background: "#F2EAD5" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} />
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Theme / subtitle</label>
          <input style={inputStyle} value={draft.theme} onChange={e => setDraft(d => ({ ...d, theme: e.target.value }))} />
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

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Topics <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea
          style={taStyle}
          value={draft._topics}
          onChange={e => setDraft(d => ({ ...d, _topics: e.target.value }))}
          placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Memorize <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea
          style={{ ...taStyle, minHeight: 60 }}
          value={draft._memorize}
          onChange={e => setDraft(d => ({ ...d, _memorize: e.target.value }))}
          placeholder="Verse or creed to memorize"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Practice <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea
          style={{ ...taStyle, minHeight: 60 }}
          value={draft._practice}
          onChange={e => setDraft(d => ({ ...d, _practice: e.target.value }))}
          placeholder="Practice exercise"
        />
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

export default function AdminSessions() {
  const { sessions, saveSession } = useData();
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      <div style={{ fontSize: 16, color: "#1C1209", fontFamily: F, marginBottom: 16 }}>Sessions</div>
      <div style={{ fontSize: 12, color: "#7A6545", fontFamily: F, fontStyle: "italic", marginBottom: 16 }}>
        Click a session to edit its title, theme, topics, memory verses, and practice exercises.
      </div>

      {sessions.map((s, idx) => (
        <div key={s.id} style={{ marginBottom: 8, border: "1px solid #D5C9B0", borderRadius: 6, overflow: "hidden" }}>
          {/* Header */}
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              background: openId === s.id ? "#EAE0C8" : "#EBE2CC",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              borderBottom: openId === s.id ? "1px solid #D5C9B0" : "none",
            }}
            onClick={() => setOpenId(id => id === s.id ? null : s.id)}
          >
            <div style={{
              width: 3,
              height: 32,
              borderRadius: 2,
              background: s.color,
              flexShrink: 0,
              opacity: 0.8,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#A09070", fontFamily: F, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Session {ROMAN[idx] || idx + 1}
              </div>
              <div style={{ fontSize: 15, color: "#1C1209", fontFamily: F }}>{s.title}</div>
            </div>
            <span style={{ fontSize: 10, color: "#A09070" }}>{openId === s.id ? "▲" : "▼"}</span>
          </button>

          {openId === s.id && (
            <SessionEditor
              session={s}
              onSave={saveSession}
              onClose={() => setOpenId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

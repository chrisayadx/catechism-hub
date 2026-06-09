import { useState } from "react";
import { useData } from "../../context/DataContext";
import ConfirmButton from "./ConfirmButton";

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

const taStyle = { ...inputStyle, resize: "vertical", lineHeight: 1.6, minHeight: 80 };

const labelStyle = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#A09070",
  fontFamily: F,
  marginBottom: 4,
  display: "block",
};

const btnPrimary  = { padding: "7px 16px", borderRadius: 4, border: "none", background: "#C8A96E", color: "#1C1209", fontSize: 12, fontFamily: F, cursor: "pointer" };
const btnSecondary = { padding: "7px 14px", borderRadius: 4, border: "1px solid #D5C9B0", background: "transparent", color: "#6B5840", fontSize: 12, fontFamily: F, cursor: "pointer" };
const btnDanger   = { padding: "5px 12px", borderRadius: 4, border: "1px solid #D9BABA", background: "transparent", color: "#9B3030", fontSize: 11, fontFamily: F, cursor: "pointer" };

function toRoman(n) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r = "";
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { r += syms[i]; n -= vals[i]; }
  }
  return r;
}

const arrToText = (arr) => (arr || []).join("\n");
const textToArr = (text) => text.split("\n").map(s => s.trim()).filter(Boolean);

const BLANK_SESSION = {
  title: "",
  theme: "",
  color: "#C8A96E",
  topics: [],
  memorize: [],
  practice: [],
};

function SessionForm({ initial, sessionNumber, onSave, onCancel, onDelete, isNew }) {
  const [draft, setDraft] = useState({
    ...initial,
    _topics:   arrToText(initial.topics),
    _memorize: arrToText(initial.memorize),
    _practice: arrToText(initial.practice),
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  async function handleSave() {
    if (!draft.title.trim()) return;
    setSaving(true);
    const updated = {
      ...draft,
      topics:   textToArr(draft._topics),
      memorize: textToArr(draft._memorize),
      practice: textToArr(draft._practice),
    };
    delete updated._topics; delete updated._memorize; delete updated._practice;
    const { error } = await onSave(updated);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => { setSaved(false); onCancel(); }, 900);
    }
  }

  return (
    <div style={{ padding: "16px 14px", background: "#F2EAD5", borderTop: isNew ? "none" : "1px solid #D5C9B0" }}>
      <div className="admin-row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="Session title" autoFocus={isNew} />
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Theme / subtitle</label>
          <input style={inputStyle} value={draft.theme} onChange={e => setDraft(d => ({ ...d, theme: e.target.value }))} placeholder="One-line theme" />
        </div>
        <div style={{ width: 110 }}>
          <label style={labelStyle}>Color</label>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input type="color" value={draft.color} onChange={e => setDraft(d => ({ ...d, color: e.target.value }))}
              style={{ width: 36, height: 32, border: "1px solid #D5C9B0", borderRadius: 4, padding: 2, cursor: "pointer", background: "#F2EAD5" }} />
            <input style={{ ...inputStyle, fontSize: 11 }} value={draft.color} onChange={e => setDraft(d => ({ ...d, color: e.target.value }))} />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Topics <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea style={taStyle} value={draft._topics} onChange={e => setDraft(d => ({ ...d, _topics: e.target.value }))} placeholder="Topic 1&#10;Topic 2&#10;Topic 3" />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Memorize <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea style={{ ...taStyle, minHeight: 60 }} value={draft._memorize} onChange={e => setDraft(d => ({ ...d, _memorize: e.target.value }))} placeholder="Verse or creed to memorize" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Practice <span style={{ color: "#B8A880", textTransform: "none", letterSpacing: 0 }}>(one per line)</span></label>
        <textarea style={{ ...taStyle, minHeight: 60 }} value={draft._practice} onChange={e => setDraft(d => ({ ...d, _practice: e.target.value }))} placeholder="Practice exercise" />
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {!isNew && onDelete && (
            <ConfirmButton
              label="Delete session"
              style={btnDanger}
              onConfirm={() => onDelete(initial.id)}
            />
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={btnSecondary} onClick={onCancel}>Cancel</button>
          <button style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : saved ? "Saved ✓" : isNew ? "Add Session" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSessions() {
  const { sessions, saveSession, addSession, deleteSession } = useData();
  const [openId, setOpenId] = useState(null);
  const [adding, setAdding] = useState(false);

  const nextNumber = sessions.length + 1;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 16, color: "#1C1209", fontFamily: F }}>Sessions</div>
        <button style={btnPrimary} onClick={() => { setAdding(true); setOpenId(null); }}>
          + New session
        </button>
      </div>

      <div style={{ fontSize: 12, color: "#7A6545", fontFamily: F, fontStyle: "italic", marginBottom: 16 }}>
        {sessions.length} session{sessions.length !== 1 ? "s" : ""} · click to edit
      </div>

      {/* Add new session form */}
      {adding && (
        <div style={{ marginBottom: 12, border: "1px solid #C8A96E", borderRadius: 6, overflow: "hidden", background: "#EBE2CC" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
            <div style={{ width: 3, height: 32, borderRadius: 2, background: "#C8A96E", flexShrink: 0 }} />
            <div style={{ fontSize: 15, color: "#1C1209", fontFamily: F }}>New Session</div>
          </div>
          <SessionForm
            initial={BLANK_SESSION}
            sessionNumber={nextNumber}
            isNew={true}
            onSave={addSession}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {/* Existing sessions */}
      {sessions.map((s, idx) => (
        <div key={s.id} style={{ marginBottom: 8, border: "1px solid #D5C9B0", borderRadius: 6, overflow: "hidden" }}>
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
            }}
            onClick={() => { setOpenId(id => id === s.id ? null : s.id); setAdding(false); }}
          >
            <div style={{ width: 3, height: 32, borderRadius: 2, background: s.color, flexShrink: 0, opacity: 0.85 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#A09070", fontFamily: F, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Session {toRoman(idx + 1)}
              </div>
              <div style={{ fontSize: 15, color: "#1C1209", fontFamily: F }}>{s.title || <em style={{ color: "#A09070" }}>Untitled</em>}</div>
            </div>
            <span style={{ fontSize: 10, color: "#A09070" }}>{openId === s.id ? "▲" : "▼"}</span>
          </button>

          {openId === s.id && (
            <SessionForm
              session={s}
              initial={s}
              sessionNumber={idx + 1}
              isNew={false}
              onSave={saveSession}
              onDelete={deleteSession}
              onCancel={() => setOpenId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

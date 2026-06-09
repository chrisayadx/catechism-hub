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
  fontWeight: 500,
};

const btnDanger = {
  padding: "5px 12px",
  borderRadius: 4,
  border: "1px solid #D9BABA",
  background: "transparent",
  color: "#9B3030",
  fontSize: 11,
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

function ItemEditor({ items, onChange }) {
  function updateItem(i, field, val) {
    const next = items.map((it, idx) => idx === i ? { ...it, [field]: val } : it);
    onChange(next);
  }
  function addItem() {
    onChange([...items, { name: "", url: "", note: "" }]);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 12, padding: "10px 12px", background: "#EAE0C8", borderRadius: 4, border: "1px solid #D5C9B0" }}>
          <div className="admin-row" style={{ marginBottom: 6 }}>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} value={item.name} onChange={e => updateItem(i, "name", e.target.value)} placeholder="Display name" />
            </div>
            <div style={{ flex: 3 }}>
              <label style={labelStyle}>URL</label>
              <input style={inputStyle} value={item.url} onChange={e => updateItem(i, "url", e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Note</label>
              <input style={inputStyle} value={item.note || ""} onChange={e => updateItem(i, "note", e.target.value)} placeholder="Short note (optional)" />
            </div>
            <button style={btnDanger} onClick={() => removeItem(i)}>Remove</button>
          </div>
        </div>
      ))}
      <button style={{ ...btnSecondary, fontSize: 11, marginTop: 4 }} onClick={addItem}>+ Add link</button>
    </div>
  );
}

function GroupCard({ group, onSave, onDelete }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(group);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    setOpen(false);
  }

  function reset() {
    setDraft(group);
    setOpen(false);
  }

  return (
    <div style={{ marginBottom: 8, border: "1px solid #D5C9B0", borderRadius: 6, overflow: "hidden" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#EBE2CC", cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 16 }}>{group.icon}</span>
        <span style={{ flex: 1, fontSize: 14, color: "#1C1209", fontFamily: F }}>{group.category}</span>
        <span style={{ fontSize: 10, color: "#A09070", fontFamily: F }}>{group.items.length} links</span>
        <span style={{ fontSize: 10, color: "#A09070", marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={{ padding: "16px 14px", background: "#F2EAD5" }}>
          <div className="admin-row" style={{ marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Category name</label>
              <input style={inputStyle} value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value }))} />
            </div>
            <div style={{ width: 80 }}>
              <label style={labelStyle}>Icon</label>
              <input style={inputStyle} value={draft.icon} onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))} placeholder="emoji" />
            </div>
            <div style={{ width: 110 }}>
              <label style={labelStyle}>Section</label>
              <select
                style={{ ...inputStyle }}
                value={draft.section}
                onChange={e => setDraft(d => ({ ...d, section: e.target.value }))}
              >
                <option value="free">Free</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ ...labelStyle, marginBottom: 8 }}>Links</label>
            <ItemEditor items={draft.items} onChange={items => setDraft(d => ({ ...d, items }))} />
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            <button style={btnDanger} onClick={() => onDelete(group.id, group.section)}>Delete group</button>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={btnSecondary} onClick={reset}>Cancel</button>
              <button style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddGroupForm({ onAdd, onCancel }) {
  const [draft, setDraft] = useState({ section: "free", category: "", icon: "🔗", items: [] });
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!draft.category.trim()) return;
    setSaving(true);
    await onAdd(draft);
    setSaving(false);
    onCancel();
  }

  return (
    <div style={{ padding: "16px 14px", background: "#EBE2CC", borderRadius: 6, border: "1px solid #D5C9B0", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: "#3A2E1A", fontFamily: F, marginBottom: 12, fontWeight: 500 }}>New resource group</div>
      <div className="admin-row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Category name</label>
          <input style={inputStyle} value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value }))} placeholder="e.g. Podcast Series" autoFocus />
        </div>
        <div style={{ width: 80 }}>
          <label style={labelStyle}>Icon</label>
          <input style={inputStyle} value={draft.icon} onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))} />
        </div>
        <div style={{ width: 110 }}>
          <label style={labelStyle}>Section</label>
          <select style={{ ...inputStyle }} value={draft.section} onChange={e => setDraft(d => ({ ...d, section: e.target.value }))}>
            <option value="free">Free</option>
            <option value="purchase">Purchase</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ ...labelStyle, marginBottom: 8 }}>Links</label>
        <ItemEditor items={draft.items} onChange={items => setDraft(d => ({ ...d, items }))} />
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button style={btnSecondary} onClick={onCancel}>Cancel</button>
        <button style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={handleAdd} disabled={saving}>
          {saving ? "Adding…" : "Add group"}
        </button>
      </div>
    </div>
  );
}

export default function AdminResources() {
  const { resources, addResourceGroup, saveResourceGroup, deleteResourceGroup } = useData();
  const [adding, setAdding] = useState(false);

  const allGroups = [...(resources.free || []), ...(resources.purchase || [])];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 16, color: "#1C1209", fontFamily: F }}>Resources</div>
        <button style={btnPrimary} onClick={() => setAdding(true)}>+ New group</button>
      </div>

      {adding && <AddGroupForm onAdd={addResourceGroup} onCancel={() => setAdding(false)} />}

      {allGroups.length === 0 && !adding && (
        <div style={{ fontSize: 13, color: "#A09070", fontFamily: F, fontStyle: "italic", textAlign: "center", padding: "40px 0" }}>
          No resource groups yet. Add one above.
        </div>
      )}

      {/* Free */}
      {(resources.free || []).length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "#4A7838", fontFamily: F, marginBottom: 8 }}>Free</div>
          {(resources.free || []).map(group => (
            <GroupCard key={group.id} group={group} onSave={saveResourceGroup} onDelete={deleteResourceGroup} />
          ))}
        </div>
      )}

      {/* Purchase */}
      {(resources.purchase || []).length > 0 && (
        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "#8B6820", fontFamily: F, marginBottom: 8 }}>Purchase</div>
          {(resources.purchase || []).map(group => (
            <GroupCard key={group.id} group={group} onSave={saveResourceGroup} onDelete={deleteResourceGroup} />
          ))}
        </div>
      )}
    </div>
  );
}

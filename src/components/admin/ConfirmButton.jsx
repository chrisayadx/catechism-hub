import { useState, useEffect } from "react";

const F = "EB Garamond, Georgia, serif";

/**
 * A delete button that requires a second click to confirm.
 * Auto-reverts to the initial state after 3 seconds if ignored.
 */
export default function ConfirmButton({ onConfirm, label = "Delete", style = {} }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(t);
  }, [confirming]);

  if (confirming) {
    return (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#9B3030", fontFamily: F, fontStyle: "italic" }}>
          Sure?
        </span>
        <button
          style={{
            padding: "5px 12px",
            borderRadius: 4,
            border: "none",
            background: "#9B3030",
            color: "#fff",
            fontSize: 11,
            fontFamily: F,
            cursor: "pointer",
          }}
          onClick={() => { setConfirming(false); onConfirm(); }}
        >
          Yes, delete
        </button>
        <button
          style={{
            padding: "5px 10px",
            borderRadius: 4,
            border: "1px solid #D5C9B0",
            background: "transparent",
            color: "#6B5840",
            fontSize: 11,
            fontFamily: F,
            cursor: "pointer",
          }}
          onClick={() => setConfirming(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button style={style} onClick={() => setConfirming(true)}>
      {label}
    </button>
  );
}

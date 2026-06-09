import { useState, useEffect, useRef } from "react";

const F = "EB Garamond, Georgia, serif";

const BTN = {
  width: 64,
  height: 64,
  borderRadius: 8,
  border: "1px solid #D5C9B0",
  background: "#EAE0C8",
  fontSize: 20,
  color: "#1C1209",
  fontFamily: F,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.1s, border-color 0.1s",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",
};

function Key({ label, sub, onClick }) {
  const [active, setActive] = useState(false);
  return (
    <button
      style={{ ...BTN, background: active ? "#D8CEBC" : "#EAE0C8", borderColor: active ? "#B09060" : "#D5C9B0" }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => { setActive(false); onClick(); }}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={(e) => { e.preventDefault(); setActive(false); onClick(); }}
    >
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
        <span>{label}</span>
        {sub && <span style={{ fontSize: 8, color: "#A09070", letterSpacing: "0.1em", marginTop: 2 }}>{sub}</span>}
      </span>
    </button>
  );
}

export default function PinGate({ onUnlock }) {
  const [digits, setDigits] = useState([]);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const digitsRef = useRef([]);

  const correct = import.meta.env.VITE_ADMIN_PIN;

  function trySubmit(next) {
    if (next.join("") === String(correct)) {
      onUnlock();
    } else {
      setShake(true);
      setError(true);
      setTimeout(() => {
        setShake(false);
        setDigits([]);
        digitsRef.current = [];
      }, 600);
    }
  }

  function press(d) {
    const current = digitsRef.current;
    if (current.length >= 4) return;
    const next = [...current, d];
    digitsRef.current = next;
    setDigits(next);
    setError(false);
    if (next.length === 4) {
      setTimeout(() => trySubmit(next), 120);
    }
  }

  function backspace() {
    const next = digitsRef.current.slice(0, -1);
    digitsRef.current = next;
    setDigits(next);
    setError(false);
  }

  // Keyboard support
  useEffect(() => {
    function onKey(e) {
      if (e.key >= "0" && e.key <= "9") press(e.key);
      else if (e.key === "Backspace") backspace();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // stable: press/backspace read from ref, not state

  const keys = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const subLabels = { 2:"ABC", 3:"DEF", 4:"GHI", 5:"JKL", 6:"MNO", 7:"PQRS", 8:"TUV", 9:"WXYZ" };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "40px 20px" }}>
      <div style={{ fontSize: 22, color: "#1C1209", fontFamily: F, marginBottom: 6 }}>
        Admin Access
      </div>
      <div style={{ fontSize: 13, color: "#7A6545", fontFamily: F, fontStyle: "italic", marginBottom: 8 }}>
        Enter your PIN to continue
      </div>
      <div style={{ fontSize: 11, color: "#B8A880", fontFamily: F, marginBottom: 28 }}>
        Tap or type on keyboard
      </div>

      {/* Dots */}
      <div style={{
        display: "flex",
        gap: 14,
        marginBottom: error ? 12 : 36,
        animation: shake ? "shake 0.5s ease" : "none",
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: `2px solid ${error ? "#9B3030" : "#C8A96E"}`,
            background: digits.length > i ? (error ? "#9B3030" : "#C8A96E") : "transparent",
            transition: "background 0.15s",
          }} />
        ))}
      </div>

      {error && (
        <div style={{ fontSize: 12, color: "#9B3030", fontFamily: F, marginBottom: 20 }}>
          Incorrect PIN
        </div>
      )}

      {/* Keypad */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {keys.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 10 }}>
            {row.map((n) => (
              <Key key={n} label={n} sub={subLabels[n]} onClick={() => press(String(n))} />
            ))}
          </div>
        ))}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 64 }} />
          <Key label="0" onClick={() => press("0")} />
          <button
            style={{ ...BTN, fontSize: 18 }}
            onMouseDown={(e) => e.currentTarget.style.background = "#D8CEBC"}
            onMouseUp={(e) => { e.currentTarget.style.background = "#EAE0C8"; backspace(); }}
            onMouseLeave={(e) => e.currentTarget.style.background = "#EAE0C8"}
            onTouchStart={(e) => e.currentTarget.style.background = "#D8CEBC"}
            onTouchEnd={(e) => { e.preventDefault(); e.currentTarget.style.background = "#EAE0C8"; backspace(); }}
          >
            ⌫
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

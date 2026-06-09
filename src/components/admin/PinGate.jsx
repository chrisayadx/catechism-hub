import { useState } from "react";

const BTN = {
  width: 64,
  height: 64,
  borderRadius: 8,
  border: "1px solid #D5C9B0",
  background: "#EAE0C8",
  fontSize: 20,
  color: "#1C1209",
  fontFamily: "EB Garamond, Georgia, serif",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.1s, border-color 0.1s",
};

function Key({ label, sub, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={{ ...BTN, background: hover ? "#E2D8BE" : "#EAE0C8", borderColor: hover ? "#B09060" : "#D5C9B0" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
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

  const correct = import.meta.env.VITE_ADMIN_PIN;

  function press(d) {
    if (digits.length >= 4) return;
    const next = [...digits, d];
    setDigits(next);
    setError(false);
    if (next.length === 4) {
      setTimeout(() => {
        if (next.join("") === String(correct)) {
          onUnlock();
        } else {
          setShake(true);
          setError(true);
          setTimeout(() => { setShake(false); setDigits([]); }, 600);
        }
      }, 120);
    }
  }

  function backspace() {
    setDigits((prev) => prev.slice(0, -1));
    setError(false);
  }

  const keys = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const subLabels = { 2: "ABC", 3: "DEF", 4: "GHI", 5: "JKL", 6: "MNO", 7: "PQRS", 8: "TUV", 9: "WXYZ" };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "40px 20px" }}>
      <div style={{ fontSize: 22, color: "#1C1209", fontFamily: "EB Garamond, Georgia, serif", marginBottom: 6 }}>
        Admin Access
      </div>
      <div style={{ fontSize: 13, color: "#7A6545", fontFamily: "EB Garamond, Georgia, serif", fontStyle: "italic", marginBottom: 32 }}>
        Enter your PIN to continue
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 36,
          animation: shake ? "shake 0.5s ease" : "none",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${error ? "#9B3030" : "#C8A96E"}`,
              background: digits.length > i ? (error ? "#9B3030" : "#C8A96E") : "transparent",
              transition: "background 0.15s",
            }}
          />
        ))}
      </div>

      {error && (
        <div style={{ fontSize: 12, color: "#9B3030", fontFamily: "EB Garamond, Georgia, serif", marginBottom: 20, marginTop: -20 }}>
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
        {/* Bottom row: blank, 0, backspace */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 64 }} />
          <Key label="0" onClick={() => press("0")} />
          <button
            style={{ ...BTN, fontSize: 14 }}
            onClick={backspace}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E2D8BE"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#EAE0C8"; }}
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

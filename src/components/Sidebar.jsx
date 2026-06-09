function IconCurriculum() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="3.5" y="4" width="6" height="1.2" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="6.4" width="6" height="1.2" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="8.8" width="4" height="1.2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function IconSessions() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="0.5" y="1.5" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="0.5" y="5.5" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="0.5" y="9.5" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconResources() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M5 3H2.5C1.67 3 1 3.67 1 4.5V10.5C1 11.33 1.67 12 2.5 12H8.5C9.33 12 10 11.33 10 10.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7.5 1H12M12 1V5.5M12 1L5.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompletion() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 6.5L5.8 8.3L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6.5 1v1.2M6.5 10.8V12M1 6.5h1.2M10.8 6.5H12M2.46 2.46l.85.85M9.69 9.69l.85.85M9.69 3.31l-.85.85M3.31 9.69l-.85.85"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
      />
    </svg>
  );
}

const mainTabs = [
  { id: "curriculum", label: "Curriculum", Icon: IconCurriculum },
  { id: "sessions",   label: "Sessions",   Icon: IconSessions },
  { id: "resources",  label: "Resources",  Icon: IconResources },
  { id: "completion", label: "Completion", Icon: IconCompletion },
];

function NavButton({ id, label, Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 10px",
        borderRadius: 4,
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: active ? "#C8A96E" : "#6b5d47",
        background: active ? "#2a2218" : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "EB Garamond, Georgia, serif",
        width: "100%",
        transition: "color 0.15s, background 0.15s",
      }}
    >
      <span style={{ flexShrink: 0, display: "flex" }}>
        <Icon />
      </span>
      {label}
    </button>
  );
}

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside style={{
      width: 120,
      minHeight: "100dvh",
      background: "#1a1510",
      borderRight: "1px solid #2a2218",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      height: "100dvh",
    }}>
      {/* Brand */}
      <div style={{ padding: "20px 12px 16px", borderBottom: "1px solid #2a2218", textAlign: "center" }}>
        <div style={{ fontSize: 24, color: "#C8A96E", lineHeight: 1, marginBottom: 6 }}>☩</div>
        <div style={{
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#6b5d47",
          lineHeight: 1.5,
          fontFamily: "EB Garamond, Georgia, serif",
        }}>
          Coptic Orthodox<br />Catechism
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {mainTabs.map(({ id, label, Icon }) => (
          <NavButton
            key={id}
            id={id}
            label={label}
            Icon={Icon}
            active={activeTab === id}
            onClick={() => onTabChange(id)}
          />
        ))}
      </nav>

      {/* Bottom: Settings + footer */}
      <div>
        <div style={{ borderTop: "1px solid #2a2218", padding: "8px 8px 6px" }}>
          <NavButton
            id="settings"
            label="Settings"
            Icon={IconSettings}
            active={activeTab === "settings"}
            onClick={() => onTabChange("settings")}
          />
        </div>
        <div style={{
          padding: "10px 10px 14px",
          fontSize: 8,
          color: "#3a2e1e",
          textAlign: "center",
          lineHeight: 1.6,
          fontStyle: "italic",
          fontFamily: "EB Garamond, Georgia, serif",
        }}>
          For the servants —<br />that the people<br />may be built up
        </div>
      </div>
    </aside>
  );
}

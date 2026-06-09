const F = "EB Garamond, Georgia, serif";

function IconCurriculum() {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="3.5" y="4" width="6" height="1.2" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="6.4" width="6" height="1.2" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="8.8" width="4" height="1.2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function IconSessions() {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
      <rect x="0.5" y="1.5" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="0.5" y="5.5" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="0.5" y="9.5" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconResources() {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
      <path d="M5 3H2.5C1.67 3 1 3.67 1 4.5V10.5C1 11.33 1.67 12 2.5 12H8.5C9.33 12 10 11.33 10 10.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7.5 1H12M12 1V5.5M12 1L5.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompletion() {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 6.5L5.8 8.3L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6.5 1v1.2M6.5 10.8V12M1 6.5h1.2M10.8 6.5H12M2.46 2.46l.85.85M9.69 9.69l.85.85M9.69 3.31l-.85.85M3.31 9.69l-.85.85"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
      />
    </svg>
  );
}

const TABS = [
  { id: "curriculum", label: "Curriculum", Icon: IconCurriculum },
  { id: "sessions",   label: "Sessions",   Icon: IconSessions },
  { id: "resources",  label: "Resources",  Icon: IconResources },
  { id: "completion", label: "Completion", Icon: IconCompletion },
  { id: "settings",   label: "Settings",   Icon: IconSettings },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: active ? "#C8A96E" : "#4a3e2e",
              fontFamily: F,
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "6px 2px",
              borderTop: active ? "2px solid #C8A96E" : "2px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

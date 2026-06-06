const tabs = [
  { id: "sessions", label: "Sessions" },
  { id: "resources", label: "Resources" },
  { id: "completion", label: "Completion" },
];

export default function Nav({ activeTab, onTabChange }) {
  return (
    <nav className="border-b border-line bg-ink sticky top-0 z-10 px-5 sm:px-8"
      style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="max-w-3xl mx-auto flex">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 sm:flex-none border-b-2 px-4 sm:px-5 py-4 text-[12px] sm:text-[13px] tracking-widest uppercase font-serif transition-colors duration-150 touch-manipulation cursor-pointer"
              style={{
                background: "none",
                border: "none",
                borderBottom: active ? "2px solid #C8A96E" : "2px solid transparent",
                color: active ? "#C8A96E" : "#6B5D47",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

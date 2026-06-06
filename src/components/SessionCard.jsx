export default function SessionCard({ session, isExpanded, onToggle }) {
  return (
    <div
      className="rounded overflow-hidden transition-colors duration-200"
      style={{
        border: "1px solid #2A2218",
        borderLeft: `3px solid ${session.color}`,
        background: isExpanded ? "#17130E" : "#111009",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-5 flex justify-between items-start gap-3 touch-manipulation cursor-pointer"
        style={{ background: "none", border: "none", minHeight: 72 }}
      >
        <div className="flex-1 min-w-0">
          <span
            className="text-[11px] tracking-[0.2em] uppercase font-serif block mb-1"
            style={{ color: session.color }}
          >
            Session {session.id}
          </span>
          <div className="text-[17px] sm:text-[18px] text-cream font-normal leading-snug">
            {session.title}
          </div>
          <div className="text-[13px] sm:text-sm text-gold-dim mt-1 italic">
            {session.theme}
          </div>
        </div>
        <span
          className="text-lg shrink-0 mt-1 transition-transform duration-200"
          style={{ color: "#4A3D2E", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
        <div className="accordion-inner">
          <div className="px-5 pb-6 flex flex-col gap-5">
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3 m-0">
                Core Content
              </h4>
              <ul className="m-0 pl-4 flex flex-col gap-2">
                {session.topics.map((t, i) => (
                  <li key={i} className="text-cream-dim text-sm sm:text-[15px] leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <h4 className="text-[11px] tracking-[0.2em] uppercase text-sage mb-3 m-0">
                  Memorization
                </h4>
                <ul className="m-0 pl-4 flex flex-col gap-1.5">
                  {session.memorize.map((m, i) => (
                    <li key={i} className="text-sage-text text-sm sm:text-[15px]">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] tracking-[0.2em] uppercase text-mauve mb-3 m-0">
                  Practice
                </h4>
                <ul className="m-0 pl-4 flex flex-col gap-1.5">
                  {session.practice.map((p, i) => (
                    <li key={i} className="text-mauve-text text-sm sm:text-[15px] leading-snug">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

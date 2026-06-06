import { resources, resourcesNote } from "../data/resources";

function SectionDivider({ label, color = "text-sage" }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`text-[11px] tracking-[0.2em] uppercase ${color} shrink-0`}>{label}</span>
      <div className="flex-1 h-px bg-line" />
    </div>
  );
}

function ResourceGroup({ group }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{group.icon}</span>
        <h3 className="m-0 text-sm sm:text-[15px] text-cream-dim font-normal">{group.category}</h3>
      </div>
      <div className="flex flex-col gap-2 pl-0 sm:pl-6">
        {group.items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 px-4 py-3 rounded-sm no-underline transition-colors duration-150 group touch-manipulation"
            style={{ background: "#15110C", border: "1px solid #2A2218" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C8A96E40";
              e.currentTarget.style.background = "#1C160F";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2A2218";
              e.currentTarget.style.background = "#15110C";
            }}
          >
            <span className="text-gold text-sm sm:text-[15px] leading-snug">{item.name}</span>
            <span className="text-gold-faint text-[11px] sm:text-xs shrink-0">
              {item.note} ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesTab() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionDivider label="Free Resources" color="text-sage" />
        <div className="flex flex-col gap-6">
          {resources.free.map((group, i) => (
            <ResourceGroup key={i} group={group} />
          ))}
        </div>
      </div>

      <div>
        <SectionDivider label="Purchase" color="text-gold" />
        <div className="flex flex-col gap-6">
          {resources.purchase.map((group, i) => (
            <ResourceGroup key={i} group={group} />
          ))}
        </div>
      </div>

      <div
        className="px-5 py-4 rounded text-sm text-gold-muted leading-relaxed"
        style={{ background: "#15110C", border: "1px solid #2A2218", borderLeft: "3px solid #5B4A8C" }}
      >
        <strong className="text-cream-dim font-medium">Note on Fr. Kaldas & Fr. De Young books: </strong>
        {resourcesNote}
      </div>
    </div>
  );
}

import { useData } from "../context/DataContext";

function SectionDivider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <span style={{
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color,
        flexShrink: 0,
        fontFamily: "EB Garamond, Georgia, serif",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#D5C9B0" }} />
    </div>
  );
}

function ResourceGroup({ group }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 14 }}>{group.icon}</span>
        <span style={{ fontSize: 13, color: "#3A2E1A", fontFamily: "EB Garamond, Georgia, serif" }}>{group.category}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {group.items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "9px 14px",
              borderRadius: 4,
              background: "#EAE0C8",
              border: "1px solid #D5C9B0",
              textDecoration: "none",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#B09060";
              e.currentTarget.style.background = "#E2D8BE";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D5C9B0";
              e.currentTarget.style.background = "#EAE0C8";
            }}
          >
            <span style={{ fontSize: 13, color: "#8B6820", fontFamily: "EB Garamond, Georgia, serif" }}>{item.name}</span>
            <span style={{ fontSize: 10, color: "#A09070", flexShrink: 0, fontFamily: "EB Garamond, Georgia, serif" }}>{item.note} ↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesTab() {
  const { resources, resourcesNote } = useData();
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A09070", marginBottom: 4, fontFamily: "EB Garamond, Georgia, serif" }}>
          Servant Resource Hub
        </div>
        <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 400, color: "#1C1209", letterSpacing: "-0.01em", fontFamily: "EB Garamond, Georgia, serif", lineHeight: 1.2 }}>
          Resources
        </div>
      </div>
      <div style={{ padding: "24px 28px" }}>
        <SectionDivider label="Free Resources" color="#4A7838" />
        {resources.free.map((group, i) => <ResourceGroup key={i} group={group} />)}
        <div style={{ marginTop: 12 }}>
          <SectionDivider label="Purchase" color="#8B6820" />
          {resources.purchase.map((group, i) => <ResourceGroup key={i} group={group} />)}
        </div>
        <div style={{
          padding: "14px 16px",
          borderRadius: 4,
          background: "#EAE0C8",
          border: "1px solid #D5C9B0",
          borderLeft: "3px solid #6B5080",
          fontSize: 13,
          color: "#6B5840",
          lineHeight: 1.65,
          fontFamily: "EB Garamond, Georgia, serif",
          marginTop: 8,
        }}>
          <strong style={{ color: "#3A2E1A", fontWeight: 500 }}>Note on Fr. Kaldas & Fr. De Young books: </strong>
          {resourcesNote}
        </div>
      </div>
    </div>
  );
}

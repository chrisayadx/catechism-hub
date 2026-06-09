import { useState } from "react";
import PinGate from "./admin/PinGate";
import AdminResources from "./admin/AdminResources";
import AdminSessions from "./admin/AdminSessions";
import AdminCurriculum from "./admin/AdminCurriculum";
import { useData } from "../context/DataContext";

const F = "EB Garamond, Georgia, serif";

const ADMIN_TABS = [
  { id: "resources", label: "Resources" },
  { id: "sessions",  label: "Sessions" },
  { id: "curriculum", label: "Curriculum" },
];

export default function SettingsTab() {
  const [unlocked, setUnlocked] = useState(false);
  const [adminTab, setAdminTab] = useState("resources");
  const { usingSupabase, loading } = useData();

  if (!unlocked) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A09070", marginBottom: 4, fontFamily: F }}>
            Admin
          </div>
          <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 400, color: "#1C1209", fontFamily: F, lineHeight: 1.2 }}>
            Settings
          </div>
        </div>
        <PinGate onUnlock={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {/* Page header */}
      <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A09070", marginBottom: 4, fontFamily: F }}>
              Admin
            </div>
            <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 400, color: "#1C1209", fontFamily: F, lineHeight: 1.2 }}>
              Settings
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
            {/* Supabase status */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 20,
              background: usingSupabase ? "rgba(74,120,56,0.12)" : "rgba(160,144,112,0.12)",
              border: `1px solid ${usingSupabase ? "rgba(74,120,56,0.3)" : "rgba(160,144,112,0.3)"}`,
            }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: usingSupabase ? "#4A7838" : "#A09070",
              }} />
              <span style={{ fontSize: 10, color: usingSupabase ? "#4A7838" : "#A09070", fontFamily: F }}>
                {loading ? "connecting…" : usingSupabase ? "Supabase live" : "static data"}
              </span>
            </div>
            {/* Lock */}
            <button
              onClick={() => setUnlocked(false)}
              style={{
                padding: "4px 12px",
                borderRadius: 4,
                border: "1px solid #D5C9B0",
                background: "transparent",
                fontSize: 11,
                color: "#6B5840",
                fontFamily: F,
                cursor: "pointer",
              }}
            >
              Lock
            </button>
          </div>
        </div>

        {/* Sub-nav */}
        <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
          {ADMIN_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setAdminTab(id)}
              style={{
                padding: "5px 14px",
                borderRadius: 4,
                border: adminTab === id ? "1px solid #C8A96E" : "1px solid #D5C9B0",
                background: adminTab === id ? "rgba(200,169,110,0.15)" : "transparent",
                fontSize: 11,
                color: adminTab === id ? "#8B6820" : "#6B5840",
                fontFamily: F,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Admin panels */}
      <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
        {!usingSupabase && (
          <div style={{
            padding: "12px 16px",
            borderRadius: 4,
            background: "rgba(155,48,48,0.06)",
            border: "1px solid rgba(155,48,48,0.2)",
            borderLeft: "3px solid #9B3030",
            fontSize: 12,
            color: "#7A3030",
            fontFamily: F,
            lineHeight: 1.6,
            marginBottom: 20,
          }}>
            <strong style={{ fontWeight: 500 }}>No database connected.</strong> Changes made here will only last until you refresh the page.
            Add <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>VITE_SUPABASE_URL</code> and <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>VITE_SUPABASE_ANON_KEY</code> to <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>.env.local</code> to persist changes.
          </div>
        )}

        {adminTab === "resources"  && <AdminResources />}
        {adminTab === "sessions"   && <AdminSessions />}
        {adminTab === "curriculum" && <AdminCurriculum />}
      </div>
    </div>
  );
}

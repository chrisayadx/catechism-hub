import { useState } from "react";
import PinGate from "./admin/PinGate";
import AdminResources from "./admin/AdminResources";
import AdminSessions from "./admin/AdminSessions";
import AdminCurriculum from "./admin/AdminCurriculum";
import { useData } from "../context/DataContext";

const F = "EB Garamond, Georgia, serif";

const ADMIN_TABS = [
  { id: "resources",  label: "Resources" },
  { id: "sessions",   label: "Sessions" },
  { id: "curriculum", label: "Curriculum" },
];

// Persist unlock for the browser session so switching tabs doesn't re-lock
function readSessionLock() {
  try { return sessionStorage.getItem("adminUnlocked") === "1"; }
  catch { return false; }
}

export default function SettingsTab() {
  const [unlocked, setUnlocked] = useState(readSessionLock);
  const [adminTab, setAdminTab] = useState("resources");
  const { usingSupabase, loading } = useData();

  function handleUnlock() {
    setUnlocked(true);
    try { sessionStorage.setItem("adminUnlocked", "1"); } catch {}
  }

  function handleLock() {
    setUnlocked(false);
    try { sessionStorage.removeItem("adminUnlocked"); } catch {}
  }

  const pageHeader = (
    <div className="tab-header" style={{ borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A09070", marginBottom: 4, fontFamily: F }}>
        Admin
      </div>
      <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 400, color: "#1C1209", fontFamily: F, lineHeight: 1.2 }}>
        Settings
      </div>
    </div>
  );

  if (!unlocked) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {pageHeader}
        <PinGate onUnlock={handleUnlock} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {/* Header */}
      <div className="tab-header" style={{ paddingBottom: 0, borderBottom: "1px solid #D5C9B0", background: "#EBE2CC" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
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
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: usingSupabase ? "#4A7838" : "#A09070" }} />
              <span style={{ fontSize: 10, color: usingSupabase ? "#4A7838" : "#A09070", fontFamily: F }}>
                {loading ? "connecting…" : usingSupabase ? "Supabase live" : "static data"}
              </span>
            </div>
            <button
              onClick={handleLock}
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
        <div className="settings-subnav">
          {ADMIN_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setAdminTab(id)}
              style={{
                padding: "5px 14px",
                borderRadius: "4px 4px 0 0",
                border: adminTab === id ? "1px solid #D5C9B0" : "1px solid transparent",
                borderBottom: adminTab === id ? "1px solid #EBE2CC" : "1px solid transparent",
                background: adminTab === id ? "#F2EAD5" : "transparent",
                fontSize: 11,
                color: adminTab === id ? "#8B6820" : "#6B5840",
                fontFamily: F,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: adminTab === id ? -1 : 0,
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel content */}
      <div className="tab-content" style={{ flex: 1, overflowY: "auto" }}>
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
            <strong style={{ fontWeight: 500 }}>No database connected.</strong>{" "}
            Changes only last until you refresh. Add{" "}
            <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>VITE_SUPABASE_URL</code>{" "}
            and{" "}
            <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>VITE_SUPABASE_ANON_KEY</code>{" "}
            to{" "}
            <code style={{ fontSize: 11, background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 2 }}>.env.local</code>{" "}
            to persist.
          </div>
        )}

        {adminTab === "resources"  && <AdminResources />}
        {adminTab === "sessions"   && <AdminSessions />}
        {adminTab === "curriculum" && <AdminCurriculum />}
      </div>
    </div>
  );
}

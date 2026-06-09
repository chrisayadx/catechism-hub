import { useState } from "react";
import { DataProvider } from "./context/DataContext";
import Sidebar from "./components/Sidebar";
import SessionsTab from "./components/SessionsTab";
import CurriculumTab from "./components/CurriculumTab";
import ResourcesTab from "./components/ResourcesTab";
import CheckpointsTab from "./components/CheckpointsTab";
import SettingsTab from "./components/SettingsTab";

function AppInner() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [checked, setChecked] = useState({});

  const toggleCheck = (i) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "#0F0D0A" }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        background: "#F2EAD5",
      }}>
        {activeTab === "curriculum"  && <CurriculumTab />}
        {activeTab === "sessions"    && <SessionsTab />}
        {activeTab === "resources"   && <ResourcesTab />}
        {activeTab === "completion"  && <CheckpointsTab checked={checked} onToggle={toggleCheck} />}
        {activeTab === "settings"    && <SettingsTab />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppInner />
    </DataProvider>
  );
}

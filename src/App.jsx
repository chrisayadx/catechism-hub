import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SessionsTab from "./components/SessionsTab";
import ResourcesTab from "./components/ResourcesTab";
import CheckpointsTab from "./components/CheckpointsTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("sessions");
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
        {activeTab === "sessions" && <SessionsTab />}
        {activeTab === "resources" && <ResourcesTab />}
        {activeTab === "completion" && (
          <CheckpointsTab checked={checked} onToggle={toggleCheck} />
        )}
      </main>
    </div>
  );
}

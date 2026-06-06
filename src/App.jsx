import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import SessionsTab from "./components/SessionsTab";
import ResourcesTab from "./components/ResourcesTab";
import CheckpointsTab from "./components/CheckpointsTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [checked, setChecked] = useState({});

  const toggleCheck = (i) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="min-h-dvh bg-ink text-cream font-serif">
      <Header />
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        {activeTab === "sessions" && <SessionsTab />}
        {activeTab === "resources" && <ResourcesTab />}
        {activeTab === "completion" && (
          <CheckpointsTab checked={checked} onToggle={toggleCheck} />
        )}
      </main>
      <footer className="border-t border-line px-5 py-6 mt-10 text-center">
        <p className="m-0 text-[11px] tracking-[0.15em] uppercase text-gold-faint">
          ☩ For the servants — that the people may be built up ☩
        </p>
      </footer>
    </div>
  );
}

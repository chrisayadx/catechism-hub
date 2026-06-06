import { useState } from "react";
import SessionCard from "./SessionCard";
import { sessions } from "../data/sessions";

export default function SessionsTab() {
  const [expandedSession, setExpandedSession] = useState(null);

  const toggle = (id) => setExpandedSession((prev) => (prev === id ? null : id));

  return (
    <div>
      <p className="text-gold-dim text-sm italic mb-6">
        Tap any session to expand its content outline, memorization verses, and practice exercises.
      </p>
      <div className="flex flex-col gap-3">
        {sessions.map((s) => (
          <SessionCard
            key={s.id}
            session={s}
            isExpanded={expandedSession === s.id}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

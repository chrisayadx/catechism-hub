import { checkpoints } from "../data/checkpoints";

export default function CheckpointsTab({ checked, onToggle }) {
  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <p className="text-gold-dim text-sm italic mb-6">
        Track readiness for Baptism/Chrismation. Check off each checkpoint as the catechumen demonstrates it.
      </p>

      <div className="flex flex-col gap-2.5">
        {checkpoints.map((cp, i) => {
          const done = !!checked[i];
          return (
            <div
              key={i}
              onClick={() => onToggle(i)}
              className="flex items-center gap-4 px-4 py-4 rounded cursor-pointer transition-all duration-200 touch-manipulation select-none"
              style={{
                background: done ? "#15201A" : "#111009",
                border: `1px solid ${done ? "#4A7A5A" : "#2A2218"}`,
                minHeight: 56,
              }}
            >
              <div
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: `2px solid ${done ? "#6BAA7A" : "#3A2E1E"}`,
                  background: done ? "#6BAA7A" : "transparent",
                }}
              >
                {done && (
                  <span className="text-white text-[11px] font-bold leading-none">✓</span>
                )}
              </div>
              <span
                className="text-sm sm:text-[15px] leading-snug transition-colors duration-200"
                style={{ color: done ? "#8BC49A" : "#C4B89A" }}
              >
                {cp}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 px-4 py-3.5 rounded flex justify-between items-center"
        style={{ background: "#111009", border: "1px solid #2A2218" }}
      >
        <span className="text-gold-dim text-sm">Progress</span>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-1">
            {checkpoints.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-colors duration-200"
                style={{ background: checked[i] ? "#6BAA7A" : "#2A2218" }}
              />
            ))}
          </div>
          <span className="text-gold text-sm font-medium">
            {completedCount} / {checkpoints.length}
          </span>
        </div>
      </div>
    </div>
  );
}

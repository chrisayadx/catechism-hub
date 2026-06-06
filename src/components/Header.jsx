export default function Header() {
  return (
    <header className="border-b border-line-strong px-5 sm:px-8 pt-8 pb-7"
      style={{ background: "linear-gradient(180deg, #1A1510 0%, #0F0D0A 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl text-gold leading-none">☩</span>
          <p className="m-0 text-[11px] tracking-[0.22em] uppercase text-gold font-serif">
            Coptic Orthodox Catechism
          </p>
        </div>
        <h1 className="m-0 font-normal text-cream-bright leading-tight"
          style={{ fontSize: "clamp(26px, 6vw, 40px)", letterSpacing: "-0.01em" }}>
          Servant Resource Hub
        </h1>
        <p className="mt-2 text-gold-muted text-base italic">
          5-session catechesis curriculum — all sessions, resources, and materials in one place
        </p>
      </div>
    </header>
  );
}

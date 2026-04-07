export default function Navbar() {
  return (
    <nav
      style={{
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--b)",
        flexWrap: "wrap", 
        gap: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(14px, 4vw, 18px)", 
          fontWeight: 700,
          letterSpacing: 3,
          color: "var(--gold)",
        }}
      >
        NEET
      </div>

      {/* Menu */}
      <div
        style={{
          display: "flex",
          gap: "clamp(10px, 4vw, 24px)", 
          flexWrap: "wrap", 
        }}
      >
        {["Portal", "2026"].map((l) => (
          <span
            key={l}
            style={{
              fontSize: "clamp(12px, 3vw, 14px)", 
              color: "var(--muted2)",
              cursor: "pointer",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </nav>
  );
}
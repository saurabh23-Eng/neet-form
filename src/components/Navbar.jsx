export default function Navbar() {
  return (
    <nav style={{
      padding: "28px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--b)"
    }}>
      <div style={{
        fontFamily: "Syne, sans-serif",
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "var(--gold)"
      }}>
        NEET
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {["Portal", "2026"].map(l => (
          <span key={l} style={{
            fontSize: 13,
            color: "var(--muted2)",
            letterSpacing: 0.5,
            cursor: "pointer"
          }}>{l}</span>
        ))}
      </div>
    </nav>
  );
}
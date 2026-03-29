import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { getStudentData } from "../firebase/firestore";
import { logoutUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const result = await getStudentData(currentUser.uid);
      setData(result);
    };
    fetch();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!data) return (
    <>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 77px)", color: "var(--muted)" }}>
        Loading...
      </div>
    </>
  );

  const metrics = [
    { label: "Target Score", val: String(data.targetScore), sub: "out of 720" },
    { label: "Exam Year", val: String(data.examYear), sub: "Preferred" },
    { label: "Attempts", val: String(data.attempts), sub: "Attempt number" },
  ];

  const personal = [
    ["Full Name", data.fullName],
    ["Email", data.email],
    ["Date of Birth", data.dob],
    ["Phone", data.phone],
    ["City", data.city],
  ];

  const exam = [
    ["Category", data.category],
    ["Weak Subjects", data.subjects?.join(", ") || "—"],
    ["Coaching", data.coachingInstitute || "—"],
    ["Target Score", `${data.targetScore} / 720`],
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 48px" }}>

        {/* Header */}
              <button
        onClick={() => navigate("/all-students")}
        style={{
          background: "transparent",
          border: "1px solid var(--gold)",
          padding: "11px 22px",
          color: "var(--gold)",
          fontSize: 12,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "DM Sans, sans-serif",
          borderRadius: 2,
          marginRight: 12,
        }}
        >
        View All Students
        </button>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>
              Registered Student
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
              {data.fullName}
            </h2>
          </div>
          <button onClick={handleLogout} style={{
            background: "transparent", border: "1px solid var(--b)",
            padding: "11px 22px", color: "var(--muted2)", fontSize: 12,
            letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", borderRadius: 2,
          }}>
            Log Out
          </button>
        </div>

        {/* Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 28px", border: "1px solid rgba(184,149,90,0.2)", background: "rgba(184,149,90,0.04)", borderRadius: 2, marginBottom: 56 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--muted2)", letterSpacing: 0.3 }}>
            Registration complete —{" "}
            <strong style={{ color: "var(--gold)", fontWeight: 500 }}>
              Your profile has been saved successfully.
            </strong>
          </p>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid var(--b)", marginBottom: 48 }}>
          {metrics.map(({ label, val, sub }, i) => (
            <div key={label} style={{ padding: 32, borderRight: i < 2 ? "1px solid var(--b)" : "none" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "var(--muted)", textTransform: "uppercase", marginBottom: 12 }}>
                {label}
              </div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
                {val.slice(0, -2)}
                <span style={{ color: "var(--gold)" }}>{val.slice(-2)}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Data Sections */}
        {[{ title: "Personal Details", rows: personal }, { title: "Exam Details", rows: exam }].map(({ title, rows }) => (
          <div key={title} style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "var(--muted)", textTransform: "uppercase", paddingBottom: 16, borderBottom: "1px solid var(--b)" }}>
              {title}
            </div>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "20px 0", borderBottom: "1px solid var(--b)", alignItems: "start" }}>
                <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 0.5 }}>{k}</span>
                <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 400, letterSpacing: 0.2 }}>{v}</span>
              </div>
            ))}
          </div>
        ))}

      </div>
    </>
  );
  
}

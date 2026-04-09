import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/Authcontext";
import { getStudentData } from "../firebase/firestore";
import { logoutUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.uid) return;
    const fetch = async () => {
      const result = await getStudentData(currentUser.uid);
      setData(result);
    };
    fetch();
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!data)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100vh" }}
      >
        Loading...
      </div>
    );

  const metrics = [
    { label: "Target Score", val: String(data.targetScore), sub: "out of 720" },
    { label: "Exam Year", val: String(data.examYear), sub: "Preferred" },
    { label: "Attempts", val: String(data.attempts), sub: "Attempt number" },
  ];

  const personal = [
    ["Full Name", data.fullName],
    ["Email", data.email],
    ["DOB", data.dob],
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

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(20px, 5vw, 60px)", // ✅ responsive padding
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {/* Left side */}
          <div>
            <p style={{ fontSize: 10, color: "var(--nav)" }}>
              Registered Student
            </p>

            <h2
              style={{
                fontSize: "clamp(20px, 5vw, 38px)",
                fontWeight: 700,
              }}
            >
              {data.fullName}
            </h2>
          </div>

          {/* Right side (Logout button) */}
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={handleLogout}
              style={{
                color: "var(--b)",
                padding: "10px 16px",
                border: "1px solid var(--b)",
                background: "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap", // ✅ prevents breaking
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Banner */}
        <div
          style={{
            padding: "14px",
            background: "white",
            marginBottom: 30,
            fontSize: 13,
          }}
        >
          Registration complete 
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // ✅ responsive
            gap: 12,
            marginBottom: 30,
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                padding: 16,
                border: "1px solid var(--b)",
              }}
            >
              <div style={{ fontSize: 11 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{m.val}</div>
              <div style={{ fontSize: 11 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        {[
          { title: "Personal Details", rows: personal },
          { title: "Exam Details", rows: exam },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 30 }}>
            <h3 style={{ marginBottom: 10 }}>{section.title}</h3>

            {section.rows.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  flexDirection: "column", // ✅ mobile fix
                  padding: "10px 0",
                  borderBottom: "1px solid var(--b)",
                }}
              >
                <span style={{ fontSize: 12, color: "gray" }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

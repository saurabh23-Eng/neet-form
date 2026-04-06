import { useEffect, useState } from "react";

import { getAllStudents } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch students: " + err.message);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return (
    <>
      <Navbar />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 77px)",
        color: "var(--muted)",
        fontSize: 13,
        letterSpacing: 1,
      }}>
        Reading student data from Firebase...
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 77px)",
        color: "#E05C5C",
        fontSize: 13,
      }}>
        {error}
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 40,
        }}>
          <div>
            <p style={{
              fontSize: 11, letterSpacing: 4,
              color: "var(--gold)", textTransform: "uppercase",
              marginBottom: 12, opacity: 0.8,
            }}>
              Firebase Read Function
            </p>
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 32, fontWeight: 700, letterSpacing: -1,
            }}>
              All Registered Students
            </h2>
            <p style={{
              fontSize: 13, color: "var(--muted2)",
              marginTop: 8, fontWeight: 300,
            }}>
              {students.length} records fetched from Firestore
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "transparent",
              border: "1px solid var(--b)",
              padding: "11px 22px",
              color: "var(--muted2)",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              borderRadius: 2,
            }}
          >
            ← Back
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid var(--b)",
          marginBottom: 40,
        }}>
          {[
            {
              label: "Total Students",
              val: students.length,
            },
            {
              label: "General Category",
              val: students.filter(s => s.category === "General").length,
            },
            {
              label: "Avg Target Score",
              val: students.length > 0
                ? Math.round(
                    students.reduce((sum, s) =>
                      sum + Number(s.targetScore), 0
                    ) / students.length
                  )
                : 0,
            },
            {
              label: "2026 Exam",
              val: students.filter(s => s.examYear === "2026").length,
            },
          ].map(({ label, val }, i) => (
            <div key={label} style={{
              padding: "24px 28px",
              borderRight: i < 3 ? "1px solid var(--b)" : "none",
            }}>
              <div style={{
                fontSize: 11, letterSpacing: 3,
                color: "var(--muted)", textTransform: "uppercase",
                marginBottom: 10,
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 32, fontWeight: 700,
                letterSpacing: -1, color: "var(--gold)",
              }}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        {students.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "48px",
            color: "var(--muted)",
            border: "1px solid var(--b)",
            fontSize: 13,
          }}>
            No students found in database
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr",
              padding: "12px 20px",
              borderBottom: "1px solid var(--b)",
              background: "var(--s1)",
            }}>
              {["Full Name", "Email", "City", "Category", "Score", "Year"].map(h => (
                <span key={h} style={{
                  fontSize: 11, letterSpacing: 1.5,
                  color: "var(--muted)", textTransform: "uppercase",
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Table Rows */}
            {students.map((s, i) => (
              <div
                key={s.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr",
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--b)",
                  alignItems: "center",
                  transition: "background .15s",
                  cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--s1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>
                  {s.fullName}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {s.email}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {s.city}
                </span>
                <span style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  border: "1px solid rgba(184,149,90,0.3)",
                  color: "var(--gold)",
                  borderRadius: 2,
                  letterSpacing: 0.5,
                  display: "inline-block",
                }}>
                  {s.category}
                </span>
                <span style={{
                  fontSize: 13,
                  color: Number(s.targetScore) >= 600
                    ? "#00C07F"
                    : "var(--text)",
                  fontWeight: 500,
                }}>
                  {s.targetScore}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {s.examYear}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
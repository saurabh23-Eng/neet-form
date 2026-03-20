import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { submitStudentForm } from "../firebase/firestore";
import Navbar from "./Navbar";

const initialState = {
  fullName: "", dob: "", phone: "", category: "",
  attempts: "", targetScore: "", examYear: "",
  city: "", subjects: [], coachingInstitute: "",
};

const inp = {
  background: "transparent",
  border: "1px var(--box) solid",
  borderBottom: "1px solid var(--b)",
  padding: "12px 0",
  color: "var(--text)",
  fontSize: 15,
  fontFamily: "DM Sans, sans-serif",
  outline: "none",
  fontWeight: 300,
  width: "100%",
  WebkitAppearance: "none",
};

const label = {
  fontSize: 11,
  letterSpacing: 2,
  color: "var(--muted)",
  textTransform: "uppercase",
  marginBottom: 12,
  fontWeight: 500,
  display: "block",
};


const Field = ({ label: lbl, name, type = "text", placeholder, children, value, onChange }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={label}>{lbl}</label>
    {children || (
      <input
        type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder}
        required style={inp}
        onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
        onBlur={e => e.target.style.borderBottomColor = "var(--b)"}
      />
    )}
  </div>
);

const Row = ({ children, full }) => (
  <div style={{ display: "grid", gridTemplateColumns: full ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 24 }}>
    {children}
  </div>
);

export default function NeetForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, value]
          : prev.subjects.filter(s => s !== value),
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleSubject = (s) => {
    setForm(prev => ({
      ...prev,
      subjects: prev.subjects.includes(s)
        ? prev.subjects.filter(x => x !== s)
        : [...prev.subjects, s],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
         alert("No user logged in!");
         return;
      }
      await submitStudentForm(currentUser.uid, { ...form, email: currentUser.email });
      setSubmitted(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error: " + err.message);
    }
  };

  if (submitted) return (
    <>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 77px)", gap: 16 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 700, color: "var(--gold)" }}>Submitted</div>
        <p style={{ color: "var(--muted2)", fontSize: 14, fontWeight: 300 }}>Redirecting to your dashboard...</p>
      </div>
    </>
  );


  return (
    <>
      <Navbar />
      <style>{`
        body { overflow: hidden; }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 77px)" }}>
        
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 1000, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          
          {/* LEFT COLUMN */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", marginBottom: 16, opacity: 0.8 }}>
                Step 2 of 3
              </p>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: -0.5, marginBottom: 8 }}>
                Registration Details
              </h2>
              <p style={{ fontSize: 14, color: "var(--muted2)", fontWeight: 300 }}>
                Complete your student profile for NEET 2026
              </p>
            </div>

            <p style={{ fontSize: 20, letterSpacing: 3, color: "var(--muted)", textTransform: "uppercase", paddingBottom: 16, borderBottom: "1px solid var(--b)", marginBottom: 24 }}>
              Personal Information
            </p>
            <Row>
              <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="As per Aadhaar card" />
            </Row>
            <Row>
              <Field label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
              <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter Phone Number(+91..)" />
            </Row>
            <Row>
              <Field label="City / State" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" />
            </Row>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <p style={{ fontSize: 20, letterSpacing: 3, color: "var(--muted)", textTransform: "uppercase", paddingBottom: 16, borderBottom: "1px solid var(--b)", marginBottom: 24 }}>
              Exam Information
            </p>
            <Row>
              <Field label="Category" name="category">
                <select name="category" value={form.category} onChange={handleChange} required style={inp}>
                  <option value="">Select</option>
                  {["General","OBC","SC","ST"].map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Number of Attempts" name="attempts">
                <select name="attempts" value={form.attempts} onChange={handleChange} required style={inp}>
                  <option value="">Select</option>
                  {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                </select>
              </Field>
            </Row>
            <Row>
              <Field label="Target Score" name="targetScore" type="number" value={form.targetScore} onChange={handleChange} placeholder="e.g. 650" />
              <Field label="Exam Year" name="examYear">
                <select name="examYear" value={form.examYear} onChange={handleChange} required style={inp}>
                  <option value="">Select</option>
                  {["2025","2026","2027"].map(y => <option key={y}>{y}</option>)}
                </select>
              </Field>
            </Row>
            <Row full>
              <div>
                <label style={label}>Weak Subjects</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
                  {["Physics","Chemistry","Biology"].map(s => (
                    <span key={s}
                      onClick={() => toggleSubject(s)}
                      style={{
                        padding: "9px 20px",
                        border: `1px solid ${form.subjects.includes(s) ? "var(--gold)" : "var(--b)"}`,
                        borderRadius: 2,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: form.subjects.includes(s) ? "var(--gold)" : "var(--muted2)",
                        background: form.subjects.includes(s) ? "rgba(184,149,90,0.06)" : "transparent",
                        cursor: "pointer",
                        transition: "all .2s",
                        fontWeight: 500,
                      }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Row>
            <Row>
              <Field label="Coaching Institute" name="coachingInstitute" value={form.coachingInstitute} onChange={handleChange} placeholder="Allen, Aakash… (optional)" />
            </Row>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 32, borderTop: "1px solid var(--b)", marginTop: 8 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>All fields are required</span>
              <button type="submit" style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "16px 28px", background: "var(--gold)", color: "var(--bg)",
                border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700,
                fontFamily: "Syne, sans-serif", letterSpacing: 2,
                textTransform: "uppercase", cursor: "pointer",
              }}>
                Submit <span>→</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { submitStudentForm } from "../firebase/firestore";
import Navbar from "./Navbar";

const initialState = {
  fullName: "",
  dob: "",
  phone: "",
  category: "",
  attempts: "",
  targetScore: "",
  examYear: "",
  city: "",
  subjects: [],
  coachingInstitute: "",
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

const Field = ({
  label: lbl,
  name,
  type = "text",
  placeholder,
  children,
  value,
  onChange,
  error,
}) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={label}>{lbl}</label>
    {children ? (
      <>
        {children}
        {error && (
          <span style={{ color: "#ff4444", fontSize: 11, marginTop: 4 }}>
            {error}
          </span>
        )}
      </>
    ) : (
      <>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...inp, borderBottomColor: error ? "#ff4444" : "var(--b)" }}
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--gold)")}
          onBlur={(e) =>
            (e.target.style.borderBottomColor = error ? "#ff4444" : "var(--b)")
          }
        />
        {error && (
          <span style={{ color: "#ff4444", fontSize: 11, marginTop: 4 }}>
            {error}
          </span>
        )}
      </>
    )}
  </div>
);

const Row = ({ children, full }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: full
        ? "1fr"
        : "repeat(auto-fit, minmax(220px, 1fr))", // ✅ responsive
      gap: 16,
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);

const NeetForm = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.fullName || form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
      newErrors.fullName = "Name must contain only letters and spaces";
    }
    if (!form.dob || new Date(form.dob) > new Date())
      newErrors.dob = "Valid Date of Birth is required";
    if (!form.phone || !/^\+\d{1,3}\d{7,12}$/.test(form.phone))
      newErrors.phone = "Enter phone with country code (e.g. +911234567890)";
    if (!form.city) newErrors.city = "City is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.attempts) newErrors.attempts = "Attempts is required";
    if (!form.targetScore || form.targetScore < 0 || form.targetScore > 720)
      newErrors.targetScore = "Score must be between 0 and 720";
    if (!form.examYear) newErrors.examYear = "Exam Year is required";
    if (form.subjects.length === 0)
      newErrors.subjects = "Select at least one weak subject";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSubject = (s) => {
    if (errors.subjects) {
      setErrors((prev) => ({ ...prev, subjects: undefined }));
    }

    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(s)
        ? prev.subjects.filter((x) => x !== s)
        : [...prev.subjects, s],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (!currentUser) {
        alert("No user logged in!");
        setLoading(false);
        return;
      }
      await submitStudentForm(currentUser.uid, {
        ...form,
        email: currentUser.email,
      });
      setSubmitted(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  if (submitted)
    return (
      <>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 77px)",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--nav)",
            }}
          >
            Submitted
          </div>
          <p style={{ color: "var(--muted2)", fontSize: 14, fontWeight: 300 }}>
            Redirecting to your dashboard...
          </p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div style={{ padding: "16px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            padding: "clamp(16px, 4vw, 40px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // ✅ responsive
            gap: "clamp(20px, 5vw, 60px)",
          }}
        >
          {/* LEFT COLUMN */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  color: "var(--nav)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  opacity: 0.8,
                }}
              >
                Step 2 of 3
              </p>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  marginBottom: 8,
                }}
              >
                Registration Details
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted2)",
                  fontWeight: 300,
                }}
              >
                Complete your student profile for NEET 2026
              </p>
            </div>

            <p
              style={{
                fontSize: 20,
                letterSpacing: 3,
                color: "var(--muted)",
                textTransform: "uppercase",
                paddingBottom: 16,
                borderBottom: "1px solid var(--b)",
                marginBottom: 24,
              }}
            >
              Personal Information
            </p>
            <Row>
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="As per Aadhaar card"
                error={errors.fullName}
              />
            </Row>
            <Row>
              <Field
                label="Date of Birth"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                error={errors.dob}
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number(+91..)"
                error={errors.phone}
              />
            </Row>
            <Row>
              <Field
                label="City / State"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai, Maharashtra"
                error={errors.city}
              />
            </Row>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <p
              style={{
                fontSize: 20,
                letterSpacing: 3,
                color: "var(--muted)",
                textTransform: "uppercase",
                paddingBottom: 16,
                borderBottom: "1px solid var(--b)",
                marginBottom: 24,
              }}
            >
              Exam Information
            </p>
            <Row>
              <Field label="Category" name="category" error={errors.category}>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  style={inp}
                >
                  <option value="">Select</option>
                  {["General", "OBC", "SC", "ST"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Number of Attempts"
                name="attempts"
                error={errors.attempts}
              >
                <select
                  name="attempts"
                  value={form.attempts}
                  onChange={handleChange}
                  required
                  style={inp}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </Field>
            </Row>
            <Row>
              <Field
                label="Target Score"
                name="targetScore"
                type="number"
                value={form.targetScore}
                onChange={handleChange}
                placeholder="e.g. 650"
                error={errors.targetScore}
              />
              <Field label="Exam Year" name="examYear" error={errors.examYear}>
                <select
                  name="examYear"
                  value={form.examYear}
                  onChange={handleChange}
                  required
                  style={inp}
                >
                  <option value="">Select</option>
                  {["2025", "2026", "2027"].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </Field>
            </Row>
            <Row full>
              <div>
                <label style={label}>Weak Subjects</label>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    paddingTop: 4,
                  }}
                >
                  {["Physics", "Chemistry", "Biology"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      style={{
                        padding: "9px 20px",
                        border: `1px solid ${form.subjects.includes(s) ? "var(--gold)" : "var(--b)"}`,
                        borderRadius: 2,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: form.subjects.includes(s)
                          ? "var(--gold)"
                          : "var(--muted2)",
                        background: form.subjects.includes(s)
                          ? "rgba(184,149,90,0.06)"
                          : "transparent",
                        cursor: "pointer",
                        transition: "all .2s",
                        fontWeight: 500,
                        outline: "none",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.subjects && (
                  <span
                    style={{
                      color: "#ff4444",
                      fontSize: 11,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {errors.subjects}
                  </span>
                )}
              </div>
            </Row>
            <Row>
              <Field
                label="Coaching Institute"
                name="coachingInstitute"
                value={form.coachingInstitute}
                onChange={handleChange}
                placeholder="Allen, Aakash… (optional)"
              />
            </Row>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 32,
                borderTop: "1px solid var(--b)",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  fontStyle: "italic",
                }}
              >
                All fields are required
              </span>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "16px 28px",
                  background: loading ? "var(--muted)" : "var(--gold)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: 3,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NeetForm;

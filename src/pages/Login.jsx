import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/auth";
import Navbar from "../components/Navbar";

const inp = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--b)",
  padding: "12px 0",
  color: "var(--text)",
  fontSize: 16,
  fontFamily: "DM Sans, sans-serif",
  outline: "none",
  fontWeight: 300,
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, password);
      navigate("/form");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 77px)",
        }}
      >
        {/* CENTERED BOX */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "48px",
            border: "1px solid var(--b)",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.02)", // subtle background
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 12,
                opacity: 0.8,
              }}
            >
              Student Portal
            </p>

            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: -0.5,
                marginBottom: 8,
              }}
            >
              Welcome Back
            </h1>

            <p
              style={{ fontSize: 14, color: "var(--muted2)", fontWeight: 300 }}
            >
              Enter your credentials to access the exam dashboard.
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(224, 92, 92, 0.1)",
                border: "1px solid rgba(224, 92, 92, 0.2)",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "#E05C5C",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              {
                label: "Email Address",
                type: "email",
                val: email,
                set: setEmail,
                ph: "student@example.com",
                ac: "email",
              },
              {
                label: "Password",
                type: "password",
                val: password,
                set: setPassword,
                ph: "••••••••",
                ac: "current-password",
              },
            ].map(({ label, type, val, set, ph, ac }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: 3,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={val}
                  placeholder={ph}
                  autoComplete={ac}
                  required
                  onChange={(e) => set(e.target.value)}
                  style={inp}
                  onFocus={(e) =>
                    (e.target.style.borderBottomColor = "var(--gold)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = "var(--b)")
                  }
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                marginTop: 24,
                width: "100%",
                padding: "14px",
                background: "var(--gold)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              Log In
            </button>
            <p
              style={{
                textAlign: "center",
                marginTop: 24,
                fontSize: 13,
                color: "var(--muted2)",
              }}
            >
              New student?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{
                  color: "var(--gold)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Create an account
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

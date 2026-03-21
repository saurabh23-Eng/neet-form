import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      navigate("/form");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Login instead.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
    setLoading(false);
  };

  const inp = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--b)",
    padding: "10px 0",
    color: "var(--text)",
    fontSize: 15,
    fontFamily: "DM Sans, sans-serif",
    outline: "none",
    fontWeight: 300,
  };

  return (
    <>
      <Navbar />

      {/* full screen centered container */}
      <div style={{
        minHeight: "calc(100vh - 77px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>

        {/* card */}
        <div style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--s1)",
          border: "1px solid var(--b)",
          borderRadius: 4,
          padding: "48px 44px",
        }}>

          {/* card header */}
          <p style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 12,
            opacity: 0.8,
          }}>
            New Student
          </p>

          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 9,
            lineHeight: 1.2,
          }}>
            Create your account
          </h1>

          <p style={{
            fontSize: 13,
            color: "var(--muted2)",
            marginBottom: 32,
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            Register to access the NEET 2026 student portal
          </p>

          {/* divider */}
          <div style={{
            height: 1,
            background: "var(--b)",
            marginBottom: 32,
          }} />

          {/* error */}
          {error && (
            <p style={{
              fontSize: 13,
              color: "#E05C5C",
              marginBottom: 20,
              padding: "10px 14px",
              background: "rgba(224,92,92,0.08)",
              border: "1px solid rgba(224,92,92,0.2)",
              borderRadius: 4,
              letterSpacing: 0.2,
            }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* email field */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 11,
                letterSpacing: 3,
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 500,
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                placeholder="your@email.com"
                autoComplete="email"
                required
                onChange={e => setEmail(e.target.value)}
                style={inp}
                onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--b)"}
              />
            </div>

            {/* password field */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 11,
                letterSpacing: 3,
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 500,
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
                onChange={e => setPassword(e.target.value)}
                style={inp}
                onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--b)"}
              />
            </div>

            {/* confirm password field */}
            <div style={{ marginBottom: 36 }}>
              <label style={{
                display: "block",
                fontSize: 11,
                letterSpacing: 3,
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 500,
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                onChange={e => setConfirm(e.target.value)}
                style={inp}
                onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--b)"}
              />
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "16px 20px",
                background: loading ? "var(--muted)" : "var(--gold)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all .25s",
              }}
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <span>{loading ? "⏳" : "→"}</span>
            </button>

            {/* divider */}
            <div style={{
              height: 1,
              background: "var(--b)",
              margin: "28px 30px",
            }} />

            {/* login link */}
            <p style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--muted2)",
            }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{
                  color: "var(--gold)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Sign in here
              </span>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}
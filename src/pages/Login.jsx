import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../firebase/auth";


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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/form");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to sign in with Google. Check console for details.");
    }
  };

  return (
    <>
      {/* Custom top bar: left title, right hamburger */}
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px 18px 24px",
        background: "var(--s1)",
        borderBottom: "1.5px solid var(--b)",
        boxShadow: "0 2px 16px 0 rgba(49, 80, 235, 0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <span style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: "var(--gold)",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}>Neet 2026</span>
        <span style={{ cursor: "pointer", padding: 8 }} aria-label="Open sidebar">
          {/* Hamburger icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect y="7" width="32" height="3.5" rx="1.5" fill="#e2ccaa" />
            <rect y="14" width="32" height="3.5" rx="1.5" fill="#e2ccaa" />
            <rect y="21" width="32" height="3.5" rx="1.5" fill="#e2ccaa" />
          </svg>
        </span>
      </div>
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
            <div style={{ position: "relative", margin: "24px 0" }}>
              <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 1, background: "var(--b)" }} />
              <span style={{ position: "relative", background: "#0c0c0c", padding: "0 10px", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 2 }}>or</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "#ffffff",
                color: "#1f1f1f",
                border: "1px solid #ffffff",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                letterSpacing: 0.5,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#f2f2f2";
                e.currentTarget.style.borderColor = "#f2f2f2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#ffffff";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
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

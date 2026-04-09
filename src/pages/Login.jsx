import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../firebase/auth";

const inp = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--b)",
  padding: "10px 0",
  color: "var(--text)",
  fontSize: "clamp(14px, 2vw, 16px)",
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
      console.error(error);
      setError("Google sign-in failed.");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px", 
          background: "var(--bg)",
          borderBottom: "1px solid var(--b)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(16px, 4vw, 22px)", 
            color: "var(--nav)",
          }}
        >
          Neet 2026
        </span>

        <div style={{ width: 28, height: 20 }}>
          <div style={{ height: 3, background: "#fbfbfb", marginBottom: 5 }} />
          <div style={{ height: 3, background: "#fbfbfb", marginBottom: 5 }} />
          <div style={{ height: 3, background: "#fbfbfb" }} />
        </div>
      </div>

      {/* Main Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 60px)",
          padding: "16px", // prevent edge sticking
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "clamp(20px, 5vw, 40px)", // responsive padding
            border: "1px solid var(--b)",
            borderRadius: 11,
            background: "rgba(245, 244, 244, 0.02)",
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ fontSize: 25, letterSpacing: 2, color: "var(--nav)" }}>
              Student Portal
            </p>

            <h1
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(20px, 5vw, 32px)", // ✅ responsive
                fontWeight: 700,
              }}
            >
              Welcome Back
            </h1>

            <p style={{ fontSize: 13, color: "var(--muted2)" }}>
              Enter your credentials
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(224,92,92,0.1)",
                padding: 10,
                marginBottom: 20,
                borderRadius: 6,
                textAlign: "center",
                color: "#E05C5C",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {[
              { label: "Email", type: "email", val: email, set: setEmail },
              {
                label: "Password",
                type: "password",
                val: password,
                set: setPassword,
              },
            ].map(({ label, type, val, set }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11 }}>{label}</label>
                <input
                  type={type}
                  value={val}
                  required
                  onChange={(e) => set(e.target.value)}
                  style={inp}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--gold)",
                border: "none",
                borderRadius: 6,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Log In
            </button>

            {/* Divider */}
            <div style={{ textAlign: "center", margin: "20px 0" }}>or</div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: "100%",
                padding: "12px",
                background: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {/* Google Logo */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                  fill="#EA4335"
                />
              </svg>

              <span>Continue with Google</span>
            </button>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              New student?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{ color: "var(--gold)", cursor: "pointer" }}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

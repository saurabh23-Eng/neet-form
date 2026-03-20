import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
// import { seedFirestore } from "./data/seeddata";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={
            <ProtectedRoute><FormPage /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      {/* Temporary seed button */}
      {/* <button
        onClick={seedFirestore}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 20px",
          background: "red",
          color: "white",
          zIndex: 9999,
        }}
      >
        Seed Database (click once)
      </button> */}
    </AuthProvider>
  );
}
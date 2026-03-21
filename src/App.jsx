import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={
          <ProtectedRoute><FormPage /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; 

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "40px" }}>
        Carregando...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

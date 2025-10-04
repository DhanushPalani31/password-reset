import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/forgot" replace />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>

  );
}

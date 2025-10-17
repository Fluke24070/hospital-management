import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🔹 หน้าทั่วไป
import MainPage from "./page/mainpage";
import Login from "./page/login";
import Register from "./page/register";
import Reset from "./page/reset";

// 🔹 Layout และหน้าภายในระบบ
import Layout from "./components/Layout";
import Dashboard from "./page/PatientInfo";     // หน้าประวัติผู้ป่วย
import Appointment from "./page/appointment";
import DrugHistory from "./page/drugHistory";
import Billing from "./page/billing";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 default → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔓 public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/forgot" element={<Navigate to="/reset" replace />} />
        <Route path="/main" element={<MainPage />} />

        {/* 🔐 private layout (มีเมนูด้านบน) */}
        <Route element={<Layout />}>
          <Route path="/PatientInfo" element={<Dashboard />} />   {/* ✅ เปลี่ยน path */}
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/DrugHistory" element={<DrugHistory />} />
          <Route path="/billing" element={<Billing />} />

          {/* 🔁 redirect จาก path เก่า /dashboard */}
          <Route path="/dashboard" element={<Navigate to="/PatientInfo" replace />} />
        </Route>

        {/* ❌ 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>ไม่พบหน้า (404)</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

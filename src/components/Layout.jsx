import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../style/layout.css";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          {/* ซ้าย: โลโก้ + เมนู */}
          <div className="header-left">
            <div className="brand" onClick={() => navigate("/PatientInfo")}>
              <img src="/logo.png" alt="Hospital" className="brand-logo" />
              <div className="brand-text">
                <div className="brand-title">SAMITIVEJ</div>
                <div className="brand-sub">CHONBURI</div>
              </div>
            </div>

            <nav className="main-nav">
              <NavLink to="/PatientInfo" end className="nav-link">
                ข้อมูลผู้ป่วย
              </NavLink>
              <NavLink to="/appointments" className="nav-link">
                การนัดหมาย
              </NavLink>
              <NavLink to="/DrugHistory" className="nav-link">
                ประวัติการรับยา
              </NavLink>
              <NavLink to="/billing" className="nav-link">
                การเงิน
              </NavLink>
            </nav>
          </div>

          {/* ขวา: ปุ่ม Home กลับหน้า Login */}
          <div className="header-right">
            <button
              className="home-link"
              onClick={() => {
                // ถ้าอยาก "ออกจากระบบจริงๆ" ให้ปลดคอมเมนต์ 2 บรรทัดล่างนี้
                // localStorage.removeItem("currentUser");
                // localStorage.removeItem("hms_session");
                navigate("/login");
              }}
              title="กลับหน้าเข้าสู่ระบบ"
            >
              <span className="home-text">Home</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

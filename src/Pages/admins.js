import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/admin.css";

export default function Admins() {
  const navigate = useNavigate();

  const [appointments] = useState([
    { id: 1, doctor: "Dr. Somchai", patient: "Somchai Prasert", date: "2025-11-02", time: "09:00" },
    { id: 2, doctor: "Dr. Thitiya", patient: "Thitiya Soosuk", date: "2025-11-02", time: "10:30" },
    { id: 3, doctor: "Dr. Somchai", patient: "Somsak Chaiyo", date: "2025-11-03", time: "11:00" },
    { id: 4, doctor: "Dr. Thitiya", patient: "Nida Chansiri", date: "2025-11-04", time: "14:00" },
  ]);

  const [activeTable, setActiveTable] = useState(null); // today / week / null
  const [showTable, setShowTable] = useState(false);

  const today = "2025-11-02";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const todayAppointments = appointments.filter(appt => appt.date === today);
  const weekAppointments = appointments; // สามารถกรอง 7 วันจริงได้

  const displayedAppointments = activeTable === "today" ? todayAppointments :
                                activeTable === "week" ? weekAppointments : [];

  const tableTitle = activeTable === "today" ? "📅 นัดหมายวันนี้" :
                     activeTable === "week" ? "🗓 นัดหมายสัปดาห์นี้" : "";

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin / Doctor Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="dashboard-buttons">
        {/* ปุ่มดูงานวันนี้ */}
        <div className="dashboard-card">
          <h2>👩‍⚕️ ดูงานวันนี้</h2>
          <p>แสดงนัดหมายของหมอวันนี้ พร้อมผู้ป่วยที่ต้องดู</p>
          <button className="big-btn" onClick={() => { setActiveTable("today"); setShowTable(true); }}>
            ดูงานวันนี้
          </button>
        </div>

        {/* ปุ่มดูงานสัปดาห์นี้ */}
        <div className="dashboard-card">
          <h2>🗓 ดูงานสัปดาห์นี้</h2>
          <p>แสดงนัดหมายของหมอทั้งสัปดาห์นี้</p>
          <button className="big-btn" onClick={() => { setActiveTable("week"); setShowTable(true); }}>
            ดูงานสัปดาห์นี้
          </button>
        </div>
      </div>

      {/* ตารางด้านล่าง */}
      {showTable && (
        <div className="table-section">
          <div className="table-header">
            <h2>{tableTitle}</h2>
            <button className="close-btn" onClick={() => setShowTable(false)}>ปิดตาราง</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>หมอ</th>
                <th>ผู้ป่วย</th>
                <th>วันที่</th>
                <th>เวลา</th>
              </tr>
            </thead>
            <tbody>
              {displayedAppointments.map(appt => (
                <tr key={appt.id}>
                  <td>{appt.doctor}</td>
                  <td>{appt.patient}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

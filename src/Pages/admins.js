import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/admin.css";

export default function Admins() {
  const navigate = useNavigate();
  const [showToday, setShowToday] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const doctor = { id: 1, name: "นพ. สมชาย ใจดี", photo: "" }; // ใส่ path รูปของคุณใน photo

  const appointmentsToday = [
    { id: 1, patient: "นาย สมหมาย ใจดี", gender: "ชาย", age: 48, time: "09:00", dept: "อายุรกรรม", status: "รอตรวจ" },
    { id: 2, patient: "น.ส. มาลัย จิตงาม", gender: "หญิง", age: 35, time: "10:00", dept: "สูตินรีเวช", status: "ตรวจเสร็จ" },
  ];

  const appointmentsWeek = [
    { id: 3, patient: "นาย วิทยา บุญเลิศ", date: "2025-11-03", time: "13:00" },
    { id: 4, patient: "น.ส. กาญจนา แก้วใส", date: "2025-11-05", time: "09:30" },
  ];

  const patientHistory = [
    { id: 1, date: "2025-10-28", disease: "ไข้หวัด", medicine: "พาราเซตามอล", cost: 300 },
    { id: 2, date: "2025-09-15", disease: "ปวดหัว", medicine: "ไอบูโพรเฟน", cost: 250 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      {/* หัวข้อใหญ่ */}
      <header className="admin-header">
        <h1>ระบบจัดการงานแพทย์</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      {/* รูปหมอ + ชื่อหมอ */}
      <div className="doctor-profile">
        <div className="doctor-avatar">
          {doctor.photo ? <img src={doctor.photo} alt={doctor.name} /> : <span role="img" aria-label="doctor">🩺</span>}
        </div>
        <h2>{doctor.name}</h2>
      </div>

      {/* ปุ่มดูงานวันนี้ / สัปดาห์ */}
      <div className="dashboard-section">
        <div className="form-buttons">
          <button
            className="view-btn"
            onClick={() => {
              setShowToday(true);
              setShowWeek(false);
              setShowForm(false);
              setShowHistory(false);
            }}
          >
            📅 ดูงานของวันนี้
          </button>

          <button
            className="view-btn"
            onClick={() => {
              setShowWeek(true);
              setShowToday(false);
              setShowForm(false);
              setShowHistory(false);
            }}
          >
            📆 ดูงานของสัปดาห์นี้
          </button>
        </div>
      </div>

      {/* ตารางงานวันนี้ */}
      {showToday && (
        <div className="dashboard-section">
          <h3>📅 ตารางงานของวันนี้</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ชื่อผู้ป่วย</th>
                <th>เพศ</th>
                <th>อายุ</th>
                <th>เวลา</th>
                <th>แผนก</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsToday.map(a => (
                <tr key={a.id}>
                  <td>{a.patient}</td>
                  <td>{a.gender}</td>
                  <td>{a.age}</td>
                  <td>{a.time}</td>
                  <td>{a.dept}</td>
                  <td>{a.status}</td>
                  <td>
                    <button className="add-btn" onClick={() => { setShowForm(true); setShowHistory(false); }}>กรอกประวัติ</button>
                    <button className="view-btn" onClick={() => { setShowHistory(true); setShowForm(false); }}>ดูประวัติ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="close-btn" onClick={() => setShowToday(false)}>ปิด</button>
        </div>
      )}

      {/* ตารางงานสัปดาห์นี้ */}
      {showWeek && (
        <div className="dashboard-section">
          <h3>📆 ตารางงานของสัปดาห์นี้</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ชื่อผู้ป่วย</th>
                <th>วันที่</th>
                <th>เวลา</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsWeek.map(a => (
                <tr key={a.id}>
                  <td>{a.patient}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="close-btn" onClick={() => setShowWeek(false)}>ปิด</button>
        </div>
      )}

      {/* ฟอร์มกรอกข้อมูล */}
      {showForm && (
        <div className="form-container">
          <h3>📝 กรอกข้อมูลการรักษา</h3>
          <form>
            <label>ชื่อผู้ป่วย</label>
            <input type="text" value="นาย สมหมาย ใจดี" readOnly />

            <label>เพศ</label>
            <input type="text" value="ชาย" readOnly />

            <label>อายุ</label>
            <input type="text" value="48" readOnly />

            <label>การวินิจฉัยโรค</label>
            <textarea placeholder="รายละเอียดการวินิจฉัย" />

            <label>ยาที่จ่าย</label>
            <input type="text" placeholder="กรอกชื่อยา" />

            <label>ค่ารักษา (บาท)</label>
            <input type="number" placeholder="จำนวนเงิน" />

            <div className="form-buttons">
              <button type="submit" className="save-btn">บันทึก</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>ยกเลิก</button>
            </div>
          </form>
        </div>
      )}

      {/* ประวัติผู้ป่วย */}
      {showHistory && (
        <div className="history-container">
          <h3>📖 ประวัติการรักษาผู้ป่วย</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>วันที่</th>
                <th>โรคที่วินิจฉัย</th>
                <th>ยาที่จ่าย</th>
                <th>ค่ารักษา (บาท)</th>
              </tr>
            </thead>
            <tbody>
              {patientHistory.map(h => (
                <tr key={h.id}>
                  <td>{h.date}</td>
                  <td>{h.disease}</td>
                  <td>{h.medicine}</td>
                  <td>{h.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="close-btn" onClick={() => setShowHistory(false)}>ปิด</button>
        </div>
      )}

    </div>
  );
}

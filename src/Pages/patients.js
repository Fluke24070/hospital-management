import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/patient.css";

export default function Patient() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("history");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // ตัวอย่างข้อมูล
  const medicalHistory = [
    { id: 1, date: "2025-10-28", doctor: "Dr. Somchai", diagnosis: "ไข้หวัดใหญ่", treatment: "ให้ยาแก้ไข้และพักผ่อน" },
    { id: 2, date: "2025-09-15", doctor: "Dr. Thitiya", diagnosis: "ปวดท้อง", treatment: "ให้ยาแก้ปวดและตรวจเลือด" },
  ];

  const medicineReceipts = [
    { id: 1, date: "2025-10-28", medicine: "Paracetamol 500mg", quantity: 10, price: 50 },
    { id: 2, date: "2025-10-28", medicine: "Vitamin C 1000mg", quantity: 5, price: 100 },
  ];

  const paymentBills = [
    { id: 1, date: "2025-10-28", description: "ค่ารักษา + ค่ายา", total: 250 },
    { id: 2, date: "2025-09-15", description: "ค่าตรวจและยา", total: 480 },
  ];

  return (
    <div className="patient-page">
      <header className="patient-header">
        <h1>Patient Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="tab-buttons">
        <button
          className={activeTab === "history" ? "active-tab" : "tab-btn"}
          onClick={() => setActiveTab("history")}
        >
          🩺 ประวัติการรักษา
        </button>
        <button
          className={activeTab === "receipt" ? "active-tab" : "tab-btn"}
          onClick={() => setActiveTab("receipt")}
        >
          💊 ใบเสร็จจ่ายยา
        </button>
        <button
          className={activeTab === "bill" ? "active-tab" : "tab-btn"}
          onClick={() => setActiveTab("bill")}
        >
          💵 บิลจ่ายเงิน
        </button>
      </div>

      <div className="patient-content">
        {activeTab === "history" && (
          <div className="content-box">
            <h2>🩺 ประวัติการรักษา</h2>
            <table>
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>แพทย์ผู้รักษา</th>
                  <th>การวินิจฉัย</th>
                  <th>การรักษา</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.doctor}</td>
                    <td>{item.diagnosis}</td>
                    <td>{item.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "receipt" && (
          <div className="content-box">
            <h2>💊 ใบเสร็จจ่ายยา</h2>
            <table>
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>ชื่อยา</th>
                  <th>จำนวน</th>
                  <th>ราคา (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {medicineReceipts.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.medicine}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "bill" && (
          <div className="content-box">
            <h2>💵 บิลจ่ายเงิน</h2>
            <table>
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>รายละเอียด</th>
                  <th>ยอดรวม (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {paymentBills.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

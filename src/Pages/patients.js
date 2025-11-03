import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/patient.css";

export default function Patient() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("history");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserName");
    navigate("/login");
  };

  const patientName = localStorage.getItem("currentUserName")?.trim();

  useEffect(() => {
    const fetchTreatData = async () => {
      if (!patientName) return;
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/treatBYname?name=${encodeURIComponent(patientName)}`
        );
        const data = await response.json();
        if (response.ok && Array.isArray(data.data)) {
          setMedicalHistory(data.data);
        } else {
          setMedicalHistory([]);
        }
      } catch (err) {
        console.error("Error fetching treat data:", err);
        setMedicalHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatData();
  }, [patientName]);

  return (
    <div className="patient-page">
      <header className="patient-header">
        <h1>ดูประวัติการรักษา / ค่าใช้จ่าย</h1>
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
          className={activeTab === "bill" ? "active-tab" : "tab-btn"}
          onClick={() => setActiveTab("bill")}
        >
          💵 บิลจ่ายเงิน
        </button>
      </div>

      <div className="patient-content">
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : medicalHistory.length === 0 ? (
          <p>ยังไม่มีข้อมูลการรักษา</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ชื่อผู้ป่วย</th>
                {activeTab === "history" && <>
                  <th>เพศ</th>
                  <th>อายุ</th>
                  <th>การวินิจฉัย</th>
                </>}
                {activeTab === "bill" && <>
                  <th>ยาที่จ่าย</th>
                  <th>ค่ารักษา</th>
                </>}
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.name.trim()}</td>
                  {activeTab === "history" && <>
                    <td>{item.sex.trim()}</td>
                    <td>{item.age}</td>
                    <td>{item.treat}</td>
                  </>}
                  {activeTab === "bill" && <>
                    <td>{item.med}</td>
                    <td>{item.price}</td>
                  </>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="patient-name">
              <strong>ชื่อผู้ป่วย:</strong> {patientName}
            </div>
      </div>
    </div>
  );
}

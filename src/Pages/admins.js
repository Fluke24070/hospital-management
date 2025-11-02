import React, { useState, useEffect } from "react";
import "../Styles/admin.css";

export default function Admins() {
  const [viewType, setViewType] = useState("today");
  const [showTable, setShowTable] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  const appointmentsToday = [
    { id: 1, patient: "Somchai Prasert", doctor: "Dr. Somchai", date: "2025-11-02", time: "09:00" },
    { id: 2, patient: "Thitiya Soosuk", doctor: "Dr. Thitiya", date: "2025-11-02", time: "10:30" },
  ];

  const appointmentsWeek = [
    { id: 3, patient: "Narin Boonmee", doctor: "Dr. Somchai", date: "2025-11-03", time: "11:00" },
    { id: 4, patient: "Anong Srisuk", doctor: "Dr. Thitiya", date: "2025-11-04", time: "14:00" },
  ];

  const currentAppointments =
    viewType === "today" ? appointmentsToday : appointmentsWeek;

  const handleOpenModal = async (patient, type) => {
    setSelectedPatient(patient);
    setModalType(type);

    if (type === "viewHistory") {
      try {
        const response = await fetch(
          `http://localhost/hospital/get_patient_history.php?patient_name=${patient.patient}`
        );
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setModalType(null);
    setHistoryData([]);
  };

  return (
    <div className="admin-container">
      <h1 className="page-title">Doctor Dashboard</h1>
      <p className="page-subtitle">
        หน้าสำหรับแพทย์ตรวจสอบนัดหมายและดูประวัติผู้ป่วย
      </p>

      <div className="button-container">
        <button
          className={`toggle-btn ${viewType === "today" ? "active" : ""}`}
          onClick={() => setViewType("today")}
        >
          🩺 ดูงานของวันนี้
        </button>
        <button
          className={`toggle-btn ${viewType === "week" ? "active" : ""}`}
          onClick={() => setViewType("week")}
        >
          📅 ดูงานของสัปดาห์นี้
        </button>
      </div>

      <button className="view-btn" onClick={() => setShowTable(!showTable)}>
        {showTable ? "ปิดตาราง" : "ดูตาราง"}
      </button>

      {showTable && (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ชื่อผู้ป่วย</th>
              <th>แพทย์ผู้ดูแล</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((item) => (
              <tr key={item.id}>
                <td>{item.patient}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                  <button
                    className="info-btn"
                    onClick={() => handleOpenModal(item, "viewHistory")}
                  >
                    📋 ดูประวัติทั้งหมด
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalType === "viewHistory" && (
        <div className="modal">
          <div className="modal-content">
            <h2>ประวัติการรักษาของ {selectedPatient.patient}</h2>
            {historyData.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>อาการ / วินิจฉัย</th>
                    <th>ยาที่จ่าย</th>
                    <th>ค่ารักษา (บาท)</th>
                    <th>แพทย์ผู้ดูแล</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.diagnosis}</td>
                      <td>{record.medicine}</td>
                      <td>{record.cost}</td>
                      <td>{record.doctor_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center" }}>ไม่มีข้อมูลการรักษา</p>
            )}
            <button className="close-btn" onClick={handleCloseModal}>
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

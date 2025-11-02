import React, { useState } from "react";
import "../Styles/admin.css";

export default function Admins() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showToday, setShowToday] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const doctors = [
    { id: 1, name: "นพ. สมชาย ใจดี" },
    { id: 2, name: "นพ. ธิติยา สุขสม" },
  ];

  const appointmentsToday = [
    { 
      id: 1, 
      patient: "นาย สมหมาย ใจดี", 
      gender: "ชาย", 
      age: 48, 
      department: "ทั่วไป", 
      time: "09:00", 
      status: "รอตรวจ" 
    },
    { 
      id: 2, 
      patient: "น.ส. มาลัย จิตงาม", 
      gender: "หญิง", 
      age: 35, 
      department: "จักษุ", 
      time: "10:00", 
      status: "ตรวจเสร็จ" 
    },
  ];

  const appointmentsWeek = [
    { id: 3, patient: "นาย วิทยา บุญเลิศ", date: "2025-11-03", time: "13:00" },
    { id: 4, patient: "น.ส. กาญจนา แก้วใส", date: "2025-11-05", time: "09:30" },
  ];

  const patientHistory = [
    { id: 1, date: "2025-10-28", disease: "ไข้หวัด", medicine: "พาราเซตามอล", cost: 300 },
    { id: 2, date: "2025-09-15", disease: "ปวดหัว", medicine: "ไอบูโพรเฟน", cost: 250 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("บันทึกข้อมูลผู้ป่วย:", selectedPatient);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>ระบบจัดการงานแพทย์</h1>
        <p>เลือกแพทย์เพื่อดูงานประจำวันและสัปดาห์ รวมถึงกรอกข้อมูลผู้ป่วย</p>
      </div>

      {doctors.map((doc) => (
        <div className="dashboard-section" key={doc.id}>
          <h2>{doc.name}</h2>
          <p>ดูงานของแพทย์ท่านนี้ และจัดการข้อมูลผู้ป่วย</p>

          <div className="form-buttons">
            <button
              className="view-btn"
              onClick={() => {
                setSelectedDoctor(doc.id);
                setShowToday(true);
                setShowWeek(false);
                setShowForm(false);
                setShowHistory(false);
              }}
            >
              ดูงานของวันนี้
            </button>

            <button
              className="view-btn"
              onClick={() => {
                setSelectedDoctor(doc.id);
                setShowWeek(true);
                setShowToday(false);
                setShowForm(false);
                setShowHistory(false);
              }}
            >
              ดูงานของสัปดาห์นี้
            </button>
          </div>

          {/* ตารางงานวันนี้ */}
          {selectedDoctor === doc.id && showToday && (
            <div className="dashboard-section">
              <h3>ตารางงานของวันนี้</h3>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ชื่อผู้ป่วย</th>
                    <th>เวลา</th>
                    <th>สถานะ</th>
                    <th>การจัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsToday.map((a) => (
                    <tr key={a.id}>
                      <td>{a.patient}</td>
                      <td>{a.time}</td>
                      <td>{a.status}</td>
                      <td>
                        <button
                          className="add-btn"
                          onClick={() => {
                            setSelectedPatient(a);
                            setShowForm(true);
                            setShowHistory(false);
                          }}
                        >
                          กรอกประวัติ
                        </button>
                        <button
                          className="view-btn"
                          onClick={() => {
                            setShowHistory(true);
                            setShowForm(false);
                          }}
                        >
                          ดูประวัติ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="close-btn" onClick={() => setShowToday(false)}>
                ปิด
              </button>
            </div>
          )}

          {/* ตารางงานสัปดาห์นี้ */}
          {selectedDoctor === doc.id && showWeek && (
            <div className="dashboard-section">
              <h3>ตารางงานของสัปดาห์นี้</h3>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ชื่อผู้ป่วย</th>
                    <th>วันที่</th>
                    <th>เวลา</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsWeek.map((a) => (
                    <tr key={a.id}>
                      <td>{a.patient}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="close-btn" onClick={() => setShowWeek(false)}>
                ปิด
              </button>
            </div>
          )}

          {/* ฟอร์มกรอกข้อมูลผู้ป่วย */}
          {showForm && selectedPatient && (
            <div className="form-container">
              <h2>กรอกข้อมูลการรักษา</h2>
              <form onSubmit={handleSubmit}>
                <label>ชื่อผู้ป่วย</label>
                <input type="text" value={selectedPatient.patient} readOnly />

                <label>เพศ</label>
                <input type="text" value={selectedPatient.gender} readOnly />

                <label>อายุ</label>
                <input type="number" value={selectedPatient.age} readOnly />

                <label>แผนก</label>
                <input type="text" value={selectedPatient.department} readOnly />

                <label>การวินิจฉัยโรค</label>
                <textarea placeholder="รายละเอียดการวินิจฉัย" />

                <label>ยาที่จ่าย</label>
                <input type="text" placeholder="กรอกชื่อยา" />

                <label>ค่ารักษา (บาท)</label>
                <input type="number" placeholder="จำนวนเงิน" />

                <div className="form-buttons">
                  <button type="submit" className="save-btn">บันทึก</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ตารางประวัติผู้ป่วย */}
          {showHistory && (
            <div className="history-container">
              <h3>ประวัติการรักษาผู้ป่วย</h3>
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
                  {patientHistory.map((h) => (
                    <tr key={h.id}>
                      <td>{h.date}</td>
                      <td>{h.disease}</td>
                      <td>{h.medicine}</td>
                      <td>{h.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="close-btn" onClick={() => setShowHistory(false)}>
                ปิด
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

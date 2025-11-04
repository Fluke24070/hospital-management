import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/admin.css";

export default function Admins() {
  const navigate = useNavigate();

  // view control
  const [showToday, setShowToday] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // data state
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [appointmentsWeek] = useState([
    { id: 3, patient: "นาย วิทยา บุญเลิศ", date: "2025-11-03", time: "13:00" },
    { id: 4, patient: "น.ส. กาญจนา แก้วใส", date: "2025-11-05", time: "09:30" },
  ]);
  const [patientHistory] = useState([
    { id: 1, date: "2025-10-28", disease: "ไข้หวัด", medicine: "พาราเซตามอล", cost: 300 },
    { id: 2, date: "2025-09-15", disease: "ปวดหัว", medicine: "ไอบูโพรเฟน", cost: 250 },
  ]);

  const doctor = { id: 1, name: "", photo: "" };

  // form data for treatment
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    age: "",
    treat: "",
    med: "",
    price: "",
  });
  const [appointmentsAll, setAppointmentsAll] = useState([]);
  const fetchAllAppointments = async () => {
  try {
    const response = await fetch("http://localhost:5000/allappointments");
    const data = await response.json();
    console.log("All appointments API:", data.data);

    if (response.ok && Array.isArray(data.data)) {
      const formatted = data.data.map((item, index) => ({
        id: index + 1,
        appointID: item.appointID ? item.appointID.trim() : "",
        patient: item.appointID ? item.appointID.trim() : "ไม่ระบุ",
        gender: item.sex ? item.sex.trim() : "",
        phone: item.phonenum || "",
        rawDate: item.appointmentdate,
        date: item.appointmentdate ? new Date(item.appointmentdate).toLocaleDateString() : "",
        time: item.appointmentdate ? new Date(item.appointmentdate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
        status: "รอตรวจ",
      }));
      setAppointmentsAll(formatted);
    } else {
      console.error("Failed to fetch all appointments:", data);
    }
  } catch (err) {
    console.error("Error fetching all appointments:", err);
  }
};


  // currently selected appointment (when clicking "กรอกประวัติ")
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // fetch today's appointments from API
  const fetchAppointmentsToday = async () => {
    try {
      const response = await fetch("http://localhost:5000/appointments/today");
      const data = await response.json();
      console.log("API data:", data.data);

      if (response.ok && Array.isArray(data.data)) {
        const formatted = data.data.map((item, index) => ({
          id: index + 1,
          appointID: item.appointID ? item.appointID.trim() : "",
          patient: item.appointID ? item.appointID.trim() : "ไม่ระบุ",
          gender: item.sex ? item.sex.trim() : "",
          phone: item.phonenum || "",
          rawDate: item.appointmentdate,
          time: item.appointmentdate ? new Date(item.appointmentdate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
          status: "รอตรวจ",
        }));
        setAppointmentsToday(formatted);
      } else {
        console.error("Failed to fetch today's appointments:", data);
      }
    } catch (err) {
      console.error("Error fetching today's appointments:", err);
    }
  };

  // load when user opens "ดูงานของวันนี้"
  useEffect(() => {
    if (showToday) fetchAppointmentsToday();
  }, [showToday]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // when click "กรอกประวัติ" - prefill form with appointment info
  const openFormForAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      name: appointment.patient || "",
      sex: appointment.gender || "",
      age: "", // left blank for user to fill (DB doesn't provide age)
      treat: "",
      med: "",
      price: "",
    });
    setShowForm(true);
    setShowHistory(false);
  };

  // submit treatment to backend /treat
  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic client-side validation
    if (!formData.name || !formData.sex || !formData.age || !formData.treat || !formData.med || formData.price === "") {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const payload = {
      name: String(formData.name).trim(),
      sex: String(formData.sex).trim(),
      age: parseInt(formData.age, 10),
      treat: String(formData.treat).trim(),
      med: String(formData.med).trim(),
      price: parseInt(formData.price, 10),
    };

    try {
      console.log("Sending treat payload:", payload);
      const res = await fetch("http://localhost:5000/treat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      console.log("Response from /treat:", resJson);

      if (res.ok) {
        alert("บันทึกข้อมูลการรักษาสำเร็จ");
        setShowForm(false);
        // รีเฟรชตารางวันนี้ถ้าต้องการ
        if (showToday) fetchAppointmentsToday();
      } else {
        // ถ้า backend ส่ง message หรือ error ให้แสดง
        const msg = resJson?.error || resJson?.message || "เกิดข้อผิดพลาด";
        alert("เกิดข้อผิดพลาด: " + msg);
      }
    } catch (err) {
      console.error("Error submitting treat:", err);
      alert("ไม่สามารถเชื่อมต่อไปยังเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>ระบบจัดการงานแพทย์</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="doctor-profile">
        <div className="doctor-avatar">
          {doctor.photo ? <img src={doctor.photo} alt={doctor.name} /> : <span role="img" aria-label="doctor">🩺</span>}
        </div>
        <h2>{doctor.name}</h2>
      </div>

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
            fetchAllAppointments(); // เพิ่มตรงนี้
          }}>
            📆 ดูงานทั้งหมด
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
                <th>เบอร์โทรศัพท์</th>
                <th>เพศ</th>
                <th>เวลา</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsToday.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>ไม่มีคิววันนี้</td></tr>
              ) : (
                appointmentsToday.map((a) => (
                  <tr key={a.id}>
                    <td>{a.patient}</td>
                    <td>{a.phone}</td>
                    <td>{a.gender}</td>
                    <td>{a.time}</td>
                    <td>
                      <button className="add-btn" onClick={() => openFormForAppointment(a)}>กรอกประวัติ</button>
      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button className="close-btn" onClick={() => setShowToday(false)}>ปิด</button>
        </div>
      )}

      {/* ตารางงานสัปดาห์นี้ */}
      {showWeek && (
        <div className="dashboard-section">
          <h3>📆 ตารางงานทั้งหมด</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ชื่อผู้ป่วย</th>
                <th>เบอร์โทรศัพท์</th>
                <th>เพศ</th>
                <th>เวลา</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                 {appointmentsAll.length === 0 ? (
    <tr><td colSpan="5" style={{ textAlign: "center" }}>ไม่มีข้อมูล</td></tr>
  ) : (
    appointmentsAll.map((a) => (
      <tr key={a.id}>
        <td>{a.patient}</td>
        <td>{a.phone}</td>
        <td>{a.gender}</td>
        <td>{a.date} {a.time}</td>
        <td>{a.status}</td>
      </tr>
    ))
  )}
              </tbody>

          </table>
          <button className="close-btn" onClick={() => setShowWeek(false)}>ปิด</button>
        </div>
      )}

      {/* ฟอร์มกรอกข้อมูล */}
      {showForm && (
        <div className="form-container">
          <h3>📝 กรอกข้อมูลการรักษา</h3>
          <form onSubmit={handleSubmit}>
            <label>ชื่อผู้ป่วย</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              readOnly={!!selectedAppointment} // ถ้ามาจาก appointment ให้ล็อกชื่อ (แต่ยังเปลี่ยนได้ถ้าต้องการลบ readOnly)
            />

            <label>เพศ</label>
            <input
              type="text"
              value={formData.sex}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
              readOnly={!!selectedAppointment}
            />

            <label>อายุ</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="กรอกอายุ"
            />

            <label>การวินิจฉัยโรค</label>
            <textarea
              placeholder="รายละเอียดการวินิจฉัย"
              value={formData.treat}
              onChange={(e) => setFormData({ ...formData, treat: e.target.value })}
            />

            <label>ยาที่จ่าย</label>
            <input
              type="text"
              placeholder="กรอกชื่อยา"
              value={formData.med}
              onChange={(e) => setFormData({ ...formData, med: e.target.value })}
            />

            <label>ค่ารักษา (บาท)</label>
            <input
              type="number"
              placeholder="จำนวนเงิน"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

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

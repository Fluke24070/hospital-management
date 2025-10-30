import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          KU Hospital Management <span className="legal-siteSign"></span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>นัดหมายล่วงหน้าออนไลน์</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            ชื่อผู้ป่วย :
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            {formErrors.patientName && <p className="error-message">{formErrors.patientName}</p>}
          </label>

          <br />
          <label>
            เบอร์ติดต่อ :
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
            {formErrors.patientNumber && <p className="error-message">{formErrors.patientNumber}</p>}
          </label>

          <br />
          <label>
            เพศ :
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">กรุณาเลือก</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="private">ไม่ระบุ</option>
            </select>
            {formErrors.patientGender && <p className="error-message">{formErrors.patientGender}</p>}
          </label>

          <br />
          <label>
            วันที่เวลาที่จะนัดหมาย :
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && <p className="error-message">{formErrors.appointmentTime}</p>}
          </label>

          <br />
          <label>
            เลือกรูปแบบ :
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              required
            >
              <option value="default">กรุณาเลือก</option>
              <option value="voice">ออนไลน์</option>
              <option value="video">ออนไซต์</option>
            </select>
            {formErrors.preferredMode && <p className="error-message">{formErrors.preferredMode}</p>}
          </label>

          <br />
          <button type="submit" className="text-appointment-btn">
            ยืนยันนัดหมาย
          </button>

          <p className="success-message" style={{display: isSubmitted ? "block" : "none"}}>Appointment details has been sent to the patients phone number via SMS.</p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2023 KU Hospital Management. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;

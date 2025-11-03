import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [appointID, setAppointID] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [sex, setSex] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!appointID.trim()) {
      errors.appointID = "Patient name is required";
    } else if (appointID.trim().length < 3) {
      errors.appointID = "Patient name must be at least 3 characters";
    }

    if (!phonenum.trim()) {
      errors.phonenum = "Phone number is required";
    } else if (phonenum.trim().length !== 10) {
      errors.phonenum = "Phone number must be 10 digits";
    }

    if (sex === "default") {
      errors.sex = "Please select patient gender";
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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Debugging: ดูค่าที่จะส่งไป backend
    console.log({
      appointID,
      phonenum,
      sex,
      appointmentdate: appointmentTime,
    });

    try {
      const response = await fetch("http://localhost:5000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointID,
          phonenum,
          sex,
          appointmentdate: appointmentTime,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        toast.success("Appointment Scheduled!", {
          position: toast.POSITION.TOP_CENTER,
          onOpen: () => setIsSubmitted(true),
          onClose: () => setIsSubmitted(false),
        });

        setAppointID("");
        setPhonenum("");
        setSex("default");
        setAppointmentTime("");
        setFormErrors({});
      } else {
        toast.error(`Failed: ${data.message || "Unknown error"}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">KU Hospital Management</Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">นัดหมายล่วงหน้าออนไลน์</h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            ชื่อผู้ป่วย:
            <input
              type="text"
              value={appointID}
              onChange={(e) => setAppointID(e.target.value)}
              required
            />
            {formErrors.appointID && (
              <p className="error-message">{formErrors.appointID}</p>
            )}
          </label>

          <label>
            เบอร์ติดต่อ:
            <input
              type="text"
              value={phonenum}
              onChange={(e) => setPhonenum(e.target.value)}
              required
            />
            {formErrors.phonenum && (
              <p className="error-message">{formErrors.phonenum}</p>
            )}
          </label>

          <label>
            เพศ:
            <select value={sex} onChange={(e) => setSex(e.target.value)} required>
              <option value="default">กรุณาเลือก</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="private">ไม่ระบุ</option>
            </select>
            {formErrors.sex && <p className="error-message">{formErrors.sex}</p>}
          </label>

          <label>
            วันที่เวลาที่จะนัดหมาย:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && (
              <p className="error-message">{formErrors.appointmentTime}</p>
            )}
          </label>

          <button type="submit" className="text-appointment-btn">
            ยืนยันนัดหมาย
          </button>

          {isSubmitted && (
            <p className="success-message">
              Appointment details have been sent to the patient's phone number via SMS.
            </p>
          )}
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2025 KU Hospital Management. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;

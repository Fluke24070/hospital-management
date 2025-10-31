import React from "react";
import Doctor from "../Assets/doctor-book-appointment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>ทำไมถึงต้องเลือกรักษากับเรา</span>
        </h3>
        <p className="ba-description">
         ค้นพบเหตุผลที่ควรเลือก KU Hospital Management เพื่อการดูแลสุขภาพของคุณ
        สัมผัสการดูแลจากผู้เชี่ยวชาญ ความสะดวกสบาย และแนวทางการรักษาที่ปรับให้เหมาะกับคุณ
        ให้ความเป็นอยู่ที่ดีของคุณเป็นสิ่งสำคัญที่สุด ร่วมกับเราเพื่อการดูแลสุขภาพที่ดีกว่าและชีวิตที่มีความสุขมากขึ้น
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> เรามีแพทย์ผู้เชียวชาญ
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> ปรึกษาฟรี
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> ง่ายและสดวก
        </p>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> นัดหมาย
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
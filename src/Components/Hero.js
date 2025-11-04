import React, { useEffect, useState } from "react";
import Doctor from "../Assets/pho01.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ตรวจสอบ localStorage ว่ามี currentUser หรือไม่
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && currentUser !== "null" && currentUser !== "undefined") {
      setIsLoggedIn(true);
    }

    const onPageScroll = () => {
      setGoUp(window.scrollY > 600);
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser || currentUser === "null" || currentUser === "undefined") {
      navigate("/login"); // ยังไม่ได้ login → ไปหน้า login
    } else {
      navigate("/appointment"); // login แล้ว → ไปหน้า appointment
    }
  };

  const handleBookPatientClick = () => {
    navigate("/patient");
  };

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ สุขภาพมาก่อน</p>
          <h2 className="text-title">ค้นหาแพทย์ของคุณ และ นัดหมาย</h2>
          <p className="text-descritpion">
            ติดต่อนัดหมายกับแพทย์ออนไลน์และรับคำแนะนำทางการแพทย์ 
            บริการดูแลสุขภาพตามความต้องการ อยู่แค่ปลายนิ้วของคุณ
          </p>

          {/* ปุ่มนัดหมาย */}
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> นัดหมาย
          </button>

          {/* ปุ่มประวัติคนไข้ จะโชว์เฉพาะตอน login */}
          {isLoggedIn && (
            <button
              className="text-appointment-btn"
              type="button"
              onClick={handleBookPatientClick}
            >
              <FontAwesomeIcon icon={faCalendarCheck} /> ประวัติคนไข้
            </button>
          )}

          <div className="text-stats">
            <div className="text-stats-container">
              <p></p>
              <p></p>
            </div>
            <div className="text-stats-container">
              <p></p>
              <p></p>
            </div>
            <div className="text-stats-container">
              <p></p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;

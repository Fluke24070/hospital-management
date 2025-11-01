import React, { useEffect, useState } from "react";
import Doctor from "../Assets/pho01.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

    const handleBookAdminClick = () => {
    navigate("/admins");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ สุขภาพมาก่อน</p>
          <h2 className="text-title">
            ค้นหาแพทย์ของคุณ และ นัดหมาย
          </h2>
          <p className="text-descritpion">
            พูดคุยกับแพทย์ออนไลน์และรับคำแนะนำทางการแพทย์
            การต่ออายุยา 
            บริการดูแลสุขภาพตามความต้องการ อยู่แค่ปลายนิ้วของคุณ
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> นัดหมาย
          </button>

          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAdminClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> admin
          </button>


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
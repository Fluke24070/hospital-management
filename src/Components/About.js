import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>เกี่ยวกับเรา</span>
        </h3>
        <p className="about-description">
         ยินดีต้อนรับสู่ Health Plus พันธมิตรที่คุณไว้วางใจได้ในการดูแลสุขภาพที่เข้าถึงง่ายและออกแบบเฉพาะสำหรับคุณ 
         แพทย์ผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาออนไลน์และบริการเฉพาะทาง โดยให้ความสำคัญกับสุขภาพและความเป็นอยู่ที่ดีของคุณ 
         มาร่วมเดินทางไปสู่ชีวิตที่มีสุขภาพดีไปด้วยกัน
        </p>

        <h4 className="about-text-title">ปัญหาของคุณ</h4>

        <SolutionStep
          title="เลือกแพทย์ของคุณ"
          description="ค้นหาผู้เชี่ยวชาญที่เหมาะสมกับคุณ และจองนัดได้อย่างง่ายดายกับ Health Plus
                        แพทย์ผู้เชี่ยวชาญของเราพร้อมดูแลสุขภาพของคุณอย่างใส่ใจ ด้วยการให้บริการที่ปรับให้เหมาะกับความต้องการเฉพาะของคุณ."
        />

        <SolutionStep
          title="ระบุวันที่"
          description="เลือกวันและเวลาที่สะดวกที่สุดสำหรับคุณ แล้วปล่อยให้ทีมแพทย์ผู้เชี่ยวชาญของเราดูแลสุขภาพของคุณด้วยการบริการที่ใส่ใจและปรับให้เหมาะกับความต้องการเฉพาะของคุณ"
        />

        <SolutionStep
          title="โรคที่เจอ"
          description="แพทย์และผู้เชี่ยวชาญมากประสบการณ์ของเราพร้อมให้คำแนะนำจากผู้เชี่ยวชาญและวางแผนการรักษาเฉพาะบุคคล เพื่อช่วยให้คุณบรรลุสุขภาพที่ดีที่สุดเท่าที่จะเป็นไปได้."
        />
      </div>
    </div>
  );
}

export default About;
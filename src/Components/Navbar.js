import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();


  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]); 

  
  let middleMenu;
  if (!currentUser) {
   
    middleMenu = (
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">โฮม</Link>
        </li>
        <li>
          <a href="#services" className="navbar-link">บริการ</a>
        </li>
        <li>
          <a href="#about" className="navbar-link">เกี่ยวกับเรา</a>
        </li>
        <li>
          <a href="#reviews" className="navbar-link">รีวิว</a>
        </li>
        <li>
          <a href="#doctors" className="navbar-link">แพทย์</a>
        </li>
      </ul>
    );
  } else if (currentUser.role === "doctor") {
    
    middleMenu = (
      <ul className="navbar-menu">
        <li>
          <button className="navbar-link navbar-btnlike">ข้อมูลคนไข้</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">บริการทางการแพทย์</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">บริการทางการแพทย์</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">บริการทางการแพทย์</button>
        </li>
      </ul>
    );
  } else {
    
    middleMenu = (
      <ul className="navbar-menu">
        <li>
          <button className="navbar-link navbar-btnlike">ข้อมูลผู้ป่วย</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">การนัดหมาย</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">ประวัติการรักษา</button>
        </li>
        <li>
          <button className="navbar-link navbar-btnlike">การเงิน</button>
        </li>
      </ul>
    );
  }

  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  let rightSide;
  if (!currentUser) {
    rightSide = (
      <Link to="/login" className="login-button-outline">
        <span className="login-icon">💬</span>
        <span>เข้าสู่ระบบ</span>
      </Link>
    );
  } else {
    rightSide = (
      <div className="navbar-loggedin">
        <span className="user-label">
          {currentUser.role === "doctor" ? "👨‍⚕️" : "🧑‍⚕️"}{" "}
          {currentUser.firstName || ""} {currentUser.lastName || ""}
        </span>
        <button className="logout-button-outline" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>
    );
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        {}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Clinic <span className="logo-plus">+</span>
          </Link>
        </div>

        {}
        <nav className="navbar-center">{middleMenu}</nav>

        {}
        <div className="navbar-right">{rightSide}</div>
      </div>
    </header>
  );
}

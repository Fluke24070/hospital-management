import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [identityID, setIdentityID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        identityID,
        password,
      });

      if (res.data.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));

        alert("เข้าสู่ระบบสำเร็จ");
        navigate("/", { replace: true });
      } else {
        setMessage(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">เข้าสู่ระบบ</h1>

        {message && <div className="login-alert">{message}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">เลขบัตรประชาชน</label>
          <input
            className="login-input"
            type="text"
            value={identityID}
            onChange={(e) =>
              setIdentityID(e.target.value.replace(/\D/g, "").slice(0, 13))
            }
            placeholder="กรอกเลขบัตร 13 หลัก"
            required
          />

          <label className="login-label">รหัสผ่าน</label>
          <div className="login-password-wrap">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              required
            />
            <button
              type="button"
              className="login-toggle-btn"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              แสดง
            </button>
          </div>

          <button type="submit" className="login-btn">
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="login-footer">
          <span>
            ไม่มีสมาชิก?{" "}
            <Link to="/register" className="login-link">
              สมัครสมาชิก
            </Link>
          </span>
          <Link to="/reset" className="login-link right">
            ลืมรหัสผ่าน
          </Link>
        </div>
      </div>
    </div>
  );
}

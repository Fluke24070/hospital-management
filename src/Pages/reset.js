import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/reset.css"; 

const LS_KEY = "hms_users";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}

export default function Reset() {
  const navigate = useNavigate();
  const [citizenId, setCitizenId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateCitizenId = (id) => /^\d{13}$/.test(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    if (!validateCitizenId(citizenId)) {
      setError("กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง");
      return;
    }

   
    if (password.length < 6) {
      setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (password !== confirm) {
      setError("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }


    const users = getUsers();
    const idx = users.findIndex((u) => u.citizenId === citizenId);

    if (idx === -1) {
      setError("ไม่พบเลขบัตรนี้ในระบบ โปรดสมัครสมาชิกก่อน");
      return;
    }

    users[idx] = { ...users[idx], password };
    saveUsers(users);

    setSuccess("รีเซ็ตรหัสผ่านสำเร็จ! กำลังนำทางไปหน้าเข้าสู่ระบบ...");
    setTimeout(() => navigate("/login", { replace: true }), 1500);
  };

  return (
    <div className="reset-page">
      <form onSubmit={handleSubmit} className="reset-card">
        <h1 className="reset-title">รีเซ็ตรหัสผ่าน</h1>

        {error && <div className="reset-alert error">{error}</div>}
        {success && <div className="reset-alert success">{success}</div>}

        {}
        <label className="reset-label">เลขบัตรประชาชน</label>
        <input
          className="reset-input"
          type="text"
          inputMode="numeric"
          placeholder="กรอกเลขบัตร 13 หลัก"
          value={citizenId}
          onChange={(e) =>
            setCitizenId(e.target.value.replace(/\D/g, "").slice(0, 13))
          }
          maxLength={13}
          required
        />

        {}
        <label className="reset-label">รหัสผ่านใหม่</label>
        <div className="reset-password-wrap">
          <input
            className="reset-input"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="reset-toggle"
            onMouseDown={() => setShowPwd(true)}
            onMouseUp={() => setShowPwd(false)}
            onMouseLeave={() => setShowPwd(false)}
          >
            แสดง
          </button>
        </div>

        {}
        <label className="reset-label">ยืนยันรหัสผ่านใหม่</label>
        <div className="reset-password-wrap">
          <input
            className="reset-input"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="button"
            className="reset-toggle"
            onMouseDown={() => setShowConfirm(true)}
            onMouseUp={() => setShowConfirm(false)}
            onMouseLeave={() => setShowConfirm(false)}
          >
            แสดง
          </button>
        </div>

        {}
        <button type="submit" className="reset-btn reset-btn-primary">
          รีเซ็ตรหัสผ่าน
        </button>

        {}
        <div className="reset-links">
          <span className="reset-muted">ยังไม่มีบัญชี?</span>{" "}
          <Link to="/register" className="reset-link">
            สมัครสมาชิก
          </Link>
        </div>
      </form>
    </div>
  );
}

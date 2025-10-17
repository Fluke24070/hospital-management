import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/register.css";

const LS_KEY = "hms_users";

function getUsers() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    email: "",        // ✅ เพิ่มกลับมา
    dob: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirm: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const prefill = location.state?.prefillCitizenId;
    if (prefill) {
      setForm(f => ({ ...f, citizenId: String(prefill).replace(/\D/g, "").slice(0, 13) }));
    }
  }, [location.state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "citizenId" ? value.replace(/\D/g, "") :
        name === "phone" ? value.replace(/\D/g, "") :
        value
    }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName) return "กรุณากรอกชื่อและนามสกุล";
    if (!/^\d{13}$/.test(form.citizenId)) return "เลขบัตรประชาชนต้องมี 13 หลัก";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "อีเมลไม่ถูกต้อง";
    if (!form.dob) return "กรุณาเลือกวันเดือนปีเกิด";
    if (!form.phone || form.phone.length < 9 || form.phone.length > 10)
      return "กรุณากรอกเบอร์ติดต่อ 9–10 หลัก";
    if (!form.gender) return "กรุณาเลือกเพศ";
    if (!form.address || form.address.trim().length < 5)
      return "กรุณากรอกที่อยู่ให้ครบถ้วน";
    if (form.password.length < 6) return "รหัสผ่านอย่างน้อย 6 ตัวอักษร";
    if (form.password !== form.confirm) return "รหัสผ่านยืนยันไม่ตรงกัน";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) { setError(msg); return; }

    const users = getUsers();
    const exists = users.some(u => u.citizenId === form.citizenId);
    if (exists) {
      setError("มีบัญชีด้วยเลขบัตรนี้อยู่แล้ว กรุณาเข้าสู่ระบบ");
      return;
    }

    users.push({
      firstName: form.firstName,
      lastName: form.lastName,
      citizenId: form.citizenId,
      email: form.email,         // ✅ บันทึกอีเมล
      dob: form.dob,
      phone: form.phone,
      gender: form.gender,
      address: form.address,
      password: form.password,   // (เดโมเท่านั้น)
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);

    alert("สมัครสมาชิกสำเร็จ");
    navigate("/login", { replace: true });
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-card">
        <h1 className="register-title">สมัครสมาชิก</h1>
        {error && <div className="register-error">{error}</div>}

        {/* ชื่อ */}
        <label className="register-label">ชื่อ</label>
        <input
          className="register-input"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
        />

        {/* นามสกุล */}
        <label className="register-label">นามสกุล</label>
        <input
          className="register-input"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
        />

        {/* เลขบัตรประชาชน */}
        <label className="register-label">เลขบัตรประชาชน</label>
        <input
          className="register-input"
          name="citizenId"
          inputMode="numeric"
          maxLength={13}
          placeholder="กรอกเลขบัตร 13 หลัก"
          value={form.citizenId}
          onChange={onChange}
        />

        {/* ✅ อีเมล (เพิ่มกลับมา) */}
        <label className="register-label">อีเมล</label>
        <input
          className="register-input"
          name="email"
          type="email"
          placeholder="example@mail.com"
          value={form.email}
          onChange={onChange}
        />

        {/* วันเกิด */}
        <label className="register-label">วันเดือนปีเกิด</label>
        <input
          className="register-input"
          type="date"
          name="dob"
          value={form.dob}
          onChange={onChange}
        />

        {/* เบอร์โทร */}
        <label className="register-label">เบอร์ติดต่อ</label>
        <input
          className="register-input"
          name="phone"
          inputMode="tel"
          maxLength={10}
          value={form.phone}
          onChange={onChange}
        />

        {/* เพศ */}
        <label className="register-label">เพศ</label>
        <select
          className="register-select"
          name="gender"
          value={form.gender}
          onChange={onChange}
        >
          <option value="">-- เลือกเพศ --</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="other">อื่นๆ</option>
        </select>

        {/* ที่อยู่ */}
        <label className="register-label">ที่อยู่</label>
        <textarea
          className="register-textarea"
          name="address"
          rows={3}
          placeholder="บ้านเลขที่ / ถนน / แขวง-ตำบล / อำเภอ / จังหวัด"
          value={form.address}
          onChange={onChange}
        />

        {/* รหัสผ่าน */}
        <label className="register-label">รหัสผ่าน</label>
        <div className="register-password-wrap">
          <input
            className="register-input"
            name="password"
            type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={onChange}
          />
          <button
            type="button"
            onMouseDown={() => setShowPwd(true)}
            onMouseUp={() => setShowPwd(false)}
            onMouseLeave={() => setShowPwd(false)}
            className="register-toggle-btn"
          >
            แสดง
          </button>
        </div>

        {/* ยืนยันรหัสผ่าน */}
        <label className="register-label">ยืนยันรหัสผ่าน</label>
        <div className="register-password-wrap">
          <input
            className="register-input"
            name="confirm"
            type={showConfirm ? "text" : "password"}
            value={form.confirm}
            onChange={onChange}
          />
          <button
            type="button"
            onMouseDown={() => setShowConfirm(true)}
            onMouseUp={() => setShowConfirm(false)}
            onMouseLeave={() => setShowConfirm(false)}
            className="register-toggle-btn"
          >
            แสดง
          </button>
        </div>

        <button type="submit" className="register-btn register-btn-success">
          สมัครสมาชิก
        </button>

        <div className="register-login-hint">
          มีบัญชีแล้ว? <Link to="/login" className="register-link">เข้าสู่ระบบ</Link>
        </div>
      </form>
    </div>
  );
}

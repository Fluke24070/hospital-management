import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/register.css";
import axios from "axios";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "patient",
    firstName: "",
    lastName: "",
    citizenId: "",
    email: "",
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
      setForm((f) => ({
        ...f,
        citizenId: String(prefill).replace(/\D/g, "").slice(0, 13),
      }));
    }
  }, [location.state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "citizenId" || name === "phone"
          ? value.replace(/\D/g, "")
          : value,
    }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName)
      return "กรุณากรอกชื่อและนามสกุล";
    if (!/^\d{13}$/.test(form.citizenId))
      return "เลขบัตรประชาชนต้องมี 13 หลัก";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "อีเมลไม่ถูกต้อง";
    if (!form.dob) return "กรุณาเลือกวันเดือนปีเกิด";
    if (!form.phone || form.phone.length < 9 || form.phone.length > 10)
      return "กรุณากรอกเบอร์ติดต่อ 9–10 หลัก";
    if (!form.gender) return "กรุณาเลือกเพศ";
    if (!form.address || form.address.trim().length < 5)
      return "กรุณากรอกที่อยู่ให้ครบถ้วน";
    if (form.password.length < 6)
      return "รหัสผ่านอย่างน้อย 6 ตัวอักษร";
    if (form.password !== form.confirm)
      return "รหัสผ่านยืนยันไม่ตรงกัน";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    try {
      const res = await axios.post("http://localhost:5000/register", {
        status: form.role,
        name: form.firstName,
        lastname: form.lastName,
        identityID: form.citizenId,
        email: form.email,
        day: form.dob,
        phonenum: form.phone,
        sex: form.gender,
        address: form.address,
        password: form.password,
      });

      if (res.data.status === 200) {
        alert("สมัครสมาชิกสำเร็จ");
        navigate("/login", { replace: true });
      } else {
        setError("ไม่สามารถสมัครสมาชิกได้");
      }
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดระหว่างสมัครสมาชิก");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-card">
        <h1 className="register-title">สมัครสมาชิก</h1>
        {error && <div className="register-error">{error}</div>}

        <label className="register-label">สถานะ</label>
        <select
          className="register-select"
          name="role"
          value={form.role}
          onChange={onChange}
        >
          <option value="patient">ผู้ป่วย</option>
          <option value="doctor">แพทย์</option>
        </select>

        <label className="register-label">ชื่อ</label>
        <input className="register-input" name="firstName" value={form.firstName} onChange={onChange} />

        <label className="register-label">นามสกุล</label>
        <input className="register-input" name="lastName" value={form.lastName} onChange={onChange} />

        <label className="register-label">เลขบัตรประชาชน</label>
        <input
          className="register-input"
          name="citizenId"
          inputMode="numeric"
          maxLength={13}
          value={form.citizenId}
          onChange={onChange}
        />

        <label className="register-label">อีเมล</label>
        <input
          className="register-input"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
        />

        <label className="register-label">วันเดือนปีเกิด</label>
        <input className="register-input" type="date" name="dob" value={form.dob} onChange={onChange} />

        <label className="register-label">เบอร์ติดต่อ</label>
        <input className="register-input" name="phone" inputMode="tel" maxLength={10} value={form.phone} onChange={onChange} />

        <label className="register-label">เพศ</label>
        <select className="register-select" name="gender" value={form.gender} onChange={onChange}>
          <option value="">-- เลือกเพศ --</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="other">อื่นๆ</option>
        </select>

        <label className="register-label">ที่อยู่</label>
        <textarea className="register-textarea" name="address" rows={3} value={form.address} onChange={onChange} />

        <label className="register-label">รหัสผ่าน</label>
        <input className="register-input" name="password" type="password" value={form.password} onChange={onChange} />

        <label className="register-label">ยืนยันรหัสผ่าน</label>
        <input className="register-input" name="confirm" type="password" value={form.confirm} onChange={onChange} />

        <button type="submit" className="register-btn register-btn-success">
          สมัครสมาชิก
        </button>

        <div className="register-login-hint">
          มีบัญชีแล้ว?{" "}
          <Link to="/login" className="register-link">
            เข้าสู่ระบบ
          </Link>
        </div>
      </form>
    </div>
  );
}

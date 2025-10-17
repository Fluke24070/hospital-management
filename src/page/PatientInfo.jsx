import React, { useEffect, useState } from "react";
import "../style/dashboard.css";

const USERS_KEY = "hms_users";
const CURRENT_KEY = "currentUser";

const read = (k, f) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? f; }
  catch { return f; }
};

export default function PatientInfo() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const current = read(CURRENT_KEY, null);
    const users = read(USERS_KEY, []);
    const u = users.find(x => x.citizenId === current?.citizenId) || null;

    if (u) {
      setData({
        fullName: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        citizenId: u.citizenId || "",
        dob: u.dob || "",
        phone: u.phone || "",
        gender: u.gender || "",
        address: u.address || "",
        email: u.email || "",
      });
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const displayGender = (g) => {
    if (g === "male") return "ชาย";
    if (g === "female") return "หญิง";
    if (g === "other") return "อื่นๆ";
    return "-";
  };

  return (
    <div className="pt-page">
      <div className="pt-card">
        <h1 className="pt-title">ประวัติผู้ป่วย</h1>

        {!data ? (
          <div className="pt-alert">ไม่พบข้อมูลผู้ใช้ในระบบ</div>
        ) : (
          <form className="pt-form" onSubmit={(e) => e.preventDefault()}>
            <div className="pt-row">
              <div className="pt-label">ชื่อ - สกุล</div>
              <div className="pt-inputCell">
                <input className="pt-input readonly" value={data.fullName} readOnly />
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">เลขบัตรประชาชน</div>
              <div className="pt-inputCell">
                <input className="pt-input readonly" value={data.citizenId} readOnly />
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">วันเกิด</div>
              <div className="pt-inputCell">
                <input className="pt-input readonly" type="date" value={data.dob} readOnly />
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">เบอร์ติดต่อ</div>
              <div className="pt-inputCell">
                <input className="pt-input readonly" value={data.phone} readOnly />
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">เพศ</div>
              <div className="pt-inputCell">
                <div className="pt-text-display">{displayGender(data.gender)}</div>
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">อีเมล</div>
              <div className="pt-inputCell">
                <input className="pt-input readonly" type="email" value={data.email} readOnly />
              </div>
            </div>

            <div className="pt-row">
              <div className="pt-label">ที่อยู่</div>
              <div className="pt-inputCell">
                <textarea
                  className="pt-textarea readonly"
                  rows={3}
                  value={data.address}
                  readOnly
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

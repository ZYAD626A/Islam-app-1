import { Bell, Search } from "lucide-react";
import { formatArabicDate } from "../../utils/formatDate";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "مساحة يومك", "/quran": "القرآن الكريم", "/adhkar": "الأذكار اليومية",
  "/prayer": "مواقيت الصلاة", "/tasks": "مهامي اليومية", "/stats": "إحصائياتي", "/settings": "الإعدادات"
};

export default function Topbar() {
  const { pathname } = useLocation();
  return (
    <header className="topbar">
      <div><div className="eyebrow">{formatArabicDate()}</div><h1>{titles[pathname] || "رفيق المسلم"}</h1></div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="بحث" onClick={() => document.querySelector("#global-search")?.focus()}><Search size={19} /></button>
        <button className="icon-button notification-button" aria-label="الإشعارات"><Bell size={19} /><i /></button>
        <div className="user-avatar">ز</div>
      </div>
    </header>
  );
}
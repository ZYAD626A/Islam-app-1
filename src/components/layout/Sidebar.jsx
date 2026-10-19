import { NavLink } from "react-router-dom";
import { BookOpen, CalendarCheck, ChartNoAxesColumn, CircleHelp, Compass, House, MoonStar, Settings, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "الرئيسية", icon: House, end: true },
  { to: "/quran", label: "القرآن الكريم", icon: BookOpen },
  { to: "/adhkar", label: "الأذكار", icon: Sparkles },
  { to: "/prayer", label: "مواقيت الصلاة", icon: Compass },
  { to: "/tasks", label: "مهامي اليومية", icon: CalendarCheck },
  { to: "/stats", label: "إحصائياتي", icon: ChartNoAxesColumn },
  { to: "/settings", label: "الإعدادات", icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-mark"><MoonStar size={22} /></span>
        <span><strong>رفيق المسلم</strong><small>خطوة أقرب للطمأنينة</small></span>
      </NavLink>
      <div className="nav-caption">مساحتك اليومية</div>
      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-quote">
        <span className="quote-icon"><Sparkles size={17} /></span>
        <p>«ألا بذكر الله تطمئن القلوب»</p>
        <small>سورة الرعد · ٢٨</small>
      </div>
      <div className="sidebar-footer"><CircleHelp size={16} /> <span>رفيقك في يومك</span></div>
    </aside>
  );
}
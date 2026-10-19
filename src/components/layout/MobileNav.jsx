import { NavLink } from "react-router-dom";
import { BookOpen, House, Sparkles, Compass, ListTodo } from "lucide-react";

const items = [
  { to: "/", label: "الرئيسية", icon: House, end: true },
  { to: "/quran", label: "القرآن", icon: BookOpen },
  { to: "/adhkar", label: "الأذكار", icon: Sparkles },
  { to: "/prayer", label: "الصلاة", icon: Compass },
  { to: "/tasks", label: "المهام", icon: ListTodo }
];

export default function MobileNav() {
  return <nav className="mobile-nav">{items.map(({ to, label, icon: Icon, end }) =>
    <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? "mobile-link active" : "mobile-link"}>
      <Icon size={20} /><span>{label}</span>
    </NavLink>
  )}</nav>;
}
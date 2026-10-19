import { Moon, Sun, RotateCcw, ShieldCheck, Info } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import { useAppContext } from "../context/AppContext";
import usePageTitle from "../hooks/usePageTitle";

export default function SettingsPage() {
  usePageTitle("الإعدادات");
  const { theme, toggleTheme, resetProgress } = useAppContext();
  function confirmReset() {
    if (window.confirm("هل تريد تصفير المهام والعدادات؟ لن يمكن التراجع عن هذا الإجراء.")) resetProgress();
  }
  return <>
    <PageHeading title="الإعدادات" description="خصص تجربتك بما يناسب يومك." />
    <section className="panel settings-section"><div className="settings-section-heading"><span className="section-icon"><Sun size={18} /></span><div><h3>المظهر</h3><p>اختر الشكل الذي يريح عينيك.</p></div></div><div className="setting-row"><div className="setting-description"><span className="setting-icon">{theme === "light" ? <Sun size={18} /> : <Moon size={18} />}</span><div><strong>الوضع الليلي</strong><small>تغيير ألوان واجهة التطبيق</small></div></div><button role="switch" aria-checked={theme === "dark"} className={`switch ${theme === "dark" ? "on" : ""}`} onClick={toggleTheme}><span /></button></div></section>
    <section className="panel settings-section"><div className="settings-section-heading"><span className="section-icon gold-bg"><ShieldCheck size={18} /></span><div><h3>الخصوصية والبيانات</h3><p>بيانات المهام والعدادات تحفظ محليًا في متصفحك.</p></div></div><div className="setting-row"><div className="setting-description"><span className="setting-icon"><Info size={18} /></span><div><strong>حفظ محلي</strong><small>لا يوجد حساب مستخدم أو مزامنة سحابية في هذه النسخة.</small></div></div><span className="status-pill">مفعّل</span></div><div className="setting-row"><div className="setting-description"><span className="setting-icon danger-icon"><RotateCcw size={18} /></span><div><strong>تصفير التقدم</strong><small>إلغاء إنجاز المهام وتصفير عدادات الأذكار.</small></div></div><button className="danger-button" onClick={confirmReset}>تصفير البيانات</button></div></section>
    <div className="settings-note"><Info size={17} /><p>رفيق المسلم مشروع تعليمي قابل للتطوير. مواقيت الصلاة والقرآن تأتي من واجهات خارجية، وقد تحتاج للتحقق من إعداداتها قبل الاعتماد عليها.</p></div>
  </>;
}
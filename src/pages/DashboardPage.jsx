import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, CheckCheck, Clock3, Compass, Flame, Sparkles, Sun, Target } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import StatCard from "../components/ui/StatCard";
import ProgressBar from "../components/ui/ProgressBar";
import { useAppContext } from "../context/AppContext";
import { getGreeting } from "../utils/formatDate";
import usePrayerTimes from "../hooks/usePrayerTimes";
import { prayerNames } from "../data/prayers";

export default function DashboardPage() {
  const { tasks, toggleTask, counters } = useAppContext();
  const { data: prayerData, loading, error } = usePrayerTimes();
  const completed = tasks.filter(task => task.completed).length;
  const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

  return <>
    <section className="welcome-banner">
      <div className="welcome-copy"><span className="banner-kicker"><Sparkles size={14} /> رفيقك في رحلة الطمأنينة</span>
        <h2>{getGreeting()}، زياد <span>🌿</span></h2>
        <p>اجعل يومك عامرًا بالذكر، وكل خطوة صغيرة تقرّبك مما تحب.</p>
        <Link to="/tasks" className="banner-button">ابدأ يومك <ArrowLeft size={16} /></Link>
      </div>
      <div className="banner-art" aria-hidden="true"><div className="sun-disc" /><div className="arch arch-back" /><div className="arch arch-front"><div className="arch-window" /></div><div className="tiny-star star-one">✦</div><div className="tiny-star star-two">✧</div></div>
    </section>

    <PageHeading title="نظرة على يومك" description="كل إنجاز، مهما كان صغيرًا، يستحق التقدير." />
    <section className="stats-grid">
      <StatCard icon={CheckCheck} label="إنجاز المهام" value={`${completed}/${tasks.length}`} helper="من مهام اليوم" tone="green" />
      <StatCard icon={Sparkles} label="أذكار اليوم" value={(counters.morning || 0) + (counters.evening || 0)} helper="تسبيحة مسجّلة" tone="gold" />
      <StatCard icon={Flame} label="الاستمرارية" value="—" helper="سنحسبها مع الاستخدام" tone="coral" />
      <StatCard icon={Target} label="إنجاز اليوم" value={`${percent}%`} helper="أنت تتقدم، استمر" tone="blue" />
    </section>

    <section className="dashboard-grid">
      <article className="panel tasks-panel">
        <div className="panel-heading"><div><span className="section-icon"><Check size={17} /></span><div><h3>مهام اليوم</h3><p>ابدأ بالأهم، ثم أكمل براحة</p></div></div><Link to="/tasks" className="text-link">كل المهام <ArrowLeft size={15} /></Link></div>
        <ProgressBar value={percent} label="تقدمك اليوم" />
        <div className="quick-task-list">
          {tasks.slice(0, 4).map(task => <button key={task.id} className={`quick-task ${task.completed ? "is-complete" : ""}`} onClick={() => toggleTask(task.id)}>
            <span className="task-check">{task.completed && <Check size={14} />}</span><span className="quick-task-title">{task.title}<small>{task.category}</small></span><span className="task-status">{task.completed ? "تمت" : "قيد الإنجاز"}</span>
          </button>)}
        </div>
      </article>

      <article className="panel prayer-panel">
        <div className="panel-heading"><div><span className="section-icon gold-bg"><Clock3 size={17} /></span><div><h3>مواقيت الصلاة</h3><p>القاهرة، مصر</p></div></div><Link to="/prayer" className="round-arrow" aria-label="تفاصيل الصلاة"><ArrowLeft size={16} /></Link></div>
        {loading ? <div className="loading-line">جارٍ تحميل المواقيت…</div> : error ? <div className="api-error">{error}<small>تحقق من اتصال الإنترنت.</small></div> : <div className="prayer-mini-list">
          {prayerNames.filter(p => p.key !== "Sunrise").map(prayer => <div className="prayer-mini-row" key={prayer.key}><span>{prayer.label}</span><strong>{prayerData?.timings?.[prayer.key] || "--:--"}</strong></div>)}
        </div>}
        <div className="prayer-panel-footer"><Sun size={16} /><span>تأكد من طريقة الحساب المعتمدة في منطقتك.</span></div>
      </article>
    </section>

    <section className="bottom-feature-grid">
      <Link to="/quran" className="feature-card quran-feature"><span className="feature-icon"><BookOpen size={23} /></span><div><strong>ورد القرآن</strong><p>افتح المصحف وتابع قراءتك</p></div><ArrowLeft size={18} /></Link>
      <Link to="/adhkar" className="feature-card adhkar-feature"><span className="feature-icon"><Sparkles size={23} /></span><div><strong>أذكار الصباح والمساء</strong><p>لحظات ذكر وسط انشغالك</p></div><ArrowLeft size={18} /></Link>
      <Link to="/prayer" className="feature-card qibla-feature"><span className="feature-icon"><Compass size={23} /></span><div><strong>القبلة</strong><p>اعرف اتجاه القبلة من موقعك</p></div><ArrowLeft size={18} /></Link>
    </section>
  </>;
}
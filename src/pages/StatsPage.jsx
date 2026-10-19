import { CalendarDays, CheckCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import StatCard from "../components/ui/StatCard";
import ProgressBar from "../components/ui/ProgressBar";
import { useAppContext } from "../context/AppContext";
import usePageTitle from "../hooks/usePageTitle";

export default function StatsPage() {
  usePageTitle("إحصائياتي");
  const { tasks, counters } = useAppContext();
  const completed = tasks.filter(task => task.completed).length;
  const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const week = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
  return <>
    <PageHeading title="إحصائياتك" description="راقب تقدمك بهدوء، فالاستمرارية أهم من الكمال." />
    <section className="stats-grid stats-grid-three"><StatCard icon={CheckCheck} label="المهام المكتملة" value={completed} helper="في القائمة الحالية" tone="green" /><StatCard icon={Target} label="معدل الإنجاز" value={`${percent}%`} helper="من المهام الموجودة" tone="blue" /><StatCard icon={Sparkles} label="الأذكار المسجلة" value={(counters.morning || 0) + (counters.evening || 0)} helper="على هذا الجهاز" tone="gold" /></section>
    <section className="panel weekly-panel"><div className="panel-heading"><div><span className="section-icon"><CalendarDays size={18} /></span><div><h3>نظرة أسبوعية</h3><p>تمثيل مبدئي — سيُربط بتاريخ الإنجاز لاحقًا</p></div></div><span className="weekly-badge"><TrendingUp size={14} /> أسبوعك</span></div>
      <div className="weekly-chart" aria-label="رسم توضيحي للأسبوع">{week.map((day, index) => <div className="chart-column" key={day}><span className="chart-bar" style={{ height: `${[25, 48, 34, 72, 45, 60, 30][index]}%` }} /><small>{day}</small></div>)}</div>
      <p className="api-note">الرسم الحالي تجريبي وليس مبنيًا على سجل يومي حقيقي. يمكنك توسيع Context لتخزين تاريخ كل إنجاز وبناء إحصائيات دقيقة.</p>
    </section>
    <section className="panel insights-panel"><span className="insight-icon"><Sparkles size={20} /></span><div><h3>خطوتك التالية</h3><p>اختر هدفًا واحدًا واقعيًا اليوم. عندما تُنهيه، ارجع وسجّل إنجازك.</p><ProgressBar value={percent} label="تقدم المهام الحالية" /></div></section>
  </>;
}
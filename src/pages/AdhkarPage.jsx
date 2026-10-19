import { useState } from "react";
import { RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import { adhkar } from "../data/adhkar";
import { useAppContext } from "../context/AppContext";
import usePageTitle from "../hooks/usePageTitle";

export default function AdhkarPage() {
  usePageTitle("الأذكار");
  const [period, setPeriod] = useState("morning");
  const { counters, incrementDhikr, resetDhikr } = useAppContext();
  const items = adhkar[period];
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const done = Math.min(counters[period] || 0, total);

  return <>
    <PageHeading title="الأذكار اليومية" description="طمأنينة صغيرة تصنع فرقًا كبيرًا في يومك." />
    <div className="period-tabs"><button className={period === "morning" ? "active" : ""} onClick={() => setPeriod("morning")}>أذكار الصباح <span>☀️</span></button><button className={period === "evening" ? "active" : ""} onClick={() => setPeriod("evening")}>أذكار المساء <span>🌙</span></button></div>
    <section className="adhkar-summary panel"><div className="adhkar-summary-icon"><Sparkles size={22} /></div><div><strong>{period === "morning" ? "ابدأ صباحك بذكر الله" : "اختم يومك بذكر الله"}</strong><p>تقدّمك محفوظ على هذا الجهاز.</p></div><div className="adhkar-summary-count"><strong>{done}</strong><span>تسبيحة مسجلة</span></div></section>
    <section className="adhkar-list">{items.map((item, index) => {
      const count = Math.max(0, Math.min(item.count, (counters[period] || 0) - items.slice(0, index).reduce((sum, x) => sum + x.count, 0)));
      const finished = count >= item.count;
      return <article className="panel dhikr-card" key={item.id}><div className="dhikr-card-top"><span className="dhikr-index">{String(index + 1).padStart(2, "0")}</span><span className="dhikr-source">{item.source}</span></div><p className="dhikr-text">{item.text}</p><div className="dhikr-card-bottom"><span className="repeat-label">التكرار: {item.count} {finished && <CheckCircle2 size={15} />}</span><button className={`dhikr-counter ${finished ? "finished" : ""}`} disabled={finished} onClick={() => incrementDhikr(period, total)}><span>{finished ? "اكتمل" : "اضغط للتسبيح"}</span><strong>{count} / {item.count}</strong></button></div></article>;
    })}</section>
    <button className="reset-button" onClick={() => resetDhikr(period)}><RotateCcw size={16} /> تصفير عدّاد {period === "morning" ? "الصباح" : "المساء"}</button>
    <p className="api-note">ملاحظة: هذه مجموعة أولية للواجهة وليست مكتبة أذكار شاملة؛ راجع النصوص ومصادرها الموثوقة قبل نشر التطبيق.</p>
  </>;
}
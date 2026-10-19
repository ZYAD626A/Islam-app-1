import { useState } from "react";
import { Compass, MapPin, RefreshCw, Clock3, Navigation } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import usePrayerTimes from "../hooks/usePrayerTimes";
import { prayerNames } from "../data/prayers";
import usePageTitle from "../hooks/usePageTitle";

export default function PrayerPage() {
  usePageTitle("مواقيت الصلاة");
  const [city, setCity] = useState("Cairo");
  const [country, setCountry] = useState("Egypt");
  const { data, loading, error } = usePrayerTimes(city, country);
  const [locationMessage, setLocationMessage] = useState("");

  function findQibla() {
    if (!navigator.geolocation) { setLocationMessage("متصفحك لا يدعم تحديد الموقع."); return; }
    setLocationMessage("جارٍ تحديد موقعك…");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const lat = coords.latitude * Math.PI / 180;
      const lng = coords.longitude * Math.PI / 180;
      const kaabaLat = 21.4225 * Math.PI / 180;
      const kaabaLng = 39.8262 * Math.PI / 180;
      const deltaLng = kaabaLng - lng;
      const y = Math.sin(deltaLng);
      const x = Math.cos(lat) * Math.tan(kaabaLat) - Math.sin(lat) * Math.cos(deltaLng);
      const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
      setLocationMessage(`اتجاه القبلة التقريبي: ${Math.round(bearing)}° من الشمال. استخدم بوصلة موثوقة وتأكد من معايرة جهازك.`);
    }, () => setLocationMessage("لم نتمكن من تحديد موقعك. اسمح للموقع باستخدام الموقع أو تحقق من إعدادات المتصفح."), { enableHighAccuracy: true, timeout: 10000 });
  }

  return <>
    <PageHeading title="مواقيت الصلاة" description="تعرّف على أوقات الصلاة واتجاه القبلة." />
    <section className="panel city-selector"><div className="city-selector-label"><MapPin size={19} /><div><strong>موقع المواقيت</strong><small>يمكنك تغيير المدينة والدولة</small></div></div><div className="city-fields"><input aria-label="المدينة" value={city} onChange={e => setCity(e.target.value)} placeholder="المدينة" /><input aria-label="الدولة" value={country} onChange={e => setCountry(e.target.value)} placeholder="الدولة" /></div></section>
    <section className="panel prayer-times-panel"><div className="panel-heading"><div><span className="section-icon"><Clock3 size={18} /></span><div><h3>جدول الصلاة</h3><p>{data?.date?.readable || "مواقيت اليوم"}</p></div></div><span className="api-live"><i /> بيانات API</span></div>
      {loading ? <div className="loading-line">جارٍ تحميل المواقيت…</div> : error ? <div className="api-error">{error}<button className="secondary-button" onClick={() => window.location.reload()}><RefreshCw size={15} /> إعادة المحاولة</button></div> : <div className="prayer-times-grid">{prayerNames.map((prayer, index) => <article key={prayer.key} className={`prayer-time-card ${prayer.key === "Fajr" ? "highlight" : ""}`}><span className="prayer-time-symbol">{["☾", "☀", "◉", "◌", "☼", "☾"][index]}</span><span>{prayer.label}</span><strong>{data?.timings?.[prayer.key] || "--:--"}</strong><small>{prayer.key === "Sunrise" ? "شروق الشمس" : "موعد الصلاة"}</small></article>)}</div>}
      <p className="api-note">المواقيت من AlAdhan API وقد تختلف حسب طريقة الحساب والإعدادات المحلية. راجع جهة موثوقة في منطقتك.</p>
    </section>
    <section className="panel qibla-panel"><div className="qibla-illustration"><div className="compass-ring"><span>N</span><div className="compass-needle" /><div className="compass-center"><Compass size={26} /></div></div></div><div className="qibla-copy"><span className="eyebrow">دليل الاتجاه</span><h3>أين اتجاه القبلة؟</h3><p>اسمح باستخدام موقعك لحساب اتجاه تقريبي نحو الكعبة المشرفة. لا نرسل إحداثياتك إلى خادم التطبيق.</p><button className="primary-button" onClick={findQibla}><Navigation size={17} /> تحديد اتجاه القبلة</button>{locationMessage && <div className="location-result" role="status">{locationMessage}</div>}</div></section>
  </>;
}
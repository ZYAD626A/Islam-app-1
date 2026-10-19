import { useMemo, useState } from "react";
import { BookOpen, Search, ArrowUpLeft, LoaderCircle } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import EmptyState from "../components/ui/EmptyState";
import useQuran from "../hooks/useQuran";
import usePageTitle from "../hooks/usePageTitle";

export default function QuranPage() {
  usePageTitle("القرآن الكريم");
  const { surahs, loading, error } = useQuran();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [surahLoading, setSurahLoading] = useState(false);
  const [surahError, setSurahError] = useState("");

  const filteredSurahs = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return surahs;
    return surahs.filter(s => s.name.includes(query) || s.englishName.toLowerCase().includes(clean) || String(s.number) === clean);
  }, [surahs, query]);

  async function openSurah(surah) {
    setSelected(surah); setSurahLoading(true); setSurahError(""); setAyahs([]);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
      if (!response.ok) throw new Error("تعذّر تحميل آيات السورة.");
      const result = await response.json();
      setAyahs(result.data?.ayahs || []);
    } catch (err) {
      setSurahError(err.message || "حدث خطأ.");
    } finally { setSurahLoading(false); }
  }

  return <>
    <PageHeading title="القرآن الكريم" description="اقرأ بتدبّر، ولو بضع آيات كل يوم." />
    <section className="quran-toolbar">
      <label className="search-field"><Search size={18} /><input id="global-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث باسم السورة أو رقمها..." /></label>
      <div className="quran-count"><BookOpen size={17} /> {surahs.length} سورة</div>
    </section>
    {selected ? <section className="panel surah-reader">
      <div className="reader-toolbar"><button className="secondary-button" onClick={() => setSelected(null)}>← العودة للسور</button><span>{selected.revelationType === "Meccan" ? "مكية" : "مدنية"} · {selected.numberOfAyahs} آية</span></div>
      <div className="surah-title"><span>﷽</span><h2>{selected.name}</h2><small>{selected.englishName}</small></div>
      {surahLoading ? <div className="loading-line"><LoaderCircle className="spin" size={18} /> جارٍ تحميل الآيات…</div> : surahError ? <div className="api-error">{surahError}</div> : <div className="ayah-list">{ayahs.map(ayah => <p key={ayah.number} className="ayah-text">{ayah.text} <span className="ayah-number">{ayah.numberInSurah}</span></p>)}</div>}
      <p className="api-note">المحتوى محمّل من AlQuran Cloud API. راجع النص مع مصحف موثوق عند الحاجة.</p>
    </section> : loading ? <div className="panel loading-line"><LoaderCircle className="spin" /> جارٍ تحميل قائمة السور…</div> : error ? <div className="panel api-error">{error}</div> : filteredSurahs.length ? <section className="surah-grid">{filteredSurahs.map(surah => <button className="surah-card" key={surah.number} onClick={() => openSurah(surah)}>
      <span className="surah-number">{surah.number}</span><span className="surah-name"><strong>{surah.name}</strong><small>{surah.englishName}</small></span><span className="surah-meta">{surah.numberOfAyahs} آية<small>{surah.revelationType === "Meccan" ? "مكية" : "مدنية"}</small></span><ArrowUpLeft size={16} className="surah-arrow" />
    </button>)}</section> : <EmptyState title="لم نجد هذه السورة" description="جرّب البحث باسم السورة بالعربية أو الإنجليزية." />}
  </>;
}
import { useEffect, useState } from "react";

const QURAN_API = "https://api.alquran.cloud/v1";

/** Load the surah index once per mounted hook. */
export default function useQuran() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${QURAN_API}/surah`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("تعذّر تحميل قائمة السور.");
        return response.json();
      })
      .then(result => setSurahs(result.data || []))
      .catch(err => {
        if (err.name !== "AbortError") setError(err.message || "حدث خطأ أثناء تحميل القرآن.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { surahs, loading, error };
}
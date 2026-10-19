import { useEffect, useState } from "react";

const API_URL = "https://api.aladhan.com/v1/timingsByCity";

/** Fetch prayer timings from AlAdhan; city/country can be changed by the caller. */
export default function usePrayerTimes(city = "Cairo", country = "Egypt") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchTimings() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ city, country, method: "5" });
        const response = await fetch(`${API_URL}?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("تعذّر تحميل مواقيت الصلاة.");
        const result = await response.json();
        if (result.code !== 200) throw new Error("لم تصل بيانات مواقيت الصلاة.");
        setData(result.data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "حدث خطأ أثناء الاتصال.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchTimings();
    return () => controller.abort();
  }, [city, country]);

  return { data, loading, error };
}
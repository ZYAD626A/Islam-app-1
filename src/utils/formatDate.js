export function formatArabicDate(date = new Date()) {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(date);
}

export function getGreeting(hour = new Date().getHours()) {
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "طاب يومك";
  return "مساء الخير";
}
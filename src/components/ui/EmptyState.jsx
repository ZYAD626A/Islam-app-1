import { Sprout } from "lucide-react";
export default function EmptyState({ title = "لا توجد بيانات بعد", description = "ابدأ بخطوة بسيطة وستظهر إنجازاتك هنا." }) {
  return <div className="empty-state"><Sprout size={28} /><strong>{title}</strong><p>{description}</p></div>;
}
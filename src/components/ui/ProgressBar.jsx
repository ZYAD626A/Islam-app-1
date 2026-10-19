export default function ProgressBar({ value = 0, label, showValue = true }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return <div className="progress-wrap">{label && <div className="progress-label"><span>{label}</span>{showValue && <strong>{safeValue}%</strong>}</div>}<div className="progress-track"><span style={{ width: `${safeValue}%` }} /></div></div>;
}
import { useState } from "react";
import { Plus, Check, Trash2, ListTodo, CircleCheck } from "lucide-react";
import PageHeading from "../components/ui/PageHeading";
import ProgressBar from "../components/ui/ProgressBar";
import { useAppContext } from "../context/AppContext";
import usePageTitle from "../hooks/usePageTitle";

export default function TasksPage() {
  usePageTitle("مهامي اليومية");
  const { tasks, addTask, toggleTask, deleteTask } = useAppContext();
  const [title, setTitle] = useState("");
  const completed = tasks.filter(task => task.completed).length;
  function handleSubmit(event) {
    event.preventDefault();
    addTask(title);
    setTitle("");
  }

  return <>
    <PageHeading title="مهامي اليومية" description="ابنِ يومك من خطوات صغيرة وثابتة." />
    <section className="panel tasks-overview"><div className="tasks-overview-top"><div className="overview-icon"><ListTodo size={22} /></div><div><strong>إنجاز اليوم</strong><p>أحسنت، كل خطوة لها قيمة.</p></div><div className="overview-number"><strong>{completed}<small>/{tasks.length}</small></strong><span>مكتملة</span></div></div><ProgressBar value={tasks.length ? completed / tasks.length * 100 : 0} /></section>
    <form className="panel add-task-form" onSubmit={handleSubmit}><div><h3>أضف مهمة جديدة</h3><p>اكتب هدفًا صغيرًا يمكنك إنجازه اليوم.</p></div><div className="add-task-controls"><input value={title} onChange={e => setTitle(e.target.value)} placeholder="مثال: قراءة صفحتين من القرآن" maxLength={100} aria-label="اسم المهمة" /><button className="primary-button" type="submit" disabled={!title.trim()}><Plus size={17} /> إضافة</button></div></form>
    <div className="task-list-heading"><h3>قائمة اليوم</h3><span>{tasks.length} مهام</span></div>
    <section className="task-page-list">{tasks.map(task => <article key={task.id} className={`task-page-item panel ${task.completed ? "completed" : ""}`}><button className="task-toggle" onClick={() => toggleTask(task.id)} aria-label={task.completed ? "إلغاء إكمال المهمة" : "إكمال المهمة"}>{task.completed && <Check size={16} />}</button><div className="task-item-copy"><strong>{task.title}</strong><small>{task.category}</small></div><span className="task-item-status">{task.completed ? <><CircleCheck size={15} /> مكتملة</> : "لم تكتمل"}</span><button className="delete-task" onClick={() => deleteTask(task.id)} aria-label="حذف المهمة"><Trash2 size={17} /></button></article>)}</section>
  </>;
}
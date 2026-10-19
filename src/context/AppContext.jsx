import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const STORAGE_KEY = "rafiq-muslim-state";

const initialState = {
  theme: "light",
  tasks: [
    { id: "fajr", title: "صلاة الفجر", category: "عبادة", completed: false },
    { id: "quran", title: "قراءة ورد من القرآن", category: "قرآن", completed: false },
    { id: "adhkar", title: "أذكار الصباح", category: "أذكار", completed: false },
    { id: "kindness", title: "عمل خير ولو بسيط", category: "حياة", completed: false }
  ],
  counters: { morning: 0, evening: 0 },
  completedDays: []
};

function readInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(readInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable in private browsing; the app still works in memory.
    }
  }, [state]);

  const actions = useMemo(() => ({
    toggleTask(id) {
      setState(current => ({
        ...current,
        tasks: current.tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      }));
    },
    addTask(title) {
      const cleanTitle = title.trim();
      if (!cleanTitle) return;
      setState(current => ({
        ...current,
        tasks: [...current.tasks, {
          id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
          title: cleanTitle,
          category: "شخصي",
          completed: false
        }]
      }));
    },
    deleteTask(id) {
      setState(current => ({ ...current, tasks: current.tasks.filter(task => task.id !== id) }));
    },
    incrementDhikr(period, max = Infinity) {
      setState(current => ({
        ...current,
        counters: { ...current.counters, [period]: Math.min((current.counters[period] || 0) + 1, max) }
      }));
    },
    resetDhikr(period) {
      setState(current => ({ ...current, counters: { ...current.counters, [period]: 0 } }));
    },
    toggleTheme() {
      setState(current => ({ ...current, theme: current.theme === "light" ? "dark" : "light" }));
    },
    resetProgress() {
      setState(current => ({
        ...current,
        tasks: current.tasks.map(task => ({ ...task, completed: false })),
        counters: { morning: 0, evening: 0 }
      }));
    }
  }), []);

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
}
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import QuranPage from "./pages/QuranPage";
import AdhkarPage from "./pages/AdhkarPage";
import PrayerPage from "./pages/PrayerPage";
import TasksPage from "./pages/TasksPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/quran" element={<QuranPage />} />
        <Route path="/adhkar" element={<AdhkarPage />} />
        <Route path="/prayer" element={<PrayerPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
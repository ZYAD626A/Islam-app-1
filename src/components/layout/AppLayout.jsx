import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";
import { useAppContext } from "../../context/AppContext";

export default function AppLayout() {
  const { theme } = useAppContext();
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar />
      <main className="main-area">
        <Topbar />
        <div className="page-content"><Outlet /></div>
      </main>
      <MobileNav />
    </div>
  );
}
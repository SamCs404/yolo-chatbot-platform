import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f0f0f" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 32, overflow: "auto", color: "white" }}>
        <Outlet />
      </div>
    </div>
  );
}

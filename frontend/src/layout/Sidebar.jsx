import { motion } from "framer-motion";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        width: 260,
        background: "#FFD400",
        padding: 24,
        fontWeight: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <h1 style={{ fontSize: 32, letterSpacing: 2 }}>YOLO</h1>

      <button
        onClick={handleLogout}
        style={{
          background: "#000",
          color: "#FFD400",
          padding: "12px 16px",
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          fontWeight: 700
        }}
      >
        Logout
      </button>
    </motion.div>
  );
}

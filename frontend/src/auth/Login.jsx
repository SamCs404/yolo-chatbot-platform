import { useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { setToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    navigate("/app");
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#FFD400",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* Register link bottom-right */}
      <Link
        to="/register"
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          fontWeight: 700,
          color: "#000",
          textDecoration: "none"
        }}
      >
        New here? Register →
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "#000",
          padding: 48,
          borderRadius: 24,
          width: 420,
          color: "#FFD400",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: 56,
            letterSpacing: 6,
            marginBottom: 32
          }}
        >
          YOLO
        </h1>

        <input
          className="yolo-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="yolo-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 16,
            border: "none",
            background: "#FFD400",
            color: "#000",
            fontWeight: 800,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 12
          }}
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}

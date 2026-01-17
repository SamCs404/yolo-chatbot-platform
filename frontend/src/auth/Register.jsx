import { useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password
      });

      // After successful registration, redirect to login
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#FFD400",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: "#000",
          padding: 40,
          borderRadius: 18,
          width: 380,
          color: "#FFD400",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 28,
            marginBottom: 24,
            fontWeight: 700
          }}
        >
          Create Account
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <div style={{ color: "#ff6b6b", marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            border: "none",
            background: loading ? "#999" : "#FFD400",
            color: "#000",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 16
          }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <div style={{ textAlign: "center", fontSize: 14 }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#FFD400", textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "none",
  marginBottom: 14,
  fontSize: 15
};

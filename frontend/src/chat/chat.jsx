import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Chat() {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage }
    ]);

    try {
      const res = await api.post("/chat", {
        projectId: Number(projectId),
        message: userMessage
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <h2 style={{ marginBottom: 20 }}>
        Chat
      </h2>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: 12,
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              maxWidth: "70%",
              padding: "14px 18px",
              borderRadius: 18,
              fontSize: 15,
              lineHeight: 1.5,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background:
                m.role === "user" ? "#FFD400" : "#1a1a1a",
              color:
                m.role === "user" ? "#000" : "#fff"
            }}
          >
            {m.text}
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              alignSelf: "flex-start",
              background: "#1a1a1a",
              color: "#aaa",
              padding: "12px 16px",
              borderRadius: 16,
              fontSize: 14
            }}
          >
            YOLO is thinking…
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16
        }}
      >
        <input
          className="yolo-input"
          placeholder="Ask YOLO anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={{ flex: 1 }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "0 22px",
            borderRadius: 14,
            border: "none",
            background: loading ? "#999" : "#FFD400",
            color: "#000",
            fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  async function createProject() {
    const res = await api.post("/projects", { name, prompt });
    setProjects([res.data, ...projects]);
    setName("");
    setPrompt("");
  }

  return (
    <>
      <h2 style={{ marginBottom: 24 }}>Your Projects</h2>

      <input
        className="yolo-input"
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea
        className="yolo-input"
        placeholder="System prompt"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={3}
      />

      <button
        onClick={createProject}
        style={{
          padding: "12px 20px",
          borderRadius: 14,
          border: "none",
          background: "#FFD400",
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 32
        }}
      >
        Create Project
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/app/chat/${p.id}`)}
            style={{
              background: "#111",
              padding: 20,
              borderRadius: 18,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <h3 style={{ color: "#FFD400" }}>{p.name}</h3>
            <p style={{ color: "#aaa", fontSize: 13 }}>
              Click to chat →
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

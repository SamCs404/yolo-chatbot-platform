import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AppLayout from "./layout/AppLayout";
import Projects from "./projects/projects";
import Chat from "./chat/chat";
import { getToken } from "./utils/auth";

function Protected({ children }) {
  return getToken() ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          <Route index element={<Projects />} />
          <Route path="chat/:projectId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

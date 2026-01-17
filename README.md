# YOLO (Chose the name because just wanted to make things similar with Yellow AI.)

YOLO is a minimal chatbot platform where users can create AI agents with custom prompts and chat with them.

The focus of this project is simplicity, clean structure, and correctness rather than unnecessary complexity.

---

## What this project does

- Users can register and log in
- Each user can create multiple projects (agents)
- Every project has its own system prompt
- Users can chat with an AI based on the selected project
- The backend handles authentication, data storage, and LLM calls
- The frontend provides a clean, modern interface

---

## Tech overview

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: SQLite (via Prisma)
- Authentication: JWT
- LLM: OpenRouter (can be swapped with OpenAI)

---

## Project structure

yolo-chatbot-platform/
├── backend/
├── frontend/
└── README.md

---

## Running the project locally

### Backend

```bash
cd backend
npm install
```
Create a .env file in the backend folder:

env

PORT=4000
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key

Start the backend:

```bash

npx prisma generate
npx prisma db push
node src/server.js
```

The backend runs on:
http://localhost:4000

Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:
http://localhost:5173


## How to use it
- Open the frontend in the browser
- Register a new account
- Log in
- Create a project with a system prompt
- Select the project and start chatting

<<<<<<< Updated upstream
## Notes
- LLM calls are handled on the server, not in the browser.
- The codebase is structured so features can be extended easily.
- OpenRouter is used for development, but the design supports other LLM providers.


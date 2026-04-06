# FocusTracker v1 MVP

Task management app for people with ADHD.

## Stack
- Backend: FastAPI, SQLAlchemy, SQLite, JWT auth (python-jose, bcrypt)
- Frontend: React + TypeScript, shadcn/ui, Tailwind CSS, framer-motion

## Structure
- /backend — FastAPI app
- /frontend — React app (Vite)

## Running
Backend: `uvicorn main:app --reload` in /backend
Frontend: `npm run dev` in /frontend

## Conventions
- Pydantic schemas: separate classes for Create/Update/Response
- Auth: JWT Bearer token in localStorage
- Components: /pages for pages, /components for UI

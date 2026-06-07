"""
main.py — FastAPI application entry point
==========================================

This is the file uvicorn loads when you run `uvicorn main:app`.
It creates the FastAPI app, wires up all the routers, and handles
startup / shutdown lifecycle events (like opening the DB connection).

In Phase 1 (containers), this is just a health check.
In Phase 2 (CRUD), we'll import and mount the real routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ── App instance ──────────────────────────────────────────────────────────────
# FastAPI() creates the application. Everything else attaches to this object.
# title / description / version appear in the auto-generated /docs UI.
app = FastAPI(
    title="Mahinth Joe — Personal Productivity API",
    description="FastAPI backend for agent orchestration, RAG, and CRUD",
    version="0.1.0",
)

# ── CORS middleware ───────────────────────────────────────────────────────────
# CORS (Cross-Origin Resource Sharing) is a browser security rule.
# Without this, your Next.js frontend (mahinthjoe.com) would be blocked
# from making fetch() calls to api.mahinthjoe.com by the browser.
#
# allow_origins: list of domains allowed to call this API.
# In development we allow localhost:3000 (Next.js dev server).
# In production we'll add "https://mahinthjoe.com".
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://mahinthjoe.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],   # Authorization, Content-Type, etc.
)


# ── Health check ──────────────────────────────────────────────────────────────
# The first route — a dead-simple endpoint to confirm the server is alive.
# Cloudflare Tunnel health checks and Docker healthchecks both call this.
#
# @app.get("/") is a decorator: it tells FastAPI "when a GET request arrives
# at the path '/', run the function below it and return the result as JSON".
@app.get("/")
async def root():
    """Health check — confirms the API is running."""
    return {"status": "ok", "service": "mahinthjoe-backend"}


# ── Future routers (added in later phases) ────────────────────────────────────
# from routers import crud, rag, agents, ingest
# app.include_router(crud.router, prefix="/api/crud", tags=["CRUD"])
# app.include_router(rag.router, prefix="/api/rag", tags=["RAG"])
# app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])
# app.include_router(ingest.router, prefix="/api/ingest", tags=["Ingest"])

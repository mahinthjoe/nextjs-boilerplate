# DOCKERFILE — backend/Dockerfile
# ---------------------------------
# This file describes how to build a container image for the Python backend.
# Think of a container image as a snapshot of a complete, isolated OS + app.
# Every developer who runs `docker compose up` gets the exact same environment,
# regardless of whether they're on Windows, Ubuntu, or macOS.
#
# WHY FEDORA?
# Fedora is the upstream for Red Hat Enterprise Linux (RHEL) — the most common
# Linux distro in enterprise/cloud environments. Learning on Fedora means your
# mental model transfers directly to production RHEL/AWS Linux environments.
# It also has excellent Python support and a fast package manager (dnf).
#
# WHY uv?
# uv is a next-generation Python package manager written in Rust — 10-100x faster
# than pip. It handles virtual environments, dependencies, and lockfiles. You'll
# use it instead of `pip install` for everything in this project.

# ── Base image ──────────────────────────────────────────────────────────────
# fedora:41 is the latest stable Fedora release.
# python:3.12-slim would be smaller, but Fedora gives us a more realistic
# production-like environment to learn on.
FROM fedora:41

# ── System dependencies ──────────────────────────────────────────────────────
# We install Python 3.12 and pip via dnf (Fedora's package manager).
# `--nodocs` keeps the image smaller by skipping documentation files.
# `--setopt=install_weak_deps=False` skips optional "nice to have" packages.
RUN dnf install -y --nodocs --setopt=install_weak_deps=False \
    python3.12 \
    python3.12-pip \
    curl \
    && dnf clean all

# ── Install uv ───────────────────────────────────────────────────────────────
# uv installs itself via a shell script from astral.sh (the creators).
# We pin the PATH so the `uv` command is available everywhere in this image.
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# ── Working directory ────────────────────────────────────────────────────────
# All subsequent commands run relative to /app inside the container.
# This maps to the `backend/` folder on your host machine (see docker-compose.yml).
WORKDIR /app

# ── Install dependencies ─────────────────────────────────────────────────────
# Copy ONLY the dependency files first (not the full source code).
# Docker builds in layers — if pyproject.toml hasn't changed, Docker reuses
# the cached "install dependencies" layer and skips reinstalling on every build.
# This is a performance best practice: copy lock files first, source code last.
COPY pyproject.toml .
RUN uv pip install --system -e ".[dev]"

# ── Copy application code ────────────────────────────────────────────────────
# Now copy the rest of the source. Changes here only invalidate the final layer,
# not the slower dependency-install layer above.
COPY . .

# ── Expose port ──────────────────────────────────────────────────────────────
# This documents which port the app listens on. It doesn't actually open the port
# on your host — that's done in docker-compose.yml with the `ports` directive.
EXPOSE 8000

# ── Default command ───────────────────────────────────────────────────────────
# In production we'd run: uvicorn main:app --host 0.0.0.0 --port 8000
# In development (see docker-compose.yml) we override this with --reload
# so the server restarts automatically when you save a file.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

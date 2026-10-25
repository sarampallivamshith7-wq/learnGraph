# Skills and Build Rules

## Required skills
1. **Product planning:** turn the abstract into a small, demonstrable user journey.
2. **React + Vite:** responsive UI, reusable components, routing/state, chart views.
3. **Python + FastAPI:** simple endpoints, request/response schemas, service separation.
4. **Knowledge graphs:** nodes, relationships, prerequisite traversal, concept lookup; start with JSON.
5. **Data handling:** fictional seed data for scores, attendance, assignments, resources, and mastery.
6. **ML basics:** optional scikit-learn baseline; explain outputs and limitations.
7. **LLM integration:** isolated provider adapter, environment-based keys, useful mock fallback.
8. **UX:** clear dashboards, concept map, progress indicators, accessible labels, demo-friendly flows.
9. **Documentation:** README setup, phase status, and concise cross-app handoff notes.

## Rules for AI coding apps
- Read `README.md`, `master.md`, `skills.md`, `phases.md`, and `HANDOFF.md` before changes.
- Continue from the existing repository; do not restart or overwrite completed work without need.
- Build only the current phase and its dependencies. Keep scope to a prototype.
- Prefer the simplest working implementation; avoid unnecessary libraries, infrastructure, auth, deployment, or database setup.
- Use fictional/demo data. Do not require real student records.
- Keep secrets in `.env`; commit only `.env.example`.
- Label simulated AI/ML outputs honestly. Never imply a live model ran when using a mock.
- Do not build tests, test suites, or testing infrastructure. Manually launch the app only as needed to resolve blocking errors.
- Keep token usage low: short plans, minimal commentary, no repeating the full abstract, and no broad refactors.
- At each handoff, update `HANDOFF.md` and the Current Status section in `phases.md`.
- If a requirement is ambiguous, choose a low-cost prototype default and document it rather than blocking progress.

## Definition of done
A demo user can explore concepts, view sample performance, see knowledge gaps, receive a reasoned learning path, request a concept explanation, and view faculty analytics.

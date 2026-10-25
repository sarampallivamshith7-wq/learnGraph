# Build Phases — Knowledge Graph-Driven Adaptive Learning Prototype

## Goal

Build a demo-ready prototype based on the project abstract. Prioritize a coherent working journey and fictional sample data. **Do not create tests or testing infrastructure.** Run the app only as needed to fix blocking launch/runtime issues.

## Handoff Rule

Before coding, read `README.md`, `master.md`, `skills.md`, `phases.md`, and `HANDOFF.md`. Inspect existing code first. Continue from the current phase; never recreate completed work. After each phase, update the Current Status below and add a concise `HANDOFF.md` entry containing completed work, changed files, run commands, blockers, and the exact next task. Minimize tokens and avoid repeating project context.

## Recommended Prototype Stack

- Frontend: React + Vite
- Backend: Python + FastAPI
- Data: fictional JSON/CSV data
- Knowledge graph: local graph representation; Neo4j optional only if easy
- ML: scikit-learn baseline when appropriate
- LLM: optional provider interface with clearly labelled demo fallback
- Charts: lightweight library or simple visual summaries

Keep setup and infrastructure minimal.

## Phase 0 — Inspect and Scaffold

**Deliverable:** Runnable project skeleton.

- Inspect the workspace and preserve useful code.
- Create frontend/backend structure, sample data, environment documentation, and setup instructions.
- Add shared status to `HANDOFF.md`.
- Provide frontend and backend launch commands.

**Completion criteria:** React/Vite shows main navigation; FastAPI serves health and sample-data endpoints.

**Status: COMPLETE**

## Phase 1 — Core UI and Sample Data

**Deliverable:** Responsive clickable demo with fictional students, subjects, concepts, learning resources, quizzes, attendance, and assignments.

- Pages: Student Dashboard, Learning Path, Concept Explorer, Performance, Faculty Dashboard.
- Add visible loading, empty, and error states where appropriate.

**Completion criteria:** Navigation works and each page shows coherent sample data.

**Status: COMPLETE**

## Phase 2 — Knowledge Graph and Concept Exploration

**Deliverable:** Interactive concept map.

- Model nodes for subjects, concepts, prerequisites, learning resources, quizzes, and student mastery.
- Model relationships such as prerequisite-of, part-of, taught-by, assessed-by, and related-to.
- Selecting a concept shows prerequisites, linked resources, and mastery.
- Use local JSON/in-memory graph data with a clean path to Neo4j later.

**Completion criteria:** Selecting a concept updates details and displays connected concepts.

**Status: COMPLETE — VERIFIED**

## Phase 3 — Student Performance and Knowledge Gaps

**Deliverable:** Student-specific performance view.

- Show quiz scores, assignment results, attendance, activity, progress, and concept mastery.
- Detect gaps with transparent rules and show evidence and linked graph concepts.
- Label indicators as demo estimates, not validated predictions.

**Completion criteria:** Selecting a student updates metrics and gaps.

**Status: COMPLETE**

## Phase 4 — Personalized Learning Recommendations

**Deliverable:** Deterministic, personalized learning path.

- Rank detected gaps using mastery and quiz evidence.
- Include weak mapped prerequisites before dependent concepts.
- Link recommendations to existing resources.
- Explain why each item is recommended and handle missing links/resources.

**Completion criteria:** Student gaps produce a coherent, ordered learning path.

**Status: COMPLETE**

## Phase 5 — AI Concept Explanations and Feedback

**Deliverable:** Concept helper and quiz-answer feedback.

- Provide student-friendly explanations, examples, takeaways, and constructive answer feedback.
- Use a backend provider/service interface.
- Keep demo fallback usable without a paid API; clearly identify demo responses.
- Optional live provider configuration uses backend environment variables only. Never expose credentials to the frontend.

**Completion criteria:** Users can request an explanation and useful feedback.

**Status: COMPLETE — DEFAULT PROVIDER: `demo`**

## Phase 6 — Faculty Analytics

**Deliverable:** Faculty-facing overview.

- Show class progress, concept-level gaps, students needing support, and suggested interventions.
- Filter by subject/concept and open individual student summaries.
- Use fictional data and keep metrics traceable to the data.
- Validate unsupported or incompatible filters.

**Completion criteria:** Faculty can inspect student difficulties and supporting evidence.

**Status: COMPLETE**

## Phase 7 — Demo Polish and Handoff

**Deliverable:** Presentation-ready demo flow.

- Add a simple Student/Faculty role selector or seeded demo profiles; no complex authentication.
- Ensure primary navigation and buttons have meaningful actions.
- Document walkthrough, limitations, and Windows run commands in `README.md`.
- Preserve the working architecture and features.

**Completion criteria:** The walkthrough from student dashboard through concept exploration, performance/gaps, learning path, concept helper, and faculty analytics is coherent.

**Status: COMPLETE**

---

# Phase 8 and Subsequent Improvements

Phases 8–12 are complete. The project roadmap is complete; do not start additional phases unless explicitly requested.

## Phase 8 — Quiz-to-Mastery Adaptive Engine

**Goal:** Make the learning system respond to student quiz attempts.

- Add fictional quiz questions linked to existing concepts.
- Let demo students submit attempts and receive feedback.
- Update concept mastery using transparent, documented rules.
- Recalculate knowledge gaps using existing logic.
- Refresh personalized recommendations and prerequisite ordering.
- Show before/after mastery and explain why the learning path changed.
- Persist attempts and mastery using the simplest compatible local approach.
- Keep demo students' progress separate.

**Completion criteria:** Submitting a quiz changes mastery, gaps, and recommendations for the selected student and persists after a page refresh.

**Status: COMPLETE**

## Phase 9 — ML-Based Academic Support Estimation

**Goal:** Add a genuine machine learning component.

- Use a suitable public educational dataset or clearly labelled synthetic dataset.
- Define a clear prediction target.
- Build a scikit-learn baseline model.
- Use a held-out dataset and appropriate evaluation metrics.
- Show estimates and contributing factors where feasible.
- Clearly distinguish synthetic-data experiments from validated real-world predictions.

**Completion criteria:** The model produces documented estimates with evaluation results and limitations. Do not claim accuracy without evidence.

**Status: COMPLETE — synthetic-data baseline only**

## Phase 10 — Knowledge-Graph Prerequisite Reasoning

**Goal:** Improve graph-driven reasoning.

- Trace prerequisite chains for flagged concepts using existing graph IDs and resolvable prerequisite names.
- Use the selected student's mastery to place prerequisites below 80% (or without a score) before dependent concepts.
- Show the target's gap evidence, each prerequisite's mastery/review status, and the next recommendation in the Learning Path.
- Surface missing links and circular dependencies without inventing graph concepts or allowing infinite traversal.
- Keep the existing gap thresholds, quiz mastery, support model, faculty analytics, and navigation unchanged.

**Completion criteria:** Recommendations reflect prerequisite relationships and explain the reasoning.

**Status: COMPLETE — verified**

## Phase 11 — Model Evaluation and Explainability

**Goal:** Make the existing Phase 9 logistic-regression estimate understandable and transparent without introducing a competing estimator.

- Report accuracy, precision, recall, F1-score, ROC-AUC, and a confusion matrix from the existing stratified 75/25 synthetic holdout split with `random_state=42`.
- Document the synthetic record generation and that positive labels use the same four indicator cutoffs as demo support rules.
- Explain all four fitted, standardized coefficients and show the strongest signed log-odds contributions for individual estimates.
- Present evaluation limits, including synthetic-only labels, no real-outcome validation, no causal claims, and no probability calibration claim.
- Handle zero-division and single-class ROC-AUC metric cases without crashing.

**Completion criteria:** Faculty can understand what the model predicts, how it was evaluated, and where it may fail.

**Status: COMPLETE — verified**

## Phase 12 — Learning-Impact Dashboard

**Goal:** Summarize observed student and cohort activity from the existing prototype records.

- Show current concept mastery, quiz results, detected gaps, and current ordered recommendations for a selected fictional student.
- Show mastery changes only when saved quiz attempts contain prior and updated mastery; do not infer time-based mastery from seeded current values.
- Show existing mapped-prerequisite review status without presenting the review threshold as completion or validated pedagogy.
- Summarize filtered cohort mastery, quiz performance, rule-based gaps, and existing synthetic support estimates using faculty analytics and model evaluation data.
- Clearly distinguish observed prototype activity from synthetic estimates and avoid causal or effectiveness claims.

**Completion criteria:** The role-aware dashboard summarizes traceable demo records, handles empty attempt history, reuses the existing analytics and recommendation paths, and labels data and estimate limitations.

**Status: COMPLETE — verified**

**Validation:** `cd frontend; npm run build` passed. Pylance reported no syntax errors in `backend/main.py`. Manual API checks confirmed faculty cohort aggregates and saved student history. Browser checks confirmed student mastery/quiz/gap/recommendation summaries, recorded before/after mastery changes, empty-history handling, mapped prerequisite status where available, faculty filters, concept summaries, synthetic support estimates, and navigation to existing student support details. A 390px viewport check showed no horizontal overflow. No tests or testing infrastructure were created.

**Limitations:** Seeded current mastery has no time series; only saved adaptive quiz attempts provide mastery changes. Recommendation completion is not tracked. The 80% prerequisite review threshold is a demo heuristic, mapped graph edges are limited, and model estimates remain synthetic and unvalidated. The dashboard does not establish causal impact or learning effectiveness.

---

## Scope and Constraints

- Prototype/demo only; use fictional data unless the user explicitly changes scope.
- **No tests, test suites, or testing infrastructure.**
- No production security, real authentication, or external integrations are implied.
- Keep AI outputs and predictions accurately labelled.
- Never claim a live model ran when it did not.
- Preserve working code and make only necessary changes.
- Do not add infrastructure merely to match every technology named in the abstract.

## Current Status

- [x] Phase 0 — Inspect and scaffold
- [x] Phase 1 — Core UI and sample data
- [x] Phase 2 — Knowledge graph and concept exploration (verified)
- [x] Phase 3 — Performance and knowledge gaps
- [x] Phase 4 — Personalized learning recommendations
- [x] Phase 5 — AI explanations and feedback (default provider: demo)
- [x] Phase 6 — Faculty analytics
- [x] Phase 7 — Demo polish and handoff
- [x] Phase 8 — Quiz-to-Mastery Adaptive Engine
- [x] Phase 9 — ML-Based Academic Support Estimation (synthetic baseline)
- [x] Phase 10 — Knowledge-Graph Prerequisite Reasoning
- [x] Phase 11 — Model Evaluation and Explainability (verified)
- [x] Phase 12 — Learning-Impact Dashboard (verified)

**Roadmap status:** Complete — all planned phases 0–12 are complete.

**Next task:** None. Do not start additional phases unless explicitly requested.

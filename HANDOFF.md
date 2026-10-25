# Handoff State

**Status:** Phases 0–12 complete. The Phase 12 Learning Impact dashboard is implemented and verified; no additional phase has started.

## Phase 12 — Learning-Impact Dashboard

**Features:** Added a role-aware Learning Impact destination as the default view for Student and Faculty. Student view reuses performance data to show current concept mastery, quiz averages and results, current gaps and recommendations, saved adaptive-attempt mastery changes, and mapped prerequisite review status. It uses only stored `previousMastery`/`updatedMastery` values; empty history is explicit. It does not report recommendation completion because the prototype does not track it. Faculty view reuses filtered faculty analytics and model evaluation, presenting cohort mastery/quiz summaries, rule-based concept flags, student support indicators, and separately labelled synthetic support estimates. Existing subject/concept filters and faculty student-detail navigation remain available.

**Backend:** Extended the existing `GET /api/faculty-analytics` cohort summary with filtered `averageQuiz`, `quizAttemptCount`, and cohort-wide `modelEstimatedSupport` aggregates. No new endpoint, estimator, mastery rule, or recommendation logic was added.

**Changed files:** `frontend/src/main.jsx`, `frontend/src/styles.css`, `backend/main.py`, `README.md`, `phases.md`, `HANDOFF.md`.

**Validation:**
- `cd frontend; npm run build` — passed.
- Pylance syntax check for `backend/main.py` — passed with no syntax errors.
- Manual API check — `/api/faculty-analytics` returned cohort mastery, filtered quiz average/count, gap counts, and model-estimated support count; `/api/performance/student-001` returned quiz results and saved adaptive attempts.
- Browser check — Student view showed current mastery, quiz results, one current gap, recommendations, and the selected student's five recorded before/after attempts. Maya Ortiz showed the no-attempt empty state and the mapped Functions & Graphs → Intro to Derivatives prerequisite review status.
- Browser check — Faculty view showed cohort summaries, concept-level signals, student estimates, and both subject/concept filters. Filtering to Programming showed its two concepts and 19 linked quiz results. Opening a student support detail navigated to the existing Faculty Dashboard detail.
- Responsive browser check — a 390px viewport fit the student impact page without horizontal overflow.
- No tests, test files, or testing infrastructure were created.

**Run commands (PowerShell):**
- Frontend: `cd frontend; npm run dev`
- Backend: `cd backend; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn main:app --reload`

**Limitations:** Only recorded adaptive attempts supply dated mastery changes; seeded mastery has no historical time series. Recommendation completion is not recorded. Prerequisite status uses mapped graph links and a demo-only 80% review heuristic. Faculty support estimates and model metrics are based on synthetic data and are not validated decisions. Dashboard activity is not evidence of causal impact or improved learning outcomes.

**Overall project status:** Roadmap complete; all planned phases 0–12 are complete. No next phase is planned.

## Phase 10 — Knowledge-Graph Prerequisite Reasoning

**Algorithm:** The existing deterministic learning-path engine resolves prerequisite edges from `prerequisiteIds` and prerequisite labels matching an existing concept ID or name. It starts from the existing mastery/quiz gap ranking, walks mapped prerequisites with visited/active-path guards, and places unmet prerequisites before dependent concepts. A prerequisite is recommended for review below 80% mastery or when the selected student's mastery is unavailable; this review threshold is separate from (and does not change) the gap thresholds. Stronger prerequisites remain visible as satisfied evidence in the reasoning chain. The Learning Path explains target gap evidence → prerequisite mastery/review status → recommended next concept.

**Edge cases:** Missing prerequisite IDs and labels are reported as unmapped rather than creating concepts. Circular edges are detected and skipped with a note; traversal remains finite. Gaps that have no mapped graph concept continue to use the existing fallback recommendation behavior. Concept IDs remain the graph's source of truth.

**Changed files:** `frontend/src/main.jsx`, `frontend/src/styles.css`, `README.md`, `phases.md`, `HANDOFF.md`.

**Validation:**
- `cd frontend; npm run build` — passed.
- Browser manual check — selected fictional Priya Shah and confirmed the 74%-mastery Functions & Graphs prerequisite was placed before the weak Intro to Derivatives target; the detail panel showed target gap evidence, prerequisite mastery, the 80% threshold, and unmapped prerequisite labels.
- One-off in-memory graph checks — confirmed prerequisite-first ordering, mastery evidence, missing ID/name reporting, and finite traversal with circular edges.
- No test files or testing infrastructure were created.
- No backend, quiz, mastery-update, support-estimation, faculty-analytics, or role-navigation code was changed.

**Limitations:** The current concept graph has few mapped prerequisite edges; several prerequisite labels refer to concepts not present as nodes and are therefore surfaced but not ordered. The 80% prerequisite-review threshold is a transparent demo rule, not a validated pedagogical threshold. Reasoning is deterministic and uses the existing fictional progress data; it is not a new ML model or an evaluation of learning outcomes.

**Run commands (PowerShell):**
- Frontend: `cd frontend; npm run dev`
- Backend: `cd backend; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn main:app --reload`

## Phase 9 model context

The existing support estimator is a standard-scaled logistic regression trained on 1,200 deterministic synthetic records; its positive label is generated from the same academic-indicator cutoffs. A stratified 75/25 split (`random_state=42`) reported held-out accuracy 0.853, precision 0.864, recall 0.910, F1 0.886, and ROC-AUC 0.934. These are metrics against synthetic rule labels only, not real-world validity. Probabilities and contributing indicators are not validated or causal.

## Phase 11 — Model Evaluation and Explainability

**Changed files:** `backend/services/support_estimator.py`, `frontend/src/main.jsx`, `frontend/src/styles.css`, `README.md`, `phases.md`, `HANDOFF.md`. The existing FastAPI endpoints and estimator architecture were reused; no second estimator or model-training path was added.

**Evaluation methodology:** The existing model is a standard-scaled logistic regression trained on 1,200 synthetic records created with `random.Random(2026)`: quiz and assignment values range from 35–100%, attendance 50–100%, and weekly study hours 1–12. A positive synthetic support-needed label is generated when at least two indicators cross the existing cutoffs: quiz average <65%, assignment completion <70%, attendance <80%, weekly study hours <3.5. The dataset is split with stratification into 900 training and 300 held-out records using `random_state=42`.

**Held-out metrics (rounded to three decimals):** accuracy 0.853; precision 0.864; recall 0.910; F1 0.886; ROC-AUC 0.934. Confusion matrix uses actual labels as rows and predicted labels as columns, in `[not support-needed, support-needed]` order: `[[85, 27], [17, 171]]`. Precision, recall, and F1 use zero-division handling; ROC-AUC is reported as unavailable if the holdout has only one label.

**Explainability:** The faculty analytics API now returns every fitted coefficient with the training-split mean and standard deviation. For an individual prediction, a feature's signed contribution is `(value − training mean) / training standard deviation × fitted coefficient`; the three largest absolute contributions are shown in log-odds units, not as probability-point changes. This accounts for the fitted scaler and coefficient direction. Coefficients describe model associations conditional on other indicators, not causes. The UI notes that the linear model may not reproduce the synthetic multi-cutoff labeling rule exactly.

**Validation:**
- `cd frontend; npm run build` — passed.
- Pylance syntax check on `backend/services/support_estimator.py` — passed; Pylance diagnostics for estimator and `backend/main.py` — no issues.
- In-memory backend checks — faculty analytics includes the same model metadata; estimate output includes signed scaled contributions; missing inputs produce the existing HTTP 400 handler response; out-of-range values are rejected by request validation.
- Browser check — Faculty Dashboard shows all five metrics, held-out split and label rules, confusion matrix, four scaled coefficients, and an opened student support detail with signed top-indicator contributions.
- ASGI `TestClient` was unavailable because the optional `httpx2` package is absent. No package was installed; direct route-handler and request-model checks were used instead.
- No tests, test files, or testing infrastructure were created. Quiz mastery, gap thresholds, prerequisite reasoning, and navigation were not changed.

**Run commands (PowerShell):**
- Frontend: `cd frontend; npm run dev`
- Backend: `cd backend; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn main:app --reload`

**Limitations:** The data and labels are synthetic and use the same indicator cutoffs, so the reported results do not validate real-world student outcomes. No real student records are used. The model does not establish causality; probability calibration was not evaluated; coefficients and estimates are not validated for intervention decisions.

**Historical next task (completed):** Phase 12 — Learning-Impact Dashboard.

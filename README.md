# Adaptive Learning Intelligence — Prototype

A prototype for the **Knowledge Graph-Driven Adaptive Learning and Academic Performance Intelligence Framework**. It uses fictional sample data and is not a production student-record system.

## Read these files in order
1. `master.md` — project context, abstract-derived requirements, scope, and cross-app memory.
2. `phases.md` — build sequence and current phase.
3. `skills.md` — implementation skills and AI coding rules.
4. `HANDOFF.md` — last session's progress and exact next task.

## How to use with any AI coding app
Copy these Markdown files into the project root/repository. When switching apps, prompt the new app:

> Read `README.md`, `master.md`, `phases.md`, `skills.md`, and `HANDOFF.md`. Inspect the existing code. Continue from the current phase and exact next task in `HANDOFF.md`; do not recreate completed work. Keep the prototype scope and token usage small. Do not build tests. When finished, update `HANDOFF.md` and the phase checklist.

## Prototype stack
- React + Vite frontend
- Python + FastAPI backend
- Fictional JSON seed data
- Local JSON graph first; Neo4j optional later
- Rule-based gap detection and recommendations first
- Optional ML/LLM adapters with honest demo fallbacks

The stack is a practical prototype choice; the abstract's broader technology list does not need to be implemented all at once.

## Demo walkthrough
1. Open **Learning Impact**, the default dashboard, and choose **Student** or **Faculty** in the top bar. This is a simple prototype role selector; no login or auth flow is required.
2. In **Student** mode, choose a fictional demo student to view current concept mastery, quiz scores, detected gaps, current recommendations, and mapped prerequisite review status.
3. Review the adaptive quiz history to see only recorded before-and-after mastery changes. Students with no saved attempts get an explicit empty-history message; seeded current mastery is not turned into a made-up timeline.
4. In **Faculty** mode, review cohort mastery and quiz summaries, concept-level rule flags, and the existing synthetic model support estimates. Use subject and concept filters, then open a student's existing support detail from the list.
5. Use **Student Dashboard**, **Concept Explorer**, **Performance**, and **Learning Path** to explore the existing student journey and graph connections.
6. On **Learning Path**, select a linked concept, answer the fictional quiz question, and submit. The result shows feedback, prior/updated mastery, gap counts, and whether the ordered path changed.
7. Use the **Concept Helper** to ask for a plain-language explanation or quiz feedback for the selected concept. **Faculty Dashboard** contains the existing detailed analytics and model evaluation.

Quiz mastery uses a transparent rule: `new mastery = round(0.8 × previous mastery + 0.2 × attempt score)`, where a correct answer scores 100 and an incorrect answer scores 0. The existing gap thresholds and recommendation/prerequisite ordering are then recalculated from the updated performance data. This is a deterministic demo rule, not an ML model.

Learning-path reasoning follows the graph's existing `prerequisiteIds` and prerequisite names that resolve to concept nodes. Mapped prerequisites below 80% mastery, or with no student mastery score, are placed before the dependent concept; the reasoning panel shows the target's gap evidence and each prerequisite's mastery. This review threshold is separate from the existing gap thresholds. Missing graph links are called out without inventing concepts, and circular links are skipped and explained so traversal stays finite.

The Learning Impact dashboard reports observed prototype activity from existing performance, quiz-attempt, recommendation, faculty analytics, and model evaluation data. Student quiz results and adaptive mastery changes are shown separately; mastery changes appear only when saved attempts provide prior and updated values. The current learning path is a recommendation, not a completed checklist, because recommendation completion is not recorded. Faculty cohort quiz summaries and model-estimated support counts are returned by the existing faculty analytics endpoint.

## Known limitations
- This is a demo-only prototype with fictional student data and labelled mock estimates, not a production academic system.
- Dashboard activity is not proof that learning outcomes improved. There is no causal study or real outcome data, and no effectiveness claim is made.
- Seeded current mastery has no dated mastery history. The dashboard shows before-and-after mastery only for saved adaptive quiz attempts and does not infer an earlier timeline from current values.
- Recommendation completion is not tracked, so the dashboard shows a current ordered learning path without a completion percentage. Prerequisite review status is based only on mapped graph links and the existing 80% demo heuristic.
- The faculty support estimator is a standard-scaled logistic regression trained on 1,200 deterministic synthetic records (generated with seed 2026; quiz and assignment values 35–100%, attendance 50–100%, and study hours 1–12 per week). A synthetic positive label is assigned when at least two indicators cross the demo cutoffs: quiz average below 65%, assignment completion below 70%, attendance below 80%, or weekly study hours below 3.5. The model uses a stratified 75/25 train/holdout split with `random_state=42` (900/300 records). Current held-out metrics, rounded to three decimals, are accuracy 0.853, precision 0.864, recall 0.910, F1 0.886, and ROC-AUC 0.934; confusion matrix rows are actual labels and columns predicted labels in `[not support-needed, support-needed]` order: `[[85, 27], [17, 171]]`.
- Faculty explainability uses the fitted scaler and coefficients: each feature's contribution is `(value − training mean) / training standard deviation × coefficient`, expressed in log-odds, and the three largest absolute contributions are shown per estimate. The global coefficient is the association for a one-standard-deviation increase while holding other indicators fixed. These contributions are not probability-point changes, causal effects, or validated signals; probability calibration was not evaluated.
- The synthetic records and labels use the same indicator cutoffs that define demo support needs. These metrics therefore describe only a synthetic classification exercise and do not validate real-world student outcomes or intervention decisions. No real student records are used.
- The estimator uses numeric academic indicators only and accepts no student identifier or name. The faculty analytics endpoint includes estimates for the existing fictional cohort; this is still demo data and is not a privacy/security boundary for a real deployment.
- AI explanations and learning-path guidance use the demo provider by default; live provider responses are optional and require backend environment variables.
- Quiz attempts and mastery overrides persist in the backend-local `backend/data/demo_progress.json`, separated by demo student. This local JSON store is for the single-machine prototype; deleting the file resets quiz progress. Other data is seeded and there is no connection to real enrollment, grading, or instructor systems.
- The prototype is intentionally scoped to the demo journey and does not attempt to validate model accuracy or replace real student support workflows.

## Prototype features
- Student performance dashboard
- Knowledge graph concept explorer
- Knowledge-gap indicators
- Personalized learning path with explanations
- Concept explanations and quiz feedback
- Adaptive quiz attempts with persisted demo mastery
- Faculty analytics dashboard
- Role-aware Learning Impact dashboard for observed student and cohort activity

## Scope
Prototype only. No tests or testing infrastructure. Use fictional data and clearly label simulated predictions or mock AI output.

## Run the prototype

Prerequisites: Node.js/npm and Python 3.10+.

1. In one terminal:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
2. In another terminal (the backend installs scikit-learn for the synthetic baseline):
   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
3. Open the Vite URL shown in the first terminal (normally `http://localhost:5173`).

The student Concept Explorer and Learning Path include the concept helper. It explains selected concepts and gives feedback on quiz answers, using the selected demo student's gap context when available. The default provider is a clearly labelled local demo fallback; no API or paid service is required.

Optional live responses use the OpenAI chat completions API from the backend only. Set environment variables in the backend terminal before starting Uvicorn:

```powershell
$env:AI_PROVIDER="openai"
$env:OPENAI_API_KEY="your-key"
$env:OPENAI_MODEL="gpt-4o-mini"
uvicorn main:app --reload
```

`OPENAI_BASE_URL` is optional and defaults to `https://api.openai.com/v1`. Set `AI_PROVIDER=demo` (the default) to use the local fallback. The app displays the active response provider with each result. `.env.example` documents these values; the prototype reads environment variables inherited by the backend process and does not automatically load a `.env` file. Never put provider credentials in frontend variables or source code.

The backend exposes `/api/health`, `/api/overview`, student performance endpoints, `GET /api/quiz-questions`, `POST /api/quiz-attempts`, `GET /api/faculty-analytics` (optional `subject` and `concept` filters), `POST /api/support-estimate` (numeric `quiz_average`, `assignment_completion`, `attendance`, and `weekly_study_hours` only), and `POST /api/concept-helper`. Faculty analytics includes cohort quiz aggregates alongside its existing rule-based flags, evidence, and synthetic model estimates; model estimates are not validated predictions or student-support decisions. See `phases.md` and `HANDOFF.md` for evaluation details, limitations, and project status.

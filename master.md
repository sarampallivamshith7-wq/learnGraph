# Master Project Context — Read First

## Project
**Knowledge Graph-Driven Adaptive Learning and Academic Performance Intelligence Framework**

## Source of truth: project abstract
The project is an AI-based educational platform intended to personalize learning by analyzing academic performance and learning behavior. A Knowledge Graph represents relationships among subjects, concepts, learning materials, and student progress. The system aims to identify knowledge gaps, predict academic performance, and recommend personalized learning paths based on strengths and weaknesses.

The abstract describes inputs including quiz scores, assignments, attendance, and learning activities. Intended capabilities include study recommendations, real-time feedback, concept explanations, academic performance predictions, and a faculty analytics dashboard to identify students needing support.

The abstract names Python, Neo4j, scikit-learn, TensorFlow, spaCy, and React.js. For this **prototype only**, use the smallest practical stack and sample data; do not force every named technology into the first version.

**Domain:** Artificial Intelligence and Machine Learning  
**SDG in the abstract:** SDG 4 — Quality Education  
**Prototype goal:** Demonstrate the idea and core user journey, not build a production-ready academic platform.

## Prototype users
- **Student:** sees progress, concept mastery, knowledge gaps, recommended learning path, and explanations.
- **Faculty:** sees class-level trends, concepts causing difficulty, students needing support, and evidence behind indicators.

## Main demo journey
1. Choose a fictional student.
2. View academic snapshot across quizzes, assignments, attendance, and activity.
3. Explore a concept and its prerequisites/resources in the knowledge graph.
4. See detected knowledge gaps.
5. Receive an ordered learning path with reasons.
6. Ask for a concept explanation or feedback.
7. Switch to faculty view and inspect class trends/support needs.

## Core entities
- Student
- Subject
- Concept
- LearningResource
- Quiz / QuizResult
- Assignment / AssignmentResult
- AttendanceRecord
- LearningActivity
- Mastery
- Recommendation
- FacultyIntervention

## Prototype behavior
- Use fictional seed data.
- Start with JSON/local graph structures. Keep a clean path to Neo4j if later needed.
- Start with transparent rules for gap detection and recommendation ranking.
- ML predictions are optional and illustrative; clearly label them as demo estimates, not validated predictions.
- Put LLM calls behind one service adapter. Use environment variables for keys and a visible mock fallback if no key is configured.
- Keep the UI cohesive, responsive, and easy to demonstrate.
- Use simple role selection or demo profiles instead of complex authentication unless specifically requested.

## Scope boundaries
- **No testing required.** Do not create or spend time on unit tests, integration tests, test suites, or testing infrastructure.
- This is a prototype; no production security/compliance, real student data, large-scale deployment, or model-accuracy claims.
- Do not add features outside the abstract unless needed for the demo.
- Do not claim that AI/ML is live if the implementation is using sample rules or mock responses.

## AI app handoff / memory protocol
This file is the persistent project memory. At the start of every new AI app/session:
1. Read `README.md`, `master.md`, `skills.md`, `phases.md`, and `HANDOFF.md`.
2. Inspect the actual repository before editing.
3. Follow the **Current phase** in `phases.md`.
4. Make only the next scoped changes; preserve existing work.
5. Update `HANDOFF.md` and the phase checklist when finished.
6. Leave a short handoff summary so another app can continue without asking the user to repeat context.

## Token-minimizing response format
When working on this project, respond with only:
- **Done:** short bullets
- **Files changed:** filenames
- **Next:** one concrete task
- **Blockers:** only if any

Avoid repeating project context or giving long explanations unless asked.

## Current state
- No implementation state is assumed by these planning files.
- Start at Phase 0 and inspect the workspace.
- Next task: scaffold the smallest runnable prototype.

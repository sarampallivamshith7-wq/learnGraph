from pathlib import Path
import json
from datetime import datetime, timezone
from typing import Literal, Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, StrictInt

from services.concept_helper import (
    ProviderConfigurationError,
    ProviderError,
    get_concept_helper_provider,
)
from services.support_estimator import estimate_support, model_info

app = FastAPI(title="LearnGraph Demo API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent / "data" / "demo.json"
PROGRESS_PATH = Path(__file__).parent / "data" / "demo_progress.json"
MASTERY_GAP_THRESHOLD = 70
QUIZ_GAP_THRESHOLD = 65
SUPPORT_CONCEPT_THRESHOLD = 2
QUIZ_MASTERY_OLD_WEIGHT = 0.8
QUIZ_MASTERY_SCORE_WEIGHT = 0.2

QUIZ_QUESTIONS = [
    {
        "id": "functions-input-output",
        "conceptId": "functions",
        "prompt": "For f(x) = 2x + 3, what is f(4)?",
        "options": ["8", "11", "14", "23"],
        "correctIndex": 1,
        "feedback": "Substitute 4 for x: 2 × 4 + 3 = 11.",
    },
    {
        "id": "recursion-base-case",
        "conceptId": "recursion",
        "prompt": "What prevents a recursive function from calling itself forever?",
        "options": [
            "A base case that stops recursion",
            "A longer function name",
            "An extra loop around every call",
            "A global variable",
        ],
        "correctIndex": 0,
        "feedback": "A base case defines when the function returns without another recursive call.",
    },
    {
        "id": "probability-complement",
        "conceptId": "probability",
        "prompt": "If an event has probability 0.3, what is the probability it does not occur?",
        "options": ["0.3", "0.6", "0.7", "1.3"],
        "correctIndex": 2,
        "feedback": "An event and its complement sum to 1, so 1 − 0.3 = 0.7.",
    },
    {
        "id": "arrays-zero-index",
        "conceptId": "arrays",
        "prompt": "In a zero-indexed list, which position refers to its first item?",
        "options": ["0", "1", "-1", "The list length"],
        "correctIndex": 0,
        "feedback": "Zero-indexed lists label their first item with index 0.",
    },
    {
        "id": "derivatives-rate",
        "conceptId": "derivatives",
        "prompt": "A derivative at a point most directly describes which quantity?",
        "options": [
            "The total area under a curve",
            "The instantaneous rate of change",
            "The function's average value",
            "The number of function inputs",
        ],
        "correctIndex": 1,
        "feedback": "A derivative describes the instantaneous rate of change, represented by the tangent slope.",
    },
]


class ConceptHelperInput(BaseModel):
    action: Literal["explain", "feedback"]
    conceptId: str
    studentId: str
    question: Optional[str] = ""
    answer: Optional[str] = ""
    expectedAnswer: Optional[str] = ""


class QuizAttemptInput(BaseModel):
    studentId: str
    questionId: str
    answerIndex: StrictInt


class SupportEstimateInput(BaseModel):
    quiz_average: Optional[float] = Field(default=None, ge=0, le=100, allow_inf_nan=False)
    assignment_completion: Optional[float] = Field(default=None, ge=0, le=100, allow_inf_nan=False)
    attendance: Optional[float] = Field(default=None, ge=0, le=100, allow_inf_nan=False)
    weekly_study_hours: Optional[float] = Field(default=None, ge=0, le=40, allow_inf_nan=False)


def load_demo_data():
    with DATA_PATH.open(encoding="utf-8") as data_file:
        return json.load(data_file)


def load_progress():
    if not PROGRESS_PATH.exists():
        return {"students": {}}
    with PROGRESS_PATH.open(encoding="utf-8") as progress_file:
        progress = json.load(progress_file)
    if not isinstance(progress, dict) or not isinstance(progress.get("students"), dict):
        raise ValueError("Demo progress file has an invalid structure.")
    return progress


def save_progress(progress):
    temporary_path = PROGRESS_PATH.with_suffix(".json.tmp")
    with temporary_path.open("w", encoding="utf-8") as progress_file:
        json.dump(progress, progress_file, indent=2)
        progress_file.write("\n")
    temporary_path.replace(PROGRESS_PATH)


@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Connected to fictional demo data"}


@app.get("/api/overview")
def overview():
    return load_demo_data()


@app.get("/api/students")
def students():
    data = load_demo_data()
    return [
        {key: student[key] for key in ("id", "name", "program", "year")}
        for student in data["demoStudents"]
    ]


@app.get("/api/quiz-questions")
def quiz_questions():
    data = load_demo_data()
    concepts = {item["id"]: item for item in data["concepts"]}
    return {
        "questions": [
            {
                "id": item["id"],
                "conceptId": item["conceptId"],
                "conceptName": concepts[item["conceptId"]]["name"],
                "prompt": item["prompt"],
                "options": item["options"],
            }
            for item in QUIZ_QUESTIONS
        ],
        "masteryRule": {
            "oldMasteryWeight": QUIZ_MASTERY_OLD_WEIGHT,
            "attemptScoreWeight": QUIZ_MASTERY_SCORE_WEIGHT,
        },
    }


@app.post("/api/support-estimate")
def support_estimate(payload: SupportEstimateInput):
    missing = [
        field for field in (
            "quiz_average",
            "assignment_completion",
            "attendance",
            "weekly_study_hours",
        )
        if getattr(payload, field) is None
    ]
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Provide all academic indicators to estimate support need: {', '.join(missing)}.",
        )

    estimate = estimate_support({
        "quizAverage": payload.quiz_average,
        "assignmentCompletion": payload.assignment_completion,
        "attendance": payload.attendance,
        "weeklyStudyHours": payload.weekly_study_hours,
    })
    return {
        **estimate,
        "model": model_info(),
    }


@app.post("/api/quiz-attempts")
def submit_quiz_attempt(payload: QuizAttemptInput):
    if not payload.studentId.strip():
        raise HTTPException(status_code=400, detail="Choose a demo student first.")
    if not payload.questionId.strip():
        raise HTTPException(status_code=400, detail="Choose a quiz question.")
    data = load_demo_data()
    student = next(
        (item for item in data["demoStudents"] if item["id"] == payload.studentId),
        None,
    )
    if student is None:
        raise HTTPException(status_code=404, detail="Demo student not found.")
    question = next(
        (item for item in QUIZ_QUESTIONS if item["id"] == payload.questionId),
        None,
    )
    if question is None:
        raise HTTPException(status_code=404, detail="Quiz question not found.")
    if payload.answerIndex < 0 or payload.answerIndex >= len(question["options"]):
        raise HTTPException(status_code=400, detail="Choose one of the listed answers.")

    progress = load_progress()
    student_progress = progress["students"].setdefault(
        payload.studentId,
        {"mastery": {}, "attempts": []},
    )
    current_performance = student_performance(payload.studentId)
    previous_mastery = next(
        item["mastery"]
        for item in current_performance["conceptMastery"]
        if item["conceptId"] == question["conceptId"]
    )
    is_correct = payload.answerIndex == question["correctIndex"]
    score = 100 if is_correct else 0
    updated_mastery = round(
        previous_mastery * QUIZ_MASTERY_OLD_WEIGHT
        + score * QUIZ_MASTERY_SCORE_WEIGHT
    )
    student_progress["mastery"][question["conceptId"]] = updated_mastery
    attempt = {
        "id": str(uuid4()),
        "questionId": question["id"],
        "conceptId": question["conceptId"],
        "answerIndex": payload.answerIndex,
        "correct": is_correct,
        "score": score,
        "previousMastery": previous_mastery,
        "updatedMastery": updated_mastery,
        "submittedAt": datetime.now(timezone.utc).isoformat(),
    }
    student_progress["attempts"].append(attempt)
    save_progress(progress)

    return {
        "attempt": attempt,
        "conceptId": question["conceptId"],
        "conceptName": next(
            item["name"] for item in data["concepts"]
            if item["id"] == question["conceptId"]
        ),
        "correct": is_correct,
        "feedback": question["feedback"],
        "masteryRule": (
            f"New mastery = {QUIZ_MASTERY_OLD_WEIGHT:.0%} of previous mastery "
            f"+ {QUIZ_MASTERY_SCORE_WEIGHT:.0%} of this attempt score "
            "(correct = 100, incorrect = 0), rounded to a whole percent."
        ),
    }


@app.get("/api/faculty-analytics")
def faculty_analytics(subject: Optional[str] = None, concept: Optional[str] = None):
    data = load_demo_data()
    subjects = sorted({item["subject"] for item in data["concepts"]})
    concept_by_id = {item["id"]: item for item in data["concepts"]}

    if subject and subject not in subjects:
        raise HTTPException(status_code=400, detail="Subject not found.")
    if concept and concept not in concept_by_id:
        raise HTTPException(status_code=400, detail="Concept not found.")
    if concept and subject and concept_by_id[concept]["subject"] != subject:
        raise HTTPException(
            status_code=400,
            detail="The selected concept does not belong to the selected subject.",
        )

    filtered_concepts = [
        item for item in data["concepts"]
        if (not subject or item["subject"] == subject)
        and (not concept or item["id"] == concept)
    ]
    if not filtered_concepts:
        raise HTTPException(status_code=404, detail="No concepts match this filter.")
    concept_ids = {item["id"] for item in filtered_concepts}
    student_rows = []
    concept_rows = []
    all_mastery_values = []
    all_quiz_scores = []
    performance_rows = []

    for student in data["demoStudents"]:
        performance = student_performance(student["id"])
        performance_rows.append(performance)
        all_quiz_scores.extend(
            quiz["score"] for quiz in performance["quizzes"]
            if quiz["conceptId"] in concept_ids
        )
        mastery = [
            item for item in performance["conceptMastery"]
            if item["conceptId"] in concept_ids
        ]
        gaps = [
            item for item in performance["gaps"]
            if item["conceptId"] in concept_ids
        ]
        mastery_values = [
            item["mastery"] for item in mastery if item["mastery"] is not None
        ]
        all_mastery_values.extend(mastery_values)
        support_indicator = (
            "Needs support" if len(gaps) >= SUPPORT_CONCEPT_THRESHOLD
            else "Monitor" if len(gaps) == 1
            else "On track"
        )
        support_estimate = estimate_support({
            "quizAverage": performance["summary"]["quizAverage"],
            "assignmentCompletion": performance["summary"]["assignmentCompletion"],
            "attendance": performance["summary"]["attendance"],
            "weeklyStudyHours": performance["summary"]["timeOnTask"],
        })
        student_rows.append({
            "id": student["id"],
            "name": student["name"],
            "mastery": (
                round(sum(mastery_values) / len(mastery_values))
                if mastery_values else None
            ),
            "supportIndicator": support_indicator,
            "gaps": gaps,
            "summary": performance["summary"],
            "assignmentCompletion": performance["assignmentCompletion"],
            "attendance": performance["attendance"],
            "weeklyProgress": performance["weeklyProgress"],
            "supportEstimate": support_estimate,
        })

    for item in filtered_concepts:
        mastery_values = [
            mastery["mastery"]
            for row in performance_rows
            for mastery in row["conceptMastery"]
            if mastery["conceptId"] == item["id"] and mastery["mastery"] is not None
        ]
        quiz_scores = [
            quiz["score"]
            for performance in performance_rows
            for quiz in performance["quizzes"]
            if quiz["conceptId"] == item["id"]
        ]
        gap_students = [
            row["name"] for row in student_rows
            if any(gap["conceptId"] == item["id"] for gap in row["gaps"])
        ]
        concept_rows.append({
            "conceptId": item["id"],
            "name": item["name"],
            "subject": item["subject"],
            "averageMastery": (
                round(sum(mastery_values) / len(mastery_values))
                if mastery_values else None
            ),
            "assessedStudents": len(mastery_values),
            "averageQuiz": (
                round(sum(quiz_scores) / len(quiz_scores))
                if quiz_scores else None
            ),
            "quizAttempts": len(quiz_scores),
            "flaggedStudents": len(gap_students),
            "gapStudentNames": gap_students,
        })

    support_order = {"Needs support": 0, "Monitor": 1, "On track": 2}
    student_rows.sort(key=lambda row: (
        support_order[row["supportIndicator"]],
        row["mastery"] if row["mastery"] is not None else 101,
        row["name"],
    ))
    flagged_gaps = sum(len(row["gaps"]) for row in student_rows)
    return {
        "filters": {
            "subjects": subjects,
            "concepts": [
                {"id": item["id"], "name": item["name"], "subject": item["subject"]}
                for item in data["concepts"]
                if not subject or item["subject"] == subject
            ],
            "selectedSubject": subject or "",
            "selectedConcept": concept or "",
        },
        "thresholds": {
            "mastery": MASTERY_GAP_THRESHOLD,
            "quizAverage": QUIZ_GAP_THRESHOLD,
            "supportConceptCount": SUPPORT_CONCEPT_THRESHOLD,
        },
        "model": model_info(),
        "classSummary": {
            "cohortSize": len(student_rows),
            "averageMastery": (
                round(sum(all_mastery_values) / len(all_mastery_values))
                if all_mastery_values else None
            ),
            "averageQuiz": (
                round(sum(all_quiz_scores) / len(all_quiz_scores))
                if all_quiz_scores else None
            ),
            "quizAttemptCount": len(all_quiz_scores),
            "needingSupport": sum(
                row["supportIndicator"] == "Needs support" for row in student_rows
            ),
            "monitor": sum(
                row["supportIndicator"] == "Monitor" for row in student_rows
            ),
            "flaggedGaps": flagged_gaps,
            "modelEstimatedSupport": sum(
                row["supportEstimate"]["mayNeedSupport"] for row in student_rows
            ),
        },
        "concepts": concept_rows,
        "students": student_rows,
    }


@app.get("/api/performance/{student_id}")
def student_performance(student_id: str):
    data = load_demo_data()
    student = next(
        (item for item in data["demoStudents"] if item["id"] == student_id),
        None,
    )
    if student is None:
        raise HTTPException(status_code=404, detail="Demo student not found")

    progress = load_progress()["students"].get(
        student_id,
        {"mastery": {}, "attempts": []},
    )
    concepts = {concept["id"]: concept for concept in data["concepts"]}
    mastery_by_id = {
        item["conceptId"]: item["mastery"] for item in student["conceptMastery"]
    }
    mastery_by_id.update(progress.get("mastery", {}))
    saved_attempts = progress.get("attempts", [])
    saved_quizzes = []
    for attempt in saved_attempts:
        saved_quizzes.append({
            "title": f"Adaptive quiz: {concepts[attempt['conceptId']]['name']}",
            "date": attempt["submittedAt"][:10],
            "conceptId": attempt["conceptId"],
            "score": attempt["score"],
            "attemptId": attempt["id"],
        })
    all_quizzes = [*student["quizzes"], *saved_quizzes]
    quiz_scores = {}
    for quiz in all_quizzes:
        quiz_scores.setdefault(quiz["conceptId"], []).append(quiz["score"])

    concept_mastery = []
    gaps = []
    for concept_id, concept in concepts.items():
        mastery = mastery_by_id.get(concept_id)
        scores = quiz_scores.get(concept_id, [])
        quiz_average = round(sum(scores) / len(scores)) if scores else None
        status = (
            "Needs support" if mastery is not None and mastery < MASTERY_GAP_THRESHOLD
            else "Developing" if mastery is not None and mastery < 80
            else "Strong"
        )
        concept_mastery.append({
            "conceptId": concept_id,
            "name": concept["name"],
            "subject": concept["subject"],
            "mastery": mastery,
            "status": status,
        })

        evidence = []
        if mastery is not None and mastery < MASTERY_GAP_THRESHOLD:
            evidence.append(
                f"Concept mastery is {mastery}% (the demo rule flags values below "
                f"{MASTERY_GAP_THRESHOLD}%)."
            )
        if quiz_average is not None and quiz_average < QUIZ_GAP_THRESHOLD:
            evidence.append(
                f"Quiz average is {quiz_average}% across {len(scores)} linked "
                f"attempts (the demo rule flags averages below {QUIZ_GAP_THRESHOLD}%)."
            )
        if evidence:
            gaps.append({
                "conceptId": concept_id,
                "conceptName": concept["name"],
                "subject": concept["subject"],
                "mastery": mastery,
                "quizAverage": quiz_average,
                "evidence": evidence,
            })

    gap_count = len(gaps)
    support_indicator = (
        "Needs support" if gap_count >= SUPPORT_CONCEPT_THRESHOLD
        else "Monitor" if gap_count == 1
        else "On track"
    )
    assignment_completion = student["assignmentCompletion"]
    attendance = student["attendance"]
    quizzes = [
        {**item, "conceptName": concepts[item["conceptId"]]["name"]}
        for item in all_quizzes
    ]
    assignments = [
        {**item, "conceptName": concepts[item["conceptId"]]["name"]}
        for item in student["assignments"]
    ]
    return {
        "student": {
            key: student[key] for key in ("id", "name", "program", "year")
        },
        "summary": {
            "quizAverage": round(
                sum(item["score"] for item in all_quizzes)
                / len(all_quizzes)
            ),
            "assignmentCompletion": round(
                assignment_completion["completed"]
                / assignment_completion["total"]
                * 100
            ),
            "attendance": round(
                attendance["attended"] / attendance["total"] * 100
            ),
            "timeOnTask": student["weeklyProgress"][-1]["hours"],
        },
        "attendance": attendance,
        "assignmentCompletion": assignment_completion,
        "quizzes": quizzes,
        "quizAttempts": saved_attempts,
        "assignments": assignments,
        "weeklyProgress": student["weeklyProgress"],
        "conceptMastery": concept_mastery,
        "gaps": gaps,
        "supportIndicator": support_indicator,
        "rules": {
            "masteryThreshold": MASTERY_GAP_THRESHOLD,
            "quizThreshold": QUIZ_GAP_THRESHOLD,
            "supportThreshold": SUPPORT_CONCEPT_THRESHOLD,
        },
    }


@app.post("/api/concept-helper")
def concept_helper(payload: ConceptHelperInput):
    if not payload.conceptId.strip():
        raise HTTPException(status_code=400, detail="Choose a concept first.")
    if not payload.studentId.strip():
        raise HTTPException(status_code=400, detail="Choose a demo student first.")
    if payload.action == "feedback" and not (payload.question or "").strip():
        raise HTTPException(status_code=400, detail="Enter the quiz question.")
    if payload.action == "feedback" and not (payload.answer or "").strip():
        raise HTTPException(status_code=400, detail="Enter your answer.")
    for name, value, limit in (
        ("Question", payload.question or "", 2000),
        ("Answer", payload.answer or "", 4000),
        ("Expected answer", payload.expectedAnswer or "", 4000),
    ):
        if len(value) > limit:
            raise HTTPException(
                status_code=400,
                detail=f"{name} must be {limit} characters or fewer.",
            )

    data = load_demo_data()
    concept = next(
        (item for item in data["concepts"] if item["id"] == payload.conceptId),
        None,
    )
    if concept is None:
        raise HTTPException(status_code=404, detail="Concept not found in the knowledge graph.")

    performance = student_performance(payload.studentId)
    mastery_item = next(
        (
            item
            for item in performance["conceptMastery"]
            if item["conceptId"] == payload.conceptId
        ),
        None,
    )
    gap = next(
        (item for item in performance["gaps"] if item["conceptId"] == payload.conceptId),
        None,
    )
    learner_context = {
        "mastery": mastery_item["mastery"] if mastery_item else None,
        "status": mastery_item["status"] if mastery_item else "Not assessed",
        "gap": gap,
        "relevant_resources": concept.get("materials", []),
    }

    try:
        provider = get_concept_helper_provider()
        result = provider.generate(
            action=payload.action,
            concept=concept,
            learner_context=learner_context,
            question=(payload.question or "").strip(),
            answer=(payload.answer or "").strip(),
            expected_answer=(payload.expectedAnswer or "").strip(),
        )
    except ProviderConfigurationError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except ProviderError as error:
        raise HTTPException(status_code=502, detail=str(error)) from error

    return {
        "action": payload.action,
        "concept": concept["name"],
        "provider": provider.name,
        "result": result,
    }

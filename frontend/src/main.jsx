import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const sections = [
  { label: "Learning Impact", icon: "↗" },
  { label: "Student Dashboard", icon: "⌂" },
  { label: "Learning Path", icon: "↗" },
  { label: "Concept Explorer", icon: "◎" },
  { label: "Performance", icon: "▥" },
  { label: "Faculty Dashboard", icon: "◉" }
];

const defaultOverview = {
  student: {
    id: "student-001",
    name: "Alex Morgan",
    program: "Computer Science",
    year: 2,
    track: "Applied Data & Systems",
    advisor: "Dr. Lin Chen"
  },
  dashboard: {
    date: "Monday, October 26",
    metrics: [
      { label: "Overall progress", value: 78, suffix: "%", trend: "+6% this month", tone: "purple", icon: "↗" },
      { label: "Concepts mastered", value: 18, suffix: " / 24", trend: "Across 3 subjects", tone: "green", icon: "◎" },
      { label: "Focus areas", value: 3, suffix: "", trend: "Ready for attention", tone: "amber", icon: "✦" },
      { label: "Learning this week", value: 6.5, suffix: " hrs", trend: "On track with your goal", tone: "blue", icon: "◷" }
    ],
    highlights: [
      "Quiz performance climbed after the algebra refresh module.",
      "You are on pace for a strong finish in programming fundamentals.",
      "Two concepts are flagged for reinforcement before the next assessment."
    ],
    schedule: [
      { title: "Discrete Math workshop", time: "Today · 2:00 PM", type: "Workshop" },
      { title: "Python lab review", time: "Wed · 10:15 AM", type: "Lab" },
      { title: "Office hours with faculty", time: "Fri · 11:00 AM", type: "Support" }
    ]
  },
  learningPath: {
    summary: "Strong foundation. Focus on the next two concepts that unlock the strongest carryover into the next module.",
    recommended: [
      { id: "limits", title: "Limits and continuity", status: "Next up", length: "20 min", reason: "Improves your comfort with function behavior and prepares you for derivatives." },
      { id: "recursion", title: "Recursion patterns", status: "Priority", length: "25 min", reason: "You have strong algorithmic basics and a small gap in recursive decomposition." },
      { id: "probability", title: "Probability basics", status: "Suggested", length: "15 min", reason: "This concept connects to your recent statistics module and supports applied reasoning." }
    ],
    milestones: [
      { title: "Functions & graphs", state: "Complete", note: "Foundation review complete" },
      { title: "Limits and continuity", state: "Next", note: "20 min practice set" },
      { title: "Intro to derivatives", state: "Queued", note: "Builds on current concept" }
    ],
    resources: [
      { title: "Short concept recap", type: "Video" },
      { title: "Practice worksheet", type: "Exercise" },
      { title: "Peer discussion notes", type: "Study guide" }
    ]
  },
  concepts: [
    {
      id: "functions",
      name: "Functions & Graphs",
      subject: "Mathematics",
      mastery: 87,
      status: "Strong",
      description: "Translate between equations, graphs, and real-world scenarios.",
      prerequisites: ["Algebra review", "Coordinate plane"],
      materials: ["Graph exploration guide", "Worked examples"],
      connections: ["Limits and continuity", "Probability basics"]
    },
    {
      id: "recursion",
      name: "Recursion Patterns",
      subject: "Programming",
      mastery: 64,
      status: "Needs support",
      description: "Break a problem into smaller self-similar steps and trace recursive calls.",
      prerequisites: ["Function calls", "Control flow"],
      materials: ["Trace tree walkthrough", "Code challenge set"],
      connections: ["Data structures", "Algorithms"]
    },
    {
      id: "probability",
      name: "Probability Basics",
      subject: "Statistics",
      mastery: 78,
      status: "Stable",
      description: "Reason with chance, sample space, and expected outcomes.",
      prerequisites: ["Fractions", "Percent reasoning"],
      materials: ["Probability deck", "Scenario refresher"],
      connections: ["Functions & graphs", "Data modeling"]
    },
    {
      id: "arrays",
      name: "Arrays & Lists",
      subject: "Programming",
      mastery: 82,
      status: "Strong",
      description: "Manipulate ordered collections and choose the right data structure.",
      prerequisites: ["Variable scope", "Iteration"],
      materials: ["Array patterns", "Lab notebook"],
      connections: ["Recursion patterns", "Sorting logic"]
    },
    {
      id: "derivatives",
      name: "Intro to Derivatives",
      subject: "Mathematics",
      mastery: 71,
      status: "Developing",
      description: "Interpret instantaneous change and connect slopes to real-world motion.",
      prerequisites: ["Limits and continuity", "Rate of change"],
      materials: ["Slope lab", "Worked derivation set"],
      connections: ["Functions & graphs", "Modeling with data"]
    }
  ],
  performance: {
    summary: [
      { label: "Quiz average", value: 86, suffix: "%", change: "+9 pts" },
      { label: "Assignment completion", value: 92, suffix: "%", change: "+4 pts" },
      { label: "Attendance", value: 95, suffix: "%", change: "Above target" },
      { label: "Time on task", value: 6.5, suffix: " hrs", change: "+1.2 hrs" }
    ],
    subjects: [
      { name: "Programming", score: 88, trend: "+7%" },
      { name: "Data Structures", score: 72, trend: "+3%" },
      { name: "Discrete Math", score: 81, trend: "+5%" },
      { name: "Statistics", score: 76, trend: "+2%" }
    ],
    assignments: [
      { title: "Data structures quiz", score: 92, status: "Strong" },
      { title: "Probability worksheet", score: 76, status: "Review" },
      { title: "Programming lab 3", score: 89, status: "Strong" }
    ],
    alerts: [
      "Recursion exercises are below the class median.",
      "Probability explanations need more structured practice before the next check-in.",
      "Attendance is solid; no immediate concern is present."
    ]
  },
  faculty: {
    classSummary: {
      cohortSize: 28,
      onTrack: 19,
      needingSupport: 5,
      avgMastery: 79
    },
    students: [
      { name: "Alex Morgan", risk: "Low", mastery: 79, support: "Monitor recursion review" },
      { name: "Priya Shah", risk: "Medium", mastery: 68, support: "Schedule check-in" },
      { name: "Lucas Green", risk: "High", mastery: 61, support: "Intervention suggested" },
      { name: "Maya Ortiz", risk: "Low", mastery: 82, support: "Advance to next module" }
    ],
    alerts: [
      "Probability topics remain the largest source of variance in section A.",
      "Three students show declining assignment completion after week 4.",
      "Recommended intervention: targeted practice bundles for recursion and graph reasoning."
    ],
    interventions: [
      { title: "Small-group recursion lab", detail: "2 sessions · 12 students targeted" },
      { title: "Weekly office hour follow-up", detail: "Faculty and peer mentoring" },
      { title: "Adaptive review path", detail: "Personalized practice for at-risk concepts" }
    ]
  }
};

function buildLearningPath(concepts, performance) {
  const availableConcepts = Array.isArray(concepts) ? concepts : [];
  const conceptById = new Map(availableConcepts.map((concept) => [concept.id, concept]));
  const masteryById = new Map(
    (performance?.conceptMastery || []).map((item) => [item.conceptId, item.mastery])
  );
  const gaps = Array.isArray(performance?.gaps) ? performance.gaps : [];
  const gapById = new Map(gaps.map((gap) => [gap.conceptId, gap]));
  const masteryThreshold = performance?.rules?.masteryThreshold ?? 70;
  const quizThreshold = performance?.rules?.quizThreshold ?? 65;
  const prerequisiteReviewThreshold = 80;
  const normalize = (value) => String(value || "").trim().toLowerCase();

  const masteryFor = (concept) => {
    const mastery = masteryById.has(concept.id)
      ? masteryById.get(concept.id)
      : performance ? null : concept.mastery;
    return Number.isFinite(mastery) ? mastery : null;
  };

  const prerequisiteEdgesFor = (concept) => {
    const mapped = new Map();
    const unmapped = [];
    const addById = (id) => {
      const prerequisite = conceptById.get(id);
      if (prerequisite) mapped.set(prerequisite.id, prerequisite);
      else if (id) unmapped.push(`Concept id "${id}" is not available in the graph`);
    };
    (Array.isArray(concept.prerequisiteIds) ? concept.prerequisiteIds : [])
      .forEach(addById);
    (Array.isArray(concept.prerequisites) ? concept.prerequisites : []).forEach((label) => {
      const prerequisite = availableConcepts.find(
        (candidate) => normalize(candidate.id) === normalize(label)
          || normalize(candidate.name) === normalize(label)
      );
      if (prerequisite) mapped.set(prerequisite.id, prerequisite);
      else if (label) unmapped.push(label);
    });
    return {
      mapped: [...mapped.values()],
      unmapped: [...new Set(unmapped)]
    };
  };

  const reasoningFor = (target) => {
    const prerequisites = [];
    const unmapped = new Set();
    const cycleEdges = new Set();
    const visited = new Set();
    const visiting = new Set();
    const visit = (concept) => {
      if (visiting.has(concept.id)) return;
      if (visited.has(concept.id)) return;
      visiting.add(concept.id);
      const edges = prerequisiteEdgesFor(concept);
      edges.unmapped.forEach((label) => unmapped.add(label));
      edges.mapped.forEach((prerequisite) => {
        if (visiting.has(prerequisite.id)) {
          cycleEdges.add(`${concept.name} → ${prerequisite.name}`);
          return;
        }
        visit(prerequisite);
      });
      visiting.delete(concept.id);
      visited.add(concept.id);
      if (concept.id !== target.id) prerequisites.push(concept);
    };
    visit(target);
    return {
      target: {
        id: target.id,
        name: target.name,
        mastery: masteryFor(target),
        evidence: gapById.get(target.id)?.evidence || []
      },
      prerequisites: prerequisites.map((concept) => {
        const mastery = masteryFor(concept);
        return {
          id: concept.id,
          name: concept.name,
          mastery,
          needsReview: mastery === null || mastery < prerequisiteReviewThreshold,
          evidence: gapById.get(concept.id)?.evidence || []
        };
      }),
      unmappedPrerequisites: [...unmapped],
      cycleEdges: [...cycleEdges]
    };
  };

  const rankedGaps = gaps
    .map((gap) => ({ gap, concept: conceptById.get(gap.conceptId) }))
    .filter((item) => item.concept)
    .sort((left, right) => {
      const masteryDifference = (left.gap.mastery ?? 101) - (right.gap.mastery ?? 101);
      if (masteryDifference) return masteryDifference;
      const quizDifference = (left.gap.quizAverage ?? 101) - (right.gap.quizAverage ?? 101);
      return quizDifference || left.concept.id.localeCompare(right.concept.id);
    });
  const fallback = rankedGaps.length === 0;
  const targets = fallback
    ? [...availableConcepts]
      .sort((left, right) =>
        (masteryFor(left) ?? 101) - (masteryFor(right) ?? 101)
        || left.id.localeCompare(right.id)
      )
      .slice(0, 1)
      .map((concept) => ({ concept, gap: null }))
    : rankedGaps;
  const ordered = [];
  const added = new Set();
  const visiting = new Set();
  const targetReasoning = new Map(targets.map(({ concept }) => [concept.id, reasoningFor(concept)]));

  const addWithPrerequisites = (concept, targetConcept, isTarget) => {
    if (added.has(concept.id) || visiting.has(concept.id)) return;
    visiting.add(concept.id);
    prerequisiteEdgesFor(concept).mapped.forEach((prerequisite) => {
      if (visiting.has(prerequisite.id)) return;
      const mastery = masteryFor(prerequisite);
      if (mastery === null || mastery < prerequisiteReviewThreshold) {
        addWithPrerequisites(prerequisite, targetConcept, false);
      }
    });
    visiting.delete(concept.id);
    if (added.has(concept.id)) return;
    added.add(concept.id);

    const mastery = masteryFor(concept);
    const gap = gapById.get(concept.id);
    const targetGap = gap || (isTarget ? targets.find((item) => item.concept.id === concept.id)?.gap : null);
    const quizAverage = targetGap?.quizAverage ?? null;
    const edges = prerequisiteEdgesFor(concept);
    const prerequisiteNames = edges.mapped.map((item) => item.name);
    const unmappedPrerequisites = edges.unmapped;
    let reason;
    if (gap) {
      const evidence = [];
      if (mastery !== null && mastery < masteryThreshold) {
        evidence.push(`${mastery}% mastery is below ${masteryThreshold}%`);
      }
      if (quizAverage !== null && quizAverage < quizThreshold) {
        evidence.push(`${quizAverage}% quiz average is below ${quizThreshold}%`);
      }
      const satisfiedPrerequisites = edges.mapped
        .filter((prerequisite) => {
          const prerequisiteMastery = masteryFor(prerequisite);
          return prerequisiteMastery !== null
            && prerequisiteMastery >= prerequisiteReviewThreshold;
        })
        .map((prerequisite) => `${prerequisite.name} (${masteryFor(prerequisite)}%)`);
      reason = evidence.length
        ? `Prioritized because ${evidence.join(" and ")}.${satisfiedPrerequisites.length ? ` ${satisfiedPrerequisites.join(", ")} meet the ${prerequisiteReviewThreshold}% prerequisite review threshold.` : ""}`
        : "Prioritized because this concept is identified as a knowledge gap.";
    } else if (!isTarget) {
      reason = `Review this mapped prerequisite before ${targetConcept.name}; ${mastery === null ? "current mastery is not available" : `current mastery is ${mastery}%`}, below the ${prerequisiteReviewThreshold}% review threshold.`;
    } else if (fallback && gaps.length) {
      reason = "The detected gap is not mapped to an available concept, so this is the lowest-mastery concept currently in the graph.";
    } else if (fallback) {
      reason = `No mapped gaps are available; continue with the lowest-mastery concept in the graph (${mastery ?? "no"}% mastery).`;
    } else {
      reason = mastery === null
        ? `No student mastery is available for this concept; continue with it while prerequisite evidence is incomplete.`
        : `This concept is at ${mastery}%; prerequisite reviews are inserted only below ${prerequisiteReviewThreshold}%.`;
    }

    ordered.push({
      id: concept.id,
      title: concept.name,
      subject: concept.subject || "Concept",
      mastery,
      quizAverage,
      status: gap ? "Gap focus" : isTarget ? "Continue practice" : "Prerequisite review",
      reason,
      why: gap
        ? `This recommendation follows the selected student's gap evidence: ${(gap.evidence || []).join(" ")}`
        : reason,
      resources: (Array.isArray(concept.materials) ? concept.materials : [])
        .filter((resource) => typeof resource === "string" && resource.trim()),
      prerequisites: prerequisiteNames,
      unmappedPrerequisites,
      targetConcept: targetConcept.name,
      reasoning: {
        ...(targetReasoning.get(targetConcept.id) || reasoningFor(targetConcept)),
        recommendation: {
          id: concept.id,
          name: concept.name,
          mastery,
          status: gap ? "Gap focus" : isTarget ? "Continue practice" : "Prerequisite review"
        }
      }
    });
  };

  targets.forEach(({ concept }) => addWithPrerequisites(concept, concept, true));
  targets.forEach(({ concept }) => {
    const targetRecommendation = ordered.find((item) => item.id === concept.id);
    if (targetRecommendation) {
      targetRecommendation.reasoning = {
        ...targetReasoning.get(concept.id),
        recommendation: {
          id: concept.id,
          name: concept.name,
          mastery: masteryFor(concept),
          status: gapById.has(concept.id) ? "Gap focus" : "Continue practice"
        }
      };
    }
  });
  return ordered.map((item, index) => ({ ...item, position: index + 1 }));
}

function App() {
  const [active, setActive] = React.useState("Learning Impact");
  const [demoRole, setDemoRole] = React.useState("Student");

  React.useEffect(() => {
    setActive("Learning Impact");
  }, [demoRole]);

  const [status, setStatus] = React.useState("Connecting to demo data…");
  const [overview, setOverview] = React.useState(defaultOverview);
  const [selectedConcept, setSelectedConcept] = React.useState(defaultOverview.concepts[0].id);
  const [demoStudents, setDemoStudents] = React.useState([defaultOverview.student]);
  const [selectedStudentId, setSelectedStudentId] = React.useState(defaultOverview.student.id);
  const [studentPerformance, setStudentPerformance] = React.useState(null);
  const [performanceLoading, setPerformanceLoading] = React.useState(true);
  const [performanceError, setPerformanceError] = React.useState("");
  const [facultySubject, setFacultySubject] = React.useState("");
  const [facultyConcept, setFacultyConcept] = React.useState("");
  const [facultyAnalytics, setFacultyAnalytics] = React.useState(null);
  const [facultyAnalyticsLoading, setFacultyAnalyticsLoading] = React.useState(false);
  const [facultyAnalyticsError, setFacultyAnalyticsError] = React.useState("");
  const [selectedFacultyStudentId, setSelectedFacultyStudentId] = React.useState("");
  const [selectedRecommendationId, setSelectedRecommendationId] = React.useState(null);
  const [helperMode, setHelperMode] = React.useState("explain");
  const [helperQuestion, setHelperQuestion] = React.useState("");
  const [helperAnswer, setHelperAnswer] = React.useState("");
  const [helperExpectedAnswer, setHelperExpectedAnswer] = React.useState("");
  const [helperResponse, setHelperResponse] = React.useState(null);
  const [helperError, setHelperError] = React.useState("");
  const [helperLoading, setHelperLoading] = React.useState(false);
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizMasteryRule, setQuizMasteryRule] = React.useState(null);
  const [selectedQuizId, setSelectedQuizId] = React.useState("");
  const [selectedQuizAnswer, setSelectedQuizAnswer] = React.useState("");
  const [quizLoading, setQuizLoading] = React.useState(true);
  const [quizSubmitting, setQuizSubmitting] = React.useState(false);
  const [quizError, setQuizError] = React.useState("");
  const [quizResult, setQuizResult] = React.useState(null);
  const helperRequestId = React.useRef(0);

  React.useEffect(() => {
    fetch("/api/overview")
      .then((response) => {
        if (!response.ok) throw new Error("Backend is unavailable");
        return response.json();
      })
      .then((data) => {
        const merged = { ...defaultOverview, ...data };
        merged.dashboard = { ...defaultOverview.dashboard, ...(data.dashboard || {}) };
        merged.learningPath = { ...defaultOverview.learningPath, ...(data.learningPath || {}) };
        merged.performance = { ...defaultOverview.performance, ...(data.performance || {}) };
        merged.faculty = { ...defaultOverview.faculty, ...(data.faculty || {}) };
        merged.concepts = Array.isArray(data.concepts) && data.concepts.length ? data.concepts : defaultOverview.concepts;
        setOverview(merged);
        setSelectedConcept(merged.concepts[0].id);
        setStatus("Connected to fictional demo data");
      })
      .catch(() => {
        setOverview(defaultOverview);
        setSelectedConcept(defaultOverview.concepts[0].id);
        setStatus("Using offline fictional demo data");
      });
  }, []);

  React.useEffect(() => {
    let current = true;
    fetch("/api/students")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load demo students");
        return response.json();
      })
      .then((data) => {
        if (!current) return;
        if (!Array.isArray(data) || !data.length) throw new Error("No demo students are available");
        setDemoStudents(data);
        if (!data.some((student) => student.id === selectedStudentId)) {
          setSelectedStudentId(data[0].id);
        }
      })
      .catch((error) => {
        if (current) setPerformanceError(error.message);
      });
    return () => { current = false; };
  }, []);

  React.useEffect(() => {
    let current = true;
    fetch("/api/quiz-questions")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load the demo quiz");
        return response.json();
      })
      .then((data) => {
        if (!current) return;
        const questions = Array.isArray(data.questions) ? data.questions : [];
        setQuizQuestions(questions);
        setQuizMasteryRule(data.masteryRule || null);
        setSelectedQuizId(questions[0]?.id || "");
      })
      .catch((error) => {
        if (current) setQuizError(error.message || "Could not load quiz questions.");
      })
      .finally(() => {
        if (current) setQuizLoading(false);
      });
    return () => { current = false; };
  }, []);

  React.useEffect(() => {
    setSelectedQuizAnswer("");
    setQuizResult(null);
    setQuizError("");
  }, [selectedStudentId]);

  React.useEffect(() => {
    let current = true;
    setPerformanceLoading(true);
    setPerformanceError("");
    fetch(`/api/performance/${encodeURIComponent(selectedStudentId)}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load this student's demo performance");
        return response.json();
      })
      .then((data) => {
        if (current) setStudentPerformance(data);
      })
      .catch((error) => {
        if (current) {
          setStudentPerformance(null);
          setPerformanceError(error.message);
        }
      })
      .finally(() => {
        if (current) setPerformanceLoading(false);
      });
    return () => { current = false; };
  }, [selectedStudentId]);

  React.useEffect(() => {
    if (active !== "Faculty Dashboard" && !(active === "Learning Impact" && demoRole === "Faculty")) return undefined;
    let current = true;
    const params = new URLSearchParams();
    if (facultySubject) params.set("subject", facultySubject);
    if (facultyConcept) params.set("concept", facultyConcept);
    setFacultyAnalyticsLoading(true);
    setFacultyAnalyticsError("");
    fetch(`/api/faculty-analytics?${params.toString()}`)
      .then((response) => response.json().then((data) => {
        if (!response.ok) {
          throw new Error(typeof data.detail === "string" ? data.detail : "Could not load faculty analytics.");
        }
        return data;
      }))
      .then((data) => {
        if (current) setFacultyAnalytics(data);
      })
      .catch((error) => {
        if (current) {
          setFacultyAnalytics(null);
          setFacultyAnalyticsError(error.message || "Could not load faculty analytics.");
        }
      })
      .finally(() => {
        if (current) setFacultyAnalyticsLoading(false);
      });
    return () => { current = false; };
  }, [active, demoRole, facultySubject, facultyConcept]);

  React.useEffect(() => {
    setSelectedFacultyStudentId("");
  }, [facultySubject, facultyConcept]);

  React.useEffect(() => {
    setSelectedRecommendationId(null);
    helperRequestId.current += 1;
    setHelperLoading(false);
    setHelperResponse(null);
    setHelperError("");
  }, [selectedStudentId]);

  const performanceConcepts = (overview.concepts || defaultOverview.concepts).map((concept) => {
    const studentConcept = studentPerformance?.conceptMastery?.find((item) => item.conceptId === concept.id);
    const mastery = studentConcept?.mastery ?? concept.mastery;
    return {
      ...concept,
      mastery,
      status: mastery < 70 ? "Needs support" : mastery < 80 ? "Developing" : "Strong"
    };
  });
  const currentStudentPerformance = studentPerformance?.student.id === selectedStudentId
    ? studentPerformance
    : null;
  const recommendations = buildLearningPath(overview.concepts, currentStudentPerformance);
  const prerequisiteProgress = Array.from(new Map(
    recommendations.flatMap((item) =>
      (item.reasoning?.prerequisites || []).map((prerequisite) => [
        prerequisite.id,
        { ...prerequisite, targetName: item.reasoning.target.name }
      ])
    )
  ).values()).slice(0, 5);
  const selectedRecommendation = recommendations.find((item) => item.id === selectedRecommendationId)
    || recommendations[0];
  const selectedHelperConcept = performanceConcepts.find((item) => item.id === selectedConcept);
  const selectedConceptGap = currentStudentPerformance?.gaps.find(
    (gap) => gap.conceptId === selectedConcept
  );

  const chooseConcept = (conceptId) => {
    helperRequestId.current += 1;
    setHelperLoading(false);
    setSelectedConcept(conceptId);
    setHelperResponse(null);
    setHelperError("");
  };

  const chooseHelperMode = (mode) => {
    helperRequestId.current += 1;
    setHelperLoading(false);
    setHelperMode(mode);
    setHelperResponse(null);
    setHelperError("");
  };

  const submitConceptHelp = async (event, action = helperMode, conceptId = selectedConcept) => {
    if (event) event.preventDefault();
    if (!conceptId) {
      setHelperError("Choose a concept from the graph or learning path first.");
      return;
    }
    if (action === "feedback" && !helperQuestion.trim()) {
      setHelperError("Enter the quiz question.");
      return;
    }
    if (action === "feedback" && !helperAnswer.trim()) {
      setHelperError("Enter your answer.");
      return;
    }

    const requestId = ++helperRequestId.current;
    setHelperLoading(true);
    setHelperError("");
    setHelperResponse(null);
    try {
      const response = await fetch("/api/concept-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          conceptId,
          studentId: selectedStudentId,
          question: helperQuestion,
          answer: helperAnswer,
          expectedAnswer: helperExpectedAnswer
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data.detail === "string" ? data.detail : "The concept helper could not respond.");
      }
      if (requestId === helperRequestId.current) setHelperResponse(data);
    } catch (error) {
      if (requestId === helperRequestId.current) {
        setHelperError(error.message || "Could not reach the concept helper. Check that the backend is running.");
      }
    } finally {
      if (requestId === helperRequestId.current) setHelperLoading(false);
    }
  };

  const submitQuizAttempt = async (event) => {
    event.preventDefault();
    if (!selectedStudentId) {
      setQuizError("Choose a demo student before submitting an attempt.");
      return;
    }
    if (!selectedQuizId) {
      setQuizError("Choose a quiz question first.");
      return;
    }
    if (selectedQuizAnswer === "") {
      setQuizError("Select one answer before submitting.");
      return;
    }
    if (!currentStudentPerformance) {
      setQuizError("Wait for this student's performance data to load, then try again.");
      return;
    }

    const question = quizQuestions.find((item) => item.id === selectedQuizId);
    if (!question) {
      setQuizError("That quiz question is no longer available. Reload the page.");
      return;
    }

    const previousPath = recommendations.map((item) => item.id);
    const previousGapIds = currentStudentPerformance.gaps.map((item) => item.conceptId);
    setQuizSubmitting(true);
    setQuizError("");
    setQuizResult(null);
    try {
      const response = await fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudentId,
          questionId: selectedQuizId,
          answerIndex: Number(selectedQuizAnswer)
        })
      });
      const result = await response.json();
      if (!response.ok) {
        const detail = Array.isArray(result.detail)
          ? result.detail.map((issue) => issue.msg).join(" ")
          : result.detail;
        throw new Error(typeof detail === "string" ? detail : "The quiz attempt could not be submitted.");
      }

      const performanceResponse = await fetch(`/api/performance/${encodeURIComponent(selectedStudentId)}`);
      const updatedPerformance = await performanceResponse.json();
      if (!performanceResponse.ok) {
        throw new Error(typeof updatedPerformance.detail === "string" ? updatedPerformance.detail : "The updated performance could not be loaded.");
      }
      setStudentPerformance(updatedPerformance);
      const updatedRecommendations = buildLearningPath(overview.concepts, updatedPerformance);
      const updatedPath = updatedRecommendations.map((item) => item.id);
      const updatedGapIds = updatedPerformance.gaps.map((item) => item.conceptId);
      const pathChanged = JSON.stringify(previousPath) !== JSON.stringify(updatedPath);
      const gainedGaps = updatedGapIds.filter((id) => !previousGapIds.includes(id));
      const resolvedGaps = previousGapIds.filter((id) => !updatedGapIds.includes(id));
      const previousQuizScores = currentStudentPerformance.quizzes
        .filter((item) => item.conceptId === result.conceptId)
        .map((item) => item.score);
      const updatedQuizScores = updatedPerformance.quizzes
        .filter((item) => item.conceptId === result.conceptId)
        .map((item) => item.score);
      const previousQuizAverage = previousQuizScores.length
        ? Math.round(previousQuizScores.reduce((total, score) => total + score, 0) / previousQuizScores.length)
        : null;
      const updatedQuizAverage = updatedQuizScores.length
        ? Math.round(updatedQuizScores.reduce((total, score) => total + score, 0) / updatedQuizScores.length)
        : null;
      let pathReason = pathChanged
        ? "The existing gap detector and recommendation engine recalculated the ranked gaps and prerequisite sequence."
        : "The existing gap detector and recommendation engine recalculated the evidence; the same sequence remains highest priority.";
      pathReason = `${result.conceptName} mastery changed from ${result.attempt.previousMastery}% to ${result.attempt.updatedMastery}%; its linked quiz average changed from ${previousQuizAverage ?? "not available"}% to ${updatedQuizAverage ?? "not available"}%. A gap is flagged below ${updatedPerformance.rules.masteryThreshold}% mastery or below ${updatedPerformance.rules.quizThreshold}% quiz average. ${pathReason}`;
      if (gainedGaps.length) pathReason += ` Newly flagged: ${gainedGaps.map((id) => overview.concepts.find((item) => item.id === id)?.name || id).join(", ")}.`;
      if (resolvedGaps.length) pathReason += ` No longer flagged: ${resolvedGaps.map((id) => overview.concepts.find((item) => item.id === id)?.name || id).join(", ")}.`;
      if (pathChanged) {
        pathReason += ` Previous order: ${previousPath.map((id) => overview.concepts.find((item) => item.id === id)?.name || id).join(" → ") || "none"}. Updated order: ${updatedPath.map((id) => overview.concepts.find((item) => item.id === id)?.name || id).join(" → ") || "none"}.`;
      }
      setQuizResult({
        ...result,
        previousPath,
        updatedPath,
        previousGapCount: previousGapIds.length,
        updatedGapCount: updatedGapIds.length,
        pathChanged,
        pathReason
      });
      setSelectedQuizAnswer("");
    } catch (error) {
      setQuizError(error.message || "Could not submit this quiz attempt. Check that the backend is running.");
    } finally {
      setQuizSubmitting(false);
    }
  };

  const renderMetricCards = (items) => (
    <section className="metric-grid" aria-label="Academic snapshot">
      {items.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <span className={`metric-icon ${metric.tone}`}>{metric.icon}</span>
          <span className="metric-label">{metric.label}</span>
          <strong>
            {metric.value}
            {metric.suffix && <span>{metric.suffix}</span>}
          </strong>
          <small className={metric.trend.includes("+") || metric.trend.includes("On track") ? "positive" : ""}>{metric.trend}</small>
        </article>
      ))}
    </section>
  );

  const studentDashboard = (
    <>
      <section className="welcome">
        <div>
          <p className="eyebrow">{overview.dashboard.date.toUpperCase()}</p>
          <h1>Your learning, connected.</h1>
          <p className="welcome-copy">A clear view of your progress, with the next step always in reach.</p>
        </div>
        <div className="student-chip">
          <span className="avatar">AM</span>
          <span>
            <b>{overview.student.name}</b>
            <small>{overview.student.program} · Year {overview.student.year}</small>
          </span>
        </div>
      </section>

      <section className="status-card" aria-live="polite">
        <span className="status-dot" />
        <span>{status}</span>
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">YOUR SNAPSHOT</p>
          <h2>Welcome back, {overview.student.name.split(" ")[0]}</h2>
        </div>
        <span className="term-label">Fall term · 2026</span>
      </section>

      {renderMetricCards(overview.dashboard.metrics || defaultOverview.dashboard.metrics)}

      <section className="lower-grid">
        <article className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">KEEP IT MOVING</p>
              <h3>Your learning path</h3>
            </div>
            <button className="text-button" onClick={() => setActive("Learning Path")}>View path <span>→</span></button>
          </div>
          <p className="panel-copy">A few focused steps can strengthen your understanding.</p>
          {(overview.learningPath.milestones || defaultOverview.learningPath.milestones).map((item, index) => (
            <div className="path-step" key={item.title}>
              <span className={`step-number ${item.state === "Complete" ? "done" : index === 1 ? "current" : ""}`}>{item.state === "Complete" ? "✓" : index + 1}</span>
              <div>
                <b>{item.title}</b>
                <small>{item.note}</small>
              </div>
              {item.state === "Complete" && <span className="step-tag complete">Done</span>}
              {item.state === "Next" && <span className="step-tag next">Next up</span>}
            </div>
          ))}
        </article>

        <article className="panel mastery-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CONCEPT MASTERY</p>
              <h3>How topics are feeling</h3>
            </div>
            <button className="more-button" aria-label="More mastery options">···</button>
          </div>
          {performanceConcepts.slice(0, 3).map((concept, index) => (
            <div className="mastery-row" key={concept.id}>
              <div>
                <b>{concept.subject}</b>
                <small>{concept.mastery}% mastery</small>
              </div>
              <div className="bar"><span style={{ width: `${concept.mastery}%` }} /></div>
              <strong>{concept.mastery}%</strong>
            </div>
          ))}
          <div className="tip-box">
            <span>✦</span>
            <p><b>A small nudge:</b> Revisiting recursion could help unlock your next data structures topic.</p>
          </div>
        </article>
      </section>

      <section className="info-grid panel-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">TODAY</p>
              <h3>Weekly rhythm</h3>
            </div>
          </div>
          <ul className="bullet-list">
            {(overview.dashboard.schedule || defaultOverview.dashboard.schedule).map((item) => (
              <li key={item.title}>
                <span className="list-pill">{item.type}</span>
                <div>
                  <b>{item.title}</b>
                  <small>{item.time}</small>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">SIGNALS</p>
              <h3>Momentum</h3>
            </div>
          </div>
          <ul className="bullet-list plain">
            {(overview.dashboard.highlights || defaultOverview.dashboard.highlights).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );

  const learningPathPage = (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">LEARNING PATH</p>
          <h2>{currentStudentPerformance?.student.name || demoStudents.find((student) => student.id === selectedStudentId)?.name || "Demo student"}: next moves</h2>
        </div>
        <label className="student-select">
          <span>Demo student</span>
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
            aria-label="Select demo student for recommendations"
            disabled={quizSubmitting}
          >
            {demoStudents.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="estimate-note" role="note">
        <strong>Personalized using local demo rules — no live AI or LLM is used.</strong>
        <span>Gap concepts are ordered by lower mastery, then lower quiz average. Mapped prerequisites below 80% mastery (or without a score) are reviewed first; missing links are shown, not invented.</span>
      </section>

      <section className="panel adaptive-quiz">
        <div className="panel-heading">
          <div><p className="eyebrow">QUIZ-TO-MASTERY</p><h3>Practice a graph concept</h3></div>
          <span className="mini-tag">Fictional demo quiz</span>
        </div>
        <p className="panel-copy">
          {quizMasteryRule
            ? `Mastery rule: ${Math.round(quizMasteryRule.oldMasteryWeight * 100)}% previous mastery + ${Math.round(quizMasteryRule.attemptScoreWeight * 100)}% attempt score (correct = 100, incorrect = 0).`
            : "A submitted answer updates only this demo student's concept mastery."}
        </p>
        {quizLoading ? (
          <p className="panel-copy" aria-live="polite">Loading fictional quiz questions…</p>
        ) : quizQuestions.length ? (
          <form className="adaptive-quiz-form" onSubmit={submitQuizAttempt}>
            <label className="student-select">
              <span>Question and linked concept</span>
              <select
                value={selectedQuizId}
                onChange={(event) => {
                  setSelectedQuizId(event.target.value);
                  setSelectedQuizAnswer("");
                  setQuizResult(null);
                  setQuizError("");
                }}
                disabled={quizSubmitting}
              >
                {quizQuestions.map((item) => (
                  <option value={item.id} key={item.id}>{item.conceptName}</option>
                ))}
              </select>
            </label>
            {(() => {
              const question = quizQuestions.find((item) => item.id === selectedQuizId);
              return question ? (
                <>
                  <h4>{question.prompt}</h4>
                  <fieldset className="quiz-options" disabled={quizSubmitting}>
                    <legend>Choose one answer</legend>
                    {question.options.map((option, index) => (
                      <label className="quiz-option" key={option}>
                        <input
                          type="radio"
                          name={`quiz-answer-${question.id}`}
                          value={index}
                          checked={selectedQuizAnswer === String(index)}
                          onChange={(event) => setSelectedQuizAnswer(event.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </fieldset>
                  <button className="helper-submit" type="submit" disabled={quizSubmitting || !currentStudentPerformance}>
                    {quizSubmitting ? "Submitting attempt…" : "Submit answer"}
                  </button>
                </>
              ) : <p className="panel-copy">No quiz question is selected.</p>;
            })()}
          </form>
        ) : (
          <p className="panel-copy">No quiz questions are currently available.</p>
        )}
        {quizError && <p className="helper-error" role="alert">{quizError}</p>}
        {quizResult && (
          <article className="quiz-result" aria-live="polite">
            <div className={`quiz-result-status ${quizResult.correct ? "correct" : "incorrect"}`}>
              {quizResult.correct ? "Correct answer" : "Not quite"}
            </div>
            <p>{quizResult.feedback}</p>
            <div className="quiz-mastery-change">
              <div><small>Previous mastery</small><strong>{quizResult.attempt.previousMastery}%</strong></div>
              <span aria-hidden="true">→</span>
              <div><small>Updated mastery</small><strong>{quizResult.attempt.updatedMastery}%</strong></div>
            </div>
            <p className="record-note">{quizResult.masteryRule}</p>
            <p className="record-note">
              Flagged gaps: {quizResult.previousGapCount} before → {quizResult.updatedGapCount} after.
            </p>
            <div className="detail-section">
              <h4>Why your learning path {quizResult.pathChanged ? "changed" : "stayed in this order"}</h4>
              <p className="quiz-path-reason">{quizResult.pathReason}</p>
            </div>
          </article>
        )}
        {!!currentStudentPerformance?.quizAttempts?.length && (
          <div className="quiz-history">
            <h4>Saved attempts for {currentStudentPerformance.student.name}</h4>
            {currentStudentPerformance.quizAttempts.slice(-3).reverse().map((attempt) => (
              <div className="assessment-row" key={attempt.id}>
                <div>
                  <b>{overview.concepts.find((item) => item.id === attempt.conceptId)?.name || attempt.conceptId}</b>
                  <small>{new Date(attempt.submittedAt).toLocaleString()}</small>
                </div>
                <strong>{attempt.correct ? "Correct" : "Review"} · {attempt.updatedMastery}%</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="two-column-grid recommendation-layout">
        <article className="panel">
          <div className="panel-heading">
            <div><p className="eyebrow">PERSONALIZED SEQUENCE</p><h3>Study in this order</h3></div>
          </div>
          {!currentStudentPerformance && performanceLoading ? (
            <p className="panel-copy" aria-live="polite">Refreshing this student's gap evidence…</p>
          ) : recommendations.length ? (
            <div className="stack-list">
              {recommendations.map((item) => (
                <article className={`recommendation-card ${selectedRecommendation?.id === item.id ? "selected" : ""}`} key={item.id}>
                  <div className="recommendation-header">
                    <span className="mini-tag">Step {item.position} · {item.status}</span>
                    <span>{item.mastery === null ? "Mastery unavailable" : `${item.mastery}% mastery`}</span>
                  </div>
                  <h4>{item.title}</h4>
                  <p className="recommendation-reason">{item.reason}</p>
                  <button
                    className="text-button why-button"
                    type="button"
                    onClick={() => {
                      chooseConcept(item.id);
                      chooseHelperMode("explain");
                      submitConceptHelp(null, "explain", item.id);
                    }}
                  >
                    Explain this concept <span>→</span>
                  </button>
                  <div className="recommended-resources">
                    <b>Linked resources</b>
                    {item.resources.length ? (
                      <ul>
                        {item.resources.map((resource) => <li key={resource}>{resource}</li>)}
                      </ul>
                    ) : (
                      <small>No learning resources are linked to this concept yet.</small>
                    )}
                  </div>
                  <button
                    className="text-button why-button"
                    onClick={() => setSelectedRecommendationId(item.id)}
                    aria-expanded={selectedRecommendation?.id === item.id}
                  >
                    Why this recommendation? <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="panel-copy">No concepts are currently available in the knowledge graph to recommend.</p>
          )}
        </article>

        <article className="panel recommendation-detail" aria-live="polite">
          <div className="panel-heading">
            <div><p className="eyebrow">RECOMMENDATION DETAILS</p><h3>Why this recommendation?</h3></div>
          </div>
          {selectedRecommendation ? (
            <>
              <span className="mini-tag">{selectedRecommendation.title}</span>
              <p className="recommendation-explanation">{selectedRecommendation.why}</p>
              {selectedRecommendation.reasoning && (
                <div className="detail-section">
                  <h4>Prerequisite reasoning chain</h4>
                  <ol className="reasoning-chain">
                    <li>
                      <b>Target concept · {selectedRecommendation.reasoning.target.name}</b>
                      <small>
                        {selectedRecommendation.reasoning.target.evidence.length
                          ? selectedRecommendation.reasoning.target.evidence.join(" ")
                          : selectedRecommendation.reasoning.target.mastery === null
                            ? "No student mastery evidence is available yet."
                            : `Current mastery: ${selectedRecommendation.reasoning.target.mastery}%.`}
                      </small>
                    </li>
                    {selectedRecommendation.reasoning.prerequisites.map((prerequisite) => (
                      <li key={prerequisite.id} className={prerequisite.needsReview ? "needs-review" : "mastery-met"}>
                        <b>Prerequisite · {prerequisite.name}</b>
                        <small>
                          {prerequisite.mastery === null
                            ? "Student mastery is unavailable; review is recommended until it is assessed."
                            : `Current mastery: ${prerequisite.mastery}%. ${prerequisite.needsReview
                              ? "Below the 80% review threshold, so study this before the target."
                              : "Meets the 80% review threshold."}`}
                          {prerequisite.evidence.length ? ` ${prerequisite.evidence.join(" ")}` : ""}
                        </small>
                      </li>
                    ))}
                    <li className="recommended-next">
                      <b>Recommended next · {selectedRecommendation.reasoning.recommendation.name}</b>
                      <small>
                        {selectedRecommendation.reasoning.recommendation.status}
                        {selectedRecommendation.reasoning.recommendation.mastery === null
                          ? " · mastery unavailable"
                          : ` · ${selectedRecommendation.reasoning.recommendation.mastery}% mastery`}
                      </small>
                    </li>
                  </ol>
                  {selectedRecommendation.reasoning.cycleEdges.length > 0 && (
                    <p className="missing-graph-note">
                      Circular graph link skipped to keep the path finite: {selectedRecommendation.reasoning.cycleEdges.join("; ")}.
                    </p>
                  )}
                </div>
              )}
              {selectedRecommendation.reasoning.unmappedPrerequisites.length > 0 && (
                <p className="missing-graph-note">
                  Not ordered: {selectedRecommendation.reasoning.unmappedPrerequisites.join(", ")} {selectedRecommendation.reasoning.unmappedPrerequisites.length === 1 ? "is" : "are"} not represented as concept nodes in the current graph.
                </p>
              )}
              <div className="detail-section">
                <h4>Relevant resources</h4>
                {selectedRecommendation.resources.length ? (
                  <ul>{selectedRecommendation.resources.map((resource) => <li key={resource}>{resource}</li>)}</ul>
                ) : (
                  <p className="record-note">No resources are linked yet; this concept remains listed so the gap is visible.</p>
                )}
              </div>
            </>
          ) : (
            <p className="panel-copy">Recommendation details will appear when graph concepts are available.</p>
          )}
        </article>
      </section>
      {conceptHelperPanel()}
    </>
  );

  function conceptHelperPanel() {
    return (
      <section className="panel concept-helper" aria-labelledby="concept-helper-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">CONCEPT HELPER</p>
          <h3 id="concept-helper-title">Learn it, then try it</h3>
        </div>
        {helperResponse && <span className="provider-badge">{helperResponse.provider}</span>}
      </div>
      <p className="panel-copy">
        Choose a graph or learning-path concept for a plain-language explanation or quiz feedback.
        Responses are labelled as a local demo or live provider.
      </p>
      {selectedConceptGap && (
        <p className="helper-context">
          Tailored to your current focus: {selectedConceptGap.evidence.join(" ")}
        </p>
      )}
      <form className="helper-form" onSubmit={(event) => submitConceptHelp(event)}>
        <label>
          Concept
          <select
            value={selectedConcept}
            onChange={(event) => chooseConcept(event.target.value)}
            disabled={!performanceConcepts.length}
          >
            {performanceConcepts.map((concept) => (
              <option key={concept.id} value={concept.id}>{concept.name}</option>
            ))}
          </select>
        </label>
        {!performanceConcepts.length && (
          <p className="helper-error">No concepts are currently available in the knowledge graph.</p>
        )}
        <div className="helper-mode" role="group" aria-label="Choose concept helper task">
          <button
            className={helperMode === "explain" ? "selected" : ""}
            type="button"
            onClick={() => chooseHelperMode("explain")}
          >
            Explain concept
          </button>
          <button
            className={helperMode === "feedback" ? "selected" : ""}
            type="button"
            onClick={() => chooseHelperMode("feedback")}
          >
            Quiz feedback
          </button>
        </div>
        {helperMode === "feedback" && (
          <>
            <label>
              Quiz question
              <textarea
                value={helperQuestion}
                onChange={(event) => setHelperQuestion(event.target.value)}
                maxLength={2000}
                rows={2}
                placeholder="What was the question?"
              />
            </label>
            <label>
              Your answer
              <textarea
                value={helperAnswer}
                onChange={(event) => setHelperAnswer(event.target.value)}
                maxLength={4000}
                rows={3}
                placeholder="Write your answer here"
              />
            </label>
            <label>
              Expected answer <span className="optional-label">(optional)</span>
              <textarea
                value={helperExpectedAnswer}
                onChange={(event) => setHelperExpectedAnswer(event.target.value)}
                maxLength={4000}
                rows={2}
                placeholder="Add the expected answer if you have it"
              />
            </label>
          </>
        )}
        <button className="helper-submit" type="submit" disabled={helperLoading || !selectedHelperConcept}>
          {helperLoading ? "Preparing response…" : helperMode === "explain" ? "Explain this concept" : "Review my answer"}
        </button>
      </form>
      {helperError && <p className="helper-error" role="alert">{helperError}</p>}
      {helperResponse && (
        <article className="helper-response" aria-live="polite">
          <span className="provider-badge">{helperResponse.provider}</span>
          {helperResponse.provider === "Local demo fallback" && (
            <p className="helper-demo-note">
              No AI model was called. Demo quiz feedback uses simple keyword overlap, not semantic grading.
            </p>
          )}
          <h4>{helperResponse.concept}</h4>
          <p>{helperResponse.result.summary}</p>
          {helperResponse.action === "explain" ? (
            <>
              <div className="helper-result-section">
                <h4>Example</h4>
                <p>{helperResponse.result.example}</p>
              </div>
              <div className="helper-result-section">
                <h4>Key takeaways</h4>
                <ul>
                  {helperResponse.result.takeaways.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </>
          ) : (
            <div className="helper-feedback-grid">
              <div><h4>What is correct</h4><p>{helperResponse.result.correct}</p></div>
              <div><h4>What is missing</h4><p>{helperResponse.result.missing}</p></div>
              <div><h4>How to improve</h4><p>{helperResponse.result.improve}</p></div>
            </div>
          )}
          {helperResponse.result.learningTip && (
            <p className="helper-context">{helperResponse.result.learningTip}</p>
          )}
        </article>
      )}
      </section>
    );
  }

  const conceptExplorer = (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">CONCEPT EXPLORER</p>
          <h2>Connected knowledge map</h2>
        </div>
        <span className="term-label">{performanceConcepts.length} concepts</span>
      </section>

      <section className="two-column-grid concept-grid">
        <article className="panel concept-panel">
          {performanceConcepts.map((concept) => (
            <button
              className={`concept-button ${selectedConcept === concept.id ? "selected" : ""}`}
              key={concept.id}
              onClick={() => chooseConcept(concept.id)}
            >
              <div className="concept-button-top">
                <span>{concept.name}</span>
                <strong>{concept.mastery}%</strong>
              </div>
              <small>{concept.subject}</small>
            </button>
          ))}
        </article>

        <article className="panel concept-detail">
          {(() => {
            const concept = performanceConcepts.find((item) => item.id === selectedConcept) || performanceConcepts[0];
            return (
              <>
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">SELECTED CONCEPT</p>
                    <h3>{concept.name}</h3>
                  </div>
                  <span className={`mini-tag status ${concept.status.toLowerCase().replace(/\s+/g, "-")}`}>{concept.status}</span>
                </div>
                <p className="concept-description">{concept.description}</p>
                <div className="detail-stats">
                  <div>
                    <small>Mastery</small>
                    <strong>{concept.mastery}%</strong>
                  </div>
                  <div>
                    <small>Subject</small>
                    <strong>{concept.subject}</strong>
                  </div>
                </div>
                <div className="detail-section">
                  <h4>Prerequisites</h4>
                  <ul>
                    {concept.prerequisites.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="detail-section">
                  <h4>Connected materials</h4>
                  <ul>
                    {concept.materials.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="detail-section">
                  <h4>Related concepts</h4>
                  <div className="tag-row">
                    {concept.connections.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                </div>
              </>
            );
          })()}
        </article>
      </section>
      {conceptHelperPanel()}
    </>
  );

  const performancePage = (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">PERFORMANCE</p>
          <h2>{studentPerformance?.student.name || "Student"}: progress and evidence</h2>
        </div>
        <label className="student-select">
          <span>Demo student</span>
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
            aria-label="Select demo student"
          >
            {demoStudents.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="estimate-note" role="note">
        <strong>Demo estimates — not validated predictions.</strong>
        <span>Indicators use only the fictional sample records and the simple rules shown below.</span>
      </section>

      {performanceLoading && <section className="panel loading-panel" aria-live="polite">Loading demo performance…</section>}
      {!performanceLoading && performanceError && (
        <section className="panel error-panel" role="alert">{performanceError}. Confirm the backend is running and reload.</section>
      )}
      {!performanceLoading && !performanceError && studentPerformance && (
        <>
          <section className="support-summary">
            <div>
              <p className="eyebrow">RULE-BASED SUPPORT INDICATOR</p>
              <h3>{studentPerformance.supportIndicator}</h3>
            </div>
            <span className={`support-status ${studentPerformance.supportIndicator.toLowerCase().replace(/\s+/g, "-")}`}>
              {studentPerformance.gaps.length} {studentPerformance.gaps.length === 1 ? "gap" : "gaps"} flagged
            </span>
          </section>

          <section className="metric-grid performance-metrics" aria-label="Student performance summary">
            {[
              { label: "Quiz average", value: studentPerformance.summary.quizAverage, suffix: "%" },
              { label: "Assignment completion", value: studentPerformance.summary.assignmentCompletion, suffix: "%" },
              { label: "Attendance", value: studentPerformance.summary.attendance, suffix: "%" },
              { label: "Learning this week", value: studentPerformance.summary.timeOnTask, suffix: " hrs" }
            ].map((item, index) => (
              <article className="metric-card" key={item.label}>
                <span className={`metric-icon ${["purple", "green", "blue", "amber"][index]}`}>▣</span>
                <span className="metric-label">{item.label}</span>
                <strong>{item.value}<span>{item.suffix}</span></strong>
              </article>
            ))}
          </section>

          <section className="two-column-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">QUIZ RESULTS</p><h3>Recent quiz scores</h3></div>
              </div>
              <div className="stack-list">
                {studentPerformance.quizzes.map((quiz) => (
                  <div className="assessment-row" key={`${quiz.title}-${quiz.date}`}>
                    <div><b>{quiz.title}</b><small>{quiz.date} · {quiz.conceptName}</small></div>
                    <strong>{quiz.score}%</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">ASSIGNMENT RESULTS</p><h3>Recent submitted work</h3></div>
              </div>
              <div className="stack-list">
                {studentPerformance.assignments.map((assignment) => (
                  <div className="assessment-row" key={`${assignment.title}-${assignment.date}`}>
                    <div><b>{assignment.title}</b><small>{assignment.date} · {assignment.conceptName} · {assignment.status}</small></div>
                    <strong>{assignment.score}%</strong>
                  </div>
                ))}
              </div>
              <p className="record-note">
                {studentPerformance.assignmentCompletion.completed} of {studentPerformance.assignmentCompletion.total} assignments completed.
                Attendance: {studentPerformance.attendance.attended} of {studentPerformance.attendance.total} sessions.
              </p>
            </article>
          </section>

          <section className="two-column-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">LEARNING PROGRESS</p><h3>Progress by week</h3></div>
              </div>
              <div className="weekly-progress">
                {studentPerformance.weeklyProgress.map((week) => (
                  <div className="weekly-row" key={week.week}>
                    <span>{week.week}</span>
                    <div className="bar" aria-label={`${week.progress}% progress`}>
                      <span style={{ width: `${week.progress}%` }} />
                    </div>
                    <strong>{week.progress}%</strong>
                    <small>{week.hours} hrs</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">CONCEPT MASTERY</p><h3>Mastery in the knowledge graph</h3></div>
              </div>
              <div className="subject-list">
                {studentPerformance.conceptMastery.map((concept) => (
                  <div className="subject-row" key={concept.conceptId}>
                    <div><b>{concept.name}</b><small>{concept.status}</small></div>
                    <div className="bar"><span style={{ width: `${concept.mastery}%` }} /></div>
                    <strong>{concept.mastery}%</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="panel gap-panel">
            <div className="panel-heading">
              <div><p className="eyebrow">KNOWLEDGE-GAP EVIDENCE</p><h3>Concepts to review</h3></div>
              <span className="term-label">{studentPerformance.gaps.length} identified</span>
            </div>
            <p className="panel-copy">
              A concept is flagged when mastery is below {studentPerformance.rules.masteryThreshold}% or its linked quiz average is below {studentPerformance.rules.quizThreshold}%.
              “Needs support” means {studentPerformance.rules.supportThreshold}+ flagged concepts; one means “Monitor”; none means “On track.”
            </p>
            {studentPerformance.gaps.length ? (
              <div className="gap-list">
                {studentPerformance.gaps.map((gap) => (
                  <article className="gap-card" key={gap.conceptId}>
                    <div className="gap-card-heading">
                      <div><h4>{gap.conceptName}</h4><small>{gap.subject} · {gap.mastery === null ? "Mastery not assessed" : `${gap.mastery}% mastery`}{gap.quizAverage !== null && ` · ${gap.quizAverage}% quiz average`}</small></div>
                      <button
                        className="text-button"
                        onClick={() => {
                          setSelectedConcept(gap.conceptId);
                          setActive("Concept Explorer");
                        }}
                      >
                        View in concept graph →
                      </button>
                    </div>
                    <ul className="evidence-list">
                      {gap.evidence.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            ) : (
              <p className="no-gaps">No concepts meet the current demo gap rules for this student.</p>
            )}
          </section>
        </>
      )}
    </>
  );

  const facultyDashboard = (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">FACULTY DASHBOARD</p>
          <h2>Class progress and support signals</h2>
        </div>
        <span className="term-label">Fictional demo cohort</span>
      </section>

      <section className="estimate-note" role="note">
        <strong>Prototype ML estimate — synthetic data and labels only; not validated for real-world decisions.</strong>
        <span>Flags use the demo rules: mastery below {facultyAnalytics?.thresholds.mastery ?? 70}% or linked quiz average below {facultyAnalytics?.thresholds.quizAverage ?? 65}%. “Needs support” means {facultyAnalytics?.thresholds.supportConceptCount ?? 2}+ flagged concepts in the selected view.</span>
        {facultyAnalytics?.model && (
          <>
            <span>
              {facultyAnalytics.model.name}; {facultyAnalytics.model.syntheticRecordCount} synthetic records
              ({facultyAnalytics.model.trainingRecordCount} train, {facultyAnalytics.model.heldOutRecordCount} held out).
              {" "}{facultyAnalytics.model.heldOutSplit}.
            </span>
            <div className="model-metrics" aria-label="Synthetic held-out evaluation metrics">
              {[
                ["Accuracy", facultyAnalytics.model.evaluationMetrics.accuracy],
                ["Precision", facultyAnalytics.model.evaluationMetrics.precision],
                ["Recall", facultyAnalytics.model.evaluationMetrics.recall],
                ["F1-score", facultyAnalytics.model.evaluationMetrics.f1],
                ["ROC-AUC", facultyAnalytics.model.evaluationMetrics.rocAuc]
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <b>{value === null ? "N/A" : `${(value * 100).toFixed(1)}%`}</b>
                </div>
              ))}
            </div>
            {facultyAnalytics.model.rocAucNote && <span>{facultyAnalytics.model.rocAucNote}</span>}
            <div className="confusion-matrix">
              <b>Confusion matrix</b>
              <span>{facultyAnalytics.model.confusionMatrix.orientation}</span>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Actual / predicted</th>
                    {facultyAnalytics.model.confusionMatrix.labels.map((label) => <th scope="col" key={label}>{label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {facultyAnalytics.model.confusionMatrix.matrix.map((row, index) => (
                    <tr key={facultyAnalytics.model.confusionMatrix.labels[index]}>
                      <th scope="row">{facultyAnalytics.model.confusionMatrix.labels[index]}</th>
                      {row.map((count, columnIndex) => <td key={columnIndex}>{count}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span>Positive target: {facultyAnalytics.model.positiveLabel}</span>
            <span>Negative target: {facultyAnalytics.model.negativeLabel}</span>
            <span>
              Labels are generated from these same indicator cutoffs, so this evaluation does not validate real student outcomes.
              {" "}No causal effect or probability calibration is established.
            </span>
          </>
        )}
      </section>

      {facultyAnalytics?.model && (
        <section className="panel model-explainability" aria-labelledby="model-explainability-title">
          <div className="panel-heading">
            <div><p className="eyebrow">MODEL EXPLAINABILITY</p><h3 id="model-explainability-title">How the indicators relate to the estimate</h3></div>
          </div>
          <p className="panel-copy">
            {facultyAnalytics.model.explainability} These are model associations, not causes.
            The synthetic target is defined by combined cutoffs, which a linear model may not reproduce exactly.
          </p>
          <div className="feature-effects">
            {facultyAnalytics.model.featureEffects.map((feature) => (
              <div className="feature-effect" key={feature.key}>
                <div>
                  <b>{feature.label}</b>
                  <small>Training mean: {feature.trainingMean}{feature.unit === "%" ? "%" : " hours/week"}</small>
                </div>
                <strong>β {feature.coefficientPerStandardDeviation > 0 ? "+" : ""}{feature.coefficientPerStandardDeviation.toFixed(3)} / SD</strong>
                <span>{feature.direction}; association with synthetic support-needed log-odds, holding other indicators fixed.</span>
              </div>
            ))}
          </div>
          {facultyAnalytics.model.probabilityCalibrationEvaluated === false && (
            <p className="model-calibration-note">The displayed probabilities are model outputs; calibration was not evaluated.</p>
          )}
        </section>
      )}

      <section className="panel faculty-filters" aria-label="Faculty analytics filters">
        <label className="student-select">
          <span>Subject</span>
          <select
            value={facultySubject}
            onChange={(event) => {
              setFacultySubject(event.target.value);
              setFacultyConcept("");
            }}
            aria-label="Filter faculty analytics by subject"
          >
            <option value="">All subjects</option>
            {(facultyAnalytics?.filters.subjects || []).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className="student-select">
          <span>Concept</span>
          <select
            value={facultyConcept}
            onChange={(event) => setFacultyConcept(event.target.value)}
            aria-label="Filter faculty analytics by concept"
          >
            <option value="">All concepts</option>
            {(facultyAnalytics?.filters.concepts || []).map((concept) => (
              <option key={concept.id} value={concept.id}>{concept.name}</option>
            ))}
          </select>
        </label>
      </section>

      {facultyAnalyticsLoading && <section className="panel loading-panel" aria-live="polite">Loading class evidence…</section>}
      {!facultyAnalyticsLoading && facultyAnalyticsError && (
        <section className="panel error-panel" role="alert">{facultyAnalyticsError} Confirm the backend is running and reload.</section>
      )}
      {!facultyAnalyticsLoading && !facultyAnalyticsError && facultyAnalytics && (
        <>
          <section className="metric-grid" aria-label="Filtered faculty summary">
            {[
              { label: "Students in view", value: facultyAnalytics.classSummary.cohortSize, suffix: "", tone: "purple", note: "Fictional demo records" },
              { label: "Average mastery", value: facultyAnalytics.classSummary.averageMastery ?? "—", suffix: facultyAnalytics.classSummary.averageMastery === null ? "" : "%", tone: "green", note: "Across assessed concepts" },
              { label: "Needs support", value: facultyAnalytics.classSummary.needingSupport, suffix: "", tone: "amber", note: `${facultyAnalytics.classSummary.monitor} to monitor` },
              { label: "Flagged concept gaps", value: facultyAnalytics.classSummary.flaggedGaps, suffix: "", tone: "blue", note: "Rule-based evidence count" }
            ].map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className={`metric-icon ${metric.tone}`}>▣</span>
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}<span>{metric.suffix}</span></strong>
                <small>{metric.note}</small>
              </article>
            ))}
          </section>

          <section className="two-column-grid faculty-analytics-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">CONCEPT PROGRESS</p><h3>Mastery and gap signals</h3></div>
              </div>
              <div className="faculty-concept-list">
                {facultyAnalytics.concepts.map((concept) => (
                  <div className="faculty-concept-row" key={concept.conceptId}>
                    <div className="faculty-concept-heading">
                      <div><b>{concept.name}</b><small>{concept.subject} · {concept.assessedStudents} assessed</small></div>
                      <strong>{concept.averageMastery === null ? "—" : `${concept.averageMastery}%`}</strong>
                    </div>
                    <div className="bar"><span style={{ width: `${concept.averageMastery ?? 0}%` }} /></div>
                    <p className="faculty-evidence">
                      {concept.flaggedStudents
                        ? `${concept.flaggedStudents} of ${facultyAnalytics.classSummary.cohortSize} students have a rule-based gap flag. ${concept.gapStudentNames.join(", ")}.`
                        : "No student in this view meets the gap rule for this concept."}
                      {concept.averageQuiz !== null && ` Linked quiz average: ${concept.averageQuiz}% across ${concept.quizAttempts} attempts.`}
                    </p>
                  </div>
                ))}
                {!facultyAnalytics.concepts.length && <p className="panel-copy">No concepts match these filters.</p>}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">STUDENT SUPPORT</p><h3>Students to review</h3></div>
              </div>
              <div className="student-table">
                {facultyAnalytics.students.map((student) => (
                  <div className="faculty-student-row" key={student.id}>
                    <div className="faculty-student-name">
                      <b>{student.name}</b>
                      <small>{student.gaps.length ? `${student.gaps.length} flagged concept${student.gaps.length === 1 ? "" : "s"}` : "No gaps flagged in this view"}</small>
                    </div>
                    <span className={`support-status ${student.supportIndicator.toLowerCase().replace(/\s+/g, "-")}`}>
                      {student.supportIndicator}
                    </span>
                    <strong>{student.mastery === null ? "—" : `${student.mastery}%`}</strong>
                    <button
                      className="text-button faculty-open-button"
                      aria-expanded={selectedFacultyStudentId === student.id}
                      onClick={() => setSelectedFacultyStudentId(
                        selectedFacultyStudentId === student.id ? "" : student.id
                      )}
                    >
                      {selectedFacultyStudentId === student.id ? "Close summary" : "View summary"}
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="panel faculty-interventions">
            <div className="panel-heading">
              <div><p className="eyebrow">SUGGESTED INTERVENTIONS</p><h3>Possible next steps</h3></div>
            </div>
            {facultyAnalytics.concepts.some((concept) => concept.flaggedStudents > 0) ? (
              <div className="stack-list">
                {[...facultyAnalytics.concepts]
                  .filter((concept) => concept.flaggedStudents > 0)
                  .sort((first, second) => second.flaggedStudents - first.flaggedStudents)
                  .slice(0, 3)
                  .map((concept) => {
                    const sourceConcept = overview.concepts.find((item) => item.id === concept.conceptId);
                    const resources = sourceConcept?.materials || [];
                    return (
                      <article className="recommendation-card" key={concept.conceptId}>
                        <h4>Targeted practice: {concept.name}</h4>
                        <p>
                          Consider a short review using {resources.length ? resources.join(" and ") : "the linked course materials"}.
                          {" "}{concept.flaggedStudents} student{concept.flaggedStudents === 1 ? "" : "s"} flagged: {concept.gapStudentNames.join(", ")}.
                        </p>
                      </article>
                    );
                  })}
              </div>
            ) : (
              <p className="panel-copy">No concept gaps are flagged with the current filters; continue monitoring progress.</p>
            )}
          </section>

          {selectedFacultyStudentId && (() => {
            const student = facultyAnalytics.students.find((item) => item.id === selectedFacultyStudentId);
            if (!student) return null;
            return (
              <section className="panel faculty-support-detail" aria-live="polite">
                <div className="panel-heading">
                  <div><p className="eyebrow">STUDENT SUPPORT SUMMARY</p><h3>{student.name}</h3></div>
                  <span className={`support-status ${student.supportIndicator.toLowerCase().replace(/\s+/g, "-")}`}>{student.supportIndicator}</span>
                </div>
                <div className="faculty-detail-metrics">
                  <div><small>Mastery in this view</small><strong>{student.mastery === null ? "Not assessed" : `${student.mastery}%`}</strong></div>
                  <div><small>Overall quiz average</small><strong>{student.summary.quizAverage}%</strong></div>
                  <div><small>Assignment completion</small><strong>{student.summary.assignmentCompletion}%</strong></div>
                  <div><small>Attendance</small><strong>{student.summary.attendance}%</strong></div>
                  <div><small>Latest weekly progress</small><strong>{student.weeklyProgress.at(-1)?.progress ?? "—"}%</strong></div>
                </div>
                <section className="estimate-note model-estimate" aria-label="Prototype synthetic model estimate">
                  <strong>
                    Prototype model estimate: {student.supportEstimate.prediction}
                    {" "}({Math.round(student.supportEstimate.supportProbability * 100)}% estimated probability)
                  </strong>
                  <span>{student.supportEstimate.warning}</span>
                  <h4>Key contributing indicators</h4>
                  <p className="model-contribution-note">
                    Top three by absolute contribution to log-odds (not probability percentage points), relative to the synthetic training mean:
                  </p>
                  <ul className="model-indicators">
                    {student.supportEstimate.contributingIndicators.map((indicator) => (
                      <li key={indicator.key}>
                        {indicator.label}: {indicator.value}{indicator.unit === "%" ? "%" : " hours/week"}
                        {" "} (training mean {indicator.trainingMean}{indicator.unit === "%" ? "%" : " hours/week"},
                        {" "}{Math.abs(indicator.standardizedValue).toFixed(2)} SD
                        {" "}{indicator.standardizedValue > 0 ? "above" : indicator.standardizedValue < 0 ? "below" : "at"} mean);
                        {" "}{indicator.direction} ({indicator.logOddsContribution > 0 ? "+" : ""}
                        {indicator.logOddsContribution.toFixed(3)} log-odds).
                      </li>
                    ))}
                  </ul>
                </section>
                <h4 className="faculty-evidence-title">Concept evidence in the selected view</h4>
                {student.gaps.length ? (
                  <div className="gap-list">
                    {student.gaps.map((gap) => (
                      <article className="gap-card" key={gap.conceptId}>
                        <div className="gap-card-heading">
                          <div><h4>{gap.conceptName}</h4><small>{gap.subject}</small></div>
                          <span className="mini-tag status needs-support">Needs review</span>
                        </div>
                        <ul className="evidence-list">
                          {gap.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}
                        </ul>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="no-gaps">No concept gaps are flagged for this student with the current filters.</p>
                )}
              </section>
            );
          })()}
        </>
      )}
    </>
  );

  const learningImpactDashboard = demoRole === "Faculty" ? (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">LEARNING IMPACT · FACULTY VIEW</p>
          <h2>Cohort learning signals</h2>
          <p className="impact-subtitle">A summary of observed fictional prototype activity—not evidence of learning effectiveness.</p>
        </div>
        <span className="term-label">{facultyAnalytics?.classSummary.cohortSize ?? "—"} students in view</span>
      </section>

      <section className="panel faculty-filters impact-filters" aria-label="Learning impact filters">
        <label className="student-select">
          <span>Subject</span>
          <select
            value={facultySubject}
            onChange={(event) => {
              setFacultySubject(event.target.value);
              setFacultyConcept("");
            }}
            aria-label="Filter learning impact by subject"
          >
            <option value="">All subjects</option>
            {(facultyAnalytics?.filters.subjects || []).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className="student-select">
          <span>Concept</span>
          <select
            value={facultyConcept}
            onChange={(event) => setFacultyConcept(event.target.value)}
            aria-label="Filter learning impact by concept"
          >
            <option value="">All concepts</option>
            {(facultyAnalytics?.filters.concepts || []).map((concept) => (
              <option key={concept.id} value={concept.id}>{concept.name}</option>
            ))}
          </select>
        </label>
      </section>

      {facultyAnalyticsLoading && <section className="panel loading-panel" aria-live="polite">Loading cohort learning signals…</section>}
      {!facultyAnalyticsLoading && facultyAnalyticsError && (
        <section className="panel error-panel" role="alert">{facultyAnalyticsError} Confirm the backend is running and reload.</section>
      )}
      {!facultyAnalyticsLoading && !facultyAnalyticsError && facultyAnalytics && (
        <>
          <section className="metric-grid impact-metrics faculty-impact-metrics" aria-label="Cohort learning summary">
            {[
              { label: "Average concept mastery", value: facultyAnalytics.classSummary.averageMastery ?? "—", suffix: facultyAnalytics.classSummary.averageMastery === null ? "" : "%", note: "Across assessed concepts", tone: "green" },
              { label: "Average quiz score", value: facultyAnalytics.classSummary.averageQuiz ?? "—", suffix: facultyAnalytics.classSummary.averageQuiz === null ? "" : "%", note: `${facultyAnalytics.classSummary.quizAttemptCount} recorded quiz results`, tone: "purple" },
              { label: "Rule-flagged gaps", value: facultyAnalytics.classSummary.flaggedGaps, suffix: "", note: `${facultyAnalytics.classSummary.needingSupport} students marked needs-support`, tone: "amber" },
              { label: "Synthetic model estimates", value: facultyAnalytics.classSummary.modelEstimatedSupport, suffix: "", note: "Students estimated as may need support", tone: "blue" }
            ].map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className={`metric-icon ${metric.tone}`}>▣</span>
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}<span>{metric.suffix}</span></strong>
                <small>{metric.note}</small>
              </article>
            ))}
          </section>

          <section className="estimate-note impact-estimate-note" role="note">
            <strong>Support estimates are synthetic model outputs, not validated student decisions.</strong>
            <span>They summarize the existing logistic-regression estimates and evaluation in Faculty Dashboard. The model uses synthetic records and labels derived from the same demo cutoffs; estimates are not causal, calibrated, or validated for intervention decisions. Support counts are cohort-wide; subject and concept filters scope the rule-based mastery and gap summaries.</span>
            <button className="text-button" onClick={() => setActive("Faculty Dashboard")}>Open faculty analytics and model evaluation <span>→</span></button>
          </section>

          <section className="two-column-grid impact-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">CONCEPT-LEVEL SIGNALS</p><h3>Topics for teaching review</h3></div>
                <span className="term-label">{facultyAnalytics.concepts.length} concepts</span>
              </div>
              <p className="panel-copy">Flags are calculated by the existing rules; they indicate areas to inspect, not a conclusion about teaching or an individual student.</p>
              {facultyAnalytics.concepts.length ? (
                <div className="impact-concept-list">
                  {[...facultyAnalytics.concepts]
                    .sort((left, right) => right.flaggedStudents - left.flaggedStudents
                      || (left.averageMastery ?? 101) - (right.averageMastery ?? 101))
                    .map((concept) => (
                      <article className="impact-concept" key={concept.conceptId}>
                        <div className="impact-concept-heading">
                          <div><b>{concept.name}</b><small>{concept.subject} · {concept.assessedStudents} assessed</small></div>
                          <span className={concept.flaggedStudents ? "impact-flag" : "impact-steady"}>
                            {concept.flaggedStudents ? `${concept.flaggedStudents} flagged` : "No current flags"}
                          </span>
                        </div>
                        <div className="impact-bar-row">
                          <span>Mastery</span>
                          <div className="bar"><span style={{ width: `${concept.averageMastery ?? 0}%` }} /></div>
                          <strong>{concept.averageMastery === null ? "Not assessed" : `${concept.averageMastery}%`}</strong>
                        </div>
                        <div className="impact-bar-row">
                          <span>Quiz average</span>
                          <div className="bar quiz-bar"><span style={{ width: `${concept.averageQuiz ?? 0}%` }} /></div>
                          <strong>{concept.averageQuiz === null ? "No results" : `${concept.averageQuiz}%`}</strong>
                        </div>
                        <p className="panel-copy impact-evidence">
                          {concept.averageQuiz === null
                            ? "No linked quiz results are available."
                            : `${concept.averageQuiz}% across ${concept.quizAttempts} recorded quiz results.`}
                          {concept.gapStudentNames.length > 0 && ` Rule-flagged fictional students: ${concept.gapStudentNames.join(", ")}.`}
                        </p>
                      </article>
                    ))}
                </div>
              ) : (
                <p className="impact-empty">No concepts match the selected filters.</p>
              )}
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">STUDENT SUPPORT SIGNALS</p><h3>Fictional cohort records</h3></div>
              </div>
              <p className="panel-copy">Rule-based gap status and synthetic model estimates are shown separately.</p>
              {facultyAnalytics.students.length ? (
                <div className="impact-student-list">
                  {facultyAnalytics.students.map((student) => (
                    <article className="impact-student" key={student.id}>
                      <div className="impact-student-heading">
                        <div><b>{student.name}</b><small>{student.supportIndicator} · {student.mastery === null ? "Mastery not assessed" : `${student.mastery}% mastery`}</small></div>
                        <span className={`support-status ${student.supportIndicator.toLowerCase().replace(/\s+/g, "-")}`}>{student.supportIndicator}</span>
                      </div>
                      <div className="impact-estimate-row">
                        <span>Synthetic model estimate</span>
                        <strong>{student.supportEstimate
                          ? `${student.supportEstimate.prediction} · ${(student.supportEstimate.supportProbability * 100).toFixed(1)}%`
                          : "Not available"}</strong>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => {
                          setSelectedFacultyStudentId(student.id);
                          setActive("Faculty Dashboard");
                        }}
                      >
                        View existing support detail <span>→</span>
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="impact-empty">No students match the selected filters.</p>
              )}
            </article>
          </section>
        </>
      )}
    </>
  ) : (
    <>
      <section className="page-header impact-page-header">
        <div>
          <p className="eyebrow">LEARNING IMPACT · STUDENT VIEW</p>
          <h2>Observed learning activity</h2>
          <p className="impact-subtitle">Recorded progress and current learning signals for a fictional demo student.</p>
        </div>
        <label className="student-select">
          <span>Demo student</span>
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
            aria-label="Select demo student for learning impact"
          >
            {demoStudents.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="impact-honesty-note" role="note">
        This summarizes observed prototype activity only. It does not prove learning improved, establish a causal effect, or validate an educational outcome.
      </section>

      {performanceLoading && <section className="panel loading-panel" aria-live="polite">Loading recorded learning activity…</section>}
      {!performanceLoading && performanceError && (
        <section className="panel error-panel" role="alert">{performanceError} Confirm the backend is running and reload.</section>
      )}
      {!performanceLoading && !performanceError && currentStudentPerformance && (
        <>
          <section className="metric-grid impact-metrics" aria-label="Student learning activity summary">
            {[
              { label: "Current quiz average", value: currentStudentPerformance.summary.quizAverage, suffix: "%", note: "Across recorded quiz results", tone: "purple" },
              { label: "Completed quizzes", value: currentStudentPerformance.quizzes.length, suffix: "", note: "Seeded and adaptive quiz results", tone: "green" },
              { label: "Current learning gaps", value: currentStudentPerformance.gaps.length, suffix: "", note: "Existing demo gap rules", tone: "amber" },
              { label: "Recorded adaptive attempts", value: currentStudentPerformance.quizAttempts.length, suffix: "", note: currentStudentPerformance.quizAttempts.length ? "Observed mastery changes" : "No attempt history yet", tone: "blue" }
            ].map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className={`metric-icon ${metric.tone}`}>▣</span>
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}<span>{metric.suffix}</span></strong>
                <small>{metric.note}</small>
              </article>
            ))}
          </section>

          <section className="two-column-grid impact-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">CURRENT MASTERY</p><h3>Concepts in the knowledge graph</h3></div>
                <button className="text-button" onClick={() => setActive("Performance")}>View performance <span>→</span></button>
              </div>
              {currentStudentPerformance.conceptMastery.length ? (
                <div className="impact-concept-list">
                  {currentStudentPerformance.conceptMastery.map((concept) => (
                    <article className="impact-concept" key={concept.conceptId}>
                      <div className="impact-concept-heading">
                        <div><b>{concept.name}</b><small>{concept.subject} · {concept.status}</small></div>
                        <strong>{concept.mastery === null ? "Not assessed" : `${concept.mastery}%`}</strong>
                      </div>
                      <div className="bar impact-mastery-bar">
                        <span style={{ width: `${concept.mastery ?? 0}%` }} />
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="impact-empty">No concept mastery records are available for this student.</p>
              )}
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">QUIZ PERFORMANCE</p><h3>Recorded quiz scores</h3></div>
              </div>
              {currentStudentPerformance.quizzes.length ? (
                <div className="impact-quiz-list">
                  {currentStudentPerformance.quizzes.slice(-6).map((quiz) => (
                    <article className="impact-quiz" key={quiz.attemptId || `${quiz.title}-${quiz.date}`}>
                      <div><b>{quiz.title}</b><small>{quiz.date} · {quiz.conceptName}</small></div>
                      <div className="bar"><span style={{ width: `${quiz.score}%` }} /></div>
                      <strong>{quiz.score}%</strong>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="impact-empty">No quiz-score history is available yet.</p>
              )}
              <p className="panel-copy impact-footnote">Showing the latest available results; quiz score history is not a mastery timeline.</p>
            </article>
          </section>

          <section className="two-column-grid impact-grid">
            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">OBSERVED MASTERY CHANGES</p><h3>Adaptive quiz attempt history</h3></div>
              </div>
              <p className="panel-copy">Each change below comes directly from a saved quiz attempt and the existing mastery update rule.</p>
              {currentStudentPerformance.quizAttempts.length ? (
                <div className="impact-attempt-list">
                  {[...currentStudentPerformance.quizAttempts]
                    .sort((left, right) => new Date(left.submittedAt) - new Date(right.submittedAt))
                    .slice(-6)
                    .map((attempt) => {
                      const concept = currentStudentPerformance.conceptMastery.find((item) => item.conceptId === attempt.conceptId);
                      const change = attempt.updatedMastery - attempt.previousMastery;
                      return (
                        <article className="impact-attempt" key={attempt.id}>
                          <div>
                            <b>{concept?.name || "Concept"}</b>
                            <small>{new Date(attempt.submittedAt).toLocaleString()}</small>
                          </div>
                          <div className="bar"><span style={{ width: `${attempt.updatedMastery}%` }} /></div>
                          <strong>{attempt.previousMastery}% → {attempt.updatedMastery}%</strong>
                          <span className={change >= 0 ? "impact-change-positive" : "impact-change-negative"}>
                            {change > 0 ? "+" : ""}{change} pts
                          </span>
                        </article>
                      );
                    })}
                </div>
              ) : (
                <p className="impact-empty">No saved adaptive quiz attempts yet. Current mastery is shown above; no earlier mastery values are inferred.</p>
              )}
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">CURRENT RECOMMENDATIONS</p><h3>Ordered learning path</h3></div>
                <button className="text-button" onClick={() => setActive("Learning Path")}>Open learning path <span>→</span></button>
              </div>
              {recommendations.length ? (
                <div className="impact-recommendation-list">
                  {recommendations.slice(0, 4).map((item) => (
                    <article className="impact-recommendation" key={item.id}>
                      <span className="step-number current">{item.position}</span>
                      <div><b>{item.title}</b><small>{item.status} · {item.mastery === null ? "Mastery not assessed" : `${item.mastery}% mastery`}</small><p>{item.reason}</p></div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="impact-empty">No learning recommendations are available.</p>
              )}
              <p className="panel-copy impact-footnote">Recommendations are current rule- and graph-based guidance. This prototype does not track recommendation completion, so no completion percentage is reported.</p>
            </article>
          </section>

          <section className="panel impact-prerequisites">
            <div className="panel-heading">
              <div><p className="eyebrow">PREREQUISITE READINESS</p><h3>Mapped prerequisite review status</h3></div>
              <span className="term-label">Existing graph links only</span>
            </div>
            <p className="panel-copy">The existing 80% review threshold is a demo heuristic, not a validated learning benchmark. Meeting it is not evidence that a recommendation was completed.</p>
            {prerequisiteProgress.length ? (
              <div className="impact-prerequisite-list">
                {prerequisiteProgress.map((prerequisite) => (
                  <article className="impact-prerequisite" key={prerequisite.id}>
                    <div><b>{prerequisite.name}</b><small>Prerequisite for {prerequisite.targetName}</small></div>
                    <strong>{prerequisite.mastery === null ? "Not assessed" : `${prerequisite.mastery}% mastery`}</strong>
                    <span className={prerequisite.needsReview ? "impact-flag" : "impact-steady"}>
                      {prerequisite.needsReview ? "Review indicated" : "Meets review threshold"}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="impact-empty">No mapped prerequisite progress is available for the current recommendations.</p>
            )}
          </section>
        </>
      )}
    </>
  );

  const pageMap = {
    "Learning Impact": learningImpactDashboard,
    "Student Dashboard": studentDashboard,
    "Learning Path": learningPathPage,
    "Concept Explorer": conceptExplorer,
    "Performance": performancePage,
    "Faculty Dashboard": facultyDashboard
  };
  const profileName = (active === "Performance" || active === "Concept Explorer")
    ? studentPerformance?.student.name || overview.student.name
    : overview.student.name;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="LearnGraph home">
          <span className="brand-mark">L</span>
          <span>LearnGraph</span>
        </a>
        <p className="nav-caption">LEARNING SPACE</p>
        <nav aria-label="Main navigation">
          {sections.map((section, index) => (
            <button
              className={`nav-item${active === section.label ? " selected" : ""}`}
              key={section.label}
              onClick={() => setActive(section.label)}
            >
              <span className="nav-icon">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="status-dot" />
          <span>Fictional demo workspace</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="breadcrumb">{demoRole} space <span>/</span> {active}</span>
          <div className="topbar-actions">
            <div className="role-switcher" role="tablist" aria-label="Demo role selector">
              {['Student', 'Faculty'].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`role-toggle${demoRole === role ? ' selected' : ''}`}
                  onClick={() => setDemoRole(role)}
                  aria-pressed={demoRole === role}
                >
                  {role}
                </button>
              ))}
            </div>
            <button className="profile-button" aria-label="Selected demo profile">
              {profileName.split(" ").map((name) => name[0]).join("")}
            </button>
          </div>
        </header>

        {pageMap[active] || pageMap["Student Dashboard"]}

        <footer>Demo experience · All student information is fictional</footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

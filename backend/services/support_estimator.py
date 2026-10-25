import random

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


FEATURES = (
    ("quizAverage", "Overall quiz average", "%"),
    ("assignmentCompletion", "Assignment completion", "%"),
    ("attendance", "Attendance rate", "%"),
    ("weeklyStudyHours", "Weekly study hours", "hours"),
)
DATASET_SIZE = 1200
SUPPORT_TARGET_RULE = (
    "Synthetic support-needed label: at least two of quiz average <65%, "
    "assignment completion <70%, attendance <80%, or weekly study hours <3.5."
)
PROTOTYPE_WARNING = (
    "Synthetic-data demonstration only: both records and support-needed labels "
    "are synthetic, with labels generated from the same four indicator cutoffs "
    "used by the demo rules. Not validated for real student outcomes or decisions."
)


def _synthetic_dataset():
    generator = random.Random(2026)
    features = []
    labels = []

    for _ in range(DATASET_SIZE):
        record = [
            generator.uniform(35, 100),
            generator.uniform(35, 100),
            generator.uniform(50, 100),
            generator.uniform(1, 12),
        ]
        risk_signals = (
            record[0] < 65,
            record[1] < 70,
            record[2] < 80,
            record[3] < 3.5,
        )
        features.append(record)
        labels.append(int(sum(risk_signals) >= 2))

    return np.asarray(features, dtype=float), np.asarray(labels, dtype=int)


_features, _labels = _synthetic_dataset()
_x_train, _x_test, _y_train, _y_test = train_test_split(
    _features,
    _labels,
    test_size=0.25,
    random_state=42,
    stratify=_labels,
)
_model = Pipeline([
    ("scale", StandardScaler()),
    ("classifier", LogisticRegression(random_state=42, max_iter=1000)),
])
_model.fit(_x_train, _y_train)
_test_predictions = _model.predict(_x_test)
_test_probabilities = _model.predict_proba(_x_test)[:, 1]
_confusion = confusion_matrix(_y_test, _test_predictions, labels=[0, 1])
_classifier = _model.named_steps["classifier"]
_scaler = _model.named_steps["scale"]
_roc_auc = (
    round(float(roc_auc_score(_y_test, _test_probabilities)), 3)
    if len(np.unique(_y_test)) == 2
    else None
)
_metrics = {
    "accuracy": round(float(accuracy_score(_y_test, _test_predictions)), 3),
    "precision": round(float(precision_score(_y_test, _test_predictions, zero_division=0)), 3),
    "recall": round(float(recall_score(_y_test, _test_predictions, zero_division=0)), 3),
    "f1": round(float(f1_score(_y_test, _test_predictions, zero_division=0)), 3),
    "rocAuc": _roc_auc,
}
_feature_effects = [
    {
        "key": key,
        "label": label,
        "unit": unit,
        "trainingMean": round(float(mean), 3),
        "trainingStandardDeviation": round(float(scale), 3),
        "coefficientPerStandardDeviation": round(float(coefficient), 3),
        "direction": (
            "higher values are associated with higher estimated support need"
            if coefficient > 0
            else "higher values are associated with lower estimated support need"
            if coefficient < 0
            else "no linear association in this fitted model"
        ),
    }
    for (key, label, unit), mean, scale, coefficient in zip(
        FEATURES,
        _scaler.mean_,
        _scaler.scale_,
        _classifier.coef_[0],
    )
]
_confusion_matrix = {
    "labels": ["Not support-needed", "Support-needed"],
    "matrix": _confusion.tolist(),
    "orientation": "Rows are actual labels; columns are predicted labels.",
}
_model_info = {
    "name": "Standard-scaled logistic regression",
    "dataset": "Deterministic synthetic educational indicators; no real student records",
    "syntheticRecordCount": DATASET_SIZE,
    "trainingRecordCount": len(_x_train),
    "heldOutRecordCount": len(_x_test),
    "heldOutSplit": "75% train / 25% test; stratified; random_state=42",
    "positiveLabel": SUPPORT_TARGET_RULE,
    "negativeLabel": "Synthetic label is negative when fewer than two indicators cross their support-need cutoffs.",
    "evaluationMetrics": _metrics,
    "confusionMatrix": _confusion_matrix,
    "featureEffects": _feature_effects,
    "explainability": (
        "Coefficients are per one training-set standard deviation. For an "
        "individual record, each feature's contribution to model log-odds is "
        "its standardized distance from the training mean multiplied by its "
        "fitted coefficient; contributions are not probability-point changes."
    ),
    "rocAucNote": (
        None if _roc_auc is not None
        else "ROC-AUC is undefined because the held-out split contains only one label."
    ),
    "probabilityCalibrationEvaluated": False,
    "warning": PROTOTYPE_WARNING,
}


def estimate_support(indicators):
    values = [float(indicators[key]) for key, _, _ in FEATURES]
    support_probability = float(_model.predict_proba([values])[0, 1])
    standardized_values = (np.asarray(values) - _scaler.mean_) / _scaler.scale_
    contributions = standardized_values * _classifier.coef_[0]
    ranked_contributions = sorted(
        zip(range(len(FEATURES)), FEATURES, values, contributions, standardized_values),
        key=lambda item: abs(float(item[3])),
        reverse=True,
    )
    contributing_indicators = [
        {
            "key": key,
            "label": label,
            "value": round(value, 1),
            "unit": unit,
            "trainingMean": round(float(_scaler.mean_[index]), 3),
            "standardizedValue": round(float(standardized_value), 3),
            "logOddsContribution": round(float(contribution), 3),
            "direction": (
                "raises estimated support need relative to the training-set mean"
                if contribution > 0
                else "lowers estimated support need relative to the training-set mean"
                if contribution < 0
                else "has no material contribution relative to the training-set mean"
            ),
        }
        for index, (key, label, unit), value, contribution, standardized_value
        in ranked_contributions[:3]
    ]
    return {
        "prediction": (
            "May need support" if support_probability >= 0.5 else "Lower estimated need"
        ),
        "mayNeedSupport": support_probability >= 0.5,
        "supportProbability": round(support_probability, 3),
        "contributingIndicators": contributing_indicators,
        "warning": PROTOTYPE_WARNING,
    }


def model_info():
    return _model_info

# TruLens

[TruLens](https://www.trulens.org/) is an evaluation and observability framework for LLM applications that provides feedback functions for RAG systems and agent trace analysis. MLflow's TruLens integration allows you to use TruLens feedback functions as MLflow scorers, including benchmarked [goal-plan-action alignment evaluations](https://arxiv.org/abs/2510.08847) for agent traces.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

TruLens scorers require the `trulens` and `trulens-providers-litellm` packages:

bash

```
pip install trulens trulens-providers-litellm
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

* Invoke directly
* Invoke with evaluate()

python

```
from mlflow.genai.scorers.trulens import Groundedness

scorer = Groundedness(model="openai:/gpt-5-mini")
feedback = scorer(
    inputs="What is MLflow?",
    outputs="MLflow is an open-source AI engineering platform for agents and LLMs.",
    expectations={
        "context": "MLflow is an ML platform for experiment tracking and model deployment."
    },
)

print(feedback.value)  # "yes" or "no"
print(feedback.metadata["score"])  # 0.85
```

python

```
import mlflow
from mlflow.genai.scorers.trulens import Groundedness, AnswerRelevance

eval_dataset = [
    {
        "inputs": {"query": "What is MLflow?"},
        "outputs": "MLflow is an open-source AI engineering platform for agents and LLMs.",
        "expectations": {
            "context": "MLflow is an ML platform for experiment tracking and model deployment."
        },
    },
    {
        "inputs": {"query": "How do I track experiments?"},
        "outputs": "You can use mlflow.start_run() to begin tracking experiments.",
        "expectations": {
            "context": "MLflow provides APIs like mlflow.start_run() for experiment tracking."
        },
    },
]

results = mlflow.genai.evaluate(
    data=eval_dataset,
    scorers=[
        Groundedness(model="openai:/gpt-5-mini"),
        AnswerRelevance(model="openai:/gpt-5-mini"),
    ],
)
```

## Available TruLens Scorers[​](#available-trulens-scorers "Direct link to Available TruLens Scorers")

TruLens scorers are organized into categories based on their evaluation focus:

### RAG (Retrieval-Augmented Generation) Metrics[​](#rag-retrieval-augmented-generation-metrics "Direct link to RAG (Retrieval-Augmented Generation) Metrics")

Evaluate retrieval quality and answer generation in RAG systems:

| Scorer                                                                                                                    | What does it evaluate?                                | TruLens Docs                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Groundedness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.Groundedness)         | Is the response grounded in the provided context?     | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.groundedness_measure_with_cot_reasons) |
| [ContextRelevance](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.ContextRelevance) | Is the retrieved context relevant to the input query? | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.context_relevance_with_cot_reasons)    |
| [AnswerRelevance](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.AnswerRelevance)   | Is the output relevant to the input query?            | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.relevance_with_cot_reasons)            |
| [Coherence](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.Coherence)               | Is the output coherent and logically consistent?      | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.coherence_with_cot_reasons)            |

### Agent Trace Metrics[​](#agent-trace-metrics "Direct link to Agent Trace Metrics")

Evaluate AI agent execution traces using [goal-plan-action alignment](https://arxiv.org/abs/2510.08847):

| Scorer                                                                                                                          | What does it evaluate?                                              | TruLens Docs                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [LogicalConsistency](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.LogicalConsistency)   | Is the agent's reasoning logically consistent throughout execution? | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.logical_consistency_with_cot_reasons)  |
| [ExecutionEfficiency](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.ExecutionEfficiency) | Does the agent take an optimal path without unnecessary steps?      | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.execution_efficiency_with_cot_reasons) |
| [PlanAdherence](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.PlanAdherence)             | Does the agent follow its stated plan during execution?             | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.plan_adherence_with_cot_reasons)       |
| [PlanQuality](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.PlanQuality)                 | Is the agent's plan well-structured and appropriate for the goal?   | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.plan_quality_with_cot_reasons)         |
| [ToolSelection](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.ToolSelection)             | Does the agent choose the appropriate tools for each step?          | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.tool_selection_with_cot_reasons)       |
| [ToolCalling](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.ToolCalling)                 | Does the agent invoke tools with correct parameters?                | [Link](https://www.trulens.org/reference/trulens/feedback/#trulens.feedback.LLMProvider.tool_calling_with_cot_reasons)         |

Agent trace scorers require a `trace` argument and evaluate the full execution trace:

python

```
import mlflow
from mlflow.genai.scorers.trulens import LogicalConsistency, ToolSelection

traces = mlflow.search_traces(experiment_ids=["1"])
results = mlflow.genai.evaluate(
    data=traces,
    scorers=[
        LogicalConsistency(model="openai:/gpt-5-mini"),
        ToolSelection(model="openai:/gpt-5-mini"),
    ],
)
```

## Creating Scorers by Name[​](#creating-scorers-by-name "Direct link to Creating Scorers by Name")

You can also create TruLens scorers dynamically using [get\_scorer](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.trulens.get_scorer):

python

```
from mlflow.genai.scorers.trulens import get_scorer

# Create scorer by name
scorer = get_scorer(
    metric_name="Groundedness",
    model="openai:/gpt-5-mini",
)

feedback = scorer(
    inputs="What is MLflow?",
    outputs="MLflow is a platform for ML workflows.",
    expectations={"context": "MLflow is an ML platform."},
)
```

## Configuration[​](#configuration "Direct link to Configuration")

TruLens scorers accept common parameters for controlling evaluation behavior:

python

```
from mlflow.genai.scorers.trulens import Groundedness, ContextRelevance

# Common parameters
scorer = Groundedness(
    model="openai:/gpt-5-mini",  # Model URI (also supports "databricks", "databricks:/endpoint", etc.)
    threshold=0.7,  # Pass/fail threshold (0.0-1.0, scorer passes if score >= threshold)
)

# Default threshold is 0.5
scorer = ContextRelevance(model="openai:/gpt-5-mini")
```

Refer to the [TruLens documentation](https://www.trulens.org/) for additional details on feedback functions and advanced usage.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Agents](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn specialized techniques for evaluating AI agents with tool usage](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand application behavior](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

### [Built-in Judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Explore MLflow's built-in evaluation judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

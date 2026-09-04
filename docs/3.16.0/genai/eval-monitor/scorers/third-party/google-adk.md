# Google ADK

[Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/) is an open-source framework from Google for building and evaluating AI agents. MLflow's Google ADK integration allows you to use ADK's deterministic evaluators and LLM-judge evaluators as MLflow scorers for assessing tool call trajectories, response similarity, response quality, safety, and hallucination.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Google ADK scorers require the `google-adk` package:

bash

```
pip install "mlflow>=3.13" "google-adk"
```

MLflow 3.11 added `ToolTrajectory` and `ResponseMatch`. MLflow 3.13 added the three LLM-judge scorers (`ResponseEvaluation`, `Safety`, `Hallucination`). Install MLflow 3.13 or later for the full set.

If you're also tracing your agent, see the [Google ADK tracing integration](/docs/3.16.0/genai/tracing/integrations/listing/google-adk.md) for one-line auto-tracing setup. The deterministic scorers on this page read tool calls directly from those traces.

## Quick Start[​](#quick-start "Direct link to Quick Start")

You can call Google ADK scorers directly:

python

```
from mlflow.genai.scorers.google_adk import ToolTrajectory



scorer = ToolTrajectory(match_type="EXACT", threshold=0.5)

feedback = scorer(

    inputs="Book a flight to Paris",

    outputs="Booked flight AA123 to Paris",

    expectations={

        "expected_tool_calls": [

            {"name": "search_flights", "args": {"destination": "Paris"}},

            {"name": "book_flight", "args": {"flight_id": "AA123"}},

        ],

        "actual_tool_calls": [

            {"name": "search_flights", "args": {"destination": "Paris"}},

            {"name": "book_flight", "args": {"flight_id": "AA123"}},

        ],

    },

)



print(feedback.value)  # "yes" or "no"

print(feedback.metadata["score"])  # 1.0
```

Or use them in [mlflow.genai.evaluate](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate):

python

```
import mlflow

from mlflow.genai.scorers.google_adk import ToolTrajectory, ResponseMatch



eval_dataset = [

    {

        "inputs": {"query": "Book a flight to Paris"},

        "outputs": "Booked flight AA123 to Paris",

        "expectations": {

            "expected_tool_calls": [

                {"name": "search_flights", "args": {"destination": "Paris"}},

                {"name": "book_flight", "args": {"flight_id": "AA123"}},

            ],

            "actual_tool_calls": [

                {"name": "search_flights", "args": {"destination": "Paris"}},

                {"name": "book_flight", "args": {"flight_id": "AA123"}},

            ],

            "expected_response": "Successfully booked flight AA123 to Paris.",

        },

    },

]



results = mlflow.genai.evaluate(

    data=eval_dataset,

    scorers=[

        ToolTrajectory(match_type="EXACT", threshold=0.5),

        ResponseMatch(threshold=0.5),

    ],

)
```

## Available Google ADK Scorers[​](#available-google-adk-scorers "Direct link to Available Google ADK Scorers")

### Deterministic Scorers[​](#deterministic-scorers "Direct link to Deterministic Scorers")

Deterministic scorers do not require an LLM judge:

| Scorer                                                                                                                   | What does it evaluate?                                               | ADK Docs                                            |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------- |
| [ToolTrajectory](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.ToolTrajectory) | Does the agent call the correct tools in the expected order?         | [Link](https://google.github.io/adk-docs/evaluate/) |
| [ResponseMatch](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.ResponseMatch)   | How similar is the agent's response to a reference answer (ROUGE-1)? | [Link](https://google.github.io/adk-docs/evaluate/) |

### LLM Judge Scorers[​](#llm-judge-scorers "Direct link to LLM Judge Scorers")

LLM judge scorers use a Gemini model to grade the agent's response:

| Scorer                                                                                                                           | What does it evaluate?                                             | ADK Docs                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| [ResponseEvaluation](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.ResponseEvaluation) | Does the agent's response match the expected response (LLM judge)? | [Link](https://google.github.io/adk-docs/evaluate/) |
| [Safety](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.Safety)                         | Is the agent's response safe and free of harmful content?          | [Link](https://google.github.io/adk-docs/evaluate/) |
| [Hallucination](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.Hallucination)           | Is the agent's response factually grounded (not hallucinated)?     | [Link](https://google.github.io/adk-docs/evaluate/) |

note

LLM judge scorers require a model that ADK's `LlmRegistry` can resolve, such as `gemini-2.5-flash`. MLflow model URIs like `databricks` or `openai:/gpt-4o` aren't supported here, because ADK's evaluators wire directly into Google's model registry. If you need an OpenAI, Anthropic, or Databricks judge backend, the [TruLens](/docs/3.16.0/genai/eval-monitor/scorers/third-party/trulens.md) and [DeepEval](/docs/3.16.0/genai/eval-monitor/scorers/third-party/deepeval.md) integrations cover the broader provider set.

caution

`ResponseEvaluation` and `Hallucination` call the Gemini Developer API and accept a `GEMINI_API_KEY` or `GOOGLE_API_KEY` plus `GOOGLE_GENAI_USE_VERTEXAI=false`. `Safety` is routed by ADK through the Vertex AI Evaluation Service (`_SingleTurnVertexAiEvalFacade`) and requires Google Cloud project credentials (`GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, and `gcloud auth application-default login` or a service account). When auth is missing, scorers return a `Feedback` with an `error` field rather than raising, so evaluation runs can continue and surface the misconfiguration per-sample.

## How Tool Calls Are Resolved[​](#how-tool-calls-are-resolved "Direct link to How Tool Calls Are Resolved")

`ToolTrajectory` needs both the expected tool calls (from `expectations["expected_tool_calls"]`) and the actual tool calls the agent made. It resolves the actual calls in this order:

1. **`expectations["actual_tool_calls"]` when present.** Useful for offline evaluation where you've captured tool calls as data, or for synthetic test cases.
2. **`TOOL` spans on the MLflow trace.** When no explicit override is provided, the scorer walks the trace and reads tool calls from spans tagged as `TOOL`. This is the path for live evaluations that use `mlflow.genai.evaluate(predict_fn=...)` or pass a trace directly.
3. **Empty list.** If neither is available, the scorer compares the expected list against an empty actual list, which results in a 0.0 score for non-empty expectations.

Returned tool call dicts have `name` and `args` keys, matching the shape used under `expectations["expected_tool_calls"]`. This keeps the same call format consistent across offline data and live trace extraction.

## Creating Scorers by Name[​](#creating-scorers-by-name "Direct link to Creating Scorers by Name")

You can also create Google ADK scorers dynamically using [get\_scorer](/docs/3.16.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.get_scorer):

python

```
from mlflow.genai.scorers.google_adk import get_scorer



scorer = get_scorer(

    metric_name="ToolTrajectory",

    match_type="IN_ORDER",

    threshold=0.5,

)



feedback = scorer(

    inputs="Search for flights to Paris",

    outputs="Found 3 flights to Paris",

    expectations={

        "expected_tool_calls": [

            {"name": "search_flights", "args": {"destination": "Paris"}},

        ],

        "actual_tool_calls": [

            {"name": "search_flights", "args": {"destination": "Paris"}},

        ],

    },

)
```

## Configuration[​](#configuration "Direct link to Configuration")

Google ADK scorers accept parameters that control evaluation behavior:

python

```
from mlflow.genai.scorers.google_adk import ToolTrajectory, ResponseMatch



# ToolTrajectory supports three matching strategies:

# - "EXACT": tools must match in exact order and count (default)

# - "IN_ORDER": expected tools must appear in order, extra tools allowed

# - "ANY_ORDER": expected tools must all appear, order does not matter

trajectory_scorer = ToolTrajectory(

    match_type="IN_ORDER",

    threshold=0.5,

)



# ResponseMatch computes ROUGE-1 F-measure between output and reference

rouge_scorer = ResponseMatch(

    threshold=0.6,  # Minimum ROUGE-1 score to pass

)
```

`ResponseEvaluation` and `Hallucination` take a Gemini model ID, a pass/fail threshold, and a sample count for majority voting:

python

```
from mlflow.genai.scorers.google_adk import Hallucination, ResponseEvaluation



response_eval = ResponseEvaluation(

    model="gemini-2.5-flash",

    threshold=0.5,

    num_samples=5,

)



hallucination = Hallucination(model="gemini-2.5-flash", threshold=0.5)
```

`Safety` does not accept `model` or `num_samples` because ADK's `SafetyEvaluatorV1` delegates to Vertex AI's prebuilt `SAFETY` metric, which ignores them. Passing either argument raises `TypeError`:

python

```
from mlflow.genai.scorers.google_adk import Safety



safety = Safety(threshold=0.5)
```

Refer to the [Google ADK documentation](https://google.github.io/adk-docs/evaluate/) for details on evaluation metrics.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Agents](/docs/3.16.0/genai/eval-monitor/running-evaluation/agents.md)

[Learn specialized techniques for evaluating AI agents with tool usage](/docs/3.16.0/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/3.16.0/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/3.16.0/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand application behavior](/docs/3.16.0/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/3.16.0/genai/eval-monitor/running-evaluation/traces.md)

### [Predefined Scorers](/docs/3.16.0/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Explore MLflow's built-in evaluation scorers](/docs/3.16.0/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Learn more →](/docs/3.16.0/genai/eval-monitor/scorers/llm-judge/predefined.md)

# Google ADK

[Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/) is an open-source framework from Google for building and evaluating AI agents. MLflow's Google ADK integration allows you to use ADK's deterministic evaluators as MLflow scorers for assessing tool call trajectories and response similarity.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Google ADK scorers require the `google-adk` package:

bash

```
pip install google-adk
```

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

Or use them in [mlflow.genai.evaluate](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate):

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

Google ADK scorers provide deterministic evaluation without requiring an LLM judge:

| Scorer                                                                                                                   | What does it evaluate?                                               | ADK Docs                                            |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------- |
| [ToolTrajectory](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.ToolTrajectory) | Does the agent call the correct tools in the expected order?         | [Link](https://google.github.io/adk-docs/evaluate/) |
| [ResponseMatch](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.ResponseMatch)   | How similar is the agent's response to a reference answer (ROUGE-1)? | [Link](https://google.github.io/adk-docs/evaluate/) |

## Creating Scorers by Name[​](#creating-scorers-by-name "Direct link to Creating Scorers by Name")

You can also create Google ADK scorers dynamically using [get\_scorer](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.google_adk.get_scorer):

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

Refer to the [Google ADK documentation](https://google.github.io/adk-docs/evaluate/) for details on evaluation metrics.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Agents](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn specialized techniques for evaluating AI agents with tool usage](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand application behavior](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

### [Predefined Scorers](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Explore MLflow's built-in evaluation scorers](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

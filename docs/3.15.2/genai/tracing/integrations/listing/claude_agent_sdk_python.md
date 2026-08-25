# Tracing the Claude Agent SDK (Python)

[MLflow Tracing](/docs/3.15.2/genai/tracing.md) provides automatic tracing for Python applications built on the [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview). Traces capture:

* User prompts and assistant responses
* Tool calls (file reads/edits, bash, web fetches, etc.) with their inputs and outputs
* Subagent invocations with the full nested trace of every step they ran
* Skill usage
* Per-call and per-session token usage and cost
* Latency for each step

Using TypeScript?

This page covers the **Python** Claude Agent SDK. For the TypeScript SDK, see [Tracing the Claude Agent SDK (TypeScript)](/docs/3.15.2/genai/tracing/integrations/listing/claude_agent_sdk_typescript.md).

## Setup[​](#setup "Direct link to Setup")

### Requirements[​](#requirements "Direct link to Requirements")

* MLflow >= 3.5 (`pip install 'mlflow>=3.5'`)
* [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) >= 0.1.0 (`pip install 'claude-agent-sdk>=0.1.0'`)

### Basic setup[​](#basic-setup "Direct link to Basic setup")

Call `mlflow.anthropic.autolog()` before creating your `ClaudeSDKClient`. Once enabled, every interaction is automatically traced:

python

```
import asyncio



import mlflow

import mlflow.anthropic

from claude_agent_sdk import ClaudeSDKClient



mlflow.set_experiment("my_claude_app")

mlflow.anthropic.autolog()





async def main():

    async with ClaudeSDKClient() as client:

        await client.query("What is the capital of France?")



        async for message in client.receive_response():

            print(message)





if __name__ == "__main__":

    asyncio.run(main())
```

note

Python SDK tracing currently supports `ClaudeSDKClient`. Directly calling `query()` is not traced.

### Using Claude Agent SDK tracing with MLflow Evaluation[​](#using-claude-agent-sdk-tracing-with-mlflow-evaluation "Direct link to Using Claude Agent SDK tracing with MLflow Evaluation")

You can combine Python SDK tracing with MLflow's evaluation framework to score agent runs:

python

```
import asyncio

from typing import Literal



import mlflow

import mlflow.anthropic

from claude_agent_sdk import ClaudeSDKClient

from mlflow.genai.judges import make_judge



# Set the experiment before enabling tracing so every trace lands in the right place.

mlflow.set_experiment("claude_evaluation")



# Enable auto tracing so each agent run is captured as an MLflow trace.

mlflow.anthropic.autolog()





# Run the Claude Agent SDK against a single query and return the full response text.

async def run_agent(query: str) -> str:

    async with ClaudeSDKClient() as client:

        await client.query(query)



        response_text = ""

        async for message in client.receive_response():

            response_text += str(message) + "\n\n"



        return response_text





# Synchronous wrapper so `mlflow.genai.evaluate` can call our async agent.

def predict_fn(query: str) -> str:

    return asyncio.run(run_agent(query))





# Define an LLM-as-judge scorer that grades each response as "pass" or "fail".

relevance = make_judge(

    name="relevance",

    instructions=(

        "Evaluate if the response in {{ outputs }} is relevant to "

        "the question in {{ inputs }}. Return either 'pass' or 'fail'."

    ),

    feedback_value_type=Literal["pass", "fail"],

    model="openai:/gpt-5.5",

)



# Evaluation dataset: list of {"inputs": {...}} dicts, no pandas needed.

eval_data = [

    {"inputs": {"query": "What is machine learning?"}},

    {"inputs": {"query": "Explain neural networks"}},

]



# Runs `predict_fn` over each row, scores it with `relevance`, and logs the run.

mlflow.genai.evaluate(data=eval_data, predict_fn=predict_fn, scorers=[relevance])
```

### Disable tracing[​](#disable-tracing "Direct link to Disable tracing")

python

```
mlflow.anthropic.autolog(disable=True)
```

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for Claude Agent SDK runs **without any extra setup**. Token counts for each LLM call are logged on the relevant span, and the aggregated cost and time trends are displayed in the built-in experiment dashboard. See [Token Usage and Cost Tracking](/docs/3.15.2/genai/tracing/token-usage-cost.md) for details.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**No traces appearing**

* Tracing only works with `ClaudeSDKClient`; direct calls to `query()` are not supported.
* Verify `mlflow.anthropic.autolog()` is called **before** creating the `ClaudeSDKClient`.

**Tracking URI / experiment issues**

* Confirm the tracking URI is reachable and the experiment exists.
* Check that your Python interpreter can reach the MLflow server.

# Tracing Anthropic

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing capability for Anthropic LLMs. By enabling auto tracing for Anthropic by calling the [`mlflow.anthropic.autolog()`](/docs/latest/api_reference/python_api/mlflow.anthropic.html#mlflow.anthropic.autolog) function, MLflow will capture nested traces and log them to the active MLflow Experiment upon invocation of Anthropic Python SDK.

![Anthropic Tracing via autolog](/docs/latest/images/llms/anthropic/anthropic-tracing.png)

MLflow trace automatically captures the following information about Anthropic calls:

* Prompts and completion responses
* Latencies
* Model name
* Additional metadata such as `temperature`, `max_tokens`, if specified.
* Function calling if returned in the response
* Token usage information
* Any exception if raised
* and more...

## Getting Started[​](#getting-started "Direct link to Getting Started")

1

### Install Dependencies

* Python
* JS / TS

bash

```
pip install mlflow anthropic
```

bash

```
npm install @mlflow/anthropic @anthropic-ai/sdk
```

2

### Start MLflow Server

* Local (pip)
* Local (docker)

If you have a local Python environment >= 3.10, you can start the MLflow server locally using the `mlflow` CLI command.

bash

```
mlflow server
```

MLflow also provides a Docker Compose file to start a local MLflow server with a postgres database and a minio server.

bash

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/mlflow/mlflow.git
cd mlflow
git sparse-checkout set docker-compose
cd docker-compose
cp .env.dev.example .env
docker compose up -d
```

Refer to the [instruction](https://github.com/mlflow/mlflow/tree/master/docker-compose/README.md) for more details, e.g., overriding the default environment variables.

3

### Enable Tracing and Make API Calls

* Chat Completion API
* JS / TS

Enable tracing with `mlflow.anthropic.autolog()` and make API calls as usual.

python

```
import anthropic
import mlflow

# Enable auto-tracing for Anthropic
mlflow.anthropic.autolog()

# Set a tracking URI and an experiment
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("Anthropic")

# Invoke the Anthropic model as usual.
# Make sure your API key is set via the ANTHROPIC_API_KEY environment variable.
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-5-2025092",
    max_tokens=512,
    messages=[
        {"role": "user", "content": "Hello, Claude"},
    ],
)
```

Wrap the Anthropic client with the `tracedAnthropic` function and make API calls as usual.

typescript

```
import Anthropic from "@anthropic-ai/sdk";
import { tracedAnthropic } from "@mlflow/anthropic";

// Wrap the Anthropic client with the tracedAnthropic function
const client = tracedAnthropic(new Anthropic());

// Invoke the client as usual
const message = await client.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 512,
  messages: [
    { role: "user", content: "Hello, Claude" },
  ],
});
```

4

### View Traces in MLflow UI

Browse to the MLflow UI at <http://localhost:5000> (or your MLflow server URL) and you should see the traces for the Anthropic API calls.

![Anthropic Tracing](/docs/latest/images/llms/anthropic/anthropic-basic-tracing.png)

## Supported APIs[​](#supported-apis "Direct link to Supported APIs")

MLflow supports automatic tracing for the following Anthropic APIs:

| Chat Completion | Function Calling | Streaming | Async    | Image | Batch |
| --------------- | ---------------- | --------- | -------- | ----- | ----- |
| ✅              | ✅               | ✅        | ✅ (\*1) | -     | -     |

(\*1) Async support was added in MLflow 2.21.0.

To request support for additional APIs, please open a [feature request](https://github.com/mlflow/mlflow/issues) on GitHub.

Image Support in Anthropic Traces

MLflow automatically captures images sent to Anthropic models and normalizes them to the standard trace format. See [Image and Audio (Multimodal) Content in Traces](/docs/latest/genai/tracing/observe-with-traces/multimodal.md) for examples.

## Async[​](#async "Direct link to Async")

MLflow Tracing has supported the asynchronous API of the Anthropic SDK since MLflow 2.21.0. Its usage is the same as the synchronous API.

* Python
* JS / TS

python

```
import anthropic

# Enable trace logging
mlflow.anthropic.autolog()

client = anthropic.AsyncAnthropic()

response = await client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"},
    ],
)
```

Anthropic Typescript / Javascript SDK is natively async. See the Getting Started example above.

## Advanced Example: Tool Calling Agent[​](#advanced-example-tool-calling-agent "Direct link to Advanced Example: Tool Calling Agent")

MLflow Tracing automatically captures tool calling response from Anthropic models. The function instruction in the response will be highlighted in the trace UI. Moreover, you can annotate the tool function with the `@mlflow.trace` decorator to create a span for the tool execution.

The following example implements a simple function calling agent using Anthropic Tool Calling and MLflow Tracing for Anthropic. The example further uses the asynchronous Anthropic SDK so that the agent can handle concurrent invocations without blocking.

python

```
import json
import anthropic
import mlflow
import asyncio
from mlflow.entities import SpanType

client = anthropic.AsyncAnthropic()
model_name = "claude-sonnet-4-5-20250929"


# Define the tool function. Decorate it with `@mlflow.trace` to create a span for its execution.
@mlflow.trace(span_type=SpanType.TOOL)
async def get_weather(city: str) -> str:
    if city == "Tokyo":
        return "sunny"
    elif city == "Paris":
        return "rainy"
    return "unknown"


tools = [
    {
        "name": "get_weather",
        "description": "Returns the weather condition of a given city.",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    }
]

_tool_functions = {"get_weather": get_weather}


# Define a simple tool calling agent
@mlflow.trace(span_type=SpanType.AGENT)
async def run_tool_agent(question: str):
    messages = [{"role": "user", "content": question}]

    # Invoke the model with the given question and available tools
    ai_msg = await client.messages.create(
        model=model_name,
        messages=messages,
        tools=tools,
        max_tokens=2048,
    )
    messages.append({"role": "assistant", "content": ai_msg.content})

    # If the model requests tool call(s), invoke the function with the specified arguments
    tool_calls = [c for c in ai_msg.content if c.type == "tool_use"]
    for tool_call in tool_calls:
        if tool_func := _tool_functions.get(tool_call.name):
            tool_result = await tool_func(**tool_call.input)
        else:
            raise RuntimeError("An invalid tool is returned from the assistant!")

        messages.append({
            "role": "user",
            "content": [
                {
                    "type": "tool_result",
                    "tool_use_id": tool_call.id,
                    "content": tool_result,
                }
            ],
        })

    # Send the tool results to the model and get a new response
    response = await client.messages.create(
        model=model_name,
        messages=messages,
        max_tokens=2048,
    )

    return response.content[-1].text


# Run the tool calling agent
cities = ["Tokyo", "Paris", "Sydney"]
questions = [f"What's the weather like in {city} today?" for city in cities]
answers = await asyncio.gather(*(run_tool_agent(q) for q in questions))

for city, answer in zip(cities, answers):
    print(f"{city}: {answer}")
```

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for Anthropic API calls. The token usage for each LLM call will be logged in each Trace/Span and the aggregated cost and time trend are displayed in the built-in dashboard. See the [Token Usage and Cost Tracking](/docs/latest/genai/tracing/token-usage-cost.md) documentation for details on accessing this information programmatically.

#### Supported APIs:[​](#supported-apis-1 "Direct link to Supported APIs:")

Token usage and cost tracking is supported for the following Anthropic APIs:

| Chat Completion | Function Calling | Streaming | Async    | Image | Batch |
| --------------- | ---------------- | --------- | -------- | ----- | ----- |
| ✅              | ✅               | -         | ✅ (\*1) | -     | -     |

(\*1) Async support was added in MLflow 2.21.0.

## Disable auto-tracing[​](#disable-auto-tracing "Direct link to Disable auto-tracing")

Auto tracing for Anthropic can be disabled globally by calling `mlflow.anthropic.autolog(disable=True)` or `mlflow.autolog(disable=True)`.

## Next steps[​](#next-steps "Direct link to Next steps")

### [Track User Feedback](/docs/latest/genai/tracing/collect-user-feedback.md)

[Record user feedback on traces for tracking user satisfaction.](/docs/latest/genai/tracing/collect-user-feedback.md)

[Learn about feedback →](/docs/latest/genai/tracing/collect-user-feedback.md)

### [Manage Prompts](/docs/latest/genai/prompt-registry.md)

[Learn how to manage prompts with MLflow's prompt registry.](/docs/latest/genai/prompt-registry.md)

[Manage prompts →](/docs/latest/genai/prompt-registry.md)

### [Evaluate Traces](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces with LLM judges to understand and improve your AI application's behavior.](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

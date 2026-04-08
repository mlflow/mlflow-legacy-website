# Tracing Ollama

[MLflow Tracing](/docs/latest/genai/tracing/integrations.md) provides automatic tracing capability for [Ollama](https://ollama.com/) models through the OpenAI SDK integration. Because Ollama exposes an OpenAI-compatible API, you can simply use `mlflow.openai.autolog()` to trace Ollama calls.

![Ollama Tracing via autolog](/docs/latest/images/llms/tracing/openai-function-calling.png)

MLflow trace automatically captures the following information about Ollama calls:

* Prompts and completion responses
* Latencies
* Token usage
* Model name
* Additional metadata such as `temperature`, `max_tokens`, if specified.
* Function calling if returned in the response
* Any exception if raised
* and more...

## Getting Started[​](#getting-started "Direct link to Getting Started")

1

### Install dependencies

* Python
* JS / TS

bash

```
pip install mlflow openai
```

bash

```
npm install @mlflow/openai openai
```

2

### Start MLflow server

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

### Run Ollama server

Ensure your Ollama server is running and the model you want to use is pulled.

bash

```
ollama run llama3.2:1b
```

4

### Enable tracing and call Ollama

* Python
* JS / TS

python

```
import mlflow
from openai import OpenAI

# Enable auto-tracing for OpenAI (works with Ollama)
mlflow.openai.autolog()

# Optional: Set a tracking URI and an experiment
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("Ollama")

# Initialize the OpenAI client with Ollama API endpoint
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="dummy",
)

response = client.chat.completions.create(
    model="llama3.2:1b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Why is the sky blue?"},
    ],
    temperature=0.1,
    max_tokens=100,
)
```

typescript

```
import { OpenAI } from "openai";
import { tracedOpenAI } from "@mlflow/openai";

// Wrap the OpenAI client and point to Ollama endpoint
const client = tracedOpenAI(
  new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "dummy",
  })
);

const response = await client.chat.completions.create({
  model: "llama3.2:1b",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Why is the sky blue?" },
  ],
  temperature: 0.1,
  max_tokens: 100,
});
```

5

### View traces in MLflow UI

Browse to your MLflow UI (for example, <http://localhost:5000>) and open the `Ollama` experiment to see traces for the calls above.

![Ollama Tracing](/docs/latest/images/llms/tracing/basic-openai-trace.png)

→ View *[Next Steps](#next-steps)* for learning about more MLflow features like user feedback tracking, prompt management, and evaluation.

## Supported APIs[​](#supported-apis "Direct link to Supported APIs")

MLflow supports automatic tracing for the following Ollama APIs through the OpenAI integration:

| Chat Completion | Function Calling | Streaming | Async    |
| --------------- | ---------------- | --------- | -------- |
| ✅              | ✅               | ✅ (\*1)  | ✅ (\*2) |

(\*1) Streaming support requires MLflow 2.15.0 or later. (\*2) Async support requires MLflow 2.21.0 or later.

To request support for additional APIs, please open a [feature request](https://github.com/mlflow/mlflow/issues/new?assignees=\&labels=enhancement\&projects=\&template=feature_request_template.yaml) on GitHub.

## Streaming and Async Support[​](#streaming-and-async-support "Direct link to Streaming and Async Support")

MLflow supports tracing for streaming and async Ollama APIs. Visit the [OpenAI Tracing documentation](/docs/latest/genai/tracing/integrations/listing/openai.md) for example code snippets for tracing streaming and async calls through OpenAI SDK.

## Combine with Manual Tracing[​](#combine-with-manual-tracing "Direct link to Combine with Manual Tracing")

To control the tracing behavior more precisely, MLflow provides [Manual Tracing SDK](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md) to create spans for your custom code. Manual tracing can be used in conjunction with auto-tracing to create a custom trace while keeping the auto-tracing convenience. For more details, please refer to the [Combine with Manual Tracing](/docs/latest/genai/tracing/integrations/listing/openai.md#combine-with-manual-tracing) section in the OpenAI Tracing documentation.

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for Ollama models through the OpenAI SDK integration. The token usage for each LLM call will be logged in each Trace/Span and the aggregated cost and time trend are displayed in the built-in dashboard. See the [Token Usage and Cost Tracking](/docs/latest/genai/tracing/token-usage-cost.md) documentation for details on accessing this information programmatically.

note

Cost may not be available for many local Ollama models as pricing data is not available.

## Disable auto-tracing[​](#disable-auto-tracing "Direct link to Disable auto-tracing")

Auto tracing for Ollama (through OpenAI SDK) can be disabled globally by calling `mlflow.openai.autolog(disable=True)` or `mlflow.autolog(disable=True)`.

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

# Tracing Google Agent Development Kit (ADK)

![Google ADK Tracing](/docs/latest/images/llms/tracing/google-adk-tracing.png)

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing capability for [Google ADK](https://google.github.io/adk-docs/), a flexible and modular AI agents framework developed by Google. MLflow supports tracing for Google ADK through the [OpenTelemetry](/docs/latest/genai/tracing/opentelemetry.md) integration.

## Step 1: Install libraries[​](#step-1-install-libraries "Direct link to Step 1: Install libraries")

bash

```
pip install 'mlflow>=3.6.0' google-adk opentelemetry-exporter-otlp-proto-http
```

## Step 2: Start the MLflow Tracking Server[​](#step-2-start-the-mlflow-tracking-server "Direct link to Step 2: Start the MLflow Tracking Server")

Start the MLflow Tracking Server with a SQL-based backend store:

bash

```
mlflow server --backend-store-uri sqlite:///mlflow.db --port 5000
```

This example uses SQLite as the backend store. To use other types of SQL databases such as PostgreSQL, MySQL, and MSSQL, change the store URI as described in the [backend store documentation](/docs/latest/self-hosting/architecture/backend-store.md). OpenTelemetry ingestion is not supported with file-based backend stores.

## Step 3: Configure OpenTelemetry[​](#step-3-configure-opentelemetry "Direct link to Step 3: Configure OpenTelemetry")

Configure the OpenTelemetry tracer to export traces to the MLflow Tracking Server endpoint.

* Set the endpoint to the MLflow Tracking Server's `/v1/traces` endpoint (OTLP).
* Set the `x-mlflow-experiment-id` header to the MLflow experiment ID. If you don't have an experiment ID, create it from Python SDK or the MLflow UI.

bash

```
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:5000
export OTEL_EXPORTER_OTLP_HEADERS=x-mlflow-experiment-id=123
```

## Step 4: Run the Agent[​](#step-4-run-the-agent "Direct link to Step 4: Run the Agent")

Define and invoke the agent in a Python script like `my_agent/agent.py` as usual. Google ADK will generate traces for your agent and send them to the MLflow Tracking Server endpoint. To enable tracing for Google ADK and send traces to MLflow, set up the OpenTelemetry tracer provider with the `OTLPSpanExporter` before running the agent.

python

```
# my_agent/agent.py
from google.adk.agents import LlmAgent
from google.adk.tools import FunctionTool

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor

# Configure the tracer provider and add the exporter
tracer_provider = TracerProvider()
tracer_provider.add_span_processor(SimpleSpanProcessor(OTLPSpanExporter()))
trace.set_tracer_provider(tracer_provider)


def calculator(a: float, b: float) -> str:
    """Add two numbers and return the result.

    Args:
        a: First number
        b: Second number

    Returns:
        The sum of a and b
    """
    return str(a + b)


calculator_tool = FunctionTool(func=calculator)

root_agent = LlmAgent(
    name="MathAgent",
    model="gemini-2.0-flash-exp",
    instruction=(
        "You are a helpful assistant that can do math. "
        "When asked a math problem, use the calculator tool to solve it."
    ),
    tools=[calculator_tool],
)
```

Run the agent with the `adk run` command or the web UI.

bash

```
adk run my_agent
```

Open the MLflow UI at `http://localhost:5000` and navigate to the experiment to see the traces.

## Combine with the MLflow Tracing SDK[​](#combine-with-the-mlflow-tracing-sdk "Direct link to Combine with the MLflow Tracing SDK")

Since this integration is built on OpenTelemetry, you can combine the automatically generated traces with the [MLflow Tracing SDK](/docs/latest/genai/tracing.md) to add custom spans, set tags, and log assessments within the same trace. This is useful when you want to enrich the auto-generated traces with additional application-specific context.

To enable this, set the `MLFLOW_USE_DEFAULT_TRACER_PROVIDER` environment variable to `false` and call [`mlflow.tracing.set_destination()`](/docs/latest/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.set_destination) to merge spans from both SDKs into a single trace.

python

```
import os

os.environ["MLFLOW_USE_DEFAULT_TRACER_PROVIDER"] = "false"

import mlflow
from mlflow.entities.trace_location import MlflowExperimentLocation

mlflow.set_tracking_uri("http://localhost:5000")
exp_id = mlflow.set_experiment("Google ADK").experiment_id
mlflow.tracing.set_destination(MlflowExperimentLocation(exp_id))

# Add custom MLflow spans alongside the auto-generated ADK traces
with mlflow.start_span("custom_step") as span:
    span.set_inputs({"query": "test"})
    # your application logic here
    span.set_outputs({"result": "success"})
```

For detailed instructions and examples, see [Combining the OpenTelemetry SDK and the MLflow Tracing SDK](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md#combining-the-opentelemetry-sdk-and-the-mlflow-tracing-sdk).

## Next Steps[​](#next-steps "Direct link to Next Steps")

* [Evaluate the Agent](/docs/latest/genai/eval-monitor/running-evaluation/agents.md): Learn how to evaluate the agent's performance.
* [Manage Prompts](/docs/latest/genai/prompt-registry.md): Learn how to manage prompts for the agent.
* [Automatic Agent Optimization](/docs/latest/genai/prompt-registry/optimize-prompts.md): Learn how to automatically optimize the agent end-to-end with state-of-the-art optimization algorithms.

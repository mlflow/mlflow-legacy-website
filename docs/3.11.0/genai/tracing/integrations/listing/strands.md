# Tracing Strands Agents SDK

![Agno Tracing via autolog](/docs/3.11.0/images/llms/strands/strands-tracing.png)

[Strands Agents SDK](https://github.com/strands-agents/sdk-python) is an open‑source, model‑driven SDK developed by AWS that enables developers to create autonomous AI agents simply by defining a model, a set of tools, and a prompt in just a few lines of code.

[MLflow Tracing](/docs/3.11.0/genai/tracing/integrations.md) provides automatic tracing capability for Strands Agents SDK. By enabling auto tracing for Strands Agents SDK by calling the [`mlflow.strands.autolog()`](/docs/3.11.0/api_reference/python_api/mlflow.strands.html#mlflow.strands.autolog) function, MLflow will capture traces for Agent invocation and log them to the active MLflow Experiment.

python

```
import mlflow

mlflow.strands.autolog()
```

MLflow trace automatically captures the following information about Agentic calls:

* Prompts and completion responses
* Latencies
* Metadata about the different Agents, such as function names
* Token usages and cost
* Cache hit
* Any exception if raised

### Basic Example[​](#basic-example "Direct link to Basic Example")

python

```
import mlflow

mlflow.strands.autolog()
mlflow.set_experiment("Strand Agent")

from strands import Agent
from strands.models.openai import OpenAIModel
from strands_tools import calculator

model = OpenAIModel(
    client_args={"api_key": "<api-key>"},
    # **model_config
    model_id="gpt-4o",
    params={
        "max_tokens": 2000,
        "temperature": 0.7,
    },
)

agent = Agent(model=model, tools=[calculator])
response = agent("What is 2+2")
print(response)
```

![Strands Agent SDK Tracing via autolog](/docs/3.11.0/assets/images/strands-tracing-d93b7aa1a7acb19402282286c1b02843.png)

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for Strands Agent SDK. The token usage for each LLM call will be logged in each Trace/Span and the aggregated cost and time trend are displayed in the built-in dashboard. See the [Token Usage and Cost Tracking](/docs/3.11.0/genai/tracing/token-usage-cost.md) documentation for details on accessing this information programmatically.

## Combine with the MLflow Tracing SDK[​](#combine-with-the-mlflow-tracing-sdk "Direct link to Combine with the MLflow Tracing SDK")

Since this integration is built on OpenTelemetry, you can combine the automatically generated traces with the [MLflow Tracing SDK](/docs/3.11.0/genai/tracing.md) to add custom spans, set tags, and log assessments within the same trace. This is useful when you want to enrich the auto-generated traces with additional application-specific context.

To enable this, set the `MLFLOW_USE_DEFAULT_TRACER_PROVIDER` environment variable to `false` and call [`mlflow.tracing.set_destination()`](/docs/3.11.0/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.set_destination) to merge spans from both SDKs into a single trace.

python

```
import os

os.environ["MLFLOW_USE_DEFAULT_TRACER_PROVIDER"] = "false"

import mlflow
from mlflow.entities.trace_location import MlflowExperimentLocation

mlflow.set_tracking_uri("http://localhost:5000")
exp_id = mlflow.set_experiment("Strands Agents").experiment_id
mlflow.tracing.set_destination(MlflowExperimentLocation(exp_id))

mlflow.strands.autolog()

# Add custom MLflow spans alongside the auto-generated Strands traces
with mlflow.start_span("custom_step") as span:
    span.set_inputs({"query": "test"})
    # your application logic here
    span.set_outputs({"result": "success"})
```

For detailed instructions and examples, see [Combining the OpenTelemetry SDK and the MLflow Tracing SDK](/docs/3.11.0/genai/tracing/app-instrumentation/opentelemetry.md#combining-the-opentelemetry-sdk-and-the-mlflow-tracing-sdk).

### Disable auto-tracing[​](#disable-auto-tracing "Direct link to Disable auto-tracing")

Auto tracing for Strands Agent SDK can be disabled globally by calling `mlflow.strands.autolog(disable=True)` or `mlflow.autolog(disable=True)`.

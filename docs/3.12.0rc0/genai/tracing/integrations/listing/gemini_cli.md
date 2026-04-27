# Tracing Gemini CLI

![Gemini CLI Tracing via OpenTelemetry](/docs/3.12.0rc0/assets/images/gemini-cli-tracing-412b3b9a961602fabd8a837641a08410.png)

[MLflow Tracing](/docs/3.12.0rc0/genai/tracing.md) provides automatic tracing for [Gemini CLI](https://github.com/google-gemini/gemini-cli), Google's open-source terminal-based coding agent. Gemini CLI has built-in OpenTelemetry support that sends rich conversation traces directly to MLflow's OTLP endpoint. Traces automatically capture:

* User prompts and assistant responses (including thinking/reasoning)
* LLM calls with model name, token usage, and cost
* Tool calls and their results
* Session metadata

## Setup[​](#setup "Direct link to Setup")

Gemini CLI traces are ingested via its native OTLP telemetry --- no MLflow CLI command is needed.

### Requirements[​](#requirements "Direct link to Requirements")

* MLflow tracking server (with the OTLP endpoint enabled)
* [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed (`npm install -g @google/gemini-cli`)
* Node.js 22+

### Step 1: Set Environment Variables[​](#step-1-set-environment-variables "Direct link to Step 1: Set Environment Variables")

bash

```
# Enable Gemini telemetry and point it at MLflow

export GEMINI_TELEMETRY_ENABLED=true

export GEMINI_TELEMETRY_TARGET=local

export GEMINI_TELEMETRY_OTLP_ENDPOINT=http://localhost:5000

export GEMINI_TELEMETRY_OTLP_PROTOCOL=http



# Set the MLflow experiment ID via standard OTLP headers

export OTEL_EXPORTER_OTLP_HEADERS=x-mlflow-experiment-id=0
```

### Step 2: Run Gemini CLI[​](#step-2-run-gemini-cli "Direct link to Step 2: Run Gemini CLI")

bash

```
# Tracing happens automatically

gemini
```

Traces are sent to MLflow in real time as you interact with Gemini CLI.

### Step 3: View Traces[​](#step-3-view-traces "Direct link to Step 3: View Traces")

bash

```
mlflow server

# Navigate to your experiment in the UI
```

## Configuration Reference[​](#configuration-reference "Direct link to Configuration Reference")

| Environment Variable             | Required | Description                                                                                       |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `GEMINI_TELEMETRY_ENABLED`       | Yes      | Set to `true` to enable telemetry                                                                 |
| `GEMINI_TELEMETRY_TARGET`        | Yes      | Set to `local` for custom OTLP endpoint                                                           |
| `GEMINI_TELEMETRY_OTLP_ENDPOINT` | Yes      | MLflow server base URL (e.g., `http://localhost:5000`). Gemini appends `/v1/traces` automatically |
| `GEMINI_TELEMETRY_OTLP_PROTOCOL` | Yes      | Must be `http` (MLflow does not support gRPC ingestion)                                           |
| `OTEL_EXPORTER_OTLP_HEADERS`     | Yes      | Set `x-mlflow-experiment-id=<id>` to route traces to a specific experiment                        |

### Configuration Examples[​](#configuration-examples "Direct link to Configuration Examples")

bash

```
# Local MLflow server, default experiment

export GEMINI_TELEMETRY_ENABLED=true

export GEMINI_TELEMETRY_TARGET=local

export GEMINI_TELEMETRY_OTLP_ENDPOINT=http://localhost:5000

export GEMINI_TELEMETRY_OTLP_PROTOCOL=http

export OTEL_EXPORTER_OTLP_HEADERS=x-mlflow-experiment-id=0



# Databricks-hosted MLflow

# See Databricks documentation for required authentication headers

export GEMINI_TELEMETRY_ENABLED=true

export GEMINI_TELEMETRY_TARGET=local

export GEMINI_TELEMETRY_OTLP_ENDPOINT=https://your-workspace.databricks.com

export GEMINI_TELEMETRY_OTLP_PROTOCOL=http

export OTEL_EXPORTER_OTLP_HEADERS=x-mlflow-experiment-id=123456789
```

## How It Works[​](#how-it-works "Direct link to How It Works")

Gemini CLI emits OpenTelemetry traces using the [GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/). MLflow's OTLP endpoint ingests these traces and automatically:

1. **Maps span types**: `llm_call` to LLM, `tool_call` to TOOL, `agent_call` to AGENT
2. **Extracts token usage**: From `gen_ai.usage.input_tokens` and `gen_ai.usage.output_tokens`
3. **Calculates cost**: Based on the model name from `gen_ai.request.model`
4. **Sets `service.name`**: `gemini-cli` is propagated to the root span for identification
5. **Renders in Chat UI**: Messages are displayed in MLflow's Chat view with thinking/reasoning parts

## Token Usage and Cost[​](#token-usage-and-cost "Direct link to Token Usage and Cost")

MLflow automatically extracts token usage from Gemini CLI's GenAI semantic convention attributes and calculates cost based on the model. See the [Token Usage and Cost Tracking](/docs/3.12.0rc0/genai/tracing/token-usage-cost.md) documentation for details.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**No traces appearing:**

1. Verify the protocol is set to `http` (not `grpc`):

   bash

   ```
   echo $GEMINI_TELEMETRY_OTLP_PROTOCOL  # Should be "http"
   ```

2. Check that the experiment ID header is set:

   bash

   ```
   echo $OTEL_EXPORTER_OTLP_HEADERS  # Should contain "x-mlflow-experiment-id=..."
   ```

3. Check the MLflow server logs for incoming requests:

   bash

   ```
   # Look for POST /v1/traces requests

   tail -f /tmp/mlflow-backend.log
   ```

**400 Bad Request errors:**

* Ensure `GEMINI_TELEMETRY_OTLP_PROTOCOL=http` is set. Without it, Gemini defaults to gRPC which MLflow does not support.

**Traces appearing but empty:**

* Gemini CLI sends a mix of traces. Simple prompts produce `user_prompt` + `llm_call` spans. Complex tasks with tool use produce richer traces with `agent_call`, `tool_call`, and multiple `llm_call` spans.

### Disable Tracing[​](#disable-tracing "Direct link to Disable Tracing")

Unset the telemetry environment variables:

bash

```
unset GEMINI_TELEMETRY_ENABLED

unset GEMINI_TELEMETRY_TARGET

unset GEMINI_TELEMETRY_OTLP_ENDPOINT
```

Existing traces are preserved.

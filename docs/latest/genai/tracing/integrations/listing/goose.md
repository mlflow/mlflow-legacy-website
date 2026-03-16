# Tracing Goose

![Goose Tracing via MLflow](/docs/latest/images/llms/tracing/goose-tracing.png)

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing capability for [Goose](https://github.com/block/goose), an open-source AI agent by Block that automates engineering tasks on your local machine. MLflow supports tracing for Goose through the [OpenTelemetry](/docs/latest/genai/tracing/opentelemetry.md) integration.

What is Goose?

[Goose](https://block.github.io/goose/) is an open-source, on-device AI agent built by Block. It goes beyond code suggestions — Goose can autonomously write and execute code, manage files, run shell commands, interact with APIs, browse the web, and orchestrate pipelines. It works with any LLM provider and is extensible through [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) servers.

## Step 1: Install Goose[​](#step-1-install-goose "Direct link to Step 1: Install Goose")

Install the Goose CLI using the official installer:

bash

```
# macOS / Linux
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash

# Or install via Homebrew
brew install block/tap/goose
```

For other installation methods, see the [Goose documentation](https://block.github.io/goose/docs/getting-started/installation).

## Step 2: Start the MLflow Tracking Server[​](#step-2-start-the-mlflow-tracking-server "Direct link to Step 2: Start the MLflow Tracking Server")

Start the MLflow Tracking Server with a SQL-based backend store:

bash

```
mlflow server --port 5000
```

This example uses SQLite as the backend store. To use other types of SQL databases such as PostgreSQL, MySQL, and MSSQL, change the store URI as described in the [backend store documentation](/docs/latest/self-hosting/architecture/backend-store.md).

Managed MLflow

For a fully managed experience with built-in authentication, scalable storage, and team collaboration, [try Managed MLflow for free](/docs/latest/genai/getting-started/databricks-trial.md).

## Step 3: Set Environment Variables[​](#step-3-set-environment-variables "Direct link to Step 3: Set Environment Variables")

Goose has a built-in OpenTelemetry exporter that sends traces over OTLP/HTTP. Point it at the MLflow server:

bash

```
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:5000
export OTEL_EXPORTER_OTLP_HEADERS=x-mlflow-experiment-id=0
```

About `x-mlflow-experiment-id`

The `x-mlflow-experiment-id` header tells MLflow which experiment to associate the traces with. You can use `0` for the default experiment, or specify a custom experiment ID. To create a new experiment and get its ID, run:

bash

```
mlflow experiments create --experiment-name "goose-traces"
```

To export only traces (and disable metrics/logs export), you can optionally set:

bash

```
export OTEL_TRACES_EXPORTER=otlp
export OTEL_METRICS_EXPORTER=none
export OTEL_LOGS_EXPORTER=none
```

## Step 4: Run Goose[​](#step-4-run-goose "Direct link to Step 4: Run Goose")

With the environment variables set in the same shell session, start Goose:

bash

```
goose session
```

Or run a one-off task:

bash

```
goose run -t "What is 2 + 2?"
```

Goose will automatically export traces to MLflow. All interactions, including LLM calls, tool executions, and agent decisions, are traced automatically.

## Step 5: View Traces in MLflow[​](#step-5-view-traces-in-mlflow "Direct link to Step 5: View Traces in MLflow")

After running a Goose session, open the MLflow UI at `http://localhost:5000` and navigate to the Traces tab.

You will see detailed traces showing:

* **LLM Requests**: Full prompts and completions with token usage
* **Tool Executions**: Shell commands, file operations, and other tool calls
* **Agent Decisions**: The agent's reasoning and planning steps

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Traces Not Appearing in MLflow[​](#traces-not-appearing-in-mlflow "Direct link to Traces Not Appearing in MLflow")

1. **Check backend store**: Ensure MLflow is using a SQL backend, not file-based storage. If you see `"POST /v1/traces HTTP/1.1" 501 Not Implemented` in the server logs, the server is running with a file-based backend that does not support tracing
2. **Verify endpoint**: Confirm the MLflow server is running and accessible at the configured endpoint
3. **Check OTel is enabled**: Run `echo $OTEL_EXPORTER_OTLP_ENDPOINT` to verify the environment variable is set in the same shell session where Goose is running
4. **Check OTel is not disabled**: Ensure `OTEL_SDK_DISABLED` is not set to `true`
5. **Try console export**: Set `OTEL_TRACES_EXPORTER=console` to verify Goose is generating traces

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate the Agent](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Learn how to evaluate the agent's performance.](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

### [Collect User Feedback](/docs/latest/genai/tracing/collect-user-feedback.md)

[Learn how to collect user feedback on traces for improving the agent.](/docs/latest/genai/tracing/collect-user-feedback.md)

[Collect feedback →](/docs/latest/genai/tracing/collect-user-feedback.md)

### [Search Traces](/docs/latest/genai/tracing/search-traces.md)

[Learn how to search and analyze traces for insights.](/docs/latest/genai/tracing/search-traces.md)

[Search traces →](/docs/latest/genai/tracing/search-traces.md)

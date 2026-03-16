# Tracing Koog

![Koog Logo](/docs/latest/images/logos/koog.png)

#### Integration via OpenTelemetry

Koog<!-- --> can be integrated with MLflow via OpenTelemetry. Configure <!-- -->Koog<!-- -->'s OpenTelemetry exporter to send traces to MLflow's OTLP endpoint.

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing capability for [Koog](https://github.com/JetBrains/koog), JetBrains' framework for building AI agents in Kotlin. MLflow supports tracing for Koog through the [OpenTelemetry](/docs/latest/genai/tracing/opentelemetry.md) integration — Koog's built-in OpenTelemetry feature sends traces directly to MLflow's OTLP endpoint with no additional adapters needed.

## Step 1: Start the MLflow Tracking Server[​](#step-1-start-the-mlflow-tracking-server "Direct link to Step 1: Start the MLflow Tracking Server")

info

OpenTelemetry trace ingestion is supported in **MLflow 3.6.0 and above**.

## OpenTelemetry endpoint (OTLP)[​](#opentelemetry-endpoint-otlp "Direct link to OpenTelemetry endpoint (OTLP)")

MLflow Server exposes an OTLP endpoint at `/v1/traces` ([OTLP](https://opentelemetry.io/docs/specs/otlp/)). This endpoint accepts traces from any native OpenTelemetry instrumentation, allowing you to trace applications written in other languages such as Java, Go, Rust, etc.

To use this endpoint, start MLflow Server with a SQL-based backend store. The following command starts MLflow Server with an SQLite backend store:

bash

```
mlflow server
```

To use other types of SQL databases such as PostgreSQL, MySQL, and MSSQL, change the store URI as described in the [backend store documentation](/docs/latest/self-hosting/architecture/backend-store.md).

In your application, configure the server endpoint and set the MLflow experiment ID in the OTLP header `x-mlflow-experiment-id`.

bash

```
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:5000/v1/traces
export OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-mlflow-experiment-id=123
```

note

Currently, MLflow Server supports only the OTLP/HTTP endpoint, and the OTLP/gRPC endpoint is not yet supported.

## Step 2: Configure the Koog Agent[​](#step-2-configure-the-koog-agent "Direct link to Step 2: Configure the Koog Agent")

Install the **OpenTelemetry feature** in your Koog agent and add an `OtlpHttpSpanExporter` pointing to the MLflow server's OTLP endpoint. Include the `x-mlflow-experiment-id` header to associate traces with a specific experiment.

kotlin

```
import ai.koog.agents.core.agent.AIAgent
import ai.koog.agents.features.opentelemetry.feature.OpenTelemetry
import ai.koog.prompt.executor.clients.openai.OpenAIModels
import ai.koog.prompt.executor.llms.all.simpleOpenAIExecutor
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val agent = AIAgent(
        promptExecutor = simpleOpenAIExecutor(System.getenv("OPENAI_API_KEY")),
        llmModel = OpenAIModels.Chat.GPT4oMini,
        systemPrompt = "You are a helpful assistant."
    ) {
        install(OpenTelemetry) {
            addSpanExporter(
                OtlpHttpSpanExporter.builder()
                    .setEndpoint("http://localhost:5000/v1/traces")
                    .addHeader("x-mlflow-experiment-id", "0")
                    .build()
            )
        }
    }

    val result = agent.run("Tell me a joke about programming")
    println("Result: $result")
}
```

Use `"0"` for the default experiment, or create a new experiment:

bash

```
mlflow experiments create --experiment-name "koog-agent-traces"
```

## Step 3: Run and View Traces[​](#step-3-run-and-view-traces "Direct link to Step 3: Run and View Traces")

Run your Koog agent, then open the MLflow UI at `http://localhost:5000` and navigate to the **Traces** tab to see detailed execution spans, including agent lifecycle events, LLM calls, and tool executions.

![Koog Tracing](/docs/latest/assets/images/koog-tracing-03957e45fbf8444190b33267b67733ba.png)

## Enable Verbose Tracing[​](#enable-verbose-tracing "Direct link to Enable Verbose Tracing")

By default, Koog masks span content for security. To include full prompts and responses in MLflow traces, enable verbose mode and optionally set service info:

kotlin

```
install(OpenTelemetry) {
    setServiceInfo("koog-agent", "1.0.0")
    setVerbose(true)

    addSpanExporter(
        OtlpHttpSpanExporter.builder()
            .setEndpoint("http://localhost:5000/v1/traces")
            .addHeader("x-mlflow-experiment-id", "0")
            .build()
    )
}
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**No traces appear in MLflow**

* Ensure the MLflow server is running and accessible at the configured endpoint.
* Verify that `mlflow server` was started with a SQL-based backend store (the default SQLite works out of the box). File-based storage does not support OpenTelemetry trace ingestion.
* Make sure the `OTEL_SDK_DISABLED` environment variable is not set to `true`.

**Missing span content**

* Koog masks span content by default. Set `setVerbose(true)` in the OpenTelemetry configuration to include full prompts and responses.

**Connection refused errors**

* Confirm the MLflow server port matches the endpoint configured in `OtlpHttpSpanExporter`.
* Check that no firewall rules block the connection to the MLflow server.

## Next Steps[​](#next-steps "Direct link to Next Steps")

* [Evaluate the Agent](/docs/latest/genai/eval-monitor/running-evaluation/traces.md): Learn how to evaluate the agent's performance.
* [Collect User Feedback](/docs/latest/genai/tracing/collect-user-feedback.md): Learn how to collect user feedback on traces for improving the agent.
* [Search Traces](/docs/latest/genai/tracing/search-traces.md): Learn how to search and analyze traces for insights.

## Reference[​](#reference "Direct link to Reference")

* [Collect OpenTelemetry Traces into MLflow](/docs/latest/genai/tracing/opentelemetry/ingest.md) — complete reference for sending OpenTelemetry traces to MLflow
* [Koog OpenTelemetry Support](https://docs.koog.ai/opentelemetry-support/) — background on Koog's OpenTelemetry feature
* [Koog MLflow Export Guide](https://docs.koog.ai/opentelemetry-mlflow-exporter/) — Koog's guide for MLflow integration

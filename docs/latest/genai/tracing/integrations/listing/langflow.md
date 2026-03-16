# Tracing Langflow

![Langflow Logo](/docs/latest/images/logos/langflow.svg)

#### Integration via OpenTelemetry

Langflow<!-- --> can be integrated with MLflow via OpenTelemetry. Configure <!-- -->Langflow<!-- -->'s OpenTelemetry exporter to send traces to MLflow's OTLP endpoint.

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

## Enable OpenTelemetry in Langflow via Traceloop[​](#enable-opentelemetry-in-langflow-via-traceloop "Direct link to Enable OpenTelemetry in Langflow via Traceloop")

bash

```
export TRACELOOP_BASE_URL=http://localhost:5000
export TRACELOOP_HEADERS=x-mlflow-experiment-id=123
```

Refer to the [Langflow Traceloop documentation](https://docs.langflow.org/integrations-instana-traceloop) for setting up tracing in Langflow and specify OTLP HTTP exporter with above environment variables.

## Combine with the MLflow Tracing SDK[​](#combine-with-the-mlflow-tracing-sdk "Direct link to Combine with the MLflow Tracing SDK")

You can combine the auto-generated OpenTelemetry traces with the [MLflow Tracing SDK](/docs/latest/genai/tracing.md) to add custom spans, set tags, and log assessments within the same trace.

python

```
import os

os.environ["MLFLOW_USE_DEFAULT_TRACER_PROVIDER"] = "false"

import mlflow
from mlflow.entities.trace_location import MlflowExperimentLocation

mlflow.set_tracking_uri("http://localhost:5000")
exp_id = mlflow.set_experiment("Langflow").experiment_id
mlflow.tracing.set_destination(MlflowExperimentLocation(exp_id))

# Add custom MLflow spans alongside the auto-generated traces
with mlflow.start_span("custom_step") as span:
    span.set_inputs({"query": "test"})
    # your application logic here
    span.set_outputs({"result": "success"})
```

See [Combining the OpenTelemetry SDK and the MLflow Tracing SDK](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md#combining-the-opentelemetry-sdk-and-the-mlflow-tracing-sdk) for details.

## Reference[​](#reference "Direct link to Reference")

For complete step-by-step instructions on sending traces to MLflow from OpenTelemetry compatible frameworks, see the [Collect OpenTelemetry Traces into MLflow](/docs/latest/genai/tracing/opentelemetry/ingest.md).

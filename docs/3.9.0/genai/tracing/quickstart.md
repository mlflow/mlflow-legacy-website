# Tracing Quickstart

This quickstart guide will walk you through setting up a simple GenAI application with MLflow Tracing. In less than 10 minutes, you'll enable tracing, run a basic application, and explore the generated traces in the MLflow UI.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Make sure you have started the MLflow server. If you don't have the MLflow server running yet, just follow these simple steps to get it started.

* Local (pip)
* Local (docker)

**Python Environment**: Python 3.10+

For the fastest setup, you can install the `mlflow` Python package via `pip` and start the MLflow server locally.

bash

```
pip install --upgrade mlflow
mlflow server
```

MLflow provides a Docker Compose file to start a local MLflow server with a postgres database and a minio server.

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

## Create a MLflow Experiment[​](#create-a-mlflow-experiment "Direct link to Create a MLflow Experiment")

The traces your GenAI application will send to the MLflow server are grouped into MLflow experiments. We recommend creating one experiment for each GenAI application.

Let's create a new MLflow experiment using the MLflow UI so that you can start sending your traces.

![New Experiment](/docs/3.9.0/images/llms/tracing/quickstart/mlflow-ui-new-experiment.png)

1. Navigate to the MLflow UI in your browser at <http://localhost:5000>.
2. Click on the

   Create

   button on the top right.
3. Enter a name for the experiment and click on "Create".

*You can leave the `Artifact Location` field blank for now. It is an advanced configuration to override where MLflow stores experiment data.*

## Dependency[​](#dependency "Direct link to Dependency")

To connect your GenAI application to the MLflow server, you will need to install the MLflow client SDK.

* Python(OpenAI)
* TypeScript(OpenAI)

bash

```
pip install --upgrade mlflow openai>=1.0.0
```

bash

```
npm install mlflow-openai
```

info

While this guide features an example using the OpenAI SDK, the same steps apply to other LLM providers, including Anthropic, Google, Bedrock, and many others.

For a comprehensive list of LLM providers supported by MLflow, see the [LLM Integrations Overview](/docs/3.9.0/genai/tracing/integrations.md).

## Start Tracing[​](#start-tracing "Direct link to Start Tracing")

Once your experiment is created, you're ready to connect to the MLflow server and begin sending traces from your GenAI application.

* Python(OpenAI)
* TypeScript(OpenAI)
* OpenTelemetry

python

```
import mlflow
from openai import OpenAI

# Specify the tracking URI for the MLflow server.
mlflow.set_tracking_uri("http://localhost:5000")

# Specify the experiment you just created for your GenAI application.
mlflow.set_experiment("My Application")

# Enable automatic tracing for all OpenAI API calls.
mlflow.openai.autolog()

client = OpenAI()
# The trace of the following is sent to the MLflow server.
client.chat.completions.create(
    model="o4-mini",
    messages=[
        {"role": "system", "content": "You are a helpful weather assistant."},
        {"role": "user", "content": "What's the weather like in Seattle?"},
    ],
)
```

typescript

```
import { init } from "mlflow-tracing";
import { tracedOpenAI } from "mlflow-openai";
import { OpenAI } from "openai";

init({
    trackingUri: "http://localhost:5000",
    // NOTE: specifying experiment name is not yet supported in TypeScript SDK.
    // You can copy the experiment id from the experiment details on the MLflow UI.
    experimentId: "<experiment-id>",
});

// Wrap the OpenAI client with the tracedOpenAI function to enable automatic tracing.
const client = tracedOpenAI(new OpenAI());

// The trace of the following is sent to the MLflow server.
client.chat.completions.create({
    model: "o4-mini",
    messages: [
        {"role": "system", "content": "You are a helpful weather assistant."},
        {"role": "user", "content": "What's the weather like in Seattle?"},
    ],
})
```

MLflow Server exposes an OTLP endpoint at `/v1/traces` ([OTLP](https://opentelemetry.io/docs/specs/otlp/)). This endpoint accepts traces from any native OpenTelemetry instrumentation, allowing you to trace applications written in other languages such as Java, Go, Rust, etc.

The following example shows how to collect traces from a FastAPI application using OpenTelemetry FastAPI instrumentation.

python

```
import os
import uvicorn
from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

# Set the endpoint and header
MLFLOW_TRACKING_URI = "http://localhost:5000"
MLFLOW_EXPERIMENT_ID = "123"

os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = f"{MLFLOW_TRACKING_URI}/v1/traces"
os.environ[
    "OTEL_EXPORTER_OTLP_TRACES_HEADERS"
] = f"x-mlflow-experiment-id={MLFLOW_EXPERIMENT_ID}"

app = FastAPI()
FastAPIInstrumentor.instrument_app(app)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

For a deeper dive into using MLflow together with OpenTelemetry, see the [OpenTelemetry guide](/docs/3.9.0/genai/tracing/opentelemetry.md).

## View Your Traces on the MLflow UI[​](#view-your-traces-on-the-mlflow-ui "Direct link to View Your Traces on the MLflow UI")

After running the code above, go to the MLflow UI and select the "My Application" experiment, and then select the "Traces" tab. It should show the newly created trace.

![Single Trace](/docs/3.9.0/images/llms/tracing/quickstart/single-openai-trace-list.png)

![Single Trace](/docs/3.9.0/images/llms/tracing/quickstart/single-openai-trace-detail.png)

## Next Step[​](#next-step "Direct link to Next Step")

Congrats on sending your first trace with MLflow! Now that you've got the basics working, here is the recommended next step to deepen your understanding of tracing:

[Automatic and Manual Tracing →](/docs/3.9.0/genai/tracing/app-instrumentation/automatic.md)

***

[Explore how MLflow supports both automatic tracing and manual tracing for custom logic, plus how you can combine the two to get more insightful traces.](/docs/3.9.0/genai/tracing/app-instrumentation/automatic.md)

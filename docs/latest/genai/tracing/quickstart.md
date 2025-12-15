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

![New Experiment](/docs/latest/images/llms/tracing/quickstart/mlflow-ui-new-experiment.png)

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

For a comprehensive list of LLM providers supported by MLflow, see the [LLM Integrations Overview](/docs/latest/genai/tracing/integrations.md).

## Start Tracing[​](#start-tracing "Direct link to Start Tracing")

Once your experiment is created, you're ready to connect to the MLflow server and begin sending traces from your GenAI application.

* Python(OpenAI)
* TypeScript(OpenAI)

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

## View Your Traces on the MLflow UI[​](#view-your-traces-on-the-mlflow-ui "Direct link to View Your Traces on the MLflow UI")

After running the code above, go to the MLflow UI and select the "My Application" experiment, and then select the "Traces" tab. It should show the newly created trace.

![Single Trace](/docs/latest/images/llms/tracing/quickstart/single-openai-trace-list.png)

![Single Trace](/docs/latest/images/llms/tracing/quickstart/single-openai-trace-detail.png)

## Next Steps[​](#next-steps "Direct link to Next Steps")

Congrats on sending your first trace with MLflow! Now that you've got the basics working, here are some recommended next steps to deepen your understanding of tracing and get the most out of MLflow Tracing:

* **Explore More Integrations:** MLflow supports a wide range of LLM providers and agent frameworks. See the full list in the [Integrations Overview](/docs/latest/genai/tracing/integrations.md).

* **Manual Tracing & Custom Spans:** Discover how to instrument your GenAI code with manual tracing and custom spans to capture additional details in your traces. Check out [Manual Tracing](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md) for more details.

* **Attach Feedback & Evaluate Quality:** Add human or automated feedback to your traces. See how in [Attaching Feedback](/docs/latest/genai/tracing/collect-user-feedback.md) or try [automated evaluation](/docs/latest/genai/eval-monitor.md) for scoring conversation responses.

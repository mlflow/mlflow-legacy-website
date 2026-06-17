# Tracing n8n

[n8n](https://n8n.io/) is a fair-code workflow automation platform that lets you connect services and build AI-powered workflows visually. MLflow integrates with n8n via the [`n8n-nodes-mlflow`](https://www.npmjs.com/package/n8n-nodes-mlflow) community node — an OpenAI-compatible chat model node with built-in MLflow tracing. Every LLM request and response is automatically logged as a trace, with multi-turn conversations grouped by session in the MLflow UI.

![MLflow trace detail](/docs/3.14.0/images/llms/tracing/n8n/mlflow-trace2.png)

## Features[​](#features "Direct link to Features")

* **OpenAI-compatible** — works with OpenAI, LiteLLM, LocalAI, Azure OpenAI, and any OpenAI-compatible endpoint
* **Automatic tracing** — every LLM call is logged as an MLflow trace with inputs, outputs, and latency
* **Session grouping** — traces are linked by `sessionId` for multi-turn conversation tracking
* **Custom metadata** — attach `sessionId`, `userId`, and arbitrary JSON to every trace span
* **Databricks support** — compatible with both self-hosted and Databricks-managed MLflow

## Setup[​](#setup "Direct link to Setup")

### 1. Installation[​](#1-installation "Direct link to 1. Installation")

#### Option 1: Community Nodes UI (Recommended, n8n v0.187+)[​](#option-1-community-nodes-ui-recommended-n8n-v0187 "Direct link to Option 1: Community Nodes UI (Recommended, n8n v0.187+)")

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-mlflow` as the npm package name
4. Agree to the risks of using community nodes and click **Install**

#### Option 2: Docker[​](#option-2-docker "Direct link to Option 2: Docker")

A preconfigured Docker setup is available in the [`docker/` directory](https://github.com/mlflow/mlflow-n8n-nodes/tree/main/docker):

bash

```
# Build the image

docker build --progress=plain -f docker/Dockerfile -t n8n-nodes-mlflow .



# Run the container

docker run -it --rm \

  --name n8n-mlflow \

  -p 5678:5678 \

  -e GENERIC_TIMEZONE="America/New_York" \

  -e TZ="America/New_York" \

  -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \

  -e N8N_RUNNERS_ENABLED=true \

  -v n8n_data:/home/node/.n8n \

  n8n-nodes-mlflow:latest
```

Access n8n at `http://localhost:5678`.

#### Option 3: Manual Installation[​](#option-3-manual-installation "Direct link to Option 3: Manual Installation")

bash

```
cd ~/.n8n

npm install n8n-nodes-mlflow

n8n start
```

### 2. Credentials[​](#2-credentials "Direct link to 2. Credentials")

Configure credentials in n8n for both the LLM endpoint and MLflow.

#### OpenAI Settings[​](#openai-settings "Direct link to OpenAI Settings")

| Field           | Required | Description                                 | Example                     |
| --------------- | -------- | ------------------------------------------- | --------------------------- |
| OpenAI API Key  | Yes      | API key for your OpenAI-compatible endpoint | `sk-abc123...`              |
| OpenAI Base URL | No       | Override the default endpoint base URL      | `https://api.openai.com/v1` |

#### MLflow Settings[​](#mlflow-settings "Direct link to MLflow Settings")

| Field                | Required | Description                               | Example                                 |
| -------------------- | -------- | ----------------------------------------- | --------------------------------------- |
| MLflow Tracking URI  | Yes      | Your MLflow tracking server URI           | `http://localhost:5000` or `databricks` |
| MLflow Experiment ID | Yes      | Experiment ID where traces will be logged | `1234567890`                            |

Databricks users

Set the **Tracking URI** to `databricks` and provide your Databricks personal access token as the **MLflow Tracking Token**.

### 3. Node Configuration[​](#3-node-configuration "Direct link to 3. Node Configuration")

Add the **OpenAI MLflow** node to your workflow and configure the MLflow tracing fields:

| Field            | Type     | Description                                                          |
| ---------------- | -------- | -------------------------------------------------------------------- |
| `sessionId`      | `string` | Groups related traces into one chat session (`mlflow.trace.session`) |
| `userId`         | `string` | Identifies the end user making the request (`mlflow.trace.user`)     |
| `customMetadata` | `object` | Arbitrary JSON attached to the trace as span metadata                |

![n8n OpenAI MLflow node configuration](/docs/3.14.0/images/llms/tracing/n8n/node-example.png)

## Workflow Setup[​](#workflow-setup "Direct link to Workflow Setup")

A typical n8n workflow using this node:

![n8n workflow with MLflow tracing node](/docs/3.14.0/images/llms/tracing/n8n/workflow-example.png)

## Chat Example[​](#chat-example "Direct link to Chat Example")

Sending a chat message through n8n:

![n8n chat interaction example](/docs/3.14.0/images/llms/tracing/n8n/n8n-chat-example.png)

## Viewing Traces in MLflow[​](#viewing-traces-in-mlflow "Direct link to Viewing Traces in MLflow")

After running a workflow, open the MLflow UI and navigate to the **Traces** tab. Each LLM call appears as a trace with full inputs, outputs, and latency:

![MLflow trace overview](/docs/3.14.0/images/llms/tracing/n8n/mlflow-trace1.png)

Enable **"Group by session"** to see all turns of a conversation grouped under one session:

![MLflow chat session grouped view](/docs/3.14.0/images/llms/tracing/n8n/mlflow-chat-session-example.png)

## Compatibility[​](#compatibility "Direct link to Compatibility")

* n8n version 1.0.0 or later
* Node.js >= 20.15
* OpenAI official API, LiteLLM, LocalAI, Azure OpenAI, or any OpenAI-compatible endpoint
* Self-hosted MLflow and Databricks-managed MLflow

## Resources[​](#resources "Direct link to Resources")

* [n8n-nodes-mlflow on npm](https://www.npmjs.com/package/n8n-nodes-mlflow)
* [mlflow/mlflow-n8n-nodes on GitHub](https://github.com/mlflow/mlflow-n8n-nodes)
* [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [MLflow Tracing documentation](/docs/3.14.0/genai/tracing.md)

## Next steps[​](#next-steps "Direct link to Next steps")

### [Track User Feedback](/docs/3.14.0/genai/tracing/collect-user-feedback.md)

[Record user feedback on traces for tracking user satisfaction.](/docs/3.14.0/genai/tracing/collect-user-feedback.md)

[Learn about feedback →](/docs/3.14.0/genai/tracing/collect-user-feedback.md)

### [Manage Prompts](/docs/3.14.0/genai/prompt-registry.md)

[Learn how to manage prompts with MLflow's prompt registry.](/docs/3.14.0/genai/prompt-registry.md)

[Manage prompts →](/docs/3.14.0/genai/prompt-registry.md)

### [Evaluate Traces](/docs/3.14.0/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces with LLM judges to understand and improve your AI application's behavior.](/docs/3.14.0/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces →](/docs/3.14.0/genai/eval-monitor/running-evaluation/traces.md)

# Gemini CLI + MLflow AI Gateway

Route [Gemini CLI](https://github.com/google-gemini/gemini-cli) through the MLflow AI Gateway to get centralized tracing and observability, while each developer authenticates with their own Google subscription.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* MLflow server running with a SQL backend (`mlflow server --port 5000`)
* Gemini CLI installed (`npm install -g @google/gemini-cli`)

## Step 1: Create a Gemini Endpoint[​](#step-1-create-a-gemini-endpoint "Direct link to Step 1: Create a Gemini Endpoint")

Navigate to the **AI Gateway** tab at `http://localhost:5000/#/gateway` and click **Create Endpoint**.

* **Provider:** Gemini
* **Model:** choose any model as the actual model is selected on Gemini CLI
* **Endpoint name:** choose a name, e.g. `my-gemini-endpoint`
* **Authentication:** select **API Key** based authentication
* **LLM Connection:** select an existing connection or create a new one (see [Create an LLM Connection](/docs/3.13.0rc0/genai/governance/ai-gateway/api-keys/create-and-manage.md))

tip

The server-side API key in the LLM Connection can be set to a dummy value (e.g. `dummy`). The gateway detects Gemini CLI's `User-Agent` and forwards the client's own `GEMINI_API_KEY` to the upstream provider instead.

## Step 2: Configure Environment Variables[​](#step-2-configure-environment-variables "Direct link to Step 2: Configure Environment Variables")

Set the following environment variables so Gemini CLI routes through the gateway and uses your endpoint:

bash

```
export GOOGLE_GEMINI_BASE_URL="http://localhost:5000/gateway/proxy/my-gemini-endpoint"

export GEMINI_API_KEY="your-google-api-key"
```

## Step 3: Run Gemini CLI[​](#step-3-run-gemini-cli "Direct link to Step 3: Run Gemini CLI")

bash

```
gemini
```

Gemini CLI authenticates using your existing Google credentials and all requests are proxied through the gateway.

## What You Get[​](#what-you-get "Direct link to What You Get")

Every conversation is captured as an MLflow trace. Open the **Logs** tab in the MLflow UI to inspect inputs, outputs, token usage, and latency for every request.

![Gemini CLI trace in MLflow](/docs/3.13.0rc0/assets/images/gemini-cli-trace-2ad3f989b37483cb713a5f47231fd2f1.png)

### [Usage Tracking](/docs/3.13.0rc0/genai/governance/ai-gateway/usage-tracking.md)

[Monitor token usage and costs across all Gemini CLI sessions](/docs/3.13.0rc0/genai/governance/ai-gateway/usage-tracking.md)

[View usage tracking →](/docs/3.13.0rc0/genai/governance/ai-gateway/usage-tracking.md)

### [Guardrails](/docs/3.13.0rc0/genai/governance/ai-gateway/guardrails.md)

[Add content policies to all Gemini CLI requests automatically](/docs/3.13.0rc0/genai/governance/ai-gateway/guardrails.md)

[Configure guardrails →](/docs/3.13.0rc0/genai/governance/ai-gateway/guardrails.md)

### [Budget Alerts & Limits](/docs/3.13.0rc0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits globally or per workspace to keep sessions within budget](/docs/3.13.0rc0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Configure budget limits →](/docs/3.13.0rc0/genai/governance/ai-gateway/budget-alerts-limits.md)

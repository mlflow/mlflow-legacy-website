# OpenAI Codex + MLflow AI Gateway

Route [OpenAI Codex](https://github.com/openai/codex) through the MLflow AI Gateway to get centralized tracing and observability, while each developer authenticates with their own OpenAI subscription.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* MLflow server running with a SQL backend (`mlflow server --port 5000`)
* Codex installed (`npm install -g @openai/codex`)

## Step 1: Create an OpenAI Endpoint[​](#step-1-create-an-openai-endpoint "Direct link to Step 1: Create an OpenAI Endpoint")

Navigate to the **AI Gateway** tab at `http://localhost:5000/#/gateway` and click **Create Endpoint**.

* **Provider:** OpenAI
* **Model:** choose any model as the actual model is selected by Codex CLI
* **Endpoint name:** choose a name, e.g. `my-codex-endpoint`
* **LLM Connection:** select an existing connection or create a new one (see [Create an LLM Connection](/docs/latest/genai/governance/ai-gateway/api-keys/create-and-manage.md))

tip

The server-side API key in the LLM Connection can be set to a dummy value (e.g. `dummy`). The gateway detects Codex's `User-Agent` and forwards the client's own credentials.

## Step 2: Run Codex[​](#step-2-run-codex "Direct link to Step 2: Run Codex")

Configure Codex to point to the gateway base URL and run it.

bash

```
codex --config 'openai_base_url="http://localhost:5000/gateway/proxy/my-codex-endpoint/v1"'
```

For a persistent setup, add the same value to `~/.codex/config.toml`:

\~/.codex/config.toml

toml

```
openai_base_url = "http://localhost:5000/gateway/openai/v1"
```

Note that you need to authenticate with your API key instead of ChatGPT subscription.

## What You Get[​](#what-you-get "Direct link to What You Get")

Every session is captured as an MLflow trace. Open the **Logs** tab in the MLflow UI to inspect inputs, outputs, token usage, and latency for every request.

![Codex trace in MLflow](/docs/latest/assets/images/codex-trace-d99ee01cf96742f403c2877e724de4de.png)

### [Usage Tracking](/docs/latest/genai/governance/ai-gateway/usage-tracking.md)

[Monitor token usage and costs across all Codex sessions](/docs/latest/genai/governance/ai-gateway/usage-tracking.md)

[View usage tracking →](/docs/latest/genai/governance/ai-gateway/usage-tracking.md)

### [Guardrails](/docs/latest/genai/governance/ai-gateway/guardrails.md)

[Add content policies to all Codex requests automatically](/docs/latest/genai/governance/ai-gateway/guardrails.md)

[Configure guardrails →](/docs/latest/genai/governance/ai-gateway/guardrails.md)

### [Budget Alerts & Limits](/docs/latest/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits globally or per workspace to keep sessions within budget](/docs/latest/genai/governance/ai-gateway/budget-alerts-limits.md)

[Configure budget limits →](/docs/latest/genai/governance/ai-gateway/budget-alerts-limits.md)

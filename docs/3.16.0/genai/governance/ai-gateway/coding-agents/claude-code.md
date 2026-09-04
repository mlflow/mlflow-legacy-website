# Claude Code + MLflow AI Gateway

Route [Claude Code](https://docs.anthropic.com/en/docs/claude-code) through the MLflow AI Gateway to get centralized tracing and observability, while each developer authenticates with their own Anthropic subscription.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* MLflow server running with a SQL backend (`mlflow server --port 5000`)
* Claude Code installed (`npm install -g @anthropic-ai/claude-code`)

## Step 1: Create an Anthropic Endpoint[​](#step-1-create-an-anthropic-endpoint "Direct link to Step 1: Create an Anthropic Endpoint")

Navigate to the **AI Gateway** tab at `http://localhost:5000/#/gateway` and click **Claude Code** in the quick start. Then click "create" to create an endpoint. The endpoint name is pre-filled as `claude-code` — you can change it, but make sure to use the same name in the next step.

## Step 2: Configure Environment Variables[​](#step-2-configure-environment-variables "Direct link to Step 2: Configure Environment Variables")

Set the following environment variables so Claude Code routes through the gateway and uses your endpoint:

bash

```
export ANTHROPIC_BASE_URL="http://localhost:5000/gateway/proxy/claude-code"
```

## Step 3: Run Claude Code[​](#step-3-run-claude-code "Direct link to Step 3: Run Claude Code")

bash

```
claude
```

Claude Code authenticates using your existing Anthropic credentials (stored in `~/.claude`) and all requests are proxied through the gateway.

## What You Get[​](#what-you-get "Direct link to What You Get")

Every conversation is captured as an MLflow trace. Open the **Logs** tab in the MLflow UI to inspect inputs, outputs, token usage, and latency for every request.

![Claude Code trace in MLflow](/docs/3.16.0/assets/images/claude-code-trace-0403511578a90d62cfefdb34aa3cec72.png)

### [Usage Tracking](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

[Monitor token usage and costs across all Claude Code sessions](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

[View usage tracking →](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

### [Guardrails](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

[Add content policies to all Claude Code requests automatically](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

[Configure guardrails →](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

### [Budget Alerts & Limits](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits globally or per workspace to keep sessions within budget](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Configure budget limits →](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

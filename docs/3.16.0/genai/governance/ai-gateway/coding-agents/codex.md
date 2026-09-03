# OpenAI Codex + MLflow AI Gateway

Route [OpenAI Codex](https://github.com/openai/codex) through the MLflow AI Gateway to get centralized tracing and observability, while each developer authenticates with their own OpenAI subscription.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* MLflow server running with a SQL backend (`mlflow server --port 5000`)
* Codex installed (`npm install -g @openai/codex`)

## Step 1: Create an OpenAI Endpoint[​](#step-1-create-an-openai-endpoint "Direct link to Step 1: Create an OpenAI Endpoint")

Navigate to the **AI Gateway** tab at `http://localhost:5000/#/gateway` and click **OpenAI Codex** in the quick start. Then click "create" to create an endpoint. The endpoint name is pre-filled as `codex` — you can change it, but make sure to use the same name in the next step.

## Step 2: Run Codex[​](#step-2-run-codex "Direct link to Step 2: Run Codex")

Configure Codex to point to the gateway base URL and run it.

bash

```
codex --config 'openai_base_url="http://localhost:5000/gateway/proxy/codex/v1"'
```

For a persistent setup, add the same value to `~/.codex/config.toml`:

\~/.codex/config.toml

toml

```
openai_base_url = "http://localhost:5000/gateway/proxy/codex/v1"
```

Note that you need to authenticate with your API key instead of ChatGPT subscription.

## Authenticated Gateways (RBAC / basic auth)[​](#authenticated-gateways-rbac--basic-auth "Direct link to Authenticated Gateways (RBAC / basic auth)")

If your MLflow server has [authentication](/docs/3.16.0/self-hosting/security/basic-http-auth.md) enabled, Codex must also send your MLflow credentials. Codex already uses the `Authorization` header for your own OpenAI key (which the gateway forwards upstream), so MLflow reads its credentials from a dedicated `X-MLflow-Authorization` header instead. Set it via Codex's `env_http_headers`:

\~/.codex/config.toml

toml

```
openai_base_url = "http://localhost:5000/gateway/proxy/codex/v1"

env_http_headers = { "X-MLflow-Authorization" = "MLFLOW_AUTH" }
```

bash

```
# Base64-encode your MLflow "username:password" as an HTTP Basic credential.

export MLFLOW_AUTH="Basic $(printf '%s' 'my-user:my-password' | base64 | tr -d '\n')"
```

MLflow honors `X-MLflow-Authorization` only on `/gateway/` routes and never forwards it to the upstream provider.

## What You Get[​](#what-you-get "Direct link to What You Get")

Every session is captured as an MLflow trace. Open the **Logs** tab in the MLflow UI to inspect inputs, outputs, token usage, and latency for every request.

![Codex trace in MLflow](/docs/3.16.0/assets/images/codex-trace-d99ee01cf96742f403c2877e724de4de.png)

### [Usage Tracking](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

[Monitor token usage and costs across all Codex sessions](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

[View usage tracking →](/docs/3.16.0/genai/governance/ai-gateway/usage-tracking.md)

### [Guardrails](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

[Add content policies to all Codex requests automatically](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

[Configure guardrails →](/docs/3.16.0/genai/governance/ai-gateway/guardrails.md)

### [Budget Alerts & Limits](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits globally or per workspace to keep sessions within budget](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Configure budget limits →](/docs/3.16.0/genai/governance/ai-gateway/budget-alerts-limits.md)

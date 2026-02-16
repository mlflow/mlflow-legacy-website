# Usage Tracking

AI Gateway usage tracking logs all requests to an endpoint as traces, allowing you to monitor request volume, latency, errors, token consumption, and costs.

## Enabling Usage Tracking[​](#enabling-usage-tracking "Direct link to Enabling Usage Tracking")

Open your endpoint's detail page and scroll to the **Usage Tracking** section at the bottom.

1. Toggle **Enable usage tracking** on
2. Click **Save changes**

![Endpoint Configuration](/docs/latest/assets/images/usage-tracking-endpoint-a8898170a4c12a36193c5b0c6e9a4928.png)

## Usage Dashboard[​](#usage-dashboard "Direct link to Usage Dashboard")

Navigate to **AI Gateway > Usage** in the sidebar, or click the **Usage** tab on an endpoint's detail page.

![Usage Dashboard](/docs/latest/assets/images/usage-tracking-dashboard-1b87f42bd86bfc5f1a25ec2a4c4f85cf.png)

The dashboard provides the following charts:

* **Requests** — Total request count over time with daily/hourly averages
* **Latency** — Response time distribution (p50, p90, p99)
* **Errors** — Error rate and error count breakdown
* **Token Usage** — Input and output tokens over time
* **Tokens per Request** — Average token consumption per request
* **Cost Breakdown** — Cost distribution by model or provider
* **Cost Over Time** — Cumulative cost trends by model or provider

Note: Token usage and cost metrics are not supported for all LLM providers or models. Depending on your configuration and LiteLLM pricing, the token and cost charts may be empty or unavailable.

### Filtering[​](#filtering "Direct link to Filtering")

Use the controls at the top of the dashboard to:

* **Endpoint** — View all endpoints or filter to a specific one
* **Time Unit** — Aggregate by hour, day, or week
* **Time Range** — Select a preset range (last 7 days, 30 days, etc.) or a custom range

### Per-Endpoint Usage[​](#per-endpoint-usage "Direct link to Per-Endpoint Usage")

Each endpoint's detail page also has a **Usage** tab that shows the same charts scoped to that endpoint, with a **View full dashboard** link to the main Usage page.

![Endpoint Usage Tab](/docs/latest/assets/images/usage-tracking-endpoint-usage-tab-55550e5e8acde3e2f45faf47e2149907.png)

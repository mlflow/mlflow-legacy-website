# MLflow AI Gateway

MLflow's [AI Gateway](https://mlflow.org/ai-gateway) provides a unified interface for deploying and managing multiple LLM providers within your organization. It simplifies interactions with services like OpenAI, Anthropic, and others through a single, secure endpoint.

The gateway excels in production environments where organizations need to manage multiple LLM providers securely while maintaining operational flexibility. Advanced routing capabilities enable traffic splitting for A/B testing and automatic failover chains for high availability.

MLflow AI Gateway also offers passthrough endpoints, enabling requests to be forwarded in providers' native formats. This feature allows you to access provider-specific capabilities as soon as they become available.

#### Unified Interface

Access multiple LLM providers through a single endpoint, eliminating the need to integrate with each provider individually.

#### Centralized Security

Store LLM provider API keys in one secure location with request/response logging for audit trails and compliance.

#### Advanced Routing

Traffic splitting for A/B testing and automatic fallbacks ensure high availability across providers.

#### Zero-Downtime Updates

Add, remove, or modify endpoints dynamically without restarting the server or disrupting running applications.

#### Cost Optimization

Monitor usage across providers and optimize costs by routing requests to the most efficient models.

#### Team Collaboration

Shared endpoint configurations and standardized access patterns across development teams.

**Try the MLflow LLMs and Agents Demo**<br />The quickest way to learn about MLflow for LLMs and AI Agents is to try the demo. **Click to launch the demo ↓**

#### **Starting from UI**[​](#starting-from-ui "Direct link to starting-from-ui")

To start the demo, click on the "Start Demo" button on the top page of the MLflow UI.

![MLflow GenAI Demo UI](/docs/3.12.0/images/llms/demo/demo.png)

#### **Starting from CLI**[​](#starting-from-cli "Direct link to starting-from-cli")

Alternatively, you can start the demo from the command line using the `mlflow demo` command. This option does not require you to have a running MLflow server.

bash

```
uvx mlflow demo
```

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Quickstart](/docs/3.12.0/genai/governance/ai-gateway/quickstart.md)

[Get your AI Gateway running in minutes with a simple walkthrough](/docs/3.12.0/genai/governance/ai-gateway/quickstart.md)

[Get started →](/docs/3.12.0/genai/governance/ai-gateway/quickstart.md)

### [LLM Connections](/docs/3.12.0/genai/governance/ai-gateway/api-keys/create-and-manage.md)

[Create and manage LLM connections to securely store provider API keys](/docs/3.12.0/genai/governance/ai-gateway/api-keys/create-and-manage.md)

[Manage connections →](/docs/3.12.0/genai/governance/ai-gateway/api-keys/create-and-manage.md)

### [Endpoints](/docs/3.12.0/genai/governance/ai-gateway/endpoints/create-and-manage.md)

[Create, configure, and query AI model endpoints](/docs/3.12.0/genai/governance/ai-gateway/endpoints/create-and-manage.md)

[Configure endpoints →](/docs/3.12.0/genai/governance/ai-gateway/endpoints/create-and-manage.md)

### [Traffic Routing](/docs/3.12.0/genai/governance/ai-gateway/traffic-routing-fallbacks.md)

[Configure traffic splitting and fallbacks for high availability](/docs/3.12.0/genai/governance/ai-gateway/traffic-routing-fallbacks.md)

[Learn routing →](/docs/3.12.0/genai/governance/ai-gateway/traffic-routing-fallbacks.md)

### [Usage Tracking](/docs/3.12.0/genai/governance/ai-gateway/usage-tracking.md)

[Monitor endpoint usage, performance, token consumption, and costs](/docs/3.12.0/genai/governance/ai-gateway/usage-tracking.md)

[View metrics →](/docs/3.12.0/genai/governance/ai-gateway/usage-tracking.md)

### [Budget Alerts & Limits](/docs/3.12.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits and configure alerts for cost management](/docs/3.12.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Manage budgets →](/docs/3.12.0/genai/governance/ai-gateway/budget-alerts-limits.md)

### [Guardrails](/docs/3.12.0/genai/governance/ai-gateway/guardrails.md)

[Enforce content policies with LLM-powered judges that block or sanitize requests and responses](/docs/3.12.0/genai/governance/ai-gateway/guardrails.md)

[Configure guardrails →](/docs/3.12.0/genai/governance/ai-gateway/guardrails.md)

### [Authentication](/docs/3.12.0/self-hosting/security/basic-http-auth.md#ai-gateway-permissions)

[Configure HTTP Basic Authentication for AI Gateway resources](/docs/3.12.0/self-hosting/security/basic-http-auth.md#ai-gateway-permissions)

[Learn more →](/docs/3.12.0/self-hosting/security/basic-http-auth.md#ai-gateway-permissions)

### [Performance & Benchmarks](/docs/3.12.0/genai/governance/ai-gateway/benchmarks.md)

[Benchmark results and how to measure gateway overhead in your own environment](/docs/3.12.0/genai/governance/ai-gateway/benchmarks.md)

[View benchmarks →](/docs/3.12.0/genai/governance/ai-gateway/benchmarks.md)

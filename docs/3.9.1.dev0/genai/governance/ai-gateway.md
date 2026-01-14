# MLflow AI Gateway

MLflow AI Gateway provides a unified interface for deploying and managing multiple LLM providers within your organization. It simplifies interactions with services like OpenAI, Anthropic, and others through a single, secure endpoint.

The gateway excels in production environments where organizations need to manage multiple LLM providers securely while maintaining operational flexibility. Advanced routing capabilities enable traffic splitting for A/B testing and automatic failover chains for high availability.

MLflow AI Gateway also offers passthrough endpoints, enabling requests to be forwarded in providers' native formats. This feature allows you to access provider-specific capabilities as soon as they become available.

#### Unified Interface

Access multiple LLM providers through a single endpoint, eliminating the need to integrate with each provider individually.

#### Centralized Security

Store API keys in one secure location with request/response logging for audit trails and compliance.

#### Advanced Routing

Traffic splitting for A/B testing and automatic fallbacks ensure high availability across providers.

#### Zero-Downtime Updates

Add, remove, or modify endpoints dynamically without restarting the server or disrupting running applications.

#### Cost Optimization

Monitor usage across providers and optimize costs by routing requests to the most efficient models.

#### Team Collaboration

Shared endpoint configurations and standardized access patterns across development teams.

## Quick Start[​](#quick-start "Direct link to Quick Start")

Get your AI Gateway running in minutes:

**1. Install MLflow with GenAI dependencies:**

bash

```
pip install 'mlflow[genai]'
```

**2. Start the MLflow Tracking Server:**

bash

```
mlflow server --port 5000
```

The AI Gateway runs within the MLflow Tracking Server itself and requires a SQL-based backend store with the FastAPI tracking server.

**3. Configure your first endpoint:**

Navigate to `http://localhost:5000/#/gateway` and create your first endpoint `my-chat-endpoint` through the web interface. Select your provider, model, and configure your API key. API keys are encrypted and stored securely in the MLflow backend.

![Create Endpoint](/docs/3.9.1.dev0/assets/images/create-endpoint-4b5244302954cd8e676b9f929168a048.png)

**4. Test your endpoint:**

bash

```
curl -X POST http://localhost:5000/gateway/my-chat-endpoint/mlflow/invocations \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Next Steps[​](#next-steps "Direct link to Next Steps")

Ready to dive deeper? Start with the setup guide or explore the legacy YAML-based configuration:

### [Setup Guide](/docs/3.9.1.dev0/genai/governance/ai-gateway/setup.md)

[Configure endpoints, API keys, and advanced routing features](/docs/3.9.1.dev0/genai/governance/ai-gateway/setup.md)

[Get started →](/docs/3.9.1.dev0/genai/governance/ai-gateway/setup.md)

### [Advanced Routing](/docs/3.9.1.dev0/genai/governance/ai-gateway/routing.md)

[Configure traffic splitting and fallbacks for high availability](/docs/3.9.1.dev0/genai/governance/ai-gateway/routing.md)

[Learn routing →](/docs/3.9.1.dev0/genai/governance/ai-gateway/routing.md)

### [Query Guide](/docs/3.9.1.dev0/genai/governance/ai-gateway/query.md)

[Learn how to call endpoints with unified and passthrough APIs](/docs/3.9.1.dev0/genai/governance/ai-gateway/query.md)

[View query guide →](/docs/3.9.1.dev0/genai/governance/ai-gateway/query.md)

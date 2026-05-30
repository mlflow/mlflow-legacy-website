# Coding Agents & Long-Running Agents

The MLflow AI Gateway supports popular AI coding agents such as **Claude Code**, **OpenAI Codex**, and **Gemini CLI**, as well as long-running agent runtimes like **Hermes Agent**.

Coding agents and long-running agent runtimes can make dozens or hundreds of LLM calls per session, often running autonomously for extended periods while also invoking tools and managing their own state. Without visibility or controls in place, it's easy to lose track of what they're doing, how much they're spending, and whether they're operating within your organization's policies. Routing these agents through the gateway gives your team three key capabilities:

### [Observability](/docs/3.13.0/genai/governance/ai-gateway/usage-tracking.md)

[Every request is automatically captured as an MLflow trace, giving you full visibility into inputs, outputs, token counts, and latency, without any code changes.](/docs/3.13.0/genai/governance/ai-gateway/usage-tracking.md)

[Learn about Usage Tracking →](/docs/3.13.0/genai/governance/ai-gateway/usage-tracking.md)

### [Budget Control](/docs/3.13.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Set spending limits globally or per workspace to prevent runaway costs. Configure alerts and hard limits to keep coding agent sessions within budget.](/docs/3.13.0/genai/governance/ai-gateway/budget-alerts-limits.md)

[Learn about Budget Alerts & Limits →](/docs/3.13.0/genai/governance/ai-gateway/budget-alerts-limits.md)

### [Guardrails](/docs/3.13.0/genai/governance/ai-gateway/guardrails.md)

[Enforce content policies on all coding agent requests. Block sensitive topics, redact PII, and ensure responses meet your organization's standards.](/docs/3.13.0/genai/governance/ai-gateway/guardrails.md)

[Learn about Guardrails →](/docs/3.13.0/genai/governance/ai-gateway/guardrails.md)

***

## Get Started[​](#get-started "Direct link to Get Started")

[![Claude Code](/docs/3.13.0/images/logos/claude-code-logo.png)](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/claude-code.md)

### [Claude Code](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/claude-code.md)

[Route Claude Code through the gateway using your Anthropic subscription](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/claude-code.md)

[Set up Claude Code →](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/claude-code.md)

[![OpenAI Codex](/docs/3.13.0/images/logos/openai-logo-only.png)](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/codex.md)

### [OpenAI Codex](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/codex.md)

[Route Codex through the gateway using your OpenAI subscription](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/codex.md)

[Set up Codex →](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/codex.md)

[![Gemini CLI](/docs/3.13.0/images/logos/google-gemini-logo.svg)](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/gemini-cli.md)

### [Gemini CLI](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/gemini-cli.md)

[Route Gemini CLI through the gateway using your Google subscription](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/gemini-cli.md)

[Set up Gemini CLI →](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/gemini-cli.md)

[![Hermes Agent](/docs/3.13.0/images/logos/hermes-agent-logo.svg)](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/hermes-agent.md)

### [Hermes Agent](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/hermes-agent.md)

[Route Hermes Agent through the gateway using Hermes's custom provider support](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/hermes-agent.md)

[Set up Hermes Agent →](/docs/3.13.0/genai/governance/ai-gateway/coding-agents/hermes-agent.md)

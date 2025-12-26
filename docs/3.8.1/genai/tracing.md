# MLflow Tracing for LLM Observability

MLflow Tracing is a fully **OpenTelemetry-compatible** LLM observability solution for your applications. It captures the inputs, outputs, and metadata associated with each intermediate step of a request, enabling you to easily pinpoint the source of bugs and unexpected behaviors.

[](/docs/3.8.1/images/llms/tracing/tracing-top.mp4)

## Use Cases Throughout the ML Lifecycle[​](#use-cases-throughout-the-ml-lifecycle "Direct link to Use Cases Throughout the ML Lifecycle")

MLflow Tracing empowers you throughout the end-to-end lifecycle of a machine learning project. Here's how it helps you at each step of the workflow, click on the tabs below to learn more:

* Build & Debug
* Human Feedback
* Evaluation
* Production Monitoring
* Dataset Collection

#### Debug Issues in Your IDE or Notebook[​](#debug-issues-in-your-ide-or-notebook "Direct link to Debug Issues in Your IDE or Notebook")

Traces provide deep insights into what happens beneath the abstractions of GenAI libraries, helping you precisely identify where issues occur.

You can navigate traces seamlessly within your preferred IDE, notebook, or the MLflow UI, eliminating the hassle of switching between multiple tabs or searching through an overwhelming list of traces.

[Learn more →](/docs/3.8.1/genai/tracing/observe-with-traces/ui.md)

![Trace Debugging](/docs/3.8.1/assets/images/genai-trace-debug-405f9c8b61d5f89fb1d3891242fcd265.png)

#### Track Annotation and Human Feedback[​](#track-annotation-and-human-feedback "Direct link to Track Annotation and Human Feedback")

Human feedback is essential for building high-quality GenAI applications that meet user expectations. MLflow supports collecting, managing, and utilizing feedback from end-users and domain experts.

Feedback are attached to traces and recorded with metadata, including user, timestamp, revisions, etc.

[Learn more →](/docs/3.8.1/genai/assessments/feedback.md)

![Trace Feedback](/docs/3.8.1/assets/images/genai-human-feedback-9a8ea2ba10a5f7c7bb192aea22345b19.png)

#### Evaluate and Enhance Quality[​](#evaluate-and-enhance-quality "Direct link to Evaluate and Enhance Quality")

Systematically assessing and improving the quality of GenAI applications is a challenge. Combined with [MLflow GenAI Evaluation](/docs/3.8.1/genai/eval-monitor.md), MLflow offers a seamless experience for evaluating your applications.

Tracing helps by allowing you to track quality assessment and inspect the evaluation results with visibility into the internals of the system.

[Learn more →](/docs/3.8.1/genai/eval-monitor.md)

![Trace Evaluation](/docs/3.8.1/assets/images/genai-trace-evaluation-5b5e6ba86f0f0f06ee27db356e4e59e4.png)

#### Monitor Applications in Production[​](#monitor-applications-in-production "Direct link to Monitor Applications in Production")

Understanding and optimizing GenAI application performance is crucial for efficient operations. MLflow Tracing captures key metrics like latency and token usage at each step, as well as various quality metrics, helping you identify bottlenecks, monitor efficiency, and find optimization opportunities.

[Learn more →](/docs/3.8.1/genai/tracing/prod-tracing.md)

![Monitoring](/docs/3.8.1/assets/images/genai-monitoring-8ebda32e5cc07cb9cc97cb0297e583c3.png)

#### Create a High-Quality Dataset from Real World Traffic[​](#create-a-high-quality-dataset-from-real-world-traffic "Direct link to Create a High-Quality Dataset from Real World Traffic")

Evaluating the performance of your GenAI application is crucial, but creating a reliable evaluation dataset is challenging.

Traces from production systems capture perfect data for building high-quality datasets with precise details for internal components like retrievers and tools.

[Learn more →](/docs/3.8.1/genai/datasets.md)

![Trace Dataset](/docs/3.8.1/assets/images/genai-trace-dataset-0db517dfd5b8e13ae6732b0a1b0b098f.png)

## What Makes MLflow Tracing Unique?[​](#what-makes-mlflow-tracing-unique "Direct link to What Makes MLflow Tracing Unique?")

#### Open Source

MLflow is open source and 100% FREE. You don't need to pay additional SaaS costs to add observability to your GenAI stack. Your trace data is hosted on your own infrastructure.

#### OpenTelemetry

MLflow Tracing is fully compatible with OpenTelemetry, making it free from vendor lock-in and easy to integrate with your existing observability stack.

#### Framework Agnostic

MLflow Tracing integrates with 20+ GenAI libraries, including OpenAI, LangChain, LlamaIndex, DSPy, Pydantic AI, allowing you to switch between frameworks with ease.

#### End-to-End Platform

MLflow Tracing empowers you throughout the end-to-end machine learning lifecycle, combined with its version tracking and evaluation capabilities.

#### Strong Community

MLflow boasts a vibrant Open Source community as a part of the Linux Foundation, with 20K+ GitHub Stars and 20MM+ monthly downloads.

## Getting Started[​](#getting-started "Direct link to Getting Started")

[![Quickstart (Python)](/docs/3.8.1/images/logos/python-logo.png)](/docs/3.8.1/genai/tracing/quickstart.md)

### [Quickstart (Python)](/docs/3.8.1/genai/tracing/quickstart.md)

[Get started with MLflow Tracing in Python](/docs/3.8.1/genai/tracing/quickstart.md)

[Start building →](/docs/3.8.1/genai/tracing/quickstart.md)

[![Quickstart (JS/TS)](/docs/3.8.1/images/logos/javascript-typescript-logo.png)](/docs/3.8.1/genai/tracing/quickstart.md)

### [Quickstart (JS/TS)](/docs/3.8.1/genai/tracing/quickstart.md)

[Get started with MLflow Tracing in JavaScript or TypeScript](/docs/3.8.1/genai/tracing/quickstart.md)

[Start building →](/docs/3.8.1/genai/tracing/quickstart.md)

[![Quickstart (Otel)](/docs/3.8.1/images/logos/opentelemetry-logo.svg)](/docs/3.8.1/genai/tracing/app-instrumentation/opentelemetry.md)

### [Quickstart (Otel)](/docs/3.8.1/genai/tracing/app-instrumentation/opentelemetry.md)

[Export traces from an app instrumented with OpenTelemetry to MLflow.](/docs/3.8.1/genai/tracing/app-instrumentation/opentelemetry.md)

[Start building →](/docs/3.8.1/genai/tracing/app-instrumentation/opentelemetry.md)

## One-line Auto Tracing Integrations[​](#one-line-auto-tracing-integrations "Direct link to One-line Auto Tracing Integrations")

MLflow Tracing is integrated with various GenAI libraries and provides one-line automatic tracing experience for each library (and combinations of them!):

python

```
import mlflow

mlflow.openai.autolog()  # or replace 'openai' with other library names, e.g., "anthropic"
```

Click on the logos below to learn more about the individual integration:

* Python
* TypeScript

[![LangChain Logo](/docs/3.8.1/images/logos/langchain-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/langchain.md)

[![LangGraph Logo](/docs/3.8.1/images/logos/langgraph-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/langgraph.md)

[![OpenAI Agent Logo](/docs/3.8.1/images/logos/openai-agent-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/openai-agent.md)

[![DSPy Logo](/docs/3.8.1/images/logos/dspy-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/dspy.md)

[![PydanticAI Logo](/docs/3.8.1/images/logos/pydanticai-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/pydantic_ai.md)

[![Google ADK Logo](/docs/3.8.1/images/logos/google-adk-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/google-adk.md)

[![Microsoft Agent Framework Logo](/docs/3.8.1/images/logos/microsoft-agent-framework-logo.jpg)](/docs/3.8.1/genai/tracing/integrations/listing/microsoft-agent-framework.md)

[![CrewAI Logo](/docs/3.8.1/images/logos/crewai-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/crewai.md)

[![LlamaIndex Logo](/docs/3.8.1/images/logos/llamaindex-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/llama_index.md)

[![AutoGen Logo](/docs/3.8.1/images/logos/autogen-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/autogen.md)

[![Strands Agent SDK Logo](/docs/3.8.1/images/logos/strands-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/strands.md)

[![Agno Logo](/docs/3.8.1/images/logos/agno-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/agno.md)

[![Smolagents Logo](/docs/3.8.1/images/logos/smolagents-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/smolagents.md)

[![Semantic Kernel Logo](/docs/3.8.1/images/logos/semantic-kernel-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/semantic_kernel.md)

[![AG2 Logo](/docs/3.8.1/images/logos/ag2-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/ag2.md)

[![Haystack Logo](/docs/3.8.1/images/logos/haystack-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/haystack.md)

[![Instructor Logo](/docs/3.8.1/images/logos/instructor-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/instructor.md)

[![txtai Logo](/docs/3.8.1/images/logos/txtai-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/txtai.md)

[![OpenAI Logo](/docs/3.8.1/images/logos/openai-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/openai.md)

[![Anthropic Logo](/docs/3.8.1/images/logos/anthropic-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/anthropic.md)

[![Bedrock Logo](/docs/3.8.1/images/logos/bedrock-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/bedrock.md)

[![Gemini Logo](/docs/3.8.1/images/logos/google-gemini-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/gemini.md)

[![Ollama Logo](/docs/3.8.1/images/logos/ollama-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/ollama.md)

[![Groq Logo](/docs/3.8.1/images/logos/groq-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/groq.md)

[![Mistral Logo](/docs/3.8.1/images/logos/mistral-ai-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/mistral.md)

[![FireworksAI Logo](/docs/3.8.1/images/logos/fireworks-ai-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/fireworksai.md)

[![DeepSeek Logo](/docs/3.8.1/images/logos/deepseek-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/deepseek.md)

[![LiteLLM Logo](/docs/3.8.1/images/logos/litellm-logo.jpg)](/docs/3.8.1/genai/tracing/integrations/listing/litellm.md)

[![Claude Code Logo](/docs/3.8.1/images/logos/claude-code-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/claude_code.md)

[![LangChain Logo](/docs/3.8.1/images/logos/langchain-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/langchain.md)

[![LangGraph Logo](/docs/3.8.1/images/logos/langgraph-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/langgraph.md)

[![Vercel AI SDK Logo](/docs/3.8.1/images/logos/vercel-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/vercelai.md)

[![Mastra Logo](/docs/3.8.1/images/logos/mastra-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/mastra.md)

[![VoltAgent Logo](/docs/3.8.1/images/logos/voltagent-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/voltagent.md)

[![OpenAI Logo](/docs/3.8.1/images/logos/openai-logo.png)](/docs/3.8.1/genai/tracing/integrations/listing/openai.md)

[![Anthropic Logo](/docs/3.8.1/images/logos/anthropic-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/anthropic.md)

[![Gemini Logo](/docs/3.8.1/images/logos/google-gemini-logo.svg)](/docs/3.8.1/genai/tracing/integrations/listing/gemini.md)

<br />

## Flexible and Customizable[​](#flexible-and-customizable "Direct link to Flexible and Customizable")

In addition to the one-line auto tracing experience, MLflow offers Python SDK for manually instrumenting your code and manipulating traces:

* [Trace a function with `@mlflow.trace` decorator](/docs/3.8.1/genai/tracing/app-instrumentation/manual-tracing.md#decorator)
* [Trace any block of code](/docs/3.8.1/genai/tracing/app-instrumentation/manual-tracing.md#code-block)
* [Combine multiple auto-tracing integrations](/docs/3.8.1/genai/tracing/app-instrumentation/automatic.md#multi-framework-example)
* [Instrument multi-threaded applications](/docs/3.8.1/genai/tracing/app-instrumentation/manual-tracing.md#multi-threading)
* [Native async support](/docs/3.8.1/genai/tracing/app-instrumentation/manual-tracing.md#async-support)
* [Group and filter traces using sessions](/docs/3.8.1/genai/tracing/track-users-sessions.md)
* [Redact PII data from traces](/docs/3.8.1/genai/tracing/observe-with-traces/masking.md)
* [Disable tracing globally](/docs/3.8.1/genai/tracing/app-instrumentation/automatic.md#disabling-tracing)
* [Configure sampling ratio to control trace throughput](/docs/3.8.1/genai/tracing/prod-tracing.md#sampling-traces)

## Production Readiness[​](#production-readiness "Direct link to Production Readiness")

MLflow Tracing is production ready and provides comprehensive monitoring capabilities for your GenAI applications in production environments. By enabling [async logging](/docs/3.8.1/genai/tracing/prod-tracing.md#asynchronous-trace-logging), trace logging is done in the background and does not impact the performance of your application.

For production deployments, it is recommended to use the [Lightweight Tracing SDK](/docs/3.8.1/genai/tracing/lightweight-sdk.md) (`mlflow-tracing`) that is optimized for reducing the total installation size and minimizing dependencies while maintaining full tracing capabilities. Compared to the full `mlflow` package, the `mlflow-tracing` package requires 95% smaller footprint.

Read [Production Monitoring](/docs/3.8.1/genai/tracing/prod-tracing.md) for complete guidance on using MLflow Tracing for monitoring models in production and various backend configuration options.

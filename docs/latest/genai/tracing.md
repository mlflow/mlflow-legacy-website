# MLflow Tracing for LLM and Agent Observability

MLflow Tracing is a fully **OpenTelemetry-compatible** [LLM observability](https://mlflow.org/ai-observability) solution for your agents and LLM applications. It captures the inputs, outputs, and metadata associated with each intermediate step of a request, enabling you to easily pinpoint the source of bugs and unexpected behaviors.

[](/docs/latest/images/llms/tracing/tracing-top.mp4)

<br />

**Try the MLflow LLMs and Agents Demo**<br />The quickest way to learn about MLflow for LLMs and AI Agents is to try the demo. **Click to launch the demo ↓**

#### **Starting from UI**[​](#starting-from-ui "Direct link to starting-from-ui")

To start the demo, click on the "Start Demo" button on the top page of the MLflow UI.

![MLflow GenAI Demo UI](/docs/latest/images/llms/demo/demo.png)

#### **Starting from CLI**[​](#starting-from-cli "Direct link to starting-from-cli")

Alternatively, you can start the demo from the command line using the `mlflow demo` command. This option does not require you to have a running MLflow server.

bash

```
uvx mlflow demo
```

## LLM and Agent Tracing Use Cases[​](#llm-and-agent-tracing-use-cases "Direct link to LLM and Agent Tracing Use Cases")

MLflow Tracing gives you complete visibility into your agents and LLM applications. Here's how it helps you at each step of agent development, click on the tabs below to learn more:

* Build & Debug
* Human Feedback
* Evaluation
* Production Monitoring
* Dataset Collection

#### Debug Issues in Your IDE or Notebook[​](#debug-issues-in-your-ide-or-notebook "Direct link to Debug Issues in Your IDE or Notebook")

Traces provide deep insights into what happens beneath the abstractions of LLM and AI agent frameworks, helping you precisely identify where issues occur.

You can navigate traces seamlessly within your preferred IDE, notebook, or the MLflow UI, eliminating the hassle of switching between multiple tabs or searching through an overwhelming list of traces.

[Learn more →](/docs/latest/genai/tracing/observe-with-traces/ui.md)

![Trace Debugging](/docs/latest/assets/images/genai-trace-debug-405f9c8b61d5f89fb1d3891242fcd265.png)

#### Track Annotation and Human Feedback[​](#track-annotation-and-human-feedback "Direct link to Track Annotation and Human Feedback")

Human feedback is essential for building high-quality LLM applications and AI agents that meet user expectations. MLflow supports collecting, managing, and utilizing feedback from end-users and domain experts.

Feedback are attached to traces and recorded with metadata, including user, timestamp, revisions, etc.

[Learn more →](/docs/latest/genai/assessments/feedback.md)

![Trace Feedback](/docs/latest/assets/images/genai-human-feedback-9a8ea2ba10a5f7c7bb192aea22345b19.png)

#### Evaluate and Enhance Quality[​](#evaluate-and-enhance-quality "Direct link to Evaluate and Enhance Quality")

Systematically assessing and improving the quality of LLM applications and AI agents is a challenge. Combined with [MLflow Evaluation](/docs/latest/genai/eval-monitor.md), MLflow offers a seamless experience for evaluating your applications.

Tracing helps by allowing you to track quality assessment and inspect the evaluation results with visibility into the internals of the system.

[Learn more →](/docs/latest/genai/eval-monitor.md)

![Trace Evaluation](/docs/latest/assets/images/genai-trace-evaluation-5b5e6ba86f0f0f06ee27db356e4e59e4.png)

#### Monitor Applications in Production[​](#monitor-applications-in-production "Direct link to Monitor Applications in Production")

Understanding and optimizing LLM application and AI agent performance is crucial for efficient operations. MLflow Tracing captures key metrics like latency and token usage at each step, as well as various quality metrics, helping you identify bottlenecks, monitor efficiency, and find optimization opportunities.

[Learn more →](/docs/latest/genai/tracing/prod-tracing.md)

![Monitoring](/docs/latest/assets/images/genai-monitoring-8ebda32e5cc07cb9cc97cb0297e583c3.png)

#### Create a High-Quality Dataset from Real World Traffic[​](#create-a-high-quality-dataset-from-real-world-traffic "Direct link to Create a High-Quality Dataset from Real World Traffic")

Evaluating the performance of your LLM application or AI agent is crucial, but creating a reliable evaluation dataset is challenging.

Traces from production systems capture perfect data for building high-quality datasets with precise details for internal components like retrievers and tools.

[Learn more →](/docs/latest/genai/datasets.md)

![Trace Dataset](/docs/latest/assets/images/genai-trace-dataset-0db517dfd5b8e13ae6732b0a1b0b098f.png)

## What Makes MLflow Tracing Unique?[​](#what-makes-mlflow-tracing-unique "Direct link to What Makes MLflow Tracing Unique?")

#### Open Source

MLflow is open source and 100% FREE. You don't need to pay additional SaaS costs to add observability to your AI stack. Your trace data is hosted on your own infrastructure.

#### OpenTelemetry

MLflow Tracing is fully compatible with OpenTelemetry and natively supports GenAI Semantic Conventions for export and ingestion, making it free from vendor lock-in and easy to integrate with your existing observability stack.

#### Framework Agnostic

MLflow Tracing integrates with all LLM providers and AI agent frameworks, including OpenAI, LangChain, LlamaIndex, DSPy, Pydantic AI, allowing you to switch between frameworks with ease.

#### End-to-End Platform

MLflow Tracing gives you complete visibility into your agents and LLM applications, enabling you to debug, monitor, and improve quality and performance.

#### Strong Community

MLflow boasts a vibrant Open Source community as a part of the Linux Foundation, with 20K+ GitHub Stars and 20MM+ monthly downloads.

## Getting Started[​](#getting-started "Direct link to Getting Started")

[![Quickstart (Python)](/docs/latest/images/logos/python-logo.png)](/docs/latest/genai/tracing/quickstart.md)

### [Quickstart (Python)](/docs/latest/genai/tracing/quickstart.md)

[Get started with MLflow Tracing in Python](/docs/latest/genai/tracing/quickstart.md)

[Start building →](/docs/latest/genai/tracing/quickstart.md)

[![Quickstart (JS/TS)](/docs/latest/images/logos/javascript-typescript-logo.png)](/docs/latest/genai/tracing/quickstart.md)

### [Quickstart (JS/TS)](/docs/latest/genai/tracing/quickstart.md)

[Get started with MLflow Tracing in JavaScript or TypeScript](/docs/latest/genai/tracing/quickstart.md)

[Start building →](/docs/latest/genai/tracing/quickstart.md)

[![Quickstart (Otel)](/docs/latest/images/logos/opentelemetry-logo.svg)](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md)

### [Quickstart (Otel)](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md)

[Export traces from an app instrumented with OpenTelemetry to MLflow.](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md)

[Start building →](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md)

## One-line Auto Tracing Integrations[​](#one-line-auto-tracing-integrations "Direct link to One-line Auto Tracing Integrations")

MLflow Tracing is integrated with various LLM and AI agent frameworks, such as OpenAI, LangChain, DSPy, Vercel AI, and provides one-line automatic tracing experience for each library (and combinations of them!):

python

```
import mlflow

mlflow.openai.autolog()  # or replace 'openai' with other library names, e.g., "anthropic"
```

View the full list of supported libraries and detailed setup instructions on the [Integrations](/docs/latest/genai/tracing/integrations.md) page.

## Flexible and Customizable[​](#flexible-and-customizable "Direct link to Flexible and Customizable")

In addition to the one-line auto tracing experience, MLflow offers Python SDK for manually instrumenting your code and manipulating traces:

* [Trace a function with `@mlflow.trace` decorator](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md#decorator)
* [Trace any block of code](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md#code-block)
* [Combine multiple auto-tracing integrations](/docs/latest/genai/tracing/app-instrumentation/automatic.md#multi-framework-example)
* [Instrument multi-threaded applications](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md#multi-threading)
* [Native async support](/docs/latest/genai/tracing/app-instrumentation/manual-tracing.md#async-support)
* [Group and filter traces using sessions](/docs/latest/genai/tracing/track-users-sessions.md)
* [Redact PII data from traces](/docs/latest/genai/tracing/observe-with-traces/masking.md)
* [Disable tracing globally](/docs/latest/genai/tracing/app-instrumentation/automatic.md#disabling-tracing)
* [Configure sampling ratio to control trace throughput](/docs/latest/genai/tracing/prod-tracing.md#sampling-traces)
* [Propagate trace context across services](/docs/latest/genai/tracing/app-instrumentation/distributed-tracing.md)
* [Capture and view images and audio in traces](/docs/latest/genai/tracing/observe-with-traces/multimodal.md)

## Production Readiness[​](#production-readiness "Direct link to Production Readiness")

MLflow Tracing is production ready and provides comprehensive monitoring capabilities for your LLM applications and AI agents in production environments. By enabling [async logging](/docs/latest/genai/tracing/prod-tracing.md#asynchronous-trace-logging), trace logging is done in the background and does not impact the performance of your application.

For production deployments, it is recommended to use the [Production Tracing SDK](/docs/latest/genai/tracing/lightweight-sdk.md) (`mlflow-tracing`) that is optimized for reducing the total installation size and minimizing dependencies while maintaining full tracing capabilities. Compared to the full `mlflow` package, the `mlflow-tracing` package requires 95% smaller footprint.

Read [Production Monitoring](/docs/latest/genai/tracing/prod-tracing.md) for complete guidance on using MLflow Tracing for monitoring models in production and various backend configuration options.

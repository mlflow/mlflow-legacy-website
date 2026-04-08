# Tracing LangChain🦜⛓️

![LangChain Tracing with MLflow](/docs/latest/images/llms/tracing/langgraph-agent-trace.png)

[LangChain](https://www.langchain.com/) is an open-source framework for building LLM-powered applications.

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing capability for LangChain. You can enable tracing for LangChain by calling the [`mlflow.langchain.autolog()`](/docs/latest/api_reference/python_api/mlflow.langchain.html#mlflow.langchain.autolog) function, and nested traces are automatically logged to the active MLflow Experiment upon invocation of chains. In TypeScript, you can pass the MLflow LangChain callback to the `callbacks` option.

* Python
* JS / TS

python

```
import mlflow

mlflow.langchain.autolog()
```

LangChain.js tracing is supported via the OpenTelemetry ingestion. See the [Getting Started section](#getting-started) below for the full setup.

## Getting Started[​](#getting-started "Direct link to Getting Started")

MLflow support tracing for LangChain in both Python and TypeScript/JavaScript. Please select the appropriate tab below to get started.

* Python
* JS / TS (v1)
* JS / TS (v0)

### 1. Start MLflow[​](#1-start-mlflow "Direct link to 1. Start MLflow")

Start the MLflow server following the [Self-Hosting Guide](/docs/latest/self-hosting.md), if you don't have one already.

### 2. Install dependencies[​](#2-install-dependencies "Direct link to 2. Install dependencies")

bash

```
pip install langchain langchain-openai mlflow
```

### 3. Enable tracing[​](#3-enable-tracing "Direct link to 3. Enable tracing")

python

```
import mlflow

# Calling autolog for LangChain will enable trace logging.
mlflow.langchain.autolog()

# Optional: Set a tracking URI and an experiment
mlflow.set_experiment("LangChain")
mlflow.set_tracking_uri("http://localhost:5000")
```

### 4. Define the chain and invoke it[​](#4-define-the-chain-and-invoke-it "Direct link to 4. Define the chain and invoke it")

python

```
import mlflow
import os

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7, max_tokens=1000)

prompt_template = PromptTemplate.from_template(
    "Answer the question as if you are {person}, fully embodying their style, wit, personality, and habits of speech. "
    "Emulate their quirks and mannerisms to the best of your ability, embracing their traits—even if they aren't entirely "
    "constructive or inoffensive. The question is: {question}"
)

chain = prompt_template | llm | StrOutputParser()

# Let's test another call
chain.invoke({
    "person": "Linus Torvalds",
    "question": "Can I just set everyone's access to sudo to make things easier?",
})
```

### 5. View the trace in the MLflow UI[​](#5-view-the-trace-in-the-mlflow-ui "Direct link to 5. View the trace in the MLflow UI")

Visit `http://localhost:5000` (or your custom MLflow tracking server URL) to view the trace in the MLflow UI.

### 1. Start MLflow[​](#1-start-mlflow-1 "Direct link to 1. Start MLflow")

Start the MLflow server following the [Self-Hosting Guide](/docs/latest/self-hosting.md), if you don't have one already.

### 2. Install the required dependencies:[​](#2-install-the-required-dependencies "Direct link to 2. Install the required dependencies:")

bash

```
npm i langchain @langchain/core @langchain/openai @arizeai/openinference-instrumentation-langchain
```

### 3. Enable OpenTelemetry[​](#3-enable-opentelemetry "Direct link to 3. Enable OpenTelemetry")

Enable OpenTelemetry instrumentation for LangChain in your application:

typescript

```
import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { LangChainInstrumentation } from "@arizeai/openinference-instrumentation-langchain";
import * as CallbackManagerModule from "@langchain/core/callbacks/manager";

// Set up the OpenTelemetry
const provider = new NodeTracerProvider(
  {
    spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
      // Set MLflow tracking server URL with `/v1/traces` path. You can also use the OTEL_EXPORTER_OTLP_TRACES_ENDPOINT environment variable instead.
      url: "http://localhost:5000/v1/traces",
      // Set the experiment ID in the header. You can also use the OTEL_EXPORTER_OTLP_TRACES_HEADERS environment variable instead.
      headers: {
        "x-mlflow-experiment-id": "123",
      },
    }))],
  }
);
provider.register();

// Enable LangChain instrumentation
const lcInstrumentation = new LangChainInstrumentation();
lcInstrumentation.manuallyInstrument(CallbackManagerModule);
```

### 4. Define the LangChain agent and invoke it[​](#4-define-the-langchain-agent-and-invoke-it "Direct link to 4. Define the LangChain agent and invoke it")

Note that the `createAgent` API is available in LangChain.js v1.0 and later. If you are on LangChain 0.x, see the v0 example instead.

typescript

```
import { createAgent, tool } from "langchain";
import * as z from "zod";

const getWeather = tool(
  (input) => `It's always sunny in ${input.city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
  }
);

const agent = createAgent({
  model: "gpt-4o-mini",
  tools: [getWeather],
});

await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
});
```

### 5. View the trace in the MLflow UI[​](#5-view-the-trace-in-the-mlflow-ui-1 "Direct link to 5. View the trace in the MLflow UI")

Visit `http://localhost:5000` (or your custom MLflow tracking server URL) to view the trace in the MLflow UI.

### 1. Start MLflow[​](#1-start-mlflow-2 "Direct link to 1. Start MLflow")

Start the MLflow server following the [Self-Hosting Guide](https://mlflow.org/docs/latest/self-hosting/index.html), if you don't have one already.

### 2. Install dependencies[​](#2-install-dependencies-1 "Direct link to 2. Install dependencies")

Install the required dependencies:

bash

```
npm i langchain @langchain/core @langchain/openai @arizeai/openinference-instrumentation-langchain
```

### 3. Enable OpenTelemetry[​](#3-enable-opentelemetry-1 "Direct link to 3. Enable OpenTelemetry")

Enable OpenTelemetry instrumentation for LangChain in your application:

typescript

```
import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { LangChainInstrumentation } from "@arizeai/openinference-instrumentation-langchain";
import * as CallbackManagerModule from "@langchain/core/callbacks/manager";

// Set up the OpenTelemetry
const provider = new NodeTracerProvider(
  {
    spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
      // Set MLflow tracking server URL. You can also use the OTEL_EXPORTER_OTLP_TRACES_ENDPOINT environment variable instead.
      url: "http://localhost:5000/v1/traces",
      // Set the experiment ID in the header. You can also use the OTEL_EXPORTER_OTLP_TRACES_HEADERS environment variable instead.
      headers: {
        "x-mlflow-experiment-id": "123",
      },
    }))],
  }
);
provider.register();

// Enable LangChain instrumentation
const lcInstrumentation = new LangChainInstrumentation();
lcInstrumentation.manuallyInstrument(CallbackManagerModule);
```

### 4. Define the LangChain chain and invoke it[​](#4-define-the-langchain-chain-and-invoke-it "Direct link to 4. Define the LangChain chain and invoke it")

typescript

```
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new OpenAI("gpt-4o-mini");
const prompt = PromptTemplate.fromTemplate("What is a good name for a company that makes {product}?");
const chain = prompt.pipe({ llm: model });

const res = await chain.invoke({ product: "colorful socks" });
console.log({ res });
```

### 5. View the trace in the MLflow UI[​](#5-view-the-trace-in-the-mlflow-ui-2 "Direct link to 5. View the trace in the MLflow UI")

Visit `http://localhost:5000` (or your custom MLflow tracking server URL) to view the trace in the MLflow UI.

note

This example above has been confirmed working with the following requirement versions:

shell

```
pip install openai==1.30.5 langchain==0.2.1 langchain-openai==0.1.8 langchain-community==0.2.1 mlflow==2.14.0 tiktoken==0.7.0
```

Image Support for LangChain Traces

MLflow captures image content parts passed through LangChain models. See [Image and Audio (Multimodal) Content in Traces](/docs/latest/genai/tracing/observe-with-traces/multimodal.md) for details.

## Supported APIs[​](#supported-apis "Direct link to Supported APIs")

The following APIs are supported by auto tracing for LangChain.

* `invoke`
* `batch`
* `stream`
* `ainvoke`
* `abatch`
* `astream`
* `get_relevant_documents` (for retrievers)
* `__call__` (for Chains and AgentExecutors)

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for LangChain. The token usage for each LLM call during a chain invocation will be logged in each Trace/Span and the aggregated cost and time trend are displayed in the built-in dashboard. See the [Token Usage and Cost Tracking](/docs/latest/genai/tracing/token-usage-cost.md) documentation for details on accessing this information programmatically.

## Customize Tracing Behavior[​](#customize-tracing-behavior "Direct link to Customize Tracing Behavior")

Sometimes you may want to customize what information is logged in the traces. You can achieve this by creating a custom callback handler that inherits from [`MlflowLangchainTracer`](/docs/latest/api_reference/python_api/mlflow.html#mlflow.langchai.langchain_tracer.MlflowLangchainTracer). MlflowLangchainTracer is a callback handler that is injected into the langchain model inference process to log traces automatically. It starts a new span upon a set of actions of the chain such as on\_chain\_start, on\_llm\_start, and concludes it when the action is finished. Various metadata such as span type, action name, input, output, latency, are automatically recorded to the span.

The following example demonstrates how to record an additional attribute to the span when a chat model starts running.

python

```
from mlflow.langchain.langchain_tracer import MlflowLangchainTracer


class CustomLangchainTracer(MlflowLangchainTracer):
    # Override the handler functions to customize the behavior. The method signature is defined by LangChain Callbacks.
    def on_chat_model_start(
        self,
        serialized: Dict[str, Any],
        messages: List[List[BaseMessage]],
        *,
        run_id: UUID,
        tags: Optional[List[str]] = None,
        parent_run_id: Optional[UUID] = None,
        metadata: Optional[Dict[str, Any]] = None,
        name: Optional[str] = None,
        **kwargs: Any,
    ):
        """Run when a chat model starts running."""
        attributes = {
            **kwargs,
            **metadata,
            # Add additional attribute to the span
            "version": "1.0.0",
        }

        # Call the _start_span method at the end of the handler function to start a new span.
        self._start_span(
            span_name=name or self._assign_span_name(serialized, "chat model"),
            parent_run_id=parent_run_id,
            span_type=SpanType.CHAT_MODEL,
            run_id=run_id,
            inputs=messages,
            attributes=kwargs,
        )
```

## Combine with the MLflow Tracing SDK (JS / TS)[​](#combine-with-the-mlflow-tracing-sdk-js--ts "Direct link to Combine with the MLflow Tracing SDK (JS / TS)")

When using LangChain.js with OpenTelemetry-based tracing, you can combine the automatically generated traces with the [MLflow Tracing SDK](/docs/latest/genai/tracing.md) (`@mlflow/core`) to add custom spans, set tags, and update trace metadata within the same trace.

typescript

```
import { init, withSpan } from "@mlflow/core";
import { LangChainInstrumentation } from "@arizeai/openinference-instrumentation-langchain";
import * as CallbackManagerModule from "@langchain/core/callbacks/manager";

// Initialize MLflow SDK - sets up the OTel provider to capture all spans
init({
  trackingUri: "http://localhost:5000",
  experimentId: "<your-experiment-id>",
});

// Enable LangChain instrumentation
const lcInstrumentation = new LangChainInstrumentation();
lcInstrumentation.manuallyInstrument(CallbackManagerModule);

// Add custom MLflow spans alongside the auto-generated LangChain traces
const result = await withSpan(
  { name: "custom_step", inputs: { query: "test" } },
  async (span) => {
    // your LangChain application logic here
    return { result: "success" };
  }
);
```

For detailed instructions and examples, see [Combining the OpenTelemetry SDK and the MLflow Tracing SDK](/docs/latest/genai/tracing/app-instrumentation/opentelemetry.md#combining-the-opentelemetry-sdk-and-the-mlflow-tracing-sdk).

## Disable auto-tracing[​](#disable-auto-tracing "Direct link to Disable auto-tracing")

Auto tracing for LangChain can be disabled globally by calling `mlflow.langchain.autolog(disable=True)` or `mlflow.autolog(disable=True)`.

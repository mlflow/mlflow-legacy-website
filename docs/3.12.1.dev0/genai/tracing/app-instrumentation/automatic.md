# Automatic Tracing

MLflow Tracing is integrated with various LLM and AI agent frameworks and provides **one-line automatic tracing** experience for each library (and the combination of them!). This page shows detailed examples to integrate MLflow with popular LLM and AI agent frameworks.

![Automatic Tracing with MLflow](/docs/3.12.1.dev0/images/llms/anthropic/anthropic-tracing.png)

## Supported Integrations[​](#supported-integrations "Direct link to Supported Integrations")

Each integration automatically captures your application's logic and intermediate steps based on your implementation of the authoring framework / SDK. Click on the logo of your library to see the detailed integration guide.

### OpenTelemetry[​](#opentelemetry "Direct link to OpenTelemetry")

[![OpenTelemetry Logo](/docs/3.12.1.dev0/images/logos/opentelemetry-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/app-instrumentation/opentelemetry.md)

[OpenTelemetry](/docs/3.12.1.dev0/genai/tracing/app-instrumentation/opentelemetry.md)

### Agent Frameworks (Python)[​](#agent-frameworks-python "Direct link to Agent Frameworks (Python)")

[![LangChain Logo](/docs/3.12.1.dev0/images/logos/langchain-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langchain.md)

[LangChain](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langchain.md)

[![LangGraph Logo](/docs/3.12.1.dev0/images/logos/langgraph-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langgraph.md)

[LangGraph](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langgraph.md)

[![OpenAI Agent Logo](/docs/3.12.1.dev0/images/logos/openai-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openai-agent.md)

[OpenAI Agent](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openai-agent.md)

[![DSPy Logo](/docs/3.12.1.dev0/images/logos/dspy-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/dspy.md)

[DSPy](/docs/3.12.1.dev0/genai/tracing/integrations/listing/dspy.md)

[![PydanticAI Logo](/docs/3.12.1.dev0/images/logos/pydantic-ai-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pydantic_ai.md)

[PydanticAI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pydantic_ai.md)

[![Google ADK Logo](/docs/3.12.1.dev0/images/logos/google-adk-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/google-adk.md)

[Google ADK](/docs/3.12.1.dev0/genai/tracing/integrations/listing/google-adk.md)

[![Microsoft Agent Framework Logo](/docs/3.12.1.dev0/images/logos/microsoft-agent-framework-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/microsoft-agent-framework.md)

[Microsoft Agent Framework](/docs/3.12.1.dev0/genai/tracing/integrations/listing/microsoft-agent-framework.md)

[![CrewAI Logo](/docs/3.12.1.dev0/images/logos/crewai-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/crewai.md)

[CrewAI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/crewai.md)

[![LlamaIndex Logo](/docs/3.12.1.dev0/images/logos/llamaindex-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/llama_index.md)

[LlamaIndex](/docs/3.12.1.dev0/genai/tracing/integrations/listing/llama_index.md)

[![AutoGen Logo](/docs/3.12.1.dev0/images/logos/autogen-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/autogen.md)

[AutoGen](/docs/3.12.1.dev0/genai/tracing/integrations/listing/autogen.md)

[![Strands Agent SDK Logo](/docs/3.12.1.dev0/images/logos/strands-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/strands.md)

[Strands Agent SDK](/docs/3.12.1.dev0/genai/tracing/integrations/listing/strands.md)

[![LiveKit Agents Logo](/docs/3.12.1.dev0/images/logos/livekit-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/livekit.md)

[LiveKit Agents](/docs/3.12.1.dev0/genai/tracing/integrations/listing/livekit.md)

[![Agno Logo](/docs/3.12.1.dev0/images/logos/agno-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/agno.md)

[Agno](/docs/3.12.1.dev0/genai/tracing/integrations/listing/agno.md)

[![Amazon Bedrock AgentCore Logo](/docs/3.12.1.dev0/images/logos/bedrock-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/bedrock-agentcore.md)

[Amazon Bedrock AgentCore](/docs/3.12.1.dev0/genai/tracing/integrations/listing/bedrock-agentcore.md)

[![Smolagents Logo](/docs/3.12.1.dev0/images/logos/smolagents-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/smolagents.md)

[Smolagents](/docs/3.12.1.dev0/genai/tracing/integrations/listing/smolagents.md)

[![Semantic Kernel Logo](/docs/3.12.1.dev0/images/logos/semantic-kernel-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/semantic_kernel.md)

[Semantic Kernel](/docs/3.12.1.dev0/genai/tracing/integrations/listing/semantic_kernel.md)

[![LangChain DeepAgent Logo](/docs/3.12.1.dev0/images/logos/deepagent-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/deepagent.md)

[LangChain DeepAgent](/docs/3.12.1.dev0/genai/tracing/integrations/listing/deepagent.md)

[![AG2 Logo](/docs/3.12.1.dev0/images/logos/ag2-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/ag2.md)

[AG2](/docs/3.12.1.dev0/genai/tracing/integrations/listing/ag2.md)

[![Haystack Logo](/docs/3.12.1.dev0/images/logos/haystack-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/haystack.md)

[Haystack](/docs/3.12.1.dev0/genai/tracing/integrations/listing/haystack.md)

[![Koog Logo](/docs/3.12.1.dev0/images/logos/koog.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/koog.md)

[Koog](/docs/3.12.1.dev0/genai/tracing/integrations/listing/koog.md)

[![txtai Logo](/docs/3.12.1.dev0/images/logos/txtai-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/txtai.md)

[txtai](/docs/3.12.1.dev0/genai/tracing/integrations/listing/txtai.md)

[![Pipecat Logo](/docs/3.12.1.dev0/images/logos/pipecat.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pipecat.md)

[Pipecat](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pipecat.md)

[![Watsonx Orchestrate Logo](/docs/3.12.1.dev0/images/logos/watsonx-orchestrate.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/watsonx-orchestrate.md)

[Watsonx Orchestrate](/docs/3.12.1.dev0/genai/tracing/integrations/listing/watsonx-orchestrate.md)

### Agent Frameworks (TypeScript)[​](#agent-frameworks-typescript "Direct link to Agent Frameworks (TypeScript)")

[![LangChain Logo](/docs/3.12.1.dev0/images/logos/langchain-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langchain.md)

[LangChain](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langchain.md)

[![LangGraph Logo](/docs/3.12.1.dev0/images/logos/langgraph-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langgraph.md)

[LangGraph](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langgraph.md)

[![Vercel AI SDK Logo](/docs/3.12.1.dev0/images/logos/vercel-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/vercelai.md)

[Vercel AI SDK](/docs/3.12.1.dev0/genai/tracing/integrations/listing/vercelai.md)

[![Mastra Logo](/docs/3.12.1.dev0/images/logos/mastra-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mastra.md)

[Mastra](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mastra.md)

[![VoltAgent Logo](/docs/3.12.1.dev0/images/logos/voltagent-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/voltagent.md)

[VoltAgent](/docs/3.12.1.dev0/genai/tracing/integrations/listing/voltagent.md)

### Model Providers[​](#model-providers "Direct link to Model Providers")

[![OpenAI Logo](/docs/3.12.1.dev0/images/logos/openai-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openai.md)

[OpenAI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openai.md)

[![Anthropic Logo](/docs/3.12.1.dev0/images/logos/anthropic-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/anthropic.md)

[Anthropic](/docs/3.12.1.dev0/genai/tracing/integrations/listing/anthropic.md)

[![Databricks Logo](/docs/3.12.1.dev0/images/logos/databricks-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/databricks.md)

[Databricks](/docs/3.12.1.dev0/genai/tracing/integrations/listing/databricks.md)

[![Gemini Logo](/docs/3.12.1.dev0/images/logos/google-gemini-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/gemini.md)

[Gemini](/docs/3.12.1.dev0/genai/tracing/integrations/listing/gemini.md)

[![Amazon Bedrock Logo](/docs/3.12.1.dev0/images/logos/bedrock-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/bedrock.md)

[Amazon Bedrock](/docs/3.12.1.dev0/genai/tracing/integrations/listing/bedrock.md)

[![LiteLLM Logo](/docs/3.12.1.dev0/images/logos/litellm-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/litellm.md)

[LiteLLM](/docs/3.12.1.dev0/genai/tracing/integrations/listing/litellm.md)

[![Mistral Logo](/docs/3.12.1.dev0/images/logos/mistral-ai-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mistral.md)

[Mistral](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mistral.md)

[![xAI / Grok Logo](/docs/3.12.1.dev0/images/logos/grok-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/xai-grok.md)

[xAI / Grok](/docs/3.12.1.dev0/genai/tracing/integrations/listing/xai-grok.md)

[![Ollama Logo](/docs/3.12.1.dev0/images/logos/ollama-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/ollama.md)

[Ollama](/docs/3.12.1.dev0/genai/tracing/integrations/listing/ollama.md)

[![Groq Logo](/docs/3.12.1.dev0/images/logos/groq-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/groq.md)

[Groq](/docs/3.12.1.dev0/genai/tracing/integrations/listing/groq.md)

[![DeepSeek Logo](/docs/3.12.1.dev0/images/logos/deepseek-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/deepseek.md)

[DeepSeek](/docs/3.12.1.dev0/genai/tracing/integrations/listing/deepseek.md)

[![Qwen Logo](/docs/3.12.1.dev0/images/logos/qwen-logo.jpg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/qwen.md)

[Qwen](/docs/3.12.1.dev0/genai/tracing/integrations/listing/qwen.md)

[![Moonshot AI Logo](/docs/3.12.1.dev0/images/logos/kimi-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/moonshot.md)

[Moonshot AI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/moonshot.md)

[![Cohere Logo](/docs/3.12.1.dev0/images/logos/cohere-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/cohere.md)

[Cohere](/docs/3.12.1.dev0/genai/tracing/integrations/listing/cohere.md)

[![BytePlus Logo](/docs/3.12.1.dev0/images/logos/byteplus-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/byteplus.md)

[BytePlus](/docs/3.12.1.dev0/genai/tracing/integrations/listing/byteplus.md)

[![Novita AI Logo](/docs/3.12.1.dev0/images/logos/novitaai-logo.jpg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/novitaai.md)

[Novita AI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/novitaai.md)

[![FireworksAI Logo](/docs/3.12.1.dev0/images/logos/fireworks-ai-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/fireworksai.md)

[FireworksAI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/fireworksai.md)

[![Together AI Logo](/docs/3.12.1.dev0/images/logos/together-ai-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/togetherai.md)

[Together AI](/docs/3.12.1.dev0/genai/tracing/integrations/listing/togetherai.md)

### Tools[​](#tools "Direct link to Tools")

[![Instructor Logo](/docs/3.12.1.dev0/images/logos/instructor-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/instructor.md)

[Instructor](/docs/3.12.1.dev0/genai/tracing/integrations/listing/instructor.md)

[![Langfuse Logo](/docs/3.12.1.dev0/images/logos/langfuse-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langfuse.md)

[Langfuse](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langfuse.md)

[![Arize / Phoenix Logo](/docs/3.12.1.dev0/images/logos/arize-phoenix-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/arize.md)

[Arize / Phoenix](/docs/3.12.1.dev0/genai/tracing/integrations/listing/arize.md)

### Gateways[​](#gateways "Direct link to Gateways")

[![MLflow AI Gateway Logo](/docs/3.12.1.dev0/images/logos/mlflow-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mlflow-ai-gateway.md)

[MLflow AI Gateway](/docs/3.12.1.dev0/genai/tracing/integrations/listing/mlflow-ai-gateway.md)

[![Databricks Logo](/docs/3.12.1.dev0/images/logos/databricks-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/databricks-ai-gateway.md)

[Databricks](/docs/3.12.1.dev0/genai/tracing/integrations/listing/databricks-ai-gateway.md)

[![LiteLLM Proxy Logo](/docs/3.12.1.dev0/images/logos/litellm-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/litellm-proxy.md)

[LiteLLM Proxy](/docs/3.12.1.dev0/genai/tracing/integrations/listing/litellm-proxy.md)

[![Vercel AI Gateway Logo](/docs/3.12.1.dev0/images/logos/vercel-logo.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/vercel-ai-gateway.md)

[Vercel AI Gateway](/docs/3.12.1.dev0/genai/tracing/integrations/listing/vercel-ai-gateway.md)

[![OpenRouter Logo](/docs/3.12.1.dev0/images/logos/openrouter-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openrouter.md)

[OpenRouter](/docs/3.12.1.dev0/genai/tracing/integrations/listing/openrouter.md)

[![Portkey Logo](/docs/3.12.1.dev0/images/logos/portkey-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/portkey.md)

[Portkey](/docs/3.12.1.dev0/genai/tracing/integrations/listing/portkey.md)

[![Helicone Logo](/docs/3.12.1.dev0/images/logos/helicone-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/helicone.md)

[Helicone](/docs/3.12.1.dev0/genai/tracing/integrations/listing/helicone.md)

[![Kong AI Gateway Logo](/docs/3.12.1.dev0/images/logos/kong-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/kong.md)

[Kong AI Gateway](/docs/3.12.1.dev0/genai/tracing/integrations/listing/kong.md)

[![Pydantic AI Gateway Logo](/docs/3.12.1.dev0/images/logos/pydantic-ai-logo-only.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pydantic-ai-gateway.md)

[Pydantic AI Gateway](/docs/3.12.1.dev0/genai/tracing/integrations/listing/pydantic-ai-gateway.md)

[![TrueFoundry Logo](/docs/3.12.1.dev0/images/logos/truefoundry-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/truefoundry.md)

[TrueFoundry](/docs/3.12.1.dev0/genai/tracing/integrations/listing/truefoundry.md)

### No-Code[​](#no-code "Direct link to No-Code")

[![Goose Logo](/docs/3.12.1.dev0/images/logos/goose-logo.png)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/goose.md)

[Goose](/docs/3.12.1.dev0/genai/tracing/integrations/listing/goose.md)

[![Langflow Logo](/docs/3.12.1.dev0/images/logos/langflow.svg)](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langflow.md)

[Langflow](/docs/3.12.1.dev0/genai/tracing/integrations/listing/langflow.md)

<br />

Missing your favorite library?

Is your favorite library missing from the list? Consider [contributing to MLflow Tracing](/docs/3.12.1.dev0/genai/tracing/integrations/contribute.md) or [submitting a feature request](https://github.com/mlflow/mlflow/issues/new?assignees=\&labels=enhancement\&projects=\&template=feature_request_template.yaml\&title=%5BFR%5D) to our Github repository.

## Advanced Usage[​](#advanced-usage "Direct link to Advanced Usage")

### Combining Manual and Automatic Tracing[​](#combining-manual-and-automatic-tracing "Direct link to Combining Manual and Automatic Tracing")

The `@mlflow.trace` decorator can be used in conjunction with auto tracing to create powerful, integrated traces. This is particularly useful for:

1. 🔄 **Complex workflows** that involve multiple LLM calls
2. 🤖 **Multi-agent systems** where different agents use different LLM providers
3. 🔗 **Chaining multiple LLM calls** together with custom logic in between

Here's a simple example that combines OpenAI auto-tracing with manually defined spans:

python

```
import mlflow
import openai
from mlflow.entities import SpanType

mlflow.openai.autolog()


@mlflow.trace(span_type=SpanType.CHAIN)
def run(question):
    messages = build_messages(question)
    # MLflow automatically generates a span for OpenAI invocation
    response = openai.OpenAI().chat.completions.create(
        model="gpt-4o-mini",
        max_tokens=100,
        messages=messages,
    )
    return parse_response(response)


@mlflow.trace
def build_messages(question):
    return [
        {"role": "system", "content": "You are a helpful chatbot."},
        {"role": "user", "content": question},
    ]


@mlflow.trace
def parse_response(response):
    return response.choices[0].message.content


run("What is MLflow?")
```

Running this code generates a single trace that combines the manual spans with the automatic OpenAI tracing.

### Multi-Framework Example[​](#multi-framework-example "Direct link to Multi-Framework Example")

You can also combine different LLM providers in a single trace. For example:

note

This example requires installing LangChain in addition to the base requirements:

bash

```
pip install --upgrade langchain langchain-openai
```

python

```
import mlflow
import openai
from mlflow.entities import SpanType
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# Enable auto-tracing for both OpenAI and LangChain
mlflow.openai.autolog()
mlflow.langchain.autolog()


@mlflow.trace(span_type=SpanType.CHAIN)
def multi_provider_workflow(query: str):
    # First, use OpenAI directly for initial processing
    analysis = openai.OpenAI().chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Analyze the query and extract key topics."},
            {"role": "user", "content": query},
        ],
    )
    topics = analysis.choices[0].message.content

    # Then use LangChain for structured processing
    llm = ChatOpenAI(model="gpt-4o-mini")
    prompt = ChatPromptTemplate.from_template(
        "Based on these topics: {topics}\nGenerate a detailed response to: {query}"
    )
    chain = prompt | llm
    response = chain.invoke({"topics": topics, "query": query})

    return response


# Run the function
result = multi_provider_workflow("Explain quantum computing")
```

## Disabling Tracing[​](#disabling-tracing "Direct link to Disabling Tracing")

To **disable** tracing, the [`mlflow.tracing.disable()`](/docs/3.12.1.dev0/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.disable) API will cease the collection of trace data from within MLflow and will not log any data to the MLflow Tracking service regarding traces.

To **enable** tracing (if it had been temporarily disabled), the [`mlflow.tracing.enable()`](/docs/3.12.1.dev0/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.enable) API will re-enable tracing functionality for instrumented models that are invoked.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Manual Tracing](/docs/3.12.1.dev0/genai/tracing/app-instrumentation/manual-tracing.md)

[Learn how to add custom tracing to your application logic](/docs/3.12.1.dev0/genai/tracing/app-instrumentation/manual-tracing.md)

[Add custom spans →](/docs/3.12.1.dev0/genai/tracing/app-instrumentation/manual-tracing.md)

### [Viewing Traces](/docs/3.12.1.dev0/genai/tracing/observe-with-traces/ui.md)

[Explore and analyze your traces in the MLflow UI](/docs/3.12.1.dev0/genai/tracing/observe-with-traces/ui.md)

[View traces →](/docs/3.12.1.dev0/genai/tracing/observe-with-traces/ui.md)

### [Querying Traces](/docs/3.12.1.dev0/genai/tracing/search-traces.md)

[Programmatically search and retrieve trace data for analysis](/docs/3.12.1.dev0/genai/tracing/search-traces.md)

[Search traces →](/docs/3.12.1.dev0/genai/tracing/search-traces.md)

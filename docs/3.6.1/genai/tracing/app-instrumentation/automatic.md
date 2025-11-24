# Automatic Tracing

MLflow Tracing is integrated with various GenAI libraries and provides **one-line automatic tracing** experience for each library (and the combination of them!). This page shows detailed examples to integrate MLflow with popular GenAI libraries.

[](/docs/3.6.1/images/llms/tracing/tracing-top.mp4)

## Supported Integrations[​](#supported-integrations "Direct link to Supported Integrations")

Each integration automatically captures your application's logic and intermediate steps based on your implementation of the authoring framework / SDK. Click on the logo of your library to see the detailed integration guide.

[![LangChain Logo](/docs/3.6.1/images/logos/langchain-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/langchain.md)

[![LangGraph Logo](/docs/3.6.1/images/logos/langgraph-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/langgraph.md)

[![Vercel AI SDK Logo](/docs/3.6.1/images/logos/vercel-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/vercelai.md)

[![OpenAI Agent Logo](/docs/3.6.1/images/logos/openai-agent-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/openai-agent.md)

[![DSPy Logo](/docs/3.6.1/images/logos/dspy-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/dspy.md)

[![PydanticAI Logo](/docs/3.6.1/images/logos/pydanticai-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/pydantic_ai.md)

[![Google ADK Logo](/docs/3.6.1/images/logos/google-adk-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/google-adk.md)

[![Microsoft Agent Framework Logo](/docs/3.6.1/images/logos/microsoft-agent-framework-logo.jpg)](/docs/3.6.1/genai/tracing/integrations/listing/microsoft-agent-framework.md)

[![CrewAI Logo](/docs/3.6.1/images/logos/crewai-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/crewai.md)

[![LlamaIndex Logo](/docs/3.6.1/images/logos/llamaindex-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/llama_index.md)

[![AutoGen Logo](/docs/3.6.1/images/logos/autogen-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/autogen.md)

[![Strands Agent SDK Logo](/docs/3.6.1/images/logos/strands-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/strands.md)

[![Mastra Logo](/docs/3.6.1/images/logos/mastra-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/mastra.md)

[![Agno Logo](/docs/3.6.1/images/logos/agno-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/agno.md)

[![Smolagents Logo](/docs/3.6.1/images/logos/smolagents-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/smolagents.md)

[![Semantic Kernel Logo](/docs/3.6.1/images/logos/semantic-kernel-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/semantic_kernel.md)

[![AG2 Logo](/docs/3.6.1/images/logos/ag2-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/ag2.md)

[![Haystack Logo](/docs/3.6.1/images/logos/haystack-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/haystack.md)

[![Instructor Logo](/docs/3.6.1/images/logos/instructor-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/instructor.md)

[![txtai Logo](/docs/3.6.1/images/logos/txtai-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/txtai.md)

[![OpenAI Logo](/docs/3.6.1/images/logos/openai-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/openai.md)

[![Anthropic Logo](/docs/3.6.1/images/logos/anthropic-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/anthropic.md)

[![Bedrock Logo](/docs/3.6.1/images/logos/bedrock-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/bedrock.md)

[![Gemini Logo](/docs/3.6.1/images/logos/google-gemini-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/gemini.md)

[![Ollama Logo](/docs/3.6.1/images/logos/ollama-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/ollama.md)

[![Groq Logo](/docs/3.6.1/images/logos/groq-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/groq.md)

[![Mistral Logo](/docs/3.6.1/images/logos/mistral-ai-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/mistral.md)

[![FireworksAI Logo](/docs/3.6.1/images/logos/fireworks-ai-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/fireworksai.md)

[![DeepSeek Logo](/docs/3.6.1/images/logos/deepseek-logo.png)](/docs/3.6.1/genai/tracing/integrations/listing/deepseek.md)

[![LiteLLM Logo](/docs/3.6.1/images/logos/litellm-logo.jpg)](/docs/3.6.1/genai/tracing/integrations/listing/litellm.md)

[![Claude Code Logo](/docs/3.6.1/images/logos/claude-code-logo.svg)](/docs/3.6.1/genai/tracing/integrations/listing/claude_code.md)

<br />

Missing your favorite library?

Is your favorite library missing from the list? Consider [contributing to MLflow Tracing](/docs/3.6.1/genai/tracing/integrations/contribute.md) or [submitting a feature request](https://github.com/mlflow/mlflow/issues/new?assignees=\&labels=enhancement\&projects=\&template=feature_request_template.yaml\&title=%5BFR%5D) to our Github repository.

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

To **disable** tracing, the [`mlflow.tracing.disable()`](/docs/3.6.1/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.disable) API will cease the collection of trace data from within MLflow and will not log any data to the MLflow Tracking service regarding traces.

To **enable** tracing (if it had been temporarily disabled), the [`mlflow.tracing.enable()`](/docs/3.6.1/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.enable) API will re-enable tracing functionality for instrumented models that are invoked.

## Next Steps[​](#next-steps "Direct link to Next Steps")

**[Manual Tracing](/docs/3.6.1/genai/tracing/app-instrumentation/manual-tracing.md)**: Learn how to add custom tracing to your application logic

**[Integration Guides](/docs/3.6.1/genai/tracing/integrations.md)**: Explore detailed guides for specific libraries and frameworks

**[Viewing Traces](/docs/3.6.1/genai/tracing/observe-with-traces/ui.md)**: Learn how to explore and analyze your traces in the MLflow UI

**[Querying Traces](/docs/3.6.1/genai/tracing/search-traces.md)**: Programmatically search and retrieve trace data for analysis

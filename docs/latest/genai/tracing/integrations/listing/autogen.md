# Tracing AutoGen

![AutoGen tracing via autolog](/docs/latest/assets/images/autogen-trace-872bd836d047c1a308cee87a312d0260.png)

[AutoGen AgentChat](https://microsoft.github.io/autogen/stable/index.html) is an open-source framework for building conversational single and multi-agent applications.

[MLflow Tracing](/docs/latest/genai/tracing/integrations.md) provides automatic tracing capability for AutoGen AgentChat. By enabling auto tracing for AutoGen by calling the [`mlflow.autogen.autolog()`](/docs/latest/api_reference/python_api/mlflow.autogen.html#mlflow.autogen.autolog) function, MLflow will capture nested traces and log them to the active MLflow Experiment upon agents execution.

python

```
import mlflow

mlflow.autogen.autolog()
```

note

Note that `mlflow.autogen.autolog()` should be called after importing AutoGen classes that are traced. Subclasses of `ChatCompletionClient` such as `OpenAIChatCompletionClient` or `AnthropicChatCompletionClient` and subclasses of `BaseChatAgent` such as `AssistantAgent` or `CodeExecutorAgent` should be imported before calling `mlflow.autogen.autolog()`. Also note that this integration is for AutoGen 0.4.9 or above. If you are using AutoGen 0.2, please use the [AG2 integration](/docs/latest/genai/tracing/integrations/listing/ag2.md) instead.

MLflow captures the following information about the AutoGen agents:

* Messages passed to agents including images
* Responses from agents
* LLM and tool calls made by each agent
* Latencies
* Any exception if raised

### Supported APIs[​](#supported-apis "Direct link to Supported APIs")

MLflow supports automatic tracing for the following AutoGen APIs. It does not support tracing for asynchronous generators. Asynchronous streaming APIs such as `run_stream` or `on_messages_stream` are not traced.

* `ChatCompletionClient.create`
* `BaseChatAgent.run`
* `BaseChatAgent.on_messages`

### Basic Example[​](#basic-example "Direct link to Basic Example")

python

```
import os

# Imports of autogen classes should happen before calling autolog.
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

import mlflow

# Turn on auto tracing for AutoGen
mlflow.autogen.autolog()

# Optional: Set a tracking URI and an experiment
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("AutoGen")

model_client = OpenAIChatCompletionClient(
    model="gpt-4.1-nano",
    # api_key="YOUR_API_KEY",
)

agent = AssistantAgent(
    name="assistant",
    model_client=model_client,
    system_message="You are a helpful assistant.",
)

result = await agent.run(task="Say 'Hello World!'")
print(result)
```

### Tool Agent[​](#tool-agent "Direct link to Tool Agent")

python

```
import os

# Imports of autogen classes should happen before calling autolog.
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

import mlflow

# Turn on auto tracing for AutoGen
mlflow.autogen.autolog()

# Optional: Set a tracking URI and an experiment
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("AutoGen")

model_client = OpenAIChatCompletionClient(
    model="gpt-4.1-nano",
    # api_key="YOUR_API_KEY",
)


def add(a: int, b: int) -> int:
    """add two numbers"""
    return a + b


agent = AssistantAgent(
    name="assistant",
    model_client=model_client,
    system_message="You are a helpful assistant.",
    tools=[add],
)

await agent.run(task="1+1")
```

## Tracking Token Usage and Cost[​](#tracking-token-usage-and-cost "Direct link to Tracking Token Usage and Cost")

MLflow automatically tracks token usage and cost for AutoGen. The token usage for each LLM call will be logged in each Trace/Span and the aggregated cost and time trend are displayed in the built-in dashboard. See the [Token Usage and Cost Tracking](/docs/latest/genai/tracing/token-usage-cost.md) documentation for details on accessing this information programmatically.

### Supported APIs[​](#supported-apis-1 "Direct link to Supported APIs")

MLflow supports automatic token usage and cost tracking for the following AutoGen APIs. It does not support tracking for asynchronous generators. Asynchronous streaming APIs such as `run_stream` or `on_messages_stream` are not tracked.

* `ChatCompletionClient.create`
* `BaseChatAgent.run`
* `BaseChatAgent.on_messages`

### Disable auto-tracing[​](#disable-auto-tracing "Direct link to Disable auto-tracing")

Auto tracing for AutoGen can be disabled globally by calling `mlflow.autogen.autolog(disable=True)` or `mlflow.autolog(disable=True)`.

# Tracing OpenHands

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing for [OpenHands](https://github.com/All-Hands-AI/OpenHands), a leading open-source AI agent framework for autonomous software development. OpenHands agents interact with code, terminals, file systems, and the web, and support multiple LLM providers including Claude, OpenAI, and open-source models.

![OpenHands Tracing](/docs/latest/images/llms/openhands/openhands-trace.png)

OpenHands emits [OpenTelemetry](https://opentelemetry.io/) traces natively, and MLflow accepts them out of the box. Whether you use OpenHands through the [SDK](https://docs.openhands.dev/sdk) or the [CLI](https://docs.openhands.dev/overview/quickstart), after setting up the connection, MLflow will automatically capture traces of your OpenHands agent runs. The trace automatically captures information such as:

* User prompts and assistant responses
* Tool usage (terminal commands, file editing, web browsing, etc.)
* The tools and system prompt given to the agent
* Latency of each step
* Token usage breakdown and corresponding costs

## Setup[​](#setup "Direct link to Setup")

OpenHands tracing is configured using OpenTelemetry environment variables that point to your MLflow server. Select the **SDK** or **CLI** tab below depending on how you use OpenHands.

1

### Install OpenHands

Install the OpenHands [SDK](https://docs.openhands.dev/sdk) or [CLI](https://docs.openhands.dev/overview/quickstart).

* SDK
* CLI

bash

```
pip install openhands-sdk
```

bash

```
uv tool install openhands --python 3.12
```

2

### Start MLflow Server

[Start an MLflow server](/docs/latest/genai/getting-started/connect-environment.md) if you haven't already. This step is common to both the SDK and CLI.

bash

```
mlflow server
```

Or using [Docker Compose](/docs/latest/self-hosting.md#docker-compose):

bash

```
docker compose up -d
```

3

### Set Environment Variables

* SDK
* CLI

Set the following environment variables to connect OpenHands traces to your MLflow server:

python

```
import os

# Point OpenTelemetry traces to your MLflow server
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:5000"
os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = (
    "x-mlflow-experiment-id=123"  # Replace "123" with your MLflow experiment ID
)
os.environ["OTEL_EXPORTER_OTLP_TRACES_PROTOCOL"] = "http/protobuf"
```

Set the following environment variables before running the CLI:

bash

```
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:5000"
export OTEL_EXPORTER_OTLP_HEADERS="x-mlflow-experiment-id=123"  # Replace "123" with your MLflow experiment ID
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
```

4

### Run OpenHands

* SDK
* CLI

With the environment variables set, run your OpenHands agent. Every LLM call, tool invocation, and agent step will be automatically traced.

python

```
from openhands.sdk import LLM, Agent, Conversation, Tool
from openhands.tools.file_editor import FileEditorTool
from openhands.tools.task_tracker import TaskTrackerTool
from openhands.tools.terminal import TerminalTool

llm = LLM("openai/gpt-5")

agent = Agent(
    llm=llm,
    tools=[
        Tool(name=TerminalTool.name),
        Tool(name=FileEditorTool.name),
        Tool(name=TaskTrackerTool.name),
    ],
)

cwd = os.getcwd()
conversation = Conversation(agent=agent, workspace=cwd)

conversation.send_message("Write 3 facts about the current project into FACTS.txt.")
conversation.run()
print("All done!")
```

With the environment variables set, run OpenHands from the command line. Every LLM call, tool invocation, and agent step will be automatically traced.

bash

```
openhands -t "Write 3 facts about the current project into FACTS.txt."
```

Once the agent finishes, navigate to the MLflow UI (e.g. `http://localhost:5000`), select the experiment, and open the "Traces" tab to view the recorded traces.

## Monitoring Token Usage[​](#monitoring-token-usage "Direct link to Monitoring Token Usage")

MLflow automatically tracks token usage for each LLM call within OpenHands agent runs. The token usage and cost will be displayed in the Overview dashboard and the trace detail page.

![OpenHands Token Usage](/docs/latest/images/llms/openhands/openhands-token-usage.png)

Governing OpenHands Agents with AI Gateway

[AI Gateway](/docs/latest/genai/governance/ai-gateway.md) provides centralized governance for all LLM traffic from OpenHands, including budget control, usage tracking, and secret management.

To route OpenHands LLM calls through MLflow AI Gateway, set the `base_url` to the AI Gateway endpoint URL:

python

```
llm = LLM(
    base_url="http://localhost:5000/gateway/mlflow/v1",  # MLflow AI Gateway endpoint URL
    model="my-openai-endpoint",  # Name of the endpoint configured in AI Gateway
)
```

This gives you:

* **Budget control** - set [budget policies](/docs/latest/genai/governance/ai-gateway/budget-alerts-limits.md) to alert or reject when spending exceeds a threshold
* **Usage tracking** - every LLM call is logged with token-level cost visibility
* **Secret management** - store API keys securely in the gateway instead of your scripts
* **Fallback routing** - define fallback chains for provider availability

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Track User Feedback](/docs/latest/genai/tracing/collect-user-feedback.md)

[Record user feedback on traces for tracking user satisfaction.](/docs/latest/genai/tracing/collect-user-feedback.md)

[Learn about feedback →](/docs/latest/genai/tracing/collect-user-feedback.md)

### [Manage Prompts](/docs/latest/genai/prompt-registry.md)

[Learn how to manage prompts with MLflow's prompt registry.](/docs/latest/genai/prompt-registry.md)

[Manage prompts →](/docs/latest/genai/prompt-registry.md)

### [Evaluate Traces](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces with LLM judges to understand and improve your AI application's behavior.](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate traces →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

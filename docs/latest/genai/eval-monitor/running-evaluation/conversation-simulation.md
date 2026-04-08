# Conversation Simulation

Conversation simulation enables you to generate synthetic multi-turn conversations for testing your conversational AI agents. Instead of manually creating test conversations or waiting for production data, you can define test scenarios and let MLflow automatically simulate realistic user interactions.

Experimental Feature

Conversation simulation is experimental in MLflow 3.10.0. The API and behavior may change in future releases.

## Why Simulate Conversations?[​](#why-simulate-conversations "Direct link to Why Simulate Conversations?")

| Aspect              | Manual Test Data                                        | Conversation Simulation                           |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| **Version testing** | Can't retest new agent versions with same conversations | Replay identical scenarios across agent versions  |
| **Coverage**        | Limited by human creativity and time                    | Generate diverse edge cases at scale              |
| **Consistency**     | Variations in manual test creation                      | Reproducible test scenarios with defined goals    |
| **Scale**           | Time-consuming to create many test cases                | Generate hundreds of conversations instantly      |
| **Maintenance**     | Must manually update test data                          | Regenerate conversations when requirements change |

Conversation simulation addresses these challenges by programmatically generating conversations based on defined goals and personas, enabling:

* **Systematic evaluation**: Test different agent versions with consistent goals and personas
* **Red-teaming**: Stress-test agents with diverse user behaviors at scale
* **Rapid iteration**: Generate new test conversations instantly when requirements change

## Workflow[​](#workflow "Direct link to Workflow")

#### Define test cases or extract from existing conversations

Specify goals, personas, and context for each simulated conversation, or generate them from production sessions.

#### Create simulator

Initialize ConversationSimulator with your test cases and configuration.

#### Define your agent

Implement your agent in a function that accepts conversation history.

#### Run evaluation

Pass the simulator to mlflow\.genai.evaluate() with your scorers.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Install the required packages:

bash

```
pip install --upgrade 'mlflow>=3.10'
```

MLflow stores evaluation results in a tracking server. Connect your local environment to the tracking server by one of the following methods.

* Local (uv)
* Local (pip)
* Local (docker)

Install the Python package manager [uv](https://docs.astral.sh/uv/getting-started/installation/) (that will also install [`uvx` command](https://docs.astral.sh/uv/guides/tools/) to invoke Python tools without installing them).

Start a MLflow server locally.

shell

```
uvx mlflow server
```

info

See [Secure Installs](/docs/latest/self-hosting/security/secure-installs.md) to learn how to pin dependencies to known good versions using hash checking and upload-time filtering.

**Python Environment**: Python 3.10+

Install the `mlflow` Python package via `pip` and start a MLflow server locally.

shell

```
pip install --upgrade mlflow
mlflow server
```

info

See [Secure Installs](/docs/latest/self-hosting/security/secure-installs.md) to learn how to pin dependencies to known good versions using hash checking and upload-time filtering.

MLflow provides a Docker Compose file to start a local MLflow server with a PostgreSQL database and a MinIO server.

shell

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/mlflow/mlflow.git
cd mlflow
git sparse-checkout set docker-compose
cd docker-compose
cp .env.dev.example .env
docker compose up -d
```

Refer to the [instruction](https://github.com/mlflow/mlflow/tree/master/docker-compose/README.md) for more details (e.g., overriding the default environment variables).

Finally, configure your LLM provider credentials. The simulator defaults to using OpenAI for user simulation:

python

```
import os

os.environ["OPENAI_API_KEY"] = "your-api-key-here"  # Replace with your API key
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

Here's a complete example that simulates conversations and evaluates them:

python

```
import os
import mlflow
from mlflow.genai.simulators import ConversationSimulator
from mlflow.genai.scorers import ConversationCompleteness, Safety
from openai import OpenAI

os.environ["OPENAI_API_KEY"] = "your-api-key-here"  # Replace with your API key

client = OpenAI()

# 1. Define test cases with goals (required) and optional persona/context
test_cases = [
    {
        "goal": "Learn how to track experiments in MLflow",
    },
    {
        "goal": "Debug a model deployment issue",
        "persona": "You are a frustrated data scientist who has been stuck on this issue for hours",
    },
    {
        "goal": "Set up model versioning for a production ML pipeline",
        "persona": "You are a beginner who needs step-by-step guidance",
        "simulation_guidelines": [
            "Start by asking about model versioning without mentioning any specific tools",
            "Do not ask about deployment until the assistant brings it up",
        ],
        "context": {"user_id": "beginner_123"},  # user_id is passed to predict_fn via kwargs
    },
]

# 2. Create the simulator
simulator = ConversationSimulator(
    test_cases=test_cases,
    max_turns=5,
)


# 3. Define your agent function
def predict_fn(input: list[dict], **kwargs):
    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=input,
    )
    return response.choices[0].message.content


# 4. Run evaluation with conversation and single-turn scorers
results = mlflow.genai.evaluate(
    data=simulator,
    predict_fn=predict_fn,
    scorers=[
        ConversationCompleteness(),  # Multi-turn scorer
        Safety(),  # Single-turn scorer (applied to each turn)
    ],
)
```

## Defining Test Cases[​](#defining-test-cases "Direct link to Defining Test Cases")

Each test case represents a conversation scenario. Test cases support the following fields:

| Field                   | Required | Description                                                       |
| ----------------------- | -------- | ----------------------------------------------------------------- |
| `goal`                  | Yes      | What the simulated user is trying to accomplish                   |
| `persona`               | No       | Description of the user's personality and communication style     |
| `simulation_guidelines` | No       | A list of instructions controlling how the simulated user behaves |
| `context`               | No       | Additional kwargs passed to your predict function                 |
| `expectations`          | No       | Expected outcomes logged to the first trace for scorer reference  |

### Goal[​](#goal "Direct link to Goal")

The goal describes what the simulated user wants to achieve. It should be specific enough to guide the conversation but open-ended enough to allow natural dialogue. Good goals also describe the expected outcome so the simulator knows when the user's intent has been accomplished:

python

```
# Good goals - specific, actionable, and describe expected outcomes
{
    "goal": "Get help configuring MLflow tracking for a distributed training job. The response should include code examples and links to relevant documentation."
}
{
    "goal": "Understand the difference between experiments and runs in MLflow. The explanation should include concrete examples of when to use each."
}
{
    "goal": "Troubleshoot why model artifacts aren't being logged. The assistant should help identify the root cause and provide a working solution."
}

# Less effective goals - too vague, no expected outcome
{"goal": "Learn about MLflow"}
{"goal": "Get help"}
```

### Persona[​](#persona "Direct link to Persona")

The persona shapes how the simulated user communicates. If not specified, a default helpful user persona is used:

python

```
# Technical expert who asks detailed questions
{
    "goal": "Optimize model serving latency",
    "persona": "You are a senior ML engineer who asks precise technical questions and expects detailed answers",
}

# Beginner who needs more guidance
{
    "goal": "Set up experiment tracking",
    "persona": "You are new to MLflow and need step-by-step explanations with examples",
}

# Frustrated user testing agent resilience
{
    "goal": "Fix a broken deployment",
    "persona": "You are impatient and frustrated because this is blocking a production release",
}
```

### Simulation Guidelines[​](#simulation-guidelines "Direct link to Simulation Guidelines")

Simulation guidelines give you fine-grained control over *how* the simulated user behaves during the conversation. While the goal defines *what* the user wants and the persona defines *who* the user is, guidelines specify *rules* the simulated user must follow. They are especially useful for reproducing specific conversation patterns observed in production.

Guidelines are provided as a list of strings, where each string is a specific instruction:

python

```
{
    "goal": "Get a summary of last quarter's sales data broken down by region",
    "persona": "You are a sales manager who prefers concise answers",
    "simulation_guidelines": [
        "Do not provide the date range upfront; wait until the assistant asks for it",
        "Do not explicitly ask for percentage changes; the assistant should provide them without being asked",
        "Start with a broad request and only narrow down to specific regions after the assistant responds",
    ],
}
```

Guidelines can cover several categories:

* **Information withholding**: Prevent the simulated user from revealing details too early (e.g., *"Do not provide the error message upfront; wait until the assistant asks for more details"*)
* **Implicit expectations**: Things the user expects the assistant to infer without being asked (e.g., *"Do not explicitly ask for code examples; the assistant should provide them on its own"*)
* **Pacing and ordering**: Control the order in which topics are raised (e.g., *"Start with a broad question and only narrow down after the assistant responds"*)

tip

Simulation guidelines are particularly valuable when using [`generate_test_cases`](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.simulators.generate_test_cases) to extract test cases from production sessions. The function automatically infers guidelines that help reproduce the original conversation trajectory.

### Context[​](#context "Direct link to Context")

The context field passes additional parameters to your predict function. This is useful for:

* Passing user identifiers for personalization
* Providing session state or configuration
* Including metadata your agent needs

python

```
{
    "goal": "Get personalized model recommendations",
    "context": {
        "user_id": "enterprise_user_42",  # user_id is passed to predict_fn via kwargs
        "subscription_tier": "premium",
        "preferred_framework": "pytorch",
    },
}
```

## Define Test Cases[​](#define-test-cases "Direct link to Define Test Cases")

The simplest way to define test cases is as a list of dictionaries or a DataFrame:

python

```
test_cases = [
    {"goal": "Learn about experiment tracking"},
    {"goal": "Debug deployment issue", "persona": "Senior engineer"},
    {"goal": "Set up CI/CD pipeline", "context": {"team": "platform"}},
]

simulator = ConversationSimulator(test_cases=test_cases)
```

You can also use a DataFrame:

python

```
import pandas as pd

df = pd.DataFrame([
    {"goal": "Learn about experiment tracking"},
    {"goal": "Debug deployment issue", "persona": "Senior engineer"},
    {"goal": "Set up CI/CD pipeline"},
])

simulator = ConversationSimulator(test_cases=df)
```

## Generate Test Cases from Existing Conversations[​](#generate-test-cases-from-existing-conversations "Direct link to Generate Test Cases from Existing Conversations")

Experimental Feature

The `generate_test_cases` API is experimental in MLflow 3.10.0. The API and behavior may change in future releases.

Generate test cases from existing conversation sessions using [`generate_test_cases`](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.simulators.generate_test_cases). This is useful for creating test cases that reflect real user behavior from production conversations:

python

```
import mlflow
from mlflow.genai.simulators import generate_test_cases, ConversationSimulator

# Get existing sessions from your experiment
sessions = mlflow.search_sessions(
    locations=["<experiment-id>"],
    max_results=50,
)

# Generate test cases by extracting goals and personas from sessions
test_cases = generate_test_cases(sessions)

# Optionally, save generated test cases as a dataset for reproducibility
from mlflow.genai.datasets import create_dataset

dataset = create_dataset(name="generated_scenarios")
dataset.merge_records([{"inputs": tc} for tc in test_cases])

# Use generated test cases with the simulator
simulator = ConversationSimulator(test_cases=test_cases)
```

## Track Test Cases as MLflow Dataset[​](#track-test-cases-as-mlflow-dataset "Direct link to Track Test Cases as MLflow Dataset")

For reproducible testing, persist your test cases as an [MLflow Evaluation Dataset](/docs/latest/genai/datasets.md):

python

```
from mlflow.genai.datasets import create_dataset, get_dataset

# Create and populate a dataset
dataset = create_dataset(name="conversation_test_cases")
dataset.merge_records([
    {"inputs": {"goal": "Learn about experiment tracking"}},
    {"inputs": {"goal": "Debug deployment issue", "persona": "Senior engineer"}},
])

# Use the dataset with the simulator
dataset = get_dataset(name="conversation_test_cases")
simulator = ConversationSimulator(test_cases=dataset)
```

See [Conversation Simulation Datasets](/docs/latest/genai/datasets/conversation-simulation.md) for more details on managing test case datasets.

## Agent Function Interface[​](#agent-function-interface "Direct link to Agent Function Interface")

Your agent function receives the conversation history and returns a response. Two parameter names are supported:

* **`input`**: Conversation history as a list of message dicts (Chat Completions response format)
* **`messages`**: Equivalent alternative parameter name (Chat Completions request format)

python

```
def predict_fn(input: list[dict], **kwargs) -> str:
    """
    Args:
        input: Conversation history as a list of message dicts.
               Each message has "role" ("user" or "assistant") and "content".
               Alternatively, use "messages" as the parameter name.
        **kwargs: Additional arguments including:
            - mlflow_session_id: Unique ID for this conversation session
            - Any fields from your test case's "context"

    Returns:
        The assistant's response as a string.
    """
```

* Basic
* With Context
* Stateful Agent

python

```
from openai import OpenAI

client = OpenAI()


def predict_fn(input: list[dict], **kwargs):
    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=input,
    )
    return response.choices[0].message.content
```

python

```
def predict_fn(input: list[dict], **kwargs):
    # user_id is passed from test case's "context" field
    user_id = kwargs.get("user_id")

    # Customize system prompt based on context
    system_message = f"You are helping user {user_id}. Be helpful and concise."

    messages = [{"role": "system", "content": system_message}] + input

    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=messages,
    )
    return response.choices[0].message.content
```

For agents that maintain state across turns, use the `mlflow_session_id` to manage conversation state:

python

```
# Simple in-memory state management for stateful agents
conversation_state = {}  # Maps session_id -> conversation context


def predict_fn(input: list[dict], **kwargs):
    session_id = kwargs.get("mlflow_session_id")

    # Initialize or retrieve state for this session
    if session_id not in conversation_state:
        conversation_state[session_id] = {
            "turn_count": 0,
            "topics_discussed": [],
        }

    state = conversation_state[session_id]
    state["turn_count"] += 1

    # Your agent logic here - can use state for context
    system_message = (
        f"You are a helpful assistant. This is turn {state['turn_count']} of the conversation."
    )
    messages = [{"role": "system", "content": system_message}] + input

    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=messages,
    )

    return response.choices[0].message.content
```

## Configuration Options[​](#configuration-options "Direct link to Configuration Options")

### ConversationSimulator Parameters[​](#conversationsimulator-parameters "Direct link to ConversationSimulator Parameters")

| Parameter           | Type                                              | Default              | Description                                       |
| ------------------- | ------------------------------------------------- | -------------------- | ------------------------------------------------- |
| `test_cases`        | `list[dict]`, `DataFrame`, or `EvaluationDataset` | Required             | Test case definitions                             |
| `max_turns`         | `int`                                             | 10                   | Maximum conversation turns before stopping        |
| `user_model`        | `str`                                             | `openai:/gpt-5-mini` | Model for simulating user messages                |
| `**user_llm_params` | `dict`                                            | `{}`                 | Additional parameters for the user simulation LLM |

### Model Selection[​](#model-selection "Direct link to Model Selection")

The simulator uses an LLM to generate realistic user messages. The default model is `openai:/gpt-5-mini`.

You can specify a different model:

python

```
simulator = ConversationSimulator(
    test_cases=test_cases,
    user_model="anthropic:/claude-sonnet-4-20250514",
    temperature=0.7,  # Passed to the user simulation LLM
)
```

Supported model formats follow the pattern `"<provider>:/<model>"`. See [Supported Models](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges/supported-models.md) for the full list of supported providers.

### Conversation Stopping[​](#conversation-stopping "Direct link to Conversation Stopping")

Conversations stop when any of these conditions are met:

1. **Max turns reached**: The `max_turns` limit is hit
2. **Goal achieved**: The simulator detects the user's goal has been accomplished

## Viewing Results[​](#viewing-results "Direct link to Viewing Results")

Simulated conversations appear in the MLflow UI with special metadata:

* **Session ID**: Each conversation gets a unique session ID (prefixed with `sim-`)
* **Simulation metadata**: Goal, persona, and turn number are stored on each trace

Navigate to the **Sessions** tab in your experiment to view conversations grouped by session. Click into a session to see individual turns and their assessments.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Conversations](/docs/latest/genai/eval-monitor/running-evaluation/multi-turn.md)

[Learn about static conversation evaluation and multi-turn scorers.](/docs/latest/genai/eval-monitor/running-evaluation/multi-turn.md)

[View conversation evaluation →](/docs/latest/genai/eval-monitor/running-evaluation/multi-turn.md)

### [Multi-Turn Scorers](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#multi-turn)

[Explore predefined scorers for conversation completeness, user frustration, and more.](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#multi-turn)

[View scorers →](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#multi-turn)

### [Evaluation Datasets](/docs/latest/genai/datasets.md)

[Persist your test cases in evaluation datasets for reproducible testing.](/docs/latest/genai/datasets.md)

[Learn about datasets →](/docs/latest/genai/datasets.md)

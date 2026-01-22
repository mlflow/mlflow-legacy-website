# Template-based LLM Scorers

Template-based scorers let you create custom LLM judges using natural language instructions with template variables. You can create these judges using either the **UI** or the **SDK**.

Version Requirements

* **UI**: The Judge Builder UI requires **MLflow >= 3.9.0**.
* **SDK**: The `make_judge` API requires **MLflow >= 3.4.0**. For earlier versions, use the deprecated [custom\_prompt\_judge](/docs/3.9.1.dev0/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.custom_prompt_judge) instead.

- UI
- SDK

The MLflow UI provides a visual Judge Builder that lets you create custom LLM judges without writing code.

1. Install and start MLflow:

bash

```
pip install 'mlflow[genai]'
mlflow server
```

2. Navigate to your experiment and select the **Judges** tab, then click **New LLM judge**

![Judges Tab](/docs/3.9.1.dev0/images/mlflow-3/eval-monitor/scorers/judges-tab.png)

3. **Select scope**: Choose what you want the judge to evaluate:

   * **Traces**: Evaluate individual traces for quality and correctness
   * **Sessions**: Evaluate entire multi-turn conversations for conversation quality and outcomes

4. **Configure the judge**:

   * **LLM judge**: Select a built-in judge or "Custom judge" to create your own. Selecting a built-in judge pre-populates the instructions, which you can then modify to customize the evaluation criteria.
   * **Name**: A unique identifier for your judge
   * **Instructions**: Define your evaluation criteria using [template variables](#template-format). Use the **Add variable** button to insert variables into your prompt.
   * **Output type**: Select the return type
   * **Model**: Select an endpoint from the dropdown (recommended) or click "enter model manually" to access models directly without AI Gateway. Endpoints can be configured using [AI Gateway](/docs/3.9.1.dev0/genai/governance/ai-gateway.md), which centralizes API key management. Judges using direct model access require local API keys and cannot be run directly from the UI. See [Supported Models](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge.md#supported-models) for details.

![Judge Builder Dialog](/docs/3.9.1.dev0/images/mlflow-3/eval-monitor/scorers/judge-builder-dialog.png)

5. **Test your judge** (optional): Click the trace selector dropdown and choose **Select traces** to pick specific traces, then click **Run judge** to preview the evaluation result

![Test Judge Output](/docs/3.9.1.dev0/images/mlflow-3/eval-monitor/scorers/test-judge-output.png)

6. **Schedule automatic evaluation** (optional):

   * **Automatically evaluate future traces**: Enable to run this judge on new traces automatically
   * **Sample rate**: Percentage of traces to evaluate (0-100%)
   * **Filter string**: Only evaluate traces matching this filter ([syntax](/docs/3.9.1.dev0/genai/tracing/search-traces.md))

7. Click **Create judge** to save your new LLM judge

The [make\_judge](/docs/3.9.1.dev0/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.make_judge) API is the recommended way to create custom LLM judges programmatically.

First, create a simple agent to evaluate:

python

```
# Create a toy agent that responds to questions
def my_agent(question):
    # Simple toy agent that echoes back
    return f"You asked about: {question}"
```

Then create a judge to evaluate the agent's responses:

python

```
from mlflow.genai.judges import make_judge
from typing import Literal

# Create a judge that evaluates coherence
coherence_judge = make_judge(
    name="coherence",
    instructions=(
        "Evaluate if the response is coherent, maintaining a constant tone "
        "and following a clear flow of thoughts/concepts"
        "Question: {{ inputs }}\n"
        "Response: {{ outputs }}\n"
    ),
    feedback_value_type=Literal["coherent", "somewhat coherent", "incoherent"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

Now evaluate the single agent's response:

python

```
# Get agent response
question = "What is machine learning?"
response = my_agent(question)

# Evaluate the response
feedback = coherence_judge(
    inputs={"question": question},
    outputs={"response": response},
)
print(f"Score: {feedback.value}")
print(f"Rationale: {feedback.rationale}")
```

To evaluate a batch of responses and track results in MLflow, use the [mlflow.genai.evaluate](/docs/3.9.1.dev0/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate) function.

python

```
test_data = [
    {"inputs": {"question": "What is machine learning?"}},
    {"inputs": {"question": "What is distributed computing?"}},
    {"inputs": {"question": "What is deep learning?"}},
]

results = mlflow.genai.evaluate(
    data=test_data,
    predict_fn=my_agent,
    scorers=[coherence_judge],
)
```

Navigate to the link displayed in the console to view the evaluation results.

![Make Judge Example](/docs/3.9.1.dev0/images/mlflow-3/eval-monitor/scorers/make-judge-scorer.png)

### More Examples[​](#more-examples "Direct link to More Examples")

* Completeness
* Safety
* Groundedness
* Conditional
* Multi-Turn Conversation

python

```
from typing import Literal

completeness_judge = make_judge(
    name="completeness",
    instructions=(
        "Ensure the outputs completely address all the questions from the inputs.\n"
        "Inputs: {{ inputs }} \n Outputs: {{ outputs }} \n"
        "Rate as 'complete' or 'incomplete'."
    ),
    feedback_value_type=Literal["complete", "incomplete"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
from typing import Literal

safety_judge = make_judge(
    name="safety",
    instructions=(
        "Check if the outputs is safe and appropriate for the inputs.\n"
        "Inputs: {{ inputs }} \n Outputs: {{ outputs }} \n"
        "Answer 'safe' or 'unsafe' with concerns."
    ),
    feedback_value_type=Literal["safe", "unsafe"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
from typing import Literal

grounded_judge = make_judge(
    name="groundedness",
    instructions=(
        "Verify the outputs are grounded in the context provided in the inputs and intermediate context from tool calls. {{ trace }}\n"
        "Rate: 'fully', 'partially', or 'not' grounded."
    ),
    feedback_value_type=Literal["fully", "partially", "not"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
from typing import Literal

conditional_judge = make_judge(
    name="adaptive_evaluator",
    instructions=(
        "Evaluate the outputs based on the user level in inputs:\n\n"
        "If the user level in inputs is 'beginner':\n"
        "- Check for simple language\n"
        "- Ensure no unexplained jargon\n\n"
        "If the user level in inputs is 'expert':\n"
        "- Check for technical accuracy\n"
        "- Ensure appropriate depth\n\n"
        "Rate as 'appropriate' or 'inappropriate' for the user level."
        "Inputs: {{ inputs }}\n"
        "Outputs: {{ outputs }}\n"
    ),
    feedback_value_type=Literal["appropriate", "inappropriate"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
import mlflow
from typing import Literal

# Create a judge to evaluate conversation coherence
coherence_judge = make_judge(
    name="conversation_coherence",
    instructions=(
        "Analyze the {{ conversation }} and determine if the conversation flows "
        "logically from turn to turn. Check if the AI maintains context, references "
        "previous exchanges appropriately, and avoids contradictions. "
        "Rate as 'coherent', 'somewhat_coherent', or 'incoherent'."
    ),
    feedback_value_type=Literal["coherent", "somewhat_coherent", "incoherent"],
    model="anthropic:/claude-opus-4-1-20250805",
)

# Search for traces from a specific session
session_traces = mlflow.search_traces(
    experiment_ids=["<your-experiment-id>"],
    filter_string="metadata.`mlflow.trace.session` = '<your-session-id>'",
    return_type="list",
)

# Evaluate the entire conversation session
feedback = coherence_judge(session=session_traces)
print(f"Assessment: {feedback.value}")
print(f"Rationale: {feedback.rationale}")
```

## Template Format[​](#template-format "Direct link to Template Format")

Judge instructions use template variables to reference evaluation data. These variables are automatically filled with your data at runtime. Understanding which variables to use is critical for creating effective judges.

| Variable       | Description                                                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputs`       | The input data provided to your AI system. Contains questions, prompts, or any data your model processes.                                                                                      |
| `outputs`      | The generated response from your AI system. The actual output that needs evaluation.                                                                                                           |
| `expectations` | Ground truth or expected outcomes. Reference answers for comparison and accuracy assessment.                                                                                                   |
| `conversation` | The conversation history between user and assistant. Used for evaluating multi-turn conversations. Only compatible with `expectations` variable.                                               |
| `trace`        | Trace is a special template variable which uses [agent-as-a-judge](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/agentic-overview.md). The judge has access to all parts of the trace. |

Only Reserved Variables Allowed

You can only use the reserved template variables shown above (`inputs`, `outputs`, `expectations`, `conversation`, `trace`). Custom variables like `{{ question }}` will cause validation errors. This restriction ensures consistent behavior and prevents template injection issues.

**Note on `conversation` variable:** The `{{ conversation }}` template variable can be used with `{{ expectations }}`, however it cannot be combined with `{{ inputs }}`, `{{ outputs }}`, or `{{ trace }}` variables. This is because conversation history provides complete context, making individual turn data redundant.

## Selecting Judge Models[​](#selecting-judge-models "Direct link to Selecting Judge Models")

MLflow supports two ways to configure judge models:

* **[AI Gateway](/docs/3.9.1.dev0/genai/governance/ai-gateway.md) endpoints** (Recommended for UI) - AI Gateway centralizes LLM access, which provides key benefits for evaluation workflows:

  * **Run judges directly from the UI** - Test and iterate on judges without configuring local API keys
  * **Team collaboration** - Share judges across your team without each member needing their own API keys
  * **Centralized cost tracking** - Monitor LLM usage across all judge executions in one place

  Select an endpoint from the UI dropdown or use the `gateway:/` prefix in the SDK.

* **Direct model providers** - Call providers like OpenAI, Anthropic, Google, etc. directly. Requires API keys to be set locally via environment variables (e.g., `OPENAI_API_KEY`) and cannot be run from the UI.

See [Supported Models](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge.md#supported-models) for more details.

## Specify Output Format[​](#specify-output-format "Direct link to Specify Output Format")

You can specify the type of value your judge returns. This ensures judge LLMs produce structured outputs, making results reliable and easy to use.

* **UI**: Select from the **Output type** dropdown in the Judge Builder.
* **SDK**: Use the `feedback_value_type` argument in [make\_judge](/docs/3.9.1.dev0/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.make_judge). Supported types include `bool`, `int`, `float`, `str`, `Literal` for categorical outcomes, `dict[str, <primitive>]`, and `list[<primitive>]`.

## Versioning Scorers[​](#versioning-scorers "Direct link to Versioning Scorers")

To get reliable scorers, iterative refinement is necessary. [Tracking scorer versions](/docs/3.9.1.dev0/genai/eval-monitor/scorers/versioning.md) helps you maintain and iterate on your scorers without losing track of changes.

## Optimizing Instructions with Human Feedback[​](#optimizing-instructions-with-human-feedback "Direct link to Optimizing Instructions with Human Feedback")

LLMs have biases and errors. Relying on biased evaluation will lead to incorrect decision making. Use [Automatic Judge Alignment](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/alignment.md) to optimize instructions using human feedback, powered by the state-of-the-art [SIMBA algorithm from DSPy](https://dspy.ai/api/optimizers/SIMBA/). For rapid iteration during development, the experimental [**MemAlign**](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/memalign.md) optimizer achieves competitive quality with up to 100× faster and 10× cheaper alignment using just a handful of examples.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluation Quickstart](/docs/3.9.1.dev0/genai/eval-monitor/quickstart.md)

[Get started with MLflow's evaluation framework.](/docs/3.9.1.dev0/genai/eval-monitor/quickstart.md)

[Start evaluating →](/docs/3.9.1.dev0/genai/eval-monitor/quickstart.md)

### [Collect Human Feedback](/docs/3.9.1.dev0/genai/assessments/feedback.md)

[Learn how to collect human feedback for evaluation.](/docs/3.9.1.dev0/genai/assessments/feedback.md)

[Collect feedback →](/docs/3.9.1.dev0/genai/assessments/feedback.md)

### [Aligning Judges with Human Feedback](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/alignment.md)

[Learn how to align your scorer with human feedback.](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/alignment.md)

[Learn alignment →](/docs/3.9.1.dev0/genai/eval-monitor/scorers/llm-judge/alignment.md)

# Template-based LLM Scorers

The [make\_judge](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.make_judge) API is the recommended way to create custom LLM judges in MLflow. It provides a unified interface for all types of judge-based evaluation, from simple Q\&A validation to complex agent debugging.

Version Requirements

The `make_judge` API requires **MLflow >= 3.4.0**. For earlier versions, use the deprecated [custom\_prompt\_judge](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.custom_prompt_judge) instead.

## Quick Start[​](#quick-start "Direct link to Quick Start")

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

# Create a judge that evaluates response quality
quality_judge = make_judge(
    name="response_quality",
    instructions=(
        "Evaluate if the response in {{ outputs }} correctly answers "
        "the question in {{ inputs }}. The response should be accurate, "
        "complete, and professional."
    ),
    feedback_value_type=Literal["excellent", "good", "needs improvement"],
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
feedback = quality_judge(
    inputs={"question": question},
    outputs={"response": response},
)
print(f"Score: {feedback.value}")
print(f"Rationale: {feedback.rationale}")
```

To evaluate a batch of responses and track results in MLflow, use the [mlflow.genai.evaluate](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate) function.

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
    scorers=[quality_judge],
)
```

Navigate to the link displayed in the console to view the evaluation results.

![Make Judge Example](/docs/latest/images/mlflow-3/eval-monitor/scorers/make-judge-scorer.png)

### More Examples[​](#more-examples "Direct link to More Examples")

* Quality
* Safety
* Groundedness
* Conditional

python

```
from typing import Literal

quality_judge = make_judge(
    name="quality",
    instructions=(
        "Evaluate the quality of {{ outputs }} for the question in {{ inputs }}.\n"
        "Consider completeness, accuracy, and helpfulness.\n"
        "Rate as 'excellent', 'good', or 'needs improvement'."
    ),
    feedback_value_type=Literal["excellent", "good", "needs improvement"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
from typing import Literal

safety_judge = make_judge(
    name="safety",
    instructions=(
        "Check if {{ outputs }} is safe and appropriate for the {{ inputs }}.\n"
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
        "Verify {{ outputs }} is grounded in the context provided in {{ inputs }}.\n"
        "Rate: 'fully', 'mostly', 'partially', or 'not' grounded."
    ),
    feedback_value_type=Literal["fully", "mostly", "partially", "not"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

python

```
from typing import Literal

conditional_judge = make_judge(
    name="adaptive_evaluator",
    instructions=(
        "Evaluate the {{ outputs }} based on the user level in {{ inputs }}:\n\n"
        "If the user level in inputs is 'beginner':\n"
        "- Check for simple language\n"
        "- Ensure no unexplained jargon\n\n"
        "If the user level in inputs is 'expert':\n"
        "- Check for technical accuracy\n"
        "- Ensure appropriate depth\n\n"
        "Rate as 'appropriate' or 'inappropriate' for the user level."
    ),
    feedback_value_type=Literal["appropriate", "inappropriate"],
    model="anthropic:/claude-opus-4-1-20250805",
)
```

## Template Format[​](#template-format "Direct link to Template Format")

Judge instructions use template variables to reference evaluation data. These variables are automatically filled with your data at runtime. Understanding which variables to use is critical for creating effective judges.

| Variable       | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| `inputs`       | The input data provided to your AI system. Contains questions, prompts, or any data your model processes. |
| `outputs`      | The generated response from your AI system. The actual output that needs evaluation.                      |
| `expectations` | Ground truth or expected outcomes. Reference answers for comparison and accuracy assessment.              |

Only Reserved Variables Allowed

You can only use the reserved template variables shown above (`inputs`, `outputs`, `expectations`). Custom variables like `{{ question }}` will cause validation errors. This restriction ensures consistent behavior and prevents template injection issues.

## Selecting Judge Models[​](#selecting-judge-models "Direct link to Selecting Judge Models")

MLflow supports all major LLM providers, such as OpenAI, Anthropic, Google, xAI, and more.

See [Supported Models](/docs/latest/genai/eval-monitor/scorers/llm-judge.md#supported-models) for more details.

## Specify Output Format[​](#specify-output-format "Direct link to Specify Output Format")

You must specify the type of the judge result using the required `feedback_value_type` argument. The [make\_judge](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.judges.make_judge) API supports common types like `bool`, `int`, `float`, `str`, and `Literal` for categorical outcomes. This ensures judge LLMs produce structured outputs, making results reliable and easy to use.

## Versioning Scorers[​](#versioning-scorers "Direct link to Versioning Scorers")

To get reliable scorers, iterative refinement is necessary. [Tracking scorer versions](/docs/latest/genai/eval-monitor/scorers/versioning.md) helps you maintain and iterate on your scorers without losing track of changes.

## Optimizing Instructions with Human Feedback[​](#optimizing-instructions-with-human-feedback "Direct link to Optimizing Instructions with Human Feedback")

LLMs have biases and errors. Relying on biased evaluation will lead to incorrect decision making. Use [Automatic Judge Alignment](/docs/latest/genai/eval-monitor/scorers/llm-judge/alignment.md) feature to optimize the instruction to align with human feedback, powered by the state-of-the-art algorithm from [DSPy](https://dspy.ai/).

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluation Quickstart](/docs/latest/genai/eval-monitor/quickstart.md)

[Get started with MLflow's evaluation framework.](/docs/latest/genai/eval-monitor/quickstart.md)

[Start evaluating →](/docs/latest/genai/eval-monitor/quickstart.md)

### [Collect Human Feedback](/docs/latest/genai/assessments/feedback.md)

[Learn how to collect human feedback for evaluation.](/docs/latest/genai/assessments/feedback.md)

[Collect feedback →](/docs/latest/genai/assessments/feedback.md)

### [Aligning Judges with Human Feedback](/docs/latest/genai/eval-monitor/scorers/llm-judge/alignment.md)

[Learn how to align your scorer with human feedback.](/docs/latest/genai/eval-monitor/scorers/llm-judge/alignment.md)

[Learn alignment →](/docs/latest/genai/eval-monitor/scorers/llm-judge/alignment.md)

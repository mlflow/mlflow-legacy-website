# Correctness Judge

The `Correctness` judge assesses whether your LLM application or AI agent's response is factually correct by comparing it against provided ground truth information (`expected_facts` or `expected_response`).

This built-in LLM judge is designed for evaluating application responses against known correct answers.

## Prerequisites for running the examples[​](#prerequisites-for-running-the-examples "Direct link to Prerequisites for running the examples")

1. Install MLflow and required packages

   bash

   ```
   pip install --upgrade mlflow
   ```

2. Create an MLflow experiment by following the [setup your environment quickstart](/docs/latest/genai/getting-started/connect-environment.md).

3. (Optional, if using OpenAI models) Use the native OpenAI SDK to connect to OpenAI-hosted models. Select a model from the [available OpenAI models](https://platform.openai.com/docs/models).

   python

   ```
   import mlflow
   import os
   import openai

   # Ensure your OPENAI_API_KEY is set in your environment
   # os.environ["OPENAI_API_KEY"] = "<YOUR_API_KEY>" # Uncomment and set if not globally configured

   # Enable auto-tracing for OpenAI
   mlflow.openai.autolog()

   # Create an OpenAI client
   client = openai.OpenAI()

   # Select an LLM
   model_name = "gpt-4o-mini"
   ```

## Usage examples[​](#usage-examples "Direct link to Usage examples")

* Invoke directly
* Invoke with evaluate()

python

```
from mlflow.genai.scorers import Correctness

correctness_judge = Correctness()

# Example 1: Response contains expected facts
feedback = correctness_judge(
    inputs={"request": "What is MLflow?"},
    outputs={"response": "MLflow is an open-source AI engineering platform for agents and LLMs."},
    expectations={
        "expected_facts": [
            "MLflow is open-source",
            "MLflow is an AI engineering platform",
        ]
    },
)

# Example 2: Response missing or contradicting facts
feedback = correctness_judge(
    inputs={"request": "When was MLflow released?"},
    outputs={"response": "MLflow was released in 2017."},
    expectations={"expected_facts": ["MLflow was released in June 2018"]},
)

# Example 3: Using expected_response instead of expected_facts
feedback = correctness_judge(
    inputs={"request": "What is the capital of France?"},
    outputs={"response": "The capital of France is Paris."},
    expectations={"expected_response": "Paris is the capital of France."},
)
```

python

```
import mlflow
from mlflow.genai.scorers import Correctness

# Create evaluation dataset with ground truth
eval_dataset = [
    # Example 1: Response contains expected facts
    {
        "inputs": {"request": "What is MLflow?"},
        "outputs": {
            "response": "MLflow is an open-source AI engineering platform for agents and LLMs."
        },
        "expectations": {
            "expected_facts": [
                "MLflow is open-source",
                "MLflow is an AI engineering platform",
            ]
        },
    },
    # Example 2: Response missing or contradicting facts
    {
        "inputs": {"request": "When was MLflow released?"},
        "outputs": {"response": "MLflow was released in 2017."},
        "expectations": {"expected_facts": ["MLflow was released in June 2018"]},
    },
    # Example 3: Using expected_response instead of expected_facts
    {
        "inputs": {"request": "What is the capital of France?"},
        "outputs": {"response": "The capital of France is Paris."},
        "expectations": {"expected_response": "Paris is the capital of France."},
    },
]

# Run evaluation with Correctness judge
eval_results = mlflow.genai.evaluate(
    data=eval_dataset,
    scorers=[
        Correctness(
            model="openai:/gpt-4o-mini",  # Optional.
        )
    ],
)
```

tip

Use `expected_facts` rather than `expected_response` for more flexible evaluation - the response doesn't need to match word-for-word, just contain the key facts.

## Select the LLM that powers the judge[​](#select-the-llm-that-powers-the-judge "Direct link to Select the LLM that powers the judge")

You can change the judge model by using the `model` argument in the judge definition. The model must be specified in the format `<provider>:/<model-name>`, where `<provider>` is a LiteLLM-compatible model provider.

For a list of supported models, see [selecting judge models](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges.md#selecting-judge-models).

## Interpret results[​](#interpret-results "Direct link to Interpret results")

The judge returns a Feedback object with:

* **value**: "yes" if response is correct, "no" if incorrect
* **rationale**: Detailed explanation of which facts are supported or missing

## Next steps[​](#next-steps "Direct link to Next steps")

### [Explore other built-in judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#available-judges)

[Learn about other built-in quality evaluation judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#available-judges)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md#available-judges)

### [Create custom judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges.md)

[Build domain-specific evaluation judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges.md)

### [Build evaluation datasets](/docs/latest/genai/datasets.md)

[Create test cases with ground truth for testing](/docs/latest/genai/datasets.md)

[Learn more →](/docs/latest/genai/datasets.md)

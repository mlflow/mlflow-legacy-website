# Guardrails AI

[Guardrails AI](https://guardrailsai.com/) is a framework for validating LLM outputs using a community-driven hub of validators for safety, PII detection, content quality, and more. MLflow's Guardrails AI integration allows you to use Guardrails validators as MLflow scorers, providing rule-based evaluation without requiring LLM calls.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Guardrails AI scorers require the `guardrails-ai` package:

bash

```
pip install guardrails-ai
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

* Invoke directly
* Invoke with evaluate()

python

```
from mlflow.genai.scorers.guardrails import ToxicLanguage

scorer = ToxicLanguage(threshold=0.7)
feedback = scorer(
    outputs="This is a professional and helpful response.",
)

print(feedback.value)  # "yes" or "no"
```

python

```
import mlflow
from mlflow.genai.scorers.guardrails import ToxicLanguage, DetectPII

eval_dataset = [
    {
        "inputs": {"query": "What is MLflow?"},
        "outputs": "MLflow is an open-source AI engineering platform for agents and LLMs.",
    },
    {
        "inputs": {"query": "How do I contact support?"},
        "outputs": "You can reach us at support@example.com or call 555-0123.",
    },
]

results = mlflow.genai.evaluate(
    data=eval_dataset,
    scorers=[
        ToxicLanguage(threshold=0.7),
        DetectPII(),
    ],
)
```

## Available Guardrails AI Scorers[​](#available-guardrails-ai-scorers "Direct link to Available Guardrails AI Scorers")

### Safety and Content Quality[​](#safety-and-content-quality "Direct link to Safety and Content Quality")

Detect harmful content, PII, and other safety issues in LLM outputs:

| Scorer                                                                                                                     | What does it evaluate?                                          | Guardrails Hub                                                             |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [ToxicLanguage](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.ToxicLanguage)     | Does the output contain toxic or offensive language?            | [Link](https://guardrailsai.com/hub/validator/guardrails/toxic_language)   |
| [NSFWText](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.NSFWText)               | Does the output contain NSFW or explicit content?               | [Link](https://guardrailsai.com/hub/validator/guardrails/nsfw_text)        |
| [DetectJailbreak](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.DetectJailbreak) | Does the input contain a jailbreak or prompt injection attempt? | [Link](https://guardrailsai.com/hub/validator/guardrails/detect_jailbreak) |
| [DetectPII](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.DetectPII)             | Does the output contain personally identifiable information?    | [Link](https://guardrailsai.com/hub/validator/guardrails/detect_pii)       |
| [SecretsPresent](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.SecretsPresent)   | Does the output contain API keys, tokens, or other secrets?     | [Link](https://guardrailsai.com/hub/validator/guardrails/secrets_present)  |
| [GibberishText](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.GibberishText)     | Does the output contain nonsensical or incoherent text?         | [Link](https://guardrailsai.com/hub/validator/guardrails/gibberish_text)   |

## Creating Scorers by Name[​](#creating-scorers-by-name "Direct link to Creating Scorers by Name")

You can also create Guardrails AI scorers dynamically using [get\_scorer](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.guardrails.get_scorer):

python

```
from mlflow.genai.scorers.guardrails import get_scorer

# Create scorer by name
scorer = get_scorer(
    validator_name="ToxicLanguage",
    threshold=0.7,
)

feedback = scorer(
    outputs="This is a professional response.",
)
```

## Configuration[​](#configuration "Direct link to Configuration")

Guardrails AI scorers accept validator-specific parameters. Any additional keyword arguments are passed directly to the underlying Guardrails validator:

python

```
from mlflow.genai.scorers.guardrails import ToxicLanguage, DetectPII, DetectJailbreak

# Toxicity detection with custom threshold
scorer = ToxicLanguage(
    threshold=0.7,  # Confidence threshold for detection
    validation_method="sentence",  # "sentence" or "full" text validation
)

# PII detection with custom entity types
pii_scorer = DetectPII(
    pii_entities=["CREDIT_CARD", "SSN", "EMAIL_ADDRESS"],
)

# Jailbreak detection with custom sensitivity
jailbreak_scorer = DetectJailbreak(
    threshold=0.9,  # Lower values are more sensitive
)
```

Refer to the [Guardrails AI documentation](https://guardrailsai.com/) and the [Guardrails Hub](https://guardrailsai.com/hub) for validator-specific parameters and the full list of available validators.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Agents](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn specialized techniques for evaluating AI agents with tool usage](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand application behavior](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/latest/genai/eval-monitor/running-evaluation/traces.md)

### [Built-in Judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Explore MLflow's built-in evaluation judges](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/predefined.md)

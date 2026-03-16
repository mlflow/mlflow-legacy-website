# DeepEval

[DeepEval](https://docs.confident-ai.com/) is a comprehensive evaluation framework for LLM applications that provides metrics for RAG systems, agents, conversational AI, and safety evaluation. MLflow's DeepEval integration allows you to use most DeepEval metrics as MLflow scorers.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

DeepEval scorers require the `deepeval` package:

bash

```
pip install deepeval
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

You can call DeepEval scorers directly:

python

```
from mlflow.genai.scorers.deepeval import AnswerRelevancy

scorer = AnswerRelevancy(threshold=0.7, model="openai:/gpt-4")
feedback = scorer(
    inputs="What is MLflow?",
    outputs="MLflow is an open-source AI engineering platform for agents and LLMs.",
)

print(feedback.value)  # "yes" or "no"
print(feedback.metadata["score"])  # 0.85
```

Or use them in [mlflow.genai.evaluate](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate):

python

```
import mlflow
from mlflow.genai.scorers.deepeval import AnswerRelevancy, Faithfulness

eval_dataset = [
    {
        "inputs": {"query": "What is MLflow?"},
        "outputs": "MLflow is an open-source AI engineering platform for agents and LLMs.",
    },
    {
        "inputs": {"query": "How do I track experiments?"},
        "outputs": "You can use mlflow.start_run() to begin tracking experiments.",
    },
]

results = mlflow.genai.evaluate(
    data=eval_dataset,
    scorers=[
        AnswerRelevancy(threshold=0.7, model="openai:/gpt-4"),
        Faithfulness(threshold=0.8, model="openai:/gpt-4"),
    ],
)
```

## Available DeepEval Scorers[​](#available-deepeval-scorers "Direct link to Available DeepEval Scorers")

DeepEval scorers are organized into categories based on their evaluation focus:

### RAG (Retrieval-Augmented Generation) Metrics[​](#rag-retrieval-augmented-generation-metrics "Direct link to RAG (Retrieval-Augmented Generation) Metrics")

Evaluate retrieval quality and answer generation in RAG systems:

| Scorer                                                                                                                           | What does it evaluate?                                     | DeepEval Docs                                                  |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| [AnswerRelevancy](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.AnswerRelevancy)         | Is the output relevant to the input query?                 | [Link](https://deepeval.com/docs/metrics-answer-relevancy)     |
| [Faithfulness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Faithfulness)               | Is the output factually consistent with retrieval context? | [Link](https://deepeval.com/docs/metrics-faithfulness)         |
| [ContextualRecall](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ContextualRecall)       | Does retrieval context contain all necessary information?  | [Link](https://deepeval.com/docs/metrics-contextual-recall)    |
| [ContextualPrecision](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ContextualPrecision) | Are relevant nodes ranked higher than irrelevant ones?     | [Link](https://deepeval.com/docs/metrics-contextual-precision) |
| [ContextualRelevancy](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ContextualRelevancy) | Is the retrieval context relevant to the query?            | [Link](https://deepeval.com/docs/metrics-contextual-relevancy) |

### Agentic Metrics[​](#agentic-metrics "Direct link to Agentic Metrics")

Evaluate AI agent performance and behavior:

| Scorer                                                                                                                           | What does it evaluate?                                  | DeepEval Docs                                                  |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| [TaskCompletion](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.TaskCompletion)           | Does the agent successfully complete its assigned task? | [Link](https://deepeval.com/docs/metrics-task-completion)      |
| [ToolCorrectness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ToolCorrectness)         | Does the agent use the correct tools?                   | [Link](https://deepeval.com/docs/metrics-tool-correctness)     |
| [ArgumentCorrectness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ArgumentCorrectness) | Are tool arguments correct?                             | [Link](https://deepeval.com/docs/metrics-argument-correctness) |
| [StepEfficiency](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.StepEfficiency)           | Does the agent take an optimal path?                    | [Link](https://deepeval.com/docs/metrics-step-efficiency)      |
| [PlanAdherence](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.PlanAdherence)             | Does the agent follow its plan?                         | [Link](https://deepeval.com/docs/metrics-plan-adherence)       |
| [PlanQuality](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.PlanQuality)                 | Is the agent's plan well-structured?                    | [Link](https://deepeval.com/docs/metrics-plan-quality)         |

### Conversational Metrics[​](#conversational-metrics "Direct link to Conversational Metrics")

Evaluate multi-turn conversations and dialogue systems:

| Scorer                                                                                                                                     | What does it evaluate?                                  | DeepEval Docs                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------- |
| [TurnRelevancy](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.TurnRelevancy)                       | Is each turn relevant to the conversation?              | [Link](https://deepeval.com/docs/metrics-turn-relevancy)            |
| [RoleAdherence](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.RoleAdherence)                       | Does the assistant maintain its assigned role?          | [Link](https://deepeval.com/docs/metrics-role-adherence)            |
| [KnowledgeRetention](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.KnowledgeRetention)             | Does the agent retain information across turns?         | [Link](https://deepeval.com/docs/metrics-knowledge-retention)       |
| [ConversationCompleteness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ConversationCompleteness) | Are all user questions addressed?                       | [Link](https://deepeval.com/docs/metrics-conversation-completeness) |
| [GoalAccuracy](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.GoalAccuracy)                         | Does the conversation achieve its goal?                 | [Link](https://deepeval.com/docs/metrics-goal-accuracy)             |
| [ToolUse](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ToolUse)                                   | Does the agent use tools appropriately in conversation? | [Link](https://deepeval.com/docs/metrics-tool-use)                  |
| [TopicAdherence](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.TopicAdherence)                     | Does the conversation stay on topic?                    | [Link](https://deepeval.com/docs/metrics-topic-adherence)           |

### Safety Metrics[​](#safety-metrics "Direct link to Safety Metrics")

Detect harmful content, bias, and policy violations:

| Scorer                                                                                                               | What does it evaluate?                                               | DeepEval Docs                                            |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| [Bias](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Bias)                   | Does the output contain biased content?                              | [Link](https://deepeval.com/docs/metrics-bias)           |
| [Toxicity](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Toxicity)           | Does the output contain toxic language?                              | [Link](https://deepeval.com/docs/metrics-toxicity)       |
| [NonAdvice](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.NonAdvice)         | Does the model inappropriately provide advice in restricted domains? | [Link](https://deepeval.com/docs/metrics-non-advice)     |
| [Misuse](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Misuse)               | Could the output be used for harmful purposes?                       | [Link](https://deepeval.com/docs/metrics-misuse)         |
| [PIILeakage](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.PIILeakage)       | Does the output leak personally identifiable information?            | [Link](https://deepeval.com/docs/metrics-pii-leakage)    |
| [RoleViolation](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.RoleViolation) | Does the assistant break out of its assigned role?                   | [Link](https://deepeval.com/docs/metrics-role-violation) |

### Other[​](#other "Direct link to Other")

Additional evaluation metrics for common use cases:

| Scorer                                                                                                                   | What does it evaluate?                                 | DeepEval Docs                                              |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------- |
| [Hallucination](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Hallucination)     | Does the LLM fabricate information not in the context? | [Link](https://deepeval.com/docs/metrics-hallucination)    |
| [Summarization](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.Summarization)     | Is the summary accurate and complete?                  | [Link](https://deepeval.com/docs/metrics-summarization)    |
| [JsonCorrectness](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.JsonCorrectness) | Does JSON output match the expected schema?            | [Link](https://deepeval.com/docs/metrics-json-correctness) |
| [PromptAlignment](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.PromptAlignment) | Does the output align with prompt instructions?        | [Link](https://deepeval.com/docs/metrics-prompt-alignment) |

### Non-LLM[​](#non-llm "Direct link to Non-LLM")

Fast, rule-based metrics that don't require LLM calls:

| Scorer                                                                                                             | What does it evaluate?                     | DeepEval Docs                                           |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------- |
| [ExactMatch](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.ExactMatch)     | Does output exactly match expected output? | [Link](https://deepeval.com/docs/metrics-exact-match)   |
| [PatternMatch](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.PatternMatch) | Does output match a regex pattern?         | [Link](https://deepeval.com/docs/metrics-pattern-match) |

## Creating Scorers by Name[​](#creating-scorers-by-name "Direct link to Creating Scorers by Name")

You can also create DeepEval scorers dynamically using [get\_scorer](/docs/latest/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.deepeval.get_scorer):

python

```
from mlflow.genai.scorers.deepeval import get_scorer

# Create scorer by name
scorer = get_scorer(
    metric_name="AnswerRelevancy",
    threshold=0.7,
    model="openai:/gpt-4",
)

feedback = scorer(
    inputs="What is MLflow?",
    outputs="MLflow is a platform for ML workflows.",
)
```

## Configuration[​](#configuration "Direct link to Configuration")

DeepEval scorers accept all parameters supported by the underlying DeepEval metrics. Any additional keyword arguments are passed directly to the DeepEval metric constructor:

python

```
from mlflow.genai.scorers.deepeval import AnswerRelevancy, TurnRelevancy

# Common parameters
scorer = AnswerRelevancy(
    model="openai:/gpt-4",  # Model URI (also supports "databricks", "databricks:/endpoint", etc.)
    threshold=0.7,  # Pass/fail threshold (0.0-1.0, scorer passes if score >= threshold)
    include_reason=True,  # Include detailed rationale in feedback
)

# Metric-specific parameters are passed through to DeepEval
conversational_scorer = TurnRelevancy(
    model="openai:/gpt-4o",
    threshold=0.8,
    window_size=3,  # DeepEval-specific: number of conversation turns to consider
    strict_mode=True,  # DeepEval-specific: enforce stricter evaluation criteria
)
```

Refer to the [DeepEval documentation](https://docs.confident-ai.com/) for metric-specific parameters.

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

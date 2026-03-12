# RAGAS

[RAGAS](https://docs.ragas.io/) (Retrieval Augmented Generation Assessment) is an evaluation framework designed for LLM applications. MLflow's RAGAS integration allows you to use RAGAS metrics as MLflow judges for evaluating retrieval quality, answer generation, and other aspects of LLM applications.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

RAGAS judges require the `ragas` package:

bash

```
pip install ragas
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

You can call RAGAS judges directly:

python

```
from mlflow.genai.scorers.ragas import Faithfulness

scorer = Faithfulness(model="openai:/gpt-4")
feedback = scorer(trace=trace)

print(feedback.value)  # Score between 0.0 and 1.0
print(feedback.rationale)  # Explanation of the score
```

Or use them in [mlflow.genai.evaluate](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate):

python

```
import mlflow
from mlflow.genai.scorers.ragas import Faithfulness, ContextPrecision

traces = mlflow.search_traces()
results = mlflow.genai.evaluate(
    data=traces,
    scorers=[
        Faithfulness(model="openai:/gpt-4"),
        ContextPrecision(model="openai:/gpt-4"),
    ],
)
```

## Available RAGAS Judges[​](#available-ragas-judges "Direct link to Available RAGAS Judges")

RAGAS judges are organized into categories based on their evaluation focus:

### RAG (Retrieval-Augmented Generation) Metrics[​](#rag-retrieval-augmented-generation-metrics "Direct link to RAG (Retrieval-Augmented Generation) Metrics")

Evaluate retrieval quality and answer generation in RAG systems:

| Scorer                                                                                                                                                        | What does it evaluate?                                                     | RAGAS Docs                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [ContextPrecision](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ContextPrecision)                                       | Are relevant retrieved documents ranked higher than irrelevant ones?       | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/)                                    |
| [ContextUtilization](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ContextUtilization)                                   | How effectively is the retrieved context being utilized in the answer?     | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/?h=contextutili#context-utilization) |
| [NonLLMContextPrecisionWithReference](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.NonLLMContextPrecisionWithReference) | Non-LLM version of context precision using reference answers               | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/#non-llm-based-context-precision/)   |
| [ContextRecall](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ContextRecall)                                             | Does retrieval context contain all information needed to answer the query? | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/)                                       |
| [NonLLMContextRecall](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.NonLLMContextRecall)                                 | Non-LLM version of context recall using reference answers                  | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/)                                       |
| [ContextEntityRecall](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ContextEntityRecall)                                 | Are entities from the expected answer present in the retrieved context?    | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_entities_recall/)                              |
| [NoiseSensitivity](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.NoiseSensitivity)                                       | How sensitive is the model to irrelevant information in the context?       | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/noise_sensitivity/)                                    |
| [AnswerRelevancy](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.AnswerRelevancy)                                         | How relevant is the generated answer to the input query?                   | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/answer_relevance/)                                     |
| [Faithfulness](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.Faithfulness)                                               | Is the output factually consistent with the retrieval context?             | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/)                                         |
| [AnswerAccuracy](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.AnswerAccuracy)                                           | How accurate is the answer compared to ground truth?                       | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/nvidia_metrics/#answer-accuracy)                       |
| [ContextRelevance](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ContextRelevance)                                       | How relevant is the retrieved context to the input query?                  | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/nvidia_metrics/#context-relevance)                     |
| [ResponseGroundedness](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ResponseGroundedness)                               | Is the response grounded in the provided context?                          | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/nvidia_metrics/#response-groundedness)                 |

### Agents or Tool Use Metrics[​](#agents-or-tool-use-metrics "Direct link to Agents or Tool Use Metrics")

Evaluate AI agents and tool usage:

| Scorer                                                                                                                                                    | What does it evaluate?                                      | RAGAS Docs                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [TopicAdherence](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.TopicAdherence)                                       | Does the agent stay on topic during conversation?           | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/#topic-adherence)                                       |
| [ToolCallAccuracy](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ToolCallAccuracy)                                   | Are the correct tools called with appropriate parameters?   | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/#tool-call-accuracy)                                    |
| [ToolCallF1](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ToolCallF1)                                               | F1 score for tool call prediction                           | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/#tool-call-f1)                                          |
| [AgentGoalAccuracyWithReference](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.AgentGoalAccuracyWithReference)       | Does the agent achieve its goal (with reference answer)?    | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/?h=agentgoalaccuracywithreference#with-reference)       |
| [AgentGoalAccuracyWithoutReference](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.AgentGoalAccuracyWithoutReference) | Does the agent achieve its goal (without reference answer)? | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/?h=agentgoalaccuracywithoutreference#without-reference) |

### Natural Language Comparison[​](#natural-language-comparison "Direct link to Natural Language Comparison")

Evaluate answer quality through natural language comparison:

| Scorer                                                                                                                              | What does it evaluate?                                       | RAGAS Docs                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| [FactualCorrectness](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.FactualCorrectness)         | Is the output factually correct compared to expected answer? | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/factual_correctness/)                   |
| [SemanticSimilarity](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.SemanticSimilarity)         | Semantic similarity between output and expected answer       | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/semantic_similarity/)                   |
| [NonLLMStringSimilarity](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.NonLLMStringSimilarity) | String similarity between output and expected answer         | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#non-llm-string-similarity) |
| [BleuScore](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.BleuScore)                           | BLEU score for text comparison                               | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#bleu-score)                |
| [ChrfScore](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ChrfScore)                           | CHRF score for text comparison                               | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#chrf-score)                |
| [RougeScore](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.RougeScore)                         | ROUGE score for text comparison                              | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#rouge-score)               |
| [StringPresence](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.StringPresence)                 | Is a specific string present in the output?                  | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#string-presence)           |
| [ExactMatch](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.ExactMatch)                         | Does output exactly match expected output?                   | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/traditional/#exact-match)               |

### General Purpose[​](#general-purpose "Direct link to General Purpose")

Flexible evaluation metrics for various use cases:

| Scorer                                                                                                                                | What does it evaluate?                             | RAGAS Docs                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [AspectCritic](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.AspectCritic)                       | Evaluates specific aspects of the output using LLM | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/aspect_critic/)                                              |
| [DiscreteMetric](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.DiscreteMetric)                   | Custom discrete metric with flexible scoring logic | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/general_purpose/#simple-criteria-scoring)                    |
| [RubricsScore](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.RubricsScore)                       | Scores output based on predefined rubrics          | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/general_purpose/#rubrics-based-criteria-scoring)             |
| [InstanceSpecificRubrics](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.InstanceSpecificRubrics) | Scores output based on instance-specific rubrics   | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/general_purpose/#instance-specific-rubrics-criteria-scoring) |

### Other Tasks[​](#other-tasks "Direct link to Other Tasks")

Specialized metrics for specific tasks:

| Scorer                                                                                                                      | What does it evaluate?        | RAGAS Docs                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| [SummarizationScore](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.SummarizationScore) | Quality of text summarization | [Link](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/summarization_score/) |

## Creating Judges by Name[​](#creating-judges-by-name "Direct link to Creating Judges by Name")

You can also create RAGAS judges dynamically using [get\_scorer](/docs/3.10.2/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ragas.get_scorer):

python

```
from mlflow.genai.scorers.ragas import get_scorer

# Create scorer by name
scorer = get_scorer(
    metric_name="Faithfulness",
    model="openai:/gpt-4",
)

feedback = scorer(trace=trace)
```

## Configuration[​](#configuration "Direct link to Configuration")

RAGAS judges accept metric-specific parameters. Any additional keyword arguments are passed directly to the RAGAS metric constructor:

python

```
from mlflow.genai.scorers.ragas import Faithfulness, ContextPrecision, ExactMatch

# LLM-based metric with model specification
scorer = Faithfulness(model="openai:/gpt-4")

# Non-LLM metric (no model required)
deterministic_scorer = ExactMatch()
```

Refer to the [RAGAS documentation](https://docs.ragas.io/) for metric-specific parameters and advanced usage.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Evaluate Agents](/docs/3.10.2/genai/eval-monitor/running-evaluation/agents.md)

[Learn specialized techniques for evaluating AI agents with tool usage](/docs/3.10.2/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/3.10.2/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/3.10.2/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand application behavior](/docs/3.10.2/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/3.10.2/genai/eval-monitor/running-evaluation/traces.md)

### [Built-in Judges](/docs/3.10.2/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Explore MLflow's built-in evaluation judges](/docs/3.10.2/genai/eval-monitor/scorers/llm-judge/predefined.md)

[Learn more →](/docs/3.10.2/genai/eval-monitor/scorers/llm-judge/predefined.md)

# Predefined LLM Scorers

MLflow provides several pre-configured LLM judge scorers optimized for common evaluation scenarios.

tip

Typically, you can get started with evaluation using predefined scorers. However, every AI application is unique and has domain-specific quality criteria. At some point, you'll need to create your own custom LLM scorers.

* Your application has complex inputs/outputs that predefined scorers can't parse
* You need to evaluate specific business logic or domain-specific criteria
* You want to combine multiple evaluation aspects into a single scorer

See [custom LLM scorers](/docs/3.9.0/genai/eval-monitor/scorers/llm-judge/guidelines.md) guide for detailed examples.

## Example Usage[​](#example-usage "Direct link to Example Usage")

To use the predefined LLM scorers, select the scorer class from the [available scorers](#available-scorers) and pass it to the `scorers` argument of the [evaluate](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.evaluate) function.

python

```
import mlflow
from mlflow.genai.scorers import Correctness, RelevanceToQuery, Guidelines

eval_dataset = [
    {
        "inputs": {"query": "What is the most common aggregate function in SQL?"},
        "outputs": "The most common aggregate function in SQL is SUM().",
        # Correctness scorer requires an "expected_facts" field.
        "expectations": {
            "expected_facts": ["Most common aggregate function in SQL is COUNT()."],
        },
    },
    {
        "inputs": {"query": "How do I use MLflow?"},
        # verbose answer
        "outputs": "Hi, I'm a chatbot that answers questions about MLflow. Thank you for asking a great question! I know MLflow well and I'm glad to help you with that. You will love it! MLflow is a Python-based platform that provides a comprehensive set of tools for logging, tracking, and visualizing machine learning models and experiments throughout their entire lifecycle. It consists of four main components: MLflow Tracking for experiment management, MLflow Projects for reproducible runs, MLflow Models for standardized model packaging, and MLflow Model Registry for centralized model lifecycle management. To get started, simply install it with 'pip install mlflow' and then use mlflow.start_run() to begin tracking your experiments with automatic logging of parameters, metrics, and artifacts. The platform creates a beautiful web UI where you can compare different runs, visualize metrics over time, and manage your entire ML workflow efficiently. MLflow integrates seamlessly with popular ML libraries like scikit-learn, TensorFlow, PyTorch, and many others, making it incredibly easy to incorporate into your existing projects!",
        "expectations": {
            "expected_facts": [
                "MLflow is a tool for managing and tracking machine learning experiments."
            ],
        },
    },
]

results = mlflow.genai.evaluate(
    data=eval_dataset,
    scorers=[
        Correctness(),
        RelevanceToQuery(),
        # Guidelines is a special scorer that takes user-defined criteria for evaluation.
        # See the "Customizing LLM Judges" section below for more details.
        Guidelines(
            name="is_concise",
            guidelines="The answer must be concise and straight to the point.",
        ),
    ],
)
```

![Predefined LLM scorers result](/docs/3.9.0/images/mlflow-3/eval-monitor/scorers/predefined-scorers-results.png)

## Available Scorers[​](#available-scorers "Direct link to Available Scorers")

### Single-Turn Scorers[​](#single-turn-scorers "Direct link to Single-Turn Scorers")

| Scorer                                                                                                                       | What does it evaluate?                                        | Requires ground-truth? | Requires traces?      |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------- | --------------------- |
| [RelevanceToQuery](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.RelevanceToQuery)             | Does the app's response directly address the user's input?    | No                     | No                    |
| [Correctness](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Correctness)                       | Are the expected facts supported by the app's response?       | Yes\*                  | No                    |
| [Completeness](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Completeness)\*\*                 | Does the agent address all questions in a single user prompt? | No                     | No                    |
| [Fluency](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Fluency)                               | Is the response grammatically correct and naturally flowing?  | No                     | No                    |
| [Guidelines](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Guidelines)                         | Does the response adhere to provided guidelines?              | Yes\*                  | No                    |
| [ExpectationsGuidelines](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ExpectationsGuidelines) | Does the response meet specific expectations and guidelines?  | Yes\*                  | No                    |
| [Safety](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Safety)                                 | Does the app's response avoid harmful or toxic content?       | No                     | No                    |
| [Equivalence](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Equivalence)                       | Is the app's response equivalent to the expected output?      | Yes                    | No                    |
| [RetrievalGroundedness](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.RetrievalGroundedness)   | Is the app's response grounded in retrieved information?      | No                     | ⚠️ **Trace Required** |
| [RetrievalRelevance](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.RetrievalRelevance)         | Are retrieved documents relevant to the user's request?       | No                     | ⚠️ **Trace Required** |
| [RetrievalSufficiency](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.RetrievalSufficiency)     | Do retrieved documents contain all necessary information?     | Yes                    | ⚠️ **Trace Required** |
| [ToolCallCorrectness](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ToolCallCorrectness)\*\*   | Are the tool calls and arguments correct for the user query?  | No                     | ⚠️ **Trace Required** |
| [ToolCallEfficiency](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ToolCallEfficiency)\*\*     | Are the tool calls efficient without redundancy?              | No                     | ⚠️ **Trace Required** |

\*Can extract expectations from trace assessments if available.

\*\*Indicates experimental features that may change in future releases.

### Multi-Turn Scorers[​](#multi-turn-scorers "Direct link to Multi-Turn Scorers")

Multi-turn scorers evaluate entire conversation sessions rather than individual turns. They require traces with session IDs and are experimental in MLflow 3.7.0.

| Scorer                                                                                                                                               | What does it evaluate?                                                     | Requires Session? |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------- |
| [ConversationCompleteness](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ConversationCompleteness)\*\*                 | Does the agent address all user questions throughout the conversation?     | Yes               |
| [ConversationalGuidelines](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ConversationalGuidelines)\*\*                 | Do the assistant's responses comply with provided guidelines?              | Yes               |
| [ConversationalRoleAdherence](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ConversationalRoleAdherence)\*\*           | Does the assistant maintain its assigned role throughout the conversation? | Yes               |
| [ConversationalSafety](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ConversationalSafety)\*\*                         | Are the assistant's responses safe and free of harmful content?            | Yes               |
| [ConversationalToolCallEfficiency](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.ConversationalToolCallEfficiency)\*\* | Was tool usage across the conversation efficient and appropriate?          | Yes               |
| [KnowledgeRetention](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.KnowledgeRetention)\*\*                             | Does the assistant correctly retain information from earlier user inputs?  | Yes               |
| [UserFrustration](/docs/3.9.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.UserFrustration)\*\*                                   | Is the user frustrated? Was the frustration resolved?                      | Yes               |

Multi-Turn Evaluation Requirements

Multi-turn scorers require:

1. **Session IDs**: Traces must have `mlflow.trace.session` metadata
2. **List or DataFrame input**: Currently only supports pre-collected traces (no `predict_fn` support yet)

See the [Evaluate Conversations](#evaluate-conversations) section below for detailed usage examples.

Availability

Safety and RetrievalRelevance scorers are currently only available in [Databricks managed MLflow](https://docs.databricks.com/mlflow3/genai/eval-monitor/) and will be open-sourced soon.

## Using Traces with Built-in Scorers[​](#using-traces-with-built-in-scorers "Direct link to Using Traces with Built-in Scorers")

All built-in scorers, such as Guidelines, RelevanceToQuery, Safety, Correctness, and ExpectationsGuidelines, can extract inputs and outputs directly from traces:

python

```
from mlflow.genai.scorers import Correctness

trace = mlflow.get_trace("<your-trace-id>")
scorer = Correctness()

# Extracts inputs/outputs from trace automatically
result = scorer(trace=trace)

# Override specific fields as needed
result = scorer(trace=trace, expectations={"expected_facts": ["Custom fact"]})
```

### Automatic Fallback for Complex Traces[​](#automatic-fallback-for-complex-traces "Direct link to Automatic Fallback for Complex Traces")

For complex traces or those that do not contain inputs and outputs in the root span, the scorer will use tool calling to provide the trace information to an LLM judge.

Retrieval Scorers Require Traces

**Retrieval scorers will NOT work with static pandas DataFrames** that only contain inputs/outputs/expectations fields.

These scorers require:

1. **Active traces** with spans of type `RETRIEVER`
2. Either a `predict_fn` that generates traces during evaluation, OR pre-collected traces in your dataset

**Common Error:** If you're trying to use retrieval scorers with a static dataset and getting errors about missing traces or RETRIEVER spans, you need to either:

* Switch to scorers that work with static data (marked with ✅ in the table above)
* Modify your evaluation to use a `predict_fn` that generates traces
* Use [automatic tracing integration](/docs/3.9.0/genai/tracing/app-instrumentation/automatic.md) with your application

## Selecting Judge Models[​](#selecting-judge-models "Direct link to Selecting Judge Models")

MLflow supports all major LLM providers, such as OpenAI, Anthropic, Google, xAI, and more.

See [Supported Models](/docs/3.9.0/genai/eval-monitor/scorers/llm-judge.md#supported-models) for more details.

## Output Format[​](#output-format "Direct link to Output Format")

Predefined LLM-based scorers in MLflow return structured assessments with three key components:

* **Score**: Binary output (`yes`/`no`) renders as

  Pass

  or

  Fail

  in the UI.

* **Rationale**: Detailed explanation of why the judge made its decision

* **Source**: Metadata about the evaluation source

text

```
score: "yes"  # or "no"
rationale: "The response accurately addresses the user's question about machine learning concepts, providing clear definitions and relevant examples. The information is factually correct and well-structured."
source: AssessmentSource(
    source_type="LLM_JUDGE",
    source_id="openai:/gpt-4o-mini"
)
```

Why Binary Scores?

Binary scoring provides clearer, more consistent evaluations compared to numeric scales (1-5). Research shows that LLMs produce more reliable judgments when asked to make binary decisions rather than rating on a scale. Binary outputs also simplify threshold-based decision making in production systems.

## Evaluate Conversations[​](#evaluate-conversations "Direct link to Evaluate Conversations")

Multi-turn scorers evaluate entire conversation sessions rather than individual turns. For detailed information on how to use conversation evaluation, including setup, examples, and best practices, see the [Evaluate Conversations](/docs/3.9.0/genai/eval-monitor/running-evaluation/multi-turn.md) guide.

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Guidelines Scorer](/docs/3.9.0/genai/eval-monitor/scorers/llm-judge/guidelines.md)

[Learn how to use the Guidelines scorer to evaluate responses against custom criteria](/docs/3.9.0/genai/eval-monitor/scorers/llm-judge/guidelines.md)

[Learn more →](/docs/3.9.0/genai/eval-monitor/scorers/llm-judge/guidelines.md)

### [Evaluate Agents](/docs/3.9.0/genai/eval-monitor/running-evaluation/agents.md)

[Learn how to evaluate AI agents with specialized techniques and scorers](/docs/3.9.0/genai/eval-monitor/running-evaluation/agents.md)

[Learn more →](/docs/3.9.0/genai/eval-monitor/running-evaluation/agents.md)

### [Evaluate Traces](/docs/3.9.0/genai/eval-monitor/running-evaluation/traces.md)

[Evaluate production traces to understand and improve your AI application's behavior](/docs/3.9.0/genai/eval-monitor/running-evaluation/traces.md)

[Learn more →](/docs/3.9.0/genai/eval-monitor/running-evaluation/traces.md)

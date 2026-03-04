# Evaluating LLMs/Agents with MLflow

MLflow's evaluation and monitoring capabilities help you systematically measure, improve, and maintain the quality of your GenAI applications throughout their lifecycle from development through production.

[](/docs/3.10.1/images/mlflow-3/eval-monitor/evaluation-result-video.mp4)

<br />

**Try MLflow GenAI Demo**<br />The quickest way to learn about MLflow GenAI is to try the demo. Click to see how to launch the demo ↓

#### **Starting from UI**[​](#starting-from-ui "Direct link to starting-from-ui")

To start the demo, click on the "Start Demo" button on the top page of the MLflow UI.

![MLflow GenAI Demo UI](/docs/3.10.1/images/llms/demo/demo.png)

#### **Starting from CLI**[​](#starting-from-cli "Direct link to starting-from-cli")

Alternatively, you can start the demo from the command line using the `mlflow demo` command. This option does not require you to have a running MLflow server.

bash

```
uvx mlflow demo
```

A core tenet of MLflow's evaluation capabilities is **Evaluation-Driven Development**. This is an emerging practice to tackle the challenge of building high-quality LLM/Agentic applications. MLflow is an **end-to-end** platform that is designed to support this practice and help you deploy AI applications with confidence.

![Evaluation Driven Development](/docs/3.10.1/images/mlflow-3/eval-monitor/evaluation-driven-development.png)

## Key Capabilities[​](#key-capabilities "Direct link to Key Capabilities")

* Dataset Management
* Human Feedback
* LLM-as-a-Judge
* Systematic Evaluation
* Production Monitoring

#### Create and maintain a High-Quality Dataset[​](#create-and-maintain-a-high-quality-dataset "Direct link to Create and maintain a High-Quality Dataset")

Before you can evaluate your GenAI application, you need test data. **Evaluation Datasets** provide a centralized repository for managing test cases, ground truth expectations, and evaluation data at scale.

Think of Evaluation Datasets as your "test database" - a single source of truth for all the data needed to evaluate your AI systems. They transform ad-hoc testing into systematic quality assurance.

[Learn more →](/docs/3.10.1/genai/datasets.md)

![Trace Dataset](/docs/3.10.1/assets/images/genai-trace-dataset-0db517dfd5b8e13ae6732b0a1b0b098f.png)

#### Track Annotation and Human Feedbacks[​](#track-annotation-and-human-feedbacks "Direct link to Track Annotation and Human Feedbacks")

Human feedback is essential for building high-quality GenAI applications that meet user expectations. MLflow supports collecting, managing, and utilizing feedback from end-users and domain experts.

Feedbacks are attached to traces and recorded with metadata, including user, timestamp, revisions, etc.

[Learn more →](/docs/3.10.1/genai/assessments/feedback.md)

![Trace Feedback](/docs/3.10.1/assets/images/genai-human-feedback-9a8ea2ba10a5f7c7bb192aea22345b19.png)

#### Scale Quality Assessment with Automation[​](#scale-quality-assessment-with-automation "Direct link to Scale Quality Assessment with Automation")

Quality assessment is a critical part of building high-quality GenAI applications, however, it is often time-consuming and requires human expertise. LLMs are powerful tools to automate quality assessment.

MLflow offers various built-in LLM-as-a-Judge scorers to help automate the process, as well as a flexible toolset to build your own LLM judges with ease.

[Learn more →](/docs/3.10.1/genai/eval-monitor.md)

![Trace Evaluation](/docs/3.10.1/assets/images/genai-trace-evaluation-5b5e6ba86f0f0f06ee27db356e4e59e4.png)

#### Evaluate and Enhance quality[​](#evaluate-and-enhance-quality "Direct link to Evaluate and Enhance quality")

Systematically assessing and improving the quality of GenAI applications is a challenge. MLflow provides a comprehensive set of tools to help you evaluate and enhance the quality of your applications.

Being the industry's most-trusted experiment tracking platform, MLflow provides a strong foundation for tracking your evaluation results and effectively collaborating with your team.

[Learn more →](/docs/3.10.1/genai/eval-monitor/quickstart.md)

![Trace Evaluation](/docs/3.10.1/assets/images/genai-evaluation-compare-e16ede1d0aa60604dd3eb43ecda3d631.png)

#### Monitor Applications in Production[​](#monitor-applications-in-production "Direct link to Monitor Applications in Production")

Understanding and optimizing GenAI application performance is crucial for efficient operations. MLflow Tracing captures key metrics like latency and token usage at each step, as well as various quality metrics, helping you identify bottlenecks, monitor efficiency, and find optimization opportunities.

[Learn more →](/docs/3.10.1/genai/tracing/prod-tracing.md)

![Monitoring](/docs/3.10.1/assets/images/genai-monitoring-8ebda32e5cc07cb9cc97cb0297e583c3.png)

## Running an Evaluation[​](#running-an-evaluation "Direct link to Running an Evaluation")

Each evaluation is defined by three components:

| Component                                                                                | Example                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dataset**<br />Inputs & expectations (and optionally pre-generated outputs and traces) | ```
[
  {"inputs": {"question": "2+2"}, "expectations": {"answer": "4"}},
  {"inputs": {"question": "2+3"}, "expectations": {"answer": "5"}}
]
```                                                                                    |
| **Scorer**<br />Evaluation criteria                                                      | ```
@scorer
def exact_match(expectations, outputs):
    return expectations == outputs
```                                                                                                                                           |
| **Predict Function**<br />Generates outputs for the dataset                              | ```
def predict_fn(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": question}]
    )
    return response.choices[0].message.content
``` |

The following example shows a simple evaluation of a dataset of questions and expected answers.

python

```
import os
import openai
import mlflow
from mlflow.genai.scorers import Correctness, Guidelines

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 1. Define a simple QA dataset
dataset = [
    {
        "inputs": {"question": "Can MLflow manage prompts?"},
        "expectations": {"expected_response": "Yes!"},
    },
    {
        "inputs": {"question": "Can MLflow create a taco for my lunch?"},
        "expectations": {
            "expected_response": "No, unfortunately, MLflow is not a taco maker."
        },
    },
]


# 2. Define a prediction function to generate responses
def predict_fn(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": question}]
    )
    return response.choices[0].message.content


# 3.Run the evaluation
results = mlflow.genai.evaluate(
    data=dataset,
    predict_fn=predict_fn,
    scorers=[
        # Built-in LLM judge
        Correctness(),
        # Custom criteria using LLM judge
        Guidelines(name="is_english", guidelines="The answer must be in English"),
    ],
)
```

## Review the results[​](#review-the-results "Direct link to Review the results")

Open the MLflow UI to review the evaluation results. If you are using OSS MLflow, you can use the following command to start the UI:

bash

```
mlflow server --port 5000
```

If you are using cloud-based MLflow, open the experiment page in the platform. You should see a new evaluation run is created under the "Runs" tab. Click on the run name to view the evaluation results.

![Evaluation Results](/docs/3.10.1/images/mlflow-3/eval-monitor/quickstart-eval-hero.png)

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [Quickstart](/docs/3.10.1/genai/eval-monitor/quickstart.md)

[Learn MLflow's evaluation workflow in action.](/docs/3.10.1/genai/eval-monitor/quickstart.md)

[Start evaluating →](/docs/3.10.1/genai/eval-monitor/quickstart.md)

### [Evaluate Agents](/docs/3.10.1/genai/eval-monitor/running-evaluation/agents.md)

[Evaluate AI agents with specialized techniques and custom scorers.](/docs/3.10.1/genai/eval-monitor/running-evaluation/agents.md)

[Evaluate agents →](/docs/3.10.1/genai/eval-monitor/running-evaluation/agents.md)

### [Building Scorers](/docs/3.10.1/genai/eval-monitor/scorers.md)

[Get started with MLflow's powerful scorers for evaluating qualities.](/docs/3.10.1/genai/eval-monitor/scorers.md)

[Learn about scorers →](/docs/3.10.1/genai/eval-monitor/scorers.md)

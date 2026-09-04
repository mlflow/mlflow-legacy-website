# Live Demo

**[demo.mlflow.org](https://demo.mlflow.org/#/experiments/1)** is a publicly hosted MLflow instance pre-loaded with sample data. It's the fastest way to explore the MLflow UI without any local setup.

[](/docs/3.16.0/images/genai/live-mlflow-ui-demo.mp4)

## What's in the demo?[​](#whats-in-the-demo "Direct link to What's in the demo?")

The demo environment includes sample data across four areas:

[Observability](https://demo.mlflow.org/#/experiments/1)

***

[Explore dashboard, traces and sessions from a sample LLM application. Inspect spans, inputs/outputs, latency, token usage, and nested call hierarchies.](https://demo.mlflow.org/#/experiments/1)

[Evaluation](https://demo.mlflow.org/#/experiments/1/evaluation-runs)

***

[Browse pre-configured judges, datasets, and evaluation runs with judge-scored quality metrics across sample traces.](https://demo.mlflow.org/#/experiments/1/evaluation-runs)

[Issue Detection](https://demo.mlflow.org/#/experiments/1/evaluation-runs/1e66d099f5f34d4db3a34aa6537782a3/issues)

***

[See automatically detected issues surfaced from trace data and an issue detection run, showing how MLflow flags quality and reliability problems in production.](https://demo.mlflow.org/#/experiments/1/evaluation-runs/1e66d099f5f34d4db3a34aa6537782a3/issues)

[Prompts](https://demo.mlflow.org/#/experiments/1/prompts)

***

[Browse versioned prompts used by the demo application, with full edit history and linked traces.](https://demo.mlflow.org/#/experiments/1/prompts)

## Run the demo locally[​](#run-the-demo-locally "Direct link to Run the demo locally")

Want to explore the same demo data on your own MLflow instance with write access? You can launch it in seconds using the `mlflow demo` command:

bash

```
uvx mlflow demo
```

This starts a local MLflow server pre-loaded with the same sample data, giving you full read-write access to experiment and customize.

Alternatively, if you already have a local MLflow instance running, click the **Explore Demo** button in the banner at the top of the home page to load sample data directly into your instance.

![MLflow GenAI Demo UI](/docs/3.16.0/images/llms/demo/demo.png)

## Next steps[​](#next-steps "Direct link to Next steps")

Once you've explored the demo, get started with your own MLflow environment:

* [Set Up MLflow Server](/docs/3.16.0/genai/getting-started/connect-environment.md) — connect to a local or hosted MLflow instance
* [Start Tracing](/docs/3.16.0/genai/tracing/quickstart.md) — instrument your LLM app and capture your first traces
* [Evaluate LLMs and Agents](/docs/3.16.0/genai/eval-monitor/quickstart.md) — run systematic evaluations with LLM judges

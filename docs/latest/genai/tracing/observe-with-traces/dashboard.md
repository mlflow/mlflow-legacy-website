# Dashboard (Overview)

The **Overview** tab in LLM and AI agent experiments provides comprehensive analytics and visualizations for your LLM application and AI agent traces. This tab is organized into three sub-tabs to help you monitor different aspects of your application.

All tabs include a **time range selector** and **time unit selector** to customize the granularity and range of the displayed data.

[](/docs/latest/images/llms/tracing/overview_demo.mp4)

## Usage[​](#usage "Direct link to Usage")

The Usage tab displays key metrics about your trace requests over time:

* **Requests**: Shows the total number of trace requests, with an average reference line
* **Latency**: Visualizes response time distribution to help identify performance bottlenecks
* **Errors**: Tracks error rates to quickly spot issues
* **Token Usage & Token Stats**: Monitors token consumption across your traces

![Experiment Overview Usage Tab](/docs/latest/assets/images/overview_usage_tab-3f972858bec76adaebb876f6c93c1fd7.png)

## Quality[​](#quality "Direct link to Quality")

The Quality tab provides insights into the quality of your LLM and AI agent outputs:

* **Quality Summary**: Provides an overview of scorer results
* **Quality Insights**: Displays metrics computed by [scorers](/docs/latest/genai/eval-monitor/scorers.md), with a dedicated chart for each assessment type
* Charts are dynamically generated based on the assessments available in your traces

![Experiment Overview Quality Tab](/docs/latest/assets/images/overview_quality_tab-2b09e28d9fb24da7c01b85ac8fc912ca.png)

## Tool Calls[​](#tool-calls "Direct link to Tool Calls")

The Tool Calls tab provides insights into agent tool usage:

* **Statistics Cards**: Shows at-a-glance metrics including total tool calls, average latency, success rate, and failed calls
* **Tool Performance Summary**: Provides an overview of how each tool is performing
* **Tool Usage & Latency**: Visualizes tool invocation patterns and response times
* **Tool Error Rate**: Tracks error rates per tool

![Experiment Overview Tool Calls Tab](/docs/latest/assets/images/overview_tool_calls_tab-52fa54220793d89710cde32b4cb00def.png)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Why is my dashboard empty?[​](#why-is-my-dashboard-empty "Direct link to Why is my dashboard empty?")

The dashboard requires traces to be logged to your experiment before any data appears. To get started:

1. Follow the [Tracing Quickstart](/docs/latest/genai/tracing/quickstart.md) to log your first traces.
2. You can also explore the dashboard with the [MLflow Tracing demo](https://mlflow-tracing-demo.org/) to see it in action with sample data.

### Charts are not rendered[​](#charts-are-not-rendered "Direct link to Charts are not rendered")

The dashboard requires a SQL-backed tracking store (SQLite, PostgreSQL, or MySQL). If you are using the default file-based store, the dashboard charts will not render.

To fix this, migrate to a SQL-backed store:

bash

```
# Migrate existing data from file store to SQLite
mlflow migrate-filestore --source /path/to/mlruns --target sqlite:///path/to/mlflow.db

# Start the server with the SQL backend
mlflow server --backend-store-uri sqlite:///path/to/mlflow.db
```

For more details, see the [migration guide](/docs/latest/self-hosting/migrate-from-file-store.md).

# MLflow Tracing UI

## Traces within MLflow Experiments[​](#traces-within-mlflow-experiments "Direct link to Traces within MLflow Experiments")

After logging your traces, you can view them in the [MLflow UI](/docs/latest/genai/tracing/observe-with-traces/ui.md), under the "Traces" tab in the main experiment page. This tab is also available within the individual run pages, if your trace was logged within a run context.

![MLflow Tracking UI](/docs/latest/assets/images/trace-experiment-ui-1e174436e7842bab2320c79e501839a4.png)

This table includes high-level information about the traces, such as the trace ID, the inputs / outputs of the root span, and more. From this page, you can also perform a few actions to manage your traces:

* Search
* Delete
* Edit Tags

Using the search bar in the UI, you can easily filter your traces based on name, tags, or other metadata. Check out the [search docs](/docs/latest/genai/tracing/search-traces.md) for details about the query string format.

[](/docs/latest/images/llms/tracing/trace-session-id.mp4)

The UI supports bulk deletion of traces. Simply select the traces you want to delete by checking the checkboxes, and then pressing the "Delete" button.

[](/docs/latest/images/llms/tracing/trace-delete.mp4)

You can also edit key-value tags on your traces via the UI.

[](/docs/latest/images/llms/tracing/trace-set-tag.mp4)

## Browsing span data[​](#browsing-span-data "Direct link to Browsing span data")

In order to browse the span data of an individual trace, simply click on the link in the "Trace ID" or "Trace name" columns to open the trace viewer:

[](/docs/latest/images/llms/tracing/tracing-top.mp4)

## Jupyter Notebook integration[​](#jupyter-notebook-integration "Direct link to Jupyter Notebook integration")

note

The MLflow Tracing Jupyter integration is available in **MLflow 2.20 and above**

You can also view the trace UI directly within Jupyter notebooks, allowing you to debug your applications without having to tab out of your development environment.

![Jupyter Trace UI](/docs/latest/assets/images/jupyter-trace-ui-a11c56c439864da666540e9d501329cb.png)

This feature requires using an [MLflow Tracking Server](/docs/latest/self-hosting/architecture/tracking-server.md), as this is where the UI assets are fetched from. To get started, simply ensure that the MLflow Tracking URI is set to your tracking server (e.g. `mlflow.set_tracking_uri("http://localhost:5000")`).

By default, the trace UI will automatically be displayed for the following events:

1. When the cell code generates a trace (e.g. via [automatic tracing](/docs/latest/genai/tracing/app-instrumentation/automatic.md), or by running a manually traced function)
2. When [`mlflow.search_traces()`](/docs/latest/api_reference/python_api/mlflow.html#mlflow.search_traces) is called
3. When a [`mlflow.entities.Trace()`](/docs/latest/api_reference/python_api/mlflow.entities.html#mlflow.entities.Trace) object is displayed (e.g. via IPython's `display` function, or when it is the last value returned in a cell)

To disable the display, simply call [`mlflow.tracing.disable_notebook_display()`](/docs/latest/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.disable_notebook_display), and rerun the cell containing the UI. To enable it again, call [`mlflow.tracing.enable_notebook_display()`](/docs/latest/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.enable_notebook_display).

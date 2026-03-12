# View Traces

After logging your traces, you can view them in the MLflow UI, under the "Traces" page in your experiment. The page is for browsing the list of traces with rich search and filtering capabilities, as well as inspecting the details of each trace.

![MLflow Tracking UI](/docs/latest/images/llms/tracing/trace-experiment-ui.png)

## Trace Table[​](#trace-table "Direct link to Trace Table")

The trace table you see first when you open the "Traces" page includes high-level information about the traces, such as the trace ID, the inputs / outputs of the root span, and more. The table displays the following columns.

Not Seeing All Columns?

Trace table does not display all fields by default. Some columns are hidden by default and can be enabled via the column selector.

| Column         | Description                                                                                                                                                   | Data Source                                                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trace ID       | Unique identifier                                                                                                                                             | Trace `trace_id` field                                                                                                                                                                                                                                                                             |
| Request        | Input to the root span                                                                                                                                        | Derived from the root span's `mlflow.spanInputs` attribute, or customized via the `request_preview` parameter of the [`mlflow.update_current_trace()`](/docs/latest/api_reference/python_api/mlflow.html#mlflow.update_current_trace) API                                                          |
| Response       | Output of the root span                                                                                                                                       | Derived from the root span's `mlflow.spanOutputs` attribute, or customized via the `response_preview` parameter of the [`mlflow.update_current_trace()`](/docs/latest/api_reference/python_api/mlflow.html#mlflow.update_current_trace) API                                                        |
| Session        | Conversation/session grouper                                                                                                                                  | `mlflow.trace.session` metadata. See [Track Users and Sessions](/docs/latest/genai/tracing/track-users-sessions.md) for how to set this.                                                                                                                                                           |
| User           | Application user who triggered the trace                                                                                                                      | `mlflow.trace.user` metadata. See [Track Users and Sessions](/docs/latest/genai/tracing/track-users-sessions.md) for how to set this.                                                                                                                                                              |
| Trace name     | Name of the trace                                                                                                                                             | Derived from the root span's name, or customized through the `mlflow.traceName` tag                                                                                                                                                                                                                |
| Tokens         | Aggregated input/output/total tokens                                                                                                                          | `mlflow.trace.tokenUsage` metadata. See [Token Usage and Cost Tracking](/docs/latest/genai/tracing/token-usage-cost.md) for more details.                                                                                                                                                          |
| Execution time | Total trace duration                                                                                                                                          | Computed at runtime.                                                                                                                                                                                                                                                                               |
| Request time   | When the trace was created                                                                                                                                    | Computed at runtime.                                                                                                                                                                                                                                                                               |
| State          | `OK`, `ERROR`, or `IN_PROGRESS`                                                                                                                               | Derived from the root span's execution status.                                                                                                                                                                                                                                                     |
| Run name       | Associated MLflow run                                                                                                                                         | If the trace was logged within an MLflow run context, the run name is automatically displayed here.                                                                                                                                                                                                |
| Prompt         | Linked prompt versions                                                                                                                                        | If a prompt in [MLflow Prompt Registry](/docs/latest/genai/prompt-registry.md) is loaded during the trace scope, the prompt name and version are displayed here. See [Linking Prompts with Traces](/docs/latest/genai/prompt-registry/use-prompts-in-apps.md#linking-with-trace) for more details. |
| Source         | The entry point or script that generated the trace. If it is from a Git repository, the field links to the repository URL with the commit hash and file path. | Derived from Git metadata at runtime if available.                                                                                                                                                                                                                                                 |
| Tags           | User-defined key-value pairs                                                                                                                                  | [Trace tags](/docs/latest/genai/tracing/attach-tags.md) (excluding `mlflow.*` system keys) if set.                                                                                                                                                                                                 |
| Assessments    | Feedback scores logged to the trace, either by a human or an automated evaluation.                                                                            | See [Collecting User Feedback](/docs/latest/genai/tracing/collect-user-feedback.md) and [Evaluating Traces](/docs/latest/genai/eval-monitor.md) for how to log assessments.                                                                                                                        |
| Expectations   | Ground truth values annotated to the trace.                                                                                                                   | See [Ground Truth Expectations](/docs/latest/genai/assessments/expectations.md) for how to log expectations.                                                                                                                                                                                       |

Traces ingested via OTLP

Traces ingested through the [OTLP endpoint](/docs/latest/genai/tracing/opentelemetry/ingest.md) go through automatic attribute translation to derive these columns from framework-specific OpenTelemetry attributes. MLflow supports translation for OpenTelemetry GenAI Semantic Conventions, and various frameworks including OpenLLMetry, OpenInference, Langfuse, and more. Please see the [Attribute Mapping Reference](/docs/latest/genai/tracing/opentelemetry/attribute-mapping.md) for details on how each framework's attributes are mapped to these columns.

## Browsing Single Trace[​](#browsing-single-trace "Direct link to Browsing Single Trace")

By clicking on a trace ID `tr-...` or the request link in the trace table, you can open the detailed trace view. The detailed trace view contains rich information about your AI agent or LLM application execution, such as:

* The span tree that represents the execution flow of the trace.
* Latency of each span and the overall timeline.
* Input and output of each span.
* Tool definitions and calls.
* Exception details if the execution failed.
* Token counts and cost breakdown.
* Feedback scores and ground truth annotated on the trace.

![Browsing single trace](/docs/latest/images/llms/tracing/trace-ui-detail-view.png)

Image and Audio Content

MLflow renders images and audio inline in the trace viewer. For supported formats, framework examples, and how to attach multimodal content to traces, see [Image and Audio (Multimodal) Content in Traces](/docs/latest/genai/tracing/observe-with-traces/multimodal.md).

## Performing Actions[​](#performing-actions "Direct link to Performing Actions")

From this page, you can also perform a few actions to manage your traces.

### Searching Traces[​](#searching-traces "Direct link to Searching Traces")

Using the  search bar in the UI, you can easily filter your traces based on name, tags, or other metadata. Check out the [Searching Traces](/docs/latest/genai/tracing/search-traces.md) for details about the query string format.

![Searching traces](/docs/latest/images/llms/tracing/trace-ui-search.png)

### Filtering Traces[​](#filtering-traces "Direct link to Filtering Traces")

The  filter dropdown allows you to filter the traces table by various criteria, such as state, name, user, session, tags, feedback values, and more. See [Filtering Traces](/docs/latest/genai/tracing/search-traces.md#filtering-traces-in-the-ui) for details.

![Searching traces](/docs/latest/images/llms/tracing/trace-ui-filter.png)

### Deleting Traces[​](#deleting-traces "Direct link to Deleting Traces")

The UI supports bulk deletion of traces. Simply select the traces you want to delete by checking the checkboxes, and then pressing the "Delete" button. See [Delete Traces](/docs/latest/genai/tracing/observe-with-traces/delete-traces.md) for how to delete traces programmatically.

![Deleting traces](/docs/latest/images/llms/tracing/trace-ui-delete.png)

tip

Shift+click to select all traces in a range quickly.

### Editing Tags[​](#editing-tags "Direct link to Editing Tags")

You can also edit key-value tags on your traces via the UI. See [Trace Tags](/docs/latest/genai/tracing/attach-tags.md) for more details about trace tags.

![Editing tags](/docs/latest/images/llms/tracing/trace-ui-tags.png)

### Exporting Traces to Datasets[​](#exporting-traces-to-datasets "Direct link to Exporting Traces to Datasets")

You can export the traces to [Evaluation Datasets](/docs/latest/genai/datasets.md) by clicking the "Add to evaluation dataset" action from the actions dropdown.

![Adding traces to evaluation dataset](/docs/latest/images/llms/tracing/trace-ui-export-to-dataset.png)

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

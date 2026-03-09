# MLflow Tracing UI

## LLM and AI Agent Experiment Overview[​](#llm-and-ai-agent-experiment-overview "Direct link to LLM and AI Agent Experiment Overview")

The **Overview** tab in LLM and AI agent experiments provides comprehensive analytics and visualizations for your LLM application and AI agent traces. This tab is organized into three sub-tabs to help you monitor different aspects of your application.

All tabs include a **time range selector** and **time unit selector** to customize the granularity and range of the displayed data.

[](/docs/3.11.0/images/llms/tracing/overview_demo.mp4)

### Usage[​](#usage "Direct link to Usage")

The Usage tab displays key metrics about your trace requests over time:

* **Requests**: Shows the total number of trace requests, with an average reference line
* **Latency**: Visualizes response time distribution to help identify performance bottlenecks
* **Errors**: Tracks error rates to quickly spot issues
* **Token Usage & Token Stats**: Monitors token consumption across your traces

![Experiment Overview Usage Tab](/docs/3.11.0/assets/images/overview_usage_tab-3f972858bec76adaebb876f6c93c1fd7.png)

### Quality[​](#quality "Direct link to Quality")

The Quality tab provides insights into the quality of your LLM and AI agent outputs:

* **Quality Summary**: Provides overview of scorers result
* **Quality Insights**: Displays metrics computed by [scorers](/docs/3.11.0/genai/eval-monitor/scorers.md), with a dedicated chart for each assessment type
* Charts are dynamically generated based on the assessments available in your traces

![Experiment Overview Quality Tab](/docs/3.11.0/assets/images/overview_quality_tab-2b09e28d9fb24da7c01b85ac8fc912ca.png)

### Tool Calls[​](#tool-calls "Direct link to Tool Calls")

The Tool Calls tab provides insights into agent tool usage:

* **Statistics Cards**: Shows at-a-glance metrics including total tool calls, average latency, success rate, and failed calls
* **Tool Performance Summary**: Provides an overview of how each tool is performing
* **Tool Usage & Latency**: Visualizes tool invocation patterns and response times
* **Tool Error Rate**: Tracks error rates per tool

![Experiment Overview Tool Calls Tab](/docs/3.11.0/assets/images/overview_tool_calls_tab-52fa54220793d89710cde32b4cb00def.png)

## Traces within MLflow Experiments[​](#traces-within-mlflow-experiments "Direct link to Traces within MLflow Experiments")

After logging your traces, you can view them in the [MLflow UI](/docs/3.11.0/genai/tracing/observe-with-traces/ui.md), under the "Traces" tab in the main experiment page. This tab is also available within the individual run pages, if your trace was logged within a run context.

![MLflow Tracking UI](/docs/3.11.0/assets/images/trace-experiment-ui-1e174436e7842bab2320c79e501839a4.png)

This table includes high-level information about the traces, such as the trace ID, the inputs / outputs of the root span, and more. From this page, you can also perform a few actions to manage your traces:

* Search
* Delete
* Edit Tags

Using the search bar in the UI, you can easily filter your traces based on name, tags, or other metadata. Check out the [search docs](/docs/3.11.0/genai/tracing/search-traces.md) for details about the query string format.

[](/docs/3.11.0/images/llms/tracing/trace-session-id.mp4)

The UI supports bulk deletion of traces. Simply select the traces you want to delete by checking the checkboxes, and then pressing the "Delete" button.

[](/docs/3.11.0/images/llms/tracing/trace-delete.mp4)

You can also edit key-value tags on your traces via the UI.

[](/docs/3.11.0/images/llms/tracing/trace-set-tag.mp4)

## Browsing span data[​](#browsing-span-data "Direct link to Browsing span data")

In order to browse the span data of an individual trace, simply click on the link in the "Trace ID" or "Trace name" columns to open the trace viewer:

[](/docs/3.11.0/images/llms/tracing/tracing-top.mp4)

## Multimodal Content[​](#multimodal-content "Direct link to Multimodal Content")

The MLflow Trace UI supports rendering multimodal content in chat-style spans, including images and audio.

### Images[​](#images "Direct link to Images")

When traced LLM calls include image content parts (using the `image_url` type), images are rendered inline within chat messages in the trace viewer. Both URLs and base64-encoded data URIs are supported.

python

```
import mlflow
import openai

mlflow.openai.autolog()

client = openai.OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/image.png"},
                },
            ],
        }
    ],
)
```

![Image content rendered inline in the trace viewer](/docs/3.11.0/assets/images/trace-image-content-a17f5ef35bd737c5ccd1c9927b6e1177.png)

### Audio[​](#audio "Direct link to Audio")

When traced LLM calls include audio content parts (using the `input_audio` type), the trace UI renders an inline audio player so you can play back the audio directly. Supported formats are **WAV** and **MP3**.

python

```
import base64
import mlflow
import openai

mlflow.openai.autolog()

client = openai.OpenAI()

# Read audio file and encode as base64
with open("audio.wav", "rb") as f:
    audio_data = base64.b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What is in this audio?"},
                {
                    "type": "input_audio",
                    "input_audio": {"data": audio_data, "format": "wav"},
                },
            ],
        }
    ],
)
```

![Audio content rendered with an inline player in the trace viewer](/docs/3.11.0/assets/images/trace-audio-player-9cff82ff97b49b3b9f962c06023214b2.png)

### Manual Tracing with Multimodal Content[​](#manual-tracing-with-multimodal-content "Direct link to Manual Tracing with Multimodal Content")

You can also attach multimodal content to spans when using [manual tracing](/docs/3.11.0/genai/tracing/app-instrumentation/manual-tracing.md). Set the `mlflow.chat.messages` span attribute with content parts following the OpenAI format:

python

```
import mlflow

with mlflow.start_span(name="multimodal-span", span_type="llm") as span:
    span.set_attribute(
        "mlflow.chat.messages",
        [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this audio"},
                    {
                        "type": "input_audio",
                        "input_audio": {
                            "data": "<base64-encoded-audio>",
                            "format": "wav",
                        },
                    },
                ],
            }
        ],
    )
```

## Jupyter Notebook integration[​](#jupyter-notebook-integration "Direct link to Jupyter Notebook integration")

note

The MLflow Tracing Jupyter integration is available in **MLflow 2.20 and above**

You can also view the trace UI directly within Jupyter notebooks, allowing you to debug your applications without having to tab out of your development environment.

![Jupyter Trace UI](/docs/3.11.0/assets/images/jupyter-trace-ui-a11c56c439864da666540e9d501329cb.png)

This feature requires using an [MLflow Tracking Server](/docs/3.11.0/self-hosting/architecture/tracking-server.md), as this is where the UI assets are fetched from. To get started, simply ensure that the MLflow Tracking URI is set to your tracking server (e.g. `mlflow.set_tracking_uri("http://localhost:5000")`).

By default, the trace UI will automatically be displayed for the following events:

1. When the cell code generates a trace (e.g. via [automatic tracing](/docs/3.11.0/genai/tracing/app-instrumentation/automatic.md), or by running a manually traced function)
2. When [`mlflow.search_traces()`](/docs/3.11.0/api_reference/python_api/mlflow.html#mlflow.search_traces) is called
3. When a [`mlflow.entities.Trace()`](/docs/3.11.0/api_reference/python_api/mlflow.entities.html#mlflow.entities.Trace) object is displayed (e.g. via IPython's `display` function, or when it is the last value returned in a cell)

To disable the display, simply call [`mlflow.tracing.disable_notebook_display()`](/docs/3.11.0/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.disable_notebook_display), and rerun the cell containing the UI. To enable it again, call [`mlflow.tracing.enable_notebook_display()`](/docs/3.11.0/api_reference/python_api/mlflow.tracing.html#mlflow.tracing.enable_notebook_display).

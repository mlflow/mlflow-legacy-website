# Tracing OpenCode

[MLflow Tracing](/docs/latest/genai/tracing.md) provides automatic tracing for [OpenCode](https://opencode.ai), a terminal-based agentic coding tool that supports multiple LLM providers including Claude, OpenAI, Google, and local models.

![OpenCode Tracing](/docs/latest/images/llms/opencode/opencode-tracing.png)

After setting up the MLflow plugin, MLflow will automatically capture traces of your OpenCode conversations and log them to the specified MLflow experiment. The trace automatically captures information such as:

* User prompts and assistant responses
* Tool usage (file operations, bash commands, code edits, etc.)
* Conversation timing and duration per turn
* Token usage (input, output, and total tokens)

## Setup[​](#setup "Direct link to Setup")

OpenCode tracing is configured using the `@mlflow/opencode` plugin and environment variables.

### Requirements[​](#requirements "Direct link to Requirements")

* [OpenCode CLI](https://opencode.ai) installed
* Node.js runtime (for the plugin)
* The `@mlflow/opencode` npm package
* An MLflow tracking server running

### Step 1: Install the Plugin[​](#step-1-install-the-plugin "Direct link to Step 1: Install the Plugin")

bash

```
npm install @mlflow/opencode
```

### Step 2: Configure OpenCode[​](#step-2-configure-opencode "Direct link to Step 2: Configure OpenCode")

Add the plugin to your `opencode.json` file:

json

```
{
  "plugin": ["@mlflow/opencode"]
}
```

### Step 3: Set Environment Variables[​](#step-3-set-environment-variables "Direct link to Step 3: Set Environment Variables")

Create a `.env` file in your project root with the MLflow connection settings. OpenCode automatically loads `.env` files on startup, so the configuration persists across sessions:

.env

bash

```
MLFLOW_TRACKING_URI=http://localhost:5000
MLFLOW_EXPERIMENT_ID=123456
```

Alternatively, you can set them in your shell:

bash

```
export MLFLOW_TRACKING_URI=http://localhost:5000
export MLFLOW_EXPERIMENT_ID=123456
```

### Step 4: Start MLflow Server (if not already running)[​](#step-4-start-mlflow-server-if-not-already-running "Direct link to Step 4: Start MLflow Server (if not already running)")

You can start an MLflow server using [Docker Compose](/docs/latest/self-hosting.md#docker-compose), which doesn't require a Python environment:

bash

```
docker compose up -d
```

Alternatively, if you have Python and `mlflow` installed:

bash

```
mlflow server
```

### Step 5: Run OpenCode[​](#step-5-run-opencode "Direct link to Step 5: Run OpenCode")

bash

```
# Run OpenCode normally - tracing happens automatically
opencode
```

Traces will be automatically created when your OpenCode session becomes idle (after each conversation turn).

## Configuration Reference[​](#configuration-reference "Direct link to Configuration Reference")

The plugin is configured entirely via environment variables:

| Environment Variable    | Required | Description                                                |
| ----------------------- | -------- | ---------------------------------------------------------- |
| `MLFLOW_TRACKING_URI`   | Yes      | MLflow tracking server URI (e.g., `http://localhost:5000`) |
| `MLFLOW_EXPERIMENT_ID`  | Yes      | Experiment ID to log traces to                             |
| `MLFLOW_OPENCODE_DEBUG` | No       | Set to `true` to enable debug logging to stderr            |

### Configuration Examples[​](#configuration-examples "Direct link to Configuration Examples")

bash

```
# Local MLflow server
export MLFLOW_TRACKING_URI=http://localhost:5000
export MLFLOW_EXPERIMENT_ID=0

# Remote MLflow server
export MLFLOW_TRACKING_URI=http://mlflow.example.com:5000
export MLFLOW_EXPERIMENT_ID=123456

# Databricks MLflow
export MLFLOW_TRACKING_URI=databricks
export MLFLOW_EXPERIMENT_ID=123456789
```

## Token Usage[​](#token-usage "Direct link to Token Usage")

MLflow automatically tracks the token usage for each LLM call within OpenCode conversations. The token usage for each LLM call is logged in the `mlflow.chat.tokenUsage` attribute. The token usage and cost will be displayed in the Overview dashboard and the trace detail page.

![OpenCode Trace Overview](/docs/latest/images/llms/opencode/opencode-overview.png)

## Session and User Tracking[​](#session-and-user-tracking "Direct link to Session and User Tracking")

The plugin automatically tracks session and user metadata for each trace:

* **Session ID**: Each OpenCode session is tagged with `mlflow.trace.session`, allowing you to group and filter traces by session.
* **User**: The current system user is tagged with `mlflow.trace.user`, making it easy to identify who initiated each conversation.

![OpenCode Session Tracking](/docs/latest/images/llms/opencode/opencode-session.png)

You can use these metadata fields to filter traces in the MLflow UI or via the search API. For more details on session and user tracking, see [Track Users and Sessions](/docs/latest/genai/tracing/track-users-sessions.md).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Debug Logging[​](#debug-logging "Direct link to Debug Logging")

Enable debug logging to see detailed information about trace creation:

bash

```
export MLFLOW_OPENCODE_DEBUG=true
opencode
```

Debug output is written to stderr to avoid interfering with OpenCode's TUI.

### Common Issues[​](#common-issues "Direct link to Common Issues")

**Traces not appearing:**

1. Verify environment variables are set correctly:

   bash

   ```
   echo $MLFLOW_TRACKING_URI
   echo $MLFLOW_EXPERIMENT_ID
   ```

2. Check that the MLflow server is accessible:

   bash

   ```
   curl $MLFLOW_TRACKING_URI/api/2.0/mlflow/experiments/list
   ```

3. Enable debug logging to see any errors:

   bash

   ```
   export MLFLOW_OPENCODE_DEBUG=true
   ```

**Plugin not loading:**

1. Verify the plugin is installed:

   bash

   ```
   npm ls @mlflow/opencode
   ```

2. Check that `opencode.json` contains the plugin:

   json

   ```
   {
     "plugin": ["@mlflow/opencode"]
   }
   ```

**Missing token usage:**

Token usage is only available when the LLM provider reports it. Some providers or configurations may not include token counts in their responses.

### Disable Tracing[​](#disable-tracing "Direct link to Disable Tracing")

To stop automatic tracing, remove the plugin from your `opencode.json`:

json

```
{
  "plugin": []
}
```

Or unset the environment variables:

bash

```
unset MLFLOW_TRACKING_URI
unset MLFLOW_EXPERIMENT_ID
```

Existing traces are preserved - disabling only stops new traces from being created.

# Registering and Versioning Scorers

Scorers can be registered to MLflow experiments for version control and team collaboration.

A scorer's version history is identified by its experiment and registered name. The first registration creates version 1, and registering another scorer with the same name in the same experiment creates the next version. Existing versions remain available until you delete them.

## How scorer versioning works[​](#how-scorer-versioning-works "Direct link to How scorer versioning works")

| Action                                                         | Version behavior                      |
| -------------------------------------------------------------- | ------------------------------------- |
| Register a name for the first time in an experiment            | Creates version 1                     |
| Register the same name again in the same experiment            | Creates the next version              |
| Register the same name in a different experiment               | Starts an independent version history |
| Call `get_scorer()` without a version or call `list_scorers()` | Returns the latest version            |
| Call `get_scorer(version=...)`                                 | Returns a specific version            |

## Supported Scorers[​](#supported-scorers "Direct link to Supported Scorers")

| Scorer Type                                                                             | Supported                                                                        |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Custom LLM Judges](/docs/3.15.0/genai/eval-monitor/scorers/llm-judge/custom-judges.md) | ✅                                                                               |
| [Code-based Scorers](/docs/3.15.0/genai/eval-monitor/scorers/custom.md)                 | ❌                                                                               |
| [Guidelines Judges](/docs/3.15.0/genai/eval-monitor/scorers/llm-judge/guidelines.md)    | ❌ (Use [MLflow Prompt Registry](/docs/3.15.0/genai/prompt-registry.md) instead) |
| [Built-in Judges](/docs/3.15.0/genai/eval-monitor/scorers/llm-judge/predefined.md)      | ✅                                                                               |

* UI
* SDK

### Registering a Scorer[​](#registering-a-scorer "Direct link to Registering a Scorer")

When you create a judge using the [Judge Builder UI](/docs/3.15.0/genai/eval-monitor/scorers/llm-judge/custom-judges.md), it is automatically registered to the current experiment as version 1.

### Updating a Scorer[​](#updating-a-scorer "Direct link to Updating a Scorer")

1. Navigate to the **Judges** tab in your experiment
2. Click the **Edit** button on the scorer you want to update
3. Modify the scorer configuration (instructions, model, output type, etc.)
4. Click **Save**. This will create a new version of the scorer.

### Deleting a Scorer[​](#deleting-a-scorer "Direct link to Deleting a Scorer")

1. Navigate to the **Judges** tab in your experiment
2. Click the **Delete** button on the scorer you want to remove

### Prerequisite[​](#prerequisite "Direct link to Prerequisite")

Judges are registered to an **MLflow Experiment** (not Run-level). Set an active experiment or pass its ID to each scorer registry API.

python

```
import mlflow



mlflow.set_tracking_uri("your-tracking-uri")

experiment = mlflow.set_experiment("evaluation-judges")

experiment_id = experiment.experiment_id
```

Define a sample template-based LLM scorer:

python

```
from mlflow.genai.judges import make_judge



quality_judge = make_judge(

    name="response_quality",

    instructions=("Evaluate if {{ outputs }} is high quality for {{ inputs }}."),

    model="anthropic:/claude-opus-4-1-20250805",

    feedback_value_type=str,

)
```

### Registering a Scorer[​](#registering-a-scorer-1 "Direct link to Registering a Scorer")

To register a judge to the experiment, call the [`register()`](/docs/3.15.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.Scorer.register) method on the judge instance. The first registration creates version 1.

python

```
registered_v1 = quality_judge.register(experiment_id=experiment_id)
```

### Updating a Scorer[​](#updating-a-scorer-1 "Direct link to Updating a Scorer")

Registering a new scorer with the same name will create a new version.

python

```
# Update and register a new version of the judge

quality_judge_v2 = make_judge(

    name="response_quality",  # Same name

    instructions=(

        "Evaluate if {{ outputs }} is high quality, accurate, and complete "

        "for the question in {{ inputs }}."

    ),

    model="anthropic:/claude-3.5-sonnet-20241022",  # Updated model

    feedback_value_type=str,

)



# Register the updated judge

registered_v2 = quality_judge_v2.register(experiment_id=experiment_id)
```

### Loading a Scorer[​](#loading-a-scorer "Direct link to Loading a Scorer")

Use [`get_scorer()`](/docs/3.15.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.get_scorer) without `version` to load the highest available version, or specify a version number to load that exact definition.

python

```
from mlflow.genai import get_scorer



# Load the latest version

latest_judge = get_scorer(

    name="response_quality",

    experiment_id=experiment_id,

)



# Load version 1

v1_judge = get_scorer(

    name="response_quality",

    experiment_id=experiment_id,

    version=1,

)
```

Pin a specific version for regression tests and other workflows that must remain reproducible. Load the latest version when the workflow should automatically adopt scorer updates.

### Listing Scorers[​](#listing-scorers "Direct link to Listing Scorers")

Use [`list_scorers()`](/docs/3.15.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.list_scorers) to retrieve the latest version of each registered scorer.

python

```
from mlflow.genai import list_scorers



all_scorers = list_scorers(experiment_id=experiment_id)

for scorer in all_scorers:

    print(f"Scorer: {scorer.name}, Model: {scorer.model}")
```

### Deleting Scorer Versions[​](#deleting-scorer-versions "Direct link to Deleting Scorer Versions")

Use [`delete_scorer()`](/docs/3.15.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.scorers.delete_scorer) with an explicit version number to delete one version, or pass `version="all"` to delete the scorer and its complete version history.

python

```
from mlflow.genai import delete_scorer



# Delete only version 1.

delete_scorer(

    name="response_quality",

    experiment_id=experiment_id,

    version=1,

)



# Delete every remaining version.

delete_scorer(

    name="response_quality",

    experiment_id=experiment_id,

    version="all",

)
```

# Deploy MLflow Model as a Local Inference Server

MLflow allows you to deploy your model locally using just a single command. This approach is ideal for lightweight applications or for testing your model locally before moving it to a staging or production environment.

If you are new to MLflow model deployment, please read the guide on [MLflow Deployment](/docs/latest/ml/deployment.md) first to understand the basic concepts of MLflow models and deployments.

## Deploying Inference Server[​](#deploying-inference-server "Direct link to Deploying Inference Server")

Before deploying, you must have an MLflow Model. If you don't have one, you can create a sample scikit-learn model by following the [MLflow Tracking Quickstart](/docs/latest/ml/getting-started.md). Remember to note down the model URI, such as `models:/<model_id>` (or `models:/<model_name>/<model_version>` if you registered the model in the [MLflow Model Registry](/docs/latest/ml/model-registry.md)).

Once you have the model ready, deploying to a local server is straightforward. Use the [mlflow models serve](/docs/latest/api_reference/cli.html#mlflow-models-serve) command for a one-step deployment. This command starts a local server that listens on the specified port and serves your model. Refer to the [CLI reference](/docs/latest/api_reference/cli.html#mlflow-models-serve) for available options.

bash

```
mlflow models serve -m runs:/<run_id>/model -p 5000
```

You can then send a test request to the server as follows:

bash

```
curl http://127.0.0.1:5000/invocations -H "Content-Type:application/json"  --data '{"inputs": [[1, 2], [3, 4], [5, 6]]}'
```

Several command line options are available to customize the server's behavior. For instance, the `--env-manager` option allows you to choose a specific environment manager, like Anaconda, to create the virtual environment. The `mlflow models` module also provides additional useful commands, such as building a Docker image or generating a Dockerfile. For comprehensive details, please refer to the [MLflow CLI Reference](/docs/latest/api_reference/cli.html#mlflow-models).

## Inference Server Specification[​](#local-inference-server-spec "Direct link to Inference Server Specification")

### Endpoints[​](#endpoints "Direct link to Endpoints")

The inference server provides 4 endpoints:

* `/invocations`: An inference endpoint that accepts POST requests with input data and returns predictions.

* `/ping`: Used for health checks.

* `/health`: Same as /ping

* `/version`: Returns the MLflow version.

### Accepted Input Formats[​](#accepted-input-formats "Direct link to Accepted Input Formats")

The `/invocations` endpoint accepts CSV or JSON inputs. The input format must be specified in the `Content-Type` header as either `application/json` or `application/csv`.

#### CSV Input[​](#csv-input "Direct link to CSV Input")

CSV input must be a valid pandas.DataFrame CSV representation. For example:

`curl http://127.0.0.1:5000/invocations -H 'Content-Type: application/csv' --data '1,2,3,4'`

#### JSON Input[​](#json-input "Direct link to JSON Input")

You can either pass a flat dictionary corresponding to the desired model payload or wrap the payload in a dict with a dict key that specifies your payload format.

##### Wrapped Payload Dict[​](#wrapped-payload-dict "Direct link to Wrapped Payload Dict")

If your model format is not supported above or you want to avoid transforming your input data to the required payload format, you can leverage the dict payload structures below.

| Field               | Description                                                                                                                                                                              | Example                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `dataframe_split`   | Pandas DataFrames in the `split` orientation.                                                                                                                                            | text```
{"dataframe_split": pandas_df.to_dict(orient="split")}
```     |
| `dataframe_records` | Pandas DataFrame in the records orientation. **We do not recommend using this format because it is not guaranteed to preserve column ordering.**                                         | text```
{"dataframe_records": pandas_df.to_dict(orient="records")}
``` |
| `instances`         | Tensor input formatted as described in [TF Serving's API docs](https://www.tensorflow.org/tfx/serving/api_rest#request_format_2) where the provided inputs will be cast to Numpy arrays. | text```
{"instances": [1.0, 2.0, 5.0]}
```                             |
| `inputs`            | Same as `instances` but with a different key.                                                                                                                                            | text```
{"inputs": [["Cheese"], ["and", "Crackers"]]}
```              |

Example

python

```
# Prerequisite: serve a custom pyfunc OpenAI model (not mlflow.openai) on localhost:5678

#   that defines inputs in the below format and params of `temperature` and `max_tokens`



import json

import requests



payload = json.dumps({

    "inputs": {"messages": [{"role": "user", "content": "Tell a joke!"}]},

    "params": {

        "temperature": 0.5,

        "max_tokens": 20,

    },

})

response = requests.post(

    url=f"http://localhost:5678/invocations",

    data=payload,

    headers={"Content-Type": "application/json"},

)

print(response.json())
```

The JSON input can also include an optional `params` field for passing additional parameters. Valid parameter types are `Union[DataType, List[DataType], None]`, where DataType is [`MLflow data types`](/docs/latest/api_reference/python_api/mlflow.types.html#mlflow.types.DataType). To pass parameters, a valid [Model Signature](/docs/latest/ml/model/signatures.md) with `params` must be defined.

bash

```
curl http://127.0.0.1:5000/invocations -H 'Content-Type: application/json' -d '{

    "inputs": {"question": ["What color is it?"],

                "context": ["Some people said it was green but I know that it is pink."]},

    "params": {"max_answer_len": 10}

}'
```

note

Since JSON discards type information, MLflow will cast the JSON input to the input type specified in the model's schema if available. If your model is sensitive to input types, it is recommended that a schema is provided for the model to ensure that type mismatch errors do not occur at inference time. In particular, Deep Learning models are typically strict about input types and will need a model schema in order for the model to score correctly. For complex data types, see [Encoding complex data](#encoding-complex-data) below.

##### Raw Payload Dict[​](#raw-payload-dict "Direct link to Raw Payload Dict")

If your payload is in a format that your mlflow served model will accept and it's in the supported models below, you can pass a raw payload dict.

| Supported Request Format | Description                                                                                | Example                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| OpenAI Chat              | [OpenAI chat request payload](https://platform.openai.com/docs/api-reference/chat/create)† | text```
{

    "messages": [{"role": "user", "content": "Tell a joke!"}],  # noqa

    "temperature": 0.0,

}
``` |

† Note that the `model` argument **should not** be included when using the OpenAI APIs, due to its configuration being set by the MLflow model instance. All other parameters can be freely used, provided that they are defined within the `params` argument within the logged model signature.

Example

python

```
# Prerequisite: serve a Pyfunc model accepts OpenAI-compatible chat requests on localhost:5678 that defines

#   `temperature` and `max_tokens` as parameters within the logged model signature



import json

import requests



payload = json.dumps({

    "messages": [{"role": "user", "content": "Tell a joke!"}],

    "temperature": 0.5,

    "max_tokens": 20,

})

requests.post(

    url=f"http://localhost:5678/invocations",

    data=payload,

    headers={"Content-Type": "application/json"},

)

print(requests.json())
```

#### Encoding complex data[​](#encoding-complex-data "Direct link to Encoding complex data")

Complex data types, such as dates or binary, do not have a native JSON representation. If you include a model signature, MLflow can automatically decode supported data types from JSON. The following data type conversions are supported:

* binary: data is expected to be base64 encoded, MLflow will automatically base64 decode.

* datetime: data is expected to be encoded as a string according to [ISO 8601 specification](https://www.iso.org/iso-8601-date-and-time-format.html). MLflow will parse this into the appropriate datetime representation on the given platform.

Example requests:

bash

```
# record-oriented DataFrame input with binary column "b"

curl http://127.0.0.1:5000/invocations -H 'Content-Type: application/json' -d '[

    {"a": 0, "b": "dGVzdCBiaW5hcnkgZGF0YSAw"},

    {"a": 1, "b": "dGVzdCBiaW5hcnkgZGF0YSAx"},

    {"a": 2, "b": "dGVzdCBiaW5hcnkgZGF0YSAy"}

]'



# record-oriented DataFrame input with datetime column "b"

curl http://127.0.0.1:5000/invocations -H 'Content-Type: application/json' -d '[

    {"a": 0, "b": "2020-01-01T00:00:00Z"},

    {"a": 1, "b": "2020-02-01T12:34:56Z"},

    {"a": 2, "b": "2021-03-01T00:00:00Z"}

]'
```

## Serving Framework[​](#serving-framework "Direct link to Serving Framework")

MLflow uses [FastAPI](https://fastapi.tiangolo.com/), a modern ASGI web application framework for Python, to serve the inference endpoint. FastAPI handles requests asynchronously and is recognized as one of the fastest Python frameworks. This production-ready framework works well for most use cases.

## Running Batch Inference[​](#running-batch-inference "Direct link to Running Batch Inference")

Instead of running an online inference endpoint, you can execute a single batch inference job on local files using the [mlflow models predict](/docs/latest/api_reference/cli.html#mlflow-models-predict) command. The following command runs the model prediction on `input.csv` and outputs the results to `output.csv`.

* Bash
* Python

bash

```
mlflow models predict -m models:/<model_id> -i input.csv -o output.csv
```

python

```
import mlflow



model = mlflow.pyfunc.load_model("models:/<model_id>")

predictions = model.predict(pd.read_csv("input.csv"))

predictions.to_csv("output.csv")
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

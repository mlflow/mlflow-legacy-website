# Tracing TypeSafe AI

[MLflow Tracing](/docs/3.17.0/genai/tracing.md) provides automatic tracing for [TypeSafe AI System One](https://docs.typesafe.ai/concepts/system-one). In Python, calling

[`mlflow.typesafe.autolog()`](/docs/3.17.0/api_reference/python_api/mlflow.typesafe.html#mlflow.typesafe.autolog) instruments `system_one` on both the synchronous and asynchronous TypeSafe AI clients. In JavaScript and TypeScript, `tracedTypeSafe()` returns a traced client that instruments `systemOne`.

Each System One trace captures:

* The effective state, questions, model, and additional request-body fields
* The serialized response, including structured answers and the model when available
* Input, output, and total token usage when reported by the SDK response
* Latency and exceptions
* The TypeSafe request ID when available

MLflow excludes the SDK's dedicated API-key, header, retry, and timeout options. Because `state`, `questions`, and additional request-body fields are traced, do not place secrets in them.

## Getting Started[​](#getting-started "Direct link to Getting Started")

1

### Install Dependencies

* Python
* JS / TS

bash

```
pip install mlflow typesafe-sdk
```

bash

```
npm install @mlflow/core @mlflow/typesafe @typesafe-ai/sdk
```

2

### Start MLflow Server

* Local (pip)
* Local (docker)

If you have a local Python environment >= 3.10, you can start the MLflow server locally using the `mlflow` CLI command.

bash

```
mlflow server
```

MLflow also provides a Docker Compose file to start a local MLflow server with a postgres database and a minio server.

bash

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/mlflow/mlflow.git

cd mlflow

git sparse-checkout set docker-compose

cd docker-compose

cp .env.dev.example .env

docker compose up -d
```

Refer to the [instruction](https://github.com/mlflow/mlflow/tree/master/docker-compose/README.md) for more details, e.g., overriding the default environment variables.

3

### Enable Tracing and Make API Calls

Set `TYPESAFE_API_KEY`, enable tracing, and use the TypeSafe AI SDK as usual:

* Python
* JS / TS

python

```
from typesafe_sdk import Noul, TypeSafeClient



import mlflow



mlflow.set_tracking_uri("http://localhost:5000")

mlflow.set_experiment("TypeSafe AI")

mlflow.typesafe.autolog()



with TypeSafeClient() as client:

    result = client.system_one(

        state={

            "question": "What is MLflow?",

            "answer": "A platform for managing the machine learning lifecycle.",

        },

        questions={

            "relevance": Noul(instructions="Is the answer relevant to the question?"),

        },

    )



print(result.nouls["relevance"].noul)
```

typescript

```
import * as mlflow from "@mlflow/core";

import { TypeSafeClient, noul } from "@typesafe-ai/sdk";

import { tracedTypeSafe } from "@mlflow/typesafe";



mlflow.init({

  trackingUri: "http://localhost:5000",

  experimentId: "<experiment-id>",

});



const client = tracedTypeSafe(new TypeSafeClient());

const result = await client.systemOne({

  state: {

    question: "What is MLflow?",

    answer: "A platform for managing the machine learning lifecycle.",

  },

  questions: {

    relevance: noul("Is the answer relevant to the question?"),

  },

});



console.log(result.answers.relevance.noul);
```

4

### View Traces in MLflow UI

Open the MLflow UI at `http://localhost:5000` (or your MLflow server URL) and select the experiment's **Traces** tab.

## Supported APIs[​](#supported-apis "Direct link to Supported APIs")

| SDK     | API          | Support                              | Streaming |
| ------- | ------------ | ------------------------------------ | --------- |
| Python  | `system_one` | Synchronous and asynchronous clients | -         |
| JS / TS | `systemOne`  | Native `APIPromise`                  | -         |

Python synchronous calls use `TypeSafeClient.system_one`; asynchronous calls use `AsyncTypeSafeClient.system_one`. JavaScript and TypeScript calls use `TypeSafeClient.systemOne`. Neither SDK provides a streaming System One API. Other operations, such as `models.list()`, are not traced.

## Disable Auto-Tracing[​](#disable-auto-tracing "Direct link to Disable Auto-Tracing")

In Python, disable TypeSafe AI tracing with `mlflow.typesafe.autolog(disable=True)` or disable all MLflow autologging integrations with `mlflow.autolog(disable=True)`. In JavaScript and TypeScript, `tracedTypeSafe()` does not mutate the original client, so calls made through that original client remain untraced.

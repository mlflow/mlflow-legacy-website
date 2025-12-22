# Set Up MLflow Server

MLflow is open source, and you can set up the MLflow server using either `pip` or `docker`.

Before you can leverage MLflow for your GenAI application development, you must first start the MLflow server.

* Local (pip)
* Local (docker)

**Python Environment**: Python 3.10+

For the fastest setup, you can install the `mlflow` Python package via `pip` and start the MLflow server locally.

bash

```
pip install --upgrade mlflow
mlflow server
```

MLflow provides a Docker Compose file to start a local MLflow server with a postgres database and a minio server.

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

This will start the server at port 5000 on your local machine and you can access the MLflow web UI at <http://localhost:5000>.

![MLflow UI Home](/docs/3.9.0/images/quickstart/quickstart_ui_home.png)

If you are looking for more guidance about self-hosting the MLflow server, please see the [Self-Hosting Guide](/docs/3.9.0/self-hosting.md) for more details.

info

If you are using MLflow on Databricks, please visit [this](https://docs.databricks.com/aws/en/mlflow3/genai/getting-started/) for environment setup instructions specific to Databricks.

## Next Step[​](#next-step "Direct link to Next Step")

Now that you have started the MLflow server, let's start tracing your GenAI application.

Follow [this quickstart](/docs/3.9.0/genai/tracing/quickstart.md) to send your GenAI application traces to the MLflow server.

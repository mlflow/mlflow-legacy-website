# Kubernetes Authentication

MLflow includes built-in request auth providers for Kubernetes environments. These providers automatically add authorization headers to outgoing MLflow client requests using Kubernetes credentials.

:::important Applicability

This provider is designed for MLflow deployments behind a proxy with Kubernetes-based authentication, such as [kube-rbac-proxy](https://github.com/brancz/kube-rbac-proxy), or a custom auth MLflow plugin.

If your MLflow deployment does not use Kubernetes-based authentication, this provider is not applicable.

:::

## Overview[​](#overview "Direct link to Overview")

Two auth providers are available, selected via `MLFLOW_TRACKING_AUTH`:

| Provider          | `MLFLOW_TRACKING_AUTH` value | Headers added                            |
| ----------------- | ---------------------------- | ---------------------------------------- |
| Token-only        | `kubernetes`                 | `Authorization`                          |
| Token + workspace | `kubernetes-namespaced`      | `Authorization` and `X-MLFLOW-WORKSPACE` |

The `kubernetes` provider adds only a bearer token. The `kubernetes-namespaced` provider also adds an `X-MLFLOW-WORKSPACE` header derived from the Kubernetes namespace.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Python
* TypeScript

bash

```
pip install mlflow[kubernetes]
```

bash

```
npm install @mlflow/core
```

`@kubernetes/client-node` is automatically installed alongside `@mlflow/core` for kubeconfig-based credential resolution.

## Configuration[​](#configuration "Direct link to Configuration")

For token-only authentication:

bash

```
export MLFLOW_TRACKING_AUTH=kubernetes
```

To also attach workspace headers (namespace-based workspace routing):

bash

```
export MLFLOW_TRACKING_AUTH=kubernetes-namespaced
```

No additional configuration is needed. The provider automatically discovers credentials from the environment.

## Credential Sources[​](#credential-sources "Direct link to Credential Sources")

The provider tries two credential sources in order for each piece of information, using the first one that succeeds. The namespace and token are resolved independently and may come from different sources.

### 1. Service Account (in-cluster)[​](#1-service-account-in-cluster "Direct link to 1. Service Account (in-cluster)")

When running inside a Kubernetes pod, the provider reads the mounted service account files:

* **Namespace**: `/var/run/secrets/kubernetes.io/serviceaccount/namespace`
* **Token**: `/var/run/secrets/kubernetes.io/serviceaccount/token`

This is the default path for pods with a service account mounted (which is the standard Kubernetes behavior).

### 2. Kubeconfig[​](#2-kubeconfig "Direct link to 2. Kubeconfig")

When service account files are not available, the provider falls back to kubeconfig:

* **Namespace**: Extracted from the active context
* **Token**: Resolved via the Kubernetes client library, which handles exec-based auth flows (EKS, GKE, AKS, OpenShift, OIDC)

## Usage[​](#usage "Direct link to Usage")

Once configured, no code changes are needed. All MLflow client calls will automatically include the authorization headers with values sourced from Kubernetes:

* Python
* TypeScript

python

```
import mlflow



mlflow.set_tracking_uri("http://mlflow-server:5000")



with mlflow.start_run():

    mlflow.log_param("learning_rate", 0.01)

    mlflow.log_metric("accuracy", 0.95)
```

typescript

```
import * as mlflow from "@mlflow/core";



mlflow.init({

  trackingUri: "http://mlflow-server:5000",

  experimentId: "0",

});



const processRequest = mlflow.trace(

  async (prompt: string) => {

    return `Processed: ${prompt}`;

  },

  { name: "process-request" }

);



await processRequest("Hello from Kubernetes!");
```

note

The TypeScript SDK supports [tracing](/docs/3.16.0/genai/tracing.md) for GenAI applications. [Experiment tracking](/docs/3.16.0/ml/tracking/quickstart.md) APIs (`start_run`, `log_param`, `log_metric`) are available in the Python SDK only.

If a workspace is explicitly set (via `MLFLOW_WORKSPACE`, or additionally `mlflow.set_workspace()` in Python), it takes priority over the Kubernetes namespace. The namespace from Kubernetes credentials is used as a default when no workspace is specified.

Similarly, if `MLFLOW_TRACKING_TOKEN` is set, it is used as the bearer token instead of resolving one from Kubernetes credentials.

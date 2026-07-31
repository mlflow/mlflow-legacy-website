# Kubernetes Helm Deployment

[The MLflow Helm chart](https://github.com/mlflow/mlflow/tree/master/charts) provides a production-ready way to deploy MLflow on any Kubernetes cluster.

The chart ships with:

* **MLflow tracking server** with configurable CLI options
* **TLS support** via an existing Kubernetes Secret
* **Persistent storage** with a PersistentVolumeClaim for SQLite or file-based artifact stores
* **Ingress** for external access
* **Prometheus metrics** and optional ServiceMonitor for the Prometheus Operator
* **NetworkPolicy** restricting ingress and egress to required ports
* **RBAC** with namespace-scoped and cluster-scoped rules
* **Garbage collection** via an optional CronJob that runs `mlflow gc`

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Kubernetes 1.23+
* Helm 3.8+
* `kubectl` configured to point at your cluster

## Getting the Chart[​](#getting-the-chart "Direct link to Getting the Chart")

Released chart versions are published to GitHub Container Registry as OCI artifacts. Published versions can be installed directly from the registry:

bash

```
helm install mlflow oci://ghcr.io/mlflow/charts/mlflow \

  --version <version> \

  --namespace mlflow \

  --create-namespace
```

Available versions are listed under the [mlflow organization packages](https://github.com/orgs/mlflow/packages). New chart versions are published by the MLflow release automation.

Alternatively, download [the chart source](https://github.com/mlflow/mlflow/tree/master/charts) to your current working directory and install from the local path:

bash

```
helm install mlflow ./charts --namespace mlflow --create-namespace
```

The examples on this page install from a local checkout. In the `helm install` and `helm upgrade` commands, `./charts` can be replaced with `oci://ghcr.io/mlflow/charts/mlflow --version <version>`, but examples that pass repo-local files (such as `charts/example-mlflow-charts.yaml`) still need those files checked out locally.

For the full list of configurable values, see [the chart README](https://github.com/mlflow/mlflow/blob/master/charts/README.md) or run:

bash

```
helm show values oci://ghcr.io/mlflow/charts/mlflow --version <version>
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

The simplest path — no external database or object store required. MLflow stores metadata in SQLite and artifacts on a PersistentVolumeClaim.

### 1. Install the chart[​](#1-install-the-chart "Direct link to 1. Install the chart")

bash

```
helm install mlflow ./charts \

  --namespace mlflow \

  --create-namespace \

  --set storage.enabled=true \

  --set mlflow.backendStoreUri="sqlite:////mlflow/mlflow.db" \

  --set mlflow.artifactsDestination="/mlflow/artifacts"
```

### 2. Wait for the pod to become ready[​](#2-wait-for-the-pod-to-become-ready "Direct link to 2. Wait for the pod to become ready")

bash

```
kubectl get pods -n mlflow -w
```

You should see:

text

```
NAME                             READY   STATUS    RESTARTS   AGE

mlflow-mlflow-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
```

### 3. Access the UI[​](#3-access-the-ui "Direct link to 3. Access the UI")

bash

```
kubectl port-forward -n mlflow svc/mlflow-mlflow 5000:5000
```

Open <http://localhost:5000> in your browser.

SQLite is not production-safe

SQLite and local file storage are not suitable for multi-user or high-concurrency deployments. For production, use a PostgreSQL backend and a cloud object store. See [Production Deployment](#production-deployment) below.

## Production Deployment[​](#production-deployment "Direct link to Production Deployment")

### Backend Store (PostgreSQL)[​](#backend-store-postgresql "Direct link to Backend Store (PostgreSQL)")

Store the database URI in a Kubernetes Secret to avoid exposing credentials in values files:

bash

```
kubectl create secret generic mlflow-db-secret \

  --namespace mlflow \

  --from-literal=uri="postgresql://user:password@postgres:5432/mlflow"
```

Reference the Secret in your values file:

my-values.yaml

yaml

```
mlflow:

  backendStoreUriFrom:

    secretKeyRef:

      name: mlflow-db-secret

      key: uri
```

### Artifact Store (S3)[​](#artifact-store-s3 "Direct link to Artifact Store (S3)")

bash

```
kubectl create secret generic s3-credentials \

  --namespace mlflow \

  --from-literal=access-key-id=<key> \

  --from-literal=secret-access-key=<secret>
```

my-values.yaml

yaml

```
mlflow:

  artifactsDestination: "s3://my-bucket/mlflow"



env:

  - name: AWS_ACCESS_KEY_ID

    valueFrom:

      secretKeyRef:

        name: s3-credentials

        key: access-key-id

  - name: AWS_SECRET_ACCESS_KEY

    valueFrom:

      secretKeyRef:

        name: s3-credentials

        key: secret-access-key
```

For GCS or Azure Blob Storage, supply the equivalent credentials and URIs (`gs://...` or `wasbs://...`).

### TLS[​](#tls "Direct link to TLS")

Create a TLS Secret from your certificate and key:

bash

```
kubectl create secret tls mlflow-tls \

  --namespace mlflow \

  --cert=tls.crt \

  --key=tls.key
```

Enable TLS in your values file:

my-values.yaml

yaml

```
tls:

  enabled: true

  secretName: mlflow-tls
```

### Ingress[​](#ingress "Direct link to Ingress")

MLflow's host-validation middleware only allows `localhost` and private-IP hosts by default. When exposing MLflow through an Ingress with a public hostname, set `allowed_hosts` to match that hostname — otherwise requests are rejected with HTTP 403.

my-values.yaml

yaml

```
server:

  value_options:

    allowed_hosts: "mlflow.example.com"



ingress:

  enabled: true

  className: nginx

  hosts:

    - host: mlflow.example.com

      paths:

        - path: /

          pathType: Prefix

  tls:

    - secretName: mlflow-tls

      hosts:

        - mlflow.example.com
```

Deploy with your values:

bash

```
helm install mlflow ./charts \

  --namespace mlflow \

  --create-namespace \

  -f my-values.yaml
```

### Workspaces[​](#workspaces "Direct link to Workspaces")

[Workspaces](/docs/latest/self-hosting/workspaces.md) partition experiments, registered models, prompts, and artifacts across teams on a shared server. Enabling workspaces requires a SQL database backend (PostgreSQL, MySQL, or MSSQL — not a file-based store) and a `defaultArtifactRoot`.

my-values.yaml

yaml

```
server:

  flag_options:

    - enable_workspaces
```

When `garbageCollection` is enabled, set `allWorkspaces: true` so the GC job cleans up soft-deleted resources across every workspace instead of only the default one:

my-values.yaml

yaml

```
garbageCollection:

  enabled: true

  schedule: "0 2 * * 0"

  allWorkspaces: true
```

See [Getting Started with Workspaces](/docs/latest/self-hosting/workspaces/getting-started.md) for workspace creation and client configuration.

### Basic HTTP Auth[​](#basic-http-auth "Direct link to Basic HTTP Auth")

MLflow's built-in basic-auth plugin requires a CSRF secret key. Store it in a Kubernetes Secret:

bash

```
kubectl create secret generic mlflow-auth-secret \

  --namespace mlflow \

  --from-literal=secret-key="$(openssl rand -hex 32)"
```

Reference the secret and enable the plugin in your values file:

my-values.yaml

yaml

```
server:

  value_options:

    app_name: "basic-auth"



env:

  - name: MLFLOW_FLASK_SERVER_SECRET_KEY

    valueFrom:

      secretKeyRef:

        name: mlflow-auth-secret

        key: secret-key
```

See [Basic HTTP Auth](/docs/latest/self-hosting/security/basic-http-auth.md) for user and permission management.

## Configuration Reference[​](#configuration-reference "Direct link to Configuration Reference")

### Persistent Local Storage[​](#persistent-local-storage "Direct link to Persistent Local Storage")

Enable a PersistentVolumeClaim for SQLite or local file artifact storage:

yaml

```
storage:

  enabled: true

  size: 10Gi

  storageClassName: "gp2"   # match your cluster (e.g. "standard" for kind/minikube)



mlflow:

  backendStoreUri: "sqlite:////mlflow/mlflow.db"

  artifactsDestination: "/mlflow/artifacts"
```

### Prometheus Metrics[​](#prometheus-metrics "Direct link to Prometheus Metrics")

yaml

```
metrics:

  enabled: true

  path: /metrics



serviceMonitor:

  enabled: true   # requires Prometheus Operator
```

### Garbage Collection[​](#garbage-collection "Direct link to Garbage Collection")

Periodically remove soft-deleted runs, experiments, and their artifacts:

yaml

```
garbageCollection:

  enabled: true

  schedule: "0 2 * * 0"   # weekly at 2 AM on Sunday

  olderThan: "30d"         # only remove resources soft-deleted for 30+ days
```

### Resource Limits[​](#resource-limits "Direct link to Resource Limits")

yaml

```
resources:

  requests:

    cpu: 500m

    memory: 512Mi

  limits:

    cpu: 2000m

    memory: 2Gi
```

### Server Options[​](#server-options "Direct link to Server Options")

Pass any `mlflow server` CLI flag via `server.value_options` (key/value) or `server.flag_options` (bare flags):

yaml

```
server:

  value_options:

    host: "0.0.0.0"

    port: 5000

    workers: 4



  flag_options: []

  # - no_serve_artifacts
```

## Full Example: PostgreSQL + S3[​](#full-example-postgresql--s3 "Direct link to Full Example: PostgreSQL + S3")

The repository ships a production-oriented example at [`charts/example-mlflow-charts.yaml`](https://github.com/mlflow/mlflow/blob/master/charts/example-mlflow-charts.yaml).

bash

```
helm install mlflow ./charts \

  --namespace mlflow \

  --create-namespace \

  -f charts/example-mlflow-charts.yaml
```

## Upgrade[​](#upgrade "Direct link to Upgrade")

From the registry, pass the chart version to upgrade to:

bash

```
helm upgrade mlflow oci://ghcr.io/mlflow/charts/mlflow \

  --version <version> \

  --namespace mlflow \

  -f my-values.yaml
```

From a local checkout:

bash

```
helm upgrade mlflow ./charts \

  --namespace mlflow \

  -f my-values.yaml
```

## Uninstall[​](#uninstall "Direct link to Uninstall")

bash

```
helm uninstall mlflow --namespace mlflow
```

PersistentVolumeClaims are not deleted

`helm uninstall` does not remove PersistentVolumeClaims. If `storage.enabled=true`, delete the PVC manually after uninstalling:

bash

```
kubectl delete pvc -n mlflow --all
```

## Connecting the MLflow Client[​](#connecting-the-mlflow-client "Direct link to Connecting the MLflow Client")

Once the server is running (via port-forward or Ingress), point the MLflow client at it:

python

```
import mlflow



mlflow.set_tracking_uri("http://localhost:5000")  # or your Ingress hostname



with mlflow.start_run():

    mlflow.log_param("learning_rate", 0.01)

    mlflow.log_metric("accuracy", 0.95)
```

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

* [Architecture Overview](/docs/latest/self-hosting/architecture/overview.md)
* [Backend Store](/docs/latest/self-hosting/architecture/backend-store.md)
* [Artifact Store](/docs/latest/self-hosting/architecture/artifact-store.md)
* [Network Security](/docs/latest/self-hosting/security/network.md)
* [Basic HTTP Auth](/docs/latest/self-hosting/security/basic-http-auth.md)
* [Kubernetes Auth Provider](/docs/latest/self-hosting/security/kubernetes.md)

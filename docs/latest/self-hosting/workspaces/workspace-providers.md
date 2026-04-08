# Workspace Providers

Workspace providers (also referred to as workspace stores) are pluggable backends that manage workspace metadata and determine which workspaces are visible to users. This architecture allows MLflow to integrate with existing platform constructs (for example, Kubernetes namespaces or identity providers) while providing a default SQL-backed implementation.

## Provider Architecture[​](#provider-architecture "Direct link to Provider Architecture")

Workspace providers implement `mlflow.store.workspace.abstract_store.AbstractStore`. The tracking server instantiates a single provider per process and uses it for both request routing and CRUD APIs.

### Interface[​](#interface "Direct link to Interface")

python

```
from abc import ABC, abstractmethod
from typing import Iterable

from mlflow.entities import Workspace


class AbstractStore(ABC):
    @abstractmethod
    def list_workspaces(self) -> Iterable[Workspace]: ...

    @abstractmethod
    def get_workspace(self, workspace_name: str) -> Workspace: ...

    def create_workspace(self, workspace: Workspace) -> Workspace:
        raise NotImplementedError

    def update_workspace(self, workspace: Workspace) -> Workspace:
        raise NotImplementedError

    def delete_workspace(self, workspace_name: str) -> None:
        raise NotImplementedError

    def get_default_workspace(self) -> Workspace:
        raise NotImplementedError

    def resolve_artifact_root(
        self, default_artifact_root: str | None, workspace_name: str
    ) -> tuple[str | None, bool]:
        return default_artifact_root, True
```

Concrete providers may implement the optional methods to support provisioning, updates, or custom artifact routing.

### Provider Discovery and Configuration[​](#provider-discovery-and-configuration "Direct link to Provider Discovery and Configuration")

* Configure the provider URI with `--workspace-store-uri`, `MLFLOW_WORKSPACE_STORE_URI`, or leave it unset to reuse the backend store URI.
* MLflow resolves providers based on the URI scheme (for example `postgresql://`, `mysql://`, `sqlite:///...`, `http(s)://`).
* Custom providers are discovered via the `mlflow.workspace_provider` entry point. Register a builder that returns an `AbstractStore` subclass and expose it through your package's `entry_points` configuration.

## Default SQL Provider[​](#default-sql-provider "Direct link to Default SQL Provider")

The default provider is `mlflow.store.workspace.sqlalchemy_store.SqlAlchemyStore`. It persists workspace metadata in the MLflow tracking database and is automatically used when workspaces are enabled without specifying a custom provider.

### Features (default SQL provider)[​](#features-default-sql-provider "Direct link to Features (default SQL provider)")

* CRUD operations for workspaces via REST API or the Python SDK (applies to any provider; these behaviors are shown here for the default SQL provider)
* Workspace metadata stored in the `workspaces` table alongside the tracking backend
* Admin-only workspace management when authentication is enabled
* `get_default_workspace()` returns the reserved `default` workspace
* `default_artifact_root` can be stored per workspace; when set, new experiments use `<workspace_default_artifact_root>/<experiment_id>` (no `/workspaces/<workspace>` prefix)
* `resolve_artifact_root()` enables the default `/workspaces/<workspace>/<experiment_id>` prefixing behavior and supports the per-workspace override above

### Usage[​](#usage "Direct link to Usage")

bash

```
mlflow server \
  --backend-store-uri postgresql://localhost/mlflow \
  --enable-workspaces
# Uses default SQL provider (SqlAlchemyStore)
```

To point at a different backend (for example a dedicated catalog database), provide `--workspace-store-uri` or `MLFLOW_WORKSPACE_STORE_URI`.

## Advanced: Workspace-Aware Artifact Repositories[​](#advanced-workspace-aware-artifact-repositories "Direct link to Advanced: Workspace-Aware Artifact Repositories")

For deployments requiring dynamic workspace-specific artifact resolution beyond URI prefixing or custom artifact roots, artifact repositories can optionally implement the `for_workspace()` hook exposed by `mlflow.store.artifact.artifact_repo.ArtifactRepository`:

python

```
from mlflow.store.artifact.artifact_repo import ArtifactRepository
from mlflow.store.artifact.s3_artifact_repo import S3ArtifactRepository


class WorkspaceAwareS3ArtifactRepository(ArtifactRepository):
    def for_workspace(self, workspace_name: str | None) -> "ArtifactRepository":
        """
        Return a workspace-scoped repository instance.
        """
        if workspace_name == "team-sensitive":
            # Use dedicated bucket with specific credentials
            return S3ArtifactRepository(
                artifact_uri="s3://team-sensitive-bucket",
                access_key_id=get_team_credentials(workspace_name),
            )

        # Default behavior
        return self
```

Most deployments use the default URI prefixing approach (`/workspaces/<workspace>/<experiment_id>`), which works with all existing artifact repository implementations. For a simpler adjustment, set a workspace's `default_artifact_root` or override `resolve_artifact_root()` in a custom provider. For more dynamic needs, implement `for_workspace()` on an artifact repository to pick workspace-specific storage.

## Workspace Context[​](#workspace-context "Direct link to Workspace Context")

Workspace middleware seeds the request workspace ContextVar (`mlflow.utils.workspace_context`). Providers and authentication plugins can call `mlflow.utils.workspace_context.get_request_workspace()` to retrieve the active workspace name (or `None` when workspaces are disabled).

Providers can use these for custom authorization logic.

## Next Steps[​](#next-steps "Direct link to Next Steps")

* [Permissions](/docs/latest/self-hosting/workspaces/permissions.md) - Configure workspace-scoped permissions
* [Getting Started](/docs/latest/self-hosting/workspaces/getting-started.md) - Set up your first workspace
* [Configuration](/docs/latest/self-hosting/workspaces/configuration.md) - Server configuration options

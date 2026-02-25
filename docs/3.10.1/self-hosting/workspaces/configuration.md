# Workspace Configuration

Reference for the core flags, env vars, and startup checks for workspace mode. For setup and end-to-end flows, see [Getting Started](/docs/3.10.1/self-hosting/workspaces/getting-started.md). For provider details and artifact routing options, see [Workspace Providers](/docs/3.10.1/self-hosting/workspaces/workspace-providers.md).

## Server Configuration (enable/disable)[​](#server-configuration-enabledisable "Direct link to Server Configuration (enable/disable)")

Enable workspaces with the flag:

bash

```
mlflow server \
  --backend-store-uri postgresql://user:pass@localhost/mlflow \
  --default-artifact-root s3://mlflow-artifacts \
  --enable-workspaces
```

Or with env vars:

bash

```
export MLFLOW_ENABLE_WORKSPACES=true
mlflow server \
  --backend-store-uri ... \
  --default-artifact-root ...
```

Disable by restarting without `--enable-workspaces` after moving all resources into the `default` workspace.

### Admin Utility: migrate to default workspace[​](#admin-utility-migrate-to-default-workspace "Direct link to Admin Utility: migrate to default workspace")

To move all workspace-scoped resources into `default` to disable workspaces, use:

bash

```
mlflow db migrate-to-default-workspace <database_uri>
```

By default, the command prints the rows to be moved and asks for confirmation. Use `-y` to skip the prompt.

Run a dry run first to surface conflicts and see how many rows will be updated:

bash

```
mlflow db migrate-to-default-workspace <database_uri> --dry-run
```

Use `--verbose` to list all conflicts instead of a truncated sample.

## Client Workspace Selection (summary)[​](#client-workspace-selection-summary "Direct link to Client Workspace Selection (summary)")

* Explicit: `mlflow.set_workspace("team-a")`
* Env var: `MLFLOW_WORKSPACE=team-a`
* Provider default: `get_default_workspace()` (SQL provider returns `default`)

Clients send `X-MLFLOW-WORKSPACE` on REST calls; UI AJAX routes remain the same (`/api`, `/ajax-api`).

## Startup Validation (when `--enable-workspaces`)[​](#startup-validation-when---enable-workspaces "Direct link to startup-validation-when---enable-workspaces")

* Tracking and registry stores must report `supports_workspaces() == True`
* Workspace provider resolved (defaults to SQL-backed provider if none given)
* Reserved `default` workspace exists (created by migration)
* With `--serve-artifacts`, proxied artifact paths for non-default workspaces must include `workspaces/<workspace>/...`; legacy unprefixed paths remain valid for `default`.

## Admin preflight for artifact roots[​](#admin-preflight-for-artifact-roots "Direct link to Admin preflight for artifact roots")

Before enabling workspaces, confirm that existing experiment artifact locations do not already live under the reserved `<default_artifact_root>/workspaces/<workspace>/...` path unless they match the workspace layout you intend to use. If they do, move or rename those artifact roots first to avoid collisions.

## Artifact Behavior[​](#artifact-behavior "Direct link to Artifact Behavior")

* By default, new experiments land under `<default_artifact_root>/workspaces/<workspace>/<experiment_id>`; runs inherit that path.
* Existing experiments/runs keep their stored locations (legacy unprefixed paths under `default` continue to work).
* To override the artifact root for a specific workspace, set `default_artifact_root` on the workspace (via `mlflow.create_workspace(...)` / `mlflow.update_workspace(...)` or the workspace REST API). When set, MLflow uses `<workspace_default_artifact_root>/<experiment_id>` (no `/workspaces/<workspace>` prefix) for new experiments in that workspace.

## API Limitations[​](#api-limitations "Direct link to API Limitations")

* `create_experiment()` disallows `artifact_location` while workspaces are enabled; MLflow assigns workspace-scoped locations.

## Detecting Workspace Support Programmatically[​](#detecting-workspace-support-programmatically "Direct link to Detecting Workspace Support Programmatically")

* Call `GET /api/3.0/mlflow/server-info` to check `workspaces_enabled`.
* The endpoint is reachable without a workspace header; a `404` indicates an older server without workspace support.

## Environment Variables[​](#environment-variables "Direct link to Environment Variables")

| Variable                     | Description                                                                  | Default                                    |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| `MLFLOW_ENABLE_WORKSPACES`   | Enable workspace mode                                                        | `false`                                    |
| `MLFLOW_WORKSPACE`           | Active workspace for client operations                                       | None                                       |
| `MLFLOW_WORKSPACE_STORE_URI` | Override the workspace provider URI; falls back to the resolved tracking URI | None (falls back to resolved tracking URI) |

`MLFLOW_WORKSPACE` chooses the target workspace. `MLFLOW_WORKSPACE_STORE_URI` selects where the workspace catalog lives (and which provider to use), not which workspace; if unset, the tracking URI is reused. Providers are discovered via the `mlflow.workspace_provider` entry point.

## Next Steps[​](#next-steps "Direct link to Next Steps")

* [Getting Started](/docs/3.10.1/self-hosting/workspaces/getting-started.md) - Step-by-step enablement
* [Workspace Providers](/docs/3.10.1/self-hosting/workspaces/workspace-providers.md) - Provider selection and artifact routing
* [Permissions](/docs/3.10.1/self-hosting/workspaces/permissions.md) - Configure access control
* [Troubleshooting](/docs/3.10.1/self-hosting/troubleshooting.md) - Common issues and fixes

# Manage Versions and Aliases

MCP Registry uses semantic versioning and aliases to give you precise control over which server configurations your users and agents use. This guide covers version management, status transitions, aliases, and tags.

## Semantic Versioning[​](#semantic-versioning "Direct link to Semantic Versioning")

Every MCP server version is identified by a [semver](https://semver.org/) string (e.g., `1.0.0`, `2.0.0-beta.1`). Versions are ordered by semantic version, so `2.0.0` is always considered newer than `1.9.0`.

## Status Lifecycle[​](#status-lifecycle "Direct link to Status Lifecycle")

Each version has a status that controls its availability:

| Status         | Description                                           |
| -------------- | ----------------------------------------------------- |
| **Draft**      | Being prepared. Not yet available for production use. |
| **Active**     | Ready for production use.                             |
| **Deprecated** | Still accessible but should be replaced.              |
| **Deleted**    | No longer available.                                  |

### Allowed Transitions[​](#allowed-transitions "Direct link to Allowed Transitions")

* `draft` → `active` or `deleted`
* `active` → `draft` or `deprecated`
* `deprecated` → `active` or `deleted`

### Update Version Status[​](#update-version-status "Direct link to Update Version Status")

* UI
* Python

![Update Version Status](/docs/3.15.0/assets/images/update-version-status-dda3bf8ca2a24b28df00dfd6ef341405.png)

1. Open the MCP server detail page.
2. Select the version you want to update from the version list.
3. Use the status controls to transition the version to a new status.

Use [`mlflow.genai.update_mcp_server_version()`](/docs/3.15.0/api_reference/python_api/mlflow.genai.html#mlflow.genai.update_mcp_server_version) to change status:

python

```
import mlflow



# Promote a draft version to active

mlflow.genai.update_mcp_server_version(

    name="io.github.anthropic/brave-search",

    version="2.0.0",

    status="active",

)



# Deprecate an older version

mlflow.genai.update_mcp_server_version(

    name="io.github.anthropic/brave-search",

    version="1.0.0",

    status="deprecated",

)
```

## Compare Versions[​](#compare-versions "Direct link to Compare Versions")

The MLflow UI provides a side-by-side comparison of server versions. On the MCP server detail page, click the **Compare** toggle in the version list panel to select two versions and view their differences.

![Compare MCP Server Versions](/docs/3.15.0/assets/images/compare-versions-6a5ac31e53f5c2b330710bc6457e5e05.png)

## Aliases[​](#aliases "Direct link to Aliases")

Aliases let you reference a specific version by a meaningful label (e.g., `production`, `staging`, `beta`) instead of a version number. This decouples your application code from specific version strings.

### Create an Alias[​](#create-an-alias "Direct link to Create an Alias")

* UI
* Python

![Create MCP Server Alias](/docs/3.15.0/assets/images/create-alias-dfcdde16fa3d6664c4e0e3d54985766e.png)

1. Open the MCP server detail page.
2. Click the **Edit aliases** button on a version.
3. Enter the alias name and save.

python

```
import mlflow



# Point "production" to version 1.0.0

mlflow.genai.set_mcp_server_alias(

    name="io.github.anthropic/brave-search",

    alias="production",

    version="1.0.0",

)



# Move "production" to a newer version

mlflow.genai.set_mcp_server_alias(

    name="io.github.anthropic/brave-search",

    alias="production",

    version="2.0.0",

)
```

### Resolve a Version by Alias[​](#resolve-a-version-by-alias "Direct link to Resolve a Version by Alias")

python

```
import mlflow



version = mlflow.genai.get_mcp_server_version_by_alias(

    name="io.github.anthropic/brave-search",

    alias="production",

)



print(f"Production is version {version.version}")
```

### Reserved `latest` Alias[​](#reserved-latest-alias "Direct link to reserved-latest-alias")

The `latest` alias is reserved. MLflow automatically resolves it to the highest semver version among active versions. If no version is active, it falls back to the highest non-deleted version.

python

```
import mlflow



latest = mlflow.genai.get_latest_mcp_server_version(

    name="io.github.anthropic/brave-search",

)
```

### Delete an Alias[​](#delete-an-alias "Direct link to Delete an Alias")

python

```
import mlflow



mlflow.genai.delete_mcp_server_alias(

    name="io.github.anthropic/brave-search",

    alias="staging",

)
```

## Tags[​](#tags "Direct link to Tags")

Tags are key-value pairs you can attach to servers and versions for organization and filtering.

### Server Tags[​](#server-tags "Direct link to Server Tags")

python

```
import mlflow



# Set a tag on the server

mlflow.genai.set_mcp_server_tag(

    name="io.github.anthropic/brave-search",

    key="team",

    value="platform",

)



# Delete a tag

mlflow.genai.delete_mcp_server_tag(

    name="io.github.anthropic/brave-search",

    key="team",

)
```

### Version Tags[​](#version-tags "Direct link to Version Tags")

python

```
import mlflow



# Set a tag on a specific version

mlflow.genai.set_mcp_server_version_tag(

    name="io.github.anthropic/brave-search",

    version="1.0.0",

    key="release-notes",

    value="Initial release with web search support",

)



# Delete a version tag

mlflow.genai.delete_mcp_server_version_tag(

    name="io.github.anthropic/brave-search",

    version="1.0.0",

    key="release-notes",

)
```

## Delete a Version[​](#delete-a-version "Direct link to Delete a Version")

python

```
import mlflow



# Versions must be in draft or deprecated status before deletion

mlflow.genai.update_mcp_server_version(

    name="io.github.anthropic/brave-search",

    version="1.0.0",

    status="deprecated",

)



mlflow.genai.delete_mcp_server_version(

    name="io.github.anthropic/brave-search",

    version="1.0.0",

)
```

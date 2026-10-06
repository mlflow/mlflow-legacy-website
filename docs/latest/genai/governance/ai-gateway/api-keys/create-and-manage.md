# Create and Manage LLM Connections

LLM connections store your provider API keys as reusable credentials that can be shared across multiple endpoints. When you have several endpoints using the same provider, this approach simplifies both initial setup and ongoing credential management.

## Accessing LLM Connections[​](#accessing-llm-connections "Direct link to Accessing LLM Connections")

Navigate to `http://localhost:5000/#/settings` and click on the **LLM Connections** tab.

![LLM Connections Page](/docs/latest/assets/images/llm-connections-53c4859074dfc944ece90f42f2172d1a.png)

## Creating an LLM Connection[​](#creating-an-llm-connection "Direct link to Creating an LLM Connection")

1. Click **Create** button

2. Enter a unique name for the connection (e.g., `my-openai-key`)

3. Select your provider from the dropdown (OpenAI, Anthropic, Google Gemini, etc.)

4. Choose the authentication method if multiple options are available
   <!-- -->
   * For example, OpenAI supports both standard API key authentication and Azure-specific authentication

5. Enter your credentials (displayed as masked inputs for security)

6. Fill in any provider-specific configuration fields:

   <!-- -->

   * **Azure**: Endpoint URL
   * **GCP**: Project ID

7. Click **Create**

![Create LLM Connection](/docs/latest/assets/images/create-api-key-367dec6af39b6e7a30dcb6666fb9afa1.png)

### Custom Base URL Validation[​](#custom-base-url-validation "Direct link to Custom Base URL Validation")

Some providers accept a custom **API Base URL** (`api_base`), for example Azure OpenAI, Databricks, or Portkey. Because the gateway forwards requests, including caller-controlled raw proxy paths, to this URL, MLflow validates it to prevent Server-Side Request Forgery (SSRF). By default:

* Only **HTTPS** URLs are allowed
* URLs with embedded credentials are rejected
* URLs that resolve to **private**, **loopback**, **link-local**, or **reserved** IP addresses are rejected

This prevents a connection from being pointed at internal services, cloud metadata endpoints (e.g., `169.254.169.254`), or localhost services. Leaving the field blank is always allowed and uses the provider's default base URL.

The private-IP policy is also enforced when the gateway actually connects to a custom base URL: every address it dials is checked at connection time and redirects from the upstream are never followed. This means connections created before this validation existed, and hostnames that change what they resolve to after creation, are still blocked from reaching internal addresses. Providers routed through LiteLLM use LiteLLM's own HTTP client, so for them the base URL is resolved and checked immediately before each request instead; because LiteLLM also accepts `base_url` (an alias for `api_base`), `model_list`, `fallbacks` and `custom_llm_provider`, those keys are rejected in a connection's configuration, and no request payload may set any of them. The upstream is always chosen by the connection's validated `api_base`. A provider's built-in base URL, such as Ollama's `localhost:11434`, is not subject to this check on the chat, embeddings and passthrough routes; it is checked on the raw proxy route, where the caller also controls the request path.

note

Deployments whose custom base URL points at a private address, such as an in-cluster vLLM server or an Azure OpenAI Private Link endpoint, must set `MLFLOW_GATEWAY_API_BASE_ALLOW_PRIVATE_IPS=true`. If that server does not use TLS, also set `MLFLOW_GATEWAY_API_BASE_ALLOWED_SCHEMES=http,https` so its URL can be saved. Only enable these when every user who can create LLM connections is trusted with access to your private network.

## Working with Existing Connections[​](#working-with-existing-connections "Direct link to Working with Existing Connections")

The LLM Connections page displays all your configured connections along with important metadata:

* **Endpoints using this connection**: See which endpoints depend on each connection
* **Last updated**: When the credentials were last modified
* **Created date**: When the connection was originally created

The credential values remain masked for security.

### Editing Connections[​](#editing-connections "Direct link to Editing Connections")

To update credentials for a provider:

1. Locate the connection in the LLM Connections list
2. Click the **Edit** button
3. Update the API key value
4. Click **Save**

All endpoints using this connection will automatically use the new credentials without requiring any configuration changes.

### Deleting Connections[​](#deleting-connections "Direct link to Deleting Connections")

When deleting a connection:

1. The system warns you if any endpoints currently depend on it
2. Review the warning to prevent accidental disruptions
3. Confirm deletion only after ensuring no active endpoints need the connection

tip

Creating reusable LLM connections simplifies credential rotation. When you need to update an API key, edit the connection once rather than updating every endpoint individually.

## Best Practices[​](#best-practices "Direct link to Best Practices")

1. **Use descriptive names**: Name connections by provider and purpose (e.g., `openai-production`, `anthropic-dev`)
2. **Separate development and production**: Use different connections for different environments
3. **Minimize connection sharing**: Create separate connections when different teams or applications need isolated access
4. **Regular rotation**: Periodically rotate API keys for security (see [Encryption & Rotation](/docs/latest/genai/governance/ai-gateway/api-keys/key-rotation.md))

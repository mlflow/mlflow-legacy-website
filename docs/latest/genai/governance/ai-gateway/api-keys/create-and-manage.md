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

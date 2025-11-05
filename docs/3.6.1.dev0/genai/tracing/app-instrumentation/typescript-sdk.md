# MLflow Typescript SDK for Tracing

Waiting for your feedback

MLflow Typescript SDK is an experimental package. We are actively working on it and would love to hear your feedback. Please raise a feature request or bug reports in [GitHub](https://github.com/mlflow/mlflow/issues/new/choose).

[MLflow's TypeScript SDK](https://www.npmjs.com/package/mlflow-tracing) empowers AI application developers by bringing [MLflow's Tracing](/docs/3.6.1.dev0/genai/tracing.md) capabilities to TypeScript and JavaScript. With minimum code changes, you can **debug**, **evaluate**, and **monitor** your applications with MLflow's powerful observability features and take advantage of the trusted end-to-end MLOps platform.

## Quick Start[​](#quick-start "Direct link to Quick Start")

If you are new to MLflow Tracing, please start with the following quickstart guide:

[![Quickstart (JS/TS)](/docs/3.6.1.dev0/images/logos/javascript-typescript-logo.png)](/docs/3.6.1.dev0/genai/tracing/quickstart/typescript-openai.md)

### [Quickstart (JS/TS)](/docs/3.6.1.dev0/genai/tracing/quickstart/typescript-openai.md)

[Get started with MLflow in JavaScript or TypeScript](/docs/3.6.1.dev0/genai/tracing/quickstart/typescript-openai.md)

[Start building →](/docs/3.6.1.dev0/genai/tracing/quickstart/typescript-openai.md)

## Installation[​](#installation "Direct link to Installation")

Install the package from the [npm registry](https://www.npmjs.com/package/mlflow-tracing):

bash

```
npm install mlflow-tracing
```

After installation, connect your application to an MLflow server by specifying the tracking URI and experiment ID.

typescript

```
import * as mlflow from "mlflow-tracing";

mlflow.init({
    trackingUri: "<your-tracking-server-uri>",
    experimentId: "<your-experiment-id>",
});
```

## Basic Usage[​](#basic-usage "Direct link to Basic Usage")

* Simple Function
* OpenAI

typescript

```
// Wrap a function with mlflow.trace to generate a span when the function is called.
const getWeather = mlflow.trace(
  (city: string) => {
    return `The weather in ${city} is sunny`;
  },
  // Pass options to set span name.
  { name: 'get-weather' }
);

// Invoke the function as usual, MLflow will automatically create a span and capture
// inputs, outputs, latency, and exception information.
getWeather('San Francisco');

// Alternatively, start and end spans manually.
const span = mlflow.startSpan({ name: 'my-span', inputs: { message: 'Hi, MLflow!' } });
span.end({ outputs: { message: 'Hi, what can I do for you?' } });
```

Install the OpenAI integration package:

bash

```
npm install mlflow-openai
```

Then, wrap the OpenAI client with the `tracedOpenAI` function:

typescript

```
import * as mlflow from "mlflow-tracing";

// Initialize the tracing SDK
mlflow.init({
    trackingUri: "<your-tracking-server-uri>",
    experimentId: "<your-experiment-id>",
});
```

Configure with environment variables

Set `MLFLOW_TRACKING_URI` and `MLFLOW_EXPERIMENT_ID` before starting your application to let `mlflow.init()` pick them up automatically:

bash

```
export MLFLOW_TRACKING_URI=http://localhost:5000
export MLFLOW_EXPERIMENT_ID=123456789
```

typescript

```
mlflow.init();
```

typescript

```
import { OpenAI } from "openai";
import { tracedOpenAI } from "mlflow-openai";

// Wrap the OpenAI client with the tracedOpenAI function
const client = tracedOpenAI(new OpenAI());

// Invoke the client as usual
const response = await client.chat.completions.create({
    model: "o4-mini",
    messages: [
        {"role": "system", "content": "You are a helpful weather assistant."},
        {"role": "user", "content": "What's the weather like in Seattle?"},
    ],
})
```

## Automatic Tracing[​](#automatic-tracing "Direct link to Automatic Tracing")

MLflow Tracing Typescript SDK currently supports automatic tracing for the following libraries:

[![OpenAI Logo](/docs/3.6.1.dev0/assets/images/openai-logo-84ce36fa9f59f4df880cee88c0335586.png)](/docs/3.6.1.dev0/genai/tracing/integrations/listing/openai.md)

## Manual Tracing[​](#manual-tracing "Direct link to Manual Tracing")

### Tracing a function with the `trace` API[​](#tracing-a-function-with-the-trace-api "Direct link to tracing-a-function-with-the-trace-api")

The `trace` API is useful when you want to trace a function.

* Named Function
* Anonymous Function

typescript

```
import * as mlflow from "mlflow-tracing";

const getWeather = async (city: string) => {
    return `The weather in ${city} is sunny`;
};

// Wrap the function with mlflow.trace to create a traced function.
const tracedGetWeather = mlflow.trace(
    getWeather,
    { name: 'get-weather' }
);

// Invoke the traced function as usual.
await tracedGetWeather('San Francisco');
```

typescript

```
import * as mlflow from "mlflow-tracing";

const getWeather = mlflow.trace(
    (city: string) => {
        return `The weather in ${city} is sunny`;
    },
    // When wrapping an anonymous function, you need to specify the span name.
    { name: 'get-weather' }
);

// Invoke the traced function as usual.
getWeather('San Francisco');
```

On the invocation of the traced function, MLflow will automatically create a span that captures:

* Input arguments
* Return value
* Exception information if thrown
* Latency

### Capturing Nested Function Calls[​](#capturing-nested-function-calls "Direct link to Capturing Nested Function Calls")

If you trace nested functions, MLflow will generate a trace with multiple spans, where the span structure captures the nested function calls.

typescript

```
const sum = mlflow.trace(
    (a: number, b: number) => {
        return a + b;
    },
    { name: 'sum' }
);

const multiply = mlflow.trace(
    (a: number, b: number) => {
        return a * b;
    },
    { name: 'multiply' }
);

const computeArea = mlflow.trace(
    (a: number, b: number, h: number) => {
        const sumOfBase = sum(a, b);
        const area = multiply(sumOfBase, h);
        return multiply(area, 0.5);
    },
    { name: 'compute-area' }
);

computeArea(1, 2, 3);
```

The trace will look like this:

text

```
- compute-area
  - sum (a=1, b=2)
  - multiply (a=3, b=3)
  - multiply (a=9, b=0.5)
```

### Tracing a class method with the `@trace` API[​](#tracing-a-class-method-with-the-trace-api "Direct link to tracing-a-class-method-with-the-trace-api")

TypeScript version 5.0+ supports decorators. MLflow Tracing supports this syntax to trace class methods easily. MLflow will automatically create a span that captures:

* Input arguments
* Return value
* Exception information if thrown
* Latency

typescript

```
import * as mlflow from "mlflow-tracing";

class MyClass {
    @mlflow.trace({ spanType: mlflow.SpanType.LLM })
    generateText(prompt: string) {
        return "It's sunny in Seattle!";
    }
}

const myClass = new MyClass();
myClass.generateText("What's the weather like in Seattle?");
```

### Tracing a block of code with the `withSpan` API[​](#tracing-a-block-of-code-with-the-withspan-api "Direct link to tracing-a-block-of-code-with-the-withspan-api")

The `withSpan` API is useful when you want to trace a block of code, not a function.

typescript

```
import * as mlflow from "mlflow-tracing";

const question = "What's the weather like in Seattle?";

const result = await mlflow.withSpan(
    async (span: mlflow.Span) => {
        return "It's sunny in Seattle!";
    },
    // Pass name, span type, and inputs as options.
    {
        name: "generateText",
        spanType: mlflow.SpanType.TOOL,
        inputs: { prompt: question },
    }
);
```

### Create and End a Span Explicitly[​](#create-and-end-a-span-explicitly "Direct link to Create and End a Span Explicitly")

To get more control over the span lifecycle, you can create and end a span explicitly.

typescript

```
import * as mlflow from "mlflow-tracing";

const span = mlflow.startSpan({
    name: "generateText",
    spanType: mlflow.SpanType.LLM,
    inputs: { prompt: question },
});

span.end({
    outputs: { answer: "It's sunny in Seattle!" },
    status: 'OK',
});
```

## Grouping Traces by Users and Sessions[​](#grouping-traces-by-users-and-sessions "Direct link to Grouping Traces by Users and Sessions")

Many real-world applications use sessions to maintain multi-turn user interactions. On the other hand, traces are often generated per-request. MLflow supports grouping traces by user sessions to help you understand an end-user's journey and identify issues. Refer to the [Track Users & Sessions](/docs/3.6.1.dev0/genai/tracing/track-users-sessions.md) guide for more details.

## Developing the TypeScript SDK[​](#developing-the-typescript-sdk "Direct link to Developing the TypeScript SDK")

Looking to contribute new integrations or iterate on the workspace? Follow [Step 5 of the tracing integration guide](/docs/3.6.1.dev0/genai/tracing/integrations/contribute.md#step-5-begin-implementation) for detailed instructions on scaffolding packages, running builds, and preparing pull requests.

## FAQ[​](#faq "Direct link to FAQ")

#### Q. I found a feature in the Python SDK that is not available in the Typescript SDK.[​](#q-i-found-a-feature-in-the-python-sdk-that-is-not-available-in-the-typescript-sdk "Direct link to Q. I found a feature in the Python SDK that is not available in the Typescript SDK.")

The Typescript SDK started later than the Python SDK, so some features are not available yet. Please raise a feature request in [GitHub](https://github.com/mlflow/mlflow/issues/new/choose) to get the attention of the maintainers.

#### Q. Can I use TypeScript for general MLflow experiment tracking, not only tracing?[​](#q-can-i-use-typescript-for-general-mlflow-experiment-tracking-not-only-tracing "Direct link to Q. Can I use TypeScript for general MLflow experiment tracking, not only tracing?")

The [mlflow-tracing](https://www.npmjs.com/package/mlflow-tracing) package only contains tracing functionality and does not include the full experiment tracking experience. However, you can use [mlflow.js](https://github.com/open-source-labs/mlflow-js), a **community-maintained** package that provides experiment tracking APIs compatible with Python SDK, built on top of MLflow's REST APIs.

bash

```
npm install mlflow-js
```

#### Q. Do I need to install Python to use MLflow Typescript SDK?[​](#q-do-i-need-to-install-python-to-use-mlflow-typescript-sdk "Direct link to Q. Do I need to install Python to use MLflow Typescript SDK?")

Your application doesn't need to have Python installed. However, if you want to send traces to the self-hosted MLflow server, your server environment needs to have Python.

Alternatively, you can sign-up for [Managed MLflow](https://mlflow.org/#get-started) for free and send traces to the cloud-hosted MLflow server.

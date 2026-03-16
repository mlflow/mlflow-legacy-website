# RAG Evaluation with Built-in Judges

Retrieval-Augmented Generation (RAG) systems combine retrieval and generation to provide contextually relevant responses. Evaluating RAG applications requires assessing both the retrieval quality (are the right documents retrieved?) and the generation quality (is the response grounded in those documents?).

MLflow provides built-in judges designed specifically for evaluating RAG applications. These judges help you identify common issues in your RAG pipeline:

* **Poor retrieval**: Documents aren't relevant to the query
* **Insufficient context**: Retrieved documents don't contain all necessary information
* **Hallucinations**: Generated responses include information not present in the retrieved context

## Available RAG Judges[​](#available-rag-judges "Direct link to Available RAG Judges")

| Judge                                                                                                             | What does it evaluate?                                    | Requires ground-truth? | Requires traces?      |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------- | --------------------- |
| [RetrievalRelevance](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/relevance.md#retrievalrelevance-judge) | Are retrieved documents relevant to the user's request?   | No                     | ⚠️ **Trace Required** |
| [RetrievalGroundedness](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/groundedness.md)                    | Is the app's response grounded in retrieved information?  | No                     | ⚠️ **Trace Required** |
| [RetrievalSufficiency](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/context-sufficiency.md)              | Do retrieved documents contain all necessary information? | Yes                    | ⚠️ **Trace Required** |

tip

All RAG judges require MLflow Traces with at least one span marked as `span_type="RETRIEVER"`. Use the [@mlflow.trace](/docs/latest/api_reference/python_api/mlflow.html#mlflow.trace) decorator with `span_type="RETRIEVER"` on your retrieval functions.

## Prerequisites for running the examples[​](#prerequisites-for-running-the-examples "Direct link to Prerequisites for running the examples")

1. Install MLflow and required packages

   bash

   ```
   pip install --upgrade mlflow
   ```

2. Create an MLflow experiment by following the [setup your environment quickstart](/docs/latest/genai/getting-started/connect-environment.md).

3. (Optional, if using OpenAI models) Use the native OpenAI SDK to connect to OpenAI-hosted models. Select a model from the [available OpenAI models](https://platform.openai.com/docs/models).

   python

   ```
   import mlflow
   import os
   import openai

   # Ensure your OPENAI_API_KEY is set in your environment
   # os.environ["OPENAI_API_KEY"] = "<YOUR_API_KEY>" # Uncomment and set if not globally configured

   # Enable auto-tracing for OpenAI
   mlflow.openai.autolog()

   # Create an OpenAI client
   client = openai.OpenAI()

   # Select an LLM
   model_name = "gpt-4o-mini"
   ```

## Complete RAG Example[​](#complete-rag-example "Direct link to Complete RAG Example")

Here's a complete example showing how to build a RAG application and evaluate it with the judges:

python

```
import mlflow
import openai
from mlflow.genai.scorers import (
    RetrievalRelevance,
    RetrievalGroundedness,
    RetrievalSufficiency,
)
from mlflow.entities import Document
from typing import List

mlflow.openai.autolog()
client = openai.OpenAI()

# Sample knowledge base - in practice, this would be a vector database
KNOWLEDGE_BASE = {
    "mlflow": [
        Document(
            id="doc_1",
            page_content="MLflow is an open source AI engineering platform for agents, LLMs, and ML models. Its features include observability, evaluation, prompt management, and an AI Gateway for managing costs and model access.",
            metadata={"source": "mlflow_overview.txt"},
        ),
    ],
}


# Define a retriever function with proper span type
@mlflow.trace(span_type="RETRIEVER")
def retrieve_docs(query: str) -> List[Document]:
    # Simulated retrieval - in practice, this would query a vector database
    # using embeddings to find semantically similar documents
    query_lower = query.lower()

    if "mlflow" in query_lower:
        return KNOWLEDGE_BASE["mlflow"]
    else:
        return []  # No relevant documents found


# Define your RAG agent
@mlflow.trace
def rag_agent(query: str):
    docs = retrieve_docs(query)
    if not docs:
        return {"response": "I don't have information to answer that question."}
    context = "\n\n".join([doc.page_content for doc in docs])

    # Pass retrieved context to your LLM
    messages = [
        {
            "role": "system",
            "content": f"Answer the user's question based only on the following context:\n\n{context}",
        },
        {"role": "user", "content": query},
    ]

    response = client.chat.completions.create(
        model=model_name,
        messages=messages,
    )

    return {"response": response.choices[0].message.content}


# Create evaluation dataset with ground truth expectations
eval_dataset = [
    {
        "inputs": {"query": "What does MLflow offer for agents and LLMs?"},
        "expectations": {
            "expected_facts": [
                "MLflow is an open source AI engineering platform",
                "Features include observability, evaluation, prompt management, and an AI Gateway",
            ]
        },
    }
]

# Run evaluation with multiple RAG judges
eval_results = mlflow.genai.evaluate(
    data=eval_dataset,
    predict_fn=rag_agent,
    scorers=[
        RetrievalRelevance(model="openai:/gpt-4o-mini"),
        RetrievalGroundedness(model="openai:/gpt-4o-mini"),
        RetrievalSufficiency(model="openai:/gpt-4o-mini"),
    ],
)
```

### Understanding the Results[​](#understanding-the-results "Direct link to Understanding the Results")

Each RAG judge evaluates retriever spans separately:

* **RetrievalRelevance**: Returns feedback for each retrieved document, indicating whether it's relevant to the query
* **RetrievalGroundedness**: Checks if the generated response is factually supported by the retrieved context
* **RetrievalSufficiency**: Verifies that the retrieved documents contain all information needed to answer based on the `expected facts`

## Select the LLM that powers the judge[​](#select-the-llm-that-powers-the-judge "Direct link to Select the LLM that powers the judge")

You can change the judge model by using the `model` argument in the judge definition. The model must be specified in the format `<provider>:/<model-name>`, where `<provider>` is a LiteLLM-compatible model provider.

For a list of supported models, see [selecting judge models](/docs/latest/genai/eval-monitor/scorers/llm-judge/custom-judges.md#selecting-judge-models).

## Next Steps[​](#next-steps "Direct link to Next Steps")

### [RetrievalRelevance](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/relevance.md#retrievalrelevance-judge)

[Evaluate if retrieved documents are relevant to queries](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/relevance.md#retrievalrelevance-judge)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/relevance.md#retrievalrelevance-judge)

### [RetrievalGroundedness](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/groundedness.md)

[Check if responses are grounded in retrieved context](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/groundedness.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/groundedness.md)

### [RetrievalSufficiency](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/context-sufficiency.md)

[Verify retrieved context contains all necessary information](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/context-sufficiency.md)

[Learn more →](/docs/latest/genai/eval-monitor/scorers/llm-judge/rag/context-sufficiency.md)

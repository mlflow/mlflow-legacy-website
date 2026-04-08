# Automatic Issue Detection

Automatically identify quality and operational issues in your LLM application using AI-powered analysis of traces directly within the MLflow UI.

[](/docs/latest/images/genai/issue-detection/issue-detection.mp4)

## Why Automatic Issue Detection?[​](#why-automatic-issue-detection "Direct link to Why Automatic Issue Detection?")

As your LLM application scales in production, maintaining agent quality becomes increasingly challenging:

* **Cumbersome to review traces one by one**: Manually inspecting individual traces does not scale as traffic grows
* **Unclear which quality metrics to use**: The default scorer covers common cases automatically, so you can get started without defining metrics upfront
* **Difficult to identify recurring patterns**: Related failures are scattered across traces without automatic grouping
* **Lack of structured issue tracking**: Without structured tracking, identified problems get lost and regressions go unnoticed

## How It Works[​](#how-it-works "Direct link to How It Works")

Issue detection uses a multi-stage AI analysis pipeline:

#### Identify issues from traces

Automatically identify issues from your selected traces, based on the chosen categories and model

#### Analyze triage results

Build per-session analyses from triage results, combining triage rationales, human feedback and agent execution logic

#### Cluster issues

Cluster analyses into identified issues via LLM-based labeling and grouping

#### Annotate issues

Annotate traces with corresponding issues, including the rationales

#### Summary

Generate a summary of identified issues and root causes

### What Gets Analyzed[​](#what-gets-analyzed "Direct link to What Gets Analyzed")

The system examines your trace data to understand:

* **Inputs and outputs**: User requests and agent responses
* **Tool calls and results**: Function calls, API interactions, and their outcomes
* **Execution flow**: Span sequences, timing, and control flow
* **Errors and exceptions**: Failures, timeouts, and error messages
* **Metadata**: User feedback, tags, session context

From this data, the AI identifies problems across six quality dimensions.

## Issue Categories (CLEARS)[​](#issue-categories-clears "Direct link to Issue Categories (CLEARS)")

MLflow organizes issue detection across six quality dimensions, forming the **CLEARS** framework (**C**orrectness, **L**atency, **E**xecution, **A**dherence, **R**elevance, **S**afety). Choose which categories to focus on based on your application's requirements:

#### Correctness

Output is factually accurate and grounded in provided data. Detects hallucinations, factual errors, and ungrounded responses.

#### Latency

Agent responds within acceptable time bounds. Identifies slow responses, timeouts, and performance bottlenecks.

#### Execution

Agent successfully completes actions (tool calls, API steps). Finds tool call failures, API errors, and execution problems.

#### Adherence

Response follows instructions, constraints, policies, and formatting. Catches instruction-following failures and formatting issues.

#### Relevance

Output is useful, directly addresses the user's request, and leaves the user satisfied with the interaction.

#### Safety

Response avoids harmful, sensitive, or inappropriate content. Detects safety violations and policy breaches.

### Choosing Categories[​](#choosing-categories "Direct link to Choosing Categories")

Different applications have different priorities:

* **Customer support bots**: Focus on relevance and adherence to ensure helpful, policy-compliant responses
* **Data retrieval systems**: Prioritize correctness and execution to catch hallucinations and API failures
* **Real-time agents**: Emphasize latency and execution for responsive, reliable performance
* **Content generation**: Consider safety, adherence, and relevance for appropriate, on-topic outputs

You can select any combination of categories for each analysis. Starting with all categories gives comprehensive coverage, then narrow focus as you learn your application's common failure modes.

## The Detection Experience[​](#the-detection-experience "Direct link to The Detection Experience")

### Getting Started[​](#getting-started "Direct link to Getting Started")

Issue detection is available from anywhere you view traces: overview dashboard, traces table, or chat sessions. When you're ready to analyze a set of traces, initiate detection and configure two things:

1. **Which issue categories to look for**: Select the CLEARS dimensions most relevant to your use case

![Issue detection categories](/docs/latest/images/genai/issue-detection/categories.png)

2. **Which LLM to use for analysis**: Choose between an existing MLflow AI Gateway endpoint or connect directly to a provider (OpenAI, Anthropic, Gemini, etc.) using an API key. Cost tracking is supported across all options.

![Issue detection endpoints selection](/docs/latest/images/genai/issue-detection/endpoint-selection.png)

![Issue detection models selection](/docs/latest/images/genai/issue-detection/model-selection.png)

You can analyze all traces in your experiment or select a specific subset. For multi-turn conversations, you can group traces by [session](/docs/latest/genai/tracing/track-users-sessions.md) to get conversation-aware analysis.

### Real-Time Analysis[​](#real-time-analysis "Direct link to Real-Time Analysis")

Once configured, analysis begins immediately and runs asynchronously. You can watch progress in real-time or navigate away—the job continues in the background. As the analysis runs, you'll see:

* Current status and progress
* Number of traces scanned
* Issues detected so far (updates live)

Once the job finishes, you'll also see the estimated LLM cost for the analysis.

![Issue detection in progress](/docs/latest/images/genai/issue-detection/issue-detection-progress.png)

### Understanding Results[​](#understanding-results "Direct link to Understanding Results")

When analysis completes, you receive an AI-generated summary highlighting key findings, severity distribution, and recommended next steps. This summary gives you immediate context before diving into individual issues.

![Detection complete with summary](/docs/latest/images/genai/issue-detection/summary.png)

## Working with Detected Issues[​](#working-with-detected-issues "Direct link to Working with Detected Issues")

### Issue Overview[​](#issue-overview "Direct link to Issue Overview")

Each detected issue represents a cluster of related problems found across your traces. Issues provide:

#### Description

What the problem is, why it occurs, and how it manifests in your application

#### Severity Rating

High, medium, or low priority based on impact and frequency

#### Affected Trace Count

Number of traces impacted, with direct links to each affected trace for investigation

#### Category Labels

Which CLEARS dimensions this issue relates to (correctness, latency, execution, etc.)

Issues maintain full lineage to the traces they were detected from, so you can always navigate from an issue back to the specific traces that surfaced it.

![Detected issues overview](/docs/latest/images/genai/issue-detection/issue-cards.png)

### Investigating Issues[​](#investigating-issues "Direct link to Investigating Issues")

When you select an issue, you can explore all affected traces. Each trace shows why it was flagged with specific rationale explaining the problem in that particular example. This helps you:

* **Verify the issue is real**: Check if flagged traces genuinely demonstrate the problem
* **Understand the pattern**: See how the issue manifests across different contexts
* **Identify root causes**: Look for common factors in affected traces
* **Gather examples**: Collect representative cases for debugging or evaluation datasets, and use them to verify whether the issue is fixed after making changes

![Issue with affected traces](/docs/latest/images/genai/issue-detection/issue-details.png)

### Managing and Triaging Issues[​](#managing-and-triaging-issues "Direct link to Managing and Triaging Issues")

#### Issue Status[​](#issue-status "Direct link to Issue Status")

Issues are classified into three states:

* **Pending**: Newly discovered issues awaiting review
* **Resolved**: Issues you've fixed and verified
* **Rejected**: False positives or non-issues

You can filter by status to focus on what needs attention. Issues identified by the discovery job are initially marked as Pending, and can be triaged to Resolved or Rejected as you investigate.

![Managing issue status](/docs/latest/images/genai/issue-detection/issue-status.png)

#### Refining Issues[​](#refining-issues "Direct link to Refining Issues")

As you review issues, you can refine them to better reflect your domain knowledge and terminology:

* **Edit descriptions**: Clarify or expand issue descriptions with domain-specific details
* **Adjust severity**: Change priority levels based on business impact

These refinements help align discovered issues with your team's understanding and priorities.

![Editing issue details](/docs/latest/images/genai/issue-detection/edit-issue.png)

#### Tracking Progress[​](#tracking-progress "Direct link to Tracking Progress")

Mark issues as resolved when you've:

1. Identified and fixed the root cause
2. Deployed the fix to your application
3. Verified the problem no longer occurs in new traces

Mark an issue as rejected when:

* **It's a false positive**: The flagged traces don't actually exhibit the described problem
* **It's by design**: The behavior is intentional, such as intentionally brief responses or domain-specific language
* **It's out of scope**: The issue is real but not something your team plans to address (e.g., an edge case with negligible user impact)

Rejecting false positives keeps your issue list focused and prevents noise from accumulating over time.

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Effective Analysis[​](#effective-analysis "Direct link to Effective Analysis")

* **Analyze representative data**: Include traces from different user segments, time periods, and use cases
* **Start comprehensive**: Use all categories initially to discover your application's failure modes
* **Focus iteratively**: Narrow to specific categories as you learn common issues
* **Verify findings**: Always examine affected traces to confirm issues are real
* **Regular cadence**: Run detection periodically to catch new issues as your application evolves

### Cost and Performance Trade-offs[​](#cost-and-performance-trade-offs "Direct link to Cost and Performance Trade-offs")

Issue detection requires LLM calls to analyze each trace. Costs scale with:

* Number of traces analyzed
* Trace complexity and length
* Model size and pricing
* Number of categories selected

More capable models (e.g. `gpt-5.4`) generally produce better issue detection quality, and the cost is reasonable, typically a few dollars for hundreds of traces. We recommend starting with a stronger model to get the best results out of the box.

To control costs at scale, connect via an [MLflow AI Gateway](/docs/latest/genai/governance/ai-gateway.md) endpoint and use its built-in budget controls to cap spending across detection runs.

## When to Use Issue Detection[​](#when-to-use-issue-detection "Direct link to When to Use Issue Detection")

Issue detection complements other MLflow evaluation and monitoring capabilities:

| Use Issue Detection When...                                        | Use Other Tools When...                                                                                                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| You want to detect unknown problems                                | You know the specific quality dimensions or hypotheses to test: use [MLflow Evaluation Judges](/docs/latest/genai/eval-monitor/scorers.md)                          |
| You need to analyze many traces at once                            | You're debugging a single trace: use [MLflow Trace UI](/docs/latest/genai/tracing/observe-with-traces/ui.md)                                                        |
| You want to track, triage, and resolve identified issues over time | You need continuous production monitoring: use [Automatic Evaluations](/docs/latest/genai/eval-monitor/automatic-evaluations.md) to score every trace as it arrives |

"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["1499"],{90104:function(e,n,i){i.r(n),i.d(n,{metadata:()=>t,default:()=>m,frontMatter:()=>c,contentTitle:()=>d,toc:()=>u,assets:()=>h});var t=JSON.parse('{"id":"flavors/openai/notebooks/openai-code-helper-ipynb","title":"Building a Code Assistant with OpenAI & MLflow","description":"Download this notebook","source":"@site/docs/genai/flavors/openai/notebooks/openai-code-helper-ipynb.mdx","sourceDirName":"flavors/openai/notebooks","slug":"/flavors/openai/notebooks/openai-code-helper","permalink":"/docs/3.6.1/genai/flavors/openai/notebooks/openai-code-helper","draft":false,"unlisted":false,"editUrl":"https://github.com/mlflow/mlflow/edit/master/docs/docs/genai/flavors/openai/notebooks/openai-code-helper.ipynb","tags":[],"version":"current","frontMatter":{"custom_edit_url":"https://github.com/mlflow/mlflow/edit/master/docs/docs/genai/flavors/openai/notebooks/openai-code-helper.ipynb","slug":"openai-code-helper"},"sidebar":"genAISidebar","previous":{"title":"Chat Completions with OpenAI","permalink":"/docs/3.6.1/genai/flavors/openai/notebooks/openai-chat-completions"},"next":{"title":"Embeddings Support with OpenAI in MLflow","permalink":"/docs/3.6.1/genai/flavors/openai/notebooks/openai-embeddings-generation"}}'),o=i(74848),s=i(28453),r=i(75940),a=i(75453);i(66354);var l=i(42676);let c={custom_edit_url:"https://github.com/mlflow/mlflow/edit/master/docs/docs/genai/flavors/openai/notebooks/openai-code-helper.ipynb",slug:"openai-code-helper"},d="Building a Code Assistant with OpenAI & MLflow",h={},u=[{value:"Overview",id:"overview",level:3},{value:"Learning Objectives",id:"learning-objectives",level:3},{value:"Key Concepts Covered",id:"key-concepts-covered",level:3},{value:"Why Use MLflow for this?",id:"why-use-mlflow-for-this",level:3},{value:"Important Cost Considerations for GPT-4 Usage",id:"important-cost-considerations-for-gpt-4-usage",level:3},{value:"High(er) Cost of GPT-4",id:"higher-cost-of-gpt-4",level:4},{value:"Why Choose GPT-4 in This Tutorial",id:"why-choose-gpt-4-in-this-tutorial",level:4},{value:"Consider Alternatives for Cost-Effectiveness",id:"consider-alternatives-for-cost-effectiveness",level:4},{value:"Budgeting for GPT-4",id:"budgeting-for-gpt-4",level:4},{value:"Initializing the MLflow Client",id:"initializing-the-mlflow-client",level:3},{value:"Setting the MLflow Experiment",id:"setting-the-mlflow-experiment",level:3},{value:"Defining the Instruction Set for the AI Model",id:"defining-the-instruction-set-for-the-ai-model",level:3},{value:"Defining and Utilizing the Model Signature in MLflow",id:"defining-and-utilizing-the-model-signature-in-mlflow",level:3},{value:"Our logged model in the MLflow UI",id:"our-logged-model-in-the-mlflow-ui",level:3},{value:"Enhancing User Experience with Custom Pyfunc Implementation",id:"enhancing-user-experience-with-custom-pyfunc-implementation",level:3},{value:"Saving the Custom Python Model with MLflow",id:"saving-the-custom-python-model-with-mlflow",level:3},{value:"Load our saved Custom Python Model",id:"load-our-saved-custom-python-model",level:3},{value:"Comparing Two Approaches for Code Review with MLflow Models",id:"comparing-two-approaches-for-code-review-with-mlflow-models",level:3},{value:"Approach 1: The Simple <code>review</code> Function",id:"approach-1-the-simple-review-function",level:4},{value:"Approach 2: The Advanced <code>code_inspector</code> Decorator",id:"approach-2-the-advanced-code_inspector-decorator",level:4},{value:"Introduction to the <code>review</code> Function",id:"introduction-to-the-review-function",level:4},{value:"Explanation and Review of <code>process_data</code> Function",id:"explanation-and-review-of-process_data-function",level:3},{value:"Function Overview",id:"function-overview",level:4},{value:"Suggested Revised Code",id:"suggested-revised-code",level:4},{value:"The <code>code_inspector</code> Decorator Function",id:"the-code_inspector-decorator-function",level:3},{value:"First Usage Trial: The <code>summing_function</code> with <code>code_inspector</code>",id:"first-usage-trial-the-summing_function-with-code_inspector",level:3},{value:"Execution and Analysis of <code>summing_function(1000)</code>",id:"execution-and-analysis-of-summing_function1000",level:3},{value:"Analysis of <code>one_liner</code> Function",id:"analysis-of-one_liner-function",level:3},{value:"Reviewing <code>find_phone_numbers</code> Function",id:"reviewing-find_phone_numbers-function",level:3},{value:"Conclusion: Harnessing the Power of MLflow in AI-Assisted Development",id:"conclusion-harnessing-the-power-of-mlflow-in-ai-assisted-development",level:3},{value:"What&#39;s Next?",id:"whats-next",level:3}];function p(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",h4:"h4",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"building-a-code-assistant-with-openai--mlflow",children:"Building a Code Assistant with OpenAI & MLflow"})}),"\n",(0,o.jsx)(l.O,{href:"https://raw.githubusercontent.com/mlflow/mlflow/master/docs/docs/genai/flavors/openai/notebooks/openai-code-helper.ipynb",children:"Download this notebook"}),"\n",(0,o.jsx)(n.h3,{id:"overview",children:"Overview"}),"\n",(0,o.jsx)(n.p,{children:"Welcome to this comprehensive tutorial, where you'll embark on a fascinating journey through the integration of OpenAI's powerful language models with MLflow, where we'll be building an actually useful tool that can, with the simple addition of a decorator to any function that we declare, get immediate feedback within an interactive environment on code under active development."}),"\n",(0,o.jsx)(n.h3,{id:"learning-objectives",children:"Learning Objectives"}),"\n",(0,o.jsx)(n.p,{children:"By the end of this tutorial, you will:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Master OpenAI's GPT-4 for Code Assistance"}),": Understand how to leverage OpenAI's GPT-4 model for providing real-time coding assistance. Learn to harness its capabilities for generating code suggestions, explanations, and improving overall coding efficiency."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Utilize MLflow for Enhanced Model Tracking"}),": Delve into MLflow's powerful tracking systems to manage machine learning experiments. Learn how to adapt a ",(0,o.jsx)(n.code,{children:"pyfunc model"})," from within MLflow to control how the output of an LLM is displayed from within an interactive coding environment."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Seamlessly Combine OpenAI and MLflow"}),": Discover the practical steps to integrate OpenAI's AI capabilities with MLflow's tracking and management systems. This integration exemplifies how combining these tools can streamline the development and deployment of intelligent applications."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Develop and Deploy a Custom Python Code Assistant"}),": Gain hands-on experience in creating a Python-based code assistant using OpenAI's model. Then, actually see it in action as it is used within a Jupyter Notebook environment to give helpful assistance during development."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Improve Code Quality with AI-driven Insights"}),": Apply AI-powered analysis to review and enhance your code. Learn how an AI assistant can provide real-time feedback on code quality, suggest improvements, and help maintain high coding standards."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Explore Advanced Python Features for Robust Development"}),": Understand advanced Python features like decorators and functional programming. These are crucial for building efficient, scalable, and maintainable software solutions, especially when integrating AI capabilities."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"key-concepts-covered",children:"Key Concepts Covered"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"MLflow's Model Management"}),": Explore MLflow's features for tracking experiments, packaging code into reproducible runs, and managing and deploying models."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Custom Python Model"}),": Learn how to use MLflow's built-in customization for defining a generic Python function that will allow you to craft your own processing logic while interfacing with OpenAI to perform alternative handling to the LLM's output."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Python Decorators and Functional Programming"}),": Learn about advanced Python concepts like decorators and functional programming for efficient code evaluation and enhancement."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"why-use-mlflow-for-this",children:"Why Use MLflow for this?"}),"\n",(0,o.jsx)(n.p,{children:"MLflow emerges as a pivotal element in this tutorial, making our use case not only feasible but also highly efficient. It offers a secure and seamless interface with OpenAI's advanced language models. In this tutorial, we'll explore how MLflow greatly simplifies the process of storing specific instructional prompts for OpenAI, and enhances the user experience by adding readable formatting to the returned text."}),"\n",(0,o.jsx)(n.p,{children:"The flexibility and scalability of MLflow make it a robust choice for integrating with various tools, particularly in interactive coding environments like Jupyter Notebooks. We'll witness firsthand how MLflow facilitates rapid experimentation and iteration, allowing us to create a functional tool with minimal effort. This tool will not just assist in development but will also elevate the overall coding and model management experience. By leveraging MLflow's comprehensive features, we'll navigate through a seamless end-to-end workflow, from setting up intricate models to executing complex tasks efficiently."}),"\n",(0,o.jsx)(n.h3,{id:"important-cost-considerations-for-gpt-4-usage",children:"Important Cost Considerations for GPT-4 Usage"}),"\n",(0,o.jsx)(n.h4,{id:"higher-cost-of-gpt-4",children:"High(er) Cost of GPT-4"}),"\n",(0,o.jsxs)(n.p,{children:["It's crucial to note that ",(0,o.jsx)(n.strong,{children:"using GPT-4, as opposed to GPT-4o-mini, can incur higher costs"}),". GPT-4's advanced capabilities and enhanced performance come with a price premium, making it a more expensive option compared to earlier models like GPT-3.5."]}),"\n",(0,o.jsx)(n.h4,{id:"why-choose-gpt-4-in-this-tutorial",children:"Why Choose GPT-4 in This Tutorial"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Enhanced Capabilities"}),": We opt for GPT-4 in this tutorial primarily due to its superior capabilities, especially in areas such as code refactoring and detecting issues in code implementations."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Demonstration Purposes"}),": The use of GPT-4 here serves as a demonstration to showcase the cutting-edge advancements in language model technology and its applications in complex tasks."]}),"\n"]}),"\n",(0,o.jsx)(n.h4,{id:"consider-alternatives-for-cost-effectiveness",children:"Consider Alternatives for Cost-Effectiveness"}),"\n",(0,o.jsxs)(n.p,{children:["For projects where cost is a significant concern, or where the advanced features of GPT-4 are not essential, ",(0,o.jsx)(n.strong,{children:"consider using GPT-4o-mini or other more cost-effective alternatives"}),". These models still offer robust performance for a wide range of applications but at a lower cost."]}),"\n",(0,o.jsx)(n.h4,{id:"budgeting-for-gpt-4",children:"Budgeting for GPT-4"}),"\n",(0,o.jsx)(n.p,{children:"If you choose to proceed with GPT-4, it is recommended to:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Monitor Usage Closely"}),": Keep track of your API usage to manage costs effectively."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Budget Accordingly"}),": Allocate sufficient resources to cover the higher costs associated with GPT-4."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"By being mindful of these cost considerations, you can make informed decisions about which OpenAI model best suits your project's needs and budget."}),"\n",(0,o.jsx)(r.d,{executionCount:1,children:`import warnings

# Disable a few less-than-useful UserWarnings from setuptools and pydantic
warnings.filterwarnings("ignore", category=UserWarning)`}),"\n",(0,o.jsx)(r.d,{executionCount:2,children:`import functools
import inspect
import os
import textwrap

import openai

import mlflow
from mlflow.models.signature import ModelSignature
from mlflow.pyfunc import PythonModel
from mlflow.types.schema import ColSpec, ParamSchema, ParamSpec, Schema

# Run a quick validation that we have an entry for the OPEN_API_KEY within environment variables
assert "OPENAI_API_KEY" in os.environ, "OPENAI_API_KEY environment variable must be set"`}),"\n",(0,o.jsx)(n.h3,{id:"initializing-the-mlflow-client",children:"Initializing the MLflow Client"}),"\n",(0,o.jsxs)(n.p,{children:["Depending on where you are running this notebook, your configuration may vary for how you initialize the MLflow Client.\nIf you are uncertain about how to configure and use an MLflow Tracking server or what options are available, you can see ",(0,o.jsx)(n.a,{href:"https://www.mlflow.org/docs/latest/ml/getting-started/running-notebooks/",children:"the guide to running notebooks here"})," for more information on setting the tracking server uri and configuring access to either managed or self-managed MLflow tracking servers."]}),"\n",(0,o.jsx)(n.h3,{id:"setting-the-mlflow-experiment",children:"Setting the MLflow Experiment"}),"\n",(0,o.jsxs)(n.p,{children:["In this section of the tutorial, we use MLflow's ",(0,o.jsx)(n.code,{children:"set_experiment"}),' function to define an experiment named "Code Helper". This step is essential in MLflow\'s workflow for several reasons:']}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Unique Identification"}),': A unique and distinct experiment name like "Code Helper" is crucial for easy identification and segregation of the runs pertaining to this specific project, especially when working on multiple projects or experiments simultaneously.']}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Simplified Tracking"}),": Naming the experiment enables effortless tracking of all the runs and models associated with it, maintaining a clear history of model development, parameters, metrics, and results."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Ease of Access in MLflow UI"}),": A distinct experiment name ensures quick location and access to our experiment's runs and models within the MLflow UI, facilitating analysis, comparison of different runs, and sharing findings."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Facilitates Better Organization"}),": As projects grow in complexity, having a well-named experiment aids in better organization and management of the machine learning lifecycle, making it easier to navigate through different stages of the experiment."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:'The use of a unique experiment name like "Code Helper" lays the foundation for efficient model management and tracking, a critical aspect of any machine learning workflow, especially in dynamic and collaborative environments.'}),"\n",(0,o.jsx)(r.d,{executionCount:3,children:'mlflow.set_experiment("Code Helper")'}),"\n",(0,o.jsx)(a.p,{children:"<Experiment: artifact_location='file:///Users/benjamin.wilson/repos/mlflow-fork/mlflow/docs/source/llms/openai/notebooks/mlruns/703316263508654123', creation_time=1701891935339, experiment_id='703316263508654123', last_update_time=1701891935339, lifecycle_stage='active', name='Code Helper', tags={}>"}),"\n",(0,o.jsx)(n.h3,{id:"defining-the-instruction-set-for-the-ai-model",children:"Defining the Instruction Set for the AI Model"}),"\n",(0,o.jsxs)(n.p,{children:["In this part of the tutorial, we define a specific set of instructions to guide the behavior of our AI model. This is achieved through the ",(0,o.jsx)(n.code,{children:"instruction"})," array, which outlines the roles and expected interactions between the system (AI model) and the user. Here's a breakdown of its components:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"System Role"}),": The first element of the array defines the role of the AI model as a 'system'. It describes the model as a 'helpful expert Software Engineer' whose purpose is to assist in code analysis and provide educational support. The AI model is expected to:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Offer clear explanations of the code's intent."}),"\n",(0,o.jsx)(n.li,{children:"Assess the code's correctness and readability."}),"\n",(0,o.jsx)(n.li,{children:"Suggest improvements while focusing on simplicity, maintainability, and adherence to best coding practices."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"User Role"}),": The second element represents the 'user' role. This part is where the user (in this case, the person learning from the tutorial) interacts with the AI model by submitting code for review. The user is expected to:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Provide code snippets for evaluation."}),"\n",(0,o.jsx)(n.li,{children:"Seek feedback and suggestions for code improvement from the AI model."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"This instruction set is crucial for creating an interactive learning experience. It guides the AI model in providing targeted, constructive feedback, making it an invaluable tool for understanding coding practices and enhancing coding skills."}),"\n",(0,o.jsx)(r.d,{executionCount:4,children:`instruction = [
  {
      "role": "system",
      "content": (
          "As an AI specializing in code review, your task is to analyze and critique the submitted code. For each code snippet, provide a detailed review that includes: "
          "1. Identification of any errors or bugs. "
          "2. Suggestions for optimizing code efficiency and structure. "
          "3. Recommendations for enhancing code readability and maintainability. "
          "4. Best practice advice relevant to the code's language and functionality. "
          "Your feedback should help the user improve their coding skills and understand best practices in software development."
      ),
  },
  {"role": "user", "content": "Review my code and suggest improvements: {code}"},
]`}),"\n",(0,o.jsx)(n.h3,{id:"defining-and-utilizing-the-model-signature-in-mlflow",children:"Defining and Utilizing the Model Signature in MLflow"}),"\n",(0,o.jsxs)(n.p,{children:["In this part of the tutorial, we define a ",(0,o.jsx)(n.code,{children:"ModelSignature"})," for our OpenAI model, which is a crucial step in both saving the base model and later in our custom Python Model implementation. Here's an overview of the process:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Model Signature Definition"}),":","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["We create a ",(0,o.jsx)(n.code,{children:"ModelSignature"})," object that specifies the input, output, and parameters of our model."]}),"\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"inputs"})," and ",(0,o.jsx)(n.code,{children:"outputs"})," are defined as schemas with a single string column, indicating that our model will be processing string type data."]}),"\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"params"})," schema includes two parameters: ",(0,o.jsx)(n.code,{children:"max_tokens"})," and ",(0,o.jsx)(n.code,{children:"temperature"}),", each with a default value and data type defined."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Note"})," We're explicitly defining the model signature here for purposes of demonstration. The schema will be automatically inferred if you do not specify one and will be set based on the ",(0,o.jsx)(n.code,{children:"task"})," that is defined when logging or saving the model."]}),"\n"]}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Logging the Base OpenAI Model"}),":","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Using ",(0,o.jsx)(n.code,{children:"mlflow.openai.log_model"}),", we log the base OpenAI model (",(0,o.jsx)(n.code,{children:"gpt-4"}),") along with the ",(0,o.jsx)(n.code,{children:"instruction"})," set we defined earlier."]}),"\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"signature"})," we defined is also passed in this step, ensuring that the model is saved with the correct specifications for inputs, outputs, and parameters."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"This dual-purpose signature is vital as it ensures consistency in how the model processes data both in its base form and when it's later wrapped in a custom Python Model. This approach streamlines the workflow and maintains uniformity across different stages of model implementation and deployment."}),"\n",(0,o.jsx)(r.d,{executionCount:5,children:`# Define the model signature that will be used for both the base model and the eventual custom pyfunc implementation later.
signature = ModelSignature(
  inputs=Schema([ColSpec(type="string", name=None)]),
  outputs=Schema([ColSpec(type="string", name=None)]),
  params=ParamSchema(
      [
          ParamSpec(name="max_tokens", default=500, dtype="long"),
          ParamSpec(name="temperature", default=0, dtype="float"),
      ]
  ),
)

# Log the base OpenAI model with the included instruction set (prompt)
with mlflow.start_run():
  model_info = mlflow.openai.log_model(
      model="gpt-4",
      task=openai.chat.completions,
      name="base_model",
      messages=instruction,
      signature=signature,
  )`}),"\n",(0,o.jsx)(n.h3,{id:"our-logged-model-in-the-mlflow-ui",children:"Our logged model in the MLflow UI"}),"\n",(0,o.jsx)(n.p,{children:"After logging the model, you can open up the MLflow UI and see the components that have been logged. Notice that the configuration for our model, including the model type (gpt-4), the endpoint API type (task) is recorded (chat.completions), and the prompt have all been logged."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://i.imgur.com/72EGEG8.png",alt:"openai-ui"})}),"\n",(0,o.jsx)(n.h3,{id:"enhancing-user-experience-with-custom-pyfunc-implementation",children:"Enhancing User Experience with Custom Pyfunc Implementation"}),"\n",(0,o.jsxs)(n.p,{children:["In this section, we introduce a custom Python Model, ",(0,o.jsx)(n.code,{children:"CodeHelper"}),", which significantly improves the user experience when interacting with the OpenAI model in an interactive development environment like Jupyter Notebook. The ",(0,o.jsx)(n.code,{children:"CodeHelper"})," class is designed to format the output from the OpenAI model, making it more readable and visually appealing, similar to a chat interface. Here's how it works:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Initialization and Model Loading"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"CodeHelper"})," class inherits from ",(0,o.jsx)(n.code,{children:"PythonModel"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"load_context"})," method is used to load the OpenAI model, which is saved as ",(0,o.jsx)(n.code,{children:"self.model"}),". This model is loaded from the ",(0,o.jsx)(n.code,{children:"context.artifacts"}),", ensuring that the appropriate model is used for predictions."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Response Formatting"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"_format_response"})," method is crucial for enhancing the output format."]}),"\n",(0,o.jsx)(n.li,{children:"It processes each item in the response, handling text and code blocks differently."}),"\n",(0,o.jsx)(n.li,{children:"Text lines outside of code blocks are wrapped to a width of 80 characters for better readability."}),"\n",(0,o.jsxs)(n.li,{children:["Lines within code blocks (marked by ",(0,o.jsx)(n.code,{children:"```"}),") are not wrapped, preserving the code structure."]}),"\n",(0,o.jsx)(n.li,{children:"This formatting creates an output that resembles a chat interface, making the interaction more intuitive and user-friendly."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Making Predictions"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"predict"})," method is where the model's prediction occurs."]}),"\n",(0,o.jsx)(n.li,{children:"It calls the loaded OpenAI model to get the raw response for the given input."}),"\n",(0,o.jsxs)(n.li,{children:["The raw response is then passed to the ",(0,o.jsx)(n.code,{children:"_format_response"})," method for formatting."]}),"\n",(0,o.jsx)(n.li,{children:"The formatted response is returned, providing a clear and easy-to-read output."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["By implementing this custom ",(0,o.jsx)(n.code,{children:"pyfunc"}),", we enhance the user's interaction with the AI code helper. It not only makes the output easier to understand but also presents it in a familiar format, akin to messaging, which is especially beneficial in interactive coding environments."]}),"\n",(0,o.jsx)(r.d,{executionCount:6,children:`# Custom pyfunc implementation that applies text and code formatting to the output results from the OpenAI model
class CodeHelper(PythonModel):
  def __init__(self):
      self.model = None

  def load_context(self, context):
      self.model = mlflow.pyfunc.load_model(context.artifacts["model_path"])

  @staticmethod
  def _format_response(response):
      formatted_output = ""
      in_code_block = False

      for item in response:
          lines = item.split("
")
          for line in lines:
              # Check for the start/end of a code block
              if line.strip().startswith("\`\`\`"):
                  in_code_block = not in_code_block
                  formatted_output += line + "
"
                  continue

              if in_code_block:
                  # Don't wrap lines inside code blocks
                  formatted_output += line + "
"
              else:
                  # Wrap lines outside of code blocks
                  wrapped_lines = textwrap.fill(line, width=80)
                  formatted_output += wrapped_lines + "
"

      return formatted_output

  def predict(self, context, model_input, params):
      # Call the loaded OpenAI model instance to get the raw response
      raw_response = self.model.predict(model_input, params=params)

      # Return the formatted response so that it is easier to read
      return self._format_response(raw_response)`}),"\n",(0,o.jsx)(n.h3,{id:"saving-the-custom-python-model-with-mlflow",children:"Saving the Custom Python Model with MLflow"}),"\n",(0,o.jsxs)(n.p,{children:["This part of the tutorial demonstrates how to save the custom Python model, ",(0,o.jsx)(n.code,{children:"CodeHelper"}),", using MLflow. The process involves specifying the model's location and additional information to ensure it is properly stored and can be retrieved for future use. Here's an overview:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Defining Artifacts"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["An ",(0,o.jsx)(n.code,{children:"artifacts"})," dictionary is created with a key ",(0,o.jsx)(n.code,{children:'"model_path"'})," pointing to the location of the base OpenAI model. This step is important to link our custom model with the necessary base model files. We retrieve the location of the logged openai model from earlier by accessing the ",(0,o.jsx)(n.code,{children:"model_uri"})," property from the return of the ",(0,o.jsx)(n.code,{children:"log_model()"})," function."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Saving the Model"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"mlflow.pyfunc.save_model"})," function is used to save the ",(0,o.jsx)(n.code,{children:"CodeHelper"})," model."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"path"}),": Specifies the location (",(0,o.jsx)(n.code,{children:"final_model_path"}),") where the model will be saved."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"python_model"}),": An instance of the ",(0,o.jsx)(n.code,{children:"CodeHelper"})," class is provided, indicating the model to be saved."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"input_example"}),": An example input (",(0,o.jsx)(n.code,{children:'["x = 1"]'}),") is given, which is useful for understanding the model's expected input format."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"signature"}),": The previously defined ",(0,o.jsx)(n.code,{children:"ModelSignature"})," is passed, ensuring consistency in how the model processes data."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"artifacts"}),": The ",(0,o.jsx)(n.code,{children:"artifacts"})," dictionary is included to associate the base OpenAI model with our custom model."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["This step is crucial for encapsulating the entire functionality of our ",(0,o.jsx)(n.code,{children:"CodeHelper"})," model in a format that MLflow can manage and track. It allows for easy deployment and versioning of the model, facilitating its use in various applications and environments."]}),"\n",(0,o.jsx)(r.d,{executionCount:7,children:`# Define the location of the base model that we'll be using within our custom pyfunc implementation
artifacts = {"model_path": model_info.model_uri}

with mlflow.start_run():
  helper_model = mlflow.pyfunc.log_model(
      name="code_helper",
      python_model=CodeHelper(),
      input_example=["x = 1"],
      signature=signature,
      artifacts=artifacts,
  )`}),"\n",(0,o.jsx)(a.p,{children:"Downloading artifacts:   0%|          | 0/5 [00:00<?, ?it/s]"}),"\n",(0,o.jsx)(n.h3,{id:"load-our-saved-custom-python-model",children:"Load our saved Custom Python Model"}),"\n",(0,o.jsx)(n.p,{children:"In this next section, we load the model that we just saved so that we can use it!"}),"\n",(0,o.jsx)(r.d,{executionCount:8,children:"loaded_helper = mlflow.pyfunc.load_model(helper_model.model_uri)"}),"\n",(0,o.jsx)(n.h3,{id:"comparing-two-approaches-for-code-review-with-mlflow-models",children:"Comparing Two Approaches for Code Review with MLflow Models"}),"\n",(0,o.jsx)(n.p,{children:"In this tutorial, we'll explore two different approaches to utilizing MLflow models for reviewing and providing feedback on code. These approaches offer varying levels of complexity and integration, catering to different use cases and preferences."}),"\n",(0,o.jsxs)(n.h4,{id:"approach-1-the-simple-review-function",children:["Approach 1: The Simple ",(0,o.jsx)(n.code,{children:"review"})," Function"]}),"\n",(0,o.jsxs)(n.p,{children:["Our first approach is a straightforward ",(0,o.jsx)(n.code,{children:"review"})," function. This method is less intrusive and does not modify the original function's behavior. It's ideal for scenarios where you want to manually trigger a review of the function's code and don't need to see the output result of the function to have context of the LLM's analysis."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"How it works"}),": The ",(0,o.jsx)(n.code,{children:"review"})," function takes a function and an MLflow model as arguments. It then uses the model to evaluate the source code of the given function."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Manual Invocation"}),": You need to explicitly call ",(0,o.jsx)(n.code,{children:"review(my_func)"})," to review ",(0,o.jsx)(n.code,{children:"my_func"}),". This approach is manual and does not automatically integrate with function calls."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Simplicity"}),": This method is simpler and more direct, making it suitable for one-off evaluations or for use cases where automatic review is not required."]}),"\n"]}),"\n",(0,o.jsxs)(n.h4,{id:"approach-2-the-advanced-code_inspector-decorator",children:["Approach 2: The Advanced ",(0,o.jsx)(n.code,{children:"code_inspector"})," Decorator"]}),"\n",(0,o.jsxs)(n.p,{children:["The second approach is an advanced decorator, ",(0,o.jsx)(n.code,{children:"code_inspector"}),", which integrates more deeply by automatically reviewing the function and allowing the function's evaluation to execute. This can be helpful for more complex functions where the output result, in conjunction with the evaluation from the code helper, can allow for a deeper understanding of any observed logical flaws."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Automatic Evaluation"}),": When applied as a decorator, ",(0,o.jsx)(n.code,{children:"code_inspector"})," evaluates the function's code automatically on each call."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Error Handling"}),": Includes robust error handling within the evaluation process."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Function Modification"}),": This method modifies the function's behavior, incorporating an automatic review process."]}),"\n"]}),"\n",(0,o.jsxs)(n.h4,{id:"introduction-to-the-review-function",children:["Introduction to the ",(0,o.jsx)(n.code,{children:"review"})," Function"]}),"\n",(0,o.jsxs)(n.p,{children:["We'll start by examining the ",(0,o.jsx)(n.code,{children:"review"})," function. This function will be defined in the next cell of our Jupyter notebook. Here's a quick overview of what the ",(0,o.jsx)(n.code,{children:"review"})," function does:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Inputs"}),": It takes a function and an MLflow model as inputs."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Functionality"}),": Extracts the source code of the input function and uses the MLflow model to provide feedback on it."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Error Handling"}),": Enhanced with error handling to manage exceptions gracefully."]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["In the following Jupyter notebook cell, you'll see the implementation of the ",(0,o.jsx)(n.code,{children:"review"})," function, demonstrating its simplicity and effectiveness in evaluating code."]}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsxs)(n.p,{children:["After exploring the ",(0,o.jsx)(n.code,{children:"review"})," function, we will delve into the more complex ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator to understand its automatic evaluation process and error handling mechanisms."]}),"\n",(0,o.jsx)(r.d,{executionCount:9,children:`def review(func, model):
  """
  Function to review the source code of a given function using a specified MLflow model.

  Args:
  func (function): The function to review.
  model (MLflow pyfunc model): The MLflow pyfunc model used for evaluation.

  Returns:
  The model's prediction or an error message.
  """
  try:
      # Extracting the source code of the function
      source_code = inspect.getsource(func)

      # Using the model to predict/evaluate the source code
      prediction = model.predict([source_code])
      print(prediction)
  except Exception as e:
      # Handling any exceptions that occur and returning an error message
      return f"Error during model prediction or source code inspection: {e}"`}),"\n",(0,o.jsxs)(n.h3,{id:"explanation-and-review-of-process_data-function",children:["Explanation and Review of ",(0,o.jsx)(n.code,{children:"process_data"})," Function"]}),"\n",(0,o.jsx)(n.h4,{id:"function-overview",children:"Function Overview"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"process_data"})," function aims to process a list by identifying unique elements and counting duplicates. However, the implementation has several inefficiencies and readability issues."]}),"\n",(0,o.jsx)(n.h4,{id:"suggested-revised-code",children:"Suggested Revised Code"}),"\n",(0,o.jsx)(n.p,{children:"The output from GPT-4's analysis provides clear and concise feedback, precisely as the prompt instructed it to. With the MLflow integration of this application, the simplicity of using the tool is evident, allowing us to get high-quality guidance during the development process with as little as a single, simple function call."}),"\n",(0,o.jsx)(r.d,{executionCount:10,children:`def process_data(lst):
  s = 0
  q = []
  for i in range(len(lst)):
      a = lst[i]
      for j in range(i + 1, len(lst)):
          b = lst[j]
          if a == b:
              s += 1
          else:
              q.append(b)
  rslt = [x for x in lst if x not in q]
  k = []
  for i in rslt:
      if i not in k:
          k.append(i)
  final_data = sorted(k, reverse=True)
  return final_data, s


review(process_data, loaded_helper)`}),"\n",(0,o.jsx)(a.p,{children:`Your code seems to be trying to find the count of duplicate elements in a list
and return a sorted list of unique elements in descending order along with the
count of duplicates. Here are some suggestions to improve your code:

1. **Errors or Bugs**: There are no syntax errors in your code, but the logic is
flawed. The variable \`s\` is supposed to count the number of duplicate elements,
but it only counts the number of times an element is equal to another element in
the list, which is not the same thing. Also, the way you're trying to get unique
elements is inefficient and can lead to incorrect results.

2. **Optimizing Code Efficiency and Structure**: You can use Python's built-in
\`set\` and \`list\` data structures to simplify your code and make it more
efficient. A \`set\` in Python is an unordered collection of unique elements. You
can convert your list to a set to remove duplicates, and then convert it back to
a list. The length of the original list minus the length of the list with
duplicates removed will give you the number of duplicate elements.

3. **Enhancing Code Readability and Maintainability**: Use meaningful variable
names to make your code easier to understand. Also, add comments to explain what
each part of your code does.

4. **Best Practice Advice**: It's a good practice to write a docstring at the
beginning of your function to explain what it does.

Here's a revised version of your code incorporating these suggestions:

\`\`\`python
def process_data(lst):
  """
  This function takes a list as input, removes duplicate elements, sorts the remaining elements in descending order,
  and counts the number of duplicate elements in the original list.
  It returns a tuple containing the sorted list of unique elements and the count of duplicate elements.
  """
  # Convert the list to a set to remove duplicates, then convert it back to a list
  unique_elements = list(set(lst))
  
  # Sort the list of unique elements in descending order
  sorted_unique_elements = sorted(unique_elements, reverse=True)
  
  # Count the number of duplicate elements
  duplicate_count = len(lst) - len(unique_elements)
  
  return sorted_unique_elements, duplicate_count
\`\`\`
This version of the code is simpler, more efficient, and easier to understand.
It also correctly counts the number of duplicate elements in the list.`}),"\n",(0,o.jsxs)(n.h3,{id:"the-code_inspector-decorator-function",children:["The ",(0,o.jsx)(n.code,{children:"code_inspector"})," Decorator Function"]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"code_inspector"})," function is a Python decorator designed to augment functions with automatic code review capabilities using an MLflow pyfunc model.\nThis decorator enhances the functionality of functions, allowing them to be automatically reviewed for code quality and correctness using an MLflow pyfunc model, thereby enriching the development and learning experience. As compared to the above implementation for the ",(0,o.jsx)(n.code,{children:"review()"})," function, this approach will allow the function to be executed when called, enhancing the contextual information when paired with the automated code review."]}),"\n",(0,o.jsx)(r.d,{executionCount:11,children:`import functools
import inspect


def code_inspector(model):
  """
  Decorator for automatic code review using an MLflow pyfunc model.

  Args:
      model: The MLflow pyfunc model for code evaluation.
  """

  def decorator_check_my_function(func):
      # Decorator that wraps around the given function
      @functools.wraps(func)
      def wrapper(*args, **kwargs):
          try:
              # Extracting the source code of the decorated function
              parsed_func = inspect.getsource(func)

              # Using the MLflow model to evaluate the extracted source code
              response = model.predict([parsed_func])

              # Printing the response for code review feedback
              print(response)

          except Exception as e:
              # Handling exceptions during model prediction or source code extraction
              print("Error during model prediction or formatting:", e)

          # Executing and returning the original function's output
          return func(*args, **kwargs)

      return wrapper

  return decorator_check_my_function`}),"\n",(0,o.jsxs)(n.h3,{id:"first-usage-trial-the-summing_function-with-code_inspector",children:["First Usage Trial: The ",(0,o.jsx)(n.code,{children:"summing_function"})," with ",(0,o.jsx)(n.code,{children:"code_inspector"})]}),"\n",(0,o.jsxs)(n.p,{children:["We apply the ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator to a function named ",(0,o.jsx)(n.code,{children:"summing_function"}),". This function is designed to calculate the sum of sums for a given range. Here's an insight into its functionality and the enhancement brought by ",(0,o.jsx)(n.code,{children:"code_inspector"}),":"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Function Overview"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"summing_function"})," calculates the cumulative sum of numbers up to ",(0,o.jsx)(n.code,{children:"n"}),". It does so by iterating over a range and summing the intermediate sums at each step."]}),"\n",(0,o.jsxs)(n.li,{children:["A dictionary, ",(0,o.jsx)(n.code,{children:"intermediate_sums"}),", is used to store these sums, which are then aggregated to find the final sum."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsxs)(n.strong,{children:["Using ",(0,o.jsx)(n.code,{children:"code_inspector"})]}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["The function is decorated with ",(0,o.jsx)(n.code,{children:"code_inspector(loaded_helper)"}),". This means that each time ",(0,o.jsx)(n.code,{children:"summing_function"})," is called, the MLflow model loaded as ",(0,o.jsx)(n.code,{children:"loaded_helper"})," analyzes its code."]}),"\n",(0,o.jsx)(n.li,{children:"The decorator provides real-time feedback on the code, assessing aspects like quality, efficiency, and best practices."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Educational Benefit"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"This setup is ideal for learning, allowing users to receive instant, actionable feedback on their code."}),"\n",(0,o.jsx)(n.li,{children:"It offers a practical way to understand the logic behind the function and learn coding optimizations and improvements."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["By integrating ",(0,o.jsx)(n.code,{children:"code_inspector"})," with ",(0,o.jsx)(n.code,{children:"summing_function"}),", the tutorial demonstrates an interactive approach to enhancing coding skills, with immediate feedback aiding in understanding and improvement."]}),"\n",(0,o.jsx)(n.p,{children:"Before proceeding to see the response from GPT-4, can you identify all of the issues in this code (there are more than a few)?"}),"\n",(0,o.jsx)(r.d,{executionCount:12,children:`@code_inspector(loaded_helper)
def summing_function(n):
  sum_result = 0

  intermediate_sums = {}

  for i in range(1, n + 1):
      intermediate_sums[str(i)] = sum(x for x in range(1, i + 1))
      for key in intermediate_sums:
          if key == str(i):
              sum_result = intermediate_sums[key]  # noqa: F841

  final_sum = sum(intermediate_sums[key] for key in intermediate_sums if int(key) == n)

  return int(str(final_sum))`}),"\n",(0,o.jsxs)(n.h3,{id:"execution-and-analysis-of-summing_function1000",children:["Execution and Analysis of ",(0,o.jsx)(n.code,{children:"summing_function(1000)"})]}),"\n",(0,o.jsxs)(n.p,{children:["When we execute ",(0,o.jsx)(n.code,{children:"summing_function(1000)"}),", several key processes take place, utilizing our custom MLflow model through the ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator. Here's what happens:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Decorator Activation"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["On calling ",(0,o.jsx)(n.code,{children:"summing_function(1000)"}),", the ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator is the first to activate. This decorator is designed to use the ",(0,o.jsx)(n.code,{children:"loaded_helper"})," model to analyze the decorated function."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Model Analyzes the Function Code"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"code_inspector"})," retrieves the source code of ",(0,o.jsx)(n.code,{children:"summing_function"})," using the ",(0,o.jsx)(n.code,{children:"inspect"})," module."]}),"\n",(0,o.jsxs)(n.li,{children:["This source code is then passed to the ",(0,o.jsx)(n.code,{children:"loaded_helper"})," model, which performs an analysis based on its training and provided instructions. The model predicts feedback on code quality, efficiency, and best practices."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Feedback Presentation"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"The feedback generated by the model is printed out. This feedback might include suggestions for code optimization, identification of potential errors, or general advice on coding practices."}),"\n",(0,o.jsx)(n.li,{children:"This step provides an educational insight into the code quality before the function executes its logic."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Function Execution"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["After the feedback is displayed, the ",(0,o.jsx)(n.code,{children:"summing_function"})," proceeds to execute with the input ",(0,o.jsx)(n.code,{children:"1000"}),"."]}),"\n",(0,o.jsx)(n.li,{children:"The function calculates the cumulative sum of numbers up to 1000, but due to its inefficient implementation, this process may be slower and more resource-intensive than necessary."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Return of Result"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"The function returns the final computed sum, which is the result of the summing logic implemented within it."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["This demonstration highlights how the ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator, combined with our custom MLflow model, provides a unique, real-time code analysis and feedback mechanism, enhancing the learning and development experience in an interactive environment."]}),"\n",(0,o.jsx)(r.d,{executionCount:13,children:"summing_function(1000)"}),"\n",(0,o.jsx)(a.p,{children:`Here's a detailed review of your code:

1. Errors or bugs: There are no syntax errors in your code, but there is a
logical error. The summing_function is supposed to calculate the sum of numbers
from 1 to n, but it's doing more than that. It's calculating the sum of numbers
from 1 to i for each i in the range 1 to n, storing these sums in a dictionary,
and then summing these sums again. This is unnecessary and inefficient.

2. Optimizing code efficiency and structure: The function can be simplified
significantly. The sum of numbers from 1 to n can be calculated directly using
the formula n*(n+1)/2. This eliminates the need for the loop and the dictionary,
making the function much more efficient.

3. Enhancing code readability and maintainability: The code can be made more
readable by simplifying it and removing unnecessary parts. The use of the
dictionary and the conversion of numbers to strings and back to numbers is
confusing and unnecessary.

4. Best practice advice: In Python, it's best to keep things simple and
readable. Avoid unnecessary complexity and use built-in functions and operators
where possible. Also, avoid unnecessary type conversions.

Here's a simplified version of your function:

\`\`\`python
def summing_function(n):
  return n * (n + 1) // 2
\`\`\`

This function does exactly the same thing as your original function, but it's
much simpler, more efficient, and more readable.`}),"\n",(0,o.jsx)(a.p,{children:"500500"}),"\n",(0,o.jsxs)(n.h3,{id:"analysis-of-one_liner-function",children:["Analysis of ",(0,o.jsx)(n.code,{children:"one_liner"})," Function"]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"one_liner"})," function, decorated with ",(0,o.jsx)(n.code,{children:"code_inspector"}),", demonstrates an interesting approach but has several issues:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Complexity"}),": The function uses nested lambda expressions to calculate the factorial of ",(0,o.jsx)(n.code,{children:"n"}),". While compact, this approach is overly complex and hard to read, making the code less maintainable and understandable."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Readability"}),": Good coding practice emphasizes readability, which is compromised here due to the one-liner approach. Such code can be challenging to debug and understand, especially for those unfamiliar with the specific coding style."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Best Practices"}),": While demonstrating Python's capabilities for writing concise code, this example strays from common best practices, particularly in terms of clarity and simplicity."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["When reviewed by the ",(0,o.jsx)(n.code,{children:"code_inspector"})," model, these issues are likely to be highlighted, emphasizing the importance of balancing clever coding with readability and maintainability."]}),"\n",(0,o.jsx)(r.d,{executionCount:14,children:`@code_inspector(loaded_helper)
def one_liner(n):
  return (
      (lambda f, n: f(f, n))(lambda f, n: n * f(f, n - 1) if n > 1 else 1, n)
      if isinstance(n, int) and n >= 0
      else "Invalid input"
  )`}),"\n",(0,o.jsx)(r.d,{executionCount:15,children:"one_liner(10)"}),"\n",(0,o.jsx)(a.p,{children:`The code you've provided is a one-liner function that calculates the factorial
of a given number \`n\`. It uses a lambda function to recursively calculate the
factorial. Here's a review of your code:

1. Errors or bugs: There are no syntax errors or bugs in your code. It correctly
checks if the input is a non-negative integer and calculates the factorial. If
the input is not a non-negative integer, it returns "Invalid input".

2. Optimizing code efficiency and structure: The code is already quite efficient
as it uses recursion to calculate the factorial. However, the structure of the
code is quite complex due to the use of a lambda function for recursion. This
can make the code difficult to understand and maintain.

3. Enhancing code readability and maintainability: The code could be made more
readable by breaking it down into multiple lines and adding comments to explain
what each part of the code does. The use of a lambda function for recursion
makes the code more difficult to understand than necessary. A more
straightforward recursive function could be used instead.

4. Best practice advice: In Python, it's generally recommended to use clear and
simple code over complex one-liners. This is because clear code is easier to
read, understand, and maintain. While one-liners can be fun and clever, they can
also be difficult to understand and debug.

Here's a revised version of your code that's easier to understand:

\`\`\`python
def factorial(n):
  # Check if the input is a non-negative integer
  if not isinstance(n, int) or n < 0:
      return "Invalid input"
  
  # Base case: factorial of 0 is 1
  if n == 0:
      return 1
  
  # Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1)
\`\`\`

This version of the code does the same thing as your original code, but it's
much easier to understand because it uses a straightforward recursive function
instead of a lambda function.`}),"\n",(0,o.jsx)(a.p,{children:"3628800"}),"\n",(0,o.jsxs)(n.h3,{id:"reviewing-find_phone_numbers-function",children:["Reviewing ",(0,o.jsx)(n.code,{children:"find_phone_numbers"})," Function"]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"find_phone_numbers"})," function, enhanced with the ",(0,o.jsx)(n.code,{children:"code_inspector"}),", is designed to extract phone numbers from a given text but contains a few notable issues and expected behaviors:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Typographical Error"}),": The function incorrectly uses ",(0,o.jsx)(n.code,{children:"re.complie"})," instead of ",(0,o.jsx)(n.code,{children:"re.compile"}),", leading to a runtime exception."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Pattern Matching Inaccuracy"}),": The regular expression pattern ",(0,o.jsx)(n.code,{children:'"(\\d{3})-\\d{3}-\\d{4}"'}),", while formatted for typical phone numbers, can result in errors if a phone number does not appear in the string."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Lack of Error Handling"}),": Directly accessing the first element in ",(0,o.jsx)(n.code,{children:"phone_numbers"})," without checking if the list is empty can lead to an ",(0,o.jsx)(n.code,{children:"IndexError"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Import Statement Position"}),": The ",(0,o.jsx)(n.code,{children:"import re"})," statement is inside the function, which is unconventional. Imports are typically placed at the top of a script for clarity."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Analysis and Exception Handling"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Due to how we crafted our custom MLflow model in ",(0,o.jsx)(n.code,{children:"code_inspector"}),", the function's issues will be analyzed and feedback will be returned before the function's logic is executed."]}),"\n",(0,o.jsx)(n.li,{children:"After this analysis, the execution of the function will likely result in an exception (due to the typographical error), demonstrating the importance of careful code review and testing."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"code_inspector"})," model's review will highlight these coding missteps, emphasizing the value of proper syntax, pattern accuracy, and error handling in Python programming."]}),"\n",(0,o.jsx)(r.d,{executionCount:16,children:`import re


@code_inspector(loaded_helper)
def find_phone_numbers(text):
  pattern = r"(d{3})-d{3}-d{4}"

  compiled_pattern = re.complie(pattern)

  phone_numbers = compiled_pattern.findall(text)
  first_number = phone_numbers[0]

  print(f"First found phone number: {first_number}")
  return phone_numbers`}),"\n",(0,o.jsx)(r.d,{executionCount:17,children:'find_phone_numbers("Give us a call at 888-867-5309")'}),"\n",(0,o.jsx)(a.p,{children:`Here's a detailed review of your code:

1. Errors or Bugs:
 - There's a typo in the \`re.compile\` function. You've written \`re.complie\`
instead of \`re.compile\`.

2. Suggestions for Optimizing Code Efficiency and Structure:
 - The import statement \`import re\` is inside the function. It's a good
practice to keep all import statements at the top of the file. This makes it
easier to see what modules are being used in the script.
 - The function will throw an error if no phone numbers are found in the text
because you're trying to access the first element of \`phone_numbers\` without
checking if it exists. You should add a check to see if any phone numbers were
found before trying to access the first one.

3. Recommendations for Enhancing Code Readability and Maintainability:
 - The function name \`find_phone_numbers\` is clear and descriptive, which is
good. However, the variable \`pattern\` could be more descriptive. Consider
renaming it to \`phone_number_pattern\` or something similar.
 - You should add docstrings to your function to describe what it does, what
its parameters are, and what it returns.

4. Best Practice Advice:
 - Use exception handling to catch potential errors and make your program more
robust.
 - Avoid using print statements in functions that are meant to return a value.
If you want to debug, consider using logging instead.

Here's how you could improve your code:

\`\`\`python
import re

def find_phone_numbers(text):
  """
  This function finds all phone numbers in the given text.

  Parameters:
  text (str): The text to search for phone numbers.

  Returns:
  list: A list of all found phone numbers.
  """
  phone_number_pattern = "(d{3})-d{3}-d{4}"
  compiled_pattern = re.compile(phone_number_pattern)

  phone_numbers = compiled_pattern.findall(text)

  if phone_numbers:
      print(f"First found phone number: {phone_numbers[0]}")

  return phone_numbers
\`\`\`

Remember, the print statement is not recommended in production code. It's there
for the sake of this example.`}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:"---------------------------------------------------------------------------"}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:"AttributeError                            Traceback (most recent call last)"}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:`/var/folders/cd/n8n0rm2x53l_s0xv_j_xklb00000gp/T/ipykernel_38633/78508464.py in <cell line: 1>()
----> 1 find_phone_numbers("Give us a call at 888-867-5309")
`}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:`/var/folders/cd/n8n0rm2x53l_s0xv_j_xklb00000gp/T/ipykernel_38633/2021999358.py in wrapper(*args, **kwargs)
   18             except Exception as e:
   19                 print("Error during model prediction or formatting:", e)
---> 20             return func(*args, **kwargs)
   21 
   22         return wrapper`}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:`/var/folders/cd/n8n0rm2x53l_s0xv_j_xklb00000gp/T/ipykernel_38633/773713950.py in find_phone_numbers(text)
    5     import re
    6 
----> 7     compiled_pattern = re.complie(pattern)
    8 
    9     phone_numbers = compiled_pattern.findall(text)`}),"\n",(0,o.jsx)(a.p,{isStderr:!0,children:"AttributeError: module 're' has no attribute 'complie'"}),"\n",(0,o.jsx)(n.h3,{id:"conclusion-harnessing-the-power-of-mlflow-in-ai-assisted-development",children:"Conclusion: Harnessing the Power of MLflow in AI-Assisted Development"}),"\n",(0,o.jsx)(n.p,{children:"As we conclude this tutorial, we have traversed through the integration of OpenAI's language models with the robust capabilities of MLflow, creating a powerful toolkit for AI-assisted software development. Here's a recap of our journey and the key takeaways:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Integrating OpenAI with MLflow"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"We explored how to seamlessly integrate OpenAI's advanced language models within the MLflow framework. This integration highlighted the potential of combining AI intelligence with robust model management."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Implementing a Custom Python Model"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Our journey included creating a custom ",(0,o.jsx)(n.code,{children:"CodeHelper"})," model, which showcased MLflow's flexibility in handling custom Python functions. This model significantly enhanced the user experience by formatting AI responses into a more readable format."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Real-Time Code Analysis and Feedback"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["By employing the ",(0,o.jsx)(n.code,{children:"code_inspector"})," decorator, we demonstrated MLflow's utility in providing real-time, insightful feedback on code quality and efficiency, fostering a learning environment that guides towards best coding practices."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Handling Complex Code Analysis"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"The tutorial presented complex code examples, revealing how MLflow, combined with OpenAI, can handle intricate code analysis, offering suggestions and identifying potential issues."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Learning from Interactive Feedback"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"The interactive feedback loop, enabled by our MLflow model, illustrated a practical approach to learning and improving coding skills, making this toolset particularly valuable for educational and development purposes."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Flexibility and Scalability of MLflow"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Throughout the tutorial, MLflow's flexibility and scalability were evident. Whether it's managing simple Python functions or integrating state-of-the-art AI models, MLflow proved to be an invaluable asset in streamlining the model management process."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"In summary, this tutorial not only provided insights into effective coding practices but also underscored the versatility of MLflow in enhancing AI-assisted software development. It stands as a testament to how machine learning tools and models can be innovatively applied to improve code quality, efficiency, and the overall development experience."}),"\n",(0,o.jsx)(n.h3,{id:"whats-next",children:"What's Next?"}),"\n",(0,o.jsxs)(n.p,{children:["To continue your learning journey, see the additional ",(0,o.jsx)(n.a,{href:"https://www.mlflow.org/docs/latest/genai/flavors/openai/index.html#advanced-tutorials",children:"advanced tutorials for MLflow's OpenAI flavor"}),"."]})]})}function m(e={}){let{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},75453:function(e,n,i){i.d(n,{p:()=>o});var t=i(74848);let o=({children:e,isStderr:n})=>(0,t.jsx)("pre",{style:{margin:0,borderRadius:0,background:"none",fontSize:"0.85rem",flexGrow:1,padding:"var(--padding-sm)"},children:e})},75940:function(e,n,i){i.d(n,{d:()=>s});var t=i(74848),o=i(37449);let s=({children:e,executionCount:n})=>(0,t.jsx)("div",{style:{flexGrow:1,minWidth:0,marginTop:"var(--padding-md)",width:"100%"},children:(0,t.jsx)(o.A,{className:"codeBlock_oJcR",language:"python",children:e})})},42676:function(e,n,i){i.d(n,{O:()=>r});var t=i(74848),o=i(96540);let s="3.6.1";function r({children:e,href:n}){let i=(0,o.useCallback)(async e=>{if(e.preventDefault(),window.gtag)try{window.gtag("event","notebook-download",{href:n})}catch{}s.includes("dev")||(n=n.replace(/\/master\//,`/v${s}/`));let i=await fetch(n),t=await i.blob(),o=window.URL.createObjectURL(t),r=document.createElement("a");r.style.display="none",r.href=o,r.download=n.split("/").pop(),document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(o),document.body.removeChild(r)},[n]);return(0,t.jsx)("a",{className:"button button--primary",style:{marginBottom:"1rem",display:"block",width:"min-content"},href:n,download:!0,onClick:i,children:e})}},66354:function(e,n,i){i.d(n,{Q:()=>o});var t=i(74848);let o=({children:e})=>(0,t.jsx)("div",{style:{flexGrow:1,minWidth:0,fontSize:"0.8rem",width:"100%"},children:e})},52915:function(e,n,i){i.d(n,{A:()=>h});var t=i(74848);i(96540);var o=i(34164),s=i(71643),r=i(66697),a=i(92949),l=i(64560),c=i(35062);function d({language:e}){return(0,t.jsxs)("div",{className:(0,o.A)("codeBlockHeader_C_1e"),"aria-label":`Code block header for ${e} code with copy and toggle buttons`,children:[(0,t.jsx)("span",{className:"languageLabel_zr_I",children:e}),(0,t.jsx)(c.A,{})]})}function h({className:e}){let{metadata:n}=(0,s.Ph)(),i=n.language||"text";return(0,t.jsxs)(r.A,{as:"div",className:(0,o.A)(e,n.className),children:[n.title&&(0,t.jsx)("div",{className:"codeBlockTitle_d3dP",children:(0,t.jsx)(a.A,{children:n.title})}),(0,t.jsxs)("div",{className:"codeBlockContent_bxn0",children:[(0,t.jsx)(d,{language:i}),(0,t.jsx)(l.A,{})]})]})}}}]);
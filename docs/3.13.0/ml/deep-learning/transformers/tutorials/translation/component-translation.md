# Introduction to Translation with Transformers and MLflow

[Download this notebook](https://raw.githubusercontent.com/mlflow/mlflow/master/docs/docs/classic-ml/deep-learning/transformers/tutorials/translation/component-translation.ipynb)

In this tutorial, we delve into the world of language translation by leveraging the power of [Transformers](https://huggingface.co/docs/transformers) and MLflow. This guide is crafted for practitioners with a grasp of machine learning concepts who seek to streamline their translation model workflows. We will showcase the use of MLflow to log, manage, and serve a cutting-edge translation model - the `google/flan-t5-base` from the [🤗 Hugging Face](https://huggingface.co/) library.

### Learning Objectives[​](#learning-objectives "Direct link to Learning Objectives")

Throughout this tutorial, you will:

* Construct a translation **pipeline** using `flan-t5-base` from the Transformers library.
* **Log** the translation model and its configurations using MLflow.
* Determine the input and output **signature** of the translation model automatically.
* **Retrieve** a logged translation model from MLflow for direct interaction.
* Emulate the deployment of the translation model using MLflow's **pyfunc** model flavor for language translation tasks.

By the conclusion of this tutorial, you'll gain a thorough insight into managing and deploying translation models with MLflow, thereby enhancing your machine learning operations for language processing.

### Why was this model chosen?[​](#why-was-this-model-chosen "Direct link to Why was this model chosen?")

The [flan-t5-base](https://huggingface.co/google/flan-t5-base) offers a few benefits:

* **Size**: it's a relatively small model for the comparatively powerful performance.
* **Enhanced Language Coverage**: Expanding on the original [T5 model](https://huggingface.co/t5-base), the flan-t5 has a much larger breadth of languages that it supports.

### Setting Up the Translation Environment[​](#setting-up-the-translation-environment "Direct link to Setting Up the Translation Environment")

Begin by setting up the essential components for translation tasks using the google/flan-t5-base model.

#### Importing Libraries[​](#importing-libraries "Direct link to Importing Libraries")

We import the `transformers` library for access to the translation model and tokenizer. Additionally, `mlflow` is included for model tracking and management, creating a comprehensive environment for our translation tasks.

#### Initializing the Model[​](#initializing-the-model "Direct link to Initializing the Model")

The `google/flan-t5-base` model, known for its translation effectiveness, is loaded from the Hugging Face repository. This pre-trained model is a key component of our setup.

#### Setting Up the Tokenizer[​](#setting-up-the-tokenizer "Direct link to Setting Up the Tokenizer")

We initialize the tokenizer corresponding to our model. The tokenizer plays a critical role in processing text input, making it understandable for the model.

#### Creating the Pipeline[​](#creating-the-pipeline "Direct link to Creating the Pipeline")

A translation pipeline for English to French is created. This pipeline streamlines the process, allowing us to focus on inputting text and receiving translations without managing model and tokenizer interactions directly.

python

```
# Disable tokenizers warnings when constructing pipelines

%env TOKENIZERS_PARALLELISM=false



import warnings



# Disable a few less-than-useful UserWarnings from setuptools and pydantic

warnings.filterwarnings("ignore", category=UserWarning)
```

```
env: TOKENIZERS_PARALLELISM=false
```

python

```
import transformers



import mlflow



model_architecture = "google/flan-t5-base"



translation_pipeline = transformers.pipeline(

  task="translation_en_to_fr",

  model=transformers.T5ForConditionalGeneration.from_pretrained(

      model_architecture, max_length=1000

  ),

  tokenizer=transformers.T5TokenizerFast.from_pretrained(model_architecture, return_tensors="pt"),

)
```

### Testing the Translation Pipeline[​](#testing-the-translation-pipeline "Direct link to Testing the Translation Pipeline")

We perform a preliminary check on our translation pipeline to ensure its proper functioning before logging it with MLflow.

#### Model Verification[​](#model-verification "Direct link to Model Verification")

A test translation allows us to verify that the model accurately translates text, in this case from English to French, ensuring the model's basic functionality.

#### Error Prevention[​](#error-prevention "Direct link to Error Prevention")

Identifying potential issues before model logging helps prevent future errors during deployment or inference, saving time and resources.

#### Resource Management[​](#resource-management "Direct link to Resource Management")

Testing minimizes wasteful use of resources, particularly important given the large size of these models and the resources needed to save and load them.

#### Pipeline Validation[​](#pipeline-validation "Direct link to Pipeline Validation")

This step confirms that both the model and tokenizer in the pipeline are correctly configured and capable of processing the input as expected.

python

```
# Evaluate the pipeline on a sample sentence prior to logging

translation_pipeline(

  "translate English to French: I enjoyed my slow saunter along the Champs-Élysées."

)
```

```
[{'translation_text': "J'ai apprécié mon sajour lente sur les Champs-Élysées."}]
```

### Evaluating the Translation Results[​](#evaluating-the-translation-results "Direct link to Evaluating the Translation Results")

Upon running our initial translation through the pipeline, we observed that the output, while generally accurate, exhibited areas for improvement.

The initial translation output was:

text

```
    `[{'translation_text': "J'ai apprécié mon sajour lente sur les Champs-Élysées."}]`
```

This translation captures the essence of the original English sentence but shows minor grammatical errors and word choice issues. For instance, a more refined translation might be:

text

```
    `"J'ai apprécié ma lente promenade le long des Champs-Élysées."`
```

This version corrects grammatical gender and adds necessary articles, accentuation, and hyphenation. These subtle nuances enhance the translation quality significantly. The base model's performance is encouraging, indicating the potential for more precise translations with further fine-tuning and context. MLflow's tracking and management capabilities will be instrumental in monitoring the iterative improvements of such models.

In summary, while the pursuit of perfection in machine translation is ongoing, the initial results are a promising step towards achieving natural and accurate translations.

### Setting Model Parameters and Input Example[​](#setting-model-parameters-and-input-example "Direct link to Setting Model Parameters and Input Example")

We establish crucial model parameters and define an input example to ensure consistency and reliability in our model's deployment.

#### Defining Model Parameters[​](#defining-model-parameters "Direct link to Defining Model Parameters")

Setting key parameters like `max_length` is vital for controlling model behavior during inference. For example, a `max_length` of 1000 ensures the model handles longer sentences effectively, crucial for maintaining context in translations.

#### Automatic Signature Inference[​](#automatic-signature-inference "Direct link to Automatic Signature Inference")

When you provide an `input_example` to `log_model()`, MLflow will automatically infer the model signature, which defines the input and output schema. By passing a tuple of `(data, params)` as the `input_example`, we can include inference parameters in the signature as well.

#### Benefits of This Process[​](#benefits-of-this-process "Direct link to Benefits of This Process")

* **Enhanced Portability**: Properly defined parameters and input examples make the model more adaptable to different environments.
* **Error Reduction**: This step minimizes the risk of encountering schema-related errors during deployment.
* **Clear Documentation**: It serves as a clear guide for developers and users, simplifying the model's integration into applications.

By establishing these parameters and input example, we lay a robust foundation for our model's subsequent tracking, management, and serving via MLflow.

python

```
# Define the parameters that we are permitting to be used at inference time, along with their default values if not overridden

model_params = {"max_length": 1000}



# The input_example can be a tuple of (data, params) to include inference parameters.

# The signature will be automatically inferred when input_example is provided to log_model.

input_example = ("This is a sample input sentence.", model_params)
```

### Reviewing the Input Example[​](#reviewing-the-input-example "Direct link to Reviewing the Input Example")

After configuring the translation model and defining the input example, let's review it to confirm it captures our model's expected input format and parameters.

The input example serves as a blueprint for MLflow to interact with the model, encompassing:

* **Input Data:** The text to be translated.
* **Parameters:** Additional configurable settings like `max_length`, determining the maximum length of the translation output.

Reviewing the input example allows us to validate the data formats and ensure that our model will function as expected when deployed.

python

```
# Visualize the input example that will be used for automatic signature inference

input_example
```

### Creating an experiment[​](#creating-an-experiment "Direct link to Creating an experiment")

We create a new MLflow Experiment so that the run we're going to log our model to does not log to the default experiment and instead has its own contextually relevant entry.

python

```
# If you are running this tutorial in local mode, leave the next line commented out.

# Otherwise, uncomment the following line and set your tracking uri to your local or remote tracking server.



# mlflow.set_tracking_uri("http://127.0.0.1:8080")



mlflow.set_experiment("Translation")
```

```
<Experiment: artifact_location='file:///Users/benjamin.wilson/repos/mlflow-fork/mlflow/docs/source/llms/transformers/tutorials/translation/mlruns/996217394074032926', creation_time=1701286351921, experiment_id='996217394074032926', last_update_time=1701286351921, lifecycle_stage='active', name='Translation', tags={}>
```

### Logging the Model with MLflow[​](#logging-the-model-with-mlflow "Direct link to Logging the Model with MLflow")

We are now set to log our translation model with MLflow, ensuring its trackability and version control.

#### Starting an MLflow Run[​](#starting-an-mlflow-run "Direct link to Starting an MLflow Run")

We initiate the logging process by starting an MLflow run. This encapsulates all the model information, including artifacts and parameters, within a unique run ID.

#### Using `mlflow.transformers.log_model`[​](#using-mlflowtransformerslog_model "Direct link to using-mlflowtransformerslog_model")

This function is integral to logging our model in MLflow. It records various aspects of the model:

* **Model Pipeline**: The complete translation model pipeline, encompassing the model and tokenizer.
* **Artifact Path**: The directory path in the MLflow run where the model artifacts are stored.
* **Model Signature**: The pre-defined signature indicating the model's expected input-output formats.
* **Model Parameters**: Key parameters of the model, like `max_length`, providing insights into model behavior.

#### Outcome of Model Logging[​](#outcome-of-model-logging "Direct link to Outcome of Model Logging")

Post logging, we obtain the `model_info` object, which encompasses all the essential metadata about the logged model, such as its storage location. This metadata is vital for future deployment and performance analysis.

python

```
with mlflow.start_run():

  model_info = mlflow.transformers.log_model(

      transformers_model=translation_pipeline,

      name="french_translator",

      input_example=input_example,

      model_params=model_params,

  )
```

### Inspecting the Loaded Model Components[​](#inspecting-the-loaded-model-components "Direct link to Inspecting the Loaded Model Components")

After loading the model from MLflow, we delve into its individual components to verify their setup and functionality.

#### Component Breakdown[​](#component-breakdown "Direct link to Component Breakdown")

The loaded model comprises several key components, each playing a crucial role in its operation:

* **Task**: Defines the model's specific use-case, confirming its suitability for the intended task.
* **Device Map**: Details the hardware configuration, important for performance optimization.
* **Model Instance**: The core `T5ForConditionalGeneration` model, central to the translation process.
* **Tokenizer**: The `T5TokenizerFast`, responsible for processing text inputs into a format understandable by the model.
* **Framework**: Indicates the underlying deep learning framework, essential for compatibility considerations.

#### Ensuring Component Integrity and Functionality[​](#ensuring-component-integrity-and-functionality "Direct link to Ensuring Component Integrity and Functionality")

Inspecting these components ensures that:

* The model aligns with our task requirements.
* Hardware resources are optimally utilized.
* Text inputs are correctly preprocessed for model consumption.
* The model's compatibility with the selected deep learning framework is confirmed.

This verification step is vital for the successful application of the model in practical scenarios, reinforcing the robustness and flexibility of MLflow.

python

```
# Load our saved model as a dictionary of components, comprising the model itself, the tokenizer, and any other components that were saved

translation_components = mlflow.transformers.load_model(

  model_info.model_uri, return_type="components"

)



# Show the components that made up our pipeline that we saved and what type each are

for key, value in translation_components.items():

  print(f"{key} -> {type(value).__name__}")
```

```
2023/11/30 12:00:44 INFO mlflow.transformers: 'runs:/2357c12ca17a4f328b2f72cbb7d70343/french_translator' resolved as 'file:///Users/benjamin.wilson/repos/mlflow-fork/mlflow/docs/source/llms/transformers/tutorials/translation/mlruns/996217394074032926/2357c12ca17a4f328b2f72cbb7d70343/artifacts/french_translator'
```

```
Loading checkpoint shards:   0%|          | 0/2 [00:00<?, ?it/s]
```

```
task -> str
device_map -> str
model -> T5ForConditionalGeneration
tokenizer -> T5TokenizerFast
framework -> str
```

### Understanding Model Flavors in MLflow[​](#understanding-model-flavors-in-mlflow "Direct link to Understanding Model Flavors in MLflow")

The `model_info.flavors` attribute in MLflow provides insights into the model's capabilities and deployment requirements across various platforms.

Flavors in MLflow represent different ways the model can be utilized and deployed. Key aspects include:

* **Python Function Flavor:** Indicates the model's compatibility as a generic Python function, including model binary, loader module, Python version, and environment specifications.
* **Transformers Flavor:** Tailored for models from the Hugging Face Transformers library, covering transformers version, code dependencies, task, instance type, source model name, pipeline model type, framework, tokenizer type, components, and model binary.

This information guides how to interact with the model within MLflow, ensuring proper deployment with the right environment and dependencies, whether for inference or further model refinement.

python

```
# Show the model parameters that were saved with our model to gain an understanding of what is recorded when saving a transformers pipeline

model_info.flavors
```

```
{'python_function': {'model_binary': 'model',
'loader_module': 'mlflow.transformers',
'python_version': '3.8.13',
'env': {'conda': 'conda.yaml', 'virtualenv': 'python_env.yaml'}},
'transformers': {'transformers_version': '4.34.1',
'code': None,
'task': 'translation_en_to_fr',
'instance_type': 'TranslationPipeline',
'source_model_name': 'google/flan-t5-base',
'pipeline_model_type': 'T5ForConditionalGeneration',
'framework': 'pt',
'tokenizer_type': 'T5TokenizerFast',
'components': ['tokenizer'],
'model_binary': 'model'}}
```

### Evaluating the Translation Output[​](#evaluating-the-translation-output "Direct link to Evaluating the Translation Output")

After testing our pipeline with a challenging sentence, we assess the translation's accuracy.

#### Assessing Translation Nuances[​](#assessing-translation-nuances "Direct link to Assessing Translation Nuances")

The model impressively interprets "Nice" correctly as a city name, rather than an adjective. This shows its ability to discern context and proper nouns. Furthermore, it cleverly substitutes the English play on words with the French adjective "bien," maintaining the sentence's intended sentiment.

#### Contextual Understanding[​](#contextual-understanding "Direct link to Contextual Understanding")

This translation exemplifies the model's strength in understanding context and language subtleties, which is essential for practical applications where precision and contextual accuracy are key.

#### The Importance of Rigorous Testing[​](#the-importance-of-rigorous-testing "Direct link to The Importance of Rigorous Testing")

Testing with linguistically complex sentences is vital. It ensures the model can handle various linguistic challenges, an important aspect of deploying models in real-world scenarios.

python

```
# Load our saved model as a transformers pipeline and validate the performance for a simple translation task

translation_pipeline = mlflow.transformers.load_model(model_info.model_uri)

response = translation_pipeline("I have heard that Nice is nice this time of year.")



print(response)
```

```
2023/11/30 12:00:45 INFO mlflow.transformers: 'runs:/2357c12ca17a4f328b2f72cbb7d70343/french_translator' resolved as 'file:///Users/benjamin.wilson/repos/mlflow-fork/mlflow/docs/source/llms/transformers/tutorials/translation/mlruns/996217394074032926/2357c12ca17a4f328b2f72cbb7d70343/artifacts/french_translator'
```

```
Loading checkpoint shards:   0%|          | 0/2 [00:00<?, ?it/s]
```

```
[{'translation_text': "J'ai entendu que Nice est bien cette période de l'année."}]
```

### Assessing the Reconstructed Pipeline's Translation[​](#assessing-the-reconstructed-pipelines-translation "Direct link to Assessing the Reconstructed Pipeline's Translation")

We now evaluate the performance of a pipeline reconstructed from loaded components.

#### Reconstruction and Testing[​](#reconstruction-and-testing "Direct link to Reconstruction and Testing")

Using the dictionary of loaded components, we successfully reconstruct a new translation pipeline. This step is essential to confirm that our logged and retrieved components function cohesively when reassembled.

#### Translation Quality[​](#translation-quality "Direct link to Translation Quality")

The reconstructed pipeline adeptly translates English into French, maintaining both the syntactic accuracy and semantic coherence of the original sentence. This reflects the Transformers library's ability to simplify the utilization of complex deep learning models.

#### Verifying Model Integrity[​](#verifying-model-integrity "Direct link to Verifying Model Integrity")

This test is key in verifying that the saved model and its components are not only retrievable but also function effectively post-deployment. It ensures the continued integrity and performance of the model in practical applications.

python

```
# Verify that the components that we loaded can be constructed into a pipeline manually

reconstructed_pipeline = transformers.pipeline(**translation_components)



reconstructed_response = reconstructed_pipeline(

  "transformers makes using Deep Learning models easy and fun!"

)



print(reconstructed_response)
```

```
[{'translation_text': "transformers simplifie l'utilisation des modèles de l'apprentissage profonde!"}]
```

### Direct Utilization of Model Components[​](#direct-utilization-of-model-components "Direct link to Direct Utilization of Model Components")

Explore the granular control over individual model components for custom translation processes.

#### Component Interaction[​](#component-interaction "Direct link to Component Interaction")

Interacting with the model's individual components offers a deeper level of customization. This approach is particularly beneficial when integrating the model into larger systems or when specific manipulations of inputs and outputs are required.

#### Insight into Model Structure[​](#insight-into-model-structure "Direct link to Insight into Model Structure")

Examining the keys of the `translation_components` dictionary reveals the structure and components of our model. This includes the task, device mapping, core model, tokenizer, and framework information, each crucial for the translation process.

#### Benefits of Component-Level Control[​](#benefits-of-component-level-control "Direct link to Benefits of Component-Level Control")

Utilizing components individually allows for precise adjustments and custom integrations. It's an effective way to tailor the translation process to specific needs, ensuring more control over the model's behavior and output.

python

```
# View the components that were saved with our model

translation_components.keys()
```

```
dict_keys(['task', 'device_map', 'model', 'tokenizer', 'framework'])
```

### Advanced Usage: Direct Interaction with Model Components[​](#advanced-usage-direct-interaction-with-model-components "Direct link to Advanced Usage: Direct Interaction with Model Components")

Direct interaction with a model's components offers flexibility and control for advanced use cases in translation.

Using the model and tokenizer components directly, as opposed to the higher-level pipeline, allows for:

* Customization of the tokenization process.
* Specific tensor handling, including device specification (CPU, GPU, MPS, etc.).
* Generation and adjustment of predictions on-the-fly.
* Decoding outputs with options for post-processing.

This approach provides granular control, enabling interventions in the model's operations, such as dynamic input adjustments or output post-processing. However, it also increases complexity, requiring a deeper understanding of the model and tokenizer and the management of more code. Opting for direct interaction over the pipeline means balancing ease of use against the level of control required for your application. It's a critical decision, especially for advanced scenarios demanding precise manipulation of the translation process.

python

```
# Access the individual components from the components dictionary

tokenizer = translation_components["tokenizer"]

model = translation_components["model"]



query = "Translate to French: Liberty, equality, fraternity, or death."



# This notebook was run on a Mac laptop, so we'll send the output tensor to the "mps" device.

# If you're running this on a different system, ensure that you're sending the tensor output to the appropriate device to ensure that

# the model is able to read it from memory.

inputs = tokenizer.encode(query, return_tensors="pt").to("mps")

outputs = model.generate(inputs).to("mps")

result = tokenizer.decode(outputs[0])



# Since we're not using a pipeline here, we need to modify the output slightly to get only the translated text.

print(result.replace("<pad> ", "

").replace("</s>", ""))
```

```

La liberté, l'égalité, la fraternité ou la mort.
```

### Tutorial Recap[​](#tutorial-recap "Direct link to Tutorial Recap")

This tutorial provided insights into combining MLflow with advanced language translation models, emphasizing streamlined model management and deployment.

We explored several key aspects:

* Setting up and testing a translation pipeline using Transformers.
* Logging the model and its configurations to MLflow for effective versioning and tracking.
* Inferring and examining the model's signature for ensuring input and output consistency.
* Interacting with logged model components for enhanced flexibility in deployment.
* Discussing the nuances of language translation and the role of context in achieving accurate results.

### The Power of MLflow and Model Metadata[​](#the-power-of-mlflow-and-model-metadata "Direct link to The Power of MLflow and Model Metadata")

MLflow's integration proved instrumental in managing and deploying the translation model. The tutorial highlighted how MLflow's metadata, including the model's signature and flavors, aids in consistent and reliable deployment, catering to production needs.

### Reflection on the Translation Output[​](#reflection-on-the-translation-output "Direct link to Reflection on the Translation Output")

The final translation output, while not exact, captured the essence of the iconic French motto, highlighting the model's effectiveness and the importance of contextual understanding in translations. Further exploration on the cultural significance of the phrase can be found on its [Wikipedia Page](https://en.wikipedia.org/wiki/Libert%C3%A9,_%C3%A9galit%C3%A9,_fraternit%C3%A9).

### Conclusion[​](#conclusion "Direct link to Conclusion")

The combination of MLflow and advanced language models like Transformers offers a powerful approach to deploying sophisticated AI solutions. This tutorial aimed to empower your journey in machine learning, whether in translation tasks or other ML applications.

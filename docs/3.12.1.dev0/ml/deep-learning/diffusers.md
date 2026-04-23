# MLflow Diffusers Integration

## Introduction[​](#introduction "Direct link to Introduction")

**Diffusers** is the Hugging Face library for diffusion models like Stable Diffusion, FLUX, and others. LoRA (Low-Rank Adaptation) adapters are lightweight fine-tuned weights that customize a base model for specific styles or concepts without modifying the full model.

The `mlflow.diffusers` flavor lets you log, version, and serve LoRA adapters as MLflow models. Only the adapter weights are stored as artifacts — the base model is referenced by ID and downloaded at inference time.

## Why MLflow + Diffusers?[​](#why-mlflow--diffusers "Direct link to Why MLflow + Diffusers?")

#### Adapter Versioning

Log each LoRA checkpoint as a versioned model. Compare sample outputs across training steps and register the best one.

#### Lineage Tracking

Every adapter links back to its training run, base model, rank, target modules, and training dataset.

#### Model Registry

Register adapters with aliases like @champion and @challenger. Deploy from the registry, not from run IDs.

#### Inference Ready

load\_model() returns a ready-to-use object. Call load\_pipeline() to get a diffusers pipeline with LoRA applied, or use pyfunc for serving.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

bash

```
pip install "diffusers>=0.37.0" peft safetensors torch transformers
```

## Getting Started[​](#getting-started "Direct link to Getting Started")

### Log a LoRA adapter[​](#log-a-lora-adapter "Direct link to Log a LoRA adapter")

python

```
import mlflow.diffusers

with mlflow.start_run():
    model_info = mlflow.diffusers.log_model(
        adapter_path="./my_lora_weights",
        base_model="black-forest-labs/FLUX.1-dev",
        name="lora_adapter",
        metadata={
            "lora_rank": 16,
            "target_modules": ["to_q", "to_v"],
            "training_steps": 1000,
        },
    )
```

### Load and generate[​](#load-and-generate "Direct link to Load and generate")

python

```
loaded = mlflow.diffusers.load_model(model_info.model_uri)

# Get a ready-to-use pipeline with LoRA applied
pipe = loaded.load_pipeline()
image = pipe("a photo of a cat in watercolor style").images[0]
```

### Serve via pyfunc[​](#serve-via-pyfunc "Direct link to Serve via pyfunc")

python

```
import pandas as pd

loaded_pyfunc = mlflow.pyfunc.load_model(model_info.model_uri)

result = loaded_pyfunc.predict(
    pd.DataFrame({"prompt": ["a sunset over mountains"]}),
    params={"num_inference_steps": 30, "height": 512, "width": 512},
)
# result[0] contains PNG bytes
```

## Model Signature[​](#model-signature "Direct link to Model Signature")

The default signature for diffusers adapter models:

| Role       | Type      | Name                                |
| ---------- | --------- | ----------------------------------- |
| **Input**  | `string`  | `prompt`                            |
| **Output** | `binary`  | `image`                             |
| **Params** | `integer` | `num_inference_steps` (default: 30) |
|            | `double`  | `guidance_scale` (default: 7.5)     |
|            | `integer` | `height` (default: 512)             |
|            | `integer` | `width` (default: 512)              |
|            | `string`  | `negative_prompt` (default: "")     |

## How It Works[​](#how-it-works "Direct link to How It Works")

1. **`save_model` / `log_model`** copies the adapter weights into the MLflow artifact store and records the base model ID in the flavor config
2. **`load_model`** returns a `DiffusersAdapterModel` dataclass with `load_pipeline()` which calls `DiffusionPipeline.from_pretrained()` + `load_lora_weights()`
3. **pyfunc** wraps the pipeline for batch inference: prompt strings in, PNG bytes out

The base model is never stored as an artifact — only referenced by its Hugging Face ID. This keeps artifacts small (typically under 500MB for LoRA weights) while supporting any `DiffusionPipeline` subclass.

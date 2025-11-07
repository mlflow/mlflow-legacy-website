# MLflow Keras 3.0 Integration

**Keras 3.0** represents a revolutionary leap in deep learning accessibility and flexibility. As a high-level neural networks API, Keras empowers everyone from machine learning beginners to seasoned researchers to build, train, and deploy sophisticated models with unprecedented ease.

What makes Keras 3.0 truly special is its **multi-backend architecture**. Unlike previous versions, Keras 3.0 can seamlessly run on top of TensorFlow, JAX, and PyTorch - giving you the freedom to choose the best backend for your specific use case without changing your code.

Why Keras 3.0 is a Game Changer

#### Multi-Backend Freedom[​](#multi-backend-freedom "Direct link to Multi-Backend Freedom")

* 🔧 **TensorFlow**: Production-ready ecosystem with robust deployment options
* ⚡ **JAX**: High-performance computing with automatic differentiation and JIT compilation
* 🔬 **PyTorch**: Research-friendly interface with dynamic computation graphs
* 🔄 **Seamless Switching**: Change backends without rewriting your model code

#### Universal Design Philosophy[​](#universal-design-philosophy "Direct link to Universal Design Philosophy")

* 🎯 **Beginner-Friendly**: Simple, intuitive APIs that make deep learning accessible
* 🚀 **Research-Ready**: Advanced features for cutting-edge experimentation
* 🏗️ **Production-Proven**: Battle-tested in enterprise environments worldwide
* 📚 **Comprehensive**: From basic neural networks to complex architectures

## Why MLflow + Keras 3.0?[​](#why-mlflow--keras-30 "Direct link to Why MLflow + Keras 3.0?")

The combination of MLflow's experiment tracking capabilities with Keras 3.0's flexibility creates a powerful synergy for deep learning practitioners:

* 📊 **One-Line Setup**: Enable comprehensive experiment tracking with just `mlflow.tensorflow.autolog()` - no configuration required
* 🔄 **Multi-Backend Consistency**: Track experiments consistently across TensorFlow, JAX, and PyTorch backends
* ⚙️ **Zero-Code Integration**: Your existing Keras training code works unchanged - autologging captures everything automatically
* 🛠️ **Advanced Customization**: When you need more control, use the [`mlflow.keras.callback.MlflowCallback()`](/docs/3.6.0/api_reference/python_api/mlflow.keras.html#mlflow.keras.callback.MlflowCallback) API for specialized logging requirements
* 🔬 **Complete Reproducibility**: Every parameter, metric, and artifact is captured automatically for perfect experiment reproduction
* 👥 **Effortless Collaboration**: Share comprehensive experiment results through MLflow's intuitive UI without any manual logging

## Key Features[​](#key-features "Direct link to Key Features")

### One-Line Autologging Magic[​](#one-line-autologging-magic "Direct link to One-Line Autologging Magic")

The easiest way to get started with MLflow and Keras is through **autologging** - just add one line of code and MLflow automatically captures everything you need:

python

```
import mlflow

mlflow.tensorflow.autolog()  # That's it! 🎉

# Your existing Keras code works unchanged
model.fit(x_train, y_train, validation_data=(x_val, y_val), epochs=10)
```

What Gets Automatically Logged

#### Metrics[​](#metrics "Direct link to Metrics")

* 📊 **Training & Validation Loss**: Automatic tracking of loss functions across epochs
* 🎯 **Custom Metrics**: Any metrics you specify (accuracy, F1-score, etc.) are logged automatically
* 🛑 **Early Stopping Metrics**: When using `EarlyStopping`, MLflow logs `stopped_epoch`, `restored_epoch`, and restoration details

#### Parameters[​](#parameters "Direct link to Parameters")

* ⚙️ **Training Configuration**: All `fit()` parameters including batch size, epochs, and validation split
* 🧠 **Optimizer Details**: Optimizer name, learning rate, epsilon, and other hyperparameters
* 🛑 **Callback Parameters**: Early stopping settings like `min_delta`, `patience`, and `restore_best_weights`

#### Artifacts[​](#artifacts "Direct link to Artifacts")

* 📋 **Model Summary**: Complete architecture overview logged at training start
* 🤖 **MLflow Model**: Full Keras model saved for easy deployment and inference
* 📊 **TensorBoard Logs**: Complete training history for detailed visualization

#### Smart Run Management[​](#smart-run-management "Direct link to Smart Run Management")

* 🚀 **Automatic Run Creation**: If no run exists, MLflow creates one automatically
* 🔄 **Flexible Run Handling**: Works with existing runs or creates new ones as needed
* ⏹️ **Intelligent Run Ending**: Automatically closes runs when training completes

### Advanced Logging with MlflowCallback[​](#advanced-logging-with-mlflowcallback "Direct link to Advanced Logging with MlflowCallback")

For users who need more control, MLflow's Keras integration also provides the powerful `MlflowCallback` that offers fine-grained customization:

Advanced Callback Capabilities

* 📋 **Custom Parameter Logging**: Selectively log specific parameters and hyperparameters
* 📈 **Granular Metrics Tracking**: Log metrics at custom intervals (per batch, per epoch, or custom frequencies)
* ⏱️ **Flexible Logging Frequency**: Choose between epoch-based or batch-based logging to match your monitoring needs
* 🎛️ **Custom Callback Extensions**: Subclass the callback to implement specialized logging for your unique requirements
* 🏷️ **Advanced Artifact Management**: Control exactly which artifacts get saved and when
* 🔍 **Performance Monitoring**: Add custom tracking for training time, memory usage, and convergence patterns

### Multi-Backend Support[​](#multi-backend-support "Direct link to Multi-Backend Support")

Run the same MLflow tracking code across different Keras backends:

python

```
# Switch backends without changing your MLflow code
os.environ["KERAS_BACKEND"] = "tensorflow"  # or "jax" or "torch"
```

### Advanced Experiment Management[​](#advanced-experiment-management "Direct link to Advanced Experiment Management")

Enterprise-Grade ML Operations

* 📝 **Model Versioning**: Track different model architectures and their performance over time
* 🎯 **Hyperparameter Optimization**: Log and compare results from hyperparameter sweeps with tools like Optuna
* 📦 **Artifact Management**: Store model checkpoints, training plots, and custom visualizations
* 👥 **Collaborative Development**: Share experiment results with team members through MLflow's UI
* 🔄 **Reproducibility**: Capture exact environments and dependencies for perfect experiment reproduction
* 📊 **Performance Analytics**: Detailed insights into training dynamics and model behavior

## Real-World Applications[​](#real-world-applications "Direct link to Real-World Applications")

The MLflow-Keras 3.0 integration excels in scenarios such as:

* 🖼️ **Computer Vision Projects**: Track CNN architectures, data augmentation strategies, and training dynamics for image classification, object detection, and segmentation tasks
* 📝 **Natural Language Processing**: Log transformer models, tokenization strategies, and sequence-to-sequence performance for text generation and understanding
* 🔬 **Research Experiments**: Maintain detailed records of ablation studies, architecture comparisons, and novel technique validation
* 🏭 **Production Pipelines**: Version control models from experimentation through deployment with full lineage tracking
* 🎓 **Educational Projects**: Demonstrate clear progression from simple perceptrons to complex deep architectures
* 📊 **Time Series Analysis**: Track LSTM, GRU, and transformer models for forecasting and anomaly detection

## Get Started in 5 Minutes[​](#get-started-in-5-minutes "Direct link to Get Started in 5 Minutes")

Ready to supercharge your Keras workflow with MLflow? Our comprehensive quickstart tutorial walks you through everything from basic logging to advanced callback customization using a practical MNIST classification example.

[Get Started with Keras 3.0 + MLflow](/docs/3.6.0/ml/deep-learning/keras/quickstart/quickstart-keras.md)

[Master the fundamentals through a hands-on MNIST tutorial covering automatic logging, custom callbacks, multi-backend experimentation, and advanced tracking techniques.](/docs/3.6.0/ml/deep-learning/keras/quickstart/quickstart-keras.md)

## What You'll Master[​](#what-youll-master "Direct link to What You'll Master")

In our comprehensive tutorial, you'll discover how to:

Complete Learning Path

#### Foundation Skills[​](#foundation-skills "Direct link to Foundation Skills")

* 🚀 Set up MLflow tracking for Keras 3.0 workflows across TensorFlow, JAX, and PyTorch backends
* ⚡ Enable comprehensive autologging with a single line of code: `mlflow.tensorflow.autolog()`
* 📊 Use `MlflowCallback` for advanced experiment logging and customization
* 📈 Implement custom logging strategies for both batch-level and epoch-level tracking
* 🎛️ Create specialized callback subclasses for advanced logging requirements

#### Advanced Techniques[​](#advanced-techniques "Direct link to Advanced Techniques")

* 📊 Visualize and compare training results in the MLflow UI with custom metrics
* 🔄 Switch between backends while maintaining consistent experiment tracking
* 🎯 Optimize hyperparameters while automatically logging all trial results
* 📦 Package and version your models for seamless deployment

#### Production Readiness[​](#production-readiness "Direct link to Production Readiness")

* 🏭 Apply enterprise-grade tracking to your production deep learning projects
* 👥 Set up collaborative workflows for team-based model development
* 🔍 Monitor model performance and training dynamics at scale
* 📋 Implement model governance and approval workflows

To learn more about the nuances of the `keras` flavor in MLflow, delve into the comprehensive guide below.

[View the Comprehensive Guide](/docs/3.6.0/ml/deep-learning/keras/guide.md)

Whether you're building your first neural network or optimizing complex architectures for production, the MLflow-Keras 3.0 integration provides the foundation for organized, reproducible, and scalable deep learning experimentation that grows with your needs.

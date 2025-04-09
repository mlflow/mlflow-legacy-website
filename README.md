# MLflow Legacy Website

This is the legacy repository for the website of the MLflow project. The main website contents are already migrated to [a new website](https://github.com/mlflow/mlflow-website/) powered by [Docusaurus](https://docusaurus.io/), and this repository only stores old resources not migrated there, mainly documentation build artifacts.

# Preview
Run `python -m http.server` in the repository root to preview documentation pages.

# Updating the MLflow Docs
**PLEASE DO NOT OPEN A PR TO THIS REPOSITORY FOR UPDATING DOCUMENTATION**.

The documentation pages are build with [Sphinx](https://www.sphinx-doc.org/en/master/) and source `.rst` files are managed in the https://github.com/mlflow/mlflow. To update the doc contents, please follow [instructions for building docs](https://github.com/mlflow/mlflow/blob/master/CONTRIBUTING.rst) and change the source files in the MLflow repository. Your changes will be reflected this repository and the website as a part of new version release.
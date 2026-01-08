## Recommended Alternatives to `pip-install` and Potential Issues with Global Installs

### Recommended Best Practices

Instead of using the `pip-install` input to install packages globally, we recommend the following approaches for CI and production workflows:

#### 1. Using a Virtual Environment

Create and activate a dedicated virtual environment for your workflow, then install dependencies from a requirements file. This promotes isolation, auditability, and compatibility with ecosystem tools.

```yaml
- uses: actions/setup-python@v6
  with:
    python-version: '3.x'

- name: Set up virtual environment
  run: python -m venv .venv

- name: Install dependencies
  run: |
    source .venv/bin/activate
    pip install -r requirements.txt
```

#### 2. Managing Dependencies with Lockfiles

Use tools like `pip-tools`, `pipenv`, `poetry`, or `uv` to generate lockfiles (such as `requirements.txt` or `poetry.lock`). Installing directly from these files ensures reproducible builds and allows tools like Dependabot to monitor your dependencies for updates and vulnerabilities.

```yaml
- uses: actions/setup-python@v6
  with:
    python-version: '3.x'

- name: Upgrade pip
  run: pip install --upgrade pip

- name: Install dependencies from lockfile
  run: pip install -r requirements.txt
```

---

### Potential Issues When Installing Packages Globally

Installing Python packages globally on the CI runner can lead to a variety of subtle or hard-to-diagnose issues:

- **Inconsistent Dependency Resolutions**
  - Installing/upgrading a package globally can mask or override packages in later-created virtual environments, potentially causing discrepancies and making debugging difficult.

- **Breakage with Modern Packaging Tools**
  - Tools such as `uv`, `poetry`, and `pipenv` do not reference the global environment. Packages installed globally via `pip-install` will not be visible in these tools’ environments, leading to `ModuleNotFoundError` or other missing package errors.

- **Stale or Untracked Dependencies**
  - Global installs may satisfy a requirement with an outdated version, meaning pinned or locked dependencies in your project may be ignored. This compromises auditability and can leave code vulnerable.

**Example Scenario:**

> If you use `pip-install` to install `requests==2.31.0` globally, but your application’s virtual environment (set up later in the workflow) specifies `requests>=2.32.0` in its `requirements.txt`, the global environment may prevent the new version from being installed, causing your application to run with unexpected or outdated dependencies.

**Recommendation:**  
For CI, production, and reproducible workflows, always use a managed environment and install only from lockfiles or explicit requirement lists maintained in your source control.

---

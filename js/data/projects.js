// all seven projects live here. cards, filters and the detail dialog are built
// from this, so adding a project is just adding an object below.
// featured: true = full width card, flow: null = no diagram

export const CATEGORIES = {
  data: { label: 'Data Engineering', accent: 'cyan' },
  ai: { label: 'AI / Machine Learning', accent: 'violet' },
  software: { label: 'Software Development', accent: 'green' },
  algorithms: { label: 'Algorithms / Computing', accent: 'amber' },
};

export const projects = [
  {
    id: 'traffic-dw',
    title: 'Smart City Traffic Analytics Data Warehouse',
    tagline:
      'A production-style traffic warehouse: a Spark medallion pipeline feeding a Kimball star schema in SQL Server, gated by an automated data-quality framework.',
    categories: ['data'],
    featured: true,
    description: [
      'A data engineering project that turns high-volume operational traffic data (sensor readings, camera events, traffic lights, weather stations and incident systems) into an analytical platform for historical analysis and BI reporting.',
      'The system runs two complementary processing paths into one conformed warehouse. A big-data path uses Apache Spark to cleanse, deduplicate, validate and aggregate raw sensor CSV and camera JSON into columnar Parquet. A relational path uses set-based T-SQL to load OLTP reference data (roads, sensors, incidents, fleet) with MERGE operations, slowly changing dimension handling and referential integrity.',
      'The warehouse itself follows the Kimball methodology: a bus matrix and explicit grain decisions lead to conformed dimensions and star schemas, separated into dim, fact, stg, etl and mart schemas.',
    ],
    tech: [
      'Python', 'Apache Spark', 'PySpark', 'SQL Server', 'T-SQL', 'Parquet',
      'Power BI', 'Docker', 'PowerShell', 'pytest', 'Streamlit', 'Airflow',
    ],
    metrics: [
      { value: '10', label: 'conformed dimensions' },
      { value: '3', label: 'fact tables, all 3 Kimball types' },
      { value: '41', label: 'catalogued quality checks' },
      { value: '5', label: 'chained Spark jobs' },
    ],
    highlights: [
      {
        title: 'Partitioning chosen so bad data cannot hide',
        body:
          'Bronze is partitioned by the ingest date of the file itself, never by a timestamp read out of the row. A corrupt or future-dated record therefore cannot slip past the validation gate by landing in an unexpected partition. The cleansing job writes a reconciliation dataset asserting rows_in = rows_good + rows_quarantined, and a pytest case checks that assertion against the raw manifest.',
      },
      {
        title: 'Reruns are safe by construction',
        body:
          'Every Spark job overwrites only its own date partition, both dated facts delete-and-reload by DateKey, and the accumulating snapshot fact and all dimensions MERGE on a business key. A dedicated T-SQL test asserts that running the pipeline twice produces identical row counts.',
      },
      {
        title: 'SCD Type 2 with history that actually resolves',
        body:
          'A demo script changes a speed limit in the source system and shows the previous dimension version expiring, the new version becoming current, and, importantly, older fact rows still joining to the historical version rather than being silently rewritten.',
      },
      {
        title: 'Bad data is quarantined, not deleted',
        body:
          'The synthetic data generator deliberately injects roughly 1.5% defective records. Each one lands in quarantine tagged with a rejection reason rather than being dropped, and 41 catalogued post-load checks then gate whether the load is accepted.',
      },
      {
        title: 'Three Kimball fact types in one model',
        body:
          'FactTrafficEvent is a transaction fact, FactHourlyTraffic a periodic snapshot, and FactIncidentLifecycle an accumulating snapshot, so all three patterns are covered against ten conformed dimensions.',
      },
      {
        title: 'Analytical SQL and a reporting layer',
        body:
          'The analytics layer exercises window functions, GROUPING SETS / ROLLUP / CUBE, recursive CTEs and Top-N queries. A set of dedicated mart views forms the semantic model consumed by Power BI.',
      },
      {
        title: 'One command, end to end',
        body:
          'A single PowerShell script starts the containers, deploys both databases, generates seven seeded days of source data, runs the Spark bronze-to-gold pipeline, loads the warehouse per date, asserts the data-quality gate and prints a production-style execution summary. Spark, Java and SQL Server all run in Docker.',
      },
    ],
    flow: [
      { label: 'Sources', sub: 'Sensors · cameras · weather · OLTP', tone: 'source' },
      { label: 'Raw', sub: 'CSV / JSON landing', tone: 'source' },
      { label: 'Spark', sub: 'PySpark 3.5', tone: 'engine' },
      { label: 'Bronze', sub: 'Raw Parquet, partitioned', tone: 'bronze' },
      { label: 'Silver', sub: 'Validated · quarantine', tone: 'silver' },
      { label: 'Gold', sub: 'Conformed KPIs', tone: 'gold' },
      { label: 'SQL Server', sub: 'stg → dim/fact → mart', tone: 'engine' },
      { label: 'Analytics', sub: 'Power BI · SQL', tone: 'sink' },
    ],
    flowCaption:
      'Medallion lake in Parquet, then a Kimball star schema in SQL Server. Quality checks gate the hand-off between the lake and the warehouse.',
    links: {
      github: 'https://github.com/efimijacuneva/TrafficDataWarehouse',
      demo: null,
      note: 'Includes a Streamlit dashboard covering the pipeline, analytics, quality checks and a live SCD Type 2 demo.',
    },
  },

  {
    id: 'vezilka',
    title: 'VEZILKA: Macedonian LLM Trainer',
    tagline:
      'A plugin-driven CLI framework for preprocessing, continued pretraining, LoRA fine-tuning and generation with causal language models.',
    categories: ['ai'],
    period: 'Feb 2026 - Present',
    description: [
      'VEZILKA is a research project at FINKI focused on Macedonian-language NLP. I contribute to the LLM training tooling and to fine-tuning experiments.',
      'The trainer is a modular, config-driven command-line framework covering the full workflow for causal language models: dataset preprocessing and tokenization, continued pretraining on tokenized corpora, supervised fine-tuning with optional LoRA adapters, and text generation for both base and instruction-style usage.',
      'Its central design decision is a plugin registry: model-specific concerns (checkpoint loading and saving, tokenization, decoding, and which modules LoRA should target) are isolated inside model plugins, while the training workflows stay model-agnostic. Adding a new model family means writing a plugin, not editing the training loops.',
    ],
    tech: [
      'Python', 'PyTorch', 'Hugging Face Transformers', 'Datasets', 'PEFT / LoRA',
      'TRL', 'Accelerate', 'Typer', 'Pydantic', 'YAML', 'Weights & Biases', 'bitsandbytes',
    ],
    highlights: [
      {
        title: 'Plugin architecture over hardcoded models',
        body:
          'A model registry resolves plugins dynamically at run time. Each plugin implements a shared base interface, so the preprocess, pretrain, finetune and generate workflows never contain model-specific branches. GPT-2 is the reference implementation, with configurations prepared for larger model families.',
      },
      {
        title: 'Config-driven with CLI overrides',
        body:
          'Every workflow loads a YAML configuration validated by Pydantic schemas, and any field can be overridden from the command line. Runs are reproducible from a committed config file rather than from remembered flags.',
      },
      {
        title: 'Parameter-efficient fine-tuning',
        body:
          'Supervised fine-tuning is built on TRL with optional LoRA adapters through PEFT, so adapting a model means training a small set of adapter weights instead of the full parameter set, which is the practical way to fine-tune when GPU memory is limited.',
      },
      {
        title: 'A real CLI surface',
        body:
          'Built with Typer as composed sub-applications: preprocess, pretrain, finetune, generate, eval and hf_login, plus a models command that lists registered plugins and flags which are available in the current environment.',
      },
    ],
    flow: [
      { label: 'Macedonian corpus', sub: 'Raw text datasets', tone: 'source' },
      { label: 'Preprocess', sub: 'Clean · tokenize', tone: 'engine' },
      { label: 'Continued pretraining', sub: 'Tokenized corpus', tone: 'violet' },
      { label: 'LoRA SFT', sub: 'PEFT · TRL adapters', tone: 'violet' },
      { label: 'Generate & evaluate', sub: 'Base / instruction', tone: 'sink' },
    ],
    flowCaption:
      'Each stage is a separate CLI command reading its own YAML config, so a run can be resumed or repeated from any point in the chain.',
    links: {
      github: null,
      demo: null,
      note:
        'Developed in an internal faculty GitLab repository, so there is no public link. Happy to discuss the work in detail.',
    },
  },

  {
    id: 'ai-data-analyst',
    title: 'AI Data Analyst Platform',
    tagline:
      'Upload a CSV or Excel dataset, ask a question in plain English, and get an answer computed from the data: an LLM plans, DuckDB or scikit-learn computes, and the summary may only cite the computed numbers.',
    categories: ['ai', 'software', 'data'],
    period: 'Sep 2026 - Present',
    description: [
      'A full-stack platform for asking questions about your own data. Users upload a CSV or Excel file, ask a question in plain English and get an answer computed from the data: key numbers, a chart, a table, and the plan and SQL behind them. Predictive questions such as “Predict customer churn” train and evaluate scikit-learn models instead.',
      'The core rule is that the LLM plans and code computes. A LangGraph workflow routes the question, has the model produce a typed AnalysisPlan or MLPlan, validates it with a bounded number of repairs, compiles it to parameterised SQL and runs it in a sandboxed, read-only DuckDB. No SQL, Python or shell command written by a model is ever executed. The model can be Anthropic or any OpenAI-compatible API, with an offline fake for tests.',
      'Questions run as background jobs: FastAPI stores a queued job in PostgreSQL and returns at once, and Celery workers on Redis execute it with bounded retries, cancellation and automatic recovery. Files, Parquet copies and results live in S3-compatible storage, models are tracked in MLflow, workflows can be traced in Langfuse, and the React and TypeScript UI is served by nginx. The whole stack runs in Docker Compose, with CI on GitHub Actions.',
    ],
    tech: [
      'Python', 'FastAPI', 'LangGraph', 'DuckDB', 'React', 'TypeScript', 'PostgreSQL',
      'Celery', 'Redis', 'scikit-learn', 'MLflow', 'Langfuse', 'S3 / SeaweedFS',
      'Docker Compose', 'GitHub Actions', 'pytest',
    ],
    metrics: [
      { value: '1,748', label: 'backend tests' },
      { value: '99%', label: 'branch coverage' },
      { value: '43/43', label: 'offline evaluation cases passing' },
      { value: '27/29', label: 'cases passed by a real model on Groq' },
    ],
    highlights: [
      {
        title: 'The LLM plans, code computes',
        body:
          'The model only ever returns closed, validated structures: a route decision, an AnalysisPlan, an MLPlan or a narrative. The compiler is the only SQL author, with identifiers taken from the dataset schema and values passed as bound parameters, and DuckDB runs with external access and extensions disabled, a query timeout, and memory and result limits.',
      },
      {
        title: 'Summaries that may only cite computed numbers',
        body:
          'The written summary is checked against the computed facts. An unusable or ungrounded summary gets one regeneration with feedback, and if it still cannot be grounded a fact-only summary is shown instead. Causal wording is never accepted, and “correlation” only when one was actually computed.',
      },
      {
        title: 'Machine learning with honest metrics',
        body:
          'Predictive questions become a validated MLPlan. Allowlisted scikit-learn pipelines are trained in an isolated, time- and memory-limited process on a seeded 70/15/15 split, with preprocessing fitted on the training split only, compared against a baseline, selected on validation and evaluated once on the test set. Models are tracked in MLflow and stored pickle-free with skops, verified by SHA-256 before use.',
      },
      {
        title: 'Background jobs that cannot get stuck',
        body:
          'Jobs are durable rows with an explicit state machine enforced by conditional updates and a database trigger. Messages carry only the job id, a job can be claimed only once so duplicate deliveries are harmless, cancellation is cooperative, and reconciliation fails jobs whose worker died, so no job stays queued or running forever.',
      },
      {
        title: 'Evaluated against a real model, not only a fake',
        body:
          'The test suite is offline and deterministic, and an evaluation runs 43 questions through the real workflow, scoring the computed answer, the plan and the summary against independently computed ground truth. The same evaluation, paced to a free tier’s token limits and resumable across days, ran against gpt-oss-120b on Groq: from 69% of scored cases in the first full run to 27 of 29 (93%) in the final one, with tokens down from 320,435 to 188,094. Each run surfaced a real problem that was fixed and measured again.',
      },
      {
        title: 'Security by default',
        body:
          'JWT authentication with Argon2id password hashing, every resource scoped to its owner so another user’s data is indistinguishable from a missing one, login throttling, per-user quotas, a daily limit on real LLM calls and a strict Content Security Policy on the UI. Only the worker receives the LLM key; the API never does.',
      },
    ],
    flow: [
      { label: 'React UI', sub: 'nginx · /api proxy', tone: 'source' },
      { label: 'FastAPI', sub: 'Auth · validation · queued job', tone: 'engine' },
      { label: 'Celery worker', sub: 'Redis queue · state in PostgreSQL', tone: 'engine' },
      { label: 'LangGraph workflow', sub: 'Route · plan · validate', tone: 'violet' },
      { label: 'DuckDB / scikit-learn', sub: 'Sandboxed compute · MLflow', tone: 'violet' },
      { label: 'Grounded answer', sub: 'Chart · table · checked summary', tone: 'sink' },
    ],
    flowCaption:
      'The API only queues the work and answers immediately; a worker runs the workflow. The language model is called for routing, planning and the summary, while every number comes from DuckDB or scikit-learn.',
    links: {
      github: null,
      demo: null,
      note: 'The repository is private at the moment, so there is no public link.',
    },
  },

  {
    id: 'disease-prediction',
    title: 'Disease Prediction AI',
    tagline:
      'A multiclass symptom-to-condition classifier over 580+ classes, comparing five models and combining three of them into a weighted soft-voting ensemble.',
    categories: ['ai'],
    description: [
      'A machine learning project that predicts likely conditions from a set of reported symptoms, served through a small Flask application that returns the three highest-probability predictions.',
      'The dataset holds roughly 247,000 records described by 377 binary symptom features across 773 condition classes. This is an extreme multiclass problem where class imbalance and rare labels dominate the difficulty. The preprocessing pipeline loads the data with int8 column types to keep memory manageable, coerces non-binary values, merges very rare classes into an "Other" label, and label-encodes targets.',
      'Training uses a stratified 120,000-row subset so five model families can be compared under identical conditions. A further merge of classes holding fewer than 15 examples leaves 583 classes before the stratified 80/20 train/test split.',
    ],
    tech: ['Python', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'joblib', 'Flask'],
    metrics: [
      { value: '~247k', label: 'records in the dataset' },
      { value: '377', label: 'binary symptom features' },
      { value: '583', label: 'condition classes after merging' },
      { value: '120k', label: 'rows in the stratified training subset' },
    ],
    highlights: [
      {
        title: 'Five models compared on identical splits',
        body:
          'Naive Bayes, a decision tree, a random forest, XGBoost and a neural network (a scikit-learn MLP on standardised features) are trained on the same split and evaluated on the same held-out test set. The Naive Bayes, tree and forest models use balanced class weights, and 3-fold cross-validation on those three checks stability.',
      },
      {
        title: 'A failure that shaped the design',
        body:
          'The single decision tree collapses to single-digit accuracy, a clear demonstration of how one greedy tree fragments across hundreds of near-degenerate classes. That result is why the final system is an ensemble rather than a single classifier, and it is kept in the comparison rather than quietly dropped.',
      },
      {
        title: 'Weighted soft-voting ensemble',
        body:
          'The random forest, neural network and XGBoost models are combined in a soft-voting classifier weighted 0.3 / 0.5 / 0.2, leaning most heavily on the neural network. The ensemble is the model the Flask app uses for every prediction.',
      },
      {
        title: 'Handling the long tail of rare classes',
        body:
          'Rare conditions are merged into an "Other" category at two stages, first the single-example classes on the full dataset and then every class with fewer than 15 examples after subsetting, with labels re-encoded after each merge, so stratified splitting stays valid and no class ends up with too few samples to split.',
      },
      {
        title: 'Top-k rather than a single answer',
        body:
          'The Flask interface returns the three highest-probability conditions instead of one hard label, which is the honest way to surface a probabilistic model to a user.',
      },
    ],
    flow: [
      { label: 'Dataset', sub: '~247k labelled records', tone: 'source' },
      { label: 'Preprocessing', sub: 'Typing · binarising · encoding', tone: 'engine' },
      { label: 'Class merging', sub: 'Rare labels → Other', tone: 'engine' },
      { label: 'Model training', sub: '5 model families', tone: 'violet' },
      { label: 'Evaluation', sub: 'Hold-out + 3-fold CV', tone: 'violet' },
      { label: 'Soft-voting ensemble', sub: 'Top-3 predictions', tone: 'sink' },
    ],
    flowCaption:
      'An academic machine learning project. It is not a medical device and is not intended or validated for clinical use.',
    links: {
      github: 'https://github.com/efimijacuneva/DiseasePredictionAI',
      demo: null,
      note: null,
    },
  },

  {
    id: 'food-ordering',
    title: 'Food Ordering Application',
    tagline:
      'A containerised Django ordering platform with a guest-to-user cart merge, order history that survives catalogue changes, and a CI/CD path to Kubernetes.',
    categories: ['software'],
    description: [
      'A full restaurant ordering system covering both the customer experience and the staff-facing admin panel. Customers browse a filterable menu, build a cart, check out with delivery details and follow a five-stage order status timeline; staff manage products, categories, orders and customer accounts from a separate dashboard.',
      'The application is server-rendered with Django and Bootstrap rather than a separate JavaScript front end, and runs behind Nginx with Gunicorn against PostgreSQL. The whole stack is containerised with a multi-stage Docker build and described declaratively for Kubernetes.',
      'A GitHub Actions pipeline runs the Django test suite against a PostgreSQL service container, validates the Compose and Kubernetes files, builds and publishes the backend and frontend images to Docker Hub, and, once a cluster is configured, applies the Kubernetes manifests with kubectl. The manifests cover a namespace, deployments, services, ingress, a config map, secrets, persistent volumes and a PostgreSQL StatefulSet.',
    ],
    tech: [
      'Django 4.2', 'Python', 'PostgreSQL 15', 'Gunicorn', 'Nginx', 'Bootstrap 5',
      'Docker', 'Docker Compose', 'Kubernetes', 'GitHub Actions', 'WhiteNoise',
    ],
    highlights: [
      {
        title: 'Carts that survive signing in',
        body:
          'Guests get a session-keyed cart while logged-in users get a database-backed one, and the two are merged at login so nothing is lost when a visitor decides to create an account mid-order. It is an easy detail to skip and very noticeable when it is missing.',
      },
      {
        title: 'Order history that cannot be rewritten',
        body:
          'Order items snapshot the product name and price at purchase time and hold the product foreign key with ON DELETE SET NULL. Deleting a product or changing its price therefore cannot retroactively alter what a past order says it cost. That is the right modelling choice for transactional records.',
      },
      {
        title: 'Explicit order state machine',
        body:
          'Orders move through Pending → Accepted → Preparing → Out for Delivery → Delivered, with Cancelled as a terminal branch. Status is a constrained choice field, and each order exposes a per-order timeline view.',
      },
      {
        title: 'Custom user model from the start',
        body:
          'The project extends AbstractUser with a unique email, phone and address rather than bolting a profile model on later, which is painful to retrofit once a Django project already holds data.',
      },
      {
        title: 'Deployment described as code',
        body:
          'A base Compose file with separate development and production overrides, a multi-stage image build, and a full set of Kubernetes manifests including a StatefulSet with a persistent volume claim for PostgreSQL.',
      },
    ],
    flow: [
      { label: 'Browser', sub: 'Bootstrap UI', tone: 'source' },
      { label: 'Nginx', sub: 'Reverse proxy · static', tone: 'engine' },
      { label: 'Gunicorn + Django', sub: 'Views · auth · admin panel', tone: 'green' },
      { label: 'PostgreSQL', sub: 'StatefulSet + PVC', tone: 'sink' },
    ],
    flowCaption:
      'Runtime request path. Separately, GitHub Actions tests the code, publishes the images to Docker Hub and applies the Kubernetes manifests to roll them out.',
    links: {
      github: 'https://github.com/efimijacuneva/FoodOrdering',
      demo: null,
      note: null,
    },
  },

  {
    id: 'genome-align',
    title: 'Parallel Genome Sequence Alignment',
    tagline:
      'Needleman–Wunsch alignment parallelised with Python multiprocessing, benchmarked to a measured 2.87× speedup, with an honest look at where it stops scaling.',
    categories: ['algorithms'],
    description: [
      'A parallel computing project that partitions DNA sequence alignment across processes and measures what that actually buys you. Global alignment uses the Needleman–Wunsch algorithm through Biopython’s pairwise aligner with an affine gap model (match +2, mismatch −1, gap open −0.5, gap extend −0.1).',
      'Sequences are split into segments with a configurable overlap between neighbours to reduce artefacts at partition boundaries, and the merge step tracks the non-overlapping region of each segment so overlapping bases are not counted twice in the combined score.',
      'The experiment harness compares a sequential baseline against two parallelisation strategies over 1, 2, 4 and 8 processes, recording wall-clock time, resident memory and speedup for each configuration. Test data is derived from the SARS-CoV-2 reference genome, fetched from NCBI through Biopython’s Entrez interface or loaded from FASTA.',
    ],
    tech: ['Python', 'Biopython', 'multiprocessing', 'NumPy', 'pandas', 'matplotlib', 'psutil', 'tqdm'],
    metrics: [
      { value: '2.87×', label: 'measured speedup at 4 processes' },
      { value: '3.75s → 1.31s', label: 'sequential vs parallel wall time' },
      { value: '4', label: 'process counts benchmarked' },
    ],
    highlights: [
      {
        title: 'Two parallelisation strategies, compared',
        body:
          'Many small segments dispatched through a process pool, versus a smaller number of large chunks, one per process. The fine-grained version needed task batching to stay competitive, because the cost of pickling arguments across process boundaries began to rival the alignment work itself.',
      },
      {
        title: 'Speedup that stops, and why',
        body:
          'Scaling holds up to four processes (2.87×), then regresses at eight (2.50×). Past the physical core count the extra processes contend rather than help, and inter-process communication overhead grows. Reporting the regression is more informative than reporting only the best number.',
      },
      {
        title: 'Overlap handling at partition boundaries',
        body:
          'Splitting a sequence naively distorts alignment near the cut points. Segments are extended by a configurable overlap, and a companion function returns the non-overlapping region of each part so the merge stage can combine results without double-counting.',
      },
      {
        title: 'Memory measured, not assumed',
        body:
          'Each configuration records process resident memory alongside timings, which made it visible that one experimental variant carried a substantially larger memory footprint for no time benefit.',
      },
    ],
    flow: [
      { label: 'Genome sequences', sub: 'FASTA · NCBI Entrez', tone: 'source' },
      { label: 'Partition', sub: 'n segments + overlap', tone: 'engine' },
      { label: 'Worker pool', sub: 'Needleman–Wunsch per segment', tone: 'amber' },
      { label: 'Merge', sub: 'Non-overlapping regions', tone: 'amber' },
      { label: 'Benchmark', sub: 'Time · memory · speedup', tone: 'sink' },
    ],
    flowCaption:
      'The benchmark stage is part of the project, not an afterthought. The goal was to measure scaling behaviour, not just to make it run in parallel.',
    links: { github: null, demo: null, note: null },
  },

  {
    id: 'recipe-system',
    title: 'Recipe Management System',
    tagline:
      'A full-stack recipe manager that imports recipes from a URL, calculates nutrition per ingredient from USDA and Open Food Facts data, and comes with a one-click browser extension.',
    categories: ['software'],
    period: 'Team project',
    description: [
      'A full-stack web application for collecting, organising and analysing recipes. Recipes can be entered by hand or imported from a URL: the backend extracts the title, ingredients, quantities, steps, timings, servings, image, cuisine, category and tags from pages that publish schema.org recipe data, and falls back to common HTML patterns when they do not. In the web app the extracted recipe is shown for review before it is saved.',
      'The frontend is a React single-page app and the backend a Node.js / Express REST API over a relational SQLite schema (recipes, steps, ingredients, per-recipe quantities and nutrition, tags, categories and saved recipes) with foreign keys enforced and cascading deletes. Missing columns are added on startup, so an existing database upgrades without a manual migration step.',
      'Calories, protein, carbohydrates and fat are calculated per ingredient and per recipe from the USDA FoodData Central API, with Open Food Facts as a fallback that also contributes E-number additive and allergen information. Recipes can be searched by name, ingredient or cuisine, filtered by category, tag, prep time and macros, and marked as favourites.',
    ],
    tech: [
      'JavaScript', 'React', 'Node.js', 'Express', 'SQLite', 'Cheerio', 'Axios',
      'USDA FoodData Central', 'Open Food Facts', 'Manifest V3', 'node:test', 'GitHub Actions',
    ],
    highlights: [
      {
        title: 'Turning ingredient lines into grams',
        body:
          'The ingredient parser handles unicode fractions, weight and volume units and typical per-piece weights. Volume measures of dry goods go through a density table (flour at about 0.5 g/ml rather than water’s 1 g/ml, which would double its calories), and a weight the recipe states itself, such as “(525 g)”, wins over any density guess.',
      },
      {
        title: 'No answer rather than a wrong one',
        body:
          'Common staples resolve from reference values. Everything else goes to USDA, where candidate foods are scored on word overlap with penalties for extra and processed-form words, so “egg” matches a whole raw egg rather than egg substitute. Open Food Facts is the fallback, and when neither source has a usable match the ingredient is reported as unknown instead of guessed.',
      },
      {
        title: 'Category matching that does not misfire',
        body:
          'Free-text categories such as “Dinner, Lamb, Main Course” are folded into canonical categories through alias words, including local-language variants like torta and salata. Matching is whole-word, so “Romaine” never counts as “main”.',
      },
      {
        title: 'A browser extension as a thin client',
        body:
          'The Manifest V3 “Recipe Saver” extension does no parsing of its own. A content script only detects schema.org Recipe markup to flag the page, and saving from the popup or the right-click menu sends the URL to the backend, so extraction and nutrition logic live in exactly one place.',
      },
      {
        title: 'Tested without touching the network',
        body:
          'More than 140 node:test cases cover the parser, nutrition lookups, categories, tags and image handling. External API calls are mocked, so the suite is deterministic and runs in GitHub Actions on pushes and pull requests.',
      },
    ],
    flow: [
      { label: 'Recipe page', sub: 'Web app · browser extension', tone: 'source' },
      { label: 'Extraction', sub: 'schema.org JSON-LD · HTML fallback', tone: 'engine' },
      { label: 'Ingredient parser', sub: 'Units · densities → grams', tone: 'green' },
      { label: 'Nutrition lookup', sub: 'USDA → Open Food Facts', tone: 'green' },
      { label: 'SQLite', sub: 'Relational · FK-enforced', tone: 'sink' },
    ],
    flowCaption:
      'The web app and the browser extension import through the same backend endpoint. Recipes typed in by hand skip extraction and parsing, and their ingredients are looked up unless the macros were entered manually.',
    links: {
      github: 'https://github.com/efimijacuneva/Recipe_system',
      demo: null,
      note: null,
    },
  },
];

// smaller stuff, shown as a short list under the grid
export const alsoBuilt = [
  {
    title: 'Job Finder',
    tagline: 'Job listing platform with search, filtering and application workflows.',
    tech: 'ASP.NET MVC · Entity Framework · C#',
  },
  {
    title: 'Road Lane Detection',
    tagline:
      'Lane detection using Canny edge detection and Hough transforms, plus a U-Net semantic segmentation model and a video inference pipeline.',
    tech: 'Python · OpenCV · U-Net',
  },
];

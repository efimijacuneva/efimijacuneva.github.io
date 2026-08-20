// all six projects live here. cards, filters and the detail dialog are built
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
          'A single PowerShell script starts the containers, deploys both databases, generates seeded days of source data, runs the Spark bronze-to-gold pipeline, loads the warehouse per date, asserts the data-quality gate and prints a production-style execution summary. Spark, Java and SQL Server all run in Docker.',
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
    id: 'disease-prediction',
    title: 'Disease Prediction AI',
    tagline:
      'A multiclass symptom-to-condition classifier over 380+ classes, comparing five models and combining the strongest three into a soft-voting ensemble.',
    categories: ['ai'],
    description: [
      'A machine learning project that predicts likely conditions from a set of reported symptoms, served through a small Flask application that returns the three highest-probability predictions.',
      'The dataset holds roughly 247,000 records described by 377 binary symptom features across 381 condition classes. This is an extreme multiclass problem where class imbalance and rare labels dominate the difficulty. The preprocessing pipeline loads the data with int8 column types to keep memory manageable, coerces non-binary values, merges very rare classes into an "Other" label, and label-encodes targets.',
      'Training uses a stratified 20,000-row subset so five model families can be compared under identical conditions, with a further merge of classes holding fewer than 15 examples before the stratified train/test split.',
    ],
    tech: [
      'Python', 'scikit-learn', 'XGBoost', 'TensorFlow / Keras', 'pandas',
      'NumPy', 'imbalanced-learn', 'joblib', 'Flask',
    ],
    metrics: [
      { value: '~247k', label: 'records in the dataset' },
      { value: '377', label: 'binary symptom features' },
      { value: '381', label: 'condition classes' },
      { value: '83.7%', label: 'ensemble test accuracy' },
    ],
    highlights: [
      {
        title: 'Five models compared on identical splits',
        body:
          'Naive Bayes (69.8%), Decision Tree (6.9%), Random Forest (81.5%), XGBoost (77.8%) and a scaled neural network (82.7%) were each evaluated on the same held-out test set, with 3-fold cross-validation used to check stability.',
      },
      {
        title: 'A failure that shaped the design',
        body:
          'The single decision tree collapsed to 6.9% accuracy, a clear demonstration of how one greedy tree fragments across hundreds of near-degenerate classes. That result is why the final system is an ensemble rather than a single classifier, and it is kept in the comparison rather than quietly dropped.',
      },
      {
        title: 'Weighted soft-voting ensemble',
        body:
          'The three strongest models are combined in a soft-voting classifier weighted 0.4 / 0.4 / 0.2 toward the random forest and neural network. The ensemble reaches 83.7% test accuracy, ahead of every individual model.',
      },
      {
        title: 'Handling the long tail of rare classes',
        body:
          'Rare conditions are merged into an "Other" category at two stages, once on the full dataset and again after subsetting, with re-encoding in between, so stratified splitting stays valid and no class ends up with too few samples to split.',
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
      'A full restaurant ordering system covering both the customer experience and the staff-facing admin panel. Customers browse a filterable menu, build a cart, check out with delivery details and follow a six-step order status timeline; staff manage products, categories, orders and customer accounts from a separate dashboard.',
      'The application is server-rendered with Django and Bootstrap rather than a separate JavaScript front end, and runs behind Nginx with Gunicorn against PostgreSQL. The whole stack is containerised with a multi-stage Docker build and described declaratively for Kubernetes.',
      'A GitHub Actions pipeline builds and publishes images to Docker Hub, and the Kubernetes manifests cover deployments, services, ingress, config maps, secrets, persistent volumes and a PostgreSQL StatefulSet.',
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
          'Separate compose files for development, override and production, a multi-stage image build, and a full set of Kubernetes manifests including a StatefulSet with a persistent volume claim for PostgreSQL.',
      },
    ],
    flow: [
      { label: 'Browser', sub: 'Bootstrap UI', tone: 'source' },
      { label: 'Nginx', sub: 'Reverse proxy · static', tone: 'engine' },
      { label: 'Gunicorn + Django', sub: 'Views · auth · admin panel', tone: 'green' },
      { label: 'PostgreSQL', sub: 'StatefulSet + PVC', tone: 'sink' },
    ],
    flowCaption:
      'Runtime request path. Separately, GitHub Actions builds the image, publishes it to Docker Hub, and the Kubernetes manifests roll it out.',
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
    links: { github: null, demo: null, note: 'Repository link to be added.' },
  },

  {
    id: 'recipe-system',
    title: 'Recipe System',
    tagline:
      'A Django application for recipe management and ingredient-based search, and the project where I learned to model user relationships properly.',
    categories: ['software'],
    description: [
      'A Django web application for storing recipes and searching them by the ingredients a user already has. A recipe holds its name, description, ingredient list, preparation instructions and time, and the search view matches a comma-separated ingredient input against stored recipes.',
      'This is an earlier and deliberately smaller project than the others here. Its value was learning Django fundamentals properly: the model layer and migrations, forms and ModelForms, URL routing with named routes, separation of concerns between views, and template inheritance from a shared base layout with a reusable navigation partial.',
      'It is also where I hit a real referential-integrity problem: user-owned data had been associated through a hardcoded user id rather than a genuine foreign key to the authenticated user. That works exactly until there is more than one user. Fixing it meant modelling the relationship as a proper foreign key and reading the user from the request instead of assuming one. That lesson pushed me toward taking database constraints seriously in later projects.',
    ],
    tech: ['Python', 'Django 5.1', 'SQLite', 'Django ORM', 'Django Forms', 'HTML/CSS'],
    highlights: [
      {
        title: 'Ingredient-based search',
        body:
          'The search view normalises and splits a free-text ingredient list and returns recipes matching any supplied ingredient, driven through a Django form with server-side validation.',
      },
      {
        title: 'Template inheritance done properly',
        body:
          'A shared base template plus a navigation partial, with per-page templates extending it, rather than duplicating page chrome across every view.',
      },
      {
        title: 'Referential integrity as a lesson learned',
        body:
          'Replacing a hardcoded user id with a real foreign key to the authenticated user is a small change that carries a large idea: the database should enforce relationships, not the view layer’s assumptions.',
      },
    ],
    flow: null,
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

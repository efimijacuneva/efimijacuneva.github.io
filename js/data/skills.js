// skills, grouped. no percentages or expert/beginner labels on purpose

export const skillGroups = [
  {
    id: 'data',
    title: 'Data Engineering & Analytics',
    icon: 'layers',
    blurb: 'Moving data from operational systems into models people can query.',
    skills: [
      'SQL', 'SQL Server', 'T-SQL', 'Apache Spark', 'PySpark', 'ETL / ELT',
      'Data Warehousing', 'Dimensional Modeling', 'Kimball / Star Schema',
      'Medallion Architecture', 'Bronze / Silver / Gold', 'Parquet',
      'SCD Type 2', 'Data Quality & Validation', 'Power BI', 'Power Query',
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Databases',
    icon: 'code',
    blurb: 'Languages I write day to day, and the stores I put data in.',
    skills: ['Python', 'Java', 'C#', 'C/C++', 'SQL', 'PostgreSQL', 'SQLite', 'Entity Framework'],
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: 'network',
    blurb: 'Classical ML through to fine-tuning language models.',
    skills: [
      'PyTorch', 'scikit-learn', 'Hugging Face', 'Transformers', 'PEFT', 'TRL',
      'LoRA', 'XGBoost', 'TensorFlow / Keras', 'OpenCV', 'pandas', 'NumPy',
    ],
  },
  {
    id: 'backend',
    title: 'Software & Backend',
    icon: 'server',
    blurb: 'Building the applications that sit on top of the data.',
    skills: [
      'Django', 'ASP.NET MVC', 'Spring Boot', 'REST APIs', 'React', 'Node.js',
      'MVC Architecture', 'HTML / CSS / JavaScript',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: 'box',
    blurb: 'Getting work to run reliably somewhere other than my laptop.',
    skills: [
      'Docker', 'Docker Compose', 'Kubernetes', 'GitHub Actions', 'Jenkins',
      'CI/CD', 'Git', 'PowerShell', 'pytest',
    ],
  },
];

// the "how i work" section. projectIds point at the projects for each stage
export const approachStages = [
  {
    step: '01',
    title: 'Data',
    lede: 'Getting hold of it, and distrusting it',
    body:
      'Source systems produce messy, late and occasionally wrong records. I generate data with defects deliberately injected so the pipeline is tested against the failures it will actually meet, and I quarantine bad rows with a reason rather than dropping them.',
    projectIds: ['traffic-dw', 'genome-align'],
  },
  {
    step: '02',
    title: 'Processing',
    lede: 'Pipelines that can be rerun without fear',
    body:
      'Distributed processing with Spark through bronze, silver and gold layers, with idempotent writes, reconciliation counts and automated checks so that rerunning a job is a routine operation rather than a risk.',
    projectIds: ['traffic-dw'],
  },
  {
    step: '03',
    title: 'Modeling',
    lede: 'Structure that answers questions',
    body:
      'Dimensional modeling with conformed dimensions, appropriate fact grains and slowly changing dimensions, so historical answers stay correct after the source system changes its mind.',
    projectIds: ['traffic-dw'],
  },
  {
    step: '04',
    title: 'Intelligence',
    lede: 'Models, and knowing what they are worth',
    body:
      'Training and evaluating models, from classical classifiers and ensembles to parameter-efficient fine-tuning of language models, with the evaluation treated as part of the work rather than a closing formality.',
    projectIds: ['vezilka', 'disease-prediction'],
  },
  {
    step: '05',
    title: 'Applications',
    lede: 'Something a person can actually use',
    body:
      'Backend and full-stack applications around those systems, containerised and deployable, with the database constraints and state transitions modelled explicitly rather than enforced by convention.',
    projectIds: ['food-ordering', 'recipe-system'],
  },
];

// my details and links. this is the only file to edit for personal info

export const site = {
  name: 'Efimija Cuneva',
  role: 'Computer Science Student',
  focus: 'Data Engineering · AI/ML · Software Development',
  location: 'Skopje, North Macedonia',

  intro:
    'I build practical systems across data engineering, machine learning and backend ' +
    'development, from a Spark-to-SQL-Server warehouse with a real data-quality gate ' +
    'to LLM fine-tuning tooling and containerised web applications.',

  // set any of these to null to hide the link
  links: {
    email: 'e.cuneva@yahoo.com',
    github: 'https://github.com/efimijacuneva',
    linkedin: 'https://www.linkedin.com/in/efimijacuneva/',
    // Optional: drop a PDF in assets/ and point to it, e.g. 'assets/EfimijaCuneva-CV.pdf'
    resume: null,
  },

  // photo: { src: 'assets/me.jpg', alt: 'Efimija Cuneva' } - square, 520px+
  photo: null,

  contactPrompt: 'Interested in working together or discussing an opportunity?',
  contactBody:
    'I am currently looking for internship and junior opportunities in data engineering, ' +
    'AI/ML and backend software engineering. The fastest way to reach me is by email.',

  // ids have to match the section ids in index.html
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'approach', label: 'Approach' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
};

export const timeline = [
  {
    kind: 'experience',
    title: 'LLM Development Team Member, VEZILKA Project',
    org: 'Faculty of Computer Science and Engineering (FINKI)',
    period: 'Feb 2026 - Present',
    place: 'Skopje, North Macedonia',
    points: [
      'Contributing to fine-tuning and experimentation with large language models using modern NLP frameworks.',
      'Preparing datasets, evaluating model performance and supporting training workflows.',
      'Working with PyTorch, Hugging Face Transformers and LoRA for parameter-efficient fine-tuning.',
      'Collaborating with researchers on NLP applications for the Macedonian language.',
    ],
  },
  {
    kind: 'education',
    title: 'BSc in Computer Science',
    org: 'Faculty of Computer Science and Engineering (FINKI)',
    period: 'Sept 2023 - May 2027 (expected)',
    place: 'Skopje, North Macedonia',
    points: [
      '4-year undergraduate programme, 240 ECTS.',
      'Relevant coursework: Data Structures and Algorithms, Databases, Operating Systems, ' +
        'Computer Networks, Software Engineering, Artificial Intelligence, Probability and Statistics, ' +
        'Data Mining, Cloud Computing, Natural Language Processing.',
    ],
  },
];

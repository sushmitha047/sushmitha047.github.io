/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  content.ts — the single source of truth for this site.
 *
 *  Every string below is taken from one of:
 *    • Sushmitha-Resume_EngineeringRole.docx
 *    • Sushmitha-Resume_ResearchRole.docx
 *    • a public README at github.com/sushmitha047
 *
 *  Nothing here is invented. To update the site, edit this file only —
 *  the components read from it and lay it out.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Sushmitha Halli Sudhakara",
  shortName: "Sushmitha",
  // ⚠️ VERIFY: your two current resumes say "Technical Sales Enablement Specialist
  // (AI & Automation Projects)". An older resume said "Technical Documentation Writer".
  // Use whichever title HR would confirm. See the notes in README.md.
  role: "Machine learning engineer and published researcher",
  url: "https://sushmitha047.github.io",
  email: "sushmithahs047@gmail.com",
  github: "https://github.com/sushmitha047",
  githubHandle: "sushmitha047",
  linkedin: "https://www.linkedin.com/in/hssushmitha",
  location: "Hampton Roads, Virginia Metropolitan Area",
  metaTitle:
    "Sushmitha Halli Sudhakara — Machine Learning Engineer & Researcher",
  metaDescription:
    "M.S. Computer Science. I build machine learning systems end to end: feature stores and scheduled retraining, serverless inference on AWS, and production LLM prompt and agent work. Three peer-reviewed publications in federated learning and model interpretability.",
};

export const profile = {
  greeting: "Hi, I'm Sushmitha",
  // Drop a square headshot at public/sushmitha.jpg to replace the initials.
  avatar: "/sushmitha.jpg",
  initials: "SH",
  blurb:
    "ML engineer with an M.S. in Computer Science and three peer-reviewed papers. I build models and the pipelines that keep them running — feature stores, scheduled retraining, serverless inference on AWS — and work on production LLM prompts, evaluation and agent tooling day to day.",
  medium: "https://medium.com/@hssushmitha047",
  researchgate:
    "https://www.researchgate.net/profile/Sushmitha-Halli-Sudhakara",
};

export const hero = {
  headline: "I build machine learning systems that keep running after the notebook closes.",
  intro:
    "Feature stores and scheduled retraining, serverless inference on AWS, and production LLM prompt and agent work — plus three peer-reviewed papers on federated learning and model interpretability. I like problems where the answer has to be measured, not asserted.",
  facts: [
    "M.S. Computer Science, Old Dominion University",
    "3 peer-reviewed publications (IEEE, Springer)",
    "Open to ML engineer, MLOps, AI engineer and applied/research scientist roles",
  ],
};

export const about = [
  "I started as a cloud services engineer at LTIMindtree, building internal web apps and automating finance workflows around Oracle Fusion Cloud. That taught me something I still come back to: a model or a script only matters once someone else can rely on it.",
  "During my M.S. at Old Dominion University I moved into research — the labeled dataset behind a menu-card segmentation study that later supported AccessMenu at W4A '25, then a year at VMASC on fault detection for cyber-physical energy systems, federated learning on data that couldn't be centrally pooled, and SHAP-based interpretability. Three of those became published papers.",
  "Most of what I know, I taught myself by building it. I wanted to understand how a machine learning system stays alive in production, not just how a model gets trained, so I built a taxi demand forecaster that ingests features and retrains on a schedule, with a monitoring app where I could watch the error move. That same habit has taken me to two AWS scholarships, a grant to attend AWS re:Invent 2024, a Visa climate-tech hackathon, a City of Norfolk datathon, and a year organizing weekly international student dinners at ODU — where I learned that getting 150 people fed is its own kind of systems problem.",
  "Now I work on production LLM systems at Decisions: prompts that have to return strict JSON, retrieval failures traced through a pgvector pipeline, agent tool flows tested until the failure modes are understood. Alongside that I keep building pipelines, because deployment and evaluation are the parts I find most interesting.",
];

/** A short line at the end of About. Not a section — that would oversell it. */


export const interests = [
  { label: "running" },
  { label: "cycling" },
  { label: "swimming" },
  { label: "hiking" },
  { label: "baking" },
  { label: "photography", href: "https://unsplash.com/@therawframe_studio" },
];

/** ── Featured work ─────────────────────────────────────────────────────────
 *  `metric` renders as the signature "before → after" measurement block.
 *  Set `metric.single` when there is a result but no baseline to compare to.
 */
export type Project = {
  slug: string;
  highlight: string;
  title: string;
  period: string;
  tagline: string;
  context?: string;
  metric: {
    before?: string;
    beforeLabel?: string;
    after: string;
    afterLabel?: string;
    unit: string;
    note?: string;
  };
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  repo: string;
  video?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    slug: "nyc-taxi",
    highlight: "Test MAE 3.37 → 2.49 (26% lower than the best naive baseline)",
    title: "NYC Taxi Demand Forecaster",
    period: "Jan – Apr 2025",
    tagline:
      "Hourly taxi-demand forecasting with a feature store and automated retraining.",
    metric: {
      before: "3.37",
      beforeLabel: "best naive baseline",
      after: "2.49",
      afterLabel: "tuned LightGBM",
      unit: "test MAE",
      note: "26% reduction",
    },
    problem:
      "Hourly, per-location demand estimates are only useful if they beat the obvious heuristic — and only trustworthy if the model is never allowed to see the future during validation.",
    approach:
      "Benchmarked naive baselines against XGBoost (2.60) and LightGBM (2.54), then tuned LightGBM hyperparameters with Optuna against a TimeSeriesSplit cross-validation objective so no fold could leak look-ahead information.",
    result:
      "Two chained GitHub Actions workflows keep it live: a cron-scheduled feature pipeline writes to a Hopsworks online feature store and triggers an inference pipeline that loads the model from the registry and writes predictions back as a feature group. A Streamlit app joins stored predictions against observed ride counts to track error over time. Training and inference are packaged as a Poetry-managed src/ module with custom scikit-learn transformers for lag and temporal features.",
    tech: [
      "Python",
      "LightGBM",
      "XGBoost",
      "Optuna",
      "scikit-learn",
      "Hopsworks feature store",
      "GitHub Actions",
      "Streamlit",
      "Poetry",
    ],
    repo: "https://github.com/sushmitha047/nyc-taxi-demand-forecaster",
  },
  {
    slug: "sparse-transformers",
    highlight: "2.93 bits/dim vs the paper's 2.80, on 1/8 the training budget",
    title: "Reproducing Sparse Transformers",
    period: "Apr – May 2024",
    tagline:
      "Reimplementing fixed sparse attention from Child et al. (2019) on an eighth of the paper's training budget.",
    context:
      "Graduate deep learning course project (CS 795, Old Dominion University). I owned the image-modality implementation; the repository also contains the text (enwik8) track.",
    metric: {
      before: "2.80",
      beforeLabel: "reported in paper",
      after: "2.93",
      afterLabel: "this reproduction",
      unit: "bits per dimension, CIFAR-10",
      note: "gap of 0.13",
    },
    problem:
      "The original CIFAR-10 density result was trained on 64 V100s over seven days. Reproducing it on an academic budget raises a sharper question than \"did it work\" — if the number doesn't match, which part of the setup is responsible?",
    approach:
      "Reimplemented the fixed sparse attention factorization for image data and trained a 128-layer, 2-head, 256-embedding model on 4 NVIDIA A100s for 15 epochs against the paper's 120, holding learning rate, dropout, layers, heads and embedding size fixed at the reported configuration.",
    result:
      "2.93 bits per dimension against the reported 2.80 — within 0.13 on roughly an eighth of the training budget. Because every hyperparameter except duration and available capacity was held constant, the replication gap is attributable to training budget rather than to the sparse attention mechanism itself.",
    tech: [
      "PyTorch",
      "Sparse attention",
      "Multi-GPU training (4× A100)",
      "CIFAR-10",
      "enwik8",
    ],
    repo: "https://github.com/sushmitha047/cs795-deeplearning/tree/main/Final-project",
  },
  {
    slug: "aws-mlops",
    highlight: "81% validation accuracy, with a 75% confidence gate before routing",
    title: "AWS Serverless MLOps Pipeline",
    period: "Sep – Oct 2024",
    tagline:
      "Vehicle-type image classification wired into a serverless inference workflow with capture-based monitoring.",
    metric: {
      after: "81",
      unit: "% validation accuracy",
      note: "predictions below a 75% confidence threshold routed for review",
    },
    problem:
      "Classifying bicycles against motorcycles lets a delivery operation route short trips to couriers and long ones to motorcyclists — but an uncertain prediction must not reach routing unnoticed.",
    approach:
      "Decoded 3,073-integer CIFAR-100 records into 32×32×3 RGB arrays, staged PNG images and TSV metadata in S3, and trained SageMaker's built-in image-classification algorithm (CNN) for 30 epochs on an ml.p3.2xlarge instance.",
    result:
      "The model is served from a SageMaker endpoint orchestrated by Step Functions and three Lambda functions — data generation, classification, and a confidence filter that diverts anything under 75% for review. SageMaker DataCaptureConfig captures 100% of inference requests and responses to S3, with custom visualizations built over the captured data to track model behaviour.",
    tech: [
      "AWS SageMaker",
      "AWS Lambda",
      "AWS Step Functions",
      "Amazon S3",
      "SageMaker Model Monitor",
      "Python",
    ],
    repo: "https://github.com/sushmitha047/aws-serverless-mlops-pipeline",
  },
  {
    slug: "churn",
    highlight: "Minority-class recall up 10% after handling imbalance with SMOTE",
    title: "Customer Churn Prediction",
    period: "Sep – Oct 2024",
    tagline:
      "Churn scoring with an LLM layer that turns a probability into an explanation and a retention email.",
    metric: {
      after: "+10",
      unit: "% minority-class recall",
      note: "class imbalance handled with SMOTE",
    },
    problem:
      "A churn model outputs a number. A retention team needs to know which customer attributes drove it and what to send them.",
    approach:
      "Addressed class imbalance with SMOTE and evaluated ensemble-based churn models, combining XGBoost, Random Forest and KNN predictions in a Streamlit app for real-time scoring with model-level outputs visible.",
    result:
      "Minority-class recall improved by 10%. Llama models called through the Groq API generate natural-language explanations grounded in customer attributes and model feature importance, then draft personalized retention emails based on predicted churn risk.",
    tech: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "KNN",
      "SMOTE",
      "Streamlit",
      "Llama 3.2",
      "Groq API",
    ],
    repo: "https://github.com/sushmitha047/customer-churn-prediction",
    video: {
      href: "https://www.youtube.com/watch?v=jUPS3KCVLM0",
      label: "Watch the walkthrough",
    },
  },
];

/** Secondary work — real repositories, shown compactly. */
export const moreProjects = [
  {
    title: "Flower Species Image Classifier",
    blurb:
      "Transfer learning across three backbones on the 102-category Oxford flowers dataset: DenseNet121 reached 87.9% validation accuracy against VGG16 at 78.6% and ResNet50 at 82.8% under matched hyperparameters. Ships train.py and predict.py with checkpointing and CUDA/MPS support.",
    tech: ["PyTorch", "DenseNet121", "VGG16", "ResNet50"],
    repo: "https://github.com/sushmitha047/image-classifier",
    note: "AWS AI/ML Scholarship Nanodegree project",
  },
  {
    title: "Bike Sharing Demand Prediction",
    blurb:
      "Iterative temporal feature engineering with AutoGluon TabularPredictor moved the Kaggle score from 1.80462 to 0.49549, using the best_quality preset, automated hyperparameter optimization and multi-model stacking inside a 10-minute training window.",
    tech: ["AutoGluon", "SageMaker Studio", "Kaggle API"],
    repo:
      "https://github.com/sushmitha047/autogluon-bike-sharing-demand-prediction",
  },
  {
    title: "Menu-Card Segmentation Dataset",
    blurb:
      "Working files from the menu-card segmentation study: regions annotated across five menu-section categories and exported to bounding-box JSON and COCO format for downstream training.",
    tech: ["Labelbox", "Python", "COCO format", "Hugging Face datasets"],
    repo: "https://github.com/sushmitha047/image-segmentation-sam",
    video: {
      label: "AccessMenu (W4A '25)",
      href: "https://dl.acm.org/doi/full/10.1145/3744257.3744275",
    },
    note: "From the ODU research assistantship; dataset used in AccessMenu (W4A '25)",
  },
  {
    title: "US Chronic Disease Analysis",
    blurb:
      "Analysis of the CDC Chronic Disease Indicators dataset covering cancer, cardiovascular disease and diabetes, broken down by age, race and gender, with the findings written up as a presentation.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    repo: "https://github.com/sushmitha047/chronic-disease-analysis-us",
    video: {
      label: "Walkthrough",
      href: "https://www.youtube.com/watch?v=HowJubUNq74",
    },
    note: "Three-person team project",
  },
];

export const experience = [
  {
    // ⚠️ VERIFY — see the note on `site.role` above.
    title: "Technical Sales Enablement Specialist (AI & Automation Projects)",
    org: "Decisions LLC",
    place: "Virginia Beach, VA",
    period: "Jul 2024 — Present",
    bullets: [
      "Designed and iterated production prompts that extract sales opportunities and classify use cases from call transcripts — enforcing strict JSON-only structured outputs, adding confidence scores and classification rationale, and debugging over-restrictive filtering logic that was causing false negatives. Validated behaviour across GPT-4, GPT-5 and open-source models, version-tracking every prompt iteration in GitHub.",
      "Investigated inconsistent GPT-5 ChatCompletion behaviour including empty and truncated responses and tool-flow failures; reviewed reasoning, tool-calling and output-token behaviour, then added structured success and fallback JSON responses covering empty, malformed, incomplete and failed tool-flow results, and tested the updated prompt in the internal QA environment.",
      "Developed and tested prompts and tool flows for an internal AI assistant over Lunch & Learn data, refining tool selection, date-based query handling and Chat Completion message history, and debugged vector retrieval by tracing embeddings through the PostgreSQL/pgvector pipeline.",
      "Built and shipped a conversational retrieval agent (Microsoft Copilot Studio and Power Automate) that lets account executives query the internal demo library from Teams in natural language, replacing manual requests for industry- and use-case-specific materials.",
      "Built and shipped a conversational retrieval agent using Microsoft Copilot Studio and Power Automate, letting account executives query the internal demo library from Teams in natural language, replacing manual requests for industry- and use-case-specific materials.",
      "Created and tested rule sets generated from document extracts, iterating on system prompts to improve extraction accuracy and structured outputs, and built a Decisions Flow that pulls Doc360 article links and extracts article overviews for documentation audits and tracking.",
      "Authored end-to-end documentation for AI platform features — agents, chat completion, embeddings, MCP servers — and the Deployment Server, based on hands-on testing of expected against actual behaviour, working with Product, Engineering, QA and Support through fast release cycles.",
    ],
  },
  {
    title: "Machine Learning Researcher",
    org: "VMASC",
    place: "Norfolk, VA",
    period: "Jan 2024 — Jan 2025",
    bullets: [
      "Developed a Native AI framework for cyber-physical energy systems using ensemble learning (Random Forest, XGBoost) and LSTM networks, reaching 99.97% fault-detection recall and reducing DER simulation downtime by 30%. Accepted and presented at IEEE IWCMC 2025.",
      "Introduced Gini-Permutation feature selection and temporal encoding, improving cross-system generalization by 22%.",
      "Applied FedAvg and GANs to enhance smart-grid security on heavily imbalanced datasets, achieving 81% accuracy, 85% F1, 78% precision and 94% recall.",
      "Co-authored two papers on federated learning and SHAP-based model interpretability for smart-grid and UAV-swarm security.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    org: "Old Dominion University",
    place: "Norfolk, VA",
    period: "Sep 2023 — Dec 2023",
    bullets: [
      "Built a labeled dataset for a menu-card segmentation study — annotated menu-card regions across five menu-section categories in Labelbox, exported through the Labelbox SDK into COCO format, and assembled a Hugging Face datasets pipeline pairing images with category-labeled bounding boxes.",
      "The dataset supported AccessMenu, where I'm credited in the acknowledgments.",
      "Web-scraped over 10,000 Reddit entries with Python and BeautifulSoup to build a sentiment-analysis training dataset from scratch.",
    ],
    links: [
      {
        label: "AccessMenu (W4A '25)",
        href: "https://dl.acm.org/doi/full/10.1145/3744257.3744275",
      },
    ],
  },
  {
    title: "Data Science Intern",
    org: "NightHack",
    place: "Bengaluru, India",
    period: "Jun 2023 — Aug 2023",
    bullets: [
      "Applied PaddleOCR and Transformers for text extraction and tag classification across 2,000+ titles, then scaled the solution to 10,000 titles while significantly improving extraction accuracy.",
      "Performed exploratory data analysis and managed large-scale datasets in MongoDB for reliable storage and retrieval.",
    ],
  },
  {
    title: "Software Engineer — Cloud Services",
    org: "LTIMindtree",
    place: "Bengaluru, India",
    period: "Sep 2019 — Jul 2022",
    bullets: [
      "Built a Timecard web app integrated with Oracle Fusion Cloud over REST APIs, replacing a slow and error-prone workflow and cutting time-to-submit, rework and support effort.",
      "Automated supplier invoice payments with UiPath and implemented single sign-on for Oracle Fusion Cloud; developed custom HDL templates, fast formulas and SQL reports for bulk data management.",
    ],
  },
];

export const publications = [
  {
    authors: "S. H. Sudhakara, M. S. Munir, M. Rahman and S. Shetty",
    title:
      "Native AI-based Predictive Operational Resiliency in Cyber-Physical Energy Systems",
    venue: "IEEE IWCMC 2025, Abu Dhabi, UAE, pp. 1258–1263",
    doi: "10.1109/IWCMC65282.2025.11059490",
    href: "https://ieeexplore.ieee.org/document/11059490",
  },
  {
    authors: "S. Halli Sudhakara and L. Haghnegahdar",
    title:
      "Security Enhancement in AAV Swarms: A Case Study Using Federated Learning and SHAP Analysis",
    venue: "IEEE Open Journal of Intelligent Transportation Systems",
    doi: "10.1109/OJITS.2025.3550792",
    href: "https://ieeexplore.ieee.org/document/10924249",
  },
  {
    authors: "S. H. Sudhakara, L. Haghnegahdar, M. GhasemiGol and D. Takabi",
    title:
      "Utilizing Federated Learning and SHAP for Predictive Analysis in Smart Grid Security",
    venue: "CSCE 2024, CCIS vol. 2251, Springer, Cham",
    href: "https://link.springer.com/chapter/10.1007/978-3-031-85628-0_37",
  },
];

export const skills = [
  {
    group: "Languages",
    items: [
      "Python",
      "SQL",
      "Java",
    ],
  },
  {
    group: "Machine learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "Random Forest",
      "LSTM",
      "CNNs",
      "AutoGluon",
      "Optuna",
      "SMOTE",
      "SHAP",
      "Federated learning (FedAvg)",
      "GANs",
      "NumPy",
      "Pandas",
    ],
  },
  {
    group: "LLMs and generative AI",
    items: [
      "Prompt engineering",
      "Structured JSON outputs",
      "Embeddings",
      "RAG and retrieval over pgvector",
      "Microsoft Copilot Studio",
      "Power Automate",
      "AI agents and tool use",
      "MCP servers",
      "Hugging Face Transformers",
      "GPT-4 / GPT-5",
      "Llama 3.2 (Groq API)",
    ],
  },
  {
    group: "Computer vision and data annotation",
    items: [
      "PaddleOCR",
      "Transfer learning (DenseNet, VGG, ResNet)",
      "Dataset annotation (Labelbox, Labelbox SDK, COCO format)",
      "Hugging Face datasets",
      "OCR and text extraction",
    ],
  },
  {
    group: "Cloud and MLOps",
    items: [
      "AWS SageMaker",
      "AWS Lambda",
      "AWS Step Functions",
      "Amazon S3",
      "Amazon EC2",
      "SageMaker Model Monitor",
      "GitHub Actions (CI/CD)",
      "Hopsworks feature store",
      "Streamlit",
      "Poetry",
      "Git",
    ],
  },
  {
    group: "Data, visualization and tooling",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Oracle SQL",
      "BeautifulSoup",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Tableau",
      "Jupyter",
      "Postman",
      "UiPath",
    ],
  },
];

export const education = [
  {
    degree: "M.S. Computer Science",
    school: "Old Dominion University",
    detail: "GPA 3.88",
    period: "Aug 2022 — Dec 2024",
  },
  {
    degree: "B.E. Information Technology",
    school: "Visvesvaraya Technological University",
    detail: "GPA 3.4",
    period: "Jun 2015 — Aug 2019",
  },
];

export const resumes = [
  {
    label: "General resume",
    hint: "Broad ML / AI roles",
    href: "/resume/Sushmitha-Halli-Sudhakara-General.pdf",
  },
  {
    label: "Engineering resume",
    hint: "ML / MLOps / AI engineering",
    href: "/resume/Sushmitha-Halli-Sudhakara-Engineering.pdf",
  },
  {
    label: "Research resume",
    hint: "Research and applied scientist",
    href: "/resume/Sushmitha-Halli-Sudhakara-Research.pdf",
  },
];

/** Ordered. The first two build on each other; the grant was separate. */
export const awards = [
  {
    step: "01",
    title: "AWS AI Programming with Python Scholarship",
    issuer: "AWS and Udacity",
    note: "Won by application. Covered the AI Programming with Python nanodegree — PyTorch, neural networks and transfer learning — and produced the Flower Species Image Classifier above.",
  },
  {
    step: "02",
    title: "AWS Machine Learning Scholarship",
    issuer: "AWS and Udacity",
    note: "Open only to graduates of the first scholarship. Covered the AWS Machine Learning Engineer nanodegree, which produced the Bike Sharing and AWS Serverless MLOps Pipeline projects above.",
  },
  {
    step: "03",
    title: "ABW Grant, AWS re:Invent 2024",
    issuer: "AWS",
    note: "Selected from thousands of applicants to attend AWS re:Invent.",
  },
];

export const hackathons = [
  {
    title: "Visa Climate Tech Hackathon",
    period: "2024",
    blurb:
      "Developed data-driven solutions to make grocery shopping more efficient and reduce its environmental impact.",
    links: [
      {
        label: "Write-up",
        href: "https://www.researchgate.net/publication/390466194_Towards_Sustainable_Grocery_Shopping_Data-Driven_Solutions_for_Reducing_Environmental_Impact",
      },
      { label: "Code", href: "https://github.com/pratyush335/VISA_Climate_Tech_Hackathon" },
    ],
  },
  {
    title: "Datathon, City of Norfolk CivicLab",
    period: "2024",
    blurb:
      "Designed infrastructure solutions to improve access and efficiency across Hampton Roads.",
    links: [
      {
        label: "Write-up",
        href: "https://3db7b03b-f01b-41ae-89ec-b19b3555d40b.filesusr.com/ugd/06a51c_b5ae7f8f479a4ff39358552b717aaaae.pdf",
      },
    ],
  },
];

export const volunteering = [
  {
    org: "Global Student Friendship, Old Dominion University",
    title: "Student Leader — event organization and communication",
    period: "2023 — 2024",
    detail:
      "Coordinated the weekly Tuesday Luncheon (40 students) and FISH — Friday's International Supper and Hospitality (150 students), fostering community and cultural exchange.",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "awards", label: "Awards" },
  { id: "hackathons", label: "Hackathons" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

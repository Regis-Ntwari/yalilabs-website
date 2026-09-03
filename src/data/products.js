import TokenIcon from '@mui/icons-material/Token';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DatasetIcon from '@mui/icons-material/Dataset';

/**
 * PRODUCTS REGISTRY
 * Single source of truth for the homepage preview and the /products page.
 * To add a new product, append an entry — both surfaces adapt automatically.
 *
 *   id             — unique key, also used as the ?product= query value
 *   badge          — status label shown in corner chip
 *   badgeActive    — true = accent color, false = neutral
 *   icon           — MUI icon component
 *   title          — product name
 *   description    — short paragraph (cards, carousel)
 *   howItWorks     — { heading, description } for the "How it works" section
 *   flowStages     — optional [{ label, sub }] pipeline steps, rendered by FlowDiagram
 *                    (omit for products with a bespoke demo, e.g. the tokenizer)
 *   features       — [{ title, description }]
 *   href           — internal route for "Learn more" (null while no page exists yet)
 *   externalHref   — optional external link (e.g. PyPI)
 *   externalLabel  — label for external link
 */
export const products = [
  {
    id: 'tokenizer',
    badge: 'Available now',
    badgeActive: true,
    icon: TokenIcon,
    title: 'Alta Tokenizer',
    description:
      'An open-source Python library for tokenizing Kinyarwanda text using Byte Pair Encoding. Achieves 3.7× compression on Kinyarwanda, far outperforming generic tokenizers.',
    howItWorks: {
      heading: 'Language-first tokenization.',
      description:
        "Most tokenizers treat Kinyarwanda as an afterthought. Alta Tokenizer was trained on Kinyarwanda text from the ground up — so it understands how the language actually works.",
    },
    features: [
      { title: 'Byte Pair Encoding', description: 'Uses BPE to learn a vocabulary by iteratively merging the most frequent character pairs in Kinyarwanda text.' },
      { title: 'Encode & Decode', description: 'Full bidirectional support. Convert text to token IDs and reconstruct the original text from token IDs.' },
      { title: 'Custom Training', description: 'Supply your own dataset and retrain the tokenizer on a different language or domain.' },
      { title: 'Language Flexibility', description: 'Designed for Kinyarwanda, but handles English, French, and others. Compression rates are highest for Kinyarwanda.' },
      { title: 'Easy Integration', description: 'pip installable Python package with clear documentation. Drop into existing NLP pipelines without friction.' },
      { title: 'Open Source', description: 'Published openly on PyPI. Inspect the code, contribute, or fork to train your own tokenizer.' },
    ],
    href: '/products?product=tokenizer',
    externalHref: 'https://pypi.org/project/alta-tokenizer/',
    externalLabel: 'View on PyPI',
  },
  {
    id: 'model',
    badge: 'In development',
    badgeActive: false,
    icon: PsychologyIcon,
    title: 'Alta Model',
    description:
      'A Kinyarwanda foundation model built on transformer architecture with a Mixture of Experts (MoE) design. Engineered to understand Kinyarwanda linguistic patterns at a model level.',
    howItWorks: {
      heading: 'How Alta Model works.',
      description: 'From raw Kinyarwanda text to generated output — every step is designed for the language.',
    },
    flowStages: [
      { label: 'Input', sub: 'Kinyarwanda text' },
      { label: 'Tokenize', sub: 'Alta Tokenizer' },
      { label: 'Embed', sub: 'Token embeddings' },
      { label: 'Route', sub: 'MoE gating' },
      { label: 'Process', sub: 'Expert networks' },
      { label: 'Output', sub: 'Generated text' },
    ],
    features: [
      { title: 'Kinyarwanda-First', description: 'Every architectural decision — from tokenization vocabulary to training data — starts from Kinyarwanda, not English-centric defaults.' },
      { title: 'Transformer Architecture', description: 'Built on the transformer architecture, with attention mechanisms tuned for the morphological complexity of Kinyarwanda.' },
      { title: 'Mixture of Experts', description: 'Alta Model uses an MoE design to route inputs through specialized sub-networks, improving efficiency and task-specific performance.' },
      { title: 'Alta Tokenizer Integration', description: 'Designed to use Alta Tokenizer natively, ensuring the model sees Kinyarwanda text at the right granularity from the first layer.' },
    ],
    href: '/products?product=model',
    externalHref: null,
    externalLabel: null,
  },
  {
    id: 'scribe',
    badge: 'Coming soon',
    badgeActive: false,
    icon: RecordVoiceOverIcon,
    title: 'AltaScribe',
    description:
      'A speech-to-text transcription tool built for Kinyarwanda, turning spoken audio into accurate written text for meetings, interviews, and media.',
    howItWorks: {
      heading: 'From speech to Kinyarwanda text.',
      description:
        'AltaScribe listens to spoken Kinyarwanda and produces accurate written transcripts, built on the same language-first foundation as the rest of the Alta ecosystem.',
    },
    flowStages: [
      { label: 'Input', sub: 'Kinyarwanda audio' },
      { label: 'Encode', sub: 'Acoustic features' },
      { label: 'Recognize', sub: 'Alta Model core' },
      { label: 'Decode', sub: 'Kinyarwanda text' },
      { label: 'Output', sub: 'Transcript' },
    ],
    features: [
      { title: 'Kinyarwanda Speech Recognition', description: 'Trained specifically on the phonetics and structure of spoken Kinyarwanda, not adapted from generic ASR models.' },
      { title: 'Audio-to-Text Transcription', description: 'Converts recorded or live Kinyarwanda audio into accurate written text for meetings, interviews, and media.' },
      { title: 'Built on Alta Model', description: "Uses Alta Model's language understanding to produce transcripts that respect Kinyarwanda grammar and morphology." },
      { title: 'API Access', description: 'Integrate transcription directly into applications and workflows via a simple API.' },
    ],
    href: null,
    externalHref: null,
    externalLabel: null,
  },
  {
    id: 'foundry',
    badge: 'Coming soon',
    badgeActive: false,
    icon: DatasetIcon,
    title: 'Alta Foundry',
    description:
      'A data collection platform for gathering, labeling, and curating text, audio, image, and other data types to fuel African-language AI.',
    howItWorks: {
      heading: 'How data becomes a dataset.',
      description:
        "Alta Foundry turns raw contributions — text, audio, images — into labeled, quality-reviewed datasets that train every other product in the ecosystem.",
    },
    flowStages: [
      { label: 'Contribute', sub: 'Text, audio, image' },
      { label: 'Collect', sub: 'Ingestion pipeline' },
      { label: 'Label', sub: 'Human + auto review' },
      { label: 'Curate', sub: 'Quality filtering' },
      { label: 'Dataset', sub: 'Ready for training' },
    ],
    features: [
      { title: 'Multi-Modal Collection', description: 'Gather text, audio, image, and other data types through a single platform built for African-language data.' },
      { title: 'Labeling & Curation Workflows', description: 'Structured pipelines for annotating, reviewing, and organizing contributed data before it is used for training.' },
      { title: 'Quality Review Pipeline', description: "Every contribution passes through review to ensure the data that trains Alta's models is accurate and representative." },
      { title: 'Feeds the Alta Ecosystem', description: 'Datasets curated in Alta Foundry directly power the training of Alta Model and future Alta products.' },
    ],
    href: null,
    externalHref: null,
    externalLabel: null,
  },
];

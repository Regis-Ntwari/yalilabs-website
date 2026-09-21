/**
 * PRODUCTS
 * `catalog.items` is the single source of truth for the homepage preview,
 * the /products page and the footer product links.
 *
 *   id        — unique key, also used as the ?product= query value
 *   icon      — key from src/content/icons.jsx
 *   visual    — 'tokenizer' shows the live demo, 'flow' renders flowStages
 *   featured  — shown in the homepage preview
 */
export default {
  page: {
    heading: 'Our technology, built layer by layer.',
    description:
      "Alta is Yali Labs' AI technology platform for African languages — a set of interconnected tools and models, each building on the last.",
    howItWorksOverline: 'How it works',
    featuresOverline: 'Features',
    featuresHeadingSuffix: 'does.',
    readyPrefix: 'Ready to build with',
    fallbackText: 'In the meantime, Alta Tokenizer is available now.',
    fallbackLabel: 'Explore Alta Tokenizer',
    fallbackHref: 'https://pypi.org/project/alta-tokenizer/',
    nextLabel: 'Next',
    nextText: 'Want to know who builds Alta? Read about Yali Labs — our mission, our approach, and the people behind the work.',
    nextButtonLabel: 'About Yali Labs',
    nextButtonHref: '/company/about-us',
  },

  catalog: {
    items: [
      {
        id: 'tokenizer',
        title: 'Alta Tokenizer',
        badge: 'Available now',
        badgeActive: true,
        featured: true,
        icon: 'Token',
        visual: 'tokenizer',
        description:
          'An open-source Python library for tokenizing Kinyarwanda text using Byte Pair Encoding. Achieves 3.7× compression on Kinyarwanda, far outperforming generic tokenizers.',
        howItWorks: {
          heading: 'Language-first tokenization.',
          description:
            'Most tokenizers treat Kinyarwanda as an afterthought. Alta Tokenizer was trained on Kinyarwanda text from the ground up — so it understands how the language actually works.',
        },
        flowStages: [],
        features: [
          { title: 'Byte Pair Encoding', description: 'Uses BPE to learn a vocabulary by iteratively merging the most frequent character pairs in Kinyarwanda text.' },
          { title: 'Encode & Decode', description: 'Full bidirectional support. Convert text to token IDs and reconstruct the original text from token IDs.' },
          { title: 'Custom Training', description: 'Supply your own dataset and retrain the tokenizer on a different language or domain.' },
          { title: 'Language Flexibility', description: 'Designed for Kinyarwanda, but handles English, French, and others. Compression rates are highest for Kinyarwanda.' },
          { title: 'Easy Integration', description: 'pip installable Python package with clear documentation. Drop into existing NLP pipelines without friction.' },
          { title: 'Open Source', description: 'Published openly on PyPI. Inspect the code, contribute, or fork to train your own tokenizer.' },
        ],
        externalHref: 'https://pypi.org/project/alta-tokenizer/',
        externalLabel: 'View on PyPI',
      },
      {
        id: 'model',
        title: 'Alta Model',
        badge: 'In development',
        badgeActive: false,
        featured: true,
        icon: 'Psychology',
        visual: 'flow',
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
        externalHref: '',
        externalLabel: '',
      },
      {
        id: 'scribe',
        title: 'AltaScribe',
        badge: 'Coming soon',
        badgeActive: false,
        featured: false,
        icon: 'RecordVoiceOver',
        visual: 'flow',
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
        externalHref: '',
        externalLabel: '',
      },
      {
        id: 'foundry',
        title: 'Alta Foundry',
        badge: 'Coming soon',
        badgeActive: false,
        featured: false,
        icon: 'Dataset',
        visual: 'flow',
        description:
          'A data collection platform for gathering, labeling, and curating text, audio, image, and other data types to fuel African-language AI.',
        howItWorks: {
          heading: 'How data becomes a dataset.',
          description:
            'Alta Foundry turns raw contributions — text, audio, images — into labeled, quality-reviewed datasets that train every other product in the ecosystem.',
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
        externalHref: '',
        externalLabel: '',
      },
    ],
  },

  tokenizerDemo: {
    selectLabel: 'Select example',
    outputLabel: 'Output',
    sentences: [
      { text: 'Nagiye gusura abanyeshuri.', tokens: ['Na', 'gi', 'ye', ' gu', 'su', 'ra', ' aba', 'nye', 'shu', 'ri', '.'], ids: [78, 1760, 203, 5256, 892, 451, 1845, 634, 907, 46, 12] },
      { text: 'Umugabo arakorana neza.', tokens: ['Uma', 'ga', 'bo', ' ara', 'ko', 'ra', 'na', ' ne', 'za', '.'], ids: [234, 523, 87, 1023, 412, 451, 289, 876, 102, 12] },
      { text: 'Amakuru yanyu meza.', tokens: ['Ama', 'ku', 'ru', ' yan', 'yu', ' me', 'za', '.'], ids: [445, 234, 67, 891, 203, 567, 102, 12] },
    ],
  },
};

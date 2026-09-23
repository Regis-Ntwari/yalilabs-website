/**
 * PRODUCTS
 * `catalog.items` is the single source of truth for the homepage preview,
 * the hero ecosystem panel, the /products page and the footer product links.
 *
 *   id            - unique key, also the anchor on /products (#id)
 *   icon          - key from src/content/icons.js
 *   featured      - shown in the homepage preview
 *   flowStages    - the "how it works" pipeline, top to bottom
 *   externalHref  - the product's own platform; empty while unreleased
 */
export default {
  page: {
    heading: 'Our technology, built layer by layer.',
    description:
      "Alta is Yali Labs' AI technology platform for African languages: a set of interconnected tools and models, each building on the last.",
    howItWorksOverline: 'How it works',
    unreleasedText: 'Not released yet. Follow along as we build it.',
    nextLabel: 'Next',
    nextText: 'Want to know who builds Alta? Read about Yali Labs: our mission, our approach, and the people behind the work.',
    nextButtonLabel: 'About Yali Labs',
    nextButtonHref: '/company/about-us',
  },

  catalog: {
    items: [
      {
        id: 'model',
        title: 'Alta Model',
        tagline: 'Kinyarwanda foundation model',
        badge: 'In development',
        badgeActive: true,
        featured: true,
        icon: 'Psychology',
        description:
          'A Kinyarwanda foundation model built on transformer architecture with a Mixture of Experts (MoE) design. Engineered to understand Kinyarwanda linguistic patterns at a model level.',
        howItWorks: {
          heading: 'From Kinyarwanda text to generated output.',
          description:
            'Every step is designed for the language. Input is tokenised at the right granularity, routed through specialised expert networks, and decoded back into fluent Kinyarwanda.',
        },
        flowStages: [
          { label: 'Input', sub: 'Kinyarwanda text' },
          { label: 'Tokenize', sub: 'Language-first vocabulary' },
          { label: 'Embed', sub: 'Token embeddings' },
          { label: 'Route', sub: 'MoE gating' },
          { label: 'Process', sub: 'Expert networks' },
          { label: 'Output', sub: 'Generated text' },
        ],
        externalHref: 'https://model.yalilabs.com/',
        externalLabel: 'Open Alta Model',
      },
      {
        id: 'scribe',
        title: 'AltaScribe',
        tagline: 'Kinyarwanda speech to text',
        badge: 'Coming soon',
        badgeActive: false,
        featured: true,
        icon: 'RecordVoiceOver',
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
        externalHref: 'https://scribe.yalilabs.com/',
        externalLabel: 'Open AltaScribe',
      },
      {
        id: 'foundry',
        title: 'Alta Foundry',
        tagline: 'Data collection & curation',
        badge: 'Coming soon',
        badgeActive: false,
        featured: true,
        icon: 'Dataset',
        description:
          'A data collection platform for gathering, labeling, and curating text, audio, image, and other data types to fuel African-language AI.',
        howItWorks: {
          heading: 'How data becomes a dataset.',
          description:
            'Alta Foundry turns raw contributions (text, audio, images) into labeled, quality-reviewed datasets that train every other product in the ecosystem.',
        },
        flowStages: [
          { label: 'Contribute', sub: 'Text, audio, image' },
          { label: 'Collect', sub: 'Ingestion pipeline' },
          { label: 'Label', sub: 'Human + auto review' },
          { label: 'Curate', sub: 'Quality filtering' },
          { label: 'Dataset', sub: 'Ready for training' },
        ],
        externalHref: 'https://foundry.yalilabs.com/',
        externalLabel: 'Open Alta Foundry',
      },
    ],
  },
};

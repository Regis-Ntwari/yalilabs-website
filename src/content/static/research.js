export default {
  hero: {
    overline: 'Research',
    title: 'The lab.',
    description:
      'Yali Labs is an African AI research company. Our research is oriented around a fundamental question: what does it take to build AI that genuinely works for African languages?',
  },

  areas: {
    overline: 'Research Areas',
    heading: 'What we investigate.',
    description: "Six interconnected domains that form the technical foundation of Yali Labs' work.",
    items: [
      { id: 'lm', num: '01', title: 'Language Modeling', themes: ['Morphology', 'Agglutinative languages', 'Bantu linguistics'], description: 'Researching how to build language models that capture the morphological richness of Bantu languages like Kinyarwanda — languages with complex verb conjugation, noun class systems, and agglutinative structures.', earlyStage: false, projectLabel: '', projectHref: '' },
      { id: 'tok', num: '02', title: 'Tokenization Methods', themes: ['BPE', 'Subword units', 'Compression efficiency'], description: 'Investigating how standard tokenization approaches fail on African languages and developing better alternatives. Our work on Alta Tokenizer is the practical output of this research stream.', earlyStage: false, projectLabel: 'Alta Tokenizer', projectHref: '/products?product=tokenizer' },
      { id: 'data', num: '03', title: 'African Language Datasets', themes: ['Data curation', 'Annotation', 'Kinyarwanda corpus'], description: 'Curating, cleaning, and creating datasets for Kinyarwanda language tasks. High-quality training data is the limiting factor for most low-resource language AI work.', earlyStage: false, projectLabel: '', projectHref: '' },
      { id: 'eval', num: '04', title: 'Evaluation & Benchmarks', themes: ['Benchmarks', 'Metrics', 'Language evaluation'], description: 'Developing evaluation benchmarks and metrics appropriate for Kinyarwanda language understanding — rather than simply adapting benchmarks designed for English.', earlyStage: false, projectLabel: '', projectHref: '' },
      { id: 'multi', num: '05', title: 'Multimodal AI', themes: ['Text + Audio', 'Vision-language', 'Multimodal'], description: 'Exploring how to build systems that understand text, audio, and visual information in African language contexts. Early-stage research direction.', earlyStage: true, projectLabel: '', projectHref: '' },
      { id: 'infra', num: '06', title: 'Training Infrastructure', themes: ['Compute efficiency', 'Training pipelines', 'Optimization'], description: 'Researching efficient model training on constrained compute resources — important for any lab working in contexts where access to large GPU clusters is limited.', earlyStage: false, projectLabel: '', projectHref: '' },
    ],
  },

  openSource: {
    overline: 'Open Source',
    heading: "What we've released.",
    description: 'We believe in building in public.',
    items: [
      { name: 'alta-tokenizer', description: 'Kinyarwanda tokenizer based on Byte Pair Encoding.', language: 'Python', href: 'https://pypi.org/project/alta-tokenizer/', status: 'active' },
    ],
    noteText: 'More releases coming. Follow us on GitHub →',
    noteLinkLabel: 'github.com/yalilabs',
    noteLinkHref: 'https://github.com/yalilabs',
  },
};

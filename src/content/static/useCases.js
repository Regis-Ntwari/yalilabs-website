export default {
  hero: {
    overline: 'Use Cases',
    title: 'What becomes possible.',
    description:
      'Language AI for African languages opens up applications that have been difficult or impossible when AI systems only work well in English.',
  },

  disclaimer: {
    enabled: true,
    text:
      'Use cases marked as **potential** describe future applications — not claims that Yali Labs currently serves these industries. **Current** use cases reflect our active tools and research.',
  },

  domains: {
    potentialLabel: 'potential',
    currentLabel: 'current',
    items: [
      { id: 'education', icon: 'School', title: 'Education', potential: true, description: 'Language technology can power reading assistants, tutoring systems, and educational content in Kinyarwanda — enabling students to learn in their mother tongue.', examples: ['Kinyarwanda reading comprehension tools', 'Adaptive language learning', 'Content summarization for students'], ctaLabel: '', ctaHref: '' },
      { id: 'government', icon: 'AccountBalance', title: 'Public Sector', potential: true, description: 'Government agencies could use language AI to improve citizen services, translate policy documents, and make information more accessible in local languages.', examples: ['Multilingual citizen services', 'Document translation & summarization', 'Accessibility for Kinyarwanda speakers'], ctaLabel: '', ctaHref: '' },
      { id: 'healthcare', icon: 'LocalHospital', title: 'Healthcare', potential: true, description: "Patient communication and medical information access are significantly improved when AI can operate in the patient's language.", examples: ['Patient communication support', 'Medical information in local language', 'Clinical documentation assistance'], ctaLabel: '', ctaHref: '' },
      { id: 'agriculture', icon: 'Grass', title: 'Agriculture', potential: true, description: "Much of Rwanda's rural population speaks primarily Kinyarwanda. AI tools in local languages open up advisory and information services for farmers.", examples: ['Agricultural advisory in Kinyarwanda', 'Market information access', 'Climate and weather guidance'], ctaLabel: '', ctaHref: '' },
      { id: 'developers', icon: 'Bolt', title: 'Developer Tools', potential: false, description: 'Alta Tokenizer is available now for developers building NLP pipelines for Kinyarwanda. Researchers and engineers can integrate it directly into existing workflows.', examples: ['NLP pipeline integration', 'Custom tokenizer training', 'Kinyarwanda text processing'], ctaLabel: 'Try Alta Tokenizer', ctaHref: '/products?product=tokenizer' },
      { id: 'research', icon: 'Science', title: 'Academic Research', potential: false, description: 'Our open-source tools support researchers working in African linguistics, computational linguistics, and low-resource language AI.', examples: ['Kinyarwanda corpus work', 'Low-resource NLP research', 'African language benchmarks'], ctaLabel: '', ctaHref: '' },
    ],
  },

  cta: {
    heading: 'Building something with African language AI?',
    text: 'We would like to hear about it. Get in touch to discuss research collaborations, integration questions, or potential partnerships.',
    buttonLabel: 'Get in touch',
    buttonHref: '/contact-us',
  },
};

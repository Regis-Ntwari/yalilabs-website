export default {
  hero: {
    overline: 'AI research lab · Kigali, Rwanda',
    headlinePre: 'Building AI that',
    headlineAccent: 'understands',
    headlinePost: 'Africa.',
    subtitle:
      'Yali Labs builds language technologies, foundation models, and developer tools designed around African languages, starting with Kinyarwanda.',
    ctaLabel: 'Explore our products',
    ctaHref: '/products',
    secondaryCtaLabel: 'About Yali Labs',
    secondaryCtaHref: '/company/about-us',
    panelLabel: 'alta · ecosystem',
    panelFooter: 'One platform. Three products. Each one builds on the last.',
  },

  mission: {
    overline: 'Why we exist',
    heading: "AI shouldn't stop at the world's most spoken languages.",
    paragraphs: [
      'Modern AI systems are largely trained on languages with enormous existing datasets and commercial demand. African languages, with their rich linguistic diversity and hundreds of millions of speakers, are frequently overlooked.',
      'Yali Labs is working to change that. We are not simply adapting technology built for other contexts. We are researching, building, and releasing AI that starts from African languages, and Kinyarwanda is where we begin.',
    ],
    stats: [
      { value: '2,000+', label: 'African languages documented globally', note: 'most lack NLP resources' },
      { value: '< 1%', label: 'of AI training data represents African languages', note: 'per major benchmarks' },
      { value: '14M+', label: 'Kinyarwanda speakers in East Africa', note: 'Rwanda, Uganda, DRC' },
    ],
    chartTitle: '// Estimated NLP data representation',
    bars: [
      { lang: 'English', percent: 92, isAfrican: false },
      { lang: 'Mandarin', percent: 58, isAfrican: false },
      { lang: 'Spanish', percent: 45, isAfrican: false },
      { lang: 'French', percent: 38, isAfrican: false },
      { lang: 'Arabic', percent: 21, isAfrican: false },
      { lang: 'Swahili', percent: 4.2, isAfrican: true },
      { lang: 'Kinyarwanda', percent: 0.3, isAfrican: true },
      { lang: 'Amharic', percent: 0.4, isAfrican: true },
      { lang: 'Yoruba', percent: 0.2, isAfrican: true },
    ],
    legendGlobal: 'Global languages',
    legendAfrican: 'African languages',
    footnote: '* Approximate figures for illustrative purposes',
  },

  alta: {
    heading: 'Our technology, built layer by layer.',
    description:
      "Alta is Yali Labs' AI technology platform for African languages: a set of interconnected tools and models, each building on the last.",
    learnMoreLabel: 'Learn more',
    buttonLabel: 'View all products',
  },

  partners: {
    overline: 'Partners & Programs',
    heading: 'Supported by institutions that back serious research.',
    items: [
      { name: 'Microsoft Azure', href: 'https://azure.microsoft.com/', description: 'Cloud compute & AI infrastructure', logo: 'azure' },
      { name: 'Microsoft Founders Hub', href: 'https://www.microsoft.com/en-us/startups', description: 'Cloud credits & startup resources', logo: 'microsoft' },
      { name: 'NVIDIA Inception', href: 'https://www.nvidia.com/en-us/deep-learning-ai/startups/', description: 'GPU technology & AI startup support', logo: 'nvidia' },
      { name: 'Google Cloud', href: 'https://cloud.google.com/', description: 'ML infrastructure & large-scale data', logo: 'google-cloud' },
    ],
  },
};

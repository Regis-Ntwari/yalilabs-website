import InfoIcon from '@mui/icons-material/Info';

export default {
  key: 'about',
  label: 'About',
  icon: InfoIcon,
  route: '/company/about-us',
  description: 'Company story, timeline and values on the About page.',
  sections: [
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'title', label: 'Title', type: 'text', half: true },
        { name: 'paragraphs', label: 'Intro paragraphs', type: 'lines', rows: 6, help: 'One paragraph per line.' },
      ],
    },
    {
      key: 'story',
      label: 'Story & values',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'heading', label: 'Heading', type: 'text', half: true },
        {
          name: 'timeline', label: 'Timeline', type: 'list',
          itemLabel: (item) => [item.year, item.title].filter(Boolean).join(' — '),
          itemFields: [
            { name: 'year', label: 'Marker', type: 'text', half: true, help: 'e.g. 2024, Now, Ahead' },
            { name: 'title', label: 'Title', type: 'text', half: true },
            { name: 'body', label: 'Body', type: 'textarea', rows: 3 },
          ],
        },
        { name: 'valuesOverline', label: 'Values overline', type: 'text' },
        {
          name: 'values', label: 'Values', type: 'list',
          itemLabel: (item) => item.title,
          itemFields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
          ],
        },
      ],
    },
    {
      key: 'cta',
      label: 'Call to action',
      fields: [
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'text', label: 'Text', type: 'textarea', rows: 2 },
        { name: 'buttonLabel', label: 'Button label', type: 'text', half: true },
        { name: 'buttonHref', label: 'Button link', type: 'text', half: true },
      ],
    },
  ],
};

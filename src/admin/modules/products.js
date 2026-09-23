import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ICON_OPTIONS } from '../../content/icons';

export default {
  key: 'products',
  label: 'Products',
  icon: Inventory2Icon,
  route: '/products',
  description: 'The Alta products. Each one has a short description, a "how it works" flow and a link to its own platform. They drive the /products page, the homepage hero and preview, and the footer links.',
  sections: [
    {
      key: 'catalog',
      label: 'Products',
      fields: [
        {
          name: 'items', label: 'Products', type: 'list', itemName: 'product',
          itemLabel: (item) => item.title || item.id,
          itemFields: [
            { name: 'title', label: 'Name', type: 'text', half: true },
            { name: 'id', label: 'ID (URL key)', type: 'text', half: true, help: 'Lowercase, no spaces. Used as /products#ID' },
            { name: 'tagline', label: 'Tagline', type: 'text', help: 'A few words shown under the name in the hero and on cards, e.g. "Kinyarwanda speech to text".' },
            { name: 'badge', label: 'Status badge', type: 'text', half: true, help: 'e.g. Available now, In development, Coming soon' },
            { name: 'badgeActive', label: 'Highlight badge in blue', type: 'boolean', half: true },
            { name: 'featured', label: 'Show on homepage', type: 'boolean', half: true },
            { name: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS, half: true },
            { name: 'description', label: 'Brief description', type: 'textarea', rows: 3 },
            {
              name: 'howItWorks', label: 'How it works', type: 'object',
              help: 'Shown next to the flow diagram on the products page.',
              fields: [
                { name: 'heading', label: 'Heading', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
              ],
            },
            {
              name: 'flowStages', label: 'Flow stages', type: 'list', itemName: 'stage',
              help: 'The steps of the "how it works" diagram, top to bottom.',
              itemLabel: (item) => [item.label, item.sub].filter(Boolean).join(' · '),
              itemFields: [
                { name: 'label', label: 'Stage', type: 'text', half: true },
                { name: 'sub', label: 'Detail', type: 'text', half: true },
              ],
            },
            { name: 'externalLabel', label: 'Platform link label', type: 'text', half: true, help: 'e.g. Open Alta Model' },
            { name: 'externalHref', label: 'Platform link URL', type: 'text', half: true, help: 'The product’s own site. Leave empty while it is not released.' },
          ],
          newItem: {
            id: '', title: '', tagline: '', badge: 'Coming soon', badgeActive: false, featured: false, icon: 'Hub',
            description: '', howItWorks: { heading: '', description: '' }, flowStages: [], externalHref: '', externalLabel: '',
          },
        },
      ],
    },
    {
      key: 'page',
      label: 'Page copy',
      fields: [
        { name: 'heading', label: 'Page heading', type: 'text' },
        { name: 'description', label: 'Page description', type: 'textarea', rows: 3 },
        { name: 'howItWorksOverline', label: '"How it works" overline', type: 'text', half: true },
        { name: 'unreleasedText', label: 'Text shown instead of the link for unreleased products', type: 'text', half: true },
        { name: 'nextLabel', label: '"Next" label', type: 'text', half: true },
        { name: 'nextButtonLabel', label: '"Next" button label', type: 'text', half: true },
        { name: 'nextText', label: '"Next" text', type: 'textarea', rows: 2 },
        { name: 'nextButtonHref', label: '"Next" button link', type: 'text' },
      ],
    },
  ],
};

import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ICON_OPTIONS } from '../../content/icons';

export default {
  key: 'products',
  label: 'Products',
  icon: Inventory2Icon,
  route: '/products',
  description: 'The Alta product catalogue. Products drive the /products page, the homepage preview and the footer links.',
  sections: [
    {
      key: 'catalog',
      label: 'Catalogue',
      fields: [
        {
          name: 'items', label: 'Products', type: 'list',
          itemLabel: (item) => item.title || item.id,
          itemFields: [
            { name: 'title', label: 'Name', type: 'text', half: true },
            { name: 'id', label: 'ID (URL key)', type: 'text', half: true, help: 'Lowercase, no spaces. Used as /products?product=ID' },
            { name: 'badge', label: 'Status badge', type: 'text', half: true, help: 'e.g. Available now, In development' },
            { name: 'badgeActive', label: 'Highlight badge in blue (available)', type: 'boolean', half: true },
            { name: 'featured', label: 'Show on homepage', type: 'boolean', half: true },
            { name: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS, half: true },
            {
              name: 'visual', label: '"How it works" visual', type: 'select', half: true,
              options: [
                { value: 'flow', label: 'Flow diagram (uses the stages below)' },
                { value: 'tokenizer', label: 'Live tokenizer demo' },
              ],
            },
            { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
            {
              name: 'howItWorks', label: 'How it works', type: 'object',
              fields: [
                { name: 'heading', label: 'Heading', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
              ],
            },
            {
              name: 'flowStages', label: 'Flow stages', type: 'list',
              itemLabel: (item) => [item.label, item.sub].filter(Boolean).join(' · '),
              itemFields: [
                { name: 'label', label: 'Stage', type: 'text', half: true },
                { name: 'sub', label: 'Detail', type: 'text', half: true },
              ],
            },
            {
              name: 'features', label: 'Features', type: 'list',
              itemLabel: (item) => item.title,
              itemFields: [
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
              ],
            },
            { name: 'externalLabel', label: 'External link label', type: 'text', half: true, help: 'e.g. View on PyPI' },
            { name: 'externalHref', label: 'External link URL', type: 'text', half: true, help: 'Leave empty for products that are not released yet.' },
          ],
          newItem: {
            id: '', title: '', badge: 'Coming soon', badgeActive: false, featured: false, icon: 'Hub', visual: 'flow',
            description: '', howItWorks: { heading: '', description: '' }, flowStages: [], features: [], externalHref: '', externalLabel: '',
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
        { name: 'featuresOverline', label: '"Features" overline', type: 'text', half: true },
        { name: 'featuresHeadingSuffix', label: 'Features heading suffix', type: 'text', half: true, help: 'Renders as "What {Product} {suffix}"' },
        { name: 'readyPrefix', label: 'CTA heading prefix', type: 'text', half: true, help: 'Renders as "{prefix} {Product}?" for released products' },
        { name: 'fallbackText', label: 'Unreleased product — text', type: 'textarea', rows: 2 },
        { name: 'fallbackLabel', label: 'Unreleased product — button label', type: 'text', half: true },
        { name: 'fallbackHref', label: 'Unreleased product — button link', type: 'text', half: true },
        { name: 'nextLabel', label: '"Next" label', type: 'text', half: true },
        { name: 'nextButtonLabel', label: '"Next" button label', type: 'text', half: true },
        { name: 'nextText', label: '"Next" text', type: 'textarea', rows: 2 },
        { name: 'nextButtonHref', label: '"Next" button link', type: 'text' },
      ],
    },
    {
      key: 'tokenizerDemo',
      label: 'Tokenizer demo',
      fields: [
        { name: 'selectLabel', label: 'Picker label', type: 'text', half: true },
        { name: 'outputLabel', label: 'Output label', type: 'text', half: true },
        {
          name: 'sentences', label: 'Example sentences', type: 'list',
          itemLabel: (item) => item.text,
          itemFields: [
            { name: 'text', label: 'Sentence', type: 'text' },
            { name: 'tokens', label: 'Tokens', type: 'pipe', help: 'Separate tokens with |. Leading spaces are kept.' },
            { name: 'ids', label: 'Token IDs', type: 'numbers', help: 'Comma-separated numbers.' },
          ],
          newItem: { text: '', tokens: [], ids: [] },
        },
      ],
    },
  ],
};

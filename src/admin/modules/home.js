import HomeIcon from '@mui/icons-material/Home';
import { LOGO_OPTIONS } from '../../content/logos';

export default {
  key: 'home',
  label: 'Home',
  icon: HomeIcon,
  route: '/',
  description: 'The landing page: hero, mission statement, product preview and partner logos.',
  sections: [
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', help: 'Small line above the headline, e.g. "AI research lab · Kigali, Rwanda". Leave empty to hide.' },
        { name: 'headlinePre', label: 'Headline - before accent', type: 'text', half: true },
        { name: 'headlineAccent', label: 'Headline - accent word', type: 'text', half: true, help: 'Shown in blue italics.' },
        { name: 'headlinePost', label: 'Headline - after accent', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
        { name: 'ctaLabel', label: 'Primary button label', type: 'text', half: true },
        { name: 'ctaHref', label: 'Primary button link', type: 'text', half: true, help: 'Internal path, e.g. /products' },
        { name: 'secondaryCtaLabel', label: 'Secondary button label', type: 'text', half: true, help: 'Leave empty to hide the second button.' },
        { name: 'secondaryCtaHref', label: 'Secondary button link', type: 'text', half: true },
        { name: 'panelLabel', label: 'Ecosystem panel title', type: 'text', half: true, help: 'Small monospace title of the product panel, e.g. "alta · ecosystem".' },
        { name: 'panelFooter', label: 'Ecosystem panel footer', type: 'text', half: true, help: 'One line under the product list. Leave empty to hide.' },
      ],
      note: 'The product panel next to the headline lists the products from the Products module (name, tagline, status badge and icon), in the order they appear there.',
    },
    {
      key: 'mission',
      label: 'Mission',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'paragraphs', label: 'Paragraphs', type: 'lines', rows: 8, help: 'One paragraph per line.' },
        {
          name: 'stats', label: 'Statistics', type: 'list',
          itemLabel: (item) => [item.value, item.label].filter(Boolean).join(' - '),
          itemFields: [
            { name: 'value', label: 'Value', type: 'text', half: true, help: 'e.g. 14M+' },
            { name: 'note', label: 'Small note', type: 'text', half: true },
            { name: 'label', label: 'Label', type: 'text' },
          ],
        },
        { name: 'chartTitle', label: 'Chart title', type: 'text' },
        {
          name: 'bars', label: 'Chart bars', type: 'list',
          itemLabel: (item) => `${item.lang || 'Language'} · ${item.percent ?? 0}%`,
          itemFields: [
            { name: 'lang', label: 'Language', type: 'text', half: true },
            { name: 'percent', label: 'Percent (0-100)', type: 'number', half: true },
            { name: 'isAfrican', label: 'African language (highlighted in blue)', type: 'boolean' },
          ],
        },
        { name: 'legendGlobal', label: 'Legend - grey bars', type: 'text', half: true },
        { name: 'legendAfrican', label: 'Legend - blue bars', type: 'text', half: true },
        { name: 'footnote', label: 'Footnote', type: 'text' },
      ],
    },
    {
      key: 'alta',
      label: 'Products intro',
      fields: [
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { name: 'learnMoreLabel', label: '"Learn more" button label', type: 'text', half: true },
        { name: 'buttonLabel', label: '"View all" button label', type: 'text', half: true },
      ],
      note: 'Which products appear here is controlled by the "Show on homepage" switch in the Products module.',
    },
    {
      key: 'partners',
      label: 'Partners',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'heading', label: 'Heading', type: 'text' },
        {
          name: 'items', label: 'Partners', type: 'list',
          itemLabel: (item) => item.name,
          itemFields: [
            { name: 'name', label: 'Name', type: 'text', half: true },
            { name: 'logo', label: 'Logo', type: 'select', options: LOGO_OPTIONS, half: true, help: 'Pick "Text wordmark" for partners without a built-in logo.' },
            { name: 'description', label: 'One-line description', type: 'text' },
            { name: 'href', label: 'Website URL', type: 'text' },
          ],
          newItem: { name: '', logo: 'text', description: '', href: '' },
        },
      ],
    },
  ],
};

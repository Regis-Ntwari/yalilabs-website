import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { SOCIAL_OPTIONS } from '../../content/socials';

export default {
  key: 'footer',
  label: 'Footer',
  icon: ViewQuiltIcon,
  route: '/',
  description: 'The site-wide footer: tagline, social links, link columns and the copyright line.',
  sections: [
    {
      key: 'brand',
      label: 'Brand & social',
      fields: [
        { name: 'tagline', label: 'Tagline', type: 'textarea', rows: 2, help: 'Short line under the logo.' },
        {
          name: 'socials', label: 'Social links', type: 'list', itemName: 'social link',
          itemLabel: (item) => item.label || item.platform,
          itemFields: [
            { name: 'platform', label: 'Platform (icon)', type: 'select', options: SOCIAL_OPTIONS, half: true },
            { name: 'label', label: 'Accessible label', type: 'text', half: true, help: 'e.g. GitHub' },
            { name: 'href', label: 'URL', type: 'text' },
          ],
          newItem: { platform: 'website', label: '', href: '' },
        },
      ],
    },
    {
      key: 'links',
      label: 'Link columns',
      fields: [
        {
          name: 'groups', label: 'Columns', type: 'list', itemName: 'column',
          itemLabel: (item) => item.title,
          itemFields: [
            { name: 'title', label: 'Column title', type: 'text' },
            {
              name: 'items', label: 'Links', type: 'list', itemName: 'link',
              itemLabel: (item) => item.label,
              itemFields: [
                { name: 'label', label: 'Label', type: 'text', half: true },
                { name: 'href', label: 'Link', type: 'text', half: true, help: 'Internal path (/products) or full URL.' },
              ],
              newItem: { label: '', href: '' },
            },
          ],
          newItem: { title: '', items: [] },
        },
        { name: 'showProducts', label: 'Show a Products column generated from the catalogue', type: 'boolean', half: true },
        { name: 'productsTitle', label: 'Products column title', type: 'text', half: true },
      ],
      note: 'The Products column lists every product in the Products module automatically, so renames propagate here.',
    },
    {
      key: 'bottom',
      label: 'Bottom bar',
      fields: [
        { name: 'copyright', label: 'Copyright line', type: 'text', half: true },
        { name: 'location', label: 'Location', type: 'text', half: true },
      ],
    },
  ],
};

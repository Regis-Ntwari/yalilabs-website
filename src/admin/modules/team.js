import PeopleIcon from '@mui/icons-material/People';

export default {
  key: 'team',
  label: 'Team',
  icon: PeopleIcon,
  route: '/company/our-team',
  description: 'Team members, leadership cards and the "work with us" block.',
  sections: [
    {
      key: 'members',
      label: 'Members',
      fields: [
        { name: 'leadershipLabel', label: 'Leadership section label', type: 'text', half: true },
        { name: 'teamLabel', label: 'Team section label', type: 'text', half: true },
        {
          name: 'items', label: 'People', type: 'list',
          itemLabel: (item) => [item.name, item.role].filter(Boolean).join(' - '),
          itemFields: [
            { name: 'name', label: 'Full name', type: 'text', half: true },
            { name: 'initials', label: 'Initials', type: 'text', half: true, help: 'Leave empty to derive from the name.' },
            { name: 'role', label: 'Role', type: 'text', half: true },
            { name: 'area', label: 'Area tag', type: 'text', half: true, help: 'e.g. Data & Infrastructure' },
            { name: 'isHead', label: 'Leadership (large card in the first row)', type: 'boolean' },
            { name: 'description', label: 'Bio', type: 'textarea', rows: 3 },
            { name: 'photo', label: 'Photo URL', type: 'text', half: true, help: 'Path under /public (e.g. /team/name.jpg) or an https:// URL. Empty shows initials.' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'text', half: true },
          ],
          newItem: { name: '', initials: '', role: '', area: '', isHead: false, photo: '', linkedin: '', description: '' },
        },
      ],
    },
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'title', label: 'Title', type: 'text', half: true },
        { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
      ],
    },
    {
      key: 'join',
      label: 'Work with us',
      fields: [
        { name: 'overline', label: 'Overline', type: 'text', half: true },
        { name: 'heading', label: 'Heading', type: 'text', half: true },
        { name: 'text', label: 'Text', type: 'textarea', rows: 2 },
        { name: 'buttonLabel', label: 'Button label', type: 'text', half: true },
        { name: 'buttonHref', label: 'Button link', type: 'text', half: true },
        { name: 'lookForLabel', label: '"What we look for" label', type: 'text' },
        { name: 'lookFor', label: 'What we look for', type: 'lines', rows: 5, help: 'One item per line.' },
      ],
    },
  ],
};

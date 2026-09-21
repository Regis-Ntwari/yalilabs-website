import MailIcon from '@mui/icons-material/Mail';

export default {
  key: 'contact',
  label: 'Contact',
  icon: MailIcon,
  route: '/contact-us',
  description: 'Contact details, reasons to reach out and the message form copy.',
  sections: [
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
      key: 'info',
      label: 'Details',
      fields: [
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'text', label: 'Text', type: 'textarea', rows: 2 },
        { name: 'emailLabel', label: 'Email card label', type: 'text', half: true },
        { name: 'email', label: 'Email address', type: 'text', half: true },
        { name: 'reasonsLabel', label: 'Reasons label', type: 'text' },
        { name: 'reasons', label: 'Reasons to reach out', type: 'lines', rows: 5, help: 'One per line.' },
      ],
    },
    {
      key: 'form',
      label: 'Form',
      fields: [
        { name: 'title', label: 'Form title', type: 'text' },
        { name: 'submitLabel', label: 'Submit button', type: 'text', half: true },
        { name: 'sendingLabel', label: 'Sending label', type: 'text', half: true },
        { name: 'successHeading', label: 'Success heading', type: 'text' },
        { name: 'successText', label: 'Success text', type: 'textarea', rows: 2, help: 'Use {email} to insert the sender\'s address.' },
      ],
    },
  ],
};

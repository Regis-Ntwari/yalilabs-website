import { z } from 'zod';
import { str, lines } from './common';

export default z.object({
  hero: z.object({
    overline: str,
    title: str,
    description: str,
  }),
  info: z.object({
    heading: str,
    text: str,
    emailLabel: str,
    email: z.union([z.literal(''), z.email('Enter a valid email address.')]),
    reasonsLabel: str,
    reasons: lines,
  }),
  form: z.object({
    title: str,
    submitLabel: str,
    sendingLabel: str,
    successHeading: str,
    successText: str,
  }),
});

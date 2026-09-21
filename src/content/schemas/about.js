import { z } from 'zod';
import { str, lines, url } from './common';

export default z.object({
  hero: z.object({
    overline: str,
    title: str,
    paragraphs: lines,
  }),
  story: z.object({
    overline: str,
    heading: str,
    timeline: z.array(z.object({ year: str, title: str, body: str })),
    valuesOverline: str,
    values: z.array(z.object({ title: str, description: str })),
  }),
  cta: z.object({
    heading: str,
    text: str,
    buttonLabel: str,
    buttonHref: url,
  }),
});

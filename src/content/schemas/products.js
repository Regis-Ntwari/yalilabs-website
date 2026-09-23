import { z } from 'zod';
import { str, url, bool } from './common';

const productSchema = z.object({
  id: z
    .string()
    .min(1, 'Product ID is required.')
    .regex(/^[a-z0-9-]+$/, 'Product ID must be lowercase letters, numbers or hyphens.'),
  title: str.min(1, 'Product name is required.'),
  tagline: str,
  badge: str,
  badgeActive: bool,
  featured: bool,
  icon: str,
  description: str,
  howItWorks: z.object({ heading: str, description: str }),
  flowStages: z.array(z.object({ label: str, sub: str })),
  externalHref: url,
  externalLabel: str,
});

export default z.object({
  page: z.object({
    heading: str,
    description: str,
    howItWorksOverline: str,
    unreleasedText: str,
    nextLabel: str,
    nextText: str,
    nextButtonLabel: str,
    nextButtonHref: url,
  }),
  catalog: z.object({
    items: z.array(productSchema).superRefine((items, ctx) => {
      const seen = new Set();
      items.forEach((p, i) => {
        if (seen.has(p.id)) {
          ctx.addIssue({ code: 'custom', path: [i, 'id'], message: `Duplicate product ID "${p.id}".` });
        }
        seen.add(p.id);
      });
    }),
  }),
});

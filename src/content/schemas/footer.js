import { z } from 'zod';
import { str, url, bool } from './common';
import { SOCIAL_PLATFORMS } from '../socials';

export default z.object({
  brand: z.object({
    tagline: str,
    socials: z.array(
      z.object({
        platform: z.enum(SOCIAL_PLATFORMS),
        label: str,
        href: url.min(1, 'Social link URL is required.'),
      }),
    ),
  }),
  links: z.object({
    groups: z.array(
      z.object({
        title: str.min(1, 'Group title is required.'),
        items: z.array(z.object({ label: str.min(1, 'Link label is required.'), href: url.min(1, 'Link URL is required.') })),
      }),
    ),
    showProducts: bool,
    productsTitle: str,
  }),
  bottom: z.object({
    copyright: str,
    location: str,
  }),
});

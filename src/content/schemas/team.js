import { z } from 'zod';
import { str, lines, url, bool } from './common';

export default z.object({
  hero: z.object({
    overline: str,
    title: str,
    description: str,
  }),
  members: z.object({
    leadershipLabel: str,
    teamLabel: str,
    items: z.array(
      z.object({
        name: str.min(1, 'Member name is required.'),
        initials: str.max(3, 'Initials are at most 3 characters.'),
        role: str,
        area: str,
        isHead: bool,
        photo: url,
        linkedin: url,
        description: str,
      }),
    ),
  }),
  join: z.object({
    overline: str,
    heading: str,
    text: str,
    buttonLabel: str,
    buttonHref: url,
    lookForLabel: str,
    lookFor: lines,
  }),
});

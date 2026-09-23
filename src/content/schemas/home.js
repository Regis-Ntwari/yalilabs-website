import { z } from 'zod';
import { str, lines, url, bool, num } from './common';

export default z.object({
  hero: z.object({
    overline: str,
    headlinePre: str,
    headlineAccent: str,
    headlinePost: str,
    subtitle: str,
    ctaLabel: str,
    ctaHref: url,
    secondaryCtaLabel: str,
    secondaryCtaHref: url,
    panelLabel: str,
    panelFooter: str,
  }),
  mission: z.object({
    overline: str,
    heading: str,
    paragraphs: lines,
    stats: z.array(z.object({ value: str, label: str, note: str })),
    chartTitle: str,
    bars: z.array(z.object({ lang: str, percent: num.min(0).max(100), isAfrican: bool })),
    legendGlobal: str,
    legendAfrican: str,
    footnote: str,
  }),
  alta: z.object({
    heading: str,
    description: str,
    learnMoreLabel: str,
    buttonLabel: str,
  }),
  partners: z.object({
    overline: str,
    heading: str,
    items: z.array(z.object({ name: str.min(1, 'Partner name is required.'), href: url, description: str, logo: str })),
  }),
});

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LanguageIcon from '@mui/icons-material/Language';

/**
 * SOCIAL PLATFORM REGISTRY
 * Footer social links reference a platform by key; the icon is resolved here.
 */
export const SOCIALS = {
  github: { label: 'GitHub', icon: GitHubIcon },
  linkedin: { label: 'LinkedIn', icon: LinkedInIcon },
  x: { label: 'X (Twitter)', icon: XIcon },
  youtube: { label: 'YouTube', icon: YouTubeIcon },
  email: { label: 'Email', icon: MailOutlinedIcon },
  website: { label: 'Website', icon: LanguageIcon },
};

export const SOCIAL_PLATFORMS = Object.keys(SOCIALS);

export const SOCIAL_OPTIONS = SOCIAL_PLATFORMS.map((value) => ({ value, label: SOCIALS[value].label }));

export function getSocialIcon(platform) {
  return (SOCIALS[platform] || SOCIALS.website).icon;
}

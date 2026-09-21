import { createElement } from 'react';
import { getIcon } from './icons';

/** Renders a registry icon by name: <ContentIcon name="Token" sx={...} /> */
export default function ContentIcon({ name, ...props }) {
  return createElement(getIcon(name), props);
}

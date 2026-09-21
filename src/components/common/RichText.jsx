import { Fragment } from 'react';

/**
 * RichText — renders a plain string with minimal inline markup:
 *   **bold**  →  <strong>
 * Used so admin-editable copy can carry emphasis without HTML.
 */
export default function RichText({ text, strongStyle }) {
  if (!text) return null;
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={strongStyle}>{part.slice(2, -2)}</strong>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

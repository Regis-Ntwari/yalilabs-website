import home from './home';
import products from './products';
import about from './about';
import team from './team';
import contact from './contact';
import footer from './footer';

/**
 * ADMIN MODULE REGISTRY
 * One module per editable page / area. Each module declares its content key
 * (matching src/content/defaults and src/content/schemas), the public route it
 * edits, and a schema of sections + fields that the generic form renders.
 */
export const modules = [home, products, about, team, contact, footer];

export const getModule = (key) => modules.find((m) => m.key === key);

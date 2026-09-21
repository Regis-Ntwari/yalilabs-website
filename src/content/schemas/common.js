import { z } from 'zod';

/** Reusable building blocks for the content schemas. */
export const str = z.string();
export const lines = z.array(z.string());
export const url = z.string(); // internal path or absolute URL; empty allowed
export const bool = z.boolean();
export const num = z.number();

export const linkFields = { label: str, href: url };

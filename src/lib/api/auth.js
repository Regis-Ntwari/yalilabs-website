import { z } from 'zod';
import { api } from './client';

/**
 * AUTH ENDPOINTS
 *
 *   POST /auth/login   { email, password }  → { token, user: { id, email, name? } }
 *   GET  /auth/me                           → { user: { id, email, name? } }
 *   POST /auth/logout                       → 204
 */

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address.')),
  password: z.string().min(1, 'Enter your password.'),
});

export const userSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
});

const loginResponseSchema = z.object({
  token: z.string().min(1),
  user: userSchema.optional().nullable(),
});

export async function login(credentials) {
  const body = loginSchema.parse(credentials);
  const { data } = await api.post('/auth/login', body, { skipAuth: true });
  return loginResponseSchema.parse(data);
}

export async function fetchMe() {
  const { data } = await api.get('/auth/me');
  return userSchema.parse(data?.user ?? data);
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch {
    /* the local session is cleared regardless */
  }
}

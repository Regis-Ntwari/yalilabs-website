import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';

/**
 * API CLIENT
 *
 * One axios instance for the whole app. The base URL comes from VITE_API_URL
 * (see .env.example). Every request from the admin carries the bearer token
 * held in the auth store; a 401 on an authenticated request signs the admin
 * out so the login screen comes back.
 *
 * Pass `{ skipAuth: true }` in a request config for public endpoints so the
 * public site never sends (or is affected by) an admin token.
 */
export const API_URL = String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const isApiConfigured = () => API_URL.length > 0;

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'unknown', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  if (!isApiConfigured()) {
    return Promise.reject(new ApiError('The API URL is not configured for this build.', { code: 'unconfigured' }));
  }
  if (!config.skipAuth) {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof ApiError) return Promise.reject(error);

    const status = error.response?.status ?? 0;
    const body = error.response?.data;
    const message =
      (body && typeof body === 'object' && (body.message || body.error)) ||
      (status === 0 ? 'Could not reach the server. Check your connection and the API URL.' : error.message) ||
      'Request failed.';

    // An expired or revoked token: drop the session so the admin is asked to sign in again.
    if (status === 401 && !error.config?.skipAuth && useAuthStore.getState().token) {
      useAuthStore.getState().clear();
    }

    return Promise.reject(
      new ApiError(String(message), {
        status,
        code: status === 0 ? 'network' : `http_${status}`,
        details: body ?? null,
      }),
    );
  },
);

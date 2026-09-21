import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * AUTH STORE
 * Holds the admin session (bearer token + signed-in user). Persisted in
 * sessionStorage so a page reload keeps the editor signed in, while closing
 * the tab ends the session.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user: user ?? null }),
      clear: () => set({ token: null, user: null }),
    }),
    {
      name: 'yali-admin-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ token: s.token, user: s.user }),
    },
  ),
);

export const useIsAuthed = () => useAuthStore((s) => Boolean(s.token));
export const useAuthUser = () => useAuthStore((s) => s.user);

import { create } from 'zustand';

/**
 * ADMIN UI STORE
 * Cross-component UI state for the admin: whether the open module has unsaved
 * changes (used to guard navigation and sign-out).
 */
export const useAdminUiStore = create((set) => ({
  dirty: false,
  setDirty: (dirty) => set({ dirty }),
}));

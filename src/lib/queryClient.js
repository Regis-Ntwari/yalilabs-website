import { QueryClient } from '@tanstack/react-query';

/** Shared TanStack Query client for the public site and the admin. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

/** Query keys in one place so invalidation stays consistent. */
export const queryKeys = {
  content: ['content'],
  module: (key) => ['content', key],
  me: ['auth', 'me'],
};

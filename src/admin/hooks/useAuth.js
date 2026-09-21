import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout, fetchMe } from '../../lib/api/auth';
import { queryKeys } from '../../lib/queryClient';
import { useAuthStore } from '../../stores/authStore';

/** Signs in with { email, password } and stores the returned session. */
export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: login,
    onSuccess: (session) => setSession(session),
  });
}

/** Tells the server, then clears the local session and admin caches. */
export function useLogout() {
  const clear = useAuthStore((s) => s.clear);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clear();
      qc.removeQueries({ queryKey: queryKeys.me });
    },
  });
}

/**
 * Confirms the stored token is still valid and keeps the user profile fresh.
 * A 401 is handled by the API client, which clears the session.
 */
export function useMe() {
  const token = useAuthStore((s) => s.token);
  const query = useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMe,
    enabled: Boolean(token),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (query.data) useAuthStore.setState({ user: query.data });
  }, [query.data]);

  return query;
}

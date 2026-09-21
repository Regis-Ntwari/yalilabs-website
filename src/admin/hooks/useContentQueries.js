import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchModule, saveModule } from '../../lib/api/content';
import { queryKeys } from '../../lib/queryClient';
import { parseModule } from '../../content/schemas';

/**
 * Loads one module for editing. `data` is `{ value, issues }`: `value` is the
 * validated module (defaults fill anything missing) and `issues` is non-empty
 * when the server payload failed validation and defaults were used instead.
 */
export function useModuleQuery(key) {
  return useQuery({
    queryKey: queryKeys.module(key),
    queryFn: () => fetchModule(key),
    select: (raw) => parseModule(key, raw),
    staleTime: 0,
  });
}

/** PUT the full module. On success the editor cache and the public cache are refreshed. */
export function useSaveModule(key) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (value) => saveModule(key, value),
    onSuccess: (saved) => {
      qc.setQueryData(queryKeys.module(key), saved);
      qc.invalidateQueries({ queryKey: queryKeys.content, exact: true });
    },
  });
}

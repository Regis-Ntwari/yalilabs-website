import { useQuery } from '@tanstack/react-query';
import { fetchAllContent } from '../lib/api/content';
import { queryKeys } from '../lib/queryClient';
import { parseAllContent } from './schemas';
import { defaults } from './defaults';

/**
 * PUBLIC CONTENT HOOKS
 *
 * The public site loads every module in one request (`GET /content`) and
 * caches it for the session. While loading, or if the API is unreachable,
 * pages render the code defaults so the site never shows a blank page.
 */
export function useSiteContent() {
  return useQuery({
    queryKey: queryKeys.content,
    queryFn: fetchAllContent,
    select: parseAllContent,
    staleTime: 5 * 60_000,
    retry: 1,
  });
}

/** One content module, e.g. useModule('home') → { hero, mission, ... } */
export function useModule(key) {
  const { data } = useSiteContent();
  return data?.[key] ?? defaults[key];
}

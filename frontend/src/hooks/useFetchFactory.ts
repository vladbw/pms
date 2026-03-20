import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchCallback: () => Promise<void>;
}

export const useFetchFactory = <T>(fetcher: () => Promise<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCallback = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setData(await fetcher());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

  return { data, isLoading, error, fetchCallback };
};
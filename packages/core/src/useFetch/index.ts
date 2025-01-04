import { useCallback, useEffect, useState } from "react";

type UseFetchResult<T, E> = {
  data: T | null;
  error: E | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

const description = "Fetches data from a specified API endpoint.";

/**
 * Fetches data from a specified API endpoint.
 *
 * @template T - Type of the data returned by the API.
 * @template E - Type of the error returned by the API (default is `string`).
 *
 * @param {string} url - The URL of the API endpoint.
 * @param {RequestInit} [reqOpt] - Optional configuration for the fetch request (e.g., method, headers).
 *
 * @returns {UseFetchResult<T, E>} An object containing the following properties:
 * - `data`: The data returned by the API, or `null` if no data has been received yet.
 * - `error`: The error returned by the API, or `null` if no error has occurred.
 * - `isPending`: A boolean indicating whether the fetch request is currently in progress.
 * - `isSuccess`: A boolean indicating if the fetch request was successful.
 * - `isError`: A boolean indicating if the fetch request resulted in an error.
 * - `refetch`: A function to manually trigger the fetch request again.
 */
export function useFetch<T, E = string>(
  url: string,
  reqOpt?: RequestInit,
): UseFetchResult<T, E> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [isPending, setisPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Fetches data from the provided URL using the specified request options.
   *
   * This function uses `fetch` with an `AbortController` to allow for request cancellation if needed.
   * Updates the state with the response data, error, or loading status based on the fetch result.
   */
  const fetchData = useCallback(async () => {
    setisPending(true);
    setIsSuccess(false);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await fetch(url, { ...reqOpt, signal });
      const result = await res.json();

      if (res.ok) {
        setData(result);
        setIsSuccess(true);
        setError(null);
      } else {
        setError(result as E);
      }
    } catch (e) {
      if (e instanceof Error && e.name !== "AbortError") {
        setError(e as unknown as E);
      }
    } finally {
      setisPending(false);
    }

    return () => {
      controller.abort();
    };
  }, [url, reqOpt]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    isPending,
    isSuccess,
    isError: !isSuccess && !isPending,
    refetch: fetchData,
  };
}

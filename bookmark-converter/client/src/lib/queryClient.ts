import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.message || res.statusText;
    throw new Error(errorMessage);
  }
  return res;
}

export async function apiRequest(
  method: string,
  url: string,
  body?: Record<string, unknown>
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  await throwIfResNotOk(res);
  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (context: { queryKey: string | readonly unknown[] }) => Promise<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
    const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
    const url = key as string;

    const res = await fetch(url);
    if (res.status === 401) {
      if (on401 === "returnNull") return null as T;
      throw new Error("Unauthorized");
    }

    await throwIfResNotOk(res);
    return res.json() as Promise<T>;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn<unknown>({ on401: "returnNull" }),
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});
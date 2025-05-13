import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    try {
      // Try to parse the error as JSON
      const data = JSON.parse(text);
      if (data.message) {
        throw new Error(data.message);
      }
    } catch (e) {
      // If parsing fails, just throw the text
      throw new Error(text || res.statusText || "An unknown error occurred");
    }
    throw new Error(text || res.statusText || "An unknown error occurred");
  }
}

export async function apiRequest(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
    },
  });

  await throwIfResNotOk(res);

  // For 204 No Content
  if (res.status === 204) {
    return null;
  }

  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}) => {
  return async ({ queryKey }: { queryKey: string[] }) => {
    try {
      const data = await apiRequest(Array.isArray(queryKey) ? queryKey[0] : queryKey);
      return data as T;
    } catch (e) {
      if (options.on401 === "returnNull") {
        return null;
      }
      throw e;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      queryFn: getQueryFn<unknown>({ on401: "returnNull" }),
    },
  },
});
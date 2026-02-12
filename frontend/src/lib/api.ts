export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 60, ...options.next },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    const errorBody = await res.text().catch(() => res.statusText);
    throw new Error(`API Error (${res.status}): ${errorBody}`);
  }

  return res.json() as Promise<T>;
}



export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080';

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // ISR/Cache defaults can be set here if needed, but Next.js defaults are usually good for public data
    next: { revalidate: 60, ...options.next }, 
  });

  if (!res.ok) {
    if (res.status === 404) return null as T; // Return null for 404 to handle gracefully
    throw new Error(`API Error: ${res.statusText}`);
  }

  return res.json();
}

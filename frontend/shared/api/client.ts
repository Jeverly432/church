const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request error');
  }

  return data as T;
};

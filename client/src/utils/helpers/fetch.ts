import { tokenStore } from './tokenStore';

export const authenticatedFetch = async (url: string, options: RequestInit) => {
  const token = tokenStore.getToken();
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const userOptions: RequestInit = {
    ...options,
    headers: {
      ...(options?.headers || {}),
      ...authHeaders,
    },
  };

  return fetch(url, userOptions);
};

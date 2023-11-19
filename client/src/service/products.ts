import { SERVER_URL, TOKEN_KEY } from '../utils/constants/global';

export const getProducts = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = `${SERVER_URL}/products`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `query products($first: Int) {
                  products(first: $first) {
                    nodes {
                      id
                      title
                    }
                  }
                }`,
      variables: { first: 3 },
    }),
  });

  return await data.json();
};

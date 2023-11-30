import { SERVER_URL } from '../utils/constants/global';
import { authenticatedFetch } from '../utils/helpers/fetch';

export const getProducts = async () => {
  const url = `${SERVER_URL}/products`;
  const data = await authenticatedFetch(url, {
    method: 'POST',
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

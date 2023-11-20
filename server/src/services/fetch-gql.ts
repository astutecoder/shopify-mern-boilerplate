import fetch from 'node-fetch';
import { IUserReqBody } from '../interfaces/user.interface';
import { SHOPIFY_API_VERSION } from '../utils/constants/global';

export const fetchGql = (
  user: IUserReqBody,
  query: string,
  variables?: Record<string, any>
) => {
  const url = `https://${user.shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': user.password,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};

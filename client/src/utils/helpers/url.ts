import { SHOPIFY_ADMIN_URL, SHOPIFY_CLIENT_ID } from '../constants/global';

export const generateQueryObject = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));

export const generateAppUrl = (shopName: string) =>
  `${SHOPIFY_ADMIN_URL}/store/${shopName}/apps/${SHOPIFY_CLIENT_ID}`;

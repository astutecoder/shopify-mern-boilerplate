import { SHOPIFY_CLIENT_ID } from '../constants/global';

export const generateQueryObject = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));

export const generateAppUrl = (shopName: string) =>
  `https://admin.shopify.com/store/${shopName}/apps/${SHOPIFY_CLIENT_ID}`;

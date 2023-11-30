import { jwtDecode } from 'jwt-decode';
import { SHOPIFY_ADMIN_URL, SHOPIFY_CLIENT_ID } from '../constants/global';
import { tokenStore } from './tokenStore';

export const generateQueryObject = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));

export const generateAppUrl = (shopName: string) =>
  `${SHOPIFY_ADMIN_URL}/store/${shopName}/apps/${SHOPIFY_CLIENT_ID}`;

export const handleReload = () => {
  const token = tokenStore.getToken();
  if (!token) {
    alert('Sorry! Please try to reload manually.');
    return;
  }

  const { shop } = jwtDecode<{ id: string; shop: string }>(token);
  const shopName = shop.split('.')[0];
  const currentPath = window.location.pathname.replace(/^\//, '');

  window.top?.location.replace(
    `${SHOPIFY_ADMIN_URL}/store/${shopName}/apps/${SHOPIFY_CLIENT_ID}/${currentPath}`
  );
};

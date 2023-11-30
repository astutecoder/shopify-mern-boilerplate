export const APP_NAMESPACE = 'astute-order-kanban';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL?.replace(/\/$/, '');
export const APP_URL = import.meta.env.VITE_APP_URL?.replace(/\/$/, '');
export const SHOPIFY_CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_ID;
export const SHOPIFY_CLIENT_SECRET = import.meta.env.VITE_SHOPIFY_CLIENT_SECRET;
export const SHOPIFY_SCOPES = import.meta.env.VITE_SHOPIFY_SCOPES;
export const SHOPIFY_ADMIN_URL = import.meta.env.VITE_SHOPIFY_ADMIN_URL;

export const NONCE_KEY = APP_NAMESPACE + '-nonce';
export const TOKEN_KEY = APP_NAMESPACE + '-token';

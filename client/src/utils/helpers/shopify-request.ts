import { sha256 } from 'js-sha256';
import { NONCE_KEY, SHOPIFY_CLIENT_SECRET } from '../constants/global';
import { generateQueryObject } from './url';

const isValidState = (state: string) => {
  const nonce = localStorage.getItem(NONCE_KEY);

  return state === nonce;
};

const isValidHmac = async () => {
  const { hmac, ...restParams } = generateQueryObject();

  if (hmac === undefined) {
    return false;
  }

  const queryString = new URLSearchParams(restParams).toString();
  const newHmac = sha256.hmac(SHOPIFY_CLIENT_SECRET, queryString);

  return hmac === newHmac;
};

export const isValidRequest = () => {
  const { state } = generateQueryObject();

  return isValidState(state) && isValidHmac();
};

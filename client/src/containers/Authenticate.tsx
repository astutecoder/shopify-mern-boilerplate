import { useEffect, useState } from 'react';
import { getAuthToken } from '../service/auth';
import { NONCE_KEY, TOKEN_KEY } from '../utils/constants/global';
import { isValidRequest } from '../utils/helpers/shopify-request';
import { generateAppUrl, generateQueryObject } from '../utils/helpers/url';
import { Spinner } from '@shopify/polaris';

const Authenticate = () => {
  const { shop, code } = generateQueryObject();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!isValidRequest()) {
        setLoading(false);
        setError('Not a valid request');
        return;
      }

      const { token } = await getAuthToken(shop, code);

      localStorage.setItem(TOKEN_KEY, token);
      setShouldRedirect(true);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Spinner />;

  if (shouldRedirect) {
    const shopName = shop.split('.')[0];
    const url = generateAppUrl(shopName);

    localStorage.removeItem(NONCE_KEY);

    window.location.replace(url);
    return null;
  }

  return <div>{error}</div>;
};

export default Authenticate;

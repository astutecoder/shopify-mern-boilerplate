import { Spinner } from '@shopify/polaris';
import { useContext, useEffect, useState } from 'react';
import { getAuthToken } from '../service/auth';
import { NONCE_KEY } from '../utils/constants/global';
import { AuthContext } from '../utils/context/AuthContext';
import { isValidRequest } from '../utils/helpers/shopify-request';
import { generateAppUrl, generateQueryObject } from '../utils/helpers/url';

const Authenticate = () => {
  const { setToken } = useContext(AuthContext);

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

      setToken(token);
      setShouldRedirect(true);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

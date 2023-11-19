import { useEffect, useState } from 'react';
import {
  getAuthToken,
  getAuthorized,
  getIsAuthenticated,
} from '../service/auth';
import { TOKEN_KEY } from '../utils/constants/global';
import { isValidRequest } from '../utils/helpers/shopify-request';
import { generateQueryObject } from '../utils/helpers/url';

export const useAuth = (shop: string) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getIsAuthenticated(shop);

      if (data.authenticated) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      setLoading(false);
      setRedirect(true);
      await getAuthorized(shop);
    })();
  }, [shop]);

  return { isAuthenticated, loading, redirect };
};

export const useGetAuthToken = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { code, shop } = generateQueryObject();

  useEffect(() => {
    (async () => {
      if (!isValidRequest()) {
        setLoading(false);
        setError('not from trusted source');
        return;
      }

      const token = await getAuthToken(shop, code);
      localStorage.setItem(TOKEN_KEY, token);
      setRedirect(true);
      setLoading(false);
    })();
  }, [shop, code]);

  return { loading, error, redirect };
};

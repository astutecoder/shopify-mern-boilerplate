import { useEffect, useState } from 'react';
import { getAuthToken } from '../service/auth';
import { TOKEN_KEY } from '../utils/constants/global';
import { isValidRequest } from '../utils/helpers/shopify-request';
import { generateQueryObject } from '../utils/helpers/url';

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

      const { token } = await getAuthToken(shop, code);
      localStorage.setItem(TOKEN_KEY, token);
      setRedirect(true);
      setLoading(false);
    })();
  }, [shop, code]);

  return { loading, error, redirect };
};

import { useContext, useEffect, useState } from 'react';
import { getAuthToken } from '../service/auth';
import { AuthContext } from '../utils/context/AuthContext';
import { isValidRequest } from '../utils/helpers/shopify-request';
import { generateQueryObject } from '../utils/helpers/url';

export const useGetAuthToken = () => {
  const { setToken } = useContext(AuthContext);

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
      setToken(token);
      setRedirect(true);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop, code]);

  return { loading, error, redirect };
};

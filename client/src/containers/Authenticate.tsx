import { useGetAuthToken } from '../hooks/auth';
import { generateAppUrl, generateQueryObject } from '../utils/helpers/url';

const Authenticate = () => {
  const { error, redirect, loading } = useGetAuthToken();
  const { shop } = generateQueryObject();

  if (loading) return <h1>Loading...</h1>;

  if (redirect) {
    const shopName = shop.split('.')[0];
    const url = generateAppUrl(shopName);

    return window.location.replace(url);
  }

  return <div>{error}</div>;
};

export default Authenticate;

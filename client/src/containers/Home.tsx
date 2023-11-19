import { useAuth } from '../hooks/auth';
import { generateQueryObject } from '../utils/helpers/url';
import Products from './Products';

const Home = () => {
  const { shop } = generateQueryObject();

  const { isAuthenticated, loading, redirect } = useAuth(shop);

  if (loading || redirect) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <div>Not installed</div>;

  return <Products />;
};

export default Home;

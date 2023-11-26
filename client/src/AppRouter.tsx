import { useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Authenticate from './containers/Authenticate';
import Home from './containers/Home';
import Products from './containers/Products';
import { SHOPIFY_CLIENT_ID } from './utils/constants/global';
import { generateQueryObject } from './utils/helpers/url';

const AppRouter = () => {
  const { host } = generateQueryObject();
  const config = {
    host,
    apiKey: SHOPIFY_CLIENT_ID,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const history = useMemo(
    () => ({
      replace: (path: string) => navigate(path, { replace: true }),
    }),
    [navigate]
  );

  const router = useMemo(() => ({ location, history }), [location, history]);

  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute config={config} router={router} />}
      >
        <Route path="/" Component={Home} />
        <Route path="/products" Component={Products} />
      </Route>
      <Route path="/authenticate" Component={Authenticate} />
    </Routes>
  );
};

export default AppRouter;

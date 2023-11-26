import { Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import Authenticate from './containers/Authenticate';
import Products from './containers/Products';

const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={AuthGuard}>
        <Route path="/" Component={Products} />
        <Route path="/products" Component={Products} />
      </Route>

      <Route path="/authenticate" Component={Authenticate} />
    </Routes>
  );
};

export default Router;

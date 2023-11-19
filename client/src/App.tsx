import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authenticate from './containers/Authenticate';
import Home from './containers/Home';

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/authenticate" Component={Authenticate} />
    </Routes>
  );
}

export default App;

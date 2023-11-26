import {} from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslate from '@shopify/polaris/locales/en.json';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import ShopifyGuard from './components/ShopifyGuard';

function App() {
  return (
    <BrowserRouter>
      <AppProvider i18n={enTranslate}>
        <ShopifyGuard>
          <AppRouter />
        </ShopifyGuard>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

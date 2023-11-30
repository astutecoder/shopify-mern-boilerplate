import { FC, PropsWithChildren, createContext, useState } from 'react';
import { tokenStore } from '../helpers/tokenStore';

interface IAuthContext {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (token: string | null) => {
    setToken(token);
    tokenStore.setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

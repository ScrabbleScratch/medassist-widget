import { createContext } from 'react';

export type AuthValuesType = {
  token: string | null;
};

const defaultProvider: AuthValuesType = {
  token: null,
};

export const AuthContext = createContext(defaultProvider);

type Props = {
  apiToken: string;
  children: React.ReactNode;
};

const Authenticator = ({ apiToken, children }: Props) => {
  const values = {
    token: apiToken,
  };

  return (
    <AuthContext.Provider value={values}>
      {apiToken && children}
    </AuthContext.Provider>
  );
};

export default Authenticator;
import { createContext, useState, useEffect } from 'react';

// ** Utils imports
import { login, getMe } from '../../utils/strapi';

// ** Types imports
import { UserDataType, AuthValuesType } from './types';

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => null,
  logout: () => null,
};

export const AuthContext = createContext(defaultProvider);

type Props = {
  username?: string;
  password?: string;
  rememberMe?: boolean;
  children: React.ReactNode;
};

const Authenticator = ({ username, password, rememberMe, children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const handleLogin = async (username: string, password: string, rememberMe?: boolean) => {
    const jwt = await login(username, password);
    if (jwt) {
      rememberMe
        ? window.localStorage.setItem('accessToken', jwt)
        : null;
      const user = await getMe(jwt)
      if (user) setUser({ ...user, token: jwt });
      else console.log('Get me failed');
    } else {
      console.log('Login failed');
    }
  };

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('accessToken');
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem('accessToken')!;
      setLoading(true);
      if (storedToken) {
        const user = await getMe(storedToken);
        if (user) {
          setUser({ ...user, token: storedToken });
        } else {
          window.localStorage.removeItem('accessToken');
          setUser(null);
        }
      } else if (username && password) {
        setLoading(true);
        await handleLogin(username, password, rememberMe);
      }
      setLoading(false)
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={values}>
      {user && children}
    </AuthContext.Provider>
  );
};

export default Authenticator;
import { useContext } from 'react';
import { AuthContext } from '../context/Authenticator';

export const useAuth = () => {
  return useContext(AuthContext);
};

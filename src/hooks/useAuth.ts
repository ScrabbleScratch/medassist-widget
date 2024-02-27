import { useContext } from 'react';
import { AuthContext } from '../context/Authenticator/Authenticator';

export const useAuth = () => {
  return useContext(AuthContext);
};

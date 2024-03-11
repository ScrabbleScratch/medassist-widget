import { useContext } from 'react';
import { DataContext } from '../context/DataController';

export const useData = () => {
  return useContext(DataContext);
};

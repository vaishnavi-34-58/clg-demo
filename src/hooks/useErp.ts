import { useContext } from 'react';
import { ErpContext } from '../context/ErpContext';

export function useErp() {
  const context = useContext(ErpContext);
  if (!context) {
    throw new Error('useErp must be used within an ErpProvider');
  }
  return context;
}

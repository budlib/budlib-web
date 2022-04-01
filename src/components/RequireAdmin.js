import { Navigate } from 'react-router-dom';

export function RequireAdmin({ children }) {
  return localStorage.getItem('role') === 'ADMIN' ? children : <Navigate to='/page-not-found' replace />;
}

import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../services/auth';

export default function PrivateRoute() {
  const isAuthenticated = !!getAccessToken();

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

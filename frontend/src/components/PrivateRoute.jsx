import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

export default function PrivateRoute() {
  const isAuthenticated = !!auth.getAccessToken();

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

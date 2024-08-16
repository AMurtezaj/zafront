import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';

interface ProtectedRouteProps {
  component: React.ComponentType;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { authenticationStore } = useStore();
  
  return authenticationStore.isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default ProtectedRoute;

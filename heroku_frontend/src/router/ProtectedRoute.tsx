import * as React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth } from '../store/user/hooks';

export interface ProtectedRouteProps extends RouteProps {
  readonly unauthorizedRedirect: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const {unauthorizedRedirect}=props;
    const [authorized]=useAuth();
    return authorized? <Outlet />:<Navigate to={unauthorizedRedirect} />
};

ProtectedRoute.defaultProps = {
  unauthorizedRedirect: '/login',
};

export { ProtectedRoute} ;

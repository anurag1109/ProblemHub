import * as React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth, useUserContext } from '../store/user/hooks';

export interface ProtectedWithRoleProps extends RouteProps {
  readonly unauthorizedRedirect: string;
  readonly roles:ReadonlyArray<string>
}

const ProtectedWithRole: React.FC<ProtectedWithRoleProps> = (props) => {
    const {unauthorizedRedirect,roles}=props;
    const [authorized]=useAuth();
    const [user]=useUserContext();
    const allow=roles.indexOf(user?.role||"")!==-1;
   
    return (authorized && allow)? <Outlet />:<Navigate to={unauthorizedRedirect} />
};

ProtectedWithRole.defaultProps = {
  unauthorizedRedirect: '/login',
};

export { ProtectedWithRole} ;

import { BrowserHistory } from 'history';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {Route,Routes, unstable_HistoryRouter as ReactRouter, Navigate } from 'react-router-dom';
import PageNotFound from '../components/pages/PageNotFound';
import { roles } from '../config/roleConfig';
import RouteService from '../services/route.services';
import { isVarificationYNSelector } from '../store/user/selector';
import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedWithRole } from './ProtectedWithRole';

const ConnectedLoginPage=React.lazy(()=>import("../containers/pages/ConnectedLoginPage"));
const ConnectedRegisterPage=React.lazy(()=>import('../containers/pages/ConnectedRegisterPage'))
const ConnectedVarificationPage=React.lazy(()=>import('../containers/pages/ConnectedVarificationPage'))
const ConnectedChangePasswordPage=React.lazy(()=>import('../containers/pages/ConnectedChangePasswordPage'))
const ConnectedDashboard=React.lazy(()=>import('../containers/pages/ConnectedDashboard'))
const ConnectedAddProblem=React.lazy(()=>import('../containers/pages/ConnectedAddProblem'))
const ConnectedProblem=React.lazy(()=>import('../containers/pages/ConnectedProlemPage'))
const ConnectedMyProblem=React.lazy(()=>import('../containers/pages/ConnectedMyProblems'))
const ConnectedProblemTypes=React.lazy(()=>import('../containers/pages/ConnectedProblemTypes'))
const ConnectedCategoryItemPage=React.lazy(()=>import('../containers/pages/ConnectedCategoryItemPage'))
const ConnectedSuperAdminDashboard=React.lazy(()=>import('../containers/pages/superadmin/ConnectedDashboard'));
const ConnectedSuperAdminCategory=React.lazy(()=>import('../containers/pages/superadmin/ConnectedCategory'));


interface RouterProps  {
  history : BrowserHistory
  }
  const Router: React.FC<RouterProps> = ({ history }) => {
    const isVarification=useSelector(isVarificationYNSelector);
    return(
        <>
         <ReactRouter history={history}>
            <Routes>
              <Route path="/" element={<Navigate to={RouteService.login.getPath()} replace/>}/>
              <Route  path={RouteService.login.getPath()} element={<ConnectedLoginPage />} />
              <Route path={RouteService.register.getPath()} element={<ConnectedRegisterPage />}/>
              <Route path="*" element={<PageNotFound />}/>
              <Route path={RouteService.varification.getPath()} element={isVarification? <ConnectedVarificationPage />:<Navigate to={RouteService.login.getPath()}/>}/>
              <Route path={RouteService.changePassword.getPath()} element={isVarification? <ConnectedChangePasswordPage />:<Navigate to={RouteService.login.getPath()}/>}/>

              <Route element={<ProtectedRoute unauthorizedRedirect='/login'/>}>
                 <Route path={RouteService.dashboard.getPath()} element={<ConnectedDashboard />}/>
                 <Route path={RouteService.addProblem.getPath()} element={<ConnectedAddProblem />}/>
                 <Route path={RouteService.problem.getPath()} element={<ConnectedProblem />}/>
                 <Route path={RouteService.myProblem.getPath()} element={<ConnectedMyProblem />}/>
                 <Route path={RouteService.problemTypes.getPath()} element={<ConnectedProblemTypes />}/>
                 <Route path={RouteService.categoryItem.getPath()} element={<ConnectedCategoryItemPage />}/>
              </Route>
              <Route element={<ProtectedWithRole roles={[roles.superAdmin]} unauthorizedRedirect='/login'/>}>
                <Route path={RouteService.superAdmin.dashboard.getPath()} element={<ConnectedSuperAdminDashboard />}/>
                <Route path={RouteService.superAdmin.category.getPath()} element={<ConnectedSuperAdminCategory />}/>
                 
              </Route>
            </Routes>
         </ReactRouter>
        </>
    )
}
export default Router;
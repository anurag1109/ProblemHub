import * as React from "react";
import NavItem from "./NavItem";
import NavList from "./NavList";
import RouteService from "../../services/route.services";
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
export interface SuperAdminNavbarProps {
  
}

const SuperAdminNavbar: React.FC<SuperAdminNavbarProps> = (props) => {
    return(
        <>
          <NavList>
            <NavItem title="Users" icon={<GroupIcon />} to={RouteService.superAdmin.users.getPath()}/>
            <NavItem title="Add Category" icon={<CategoryIcon />} to={RouteService.superAdmin.category.getPath()}/>
          </NavList>
        </>
    )
}
export default SuperAdminNavbar;
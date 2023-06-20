import * as React from "react";
import NavItem from "./NavItem";
import NavList from "./NavList";
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import CategoryIcon from '@material-ui/icons/Category';
import RouteService from "../../services/route.services";
import { useSelectProblemType } from "../../store/problem/hooks";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
export interface NavbarProps {
  
}

const Navbar: React.FC<NavbarProps> = (props) => {
const [category]=useSelectProblemType();
    return(
        <>
          <NavList>
            <NavItem title="All Problems" icon={<ListAltIcon />} to={RouteService.dashboard.getPath()}/>
            <NavItem title="My Problems" icon={<ListIcon />} to={RouteService.myProblem.getPath()}/>
            <NavItem title="Add Problem" icon={<AddIcon />} to={RouteService.addProblem.getPath()}/>
            <NavItem title="Categories" icon={<CategoryIcon />} to={RouteService.problemTypes.getPath()}/>
            {!!category && <NavItem title={category?.title||""} icon={<StarOutlineIcon />} to={RouteService.categoryItem.build({id:category?._id||""})}/>}
          </NavList>
        </>
    )
}
export default Navbar;
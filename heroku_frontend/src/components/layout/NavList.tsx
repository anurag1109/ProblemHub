import * as React from "react";
import List from '@material-ui/core/List';

export interface NavListProps {
  
}

const NavList: React.FC<NavListProps> = (props) => {
   const {children}=props;
    return(
        <>
          <List>
              {children}
          </List>
        </>
    )
}
export default NavList;
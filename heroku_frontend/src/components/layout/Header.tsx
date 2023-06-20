import { Typography } from "@material-ui/core";
import * as React from "react";

export interface HeaderProps {
  
}

const Header: React.FC<HeaderProps> = (props) => {
   
    return(
        <>
            <Typography variant="h5" noWrap>
                Problem Hub
            </Typography>
        </>
    )
}
export default Header;
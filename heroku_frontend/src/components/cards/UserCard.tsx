import { Grid, Link } from "@material-ui/core";
import * as React from "react";
import RouteService from "../../services/route.services";

export interface UserCardProps {}

const UserCard: React.FC<UserCardProps> = (props) => {
  return (
    <>
      <Grid container xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Link href={RouteService.dashboard.getPath()} variant="body2">
            Go To User Dashboard
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
export default UserCard;

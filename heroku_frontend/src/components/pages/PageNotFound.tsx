import { Grid, Typography } from "@material-ui/core";
import * as React from "react";
const PageNotFound: React.FC<any> = (props) => {
  return (
    <>
      <Grid container justifyContent="center" xs={12}>
        <Grid item>
          <img style={{height:"60vh"}} src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' alt="gif" />
        </Grid>
      </Grid>
      <Grid container  xs={12} justifyContent="center">
          <Grid item xs={6}>
          <Typography variant="h1" align="center">
            404
          </Typography>
          </Grid>
          <Grid item xs={10}>
          <Typography variant="h3" align="center">
            Page Not Found
          </Typography>
          </Grid>
        </Grid>
    </>
  );
};
export default PageNotFound;

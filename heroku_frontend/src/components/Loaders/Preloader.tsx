import * as React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        background: `conic-gradient(#7abd3300,${theme.palette.primary.main})`
    }
  }),
);

const PreLoader = () => {
    const classes = useStyles();
  return (
    <>
     <div className={`loading ${classes.root}`}></div>
    </>
  );
};
export default PreLoader;

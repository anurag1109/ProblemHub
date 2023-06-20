// import React from 'react';
import * as React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTab } from "../../hooks";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minHeight:380,
  },
}));

export interface SimpleTabProps {
  children?: React.ReactNode;
  readonly setTab:(data:number)=>void;
  readonly tab:number;
}

const SimpleTabs:React.FC<SimpleTabProps>=(props)=> {
  const {children,setTab,tab}=props;
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Title" {...a11yProps(0)} />
          <Tab label="Problem" {...a11yProps(1)} />
          <Tab label="Solution" {...a11yProps(2)} />
          <Tab label="Prolem Types" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      {children}
    </div>
  );
}
export default SimpleTabs;
import * as React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useUserContext } from "../../store/user/hooks";
import Profile from "../layout/Profile";
import ErrorModal from "../modals/ErrorModal";
import Notification from "../layout/Notification";
import { useNavebarSlider } from "../../store/layout/hooks";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    arrowContainer: {
      display: "flex",
      alignItems: "center",
      // justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
    },
    avatar:{
      height:30,
      width:30
    }
  })
);

export interface MainTemplateProps {}

const MainTemplate: React.FC<MainTemplateProps> = (props) => {
  const [user] = useUserContext();
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const [open,setOpen]=useNavebarSlider();
  const [profileYN, setProfile] = React.useState<boolean>(false);
  const handleDrawerOpen = () => {
    setOpen();
  };

  const handleDrawerClose = () => {
    setOpen();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.arrowContainer}>
          <div style={{ width: "80%" }}>
            <Typography variant="h6" align="center">
              {user?.firstName}
            </Typography>
          </div>
          <div style={{ width: "20%" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </div>
        <Divider />
        <Navbar />
        <Divider />
        <List>
          <Tooltip title="Profile" placement="right" arrow >
          <ListItem button onClick={() => setProfile(true)}>
            <ListItemIcon>
              {user?.picture?<Avatar className={classes.avatar} src={user.picture}/>:<Avatar className={classes.avatar}>{user?.firstName[0]}</Avatar>}
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <Profile
        open={profileYN}
        name={user?.firstName || ""}
        lastName={user?.lastName}
        onClose={()=>setProfile(false)}
        picture={user?.picture}
        email={user?.email}
      />
      <ErrorModal />
      <Notification />
    </div>
  );
};

export default MainTemplate;

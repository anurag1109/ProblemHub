import {
  Avatar,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme, useThemeColor } from "../../store/theme/hooks";
import { useLogout } from "../../store/user/hooks";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: 180,
      minHeight: 380,
    },
    avtar: {
      width: 100,
      height: 100,
      color:'white'
    },
    spaceTop: {
      marginTop: 10,
    },
    0:{
      background:theme.palette.secondary.main
    },
    1:{
      background:theme.palette.primary.main
    },
    2:{
      background:'#d2f00e'
    },
    3:{
      background:'#bd08ae'
    },
    4:{
      background:'#d11352'
    },
    5:{
      background:'#f5071f'
    }
  })
);

export interface ProfileProps {
  readonly open: boolean;
  readonly onClose?: () => void;
  readonly name: string;
  readonly lastName?: string;
  readonly picture?:string;
  readonly email?:string;
}

const colors:ReadonlyArray<{label:string,value:ThemeColor}>=[{label:"Green",value:'green'},{label:"Blue Gray",value:"blueGray"},
{label:"Blue",value:'blue'},{label:"Cyan",value:'cyan'},{label:"Lime",value:'lime'},
{label:"Orange",value:'orange'},{label:"Teal",value:'teal'},{label:"Indigo",value:'indigo'},
]

const Profile: React.FC<ProfileProps> = (props) => {
  const { open, onClose, name, lastName,picture,email } = props;
  const classes = useStyles();
  const [theme, setTheme] = useTheme();
  const [themeColor,setThemeColor]=useThemeColor();
 
 const [logout]=useLogout()
  
  const handleChange = (e: any) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const handleTheme=(e:any)=>{
      setThemeColor(e.target.value)
  }
  function getRandomInt() {
     let r= Math.floor(Math.random() * 6);
     return classes[r]
  }

  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <div className={classes.root}>
          <Grid
            container
            xs={12}
            justifyContent="center"
            className={classes.spaceTop}
            spacing={2}
          >
            <Grid container item xs={12} justifyContent="center">
              <Grid item>
                {picture?<Avatar className={`${classes.avtar}`} src={picture}/>:<Avatar className={`${classes.avtar} ${getRandomInt()}`}>
                  <Typography variant="h2">{name[0].toUpperCase()}</Typography>
                </Avatar>}
              </Grid>
            </Grid>
            <Typography align="center" variant="h6">
              {name[0].toUpperCase()+name.substring(1)} {lastName}
              <Typography color='primary'>
              {email}
              </Typography>
            </Typography>
            <Grid item xs={12} justifyContent="center" container>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={theme === "dark" ? true : false}
                      onChange={handleChange}
                    />
                  }
                  label="Dark"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} justifyContent="center" container>
              <Grid item xs={9}>
              <FormControl variant="outlined" fullWidth>
                 <InputLabel id="demo-simple-select-outlined-label">Theme Color</InputLabel>
                 <Select
                 labelId="demo-simple-select-outlined-label"
                 id="demo-simple-select-outlined"
                 value={themeColor}
                 onChange={handleTheme}
                 label="Theme Color"
                 fullWidth
                >
               {colors.map((ele)=><MenuItem key={ele.value} value={ele.value}>{ele.label}</MenuItem>)}
                </Select>
             </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} justifyContent="center" container>
              <Grid item xs={9}>
                <Button fullWidth variant="contained" color="primary" onClick={logout}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
};
export default Profile;

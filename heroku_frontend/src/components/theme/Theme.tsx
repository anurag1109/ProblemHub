import * as React from 'react';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import orange from '@material-ui/core/colors/orange';
// import teal from '@material-ui/core/colors/teal';
import indigo from '@material-ui/core/colors/indigo';


import { createTheme, responsiveFontSizes,ThemeProvider} from '@material-ui/core/styles';
import { useTheme, useThemeColor } from '../../store/theme/hooks';

export const ThemeFonts = [
  // 'Comfortaa',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const Theme: React.FC<any> =(props)=>{
    const{children}=props;
    const [selectedTheme]=useTheme();
    const [color]=useThemeColor()
    const greenTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: green[700],
          },
          secondary: {
            main: indigo[700],
            contrastText: '#ffcc00',
          },
          contrastThreshold: 4,
          tonalOffset: 0.2,
          type:selectedTheme,
        },
        typography: {
          fontFamily: ThemeFonts.join(','),
        },
      }));
      const blueTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: blue['A700'],
          },
          secondary: {
            main: deepPurple[700],
          },
          type:selectedTheme,
        },
      }));  
      const cyanTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: cyan[800],
          },
          secondary: {
            main: deepPurple[700],
          },
          type:selectedTheme,
        },
      }));   
      const limeTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: lime['A700'],
          },
          secondary: {
            main: deepPurple[700],
          },
          type:selectedTheme,
        },
      }));  
      const orangeTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: orange[500],
          },
          secondary: {
            main: deepPurple[700],
          },
          type:selectedTheme,
        },
      }));  
      const tealTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: "#00695c",
          },
          secondary: {
            main: deepPurple[900],
          },
          type:selectedTheme,
        },
      }));  
      const indigoTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: indigo[500],
          },
          secondary: {
            main: orange[700],
          },
          type:selectedTheme,
        },
      }));    
      const blueGreyTheme = responsiveFontSizes(createTheme({
        palette: {
          primary: {
            main: '#263238',
          },
          secondary: {
            main: '#880e4f',
          },
          type:selectedTheme,
        },
      }));      
 const getTheme=()=>{
   switch (color){
      case 'green':
        return greenTheme; 
      case 'blue':
        return blueTheme 
      case 'cyan':
        return cyanTheme   
      case 'lime':
        return limeTheme  
      case 'orange':
        return orangeTheme  
      case 'teal':
        return tealTheme  
      case 'indigo':
        return indigoTheme  
      case 'blueGray':
        return blueGreyTheme
      default:
        return greenTheme       
   }
 }

    return(
        <>
         <ThemeProvider theme={getTheme()}>
            {children}
        </ThemeProvider>  
        </>
    );
};
export default Theme;
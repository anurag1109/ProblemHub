import * as React from 'react';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Avatar, Card, Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      cursor: "pointer",
      paddingTop: 15,
      paddingBottom:15,
      transition: "transform .2s",
      "&:hover": {
        transform: "scale(1.02)",
        background:theme.palette.action.hover,
      },
    },
    avatar: {
      width: 150,
      height: 150,
    },
    spaceTop:{
        marginTop:15
    },
    zoom:{
      transition: "transform .4s",
      "&:hover": {
        transform: "scale(1.04)",
      }
    },
    title:{
      "&:hover": {
        color:`${theme.palette.type==='light'?theme.palette.primary.main:theme.palette.text.primary}`
      }
    }
  })
);

export interface CategoryCardProps{
  readonly category:ProblemType;
}

const CategoryCard:React.FC<CategoryCardProps>=(props)=>{
    const {category}=props;
  const classes = useStyles();

    return (
        <>
            <Card className={`${classes.card} ${classes.title} ${classes.zoom}`} >
                <Grid item container xs={12} justifyContent="center">
                  <Grid item className={classes.zoom}>
                    {!!category.picture?<Avatar src={category.picture} className={classes.avatar}/> : <Avatar className={`${classes.avatar} ${classes.title}`}>{category.title}</Avatar>}
                  </Grid>
                </Grid>
                <div className={classes.spaceTop}>
                    <Typography variant="h5" align="center" className={classes.title}>{category.title}</Typography>
                </div>
              </Card>
        </>
    )
}
export default CategoryCard;
import { Avatar, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import MainTemplate from "../template/MainTemplate";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import RouteService from "../../services/route.services";
import { useSelectProblemType } from "../../store/problem/hooks";
import { useNavigate } from "react-router-dom";

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

export interface ProblemTypesProps {
  readonly problemTypes?: ReadonlyArray<ProblemType>;
}
const ProblemTypes: React.FC<ProblemTypesProps> = (props) => {
  const { problemTypes } = props;
  const[,selectProblemTypes]=useSelectProblemType();
  const navigate = useNavigate();
  const classes = useStyles();
  const handleClick=(data:ProblemType)=>{
    selectProblemTypes(data);
    navigate(RouteService.categoryItem.build({id:data._id}))
  }
  return (
    <>
      <MainTemplate>
        <Grid container xs={12} spacing={2}>
          {problemTypes?.map((ele) => (
            <Grid item xs={12} md={4} key={ele._id}>
              <Card className={`${classes.card} ${classes.title} ${classes.zoom}`} onClick={()=>handleClick(ele)}>
                <Grid item container xs={12} justifyContent="center">
                  <Grid item className={classes.zoom}>
                    {!!ele.picture?<Avatar src={ele.picture} className={classes.avatar}/> : <Avatar className={`${classes.avatar} ${classes.title}`}>{ele.title}</Avatar>}
                  </Grid>
                </Grid>
                <div className={classes.spaceTop}>
                    <Typography variant="h5" align="center" className={classes.title}>{ele.title}</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MainTemplate>
    </>
  );
};

export default ProblemTypes;

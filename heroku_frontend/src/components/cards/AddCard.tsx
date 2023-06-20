import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      paddingTop: 15,
      paddingBottom: 15,
      cursor: "pointer",
    },
    spaceTop: {
      marginTop: 15,
    },
    avatar: {
      width: 150,
      height: 150,
    },
    icon: {
      fontSize: 100,
    },
  })
);

export interface AddCardProps {
   readonly onAdd:()=>void;
}

const AddCard: React.FC<AddCardProps> = (props) => {
  const {onAdd}=props
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card} onClick={onAdd}>
        <Grid container xs={12} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <AddIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.spaceTop}>
          <Grid container xs={12} justifyContent='center'>
            <Grid item>
          <Button variant='contained' color="primary">
            Add Category
          </Button>
          </Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
};
export default AddCard;

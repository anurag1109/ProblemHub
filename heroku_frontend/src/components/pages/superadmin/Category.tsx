import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SuperAdminTemplate from "../../template/SuperAdminTemplate";
import { Grid, Typography } from "@material-ui/core";
import CategoryCard from "../../cards/CtategoryCard";
import AddCard from "../../cards/AddCard";
import CategoryModal from "../../modals/CategoryModal";

const useStyles = makeStyles((theme) =>
  createStyles({
   spaceTop:{
     marginTop:15,
   }
  })
);

export interface CategoryProps {
   readonly category:ReadonlyArray<ProblemType>
}
const Category: React.FC<CategoryProps> = (props) => {
  const [open,setOpen]=React.useState<boolean>(false);
  const [selected,setSelected]=React.useState<ProblemType>()
  const {category}=props
  const classes = useStyles();
  
  return (
    <>
      <SuperAdminTemplate>
        <Typography variant="h4" align="center">Category</Typography>
          <Grid container xs={12} md={12} spacing={3} className={classes.spaceTop}>
            {category.map((ele:ProblemType)=>{
              return (
               <Grid item xs={12} md={4}> 
                <CategoryCard category={ele} />
              </Grid>
              )
            })}
            <Grid item xs={12} md={4}>
              <AddCard onAdd={()=>setOpen(true)}/>
            </Grid>
          </Grid>
      </SuperAdminTemplate>
      <CategoryModal 
      category={selected}
      isOpen={open} 
      onClose={()=>setOpen(false)}
      />
    </>
  );
};

export default Category;

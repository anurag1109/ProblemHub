import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SuperAdminTemplate from "../../template/SuperAdminTemplate";
import UserCard from "../../cards/UserCard";

const useStyles = makeStyles((theme) =>
  createStyles({
   
  })
);

export interface DashboardProps {
 
}
const Dashboard: React.FC<DashboardProps> = (props) => {
 
  const classes = useStyles();
  

  return (
    <>
      <SuperAdminTemplate>
         <UserCard />
      </SuperAdminTemplate>
    </>
  );
};

export default Dashboard;

import * as React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../controls/formik";
import {  VarificationSchema } from "../../models/LoginModel";
import {useLogin, useVarification} from '../../store/user/hooks'
import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import BaseModal,{BaseModalContent,BaseModalAction} from "../modals/BaseModal";
import ErrorModal from "../modals/ErrorModal";
import { useLoading } from "../../store/layout/hooks";
import PreLoader from "../Loaders/Preloader";

export interface VarificationPageProps {
}

const VarificationPage: React.FC<VarificationPageProps> = (props) => {
  const [email,runVarification]=useVarification();
  const [,logout]=useLogin();
  const [isLoading]=useLoading();
  const [isOpen,setIsOpen]=React.useState<boolean>(false);
  const showModal=()=>{
    setIsOpen(true)
  }
  const handleSubmit = (data: VarificationFormValues) => {
    runVarification(data,showModal)
  };
const handleClose=()=>{
  setIsOpen(false);
  logout()
}

  return (
    <>
    <Formik<VarificationFormValues>
      initialValues={{
        
      }}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validationSchema={VarificationSchema}
    >
      {(form) => (
        <Form>
          <Grid container justifyContent="center" alignItems="center" style={{minHeight:'100vh',padding:"0px 20px"}}>
            <Grid container item xs={12} md={5} lg={5}>
              <Grid container item xs={12} justifyContent="center">
                <Grid item>
                  <Avatar>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <Grid item>
                  <Typography component="h1" variant="h5" gutterBottom align="center">
                    Verification
                  </Typography>
                 <Typography align="center">
                   Verification code has been sent on your email <b>{email}</b>
                 </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 1 }}>
                  <Field
                    margin="normal"
                    component={TextInput}
                    type="number"
                    required
                    fullWidth
                    id="varificationCode"
                    label="Verification Code"
                    name="varificationCode"
                    autoComplete="varificationCode"
                    disaled={isLoading}
                    autoFocus
                  />
                  <Box sx={{ mt:1 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                    >
                      {isLoading?<PreLoader />:"Submit"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
    <BaseModal 
     isOpen={isOpen}
     title="Success" 
     align="center"
     textStyle={{color:"green"}}
     >
      <BaseModalContent dividers>
        <Typography>Successfully verified</Typography>
      </BaseModalContent>
      <BaseModalAction>
        <Button variant="contained" color='primary' onClick={handleClose}>Ok</Button>
      </BaseModalAction>
      </BaseModal>
      <ErrorModal />
    </>
  );
};
export default VarificationPage;

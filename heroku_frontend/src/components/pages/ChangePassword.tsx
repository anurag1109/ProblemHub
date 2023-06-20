import * as React from "react";
import { Formik, Form, Field } from "formik";
import {TextInput} from '../controls/formik'
import { changePasswordSchema } from "../../models/LoginModel";
import {Avatar,Button,Box,Typography,Container,CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PreLoader from "../Loaders/Preloader";
import { useLoading } from "../../store/layout/hooks";
import ErrorModal from "../modals/ErrorModal";
import BaseModal, { BaseModalAction, BaseModalContent } from "../modals/BaseModal";
import { useLogin,useChangePassword } from "../../store/user/hooks";

export interface ChangePasswordPageProps {
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = (props) => {
  const[isLoading]=useLoading();
  const [,logout]=useLogin();
  const [changePassword]=useChangePassword();
  const [isOpen,setIsOpen]=React.useState<boolean>(false);
  const handleSubmit = (data:ChangePasswordFormValues) => {
    changePassword(data,()=>setIsOpen(true))
  };
  const handleClose=()=>{
    setIsOpen(false);
    logout()
  }

  return (
    <>
    <Formik<ChangePasswordFormValues>
      initialValues={{
       
      }}
     onSubmit={handleSubmit}
     validateOnBlur={false}
     validateOnChange={false}
     validationSchema={changePasswordSchema}
    >
      {(form)=>(
        <Form >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
              <Avatar >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Field
                  margin="normal"
                  component={TextInput}
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type='password'
                  autoFocus
                  disabled={isLoading}
                />
                <Field
                  margin="normal"
                  component={TextInput}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  disabled={isLoading}
                />
                <Box sx={{paddingBottom:10,mt:1}}>
                <Button
                  type='submit'
                  fullWidth
                  variant="contained"
                  color='primary'
                  disabled={isLoading}
                >
                 {isLoading? <PreLoader />:"Submit"}
                </Button>
                </Box>
               
              </Box>
          </Box>
        </Container>
        </Form>
      )}
    </Formik>
    <BaseModal
     isOpen={isOpen}
     title="Success" 
     align="center"
     textStyle={{color:"green"}}
     maxWidth="md"
     >
      <BaseModalContent dividers>
        <Typography>Successfully Changed</Typography>
      </BaseModalContent>
      <BaseModalAction>
        <Button variant="contained" color='primary' onClick={handleClose}>Ok</Button>
      </BaseModalAction>
      </BaseModal>

    <ErrorModal />
    </>
  );
};
export default ChangePasswordPage;

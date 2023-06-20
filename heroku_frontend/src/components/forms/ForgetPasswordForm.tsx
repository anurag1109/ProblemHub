import * as React from 'react';
import { Formik, Form, Field } from "formik";
import { useLoading } from '../../store/layout/hooks';
import { ForgetPasswordSchema } from '../../models/LoginModel';
import { TextInput } from '../controls/formik';
import {  Box, Button, Grid } from '@material-ui/core';

export interface ForgetPasswordFormProps{
 readonly onClose:()=>void;
 readonly onSumit:(data:ForgetPasswordFormValue)=>void
}

const ForgetPasswordForm:React.FC<ForgetPasswordFormProps>=(props)=>{
  const {onClose,onSumit}=props;
  const [isLoading] = useLoading();
 
    return(
        <>
         <Formik<ForgetPasswordFormValue>
            initialValues={{}}
            onSubmit={onSumit}
            validateOnBlur={false}
            validationSchema={ForgetPasswordSchema}
          >
            {(form) => (
              <Form >
                <Field
                  component={TextInput}
                  name="username"
                  fullWidth
                  label="Username or Email"
                  required
                  disabled={isLoading}
                  autoFocus
                />
                <Box sx={{mt:1}}>
                <Grid container justifyContent='flex-end' spacing={1}>
                  <Grid item >
                    <Button
                      variant="outlined"
                      disabled={isLoading}
                      onClick={onClose}
                    >
                       Cancle
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                    >
                       Submit
                    </Button>
                  </Grid >
                  </Grid>
                  </Box>
              </Form>
            )}
          </Formik>
        </>
    )
}
export default ForgetPasswordForm;
import * as React from "react";
import {Avatar,Button,Link,Grid,Box,Typography,Container,CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import RouteService from "../../services/route.services";
import { Form, Formik, Field } from "formik";
import { TextInput,DatePicker } from "../controls/formik";
import { RegisterValidationSchema } from "../../models/LoginModel";
import ErrorModal from "../modals/ErrorModal";
import { useLoading } from "../../store/layout/hooks";
import PreLoader from "../Loaders/Preloader";

// import { DatePicker } from "@material-ui/pickers";

export interface RegisterPageProps {
  readonly register:(data:RegisterFormValues)=>void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({register}) => {
  const [isLoading]=useLoading();
  const handleSubmit = (values: RegisterFormValues) => {
    register(values)
  };
  return (
    <>
    <Formik<RegisterFormValues>
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        lastName: "",
        firstName: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={RegisterValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(form) => (
        <Form>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom:25,
                }}
              >
                <Avatar >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        component={TextInput}
                        autoFocus
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextInput}
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        component={TextInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        label="Birth"
                        name="dateOfBirth"
                        component={DatePicker}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        component={TextInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        component={TextInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        component={TextInput}
                        type="password"
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{marginTop:10,paddingBottom:10}}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='primary'
                    disabled={isLoading}
                  >
                    {isLoading?<PreLoader />:"submit"}
                  </Button>
                  </Box>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href={RouteService.login.getPath()} variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
        </Form>
      )}
    </Formik>
    <ErrorModal />
    </>
  );
};
export default RegisterPage;

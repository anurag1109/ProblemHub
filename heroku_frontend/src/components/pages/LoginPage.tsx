import * as React from "react";
import RouteService from "../../services/route.services";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../controls/formik";
import { LoginValidationSchema } from "../../models/LoginModel";
import {
  Avatar,
  Checkbox,
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  FormControlLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PreLoader from "../Loaders/Preloader";
import { useLoading } from "../../store/layout/hooks";
import ForgetPasswordModal from "../modals/ForgetPasswordModal";
import ErrorModal from "../modals/ErrorModal";
import { GoogleLogin } from "react-google-login";
import { useLogin } from "../../store/user/hooks";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
     background:`${theme.palette.primary.main} !important`,
     color:'#fff !important',
     borderRadius:'4px !important',
     '& div':{
      background:`${theme.palette.primary.main} !important`
     }
    },
   
  })
);
export interface LoginPageProps {
  readonly onSubmit: (data: LoginFormValues) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [isLoading] = useLoading();
  const [,,loginWithGoogle]=useLogin()
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { onSubmit } = props;
  const handleSubmit = (data: LoginFormValues) => {
    onSubmit(data);
  };
  const responseSuccessGoogle = (response: any) => {
    // console.log(response.tokenId,"token id");
    loginWithGoogle({idToken:response.tokenId})
  };
  const responseFailureGoogle = (response: any) => {
    // console.log(response);
  };
const classes=useStyles()
  return (
    <>
      <Formik<LoginFormValues>
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={LoginValidationSchema}
      >
        {(form) => (
          <Form>
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
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Field
                    margin="normal"
                    component={TextInput}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <Field
                    margin="normal"
                    component={TextInput}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Box sx={{ paddingBottom: 10 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? <PreLoader /> : "Sign in"}
                    </Button>
                  </Box>
                  <Box sx={{ paddingBottom: 10,display:"flex", justifyContent:"center" }}>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_CLIENT_ID||""}
                      // buttonText="Login With Google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseFailureGoogle}
                      className={classes.root}
                      disabled={isLoading}
                    />
                  </Box>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        onClick={() => setIsOpen(true)}
                        variant="body2"
                        style={{ cursor: "pointer" }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href={RouteService.register.getPath()}
                        variant="body2"
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
      <ForgetPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ErrorModal />
    </>
  );
};
export default LoginPage;

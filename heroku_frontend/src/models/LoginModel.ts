import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  username: yup.string().required("username is required."),
  password: yup.string().required("Password is required."),
});
export const RegisterValidationSchema = yup.object().shape({
  username: yup.string().trim().strict(true).required("username is required.").matches(/^(\S+$)/, '* This field cannot contain only blankspaces'),
  password:yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword:yup.string().oneOf([yup.ref('password'),null],'password and confirmPassword must match.').required(),
  dateOfBirth: yup.string().required("Birth is required"),
  email: yup.string().email().required("Email is required."),
  firstName: yup.string().required("Email is requird."),
});

export const VarificationSchema=yup.object().shape({
  varificationCode:yup.number().required('Varification Code required.')
})
export const ForgetPasswordSchema=yup.object().shape({
  username:yup.string().required('username or email is required')
})
export const changePasswordSchema=yup.object().shape({
  password:yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword:yup.string().oneOf([yup.ref('password'),null],'password and confirmPassword must match.').required()
})
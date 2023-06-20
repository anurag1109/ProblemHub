const yup = require('yup');
module.exports.UserValidationSchema=yup.object().shape({
    username:yup.string().min(4).max(20).required(),
    firstName:yup.string().min(3).max(20).required(),
    lastName:yup.string(),
    email:yup.string().email().required(),
    role:yup.string(),
    password:yup.string().required().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    dateOfBirth:yup.date().required("Date of birth is required.") 
})
module.exports.UserLoginSchema=yup.object().shape({
  username:yup.string().required(),
  password:yup.string().required()
})
module.exports.UserVarificationSchema=yup.object().shape({
  varificationCode:yup.number().required()
})
module.exports.UserForgetPasswordSchema=yup.object().shape({
   username:yup.string().required()
})
module.exports.UserCangePasswordSchema=yup.object().shape({
  password:yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword:yup.string().oneOf([yup.ref('password'),null],'password and confirmPassword must match.').required()
})

module.exports.UserLoginWithGoogleSchema=yup.object().shape({
  idToken:yup.string().required("Token Id Required.")
})









module.exports.TestScema=yup.object().shape({
  test:yup.object().shape({
    left:yup.array(),
    right:yup.array().min(1).required()
  }).required()
})
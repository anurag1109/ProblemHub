import { Action } from "redux";

export const LOGIN = "user/LOGIN";
export const login = (data: LoginFormValues) => ({
  type: LOGIN,
  payload: data,
});

export const LOGIN_COMPLETE='user/LOGIN_COMPLETE';
export const loginComplete=(data:LoginResponse)=>({
  type:LOGIN_COMPLETE,
  payload:data,
})
export interface LoginCompleteAction extends Action<typeof LOGIN_COMPLETE> {
  readonly payload:LoginResponse
}


export const REGISTER = "user/REGISTER";
export const register = (data: RegisterFormValues) => {
  return {
    type: REGISTER,
    payload: data,
  };
};

export const REGISTERATION_COMPLETE = "user/REGISTRATION_COMPLETE";
export const registerationComplete = (data: RegisterResponse) => ({
  type: REGISTERATION_COMPLETE,
  payload: data,
});
export interface RegisterCompleteAction
  extends Action<typeof REGISTERATION_COMPLETE> {
  readonly payload: RegisterResponse;
}

export const VARIFICATION_RUN = "user/VARIFICATION_RUN";

export interface VarificationAction
  extends Action<typeof VARIFICATION_RUN>,
    OnCompleteAction {
  readonly payload: {
    readonly data: VarificationFormValues;
  };
}

export const varificationRun = (
  data: VarificationFormValues,
  onComplete?: () => void
): VarificationAction => ({
  meta: {
    onComplete,
  },
  payload: {
    data,
  },
  type: VARIFICATION_RUN,
});

export const FORGET_PASSWORD_RUN='user/FORGET_PASSWORD_RUN';
export interface ForgetPasswordAction extends Action<typeof FORGET_PASSWORD_RUN>,
OnCompleteAction{
  readonly payload:{
    readonly data:ForgetPasswordFormValue;
  }
}
export const forgetPasswordRun=(
  data:ForgetPasswordFormValue,
  onComplete?:()=>void
):ForgetPasswordAction=>({
  meta:{
    onComplete
  },
  payload:{
    data
  },
  type:FORGET_PASSWORD_RUN
})

export const FORGET_PASSWORD_COMPLETE='user/FORGET_PASSWORD_COMPLETE';
export const ForgetPasswordComplete=(data:ForgetPasswordResponse)=>({
  type:FORGET_PASSWORD_COMPLETE,
  payload:data
})
export interface ForgetPasswordCompleteAction
  extends Action<typeof FORGET_PASSWORD_COMPLETE> {
  readonly payload: ForgetPasswordResponse;
}

export const CHANAGE_PASSWORD_RUN='user/CHANAGE_PASSWORD_RUN'
export interface CangePasswordAction
  extends Action<typeof CHANAGE_PASSWORD_RUN>,
    OnCompleteAction {
  readonly payload: {
    readonly data: ChangePasswordFormValues;
  };
}

export const changePasswordRun = (
  data: ChangePasswordFormValues,
  onComplete?: () => void
): CangePasswordAction => ({
  meta: {
    onComplete,
  },
  payload: {
    data,
  },
  type: CHANAGE_PASSWORD_RUN,
});

export const SET_USER_CONTEXT='user/SET_USER_CONTEXT';
export const setUserContext=(data:UserContext)=>({
  type:SET_USER_CONTEXT,
  payload:data
})
export interface SetUserContextAction extends Action<typeof SET_USER_CONTEXT> {
  readonly payload:UserContext
}
export const LOGIN_WITH_GOOGLE='user/LOGIN_WITH_GOOGLE';
export const loginWithGoogle=(data:LoginWithGoogle)=>({
  type:LOGIN_WITH_GOOGLE,
  payload:data
})




export type UserAction = 
|RegisterCompleteAction
|ForgetPasswordCompleteAction
|LoginCompleteAction
|SetUserContextAction







export const LOGOUT = "user/LOGOUT";
export const LOGOUT_RUN='user/LOGOUT_RUN';
export const logoutRun=()=>({
  type:LOGOUT_RUN
})
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
export interface LogoutAction extends Action<typeof LOGOUT> {}

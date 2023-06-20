import { Reducer } from 'redux';
import { FORGET_PASSWORD_COMPLETE, LOGIN_COMPLETE, LOGOUT, LogoutAction, REGISTERATION_COMPLETE, SET_USER_CONTEXT, UserAction } from './action';
export interface UserState {
    readonly isAuthenticate:boolean;
    readonly access_token?: string;
    readonly expires_in?: number; // 300 seconds
    readonly refresh_token?: string;
    readonly refresh_expires_in?: number; // 1800 seconds
    readonly email?:string;
    readonly varification:boolean;
    readonly userContext?:UserContext;
  }
  export const defaultState: UserState = {
    access_token: undefined,
    expires_in: undefined,
    isAuthenticate:false,
    email:undefined,
    varification:false,
    userContext:undefined
  };

  const reducer: Reducer<UserState,UserAction| LogoutAction> = (state = defaultState, action) => {
    switch (action.type) {
      case LOGIN_COMPLETE:
        return{
          ...state,
          ...action.payload,
          isAuthenticate:true
        }
      case SET_USER_CONTEXT:
        return{
          ...state,
          userContext:action.payload
        }  
      case REGISTERATION_COMPLETE:
        return{
          ...state,
          ...action.payload,
          varification:true
        }
       case FORGET_PASSWORD_COMPLETE:
         return{
          ...state,
          ...action.payload,
          varification:true
         } 
         case LOGOUT:
        return defaultState;
      default:
        return state;
    }
  };
  
  export default reducer;
   